import { buatKlienSupabaseServer } from "@/lib/supabase/klien-server";
import { kodeBatchValid, normalisasiKodeBatch } from "./validasi";

export async function ambilBatchPublik(kode: string) {
  const canonical = normalisasiKodeBatch(kode);
  if (!kodeBatchValid(canonical)) return { jenis: "tidak-valid" as const };
  try {
    const supabase = await buatKlienSupabaseServer();
    const { data, error } = await supabase.rpc("batch_publik", { kode: canonical });
    if (error) return { jenis: "galat" as const };
    return data?.[0] ? { jenis: "ada" as const, data: data[0] } : { jenis: "tidak-ada" as const };
  } catch {
    return { jenis: "galat" as const };
  }
}
