# ROADMAP.md — Website Wawangian Pelajar

> Peta jalan milestone. Agent membaca dokumen ini untuk tahu **milestone mana yang aktif** dan **apa yang berikutnya**.
> Aturan: milestone dikerjakan BERURUTAN. Jangan mulai milestone berikutnya sebelum yang aktif berstatus SELESAI.

**Status keseluruhan:** M1 selesai dan digabungkan; M2 sedang dikerjakan.
**Milestone aktif:** M2 — Panel Admin + Data Nyata.

---

## Legenda status
- ⬜ Belum dimulai
- 🟡 Sedang dikerjakan
- ✅ Selesai (memenuhi Definition of Done)
- ⏸️ Ditunda

---

## M0 — Fondasi Proyek  ✅ (selesai)
Setup awal sebelum fitur apa pun.
- ✅ Inisialisasi Next.js (App Router + TypeScript) + Tailwind CSS
- ✅ Setup repositori GitHub + struktur folder
- ✅ Setup lapisan koneksi Supabase + environment variable contoh tanpa rahasia
- ✅ Siapkan konfigurasi dan panduan deploy Vercel (deployment nyata menunggu akses pemilik)
- ✅ Pastikan 6 dokumen tata kelola tersedia dan diperbarui (BUILD_SPEC, ROADMAP, STATUS, DECISIONS, CHANGELOG, README)

## M1 — Website Publik Statis (data contoh)  ✅ (selesai dan digabungkan)
- ✅ Layout global (navbar + drawer mobile + footer)
- ✅ Homepage (semua bagian + state Rp 0 + state tanpa review)
- ✅ Katalog (grid + filter + urutkan + pencarian + state kosong)
- ✅ Detail Produk (galeri, profil aroma, tombol beli, produk terkait)
- ✅ Konten: daftar + halaman artikel (tombol share, tanpa komentar)
- ✅ Responsif mobile-first diverifikasi

## M2 — Panel Admin + Data Nyata  🟡 (login hosted selesai; validasi mutasi data menunggu data bisnis)
- ✅ Login admin (akun, kata sandi, peran aktif, RLS, dan akses dasbor hosted berhasil diuji)
- 🟡 CRUD Produk + validasi anti-brand-asli (BR-4) + data karakter/okasi
- 🟡 Editor Konten (CRUD artikel)
- 🟡 Sambungkan data nyata ke website publik
- 🟡 Pencatatan & halaman Analitik Klik-keluar

Seluruh task M2 telah dibangun dan lolos validasi lokal. Migrasi hosted, hak tabel, RLS, Storage, fungsi database, akun Admin, dan login sudah aktif. Status tetap berjalan sampai kata sandi sementara diganti serta mutasi CRUD, unggah Storage, dan aturan BR-4 diuji memakai data bisnis asli.

## M3 — Donasi (fitur andalan)  ⬜
- ⬜ Rekap penjualan → hitung donasi 20% (BR-1, read-only)
- ⬜ Input penyaluran + unggah bukti wajib (BR-2)
- ⬜ Integritas saldo amanah (BR-3)
- ⬜ Halaman Transparansi Donasi publik (3 angka + riwayat + metode)
- ⬜ Detail penyaluran + tautan cerita ke Konten
- ⬜ Log Audit (BR-9)

## M4 — Jembatan Marketplace + Temukan Wangimu  ⬜
- ⬜ Tombol beli hybrid (1 marketplace langsung / 2 popup) (BR-5)
- ⬜ Pencatatan KlikKeluar
- ⬜ Pesan misi permanen di halaman produk
- ⬜ Halaman kuis "Temukan Wangimu" + hasil shareable

## M5 — Portal Afiliasi  ⬜
- ⬜ Landing "Jadi Afiliasi"
- ⬜ Pendaftaran + input handle marketplace (BR-6)
- ⬜ Login afiliasi + Dashboard (pemisahan komisi platform vs bonus)
- ⬜ Panduan onboarding (ringkas + link resmi)
- ⬜ Materi promosi (unduh)
- ⬜ Leaderboard
- ⬜ Admin: verifikasi handle + rekonsiliasi + hitung bonus per pcs (BR-7)

## M6 — Poles & Rilis  ⬜
- ⬜ Optimasi kecepatan & gambar
- ⬜ Aksesibilitas + uji lintas perangkat
- ⬜ Konten awal (artikel & produk perdana)
- ⬜ Rilis produksi

---

## Fase Lanjut (di luar milestone MVP — JANGAN dikerjakan tanpa instruksi)
- ⏸️ Sales Academy (pelatihan + sertifikat afiliasi)
- ⏸️ Notifikasi otomatis & program loyalitas
- ⏸️ Peran admin granular (multi-level)
- ⏸️ Bonus afiliasi berbobot per lini produk
- ⏸️ Ekspor laporan donasi (PDF)

---

*ROADMAP.md — perbarui status tiap task saat progres berubah. Selaras dengan Milestones di BUILD_SPEC.md aspek 12.*
