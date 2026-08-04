"use server";

import { revalidatePath } from "next/cache";
import { wajibAdmin } from "@/lib/admin/otorisasi";
import { ambilDataValid, prosesBarisEntriMassal } from "@/lib/admin/entri-massal/proses";
import { bacaWorkbookEntriMassal } from "@/lib/admin/entri-massal/workbook";

const BATAS_FILE = 5 * 1024 * 1024;

export type HasilAksiEntriMassal = {
  berhasil: boolean;
  pesan: string;
  pratinjau?: ReturnType<typeof prosesBarisEntriMassal>;
  hasilImpor?: { jumlahProduk: number; jumlahArtikel: number; batchId?: string };
};

async function prosesFile(formulir: FormData) {
  const { supabase } = await wajibAdmin();
  const file = formulir.get("workbook");
  if (!(file instanceof File) || file.size === 0) throw new Error("Pilih berkas .xlsx terlebih dahulu.");
  if (file.size > BATAS_FILE) throw new Error("Ukuran workbook maksimal 5 MB.");
  if (!file.name.toLowerCase().endsWith(".xlsx")) throw new Error("Berkas harus berformat .xlsx.");

  const workbook = await bacaWorkbookEntriMassal(Buffer.from(await file.arrayBuffer()));
  if (workbook.produk.length + workbook.artikel.length === 0) throw new Error("Workbook tidak memiliki baris data.");

  const awal = prosesBarisEntriMassal(workbook, new Set(), new Set());
  const kandidatProduk = awal.produk.flatMap((item) => item.data?.slug ? [item.data.slug] : []);
  const kandidatArtikel = awal.artikel.flatMap((item) => item.data?.slug ? [item.data.slug] : []);
  const [produkAda, artikelAda] = await Promise.all([
    kandidatProduk.length
      ? supabase.from("produk").select("slug").in("slug", kandidatProduk)
      : Promise.resolve({ data: [], error: null }),
    kandidatArtikel.length
      ? supabase.from("artikel").select("slug").in("slug", kandidatArtikel)
      : Promise.resolve({ data: [], error: null }),
  ]);
  if (produkAda.error || artikelAda.error) throw new Error("Gagal memeriksa slug pada database.");
  const hasil = prosesBarisEntriMassal(
    workbook,
    new Set((produkAda.data ?? []).map((item) => item.slug)),
    new Set((artikelAda.data ?? []).map((item) => item.slug)),
  );
  return { supabase, hasil };
}

export async function pratinjauWorkbook(formulir: FormData): Promise<HasilAksiEntriMassal> {
  try {
    const { hasil } = await prosesFile(formulir);
    return {
      berhasil: hasil.ringkasan.galat === 0,
      pesan: hasil.ringkasan.galat
        ? `${hasil.ringkasan.galat} baris perlu diperbaiki. Belum ada data yang disimpan.`
        : `${hasil.ringkasan.valid} baris siap diimpor. Belum ada data yang disimpan.`,
      pratinjau: hasil,
    };
  } catch (error) {
    return { berhasil: false, pesan: error instanceof Error ? error.message : "Workbook gagal dibaca." };
  }
}

export async function imporWorkbook(formulir: FormData): Promise<HasilAksiEntriMassal> {
  try {
    const { supabase, hasil } = await prosesFile(formulir);
    if (hasil.ringkasan.galat > 0) {
      return { berhasil: false, pesan: "Impor dibatalkan karena masih ada baris yang tidak valid.", pratinjau: hasil };
    }
    const data = ambilDataValid(hasil);
    const { data: hasilRpc, error } = await supabase.rpc("impor_massal_produk_artikel", {
      produk_baru: data.produk,
      artikel_baru: data.artikel,
    });
    if (error) {
      const pesan = error.code === "23505"
        ? "Impor dibatalkan karena slug baru saja dipakai data lain. Muat ulang dan periksa lagi."
        : `Impor gagal dan tidak ada data yang disimpan: ${error.message}`;
      return { berhasil: false, pesan, pratinjau: hasil };
    }
    revalidatePath("/");
    revalidatePath("/katalog");
    revalidatePath("/temukan");
    revalidatePath("/cerita");
    revalidatePath("/sitemap.xml");
    revalidatePath("/admin");
    revalidatePath("/admin/produk");
    revalidatePath("/admin/konten");
    const rpc = hasilRpc as { batch_id?: string; jumlah_produk?: number; jumlah_artikel?: number } | null;
    return {
      berhasil: true,
      pesan: `Berhasil mengimpor ${data.produk.length} Produk dan ${data.artikel.length} Artikel draft.`,
      hasilImpor: { jumlahProduk: data.produk.length, jumlahArtikel: data.artikel.length, batchId: rpc?.batch_id },
    };
  } catch (error) {
    return { berhasil: false, pesan: error instanceof Error ? error.message : "Impor gagal." };
  }
}
