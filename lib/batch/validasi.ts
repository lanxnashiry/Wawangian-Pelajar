export type StatusBatch = "draft" | "diedarkan" | "ditarik" | "nonaktif";
export type MasukanBatch = {
  kodeBatch: string;
  produkId: string;
  tanggalProduksi: string;
  kodeFormula?: string;
  catatanInternal?: string;
  keteranganPublik?: string;
};

const POLA_KODE = /^[A-Z0-9]+(?:-[A-Z0-9]+)*$/;
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
  if (!kodeBatchValid(data.kodeBatch)) galat.kodeBatch = "Kode batch harus 3–40 karakter ASCII, huruf/angka dengan tanda hubung antarsegmen.";
  if (!data.produkId.trim()) galat.produkId = "Varian wajib dipilih.";
  if (!tanggalKalenderValid(data.tanggalProduksi) || data.tanggalProduksi > hariJakarta) galat.tanggalProduksi = "Tanggal produksi wajib valid dan tidak boleh melewati hari ini di Jakarta.";
  if ((data.kodeFormula?.trim().length ?? 0) > 100) galat.kodeFormula = "Kode formula maksimal 100 karakter.";
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

export function buatUrlBatch(origin: string, kode: string) {
  const url = new URL(origin);
  if (url.protocol !== "https:" || url.hostname === "localhost" || !kodeBatchValid(kode)) throw new Error("Origin produksi wajib HTTPS dan kode batch wajib valid.");
  return `${url.origin}/batch/${normalisasiKodeBatch(kode)}`;
}
