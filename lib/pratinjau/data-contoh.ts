export function modePratinjauDataContohAktif() {
  const sakelarAktif = process.env.MODE_PRATINJAU_DATA_CONTOH === "true";
  const pengembanganLokal = process.env.NODE_ENV === "development";
  const pratinjauVercel = process.env.VERCEL_ENV === "preview";

  return sakelarAktif && (pengembanganLokal || pratinjauVercel);
}
