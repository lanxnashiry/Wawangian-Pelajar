// Hanya preload server lokal uji: node --require ./tests/batch-layanan-fixture.cjs node_modules/next/dist/bin/next start --port 3108
// Tidak membuka database: semua permintaan Supabase pada proses ini ditolak kecuali RPC fixture read-only.
const fetchAsli = globalThis.fetch;
globalThis.fetch = async function (input, opsi) {
  const url = String(input instanceof Request ? input.url : input);
  if (url.includes("supabase.co")) {
    if (url.includes("/rest/v1/rpc/batch_publik")) {
      const { kode } = JSON.parse(opsi.body);
      if (kode === "UJI-GALAT") return new Response(JSON.stringify({ message: "Gangguan fixture" }), { status: 503 });
      const status = { "UJI-EDAR": "diedarkan", "UJI-TARIK": "ditarik", "UJI-NONAKTIF": "nonaktif", "UJI-RUSAK": "asing" }[kode];
      return Response.json(status ? [{ kode_batch: kode, nama_varian: "Snapshot Uji <script>tidakDieksekusi()</script>", tanggal_produksi: "2026-10-21", status, keterangan_publik: null }] : []);
    }
    throw new Error("Akses database dinonaktifkan pada proses fixture.");
  }
  return fetchAsli(input, opsi);
};
