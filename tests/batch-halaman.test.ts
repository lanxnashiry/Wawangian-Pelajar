import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";
import { createRequire } from "node:module";
import { renderToStaticMarkup } from "react-dom/server";
import * as validasi from "../lib/batch/validasi.ts";
import { kanalResmi } from "../data/kanal-resmi.ts";
const requireAsli = createRequire(import.meta.url);

function muatHalaman(path: string, hasil: unknown) {
  const modul = { exports: {} as Record<string, (props: unknown) => unknown> };
  const kode = ts.transpileModule(readFileSync(path, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(kode, { exports: modul.exports, module: modul, require: (nama: string) => {
    if (nama === "@/lib/batch/data") return { ambilBatchPublik: async () => hasil };
    if (nama === "@/lib/batch/validasi") return validasi;
    if (nama === "@/data/kanal-resmi") return { kanalResmi };
    if (nama === "next/navigation") return { notFound: () => { throw new Error("404"); }, redirect: (url: string) => { throw new Error(`redirect:${url}`); } };
    return requireAsli(nama);
  } });
  return modul.exports.default;
}

test("render fixture tiga status, XSS, draft dan galat tanpa koneksi database", async () => {
  const path = "app/(publik)/batch/[kode_batch]/page.tsx";
  for (const status of ["diedarkan", "ditarik", "nonaktif"]) {
    const data = { kode_batch: "UJI-01", nama_varian: "Snapshot <script>uji</script>", tanggal_produksi: "2026-10-21", status, keterangan_publik: "<img src=x onerror=alert(1)>" };
    const halaman = muatHalaman(path, { jenis: "ada", data });
    const elemen = await halaman({ params: Promise.resolve({ kode_batch: "UJI-01" }) });
    const html = renderToStaticMarkup(elemen as Parameters<typeof renderToStaticMarkup>[0]);
    assert.equal((html.match(/<h1/g) ?? []).length, 1);
    assert.ok(html.includes("21 Oktober 2026"));
    assert.ok(html.includes("&lt;script&gt;"));
    assert.ok(html.includes("&lt;img"));
    assert.doesNotMatch(html, /<script>|<img/);
    assert.equal(html.includes("Batch terdaftar di Wawangian Pelajar"), status === "diedarkan");
  }
  for (const jenis of ["tidak-ada", "tidak-valid"]) await assert.rejects(async () => muatHalaman(path, { jenis })({ params: Promise.resolve({ kode_batch: "UJI-01" }) }), /404/);
  await assert.rejects(async () => muatHalaman(path, { jenis: "galat" })({ params: Promise.resolve({ kode_batch: "UJI-01" }) }), /Layanan batch/);
  await assert.rejects(async () => muatHalaman(path, { jenis: "ada", data: { status: "asing" } })({ params: Promise.resolve({ kode_batch: "UJI-01" }) }), /Data publik/);
  await assert.rejects(async () => muatHalaman(path, null)({ params: Promise.resolve({ kode_batch: "uji-01" }) }), /redirect:\/batch\/UJI-01/);
});
const baca = (path: string) => readFileSync(path, "utf8");

test("detail menonjolkan snapshot, peringatan sebelum detail, copy box dan batas QR", () => {
  const halaman = baca("app/(publik)/batch/[kode_batch]/page.tsx");
  assert.match(halaman, /<h1[^>]*>\{batch.nama_varian\}<\/h1>/);
  assert.ok(halaman.indexOf("status.heading") < halaman.indexOf("<dl"));
  for (const teks of ["Nomor batch", "Tanggal produksi", "Status batch", "Cocokkan nama parfum", "pada box dan label botol kamu.", "Ada perbedaan atau kendala?", "Hubungi kami dengan menyertakan foto box, label botol, dan nomor batch.", "QR ini menunjukkan catatan satu batch produksi dan digunakan pada beberapa kemasan. Pemeriksaan ini tidak memverifikasi setiap botol secara individual."]) assert.ok(halaman.includes(teks), teks);
  assert.match(halaman, /break-all/);
  assert.doesNotMatch(halaman, /dangerouslySetInnerHTML|30 ml|kode_formula|statusBatchPublik/);
  assert.match(baca("lib/batch/data.ts"), /bacaBatchPublik/);
  assert.match(baca("lib/batch/data.ts"), /noStore\(\)/);
});

test("lookup mempertahankan input dan memiliki pesan aksesibel tanpa asumsi label fisik", () => {
  const halaman = baca("app/(publik)/cek-batch/page.tsx");
  assert.match(halaman, /defaultValue=\{kode/);
  assert.match(halaman, /role="alert"/);
  assert.match(halaman, /aria-invalid/);
  assert.ok(halaman.includes("Format kode batch tidak valid. Periksa kembali penulisannya."));
  assert.ok(halaman.includes("Masukkan kode batch jika kamu memilikinya. Jika tidak, pindai QR pada box atau hubungi Wawangian Pelajar."));
  assert.doesNotMatch(halaman, /Kode tercetak/);
  assert.match(baca("app/(publik)/batch/[kode_batch]/not-found.tsx"), /Kami belum dapat mencocokkan kode ini dengan catatan produksi/);
  const galat = baca("app/(publik)/batch/[kode_batch]/error.tsx");
  assert.match(galat, /Pemeriksaan sementara belum tersedia/);
  assert.match(galat, /retry/);
});

test("hook Umami menolak path batch, query lookup dan referer termasuk navigasi SPA", () => {
  const jendela = { location: { href: "https://www.wawangianpelajar.com/katalog" }, saringAnalitikBatch: undefined as unknown };
  vm.runInNewContext(baca("public/privasi-analitik.js"), { window: jendela, URL });
  const saring = jendela.saringAnalitikBatch as (jenis: string, data: Record<string, string>) => unknown;
  assert.deepEqual(saring("event", { url: "/katalog" }), { url: "/katalog" });
  for (const url of ["/batch/UJI-01", "/%62atch/UJI-01", "/cek-batch?kode=UJI", "/batch/%", "%%%"] ) assert.equal(saring("event", { url }), false, url);
  assert.equal(saring("event", { url: "/katalog", referrer: "https://www.wawangianpelajar.com/batch/UJI-01" }), false);
  jendela.location.href = "https://www.wawangianpelajar.com/batch/UJI-01";
  assert.equal(saring("event", { url: "/katalog" }), false);
  const tracker = baca("components/analitik-umami.tsx");
  assert.match(tracker, /data-before-send="saringAnalitikBatch"/);
  const layout = baca("app/layout.tsx");
  assert.match(layout, /privasi-analitik.js/);
  assert.match(layout, /beforeInteractive/);
});
