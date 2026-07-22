import { modePratinjauDataContohAktif } from "@/lib/pratinjau/data-contoh";
import { konfigurasiSupabasePublikTersedia } from "@/lib/supabase/konfigurasi";
import { buatKlienSupabaseServer } from "@/lib/supabase/klien-server";

export type RingkasanDonasi = {
  tersedia: boolean;
  terkumpul: number;
  tersalurkan: number;
  saldoAmanah: number;
  jumlahRekap: number;
  jumlahPenyaluran: number;
  sumberData: "contoh" | "supabase";
};

export type MetodeDonasi = {
  id: string;
  periodeMulai: string;
  periodeSelesai: string;
  sumber: "shopee" | "tiktok" | "gabungan";
  persentase: number;
  jumlahDonasi: number;
  catatanMetode: string;
  sumberData: "contoh" | "supabase";
};

export type PenyaluranPublik = {
  id: string;
  tanggal: string;
  jumlah: number;
  penerimaNama: string;
  penerimaJenis: "pelajar" | "mahasiswa" | "guru" | "lembaga";
  tujuanDeskripsi: string;
  bukti: string[];
  artikel?: { judul: string; slug: string };
  sumberData: "contoh" | "supabase";
};

type BarisRingkasan = {
  terkumpul: number;
  tersalurkan: number;
  saldo_amanah: number;
  jumlah_rekap: number;
  jumlah_penyaluran: number;
};

type BarisMetode = {
  id: string;
  periode_mulai: string;
  periode_selesai: string;
  sumber: MetodeDonasi["sumber"];
  persentase: number;
  jumlah_donasi: number;
  catatan_metode: string;
};

type BarisPenyaluran = {
  id: string;
  tanggal: string;
  jumlah: number;
  penerima_nama: string;
  penerima_jenis: PenyaluranPublik["penerimaJenis"];
  tujuan_deskripsi: string;
  bukti: string[];
  artikel: { judul: string; slug: string; status: string } | null;
};

const ringkasanKosong: RingkasanDonasi = {
  tersedia: false,
  terkumpul: 0,
  tersalurkan: 0,
  saldoAmanah: 0,
  jumlahRekap: 0,
  jumlahPenyaluran: 0,
  sumberData: "supabase",
};

const ringkasanDonasiContoh: RingkasanDonasi = {
  tersedia: true,
  terkumpul: 2_400_000,
  tersalurkan: 1_650_000,
  saldoAmanah: 750_000,
  jumlahRekap: 2,
  jumlahPenyaluran: 2,
  sumberData: "contoh",
};

const metodeDonasiContoh: MetodeDonasi[] = [
  {
    id: "contoh-rekap-semester-1-2026",
    periodeMulai: "2026-01-01",
    periodeSelesai: "2026-06-30",
    sumber: "gabungan",
    persentase: 20,
    jumlahDonasi: 1_400_000,
    catatanMetode: "Simulasi tampilan rekap gabungan semester pertama. Angka ini bukan hasil penjualan nyata.",
    sumberData: "contoh",
  },
  {
    id: "contoh-rekap-juli-2026",
    periodeMulai: "2026-07-01",
    periodeSelesai: "2026-07-20",
    sumber: "shopee",
    persentase: 20,
    jumlahDonasi: 1_000_000,
    catatanMetode: "Simulasi tampilan rekap periode Juli. Angka ini hanya menguji keterbacaan halaman.",
    sumberData: "contoh",
  },
];

const penyaluranDonasiContoh: PenyaluranPublik[] = [
  {
    id: "contoh-penyaluran-002",
    tanggal: "2026-07-15",
    jumlah: 950_000,
    penerimaNama: "Penerima Contoh A",
    penerimaJenis: "pelajar",
    tujuanDeskripsi: "Simulasi bantuan perlengkapan belajar untuk memeriksa susunan kartu, angka, dan detail bukti. Bukan penyaluran nyata.",
    bukti: ["/placeholder-bukti-contoh.svg"],
    artikel: {
      judul: "Mengapa bukti donasi penting?",
      slug: "mengapa-bukti-donasi-penting",
    },
    sumberData: "contoh",
  },
  {
    id: "contoh-penyaluran-001",
    tanggal: "2026-06-18",
    jumlah: 700_000,
    penerimaNama: "Lembaga Pendidikan Contoh",
    penerimaJenis: "lembaga",
    tujuanDeskripsi: "Simulasi dukungan bahan bacaan untuk mengisi preview transparansi. Nama, jumlah, dan tujuan bukan data bisnis nyata.",
    bukti: ["/placeholder-bukti-contoh.svg"],
    sumberData: "contoh",
  },
];

export async function ambilRingkasanDonasiPublik(): Promise<RingkasanDonasi> {
  if (modePratinjauDataContohAktif()) return ringkasanDonasiContoh;
  if (!konfigurasiSupabasePublikTersedia()) return ringkasanKosong;
  const supabase = await buatKlienSupabaseServer();
  const { data, error } = await supabase.rpc("ringkasan_donasi_publik");
  const baris = (data as BarisRingkasan[] | null)?.[0];
  if (error || !baris) return ringkasanKosong;
  return {
    tersedia: true,
    terkumpul: Number(baris.terkumpul),
    tersalurkan: Number(baris.tersalurkan),
    saldoAmanah: Number(baris.saldo_amanah),
    jumlahRekap: Number(baris.jumlah_rekap),
    jumlahPenyaluran: Number(baris.jumlah_penyaluran),
    sumberData: "supabase",
  };
}

export async function ambilMetodeDonasiPublik(): Promise<MetodeDonasi[]> {
  if (modePratinjauDataContohAktif()) return metodeDonasiContoh;
  if (!konfigurasiSupabasePublikTersedia()) return [];
  const supabase = await buatKlienSupabaseServer();
  const { data, error } = await supabase.rpc("daftar_metode_donasi_publik");
  if (error || !data) return [];
  return (data as BarisMetode[]).map((baris) => ({
    id: baris.id,
    periodeMulai: baris.periode_mulai,
    periodeSelesai: baris.periode_selesai,
    sumber: baris.sumber,
    persentase: Number(baris.persentase),
    jumlahDonasi: Number(baris.jumlah_donasi),
    catatanMetode: baris.catatan_metode,
    sumberData: "supabase",
  }));
}

function petakanPenyaluran(baris: BarisPenyaluran): PenyaluranPublik {
  const artikel = baris.artikel?.status === "terbit"
    ? { judul: baris.artikel.judul, slug: baris.artikel.slug }
    : undefined;
  return {
    id: baris.id,
    tanggal: baris.tanggal,
    jumlah: Number(baris.jumlah),
    penerimaNama: baris.penerima_nama,
    penerimaJenis: baris.penerima_jenis,
    tujuanDeskripsi: baris.tujuan_deskripsi,
    bukti: baris.bukti ?? [],
    artikel,
    sumberData: "supabase",
  };
}

const pilihanPenyaluran = "id,tanggal,jumlah,penerima_nama,penerima_jenis,tujuan_deskripsi,bukti,artikel:artikel_id(judul,slug,status)";

export async function ambilPenyaluranPublik(): Promise<PenyaluranPublik[]> {
  if (modePratinjauDataContohAktif()) return penyaluranDonasiContoh;
  if (!konfigurasiSupabasePublikTersedia()) return [];
  const supabase = await buatKlienSupabaseServer();
  const { data, error } = await supabase
    .from("penyaluran_donasi")
    .select(pilihanPenyaluran)
    .eq("status", "terpublikasi")
    .order("tanggal", { ascending: false });
  if (error || !data) return [];
  return (data as unknown as BarisPenyaluran[]).map(petakanPenyaluran);
}

export async function ambilPenyaluranPublikBerdasarkanId(id: string): Promise<PenyaluranPublik | undefined> {
  if (modePratinjauDataContohAktif()) {
    return penyaluranDonasiContoh.find((item) => item.id === id);
  }
  if (!konfigurasiSupabasePublikTersedia()) return undefined;
  const supabase = await buatKlienSupabaseServer();
  const { data, error } = await supabase
    .from("penyaluran_donasi")
    .select(pilihanPenyaluran)
    .eq("id", id)
    .eq("status", "terpublikasi")
    .maybeSingle();
  if (error || !data) return undefined;
  return petakanPenyaluran(data as unknown as BarisPenyaluran);
}

export function formatTanggalDonasi(nilai: string) {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(
    new Date(`${nilai}T00:00:00+07:00`),
  );
}

export const labelSumberDonasi: Record<MetodeDonasi["sumber"], string> = {
  shopee: "Shopee",
  tiktok: "TikTok Shop",
  gabungan: "Gabungan marketplace",
};

export const labelPenerimaDonasi: Record<PenyaluranPublik["penerimaJenis"], string> = {
  pelajar: "Pelajar",
  mahasiswa: "Mahasiswa",
  guru: "Guru",
  lembaga: "Lembaga pendidikan",
};
