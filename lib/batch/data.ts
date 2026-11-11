import { unstable_noStore as noStore } from "next/cache";
import { buatKlienSupabaseServer } from "@/lib/supabase/klien-server";
import { bacaBatchPublik, kodeBatchValid, normalisasiKodeBatch } from "./validasi";

export async function ambilBatchPublik(kode: string) {
  noStore();
  const canonical = normalisasiKodeBatch(kode);
  if (!kodeBatchValid(canonical)) return { jenis: "tidak-valid" as const };
  try {
    const supabase = await buatKlienSupabaseServer();
    const { data, error } = await supabase.rpc("batch_publik", { kode: canonical });
    if (error) return { jenis: "galat" as const };
    if (!Array.isArray(data) || data.length > 1) return { jenis: "galat" as const };
    if (!data.length) return { jenis: "tidak-ada" as const };
    const batch = bacaBatchPublik(data[0], canonical);
    if (!batch) {
      console.error("Proyeksi publik batch tidak valid.");
      return { jenis: "galat" as const };
    }
    if (batch.status === "ditarik" && !batch.keterangan_publik?.trim()) console.warn("Petunjuk tambahan penarikan batch kosong; periksa melalui Admin.");
    return { jenis: "ada" as const, data: batch };
  } catch {
    return { jenis: "galat" as const };
  }
}
