# STATUS.md — Posisi Terkini Pengerjaan

> Dokumen ini selalu mencerminkan kondisi terkini. Riwayat lengkap perubahan tersedia di `CHANGELOG.md`.

**Terakhir diperbarui:** 21 Juli 2026
**Milestone aktif:** M0 — Fondasi Proyek
**Status milestone aktif:** Selesai (100%), menunggu konfirmasi pemilik sebelum M1

---

## Posisi saat ini

Fondasi proyek telah disiapkan pada branch `codex/m0-fondasi-proyek`: Next.js App Router, TypeScript, Tailwind CSS, struktur folder awal, klien Supabase browser/server, environment contoh, ikon logo sementara, dan panduan deploy Vercel.

Perubahan disiapkan untuk ditinjau melalui draft pull request ke `main`. M1 belum dimulai.

## Task M0

1. ✅ Inisialisasi Next.js App Router + TypeScript + Tailwind CSS.
2. ✅ Setup repository GitHub dan struktur folder awal.
3. ✅ Setup lapisan koneksi Supabase dan `.env.example` tanpa rahasia.
4. ✅ Verifikasi `npm run dev`, lint, dan build produksi.
5. ✅ Siapkan konfigurasi serta panduan deploy Vercel.
6. ✅ Pastikan enam dokumen tata kelola tersedia dan diperbarui.

## Validasi

- `npm.cmd run lint` — berhasil.
- `npm.cmd run build` — berhasil tanpa `.env.local`.
- `npm.cmd run dev` — merespons HTTP 200.
- Viewport 360px — tidak ada overflow horizontal, ikon dan konten tampil benar.
- Viewport 1440px — tidak ada overflow horizontal, layout dua kolom tampil benar.
- Konsol browser — tidak ada galat atau peringatan aplikasi.

## Langkah berikutnya

1. Pemilik meninjau dan menggabungkan draft pull request M0.
2. Pemilik menghubungkan repository ke Vercel dan memasang variabel lingkungan.
3. Pemilik memasang kredensial Supabase asli di `.env.local` untuk verifikasi koneksi proyek nyata.
4. Tunggu konfirmasi eksplisit pemilik sebelum mengaktifkan M1.

## Asumsi yang berlaku

- Logo resmi dan foto produk belum tersedia; ikon SVG lokal digunakan sebagai pengganti sementara.
- Ikon sementara bukan gambar produk dan akan diganti setelah aset resmi tersedia.
- Kredensial Supabase asli dipasang sendiri oleh pemilik dan tidak dikirim melalui chat atau GitHub.
- Nama file wajib framework dan nama paket eksternal tetap mengikuti konvensi teknis; kode buatan proyek menggunakan Bahasa Indonesia.
- Dokumentasi deploy Vercel memenuhi keluaran M0 yang dipilih; deployment nyata menunggu akses pemilik.

## Catatan dan kendala

- `npm audit --omit=dev` melaporkan dua kerentanan tingkat sedang pada PostCSS bawaan Next.js. Perbaikan otomatis yang ditawarkan akan menurunkan Next.js ke versi lama yang merusak kompatibilitas, sehingga tidak diterapkan. Tinjau kembali saat pembaruan stabil tersedia.
- npm 12 memblokir skrip instalasi opsional `sharp` dan `unrs-resolver`, tetapi lint serta build produksi tetap berhasil.

## Pertanyaan terbuka untuk pemilik

- Kapan logo dan foto produk asli tersedia?
- Kapan proyek Supabase dan deployment Vercel akan dihubungkan?

---

`STATUS.md` diperbarui setiap akhir sesi kerja.
