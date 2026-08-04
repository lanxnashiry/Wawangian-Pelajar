# Rencana Revisi: Form Artikel & Fondasi SEO

> **Untuk Codex:** Kerjakan task demi task berurutan. Jangan lompat fase. Commit setelah tiap task.
> Dokumen ini ditulis oleh Hermes setelah audit langsung atas kode di `D:\Ngoding\Wawangian Pelajar`.
> Bahasa penamaan kode di repo ini **Bahasa Indonesia** — pertahankan konvensi itu.

**Goal:** Membuat form admin artikel + halaman artikel publik mampu menghasilkan artikel yang benar-benar SEO-friendly, tanpa merusak data artikel yang sudah ada.

**Arsitektur:** Tambah kolom SEO khusus di tabel `artikel`, ganti parser teks buatan sendiri dengan renderer Markdown sungguhan (`react-markdown` + `remark-gfm`), lalu lengkapi metadata teknis (canonical, Open Graph, JSON-LD, sitemap, robots) yang saat ini belum ada sama sekali.

**Tech Stack:** Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4, Supabase (Postgres + Storage), TypeScript 5.

**Nomor keputusan berikutnya:** `KEP-037` (terakhir terpakai di `DECISIONS.md` adalah KEP-036).

---

## 1. Hasil Audit — Kondisi Nyata Sekarang

Diverifikasi dengan membaca kode, bukan asumsi.

### Yang sudah benar (jangan diubah)
| Hal | Bukti |
|---|---|
| `cuplikan` **sudah** dipakai sebagai meta description | `app/(publik)/cerita/[slug]/page.tsx:55` → `description: artikel.cuplikan` |
| Template title global sudah ada | `app/layout.tsx` → `template: "%s · Wawangian Pelajar"` |
| Breadcrumb visual sudah ada | `cerita/[slug]/page.tsx:80-96` |
| Slug tervalidasi & unik | migrasi `202607210001` → `slug text not null unique check (slug ~ '^[a-z0-9]+...')` |
| CTA kontekstual per kategori sudah jalan | `cerita/[slug]/page.tsx:16-41` (`tujuanTindakan`) |
| Tombol share sudah ada + bisa dimatikan | `components/tombol-bagikan.tsx`, kolom `share_aktif` |
| `lang="id"` sudah benar | `app/layout.tsx` |

### Masalah — diurut dari paling merugikan

**M1 — Isi artikel tidak mendukung tautan, bold, list, H3, atau tabel. (KRITIS)**
`app/admin/(terlindungi)/konten/tindakan.ts:9-18` (`ubahTeksMenjadiBagian`) hanya mengenali dua hal: blok yang diawali `## ` jadi judul bagian, sisanya jadi paragraf mentah. Lalu di `cerita/[slug]/page.tsx:125-129` paragraf dirender sebagai `<p>{paragraf}</p>` — React meng-escape semuanya, jadi Markdown apa pun tampil sebagai teks literal.

Dampak: **tidak mungkin menaruh tautan internal ke halaman produk dari dalam artikel.** Seluruh strategi konten hybrid (edukasi → arahkan ke produk) mati di sini. Juga tidak bisa dapat *featured snippet* Google karena itu butuh list/tabel terstruktur.

**M2 — `judul` dipakai ganda untuk H1 dan meta title. (KRITIS)**
`cerita/[slug]/page.tsx:54` → `title: artikel.judul`. Padahal H1 idealnya panjang dan naratif, sedangkan meta title maksimal ±60 karakter sebelum Google memotongnya. Ditambah template `· Wawangian Pelajar` yang memakan 21 karakter lagi, judul efektif tinggal ±39 karakter. Judul artikel yang sudah ditulis (76 karakter) pasti terpotong di hasil pencarian.

**M3 — Tidak ada `sitemap.xml` dan `robots.txt`. (KRITIS — tidak ada di daftar awal saya)**
Tidak ada `app/sitemap.ts` maupun `app/robots.ts`. Google harus menemukan artikel dengan menjelajah tautan satu per satu. Untuk website baru tanpa backlink, ini memperlambat pengindeksan berminggu-minggu.

**M4 — `metadataBase` tidak diset, jadi Open Graph rusak. (KRITIS — tidak ada di daftar awal saya)**
`app/layout.tsx` tidak punya `metadataBase`, dan tidak ada blok `openGraph` sama sekali. Akibatnya: saat tautan artikel dibagikan ke WhatsApp/Instagram/Twitter, preview-nya tidak menampilkan gambar dan judul dengan benar. Padahal distribusi lo lewat media sosial.

**M5 — `tanggal_terbit` tidak pernah diisi. (BUG — tidak ada di daftar awal saya)**
`tindakan.ts:34-46` menyusun objek `muatan` tanpa field `tanggal_terbit`. Padahal kolomnya ada (`tanggal_terbit timestamptz`) dan sudah diindeks (`artikel_terbit_idx on public.artikel(status, tanggal_terbit desc)`). Jadi artikel berstatus `terbit` tetap punya `tanggal_terbit = NULL`.

Dampak: indeks itu tidak berguna, urutan artikel tidak bisa diandalkan, dan nanti tidak ada tanggal ISO valid untuk `datePublished` di schema markup. Google memakai tanggal untuk menilai kesegaran konten.

**M6 — `force-dynamic` mematikan cache. (tidak ada di daftar awal saya)**
`cerita/[slug]/page.tsx:43` → `export const dynamic = "force-dynamic"`. Setiap kunjungan memicu render server + query Supabase. Artikel blog itu konten statis; ini memperlambat TTFB tanpa alasan dan menekan skor Core Web Vitals, yang merupakan faktor peringkat.

**M7 — Tidak ada alt text untuk gambar.**
Form tidak punya kolom alt text, dan `components/visual-data.tsx` (`VisualArtikel`) tidak menerimanya. Gambar tidak bisa muncul di Google Images, dan halaman tidak aksesibel bagi pengguna pembaca layar.

**M8 — Tidak ada canonical URL.**
Tanpa `alternates.canonical`, jika satu artikel bisa diakses dari lebih dari satu URL, Google bisa menganggapnya konten duplikat.

**M9 — Tidak ada schema markup (JSON-LD).**
Belum ada `Article`, `BreadcrumbList`, atau `FAQPage`. Ini yang sudah lo tandai sebagai *"Later: SEO lanjutan"* di `Modul_6_Konten_Edukasi_v1.md` poin 10 — jadi memang ditunda sengaja, bukan kelupaan. Tetap dikerjakan di rencana ini karena biayanya kecil.

**M10 — Tidak ada kolom fokus kata kunci.**
Google tidak membaca kolom ini, jadi manfaatnya bukan teknis melainkan disiplin kerja: pengingat artikel ini menargetkan kata kunci apa.

**M11 — `cuplikan` menanggung dua peran sekaligus.**
Dipakai sebagai meta description (untuk menarik klik di Google) sekaligus teks kartu di halaman daftar (`components/kartu-artikel.tsx`). Kebutuhannya beda: meta description butuh ajakan bertindak, teks kartu cuma perlu ringkasan. Solusinya bukan menghapus `cuplikan`, tapi menambah `meta_deskripsi` opsional yang menimpanya khusus untuk mesin pencari.

---

## 2. Keputusan Arsitektur

### K1 — Simpan Markdown mentah di kolom baru, `bagian` dipertahankan

Jangan hapus kolom `bagian jsonb`. Tambah kolom `isi_markdown text`.

Alasan: 5 artikel contoh di `data/artikel.ts` memakai struktur `bagian`, dan `components/kartu-artikel.tsx` serta homepage kemungkinan masih menyentuhnya. Menghapusnya berisiko merusak hal lain. Aturan render:

```
Jika isi_markdown terisi  → render sebagai Markdown (jalur baru)
Jika kosong               → render dari bagian[] (jalur lama, artikel yang sudah ada tetap tampil)
```

Ini membuat migrasi tidak merusak apa pun dan bisa dibatalkan.

### K2 — Pakai `react-markdown` + `remark-gfm`, jangan bikin parser sendiri

Menulis parser Markdown sendiri adalah sumber bug tanpa akhir dan celah XSS. `react-markdown` secara bawaan **tidak** merender HTML mentah, jadi aman dari penyuntikan skrip lewat isi artikel.

**Jangan pasang `rehype-raw`.** Paket itu justru mengaktifkan HTML mentah dan membuka celah XSS. Tidak dibutuhkan di sini.

`remark-gfm` menambahkan tabel, strikethrough, dan daftar tugas.

### K3 — Meta title & meta description opsional, dengan fallback

Jangan wajibkan kolom baru. Perilaku:

```
meta_judul kosong    → pakai judul
meta_deskripsi kosong → pakai cuplikan
```

Artinya artikel lama tetap benar tanpa disunting, dan admin hanya mengisi kolom SEO saat ingin mengoptimalkan.

### K4 — Ganti `force-dynamic` dengan ISR 5 menit

Ganti ke `export const revalidate = 300`. Artikel tetap segar dalam 5 menit setelah disunting, tapi kunjungan biasa dilayani dari cache. Aksi `simpanArtikel` sudah memanggil `revalidatePath("/cerita")`, jadi perubahan admin tetap langsung terlihat.

### K5 — Domain dasar lewat variabel lingkungan

`metadataBase` butuh URL absolut. Jangan hardcode. Pakai `NEXT_PUBLIC_URL_SITUS` dengan fallback ke domain produksi.

---

## 3. Berkas yang Akan Berubah

**Dibuat baru:**
- `supabase/migrations/202608010007_m6_kolom_seo_artikel.sql`
- `components/isi-markdown.tsx`
- `components/skema-artikel.tsx`
- `app/sitemap.ts`
- `app/robots.ts`

**Diubah:**
- `data/artikel.ts` — tambah field tipe
- `lib/data/publik.ts` — pemetaan kolom baru
- `components/admin/formulir-artikel.tsx` — kolom SEO baru
- `app/admin/(terlindungi)/konten/tindakan.ts` — simpan kolom baru + perbaiki `tanggal_terbit`
- `app/(publik)/cerita/[slug]/page.tsx` — metadata lengkap, render Markdown, JSON-LD, ISR
- `app/layout.tsx` — `metadataBase` + Open Graph global
- `components/visual-data.tsx` — terima alt text
- `.env.example` + `.env.local` — `NEXT_PUBLIC_URL_SITUS`
- `DECISIONS.md` — catat KEP-037 s/d KEP-041
- `CHANGELOG.md`, `STATUS.md` — sesuai konvensi repo

**Dependensi baru:** `react-markdown`, `remark-gfm`

---

## FASE 0 — Persiapan

### Task 1: Tambah variabel lingkungan URL situs

**Tujuan:** Menyediakan URL absolut untuk `metadataBase`, canonical, dan sitemap.

**Berkas:**
- Ubah: `.env.example`
- Ubah: `.env.local`

**Langkah 1:** Tambahkan baris berikut ke `.env.example`:

```
# URL publik situs, dipakai untuk metadataBase, canonical, sitemap, Open Graph.
NEXT_PUBLIC_URL_SITUS=https://web-wawangian-pelajar.vercel.app
```

**Langkah 2:** Tambahkan baris yang sama ke `.env.local`.

**Langkah 3:** Verifikasi

Jalankan: `grep NEXT_PUBLIC_URL_SITUS .env.example .env.local`
Diharapkan: dua baris cocok.

**Langkah 4:** Commit

```bash
git add .env.example
git commit -m "SEO: tambah variabel NEXT_PUBLIC_URL_SITUS"
```

> Catatan: `.env.local` ada di `.gitignore`, jadi tidak ikut ter-commit. Itu benar. Ingat juga untuk menambahkan variabel ini di dashboard Vercel (Settings → Environment Variables), kalau tidak, produksi akan memakai nilai fallback.

---

### Task 2: Pasang dependensi Markdown

**Tujuan:** Menyediakan renderer Markdown yang aman.

**Langkah 1:** Jalankan

```bash
npm install react-markdown@9.0.1 remark-gfm@4.0.0
```

Versi dipatok (bukan `^`) sesuai kebiasaan repo agar build reproducible.

**Langkah 2:** Verifikasi

Jalankan: `grep -E "react-markdown|remark-gfm" package.json`
Diharapkan: dua dependensi muncul di blok `dependencies`.

**Langkah 3:** Pastikan build masih jalan

Jalankan: `npm run build`
Diharapkan: sukses, tanpa error TypeScript.

**Langkah 4:** Commit

```bash
git add package.json package-lock.json
git commit -m "SEO: pasang react-markdown dan remark-gfm"
```

**JANGAN pasang `rehype-raw`.** Paket itu mengaktifkan HTML mentah di dalam Markdown dan membuka celah XSS lewat isi artikel. Tidak dibutuhkan.

---

## FASE 1 — Perbaikan Bug & Performa (tanpa ubah skema)

Fase ini berdiri sendiri dan sudah memberi manfaat nyata. Bisa di-deploy sebelum fase lain selesai.

### Task 3: Perbaiki `tanggal_terbit` yang tidak pernah terisi

**Tujuan:** Mengisi `tanggal_terbit` saat artikel berstatus `terbit`, agar urutan dan tanggal schema markup valid.

**Berkas:**
- Ubah: `app/admin/(terlindungi)/konten/tindakan.ts`

**Konteks masalah:** objek `muatan` di baris 34-46 tidak menyertakan `tanggal_terbit`, padahal kolomnya ada dan diindeks. Semua artikel terbit punya `tanggal_terbit = NULL`.

**Langkah 1:** Di dalam `simpanArtikel`, tepat sebelum deklarasi `const muatan = {`, tambahkan:

```ts
  const status = String(formulir.get("status") ?? "draft");
  const tanggalTerbitLama = String(formulir.get("tanggal_terbit_lama") ?? "").trim();
```

**Langkah 2:** Di dalam objek `muatan`, ganti baris `status: String(formulir.get("status") ?? "draft"),` menjadi:

```ts
    status,
    tanggal_terbit:
      status === "terbit" ? (tanggalTerbitLama || new Date().toISOString()) : null,
```

Logikanya: kalau artikel diterbitkan dan sebelumnya sudah punya tanggal terbit, tanggal itu dipertahankan (menyunting artikel lama tidak boleh mengubah tanggal aslinya). Kalau baru pertama diterbitkan, pakai waktu sekarang. Kalau dikembalikan ke draft, dikosongkan.

**Langkah 3:** Kirim tanggal lama dari form. Di `components/admin/formulir-artikel.tsx`, setelah baris input tersembunyi `foto_tersimpan`, tambahkan:

```tsx
      <input type="hidden" name="tanggal_terbit_lama" value={artikel?.tanggalTerbitIso ?? ""}/>
```

> Field `tanggalTerbitIso` belum ada di tipe `Artikel`. Ditambahkan di Task 7. Sampai task itu selesai TypeScript akan mengeluh — itu wajar, atau kerjakan Task 7 lebih dulu bila ingin build selalu hijau.

**Langkah 4:** Verifikasi manual

1. Jalankan `npm run dev`
2. Buka `/admin/konten/baru`, isi artikel, set Status = Terbit, simpan
3. Cek di Supabase Table Editor: kolom `tanggal_terbit` harus terisi timestamp, bukan NULL
4. Sunting artikel itu lagi (ubah judul saja), simpan. Pastikan `tanggal_terbit` **tidak berubah**
5. Ubah status ke Draft, simpan. Pastikan `tanggal_terbit` jadi NULL

**Langkah 5:** Commit

```bash
git add "app/admin/(terlindungi)/konten/tindakan.ts" components/admin/formulir-artikel.tsx
git commit -m "SEO: isi tanggal_terbit saat artikel diterbitkan"
```

---

### Task 4: Ganti `force-dynamic` dengan ISR

**Tujuan:** Menghentikan render server di setiap kunjungan. Memperbaiki TTFB dan Core Web Vitals.

**Berkas:**
- Ubah: `app/(publik)/cerita/[slug]/page.tsx:43`
- Ubah: `app/(publik)/cerita/page.tsx` (periksa, kemungkinan punya baris serupa)

**Langkah 1:** Di `app/(publik)/cerita/[slug]/page.tsx`, ganti:

```ts
export const dynamic = "force-dynamic";
```

menjadi:

```ts
export const revalidate = 300;
```

**Langkah 2:** Periksa `app/(publik)/cerita/page.tsx` dengan `grep -n "force-dynamic" app/\(publik\)/cerita/page.tsx`. Kalau ada, ganti dengan cara yang sama.

**Langkah 3:** Jangan sentuh `force-dynamic` di halaman `/admin` atau `/afiliasi`. Halaman itu memang harus selalu segar karena menampilkan data per-pengguna.

Verifikasi cakupan: `grep -rn "force-dynamic" app/ | grep -v admin | grep -v afiliasi`
Diharapkan: tidak ada hasil setelah perubahan.

**Langkah 4:** Verifikasi

Jalankan: `npm run build`
Diharapkan: sukses. Di ringkasan build, rute `/cerita/[slug]` seharusnya ditandai sebagai dinamis dengan revalidasi, bukan murni dinamis.

Lalu uji perilaku: jalankan `npm run dev`, sunting artikel di admin, buka halaman publiknya. Perubahan harus langsung terlihat karena `simpanArtikel` sudah memanggil `revalidatePath("/cerita")` di baris 63.

**Langkah 5:** Commit

```bash
git add "app/(publik)/cerita"
git commit -m "SEO: ganti force-dynamic dengan ISR 5 menit di halaman cerita"
```

---

### Task 5: Tambah `metadataBase` dan Open Graph global

**Tujuan:** Memperbaiki preview tautan saat dibagikan ke WhatsApp/Instagram/Twitter. Saat ini rusak karena tidak ada URL absolut.

**Berkas:**
- Ubah: `app/layout.tsx`

**Langkah 1:** Ganti seluruh blok `export const metadata` yang sekarang dengan:

```ts
const urlSitus =
  process.env.NEXT_PUBLIC_URL_SITUS ?? "https://web-wawangian-pelajar.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(urlSitus),
  title: {
    default: "Wawangian Pelajar",
    template: "%s · Wawangian Pelajar",
  },
  description:
    "Website resmi Wawangian Pelajar — wangi yang berpihak pada pendidikan.",
  icons: {
    icon: "/ikon-wawangian-pelajar-2026.png",
    apple: "/ikon-wawangian-pelajar-2026.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Wawangian Pelajar",
    url: urlSitus,
    title: "Wawangian Pelajar",
    description:
      "Website resmi Wawangian Pelajar — wangi yang berpihak pada pendidikan.",
    images: [
      {
        url: "/ikon-wawangian-pelajar-2026.png",
        width: 1200,
        height: 630,
        alt: "Wawangian Pelajar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wawangian Pelajar",
    description:
      "Website resmi Wawangian Pelajar — wangi yang berpihak pada pendidikan.",
    images: ["/ikon-wawangian-pelajar-2026.png"],
  },
};
```

**Langkah 2:** Catatan soal gambar OG

`/ikon-wawangian-pelajar-2026.png` adalah ikon, kemungkinan besar rasionya bujur sangkar, bukan 1200×630. Preview-nya akan terpotong aneh.

Periksa dimensinya: `file public/ikon-wawangian-pelajar-2026.png`

Kalau bukan sekitar 1200×630, buat berkas baru `public/og-wawangian-pelajar.png` berukuran tepat 1200×630 (logo di tengah, latar krem `#F5EDE1` sesuai identitas visual) dan pakai berkas itu di `openGraph.images` serta `twitter.images`. Kalau belum ada waktu membuatnya, biarkan pakai ikon dan catat sebagai utang teknis.

**Langkah 3:** Verifikasi

Jalankan: `npm run build && npm run start`

Lalu: `curl -s http://localhost:3000/ | grep -o '<meta property="og:[^>]*>'`
Diharapkan: muncul `og:title`, `og:description`, `og:image` dengan URL **absolut** (berawalan `https://`), bukan relatif.

**Langkah 4:** Commit

```bash
git add app/layout.tsx
git commit -m "SEO: tambah metadataBase dan Open Graph global"
```

---

### Task 6: Buat `sitemap.xml` dan `robots.txt`

**Tujuan:** Memberi Google daftar lengkap URL yang harus diindeks. Saat ini kedua berkas ini tidak ada sama sekali.

**Berkas:**
- Buat: `app/sitemap.ts`
- Buat: `app/robots.ts`

**Langkah 1:** Buat `app/sitemap.ts` dengan isi lengkap berikut:

```ts
import type { MetadataRoute } from "next";
import { ambilDaftarArtikelPublik, ambilDaftarProdukPublik } from "@/lib/data/publik";

const urlSitus =
  process.env.NEXT_PUBLIC_URL_SITUS ?? "https://web-wawangian-pelajar.vercel.app";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [daftarArtikel, daftarProduk] = await Promise.all([
    ambilDaftarArtikelPublik(),
    ambilDaftarProdukPublik(),
  ]);

  const halamanUtama: MetadataRoute.Sitemap = [
    { url: urlSitus, changeFrequency: "weekly", priority: 1 },
    { url: `${urlSitus}/katalog`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${urlSitus}/cerita`, changeFrequency: "daily", priority: 0.9 },
    { url: `${urlSitus}/donasi`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${urlSitus}/temukan`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${urlSitus}/afiliasi`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const halamanArtikel: MetadataRoute.Sitemap = daftarArtikel.map((artikel) => ({
    url: `${urlSitus}/cerita/${artikel.slug}`,
    lastModified: artikel.tanggalTerbitIso ? new Date(artikel.tanggalTerbitIso) : undefined,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const halamanProduk: MetadataRoute.Sitemap = daftarProduk.map((produk) => ({
    url: `${urlSitus}/produk/${produk.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...halamanUtama, ...halamanArtikel, ...halamanProduk];
}
```

> `artikel.tanggalTerbitIso` ditambahkan di Task 7. Kerjakan Task 7 lebih dulu bila ingin build selalu hijau, atau sementara hapus baris `lastModified` itu.

**Langkah 2:** Buat `app/robots.ts`:

```ts
import type { MetadataRoute } from "next";

const urlSitus =
  process.env.NEXT_PUBLIC_URL_SITUS ?? "https://web-wawangian-pelajar.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/afiliasi/masuk", "/afiliasi/daftar", "/api/"],
      },
    ],
    sitemap: `${urlSitus}/sitemap.xml`,
  };
}
```

Halaman admin dan autentikasi diblokir agar tidak terindeks. Ini bukan pengaman keamanan (proteksi asli ada di `lib/admin/otorisasi.ts`), hanya kebersihan indeks.

**Langkah 3:** Verifikasi

Jalankan: `npm run build && npm run start`

Lalu:
```bash
curl -s http://localhost:3000/sitemap.xml | head -30
curl -s http://localhost:3000/robots.txt
```

Diharapkan: sitemap berisi daftar `<url>` termasuk semua artikel berstatus terbit; robots.txt memuat baris `Sitemap:` dan `Disallow: /admin`.

**Langkah 4:** Commit

```bash
git add app/sitemap.ts app/robots.ts
git commit -m "SEO: tambah sitemap.xml dan robots.txt"
```

**Setelah deploy ke produksi:** daftarkan situs di Google Search Console lalu kirim `https<!-- -->://domain-lo/sitemap.xml` di menu Sitemaps. Tanpa langkah ini, sitemap tidak berguna.

---

## FASE 2 — Kolom SEO Baru & Renderer Markdown

Ini inti dari revisi. Fase ini yang membuat form bisa menghasilkan artikel SEO-friendly.

### Task 7: Migrasi database — tambah kolom SEO

**Tujuan:** Menambah kolom untuk Markdown, meta title, meta description, alt text, dan fokus kata kunci.

**Berkas:**
- Buat: `supabase/migrations/202608010007_m6_kolom_seo_artikel.sql`

**Langkah 1:** Buat berkas migrasi dengan isi:

```sql
-- M6: kolom SEO untuk tabel artikel (KEP-037 s/d KEP-040)
-- Semua kolom nullable agar artikel yang sudah ada tetap valid.

alter table public.artikel
  add column if not exists isi_markdown text,
  add column if not exists meta_judul text check (meta_judul is null or char_length(meta_judul) <= 70),
  add column if not exists meta_deskripsi text check (meta_deskripsi is null or char_length(meta_deskripsi) <= 200),
  add column if not exists foto_alt text,
  add column if not exists fokus_kata_kunci text;

comment on column public.artikel.isi_markdown is
  'Isi artikel dalam Markdown. Bila terisi, dipakai sebagai sumber render dan kolom bagian diabaikan.';
comment on column public.artikel.meta_judul is
  'Judul untuk hasil pencarian. Maks 70 karakter. Bila kosong, judul dipakai.';
comment on column public.artikel.meta_deskripsi is
  'Deskripsi untuk hasil pencarian. Ideal 150-160 karakter. Bila kosong, cuplikan dipakai.';
comment on column public.artikel.foto_alt is
  'Teks alternatif gambar utama untuk aksesibilitas dan Google Images.';
comment on column public.artikel.fokus_kata_kunci is
  'Kata kunci target. Tidak dirender ke publik, hanya alat bantu admin.';
```

Batas 70 karakter untuk `meta_judul` (bukan 60) karena template `· Wawangian Pelajar` ditambahkan setelahnya; validasi ketat di sisi form.

**Langkah 2:** Jalankan migrasi di Supabase.

Kalau memakai Supabase CLI: `supabase db push`
Kalau tidak: buka Supabase Dashboard → SQL Editor, tempel isi berkas itu, jalankan.

**Langkah 3:** Verifikasi

Di Supabase SQL Editor:

```sql
select column_name, data_type, is_nullable
from information_schema.columns
where table_name = 'artikel'
  and column_name in ('isi_markdown','meta_judul','meta_deskripsi','foto_alt','fokus_kata_kunci');
```

Diharapkan: 5 baris, semuanya `is_nullable = YES`.

**Langkah 4:** Pastikan artikel lama tidak rusak

```sql
select count(*) from public.artikel;
select judul, isi_markdown from public.artikel limit 3;
```

Diharapkan: jumlah tetap sama seperti sebelum migrasi; `isi_markdown` bernilai NULL untuk semua artikel lama. Itu benar — jalur render lama akan menanganinya.

**Langkah 5:** Commit

```bash
git add supabase/migrations/202608010007_m6_kolom_seo_artikel.sql
git commit -m "SEO: migrasi kolom SEO tabel artikel"
```

---

### Task 8: Perbarui tipe `Artikel`

**Tujuan:** Mendaftarkan field baru di TypeScript agar seluruh aplikasi mengenalinya.

**Berkas:**
- Ubah: `data/artikel.ts`

**Langkah 1:** Di dalam `export type Artikel = {`, tambahkan field berikut sebelum penutup `}`:

```ts
  isiMarkdown?: string;
  metaJudul?: string;
  metaDeskripsi?: string;
  fotoAlt?: string;
  fokusKataKunci?: string;
  tanggalTerbitIso?: string;
```

Semua opsional. Artikel contoh di `daftarArtikel` tidak perlu diubah.

`tanggalTerbitIso` dipisah dari `tanggal` yang sudah ada karena `tanggal` sudah diformat untuk manusia ("21 Juli 2026") di `lib/data/publik.ts:90-94`, sementara schema markup dan sitemap butuh format ISO 8601 mentah.

**Langkah 2:** Verifikasi

Jalankan: `npx tsc --noEmit`
Diharapkan: tidak ada error baru pada `data/artikel.ts`.

**Langkah 3:** Commit

```bash
git add data/artikel.ts
git commit -m "SEO: tambah field SEO pada tipe Artikel"
```

---

### Task 9: Petakan kolom baru di layer data publik

**Tujuan:** Membawa kolom baru dari Supabase ke objek `Artikel`.

**Berkas:**
- Ubah: `lib/data/publik.ts`

**Langkah 1:** Cari tipe `BarisArtikel` di berkas itu (`grep -n "BarisArtikel" lib/data/publik.ts`) dan tambahkan field berikut ke definisinya:

```ts
  isi_markdown: string | null;
  meta_judul: string | null;
  meta_deskripsi: string | null;
  foto_alt: string | null;
  fokus_kata_kunci: string | null;
```

**Langkah 2:** Di fungsi `petakanArtikel`, tambahkan pemetaan berikut (sisipkan dekat baris 85-96, sebelum `sumberData: "supabase"`):

```ts
    isiMarkdown: baris.isi_markdown ?? undefined,
    metaJudul: baris.meta_judul ?? undefined,
    metaDeskripsi: baris.meta_deskripsi ?? undefined,
    fotoAlt: baris.foto_alt ?? undefined,
    fokusKataKunci: baris.fokus_kata_kunci ?? undefined,
    tanggalTerbitIso: baris.tanggal_terbit ?? undefined,
```

Pola `?? undefined` dipakai agar `null` dari database berubah menjadi `undefined`, cocok dengan field opsional di tipe TypeScript.

**Langkah 3:** Verifikasi

Jalankan: `npx tsc --noEmit`
Diharapkan: bersih.

Lalu uji nyata: `npm run dev`, buka `/cerita`. Daftar artikel harus tetap tampil normal tanpa error di konsol.

**Langkah 4:** Commit

```bash
git add lib/data/publik.ts
git commit -m "SEO: petakan kolom SEO artikel di layer data publik"
```

---

### Task 10: Buat komponen renderer Markdown

**Tujuan:** Merender Markdown menjadi HTML semantik dengan gaya yang cocok dengan desain situs. Ini yang membuka tautan internal, bold, list, H3, dan tabel.

**Berkas:**
- Buat: `components/isi-markdown.tsx`

**Langkah 1:** Buat berkas dengan isi lengkap berikut:

```tsx
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Properti = { markdown: string };

export function IsiMarkdown({ markdown }: Properti) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2
            id={buatIdJudul(children)}
            className="mt-10 mb-4 scroll-mt-24 text-2xl font-black tracking-tight text-[#102A43]"
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3
            id={buatIdJudul(children)}
            className="mt-8 mb-3 scroll-mt-24 text-xl font-black tracking-tight text-[#102A43]"
          >
            {children}
          </h3>
        ),
        p: ({ children }) => <p className="mt-5">{children}</p>,
        strong: ({ children }) => (
          <strong className="font-bold text-[#102A43]">{children}</strong>
        ),
        ul: ({ children }) => (
          <ul className="mt-5 list-disc space-y-2 pl-6">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mt-5 list-decimal space-y-2 pl-6">{children}</ol>
        ),
        li: ({ children }) => <li className="leading-8">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="mt-6 border-l-4 border-[#087477] bg-[#E5F2EF] px-5 py-3 text-[#102A43] italic">
            {children}
          </blockquote>
        ),
        a: ({ href, children }) => {
          const tujuan = href ?? "#";
          const internal = tujuan.startsWith("/") || tujuan.startsWith("#");
          if (internal) {
            return (
              <Link
                href={tujuan}
                className="font-bold text-[#087477] underline decoration-[#087477]/40 underline-offset-2 hover:decoration-[#087477]"
              >
                {children}
              </Link>
            );
          }
          return (
            <a
              href={tujuan}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="font-bold text-[#087477] underline decoration-[#087477]/40 underline-offset-2 hover:decoration-[#087477]"
            >
              {children}
            </a>
          );
        },
        table: ({ children }) => (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-[#F5EDE1] text-[#102A43]">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="border border-[#DED3C2] px-3 py-2 font-black">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-[#DED3C2] px-3 py-2 align-top">
            {children}
          </td>
        ),
        hr: () => <hr className="mt-8 border-t border-[#DED3C2]" />,
      }}
    >
      {markdown}
    </Markdown>
  );
}

function buatIdJudul(anak: React.ReactNode): string {
  const teks = React.Children.toArray(anak)
    .map((bagian) => (typeof bagian === "string" ? bagian : ""))
    .join(" ");
  return teks
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
```

**Langkah 2:** Tambahkan import React di baris paling atas berkas (dibutuhkan oleh `React.Children`):

```tsx
import React from "react";
```

**Langkah 3:** Catatan penting soal desain komponen ini

- **`h1` sengaja tidak didefinisikan.** Satu halaman harus punya tepat satu H1, dan itu sudah dirender oleh `cerita/[slug]/page.tsx:102`. Kalau penulis artikel menulis `# Judul` di isi, akan muncul dua H1 dan itu merusak SEO. Di Task 12 form akan memperingatkan hal ini.
- **Tautan eksternal memakai `nofollow`.** Ini mencegah kebocoran otoritas domain ke situs lain. Kalau nanti lo mau memberi kredit penuh ke sumber tertentu, hapus `nofollow` secara sadar.
- **`target="_blank"` hanya untuk tautan eksternal.** Tautan internal tetap membuka di tab yang sama supaya alur menuju halaman produk tidak terputus.
- **Tabel dibungkus `overflow-x-auto`.** Tanpa ini, tabel akan merusak tata letak di layar HP — dan mayoritas pembaca lo memakai HP.
- **`react-markdown` tidak merender HTML mentah secara bawaan.** Jadi walaupun ada yang menempel `<script>` di isi artikel, itu akan tampil sebagai teks, bukan dieksekusi. Jangan pasang `rehype-raw` yang membatalkan proteksi ini.

**Langkah 4:** Verifikasi

Jalankan: `npx tsc --noEmit`
Diharapkan: bersih.

**Langkah 5:** Commit

```bash
git add components/isi-markdown.tsx
git commit -m "SEO: tambah komponen renderer Markdown untuk isi artikel"
```

---

### Task 11: Pakai renderer Markdown di halaman artikel

**Tujuan:** Mengganti render `bagian[]` dengan Markdown, tetapi menjaga jalur lama agar artikel yang sudah ada tetap tampil.

**Berkas:**
- Ubah: `app/(publik)/cerita/[slug]/page.tsx:117-131`

**Langkah 1:** Tambahkan import:

```tsx
import { IsiMarkdown } from "@/components/isi-markdown";
```

**Langkah 2:** Ganti blok render isi artikel. Yang sekarang (baris 117-131):

```tsx
        <div className="mx-auto mt-10 max-w-3xl text-[17px] leading-8 text-[#282B2F]">
          {artikel.bagian.map((bagian, indeks) => (
            <section key={bagian.judul ?? indeks} className="mt-9 first:mt-0">
              ...
            </section>
          ))}
```

Menjadi:

```tsx
        <div className="mx-auto mt-10 max-w-3xl text-[17px] leading-8 text-[#282B2F]">
          {artikel.isiMarkdown ? (
            <IsiMarkdown markdown={artikel.isiMarkdown} />
          ) : (
            artikel.bagian.map((bagian, indeks) => (
              <section key={bagian.judul ?? indeks} className="mt-9 first:mt-0">
                {bagian.judul ? (
                  <h2 className="mb-4 text-2xl font-black tracking-tight text-[#102A43]">
                    {bagian.judul}
                  </h2>
                ) : null}
                {bagian.paragraf.map((paragraf) => (
                  <p key={paragraf} className="mt-5 first:mt-0">
                    {paragraf}
                  </p>
                ))}
              </section>
            ))
          )}
```

Sisa isi `<div>` itu (blok Bagikan di baris 133-136 dan `<aside>` CTA di baris 138-151) **jangan diubah**, biarkan di posisinya.

**Langkah 3:** Verifikasi jalur lama tidak rusak

Jalankan `npm run dev`, lalu buka artikel yang sudah ada, misalnya `/cerita/beda-decant-ori-dan-inspirasi`. Harus tampil persis seperti sebelumnya, karena `isiMarkdown` masih NULL untuk artikel itu.

**Langkah 4:** Verifikasi jalur baru

Di Supabase SQL Editor, isi manual satu artikel untuk uji:

```sql
update public.artikel
set isi_markdown = 'Paragraf pembuka sebagai uji coba.

## Subjudul uji

Ini **teks tebal**, ini [tautan ke katalog](/katalog), dan ini daftar:

- Poin pertama
- Poin kedua

### Sub-subjudul

| Kolom A | Kolom B |
|---|---|
| Nilai 1 | Nilai 2 |
'
where slug = 'beda-decant-ori-dan-inspirasi';
```

Buka lagi halaman artikel itu. Yang harus terlihat:
- "teks tebal" tampil tebal, bukan dengan tanda bintang
- "tautan ke katalog" bisa diklik dan mengarah ke `/katalog`
- daftar tampil sebagai bullet
- tabel tampil sebagai tabel bergaris

Kalau semua benar, kembalikan datanya:

```sql
update public.artikel set isi_markdown = null
where slug = 'beda-decant-ori-dan-inspirasi';
```

**Langkah 5:** Commit

```bash
git add "app/(publik)/cerita/[slug]/page.tsx"
git commit -m "SEO: render isi artikel dari Markdown dengan fallback ke bagian"
```

---

## FASE 3 — Kolom SEO di Form Admin

### Task 12: Tambah panel SEO di form artikel

**Tujuan:** Menyediakan kolom Meta Title, Meta Description, Alt Text, dan Fokus Kata Kunci di form admin.

**Berkas:**
- Ubah: `components/admin/formulir-artikel.tsx`

**Langkah 1:** Ubah fungsi pembantu di baris 7-9. Fungsi `bagianKeTeks` sekarang hanya jadi cadangan; tambahkan fungsi pemilih sumber isi:

```tsx
function isiUntukEditor(artikel?: Artikel) {
  return artikel?.isiMarkdown ?? bagianKeTeks(artikel);
}
```

Artinya: kalau artikel sudah punya Markdown, tampilkan itu. Kalau belum (artikel lama), rekonstruksi dari `bagian[]` sehingga admin bisa langsung menyempurnakannya menjadi Markdown penuh.

**Langkah 2:** Di elemen textarea `isi` (baris 30), ganti `defaultValue={bagianKeTeks(artikel)}` menjadi `defaultValue={isiUntukEditor(artikel)}`.

**Langkah 3:** Ganti teks bantuan di baris 31. Yang sekarang hanya menyebut `##`, padahal sekarang Markdown penuh didukung:

```tsx
            <span className="mt-2 block text-xs leading-5 font-normal text-[#4A4D52]">
              Mendukung Markdown. Pisahkan paragraf dengan baris kosong.
              <br />
              <code>## Subjudul</code> · <code>### Sub-subjudul</code> ·{" "}
              <code>**tebal**</code> · <code>- daftar</code> ·{" "}
              <code>1. bernomor</code> · <code>[teks](/katalog)</code> ·{" "}
              <code>&gt; kutipan</code> · tabel gaya GFM.
              <br />
              <strong>Jangan pakai </strong>
              <code># Judul</code>
              <strong>
                {" "}
                — judul utama sudah diambil dari kolom Judul di atas.
              </strong>
            </span>
```

Peringatan soal `#` penting: satu halaman harus punya tepat satu H1. Kalau admin menulis `# Judul` di isi, halaman akan punya dua H1 dan itu merugikan peringkat.

**Langkah 4:** Tambahkan panel SEO. Sisipkan **setelah** penutup `</label>` dari kolom "Isi artikel" (setelah baris 32), masih di dalam `<div className="space-y-5">`:

```tsx
          <fieldset className="space-y-5 rounded-2xl border border-[#DED3C2] bg-[#FBF8F3] p-5">
            <legend className="px-2 text-sm font-black text-[#102A43]">
              Optimasi mesin pencari
            </legend>
            <p className="text-xs leading-5 text-[#4A4D52]">
              Semua kolom di bagian ini opsional. Bila dikosongkan, sistem
              memakai Judul dan Cuplikan di atas.
            </p>

            <label className="block text-sm font-bold text-[#102A43]">
              Judul untuk hasil pencarian
              <input
                className={kelasInput}
                name="meta_judul"
                maxLength={70}
                defaultValue={artikel?.metaJudul ?? ""}
                placeholder="Maksimal 60 karakter agar tidak terpotong Google"
              />
              <span className="mt-2 block text-xs leading-5 font-normal text-[#4A4D52]">
                Judul di atas boleh panjang dan naratif untuk pembaca. Kolom ini
                yang tampil di Google, jadi buat ringkas dan taruh kata kunci di
                depan. Ingat, sistem menambahkan{" "}
                <code>· Wawangian Pelajar</code> (21 karakter) di belakangnya.
              </span>
            </label>

            <label className="block text-sm font-bold text-[#102A43]">
              Deskripsi untuk hasil pencarian
              <textarea
                className={kelasInput}
                name="meta_deskripsi"
                rows={3}
                maxLength={200}
                defaultValue={artikel?.metaDeskripsi ?? ""}
                placeholder="150-160 karakter. Sertakan kata kunci dan ajakan bertindak."
              />
              <span className="mt-2 block text-xs leading-5 font-normal text-[#4A4D52]">
                Ini kalimat yang dibaca orang di halaman hasil Google sebelum
                memutuskan mengeklik. Cuplikan di atas dipakai untuk kartu di
                halaman daftar artikel; keduanya boleh berbeda.
              </span>
            </label>

            <label className="block text-sm font-bold text-[#102A43]">
              Fokus kata kunci
              <input
                className={kelasInput}
                name="fokus_kata_kunci"
                defaultValue={artikel?.fokusKataKunci ?? ""}
                placeholder="contoh: parfum decant murah"
              />
              <span className="mt-2 block text-xs leading-5 font-normal text-[#4A4D52]">
                Tidak dikirim ke Google. Ini catatan internal agar penulis ingat
                kata kunci apa yang sedang dibidik artikel ini.
              </span>
            </label>
          </fieldset>
```

**Langkah 5:** Tambahkan kolom alt text gambar. Di dalam `<aside>`, **tepat setelah** label "Gambar utama asli" (setelah baris 50), sisipkan:

```tsx
          <label className="block text-sm font-bold text-[#102A43]">
            Keterangan gambar (alt text)
            <input
              className={kelasInput}
              name="foto_alt"
              defaultValue={artikel?.fotoAlt ?? ""}
              placeholder="contoh: Botol decant parfum 5 ml di atas meja belajar"
            />
            <span className="mt-2 block text-xs leading-5 font-normal text-[#4A4D52]">
              Deskripsikan isi gambar. Dibaca oleh pembaca layar dan dipakai
              Google Images.
            </span>
          </label>
```

**Langkah 6:** Verifikasi

Jalankan `npm run dev`, buka `/admin/konten/baru`. Yang harus terlihat:
- panel "Optimasi mesin pencari" dengan 3 kolom
- kolom "Keterangan gambar (alt text)" di kolom kanan
- teks bantuan di bawah "Isi artikel" sudah menyebut Markdown

Uji juga `/admin/konten/[id]` untuk artikel yang sudah ada: kolom SEO harus kosong, kolom isi harus terisi teks hasil rekonstruksi dari `bagian[]`.

**Langkah 7:** Commit

```bash
git add components/admin/formulir-artikel.tsx
git commit -m "SEO: tambah panel optimasi mesin pencari di form artikel"
```

---

### Task 13: Simpan kolom SEO di server action

**Tujuan:** Menuliskan kolom baru ke database, dan menyimpan Markdown mentah tanpa kehilangan kompatibilitas `bagian[]`.

**Berkas:**
- Ubah: `app/admin/(terlindungi)/konten/tindakan.ts`

**Langkah 1:** Tambahkan pembatasan panjang. Setelah blok validasi di baris 32, sisipkan:

```ts
  const metaJudul = String(formulir.get("meta_judul") ?? "").trim();
  const metaDeskripsi = String(formulir.get("meta_deskripsi") ?? "").trim();
  if (metaJudul.length > 70) kembali(tujuan, "Judul untuk hasil pencarian maksimal 70 karakter.");
  if (metaDeskripsi.length > 200) kembali(tujuan, "Deskripsi untuk hasil pencarian maksimal 200 karakter.");
```

Batas ini menggandakan pertahanan `check` constraint di database. Tanpa ini, admin yang menembus batas akan mendapat pesan error Postgres yang tidak ramah.

**Langkah 2:** Tambahkan field baru ke objek `muatan`:

```ts
    isi_markdown: isi,
    meta_judul: metaJudul || null,
    meta_deskripsi: metaDeskripsi || null,
    foto_alt: String(formulir.get("foto_alt") ?? "").trim() || null,
    fokus_kata_kunci: String(formulir.get("fokus_kata_kunci") ?? "").trim() || null,
```

**Langkah 3:** Pertahankan baris `bagian: ubahTeksMenjadiBagian(isi),` yang sudah ada. **Jangan dihapus.**

Alasan: `components/kartu-artikel.tsx` dan halaman daftar mungkin masih membaca `bagian`, dan skema database menetapkan `bagian jsonb not null`. Menghapusnya akan memicu error constraint. Jadi isi disimpan dua kali: Markdown mentah di `isi_markdown` sebagai sumber kebenaran untuk render, dan versi terurai di `bagian` untuk kompatibilitas.

Konsekuensinya: `ubahTeksMenjadiBagian` akan menghasilkan `bagian` yang agak berantakan bila isi memuat tabel atau daftar (baris tabel akan masuk sebagai paragraf). Itu tidak masalah karena `bagian` tidak lagi dirender ketika `isi_markdown` terisi.

**Langkah 4:** Pola `|| null` itu penting — string kosong bukan nilai yang sah untuk kolom opsional. Kalau disimpan sebagai `""`, logika fallback `metaJudul ?? judul` akan gagal karena `""` bukan `null`/`undefined` dan justru menghasilkan meta title kosong.

**Langkah 5:** Verifikasi

Jalankan `npm run dev`, lalu:

1. Buat artikel baru, isi semua kolom SEO, simpan
2. Cek di Supabase Table Editor: kolom `isi_markdown`, `meta_judul`, `meta_deskripsi`, `foto_alt`, `fokus_kata_kunci` harus terisi
3. Sunting artikel itu, kosongkan Meta Title, simpan. Cek: nilainya harus `NULL`, bukan string kosong
4. Coba tempel 100 karakter di Meta Title. Karena ada `maxLength={70}` di form, browser akan menolaknya. Uji validasi server dengan menghapus atribut itu lewat DevTools lalu kirim; harus muncul pesan error yang ramah, bukan error Postgres

**Langkah 6:** Commit

```bash
git add "app/admin/(terlindungi)/konten/tindakan.ts"
git commit -m "SEO: simpan kolom SEO dan Markdown mentah artikel"
```

---

## FASE 4 — Metadata Halaman Artikel & Schema

### Task 14: Pakai alt text pada gambar utama

**Tujuan:** Mengganti alt text otomatis dengan alt text yang ditulis admin.

**Berkas:**
- Ubah: `components/visual-data.tsx:12-15`

**Konteks:** `VisualArtikel` sekarang memakai `alt={`Gambar utama ${artikel.judul}`}`. Itu lebih baik daripada kosong, tapi tidak mendeskripsikan isi gambar — jadi tidak berguna untuk Google Images maupun pembaca layar.

**Langkah 1:** Ubah atribut `alt` pada elemen `<Image>` menjadi:

```tsx
alt={artikel.fotoAlt?.trim() || `Gambar utama ${artikel.judul}`}
```

Pakai `||` bukan `??` di sini, supaya string kosong juga jatuh ke fallback.

**Langkah 2:** Sekalian perbaiki kompresi gambar.

Elemen itu memakai `unoptimized`, artinya gambar dikirim apa adanya tanpa dikonversi ke WebP atau diubah ukurannya. Untuk foto 5 MB dari Supabase Storage, ini merusak Largest Contentful Paint — salah satu metrik Core Web Vitals yang jadi faktor peringkat.

Coba hapus atribut `unoptimized`. Lalu di `next.config.ts`, pastikan domain Supabase diizinkan:

```ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
  ],
},
```

Kalau setelah itu gambar gagal muncul, kembalikan `unoptimized` dan catat sebagai utang teknis — jangan berlarut di sini, ini bukan penghambat utama.

**Langkah 3:** Verifikasi

Jalankan `npm run dev`. Buka artikel yang punya foto dan alt text terisi, lalu inspeksi elemen gambar di DevTools. Atribut `alt` harus memuat teks yang lo tulis di form, bukan "Gambar utama ...".

**Langkah 4:** Commit

```bash
git add components/visual-data.tsx next.config.ts
git commit -m "SEO: pakai alt text admin pada gambar utama artikel"
```

---

### Task 15: Lengkapi metadata halaman artikel

**Tujuan:** Meta title terpisah, canonical URL, dan Open Graph khusus per artikel.

**Berkas:**
- Ubah: `app/(publik)/cerita/[slug]/page.tsx:45-57`

**Langkah 1:** Ganti seluruh fungsi `generateMetadata` yang sekarang dengan:

```ts
export async function generateMetadata({
  params,
}: ParameterHalaman): Promise<Metadata> {
  const { slug } = await params;
  const artikel = await ambilArtikelPublik(slug);

  if (!artikel) return { title: "Artikel tidak ditemukan" };

  const judulMeta = artikel.metaJudul?.trim() || artikel.judul;
  const deskripsiMeta = artikel.metaDeskripsi?.trim() || artikel.cuplikan;
  const jalur = `/cerita/${artikel.slug}`;
  const gambar = artikel.fotoUtama ?? "/ikon-wawangian-pelajar-2026.png";

  return {
    title: judulMeta,
    description: deskripsiMeta,
    alternates: { canonical: jalur },
    openGraph: {
      type: "article",
      locale: "id_ID",
      siteName: "Wawangian Pelajar",
      url: jalur,
      title: judulMeta,
      description: deskripsiMeta,
      publishedTime: artikel.tanggalTerbitIso,
      authors: artikel.penulis ? [artikel.penulis] : undefined,
      images: [
        {
          url: gambar,
          alt: artikel.fotoAlt?.trim() || artikel.judul,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: judulMeta,
      description: deskripsiMeta,
      images: [gambar],
    },
  };
}
```

**Langkah 2:** Catatan

- `alternates.canonical` memakai jalur relatif. Next.js otomatis menjadikannya absolut memakai `metadataBase` dari Task 5. Jadi Task 5 wajib selesai lebih dulu, kalau tidak canonical akan salah.
- `publishedTime` butuh format ISO 8601, karena itu `tanggalTerbitIso` dari Task 8-9 diperlukan, bukan `tanggal` yang sudah diformat.
- Template `%s · Wawangian Pelajar` dari root layout tetap berlaku di sini, jadi `judulMeta` tidak perlu memuat nama brand lagi.

**Langkah 3:** Verifikasi

Jalankan `npm run build && npm run start`, lalu:

```bash
curl -s http://localhost:3000/cerita/beda-decant-ori-dan-inspirasi \
  | grep -oE '<(title|meta|link)[^>]*(description|og:|canonical|twitter)[^>]*>|<title>[^<]*</title>'
```

Diharapkan: ada `<title>`, `<meta name="description">`, `<link rel="canonical">` dengan URL absolut, serta rangkaian tag `og:`.

Uji juga fallback: untuk artikel tanpa `meta_judul`, `<title>` harus memakai `judul` biasa.

**Langkah 4:** Commit

```bash
git add "app/(publik)/cerita/[slug]/page.tsx"
git commit -m "SEO: metadata artikel lengkap dengan canonical dan Open Graph"
```

---

### Task 16: Tambah schema markup JSON-LD

**Tujuan:** Memberi Google data terstruktur agar berpeluang tampil sebagai hasil kaya (rich result) dengan tanggal, penulis, dan breadcrumb.

**Berkas:**
- Buat: `components/skema-artikel.tsx`
- Ubah: `app/(publik)/cerita/[slug]/page.tsx`

**Langkah 1:** Buat `components/skema-artikel.tsx`:

```tsx
import type { Artikel } from "@/data/artikel";

const urlSitus =
  process.env.NEXT_PUBLIC_URL_SITUS ?? "https://web-wawangian-pelajar.vercel.app";

export function SkemaArtikel({ artikel }: { artikel: Artikel }) {
  const alamatArtikel = `${urlSitus}/cerita/${artikel.slug}`;

  const skemaArtikel = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artikel.metaJudul?.trim() || artikel.judul,
    description: artikel.metaDeskripsi?.trim() || artikel.cuplikan,
    image: artikel.fotoUtama ? [artikel.fotoUtama] : undefined,
    datePublished: artikel.tanggalTerbitIso,
    dateModified: artikel.tanggalTerbitIso,
    author: {
      "@type": "Organization",
      name: artikel.penulis || "Wawangian Pelajar",
      url: urlSitus,
    },
    publisher: {
      "@type": "Organization",
      name: "Wawangian Pelajar",
      logo: {
        "@type": "ImageObject",
        url: `${urlSitus}/ikon-wawangian-pelajar-2026.png`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": alamatArtikel },
    inLanguage: "id-ID",
  };

  const skemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: urlSitus },
      { "@type": "ListItem", position: 2, name: "Cerita", item: `${urlSitus}/cerita` },
      { "@type": "ListItem", position: 3, name: artikel.judul, item: alamatArtikel },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(skemaArtikel) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(skemaBreadcrumb) }}
      />
    </>
  );
}
```

**Langkah 2:** Soal `dangerouslySetInnerHTML`

Ini pemakaian yang sah dan memang cara yang dianjurkan Next.js untuk JSON-LD. Isinya berasal dari `JSON.stringify` atas data internal, bukan HTML dari pengguna. Namun ada satu kasus tepi: kalau judul artikel memuat teks `</script>`, itu bisa memutus tag. Kemungkinannya sangat kecil di sini, tapi kalau lo mau aman, tambahkan sanitasi:

```ts
const amankan = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
```

lalu pakai `amankan(skemaArtikel)` menggantikan `JSON.stringify(skemaArtikel)`.

**Langkah 3:** Sisipkan komponen ke halaman artikel. Tambahkan import:

```tsx
import { SkemaArtikel } from "@/components/skema-artikel";
```

Lalu di dalam `<article>`, tepat setelah tag pembuka (sebelum `<nav aria-label="Breadcrumb">` di baris 80):

```tsx
        <SkemaArtikel artikel={artikel} />
```

**Langkah 4:** Verifikasi

Jalankan `npm run build && npm run start`, lalu:

```bash
curl -s http://localhost:3000/cerita/beda-decant-ori-dan-inspirasi \
  | grep -o 'application/ld+json'
```

Diharapkan: dua kemunculan.

Lalu validasi isinya di https://validator.schema.org — tempel URL produksi setelah deploy, atau tempel HTML-nya langsung. Harus lolos tanpa error untuk `Article` dan `BreadcrumbList`.

> Catatan: `datePublished` akan kosong untuk artikel yang diterbitkan sebelum Task 3 dijalankan, dan validator akan memberi peringatan. Perbaiki dengan membuka tiap artikel lama di admin lalu simpan ulang, atau lewat SQL: `update public.artikel set tanggal_terbit = dibuat_pada where status = 'terbit' and tanggal_terbit is null;`

**Langkah 5:** Commit

```bash
git add components/skema-artikel.tsx "app/(publik)/cerita/[slug]/page.tsx"
git commit -m "SEO: tambah JSON-LD Article dan BreadcrumbList"
```

---

## FASE 5 — Dokumentasi & Verifikasi Akhir

### Task 17: Catat keputusan di dokumentasi repo

**Tujuan:** Menjaga konvensi dokumentasi repo. Nomor keputusan berikutnya adalah KEP-037.

**Berkas:**
- Ubah: `DECISIONS.md`
- Ubah: `CHANGELOG.md`
- Ubah: `STATUS.md`

**Langkah 1:** Tambahkan lima keputusan ke `DECISIONS.md`, mengikuti format entri yang sudah ada di berkas itu:

- **KEP-037 — Isi artikel disimpan sebagai Markdown di kolom `isi_markdown`, kolom `bagian` dipertahankan sebagai cadangan.** Alasan: parser buatan sendiri tidak mendukung tautan, penekanan, daftar, dan tabel, sehingga tautan internal ke halaman produk tidak mungkin dibuat. Kolom `bagian` tidak dihapus agar artikel lama dan komponen yang masih membacanya tidak rusak.
- **KEP-038 — Meta title dan meta description dipisah dari judul dan cuplikan, sifatnya opsional dengan fallback.** Alasan: H1 dioptimalkan untuk pembaca, meta title dibatasi ±60 karakter oleh Google. Opsional agar artikel lama tetap valid tanpa disunting.
- **KEP-039 — Render Markdown memakai `react-markdown` + `remark-gfm`, tanpa `rehype-raw`.** Alasan: menghindari parser buatan sendiri dan menjaga HTML mentah tetap tidak dieksekusi, sehingga isi artikel tidak bisa menjadi jalur XSS.
- **KEP-040 — Halaman artikel memakai ISR 5 menit, bukan `force-dynamic`.** Alasan: artikel adalah konten statis; render per kunjungan memperburuk TTFB dan Core Web Vitals tanpa manfaat. Kesegaran dijaga oleh `revalidatePath` di server action.
- **KEP-041 — `tanggal_terbit` diisi otomatis saat status menjadi `terbit`, dan dipertahankan pada penyuntingan berikutnya.** Alasan: kolom itu sebelumnya selalu NULL, membuat indeks `artikel_terbit_idx` tidak berguna dan `datePublished` pada schema markup kosong.

**Langkah 2:** Tambahkan entri di `CHANGELOG.md` di bawah versi berjalan:

```
### Ditambahkan
- Isi artikel mendukung Markdown penuh: tautan internal, penekanan, daftar, subjudul tingkat tiga, kutipan, dan tabel.
- Panel "Optimasi mesin pencari" di form artikel: judul pencarian, deskripsi pencarian, fokus kata kunci.
- Kolom keterangan gambar (alt text) untuk gambar utama artikel.
- sitemap.xml dan robots.txt.
- Schema markup JSON-LD (Article dan BreadcrumbList) di halaman artikel.
- Open Graph dan Twitter Card, global maupun per artikel.
- Canonical URL per artikel.

### Diperbaiki
- tanggal_terbit tidak pernah terisi meski artikel berstatus terbit.
- Preview tautan saat dibagikan ke media sosial tidak menampilkan gambar dan judul karena metadataBase tidak diset.
- Halaman artikel dirender ulang di setiap kunjungan; kini memakai ISR 5 menit.
- Alt text gambar utama kini berasal dari admin, bukan judul artikel.
```

**Langkah 3:** Perbarui `STATUS.md` sesuai format yang dipakai di sana — tandai Modul 6 sebagai sudah memiliki fondasi SEO.

**Langkah 4:** Commit

```bash
git add DECISIONS.md CHANGELOG.md STATUS.md
git commit -m "Dokumentasi: catat KEP-037 s/d KEP-041 revisi SEO artikel"
```

---

### Task 18: Verifikasi menyeluruh

**Tujuan:** Memastikan seluruh rangkaian berfungsi dari form sampai hasil pencarian.

**Langkah 1:** Build bersih

```bash
rm -rf .next
npm run build
```
Diharapkan: sukses tanpa error maupun peringatan baru.

**Langkah 2:** Lint dan tipe

```bash
npm run lint
npx tsc --noEmit
```
Diharapkan: keduanya bersih.

**Langkah 3:** Uji alur lengkap dari sisi admin

Jalankan `npm run start`, lalu di panel admin buat satu artikel uji dengan isi berikut, sengaja memakai semua fitur Markdown:

```markdown
Parfum decant jadi jalan masuk paling masuk akal buat pelajar yang pengin nyoba aroma bagus tanpa harus beli botol penuh.

## Kenapa decant cocok buat pelajar

Ada tiga alasan utama:

- Harganya terjangkau karena kamu cuma bayar volume yang dipakai
- Bisa coba banyak aroma sebelum yakin
- Botolnya kecil jadi gampang dibawa

### Perbandingan singkat

| Pilihan | Volume | Cocok untuk |
|---|---|---|
| Decant | 5-10 ml | Coba aroma baru |
| Botol penuh | 50-100 ml | Aroma yang sudah pasti disukai |

## Cara memilih yang tepat

Mulai dari karakter aroma yang kamu suka. Kalau belum tahu, lihat dulu [koleksi kami di katalog](/katalog) dan baca keterangan tiap produk.

> Aroma yang tepat itu yang bikin kamu nyaman, bukan yang paling mahal.

Kalau masih ragu, [baca panduan perbedaan decant dan parfum inspirasi](/cerita/beda-decant-ori-dan-inspirasi) dulu.
```

Isi juga kolom SEO:
- Judul pencarian: `Panduan Parfum Decant untuk Pelajar`
- Deskripsi pencarian: satu kalimat 150-160 karakter dengan ajakan bertindak
- Fokus kata kunci: `parfum decant murah`
- Alt text gambar: deskripsi gambar yang diunggah

Set status ke Terbit, simpan.

**Langkah 4:** Daftar periksa hasil di halaman publik

Buka artikel itu dan pastikan:

1. Tebal tampil tebal, bukan dengan tanda bintang
2. Tautan `/katalog` bisa diklik dan tetap di tab yang sama
3. Tautan antar artikel berfungsi
4. Daftar bullet tampil rapi
5. Tabel tampil bergaris dan bisa digeser horizontal di layar HP
6. Kutipan punya garis aksen di kiri
7. H2 dan H3 punya ukuran yang berbeda
8. Hanya ada **satu** H1 di halaman — periksa di DevTools Console dengan `document.querySelectorAll('h1').length`, harus bernilai 1
9. CTA di bagian bawah masih muncul sesuai kategori
10. Tombol Bagikan masih berfungsi

**Langkah 5:** Daftar periksa sumber halaman

```bash
curl -s http://localhost:3000/cerita/SLUG-ARTIKEL-UJI > /tmp/uji.html

grep -o '<title>[^<]*</title>' /tmp/uji.html
grep -o '<meta name="description"[^>]*>' /tmp/uji.html
grep -o '<link rel="canonical"[^>]*>' /tmp/uji.html
grep -c 'application/ld+json' /tmp/uji.html
grep -o '<meta property="og:[^>]*>' /tmp/uji.html
grep -c '<h1' /tmp/uji.html
grep -o 'href="/katalog"' /tmp/uji.html
```

Diharapkan: title memakai meta title (bukan judul panjang), description memakai meta description, canonical absolut, JSON-LD dua buah, tag `og:` lengkap, `<h1>` tepat satu, tautan `/katalog` ada.

**Langkah 6:** Pastikan artikel lama tidak rusak

Buka kelima artikel lama satu per satu. Semuanya harus tampil normal lewat jalur `bagian[]`.

**Langkah 7:** Uji seluler

Buka di HP sungguhan atau mode perangkat di DevTools pada lebar 375px. Tabel harus bisa digeser, bukan merusak tata letak.

**Langkah 8:** Setelah deploy ke produksi

1. Tambahkan `NEXT_PUBLIC_URL_SITUS` di Environment Variables Vercel, lalu deploy ulang
2. Buka `https<!-- -->://domain-lo/sitemap.xml` — harus memuat artikel
3. Daftarkan situs di Google Search Console, kirim sitemap
4. Uji satu artikel di Rich Results Test Google
5. Uji preview tautan dengan mengirim URL artikel ke diri sendiri di WhatsApp — gambar dan judul harus muncul

---

## Urutan Pengerjaan yang Disarankan

Ada saling-ketergantungan antar task. Urutan paling aman:

```
Task 1  (env)          → tidak bergantung apa pun
Task 2  (dependensi)   → tidak bergantung apa pun
Task 7  (migrasi DB)   → tidak bergantung apa pun
Task 8  (tipe)         → butuh Task 7
Task 9  (layer data)   → butuh Task 8
Task 3  (tanggal_terbit) → butuh Task 8 (memakai tanggalTerbitIso)
Task 4  (ISR)          → mandiri
Task 5  (metadataBase) → butuh Task 1
Task 6  (sitemap)      → butuh Task 1 dan Task 8
Task 10 (renderer)     → butuh Task 2
Task 11 (pakai renderer) → butuh Task 9 dan Task 10
Task 12 (form)         → butuh Task 8
Task 13 (server action) → butuh Task 7
Task 14 (alt text)     → butuh Task 9
Task 15 (metadata)     → butuh Task 5 dan Task 9
Task 16 (JSON-LD)      → butuh Task 9
Task 17 (dokumentasi)  → paling akhir
Task 18 (verifikasi)   → paling akhir
```

Ringkasnya: **7 → 8 → 9 → 1 → 2** lebih dulu sebagai fondasi, lalu sisanya bebas, tutup dengan 17 dan 18.

## Titik Deploy yang Aman

Tidak perlu menunggu semua selesai. Ada tiga titik yang bisa dilepas ke produksi:

1. **Setelah Task 6** — perbaikan bug dan pengindeksan. Sudah bermanfaat, tanpa perubahan skema.
2. **Setelah Task 13** — form SEO dan Markdown berfungsi. Ini yang paling penting untuk kerja menulis artikel.
3. **Setelah Task 18** — lengkap.

## Di Luar Cakupan

Sengaja tidak dikerjakan di rencana ini:

- **Editor WYSIWYG.** Markdown cukup dan lebih mudah dipelihara. Editor visual menambah dependensi berat dan masalah sanitasi HTML.
- **Pratinjau langsung isi artikel di admin.** Berguna, tapi bukan kebutuhan SEO. Bisa jadi rencana terpisah.
- **Daftar isi otomatis.** Komponen renderer sudah memberi `id` pada setiap H2/H3, jadi fondasinya siap kalau nanti mau dibuat.
- **Schema `FAQPage`.** Baru relevan kalau artikel punya bagian tanya-jawab terstruktur.
- **Kompresi gambar sebelum unggah.** Batas 5 MB sekarang terlalu longgar untuk web. Layak jadi perbaikan terpisah.
- **Revisi isi tiga artikel yang sudah ditulis** di `Documents\Wawangian_Pelajar_PRD\`. Itu pekerjaan naskah, bukan kode. Perlu diingat: artikel kedua dan ketiga memuat klaim garansi dan angka harga yang belum tentu sesuai posisi bisnis, jadi jangan diterbitkan apa adanya.
