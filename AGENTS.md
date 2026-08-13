# AGENTS.md — Pedoman Wajib untuk Semua Agent

> **Berkas ini dibaca lebih dulu, sebelum menulis kode apa pun.**
> Berlaku untuk **Codex/ChatGPT**, **Hermes**, **Antigravity**, dan agent lain
> yang mengerjakan repo ini. Juga berlaku saat pemilik menyunting manual.
>
> **Terakhir diperbarui:** 4 Agustus 2026

---

## 0. Aturan nomor satu

**Repo adalah satu-satunya sumber kebenaran. Bukan ingatan agent.**

Tidak ada agent yang mengingat sesi sebelumnya. Codex, Hermes, dan agent lain
semuanya mulai dari nol setiap sesi. Yang membuat pekerjaan bersambung bukan
memori, melainkan **dokumen di repo ini**.

Konsekuensinya mutlak: **pekerjaan yang tidak dicatat di dokumen = pekerjaan
yang tidak pernah ada.** Agent berikutnya akan menganggapnya sampah, menimpanya,
atau membangun ulang dari nol.

Ini bukan teori. Pada 4 Agustus 2026 ditemukan modul analitik Umami lengkap
(4 berkas, build lolos) tergeletak di working tree tanpa satu pun catatan di
`STATUS.md`, `CHANGELOG.md`, atau `DECISIONS.md`. Agent yang membacanya tidak
punya cara tahu itu fitur sengaja atau percobaan yang gagal. **Jangan ulangi.**

---

## 1. Bahasa

Seluruh pekerjaan **WAJIB Bahasa Indonesia**: kode, nama variabel, nama fungsi,
nama berkas, komentar, pesan commit, judul PR, dan dokumen.

Contoh konvensi yang sudah dipakai — ikuti, jangan bikin gaya baru:

| Jenis | Contoh nyata di repo |
|---|---|
| Komponen | `jembatan-marketplace.tsx`, `kartu-produk.tsx`, `navigasi-utama.tsx` |
| Route publik | `app/(publik)/katalog`, `app/(publik)/temukan`, `app/(publik)/donasi` |
| Route terlindungi | `app/admin/(terlindungi)/`, `app/afiliasi/(terlindungi)/` |
| Server action | `tindakan.ts` |
| Tabel Supabase | `produk`, `artikel`, `afiliasi`, `penyaluran_donasi`, `klik_keluar` |
| Kolom | `harga`, `ukuran`, `aroma_atas`, `link_shopee`, `diperbarui_pada` |

---

## 2. WAJIB dibaca sebelum menulis kode

Urutan ini bukan saran. Baca semuanya:

1. **`BUILD_SPEC.md`** (v3.2) — PRD / spesifikasi. Sumber kebenaran requirement.
   Memuat Business Rules **BR-1 s/d BR-11** dan daftar batas scope.
2. **`ROADMAP.md`** — milestone mana yang berstatus AKTIF. Sekarang: **M6 (Poles & Rilis)**.
3. **`STATUS.md`** — posisi pekerjaan terakhir, task aktif, langkah berikutnya, asumsi.
4. **`DECISIONS.md`** — semua keputusan **KEP-001 s/d KEP-063**. Patuhi; jangan
   buka ulang keputusan lama dari nol.
5. **`CHANGELOG.md`** — riwayat bertanggal perubahan aplikasi.
6. **`README.md`** — setup, perintah, struktur folder.

**Setelah membaca, konfirmasi dulu ke pemilik:** sebutkan milestone aktif, daftar
task di dalamnya, dan asumsi yang kamu lihat — **sebelum** mulai koding.

### Dokumen bisnis di luar repo

`MEMORY_BISNIS.md` di `C:\Users\lanxn\Documents\Wawangian_Pelajar_Website\`
adalah memori bisnis kanonik (angka keuangan riil, margin per produk, strategi,
prinsip yang tidak bisa ditawar). Baca kalau pekerjaanmu menyentuh keputusan
bisnis, harga, atau donasi.

**PERINGATAN:** salinan `STATUS.md`, `DECISIONS.md`, `BUILD_SPEC.md`,
`ROADMAP.md`, `CHANGELOG.md`, dan `README.md` di folder `C:\...\Documents\`
itu **SUDAH BASI** (tertanggal 13 Juli 2026). Yang berlaku hanya versi di repo
ini. Jangan pernah pakai berkas `C:\` untuk status teknis.

---

## 3. Pembagian kerja dua agent

Keduanya boleh menyentuh berkas yang sama. Yang membuat tidak bertabrakan adalah
**disiplin mencatat + branch terpisah**, bukan pembagian wilayah.

| | Codex / ChatGPT | Hermes |
|---|---|---|
| Awalan branch | `codex/...` | `hermes/...` |
| Kekuatan | Implementasi fitur panjang, multi-berkas | Audit kode, diagnosis, rencana, perbaikan terarah |
| Kuota | Terbatas per minggu — hemat untuk pekerjaan besar | Tidak dibatasi kuota mingguan |
| Verifikasi | `npm run build` + `npm run lint` | sama, wajib juga |

**Awalan branch itu wajib.** Gunanya bukan kredit: kalau muncul bug, pemilik
langsung tahu harus bertanya ke agent mana.

**Pola serah-terima yang sudah terbukti:** Hermes menulis rencana bertahap ke
`.hermes/plans/`, Codex mengeksekusinya task demi task. Contoh:
`.hermes/plans/2026-08-01_092610-revisi-seo-form-artikel.md` → dieksekusi jadi
commit `3f7269a` s/d `9568c68` (fondasi SEO M6). Pakai pola ini kalau pekerjaannya
besar dan kuota Codex perlu dihemat.

---

## 4. WAJIB diperbarui setelah selesai satu task

Lakukan **di commit yang sama** dengan perubahan kode. Bukan commit terpisah,
bukan "nanti".

| Berkas | Kapan | Isi |
|---|---|---|
| `STATUS.md` | selalu | Posisi terbaru, task aktif, langkah berikutnya, asumsi, kendala |
| `CHANGELOG.md` | selalu | Entri bertanggal: `## [YYYY-MM-DD] — Judul` + `### Ditambah/Diubah/Diperbaiki/Dihapus` |
| `ROADMAP.md` | ada progres task | Tandai `✅` / `🟡` / `⬜` |
| `DECISIONS.md` | ada keputusan baru | `### KEP-XXX — Judul` + Tanggal · Status + **Keputusan / Alasan / Konsekuensi** |
| `BUILD_SPEC.md` | requirement berubah | Revisi bagian terkait + **naikkan versi** |
| `README.md` | setup/perintah berubah | Sesuaikan |
| `.env.example` | ada env var baru | Daftarkan + komentar penjelas. **Jangan pernah isi nilai rahasia** |

### Penomoran KEP — cara menghindari tabrakan

`DECISIONS.md` bersifat **append-only** (tambah di bawah, jangan hapus/ubah yang lama).

**Sebelum menulis KEP baru:** jalankan `git pull`, lalu ambil nomor terakhir dari
`DECISIONS.md` **dan tambah satu**. Jangan mengarang nomor. Kalau dua agent
kebetulan memakai nomor sama, yang di-merge belakangan **wajib** menaikkan
nomornya saat menyelesaikan konflik — jangan digabung paksa.

Nomor terpakai terakhir: **KEP-063**. Berikutnya `KEP-064`.

---

## 5. Aturan saat mengerjakan

- Kerjakan **hanya** task pada milestone aktif. Jangan lompat milestone.
- **Jangan memperluas scope diam-diam.** Menemukan kebutuhan di luar task?
  Catat sebagai usulan di `STATUS.md`, jangan langsung kerjakan.
- Ikuti pola codebase yang sudah ada (struktur folder, penamaan, gaya).
- Catat setiap asumsi di `STATUS.md`.
- Validasi bertahap — build & uji tiap bagian, bukan cuma di akhir.
- **Jangan pernah commit rahasia.** `.env*` sudah di-ignore kecuali `.env.example`.
- Terapkan **BR-1 s/d BR-11** dari `BUILD_SPEC.md`, terutama anti-fabrikasi donasi
  (BR-1, BR-2, BR-3) dan anti-nama-brand-asli (BR-4).

### Batas scope yang tidak boleh dilewati

Ini bukan preferensi — semuanya keputusan terkunci:

- **TIDAK ada** checkout, keranjang, pembayaran, akun pembeli, wishlist, ongkir.
  Semua transaksi di marketplace (KEP-001).
- **TIDAK ada** pelacakan atau pembayaran komisi dasar buatan website
  (komisi dasar dibayar platform; website hanya mengelola bonus top-up).
- **TIDAK ada** payout otomatis, integrasi bank, klaim pendapatan, leaderboard palsu.
- **TIDAK ada** Sales Academy, sertifikat, notifikasi otomatis, loyalitas,
  peran admin granular.
- **TIDAK ada** visual produk yang menipu, klaim organisasi (IPNU/PMII/BEM),
  banting harga, atau klaim promosi palsu.

### Dua prinsip bisnis yang menyentuh kode

1. **Angka donasi dihitung sistem, tidak diketik.** Rp 0 ditampilkan apa adanya,
   tidak pernah diganti angka contoh. Aturan: `Tersalurkan ≤ Terkumpul`.
2. **AI/LLM dilarang berada di jalur perhitungan uang.** Hitungan bonus afiliasi,
   donasi, dan margin wajib **kode deterministik yang bisa diaudit** — input sama
   selalu menghasilkan output sama. LLM boleh untuk pencocokan handle berantakan,
   penandaan anomali, dan penyusunan ringkasan; **tidak untuk menghitung.**

### Gambar AI — boleh, dengan satu batas

Sejak 3 Agustus 2026, gambar hasil AI **diperbolehkan** untuk visual produk dan
seluruh materi marketing. Aturan lama "haram AI" sudah dicabut.

Batas yang tetap berlaku: **jangan memalsukan atribut produk** — warna cairan,
bentuk botol, volume, dan kemasan harus sesuai barang yang dikirim.

*Belum diputuskan:* apakah bukti **penyaluran donasi** juga boleh AI. Sampai
pemilik menegaskan, perlakukan bukti penyaluran sebagai **wajib asli** — itu
pertanggungjawaban uang publik, bukan estetika.

---

## 6. Definition of Done

Sebuah task belum selesai sebelum semua ini benar:

1. Fitur sesuai Acceptance Criteria di `BUILD_SPEC.md`.
2. Tidak keluar scope; Business Rules dipatuhi.
3. Responsif di **360px** dan **1440px**.
4. Seluruhnya Bahasa Indonesia.
5. Tidak ada regresi.
6. **`npm run lint` lolos.**
7. **`npm run build` lolos tanpa error.**
8. Dokumen di Bagian 4 sudah diperbarui, di commit yang sama.
9. Sudah ter-commit dan ter-push ke branch berawalan yang benar.
10. Asumsi tercatat di `STATUS.md`.

Perintah verifikasi (Node v22, npm 12 sudah terpasang di mesin pemilik):

```
npm run lint
npm run build
npm test
npx tsc --noEmit
git diff --check
```

---

## 7. Git & PR

- Branch dari **`main`** yang sudah `git pull`, dengan awalan agent yang benar.
- Satu branch = satu task/tema. Jangan menumpuk banyak tema di satu branch.
- Pesan commit Bahasa Indonesia, berpola `Area: ringkasan` —
  contoh nyata: `SEO: tambah sitemap.xml dan robots.txt`, `Produk: pasang foto utama Mykonos`.
- **PR `base` WAJIB `main`.** Jangan menargetkan branch agent lain.

### Pitfall yang sudah pernah terjadi — jangan ulangi

**Rantai PR yang tidak pernah sampai `main`.** PR #19 di-merge ke
`codex/m5-kebijakan-foto-ai` dan PR #20 ke `codex/m6-katalog-decant-mykonos`,
bukan ke `main`. Akibatnya dua commit terbesar bulan itu (`6cd02c6` tambah 4
Decant, `2f64381` pasang foto Mykonos) **tidak ada di `main`** selama berhari-hari,
sementara `STATUS.md` menyatakan keduanya selesai. Agent yang mulai dari `main`
akan membaca kode tanpa foto dan tanpa decant — bertentangan dengan dokumen.

Sebelum mulai, biasakan cek: `git rev-list --left-right --count origin/main...HEAD`

**Akhiran baris.** Repo ini `core.autocrlf=true` dan berkas lama ber-CRLF. Git
akan memberi peringatan `LF will be replaced by CRLF` — itu normal, bukan error.
Jangan mengubah akhiran baris seluruh berkas hanya karena peringatan ini; diff
raksasa yang isinya cuma CRLF membuat review tidak mungkin.

---

## 8. Utang teknis yang belum dibereskan

Baca `STATUS.md` untuk daftar terkini. Yang wajib beres **sebelum rilis publik**:

- Terapkan migrasi pembersihan hosted terbaru sebelum menandai rilis selesai.
- `npm audit --omit=dev` menyisakan 2 moderate transitif ExcelJS/UUID; jalur UUID
  tidak dipakai fitur entri massal dan input XLSX sudah dibatasi.
- `link_tiktok` menunggu konfirmasi TikTok. Satu URL Shopee adalah keputusan
  strategi listing bervarian untuk mengonsolidasikan rating (KEP-051), bukan utang.
- Terapkan migrasi profil rekomendasi M6 dan verifikasi 19 Produk sebelum merge rilis.
- Rotasi password Neon tetap tanggung jawab pemilik dan sengaja di luar batch ini.

---

*AGENTS.md — perbarui berkas ini kalau konvensi kerja berubah. Codex CLI membacanya
otomatis dari root repo; agent lain wajib membacanya manual sebelum mulai.*

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
