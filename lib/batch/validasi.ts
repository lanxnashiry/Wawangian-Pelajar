export type StatusBatch = "draft" | "diedarkan" | "ditarik" | "nonaktif";
export type MasukanBatch = {
  produkId: string;
  tanggalProduksi: string;
  kodeFormula: string;
  catatanInternal?: string;
  keteranganPublik?: string;
};

const POLA_KODE = /^[A-Z0-9]+(?:-[A-Z0-9]+)*$/;

// Kode batch dibuat server (RPC simpan_batch): <FORMULA>-<VARIAN>-<YYYYMMDD>-<NN>.
export function kodeFormulaValid(nilai: string) {
  const kode = nilai.trim().toUpperCase();
  return kode.length >= 1 && kode.length <= 20 && POLA_KODE.test(kode);
}
const TRANSISI: Record<StatusBatch, readonly StatusBatch[]> = {
  draft: ["diedarkan"],
  diedarkan: ["ditarik", "nonaktif"],
  ditarik: ["diedarkan"],
  nonaktif: ["diedarkan"],
};

export function normalisasiKodeBatch(nilai: string) {
  return nilai.trim().toUpperCase();
}

export function kodeBatchValid(nilai: string) {
  const kode = normalisasiKodeBatch(nilai);
  return kode.length >= 3 && kode.length <= 40 && POLA_KODE.test(kode);
}

export function tanggalKalenderValid(nilai: string) {
  const cocok = /^(\d{4})-(\d{2})-(\d{2})$/.exec(nilai);
  if (!cocok) return false;
  const tahun = Number(cocok[1]);
  const bulan = Number(cocok[2]);
  const hari = Number(cocok[3]);
  const tanggal = new Date(Date.UTC(tahun, bulan - 1, hari));
  return tanggal.getUTCFullYear() === tahun
    && tanggal.getUTCMonth() === bulan - 1
    && tanggal.getUTCDate() === hari;
}

export function validasiBatch(
  data: MasukanBatch,
  hariJakarta = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(new Date()),
) {
  const galat: Partial<Record<keyof MasukanBatch, string>> = {};
  if (!data.produkId.trim()) galat.produkId = "Varian wajib dipilih.";
  if (!tanggalKalenderValid(data.tanggalProduksi) || data.tanggalProduksi > hariJakarta) galat.tanggalProduksi = "Tanggal produksi wajib valid dan tidak boleh melewati hari ini di Jakarta.";
  if (!kodeFormulaValid(data.kodeFormula)) galat.kodeFormula = "Kode formula wajib, maksimal 20 karakter huruf/angka dengan tanda hubung, misalnya AV-T03.";
  if ((data.catatanInternal?.trim().length ?? 0) > 2000) galat.catatanInternal = "Catatan internal maksimal 2.000 karakter.";
  if ((data.keteranganPublik?.trim().length ?? 0) > 500) galat.keteranganPublik = "Keterangan publik maksimal 500 karakter.";
  return galat;
}

export function validasiTransisiStatus(dari: StatusBatch, ke: StatusBatch, alasan: string, publik: string) {
  if (!TRANSISI[dari].includes(ke)) return `Transisi ${dari} ke ${ke} tidak diizinkan.`;
  if (dari !== "draft" && !alasan.trim()) return "Alasan internal wajib diisi.";
  if ((ke === "ditarik" || ke === "nonaktif") && !publik.trim()) return "Keterangan publik wajib diisi.";
  return null;
}

export function statusBatchPublik(status: Exclude<StatusBatch, "draft">) {
  return { label: status === "diedarkan" ? "Diedarkan" : status === "ditarik" ? "Ditarik" : "Nonaktif", bahaya: status !== "diedarkan" };
}

export function presentasiStatusBatch(status: unknown) {
  switch (status) {
    case "diedarkan": return { heading: "Batch terdaftar di Wawangian Pelajar", instruksi: "Kode pada kemasan ini cocok dengan catatan batch produksi kami.", label: "Diedarkan", tingkat: "sukses" } as const;
    case "ditarik": return { heading: "Batch ini sedang ditarik dari peredaran", instruksi: "Hentikan penggunaan dan hubungi Wawangian Pelajar untuk petunjuk penanganan.", label: "Ditarik dari peredaran", tingkat: "bahaya" } as const;
    case "nonaktif": return { heading: "Catatan batch ini dinonaktifkan", instruksi: "Hubungi Wawangian Pelajar untuk memastikan informasi batch pada kemasan ini.", label: "Nonaktif", tingkat: "peringatan" } as const;
    default: return null;
  }
}

export function formatTanggalBatch(nilai: unknown) {
  if (typeof nilai !== "string" || !tanggalKalenderValid(nilai)) return null;
  const [tahun, bulan, hari] = nilai.split("-").map(Number);
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(tahun, bulan - 1, hari)));
}

export type BatchPublik = {
  kode_batch: string;
  nama_varian: string;
  tanggal_produksi: string;
  status: "diedarkan" | "ditarik" | "nonaktif";
  keterangan_publik: string | null;
};

export function bacaBatchPublik(nilai: unknown, kode: string): BatchPublik | null {
  if (!nilai || typeof nilai !== "object") return null;
  const data = nilai as Record<string, unknown>;
  if (data.kode_batch !== kode || !kodeBatchValid(kode)
    || typeof data.nama_varian !== "string" || !data.nama_varian.trim()
    || !formatTanggalBatch(data.tanggal_produksi) || !presentasiStatusBatch(data.status)
    || (data.keterangan_publik !== null && typeof data.keterangan_publik !== "string")) return null;
  // Whitelist RPC: jangan membawa field internal tambahan ke presentasi.
  return { kode_batch: kode, nama_varian: data.nama_varian, tanggal_produksi: data.tanggal_produksi as string, status: data.status as BatchPublik["status"], keterangan_publik: data.keterangan_publik as string | null };
}

export function buatKontakBatch(kanal: { whatsapp?: string | null; email?: string | null }, pesan: string) {
  try {
    const url = new URL(kanal.whatsapp ?? "");
    if (url.protocol === "https:" && url.hostname === "wa.me" && /^\/[0-9]+$/.test(url.pathname) && !url.username && !url.password && !url.port) {
      url.searchParams.set("text", pesan);
      return { url: url.toString(), label: "Hubungi Wawangian Pelajar" };
    }
  } catch { /* Kanal kosong/rusak memakai kontak resmi alternatif. */ }
  if (kanal.email && /^mailto:[^\s?@]+@[^\s?@]+\.[^\s?@]+$/.test(kanal.email)) return { url: kanal.email, label: "Hubungi Wawangian Pelajar" };
  return null;
}

export function buatUrlBatch(origin: string, kode: string) {
  const url = new URL(origin);
  if (url.protocol !== "https:" || url.hostname === "localhost" || !kodeBatchValid(kode)) throw new Error("Origin produksi wajib HTTPS dan kode batch wajib valid.");
  return `${url.origin}/batch/${normalisasiKodeBatch(kode)}`;
}
