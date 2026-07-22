# STATUS.md — Posisi Terkini Pengerjaan

> Dokumen ini selalu mencerminkan kondisi terkini. Riwayat lengkap perubahan tersedia di `CHANGELOG.md`.

**Terakhir diperbarui:** 22 Juli 2026
**Milestone aktif:** M4 — Jembatan Marketplace + Temukan Wangimu
**Status milestone aktif:** Selesai secara teknis; menunggu tinjauan dan konfirmasi pemilik sebelum M5

---

## Posisi saat ini

M3 telah dikonfirmasi pemilik dan M4 dibangun pada branch `codex/m4-jembatan-marketplace-kuis`, bertumpuk di atas penyempurnaan preview M3. Detail Produk kini mendukung alur marketplace hybrid, pencatatan KlikKeluar untuk Produk nyata, pesan misi permanen, dan simulasi aman saat data contoh belum memiliki URL toko.

Rute `/temukan` menyediakan kuis tiga pertanyaan tanpa login. Hasil dihitung dari data `karakter` dan `cocok_untuk`, menjelaskan alasan rekomendasi, serta dapat dimuat kembali dan dibagikan melalui parameter URL.

## Task M4

1. ✅ Tombol beli hybrid — satu URL valid membuka marketplace langsung; dua URL valid menampilkan dialog pilihan.
2. ✅ Pencatatan KlikKeluar — klik Produk Supabase dikirim tanpa menghambat pembukaan tab; data contoh tidak dicatat.
3. ✅ Pesan misi permanen — komitmen Dana Cahaya Pendidikan tetap terlihat sebelum tombol marketplace.
4. ✅ Temukan Wangimu — karakter, waktu, dan okasi dicocokkan dengan data Produk serta diberi alasan.
5. ✅ Hasil shareable — jawaban tervalidasi disimpan dalam URL dan mendukung Web Share atau salin tautan.
6. ✅ Navigasi — Temukan Wangimu tersedia pada navbar, footer, Beranda, dan Katalog.

## Validasi yang sudah dilakukan

- `npm.cmd run lint` — berhasil setelah jembatan marketplace dan setelah integrasi kuis.
- `npm.cmd run build` — berhasil; rute `/temukan` dan seluruh rute M0–M4 terkompilasi.
- URL hasil `?karakter=fresh&waktu=siang&okasi=kuliah-kerja` — menghasilkan Inspirasi Fresh Pagi, Inspirasi Citrus Sport, dan Decant Woody Siang beserta alasan kecocokan.
- Responsif 360px — halaman kuis dan detail Produk tidak mengalami overflow horizontal.
- Responsif 1440px — halaman kuis tidak mengalami overflow horizontal dan susunan tiga pertanyaan melebar dengan benar.
- Detail Produk contoh — tombol simulasi dialog tersedia, pilihan toko tetap nonaktif, tidak membuka URL palsu, dan tidak mengirim analitik.
- API KlikKeluar — muatan kosong ditolak HTTP 400; Produk tidak sah ditolak HTTP 422 tanpa membuat entri.
- URL Admin — tautan non-HTTPS atau di luar domain resmi Shopee/TikTok ditolak sebelum Produk disimpan.
- Konsol browser localhost — tidak ada galat aplikasi.
- `git diff --check` — bersih sebelum pembaruan dokumentasi.

## Langkah berikutnya

1. Pemilik meninjau M4 melalui server lokal dan draft pull request.
2. Pemilik memberikan URL Produk Shopee/TikTok asli; setelah diisi melalui Admin, alur satu/dua marketplace dan angka analitik dapat ditinjau dengan data nyata.
3. Pemilik mengganti kata sandi Admin sementara sebelum penggunaan produksi.
4. M5 tidak boleh dimulai sampai pemilik memberi konfirmasi eksplisit.

## Asumsi yang berlaku

- URL Produk marketplace asli belum tersedia dan tidak boleh digantikan tautan buatan.
- Hanya HTTPS pada domain resmi Shopee/TikTok yang dianggap tujuan marketplace valid.
- Data contoh boleh memperlihatkan bentuk dialog, tetapi tidak boleh bernavigasi atau menambah KlikKeluar.
- Jawaban kuis tidak disimpan di Supabase; parameter URL hanya memuat pilihan katalog non-pribadi.
- Kualitas hasil kuis mengikuti kelengkapan `karakter` dan `cocok_untuk` yang diisi Admin.
- KlikKeluar hanya untuk analitik minat dan tidak digunakan sebagai atribusi atau pembayaran komisi afiliasi.
- M4 selesai secara teknis, tetapi aktivasi M5 tetap menunggu konfirmasi pemilik.

## Batas scope yang tetap dijaga

- Tidak ada checkout, keranjang, pembayaran, akun pembeli, wishlist, atau pengelolaan ongkir.
- Tidak ada pelacakan atau pembayaran komisi afiliasi buatan sendiri.
- Tidak ada pendaftaran, login, dashboard, materi, leaderboard, atau rekonsiliasi Afiliasi M5.
- Tidak ada foto produk AI, tautan produk palsu, testimoni, atau cerita dampak buatan.
- Tidak ada penyimpanan profil atau riwayat jawaban kuis.

## Catatan dan kendala

- Pengujian klik-keluar sukses menuju marketplace nyata menunggu URL Produk resmi; seluruh logika satu/dua tautan dan RPC sudah terhubung.
- Kata sandi sementara Admin sudah berfungsi dan wajib segera diganti oleh pemilik; nilainya tidak disimpan dalam dokumentasi atau repository.
- `npm audit --omit=dev` dari M0 masih mencatat dua kerentanan sedang pada PostCSS bawaan Next.js; belum ada perbaikan kompatibel.

---

`STATUS.md` diperbarui setiap akhir sesi kerja.
