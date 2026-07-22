export function modePratinjauDataContohAktif() {
  return (
    process.env.NODE_ENV === "development" &&
    process.env.MODE_PRATINJAU_DATA_CONTOH === "true"
  );
}
