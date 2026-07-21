# STATUS.md — Posisi Terkini Pengerjaan

> Dokumen ini selalu mencerminkan kondisi terkini. Riwayat lengkap perubahan tersedia di `CHANGELOG.md`.

**Terakhir diperbarui:** 21 Juli 2026
**Milestone aktif:** M1 — Website Publik Statis
**Status milestone aktif:** Selesai (100%), menunggu tinjauan pemilik sebelum M2

---

## Posisi saat ini

Website publik statis telah dibangun pada branch `codex/m1-website-publik-statis` berdasarkan wireframe Modul 1, 2, 3, dan 6. Implementasi mencakup layout global, Homepage, Katalog, Detail Produk, daftar Konten, serta halaman Artikel.

Data produk dan artikel masih berupa data contoh yang diberi label jelas. Foto produk menggunakan placeholder lokal, angka donasi tetap pada state “Perjalanan baru dimulai”, dan blok ulasan tidak dirender karena belum ada ulasan nyata.

## Task M1

1. ✅ Layout global: navbar desktop, drawer mobile, dan footer.
2. ✅ Homepage lengkap dengan state donasi awal dan tanpa ulasan palsu.
3. ✅ Katalog dengan pencarian, filter kategori, pengurutan, dan state kosong.
4. ✅ Detail Produk dengan galeri placeholder, profil aroma, pesan misi, dan produk terkait.
5. ✅ Konten: daftar artikel, filter kategori, detail artikel, share, CTA kontekstual, dan tanpa komentar.
6. ✅ Responsif mobile-first diverifikasi pada 360px dan 1440px.

## Validasi

- `npm.cmd run lint` — berhasil.
- `npm.cmd run build` — berhasil; 21 halaman statis/SSG dibuat.
- `npm.cmd run dev` — merespons HTTP 200.
- Homepage — tujuh bagian tampil; bagian kedelapan (ulasan) tersembunyi karena data kosong.
- Drawer mobile — buka/tutup dan seluruh cabang navigasi berfungsi.
- Katalog — pencarian, filter Inspirasi, reset filter, state kosong, dan grid 2/4 kolom berfungsi.
- Detail Produk — label “Racikan Sendiri”, profil aroma, pesan misi, dan tombol marketplace nonaktif tampil benar.
- Konten — filter kategori, artikel, tombol share, CTA kontekstual, dan ketiadaan komentar terverifikasi.
- Viewport 360px dan 1440px — tidak ada overflow horizontal dokumen.
- Konsol browser — tidak ada galat atau peringatan aplikasi.

## Langkah berikutnya

1. Pemilik meninjau dan menggabungkan draft pull request M1.
2. Pemilik mengganti ikon serta placeholder dengan logo dan foto produk asli saat aset tersedia.
3. Pemilik mengonfirmasi aktivasi M2 sebelum login admin, CRUD produk, atau data nyata dikerjakan.

## Asumsi yang berlaku

- Semua produk, harga, dan artikel pada M1 adalah contoh dan tidak dianggap data bisnis final.
- Nama produk contoh tidak menggunakan nama merek terkenal pada lini inspirasi.
- Placeholder visual bukan foto produk dan tidak dibuat untuk menyerupai produk nyata.
- Tombol marketplace sengaja nonaktif sampai M4 agar tidak mengarang tautan atau mendahului pencatatan KlikKeluar.
- Halaman Donasi dan Afiliasi hanya berupa state “segera hadir” agar tautan navigasi berfungsi tanpa mengimplementasikan M3/M5.
- Blok ulasan hanya akan muncul setelah tersedia ulasan nyata yang disetujui pemilik.

## Catatan dan kendala

- Wireframe HTML lokal tidak dapat dibuka melalui browser dalam aplikasi karena kebijakan URL lokal; struktur, teks, hierarki, dan anotasinya ditinjau langsung dari source HTML.
- `npm audit --omit=dev` dari M0 masih melaporkan dua kerentanan tingkat sedang pada PostCSS bawaan Next.js. Tidak ada perbaikan kompatibel yang diterapkan pada sesi ini.
- npm 12 tetap memblokir skrip instalasi opsional `sharp` dan `unrs-resolver`, tetapi lint dan build produksi berhasil.

## Pertanyaan terbuka untuk pemilik

- Kapan logo dan foto produk asli tersedia?
- Kapan daftar produk, harga, ukuran, dan deskripsi aroma nyata tersedia untuk M2?

---

`STATUS.md` diperbarui setiap akhir sesi kerja.
