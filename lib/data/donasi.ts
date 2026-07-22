import { konfigurasiSupabasePublikTersedia } from "@/lib/supabase/konfigurasi";
import { buatKlienSupabaseServer } from "@/lib/supabase/klien-server";

export type RingkasanDonasi = {
  tersedia: boolean;
  terkumpul: number;
  tersalurkan: number;
  saldoAmanah: number;
  jumlahRekap: number;
  jumlahPenyaluran: number;
};

export type MetodeDonasi = {
  id: string;
  periodeMulai: string;
  periodeSelesai: string;
  sumber: "shopee" | "tiktok" | "gabungan";
  persentase: number;
  jumlahDonasi: number;
  catatanMetode: string;
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
};

export async function ambilRingkasanDonasiPublik(): Promise<RingkasanDonasi> {
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
  };
}

export async function ambilMetodeDonasiPublik(): Promise<MetodeDonasi[]> {
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
  };
}

const pilihanPenyaluran = "id,tanggal,jumlah,penerima_nama,penerima_jenis,tujuan_deskripsi,bukti,artikel:artikel_id(judul,slug,status)";

export async function ambilPenyaluranPublik(): Promise<PenyaluranPublik[]> {
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
