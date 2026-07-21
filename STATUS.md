# STATUS.md — Posisi Terkini Pengerjaan

> Dokumen ini selalu mencerminkan kondisi terkini. Riwayat lengkap perubahan tersedia di `CHANGELOG.md`.

**Terakhir diperbarui:** 21 Juli 2026
**Milestone aktif:** M2 — Panel Admin + Data Nyata
**Status milestone aktif:** Berjalan; aktivasi hosted selesai, alur pembuatan kata sandi diperbaiki, validasi login/CRUD menunggu pemilik

---

## Posisi saat ini

M1 telah digabungkan ke `main`. Implementasi M2 berada pada branch `codex/m2-panel-admin-data-nyata` dan mencakup schema Supabase, RLS, Storage, autentikasi Admin, CRUD Produk, CRUD Artikel, koneksi data publik, serta fondasi Analitik Klik-Keluar.

URL dan kunci publishable Supabase telah dipasang hanya pada `.env.local` yang diabaikan Git. Migrasi M2 sudah diterapkan pada proyek hosted. `lanxnashiry@gmail.com` sudah terkonfirmasi dan tercatat aktif sebagai `Pemilik Wawangian Pelajar` pada `pengguna_admin`. Tautan awal berhenti pada localhost karena server tidak aktif dan belum ada halaman aktivasi; rute `/admin/undangan` serta pemrosesan sesi implicit/PKCE sekarang tersedia dan `Site URL` hosted telah diarahkan ke rute tersebut.

## Task M2

1. 🟡 Login Admin — kode, proteksi, akun hosted, keanggotaan aktif, dan halaman pembuatan kata sandi selesai; uji login menunggu pemilik membuka tautan pemulihan baru.
2. 🟡 CRUD Produk — daftar, tambah, edit, nonaktifkan, unggah foto, data karakter/okasi, dan validasi BR-4 selesai; uji end-to-end menunggu login Admin.
3. 🟡 Editor Konten — CRUD artikel, draft/terbit, gambar, share, dan CTA otomatis selesai; uji end-to-end menunggu login Admin.
4. 🟡 Data nyata publik — repositori Supabase, schema hosted, dan pembatasan aktif/terbit selesai; data bisnis final belum diberikan.
5. 🟡 Analitik Klik-Keluar — tabel, RPC, route handler, dasbor, dan empty state selesai; tombol nyata baru dihubungkan pada M4.

## Validasi yang sudah dilakukan

- `npm.cmd run lint` tahap awal — tanpa galat; dua peringatan ditemukan lalu diperbaiki.
- `npm.cmd run build` final — berhasil, seluruh rute M2 terkompilasi.
- Homepage pada 360px — HTTP 200, tanpa overflow, fallback M1 tetap tampil saat schema belum aktif.
- `/admin` tanpa sesi — dialihkan ke `/admin/masuk` dengan pesan yang benar.
- Login Admin pada 360px dan 1440px — satu input email, satu input kata sandi, tanpa overflow.
- Konsol browser — tidak ada galat atau peringatan aplikasi.
- `.env.local` — terkonfirmasi diabaikan oleh `.gitignore`.
- Pemindaian repository — tidak menemukan kunci publishable aktual, service-role terisi, atau kata sandi Admin pada berkas terlacak.
- Migrasi hosted — berhasil tanpa baris hasil; 4 tabel M2 tersedia dan seluruhnya mengaktifkan RLS.
- Struktur hosted — 15 kebijakan akses, 2 bucket publik terbatas media, dan 5 fungsi database tersedia.
- Bootstrap Admin — satu pengguna `lanxnashiry@gmail.com` aktif sebagai `Pemilik Wawangian Pelajar`.
- Alur undangan — `/admin/undangan` dan `/auth/konfirmasi` lolos lint/build; Site URL Supabase menunjuk ke halaman aktivasi lokal.
- Pemulihan kata sandi — permintaan email terbaru dikirim ke `lanxnashiry@gmail.com` setelah Site URL diperbaiki.

## Langkah berikutnya

1. Pemilik membuka tautan pemulihan terbaru saat server lokal port 3000 aktif dan membuat kata sandi sendiri.
2. Agent menguji login, RLS, CRUD, upload Storage, status draft/terbit, dan BR-4 terhadap Supabase hosted.
3. Setelah validasi end-to-end berhasil, M2 dapat ditandai selesai dan draft PR disiapkan untuk tinjauan akhir.

## Asumsi yang berlaku

- Data produk, artikel, harga, dan foto bisnis final menyusul; database M2 dimulai kosong.
- Data contoh M1 tetap menjadi fallback berlabel hanya bila schema/config Supabase belum dapat dibaca.
- Daftar kata merek terlarang awal disimpan terpusat pada validasi server dan trigger database; daftar dapat ditambah setelah pemilik meninjau.
- Produk dihapus secara lunak dengan `aktif=false`; artikel dapat dihapus karena Log Audit baru menjadi kewajiban pada M3.
- Tautan Shopee/TikTok boleh disimpan pada M2 tetapi tidak diaktifkan sebagai tombol beli sampai M4.
- Kuis tidak dibangun pada M2; hanya field `karakter` dan `cocok_untuk` yang disiapkan untuk M4.

## Batas scope yang tetap dijaga

- Tidak ada checkout, keranjang, pembayaran, akun pembeli, wishlist, atau pengelolaan ongkir.
- Tidak ada modul Donasi M3, jembatan marketplace/kuis M4, atau Portal Afiliasi M5.
- Tidak ada analitik yang diklaim sebagai penjualan/komisi; KlikKeluar hanya mengukur minat.
- Tidak ada foto produk AI atau angka/testimoni/dampak buatan.

## Catatan dan kendala

- Tautan pemulihan baru sudah diminta; login aplikasi belum dapat diuji sampai pemilik membuka email terbaru dan membuat kata sandi.
- `npm audit --omit=dev` dari M0 masih mencatat dua kerentanan sedang pada PostCSS bawaan Next.js; belum ada perbaikan kompatibel.

---

`STATUS.md` diperbarui setiap akhir sesi kerja.
