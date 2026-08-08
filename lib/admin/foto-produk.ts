const MAKSIMAL_FOTO = 4;
const HOST_SUPABASE = "jttepaxwjmmopflpgbac.supabase.co";
const AWAL_LOKASI = "/storage/v1/object/public/produk/";

export function susunFotoProduk(fotoLama: string[], fotoBaru: string[]) {
  return [...new Set([...fotoLama, ...fotoBaru])].slice(0, MAKSIMAL_FOTO);
}

export function ambilLokasiFotoProduk(urlFoto: string) {
  try {
    const url = new URL(urlFoto);
    if (url.hostname !== HOST_SUPABASE || !url.pathname.startsWith(AWAL_LOKASI)) {
      return undefined;
    }
    const lokasi = decodeURIComponent(url.pathname.slice(AWAL_LOKASI.length));
    return lokasi && !lokasi.includes("..") ? lokasi : undefined;
  } catch {
    return undefined;
  }
}
