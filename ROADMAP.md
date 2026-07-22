# ROADMAP.md — Website Wawangian Pelajar

> Peta jalan milestone. Agent membaca dokumen ini untuk tahu **milestone mana yang aktif** dan **apa yang berikutnya**.
> Aturan: milestone dikerjakan BERURUTAN. Jangan mulai milestone berikutnya sebelum yang aktif berstatus SELESAI.

**Status keseluruhan:** M5 selesai secara teknis; menunggu tinjauan pemilik sebelum M6.
**Milestone aktif:** M5 — Portal Afiliasi, tahap tinjauan.

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

## M2 — Panel Admin + Data Nyata  ✅ (selesai)
- ✅ Login admin (akun, kata sandi, peran aktif, RLS, dan akses dasbor hosted berhasil diuji)
- ✅ CRUD Produk + validasi anti-brand-asli (BR-4) + data karakter/okasi
- ✅ Editor Konten (CRUD artikel)
- ✅ Sambungkan data nyata ke website publik
- ✅ Pencatatan & halaman Analitik Klik-keluar

Seluruh task M2 telah dibangun dan diuji terhadap Supabase hosted. Data uji sementara membuktikan alur Produk, unggah Storage, BR-4, Artikel draft/terbit/hapus, dan visibilitas publik; seluruh data serta berkas uji kemudian dihapus. Kata sandi sementara tetap wajib diganti pemilik sebelum produksi.

## M3 — Donasi (fitur andalan)  ✅ (selesai dan dikonfirmasi)
- ✅ Rekap penjualan → hitung donasi 20% (BR-1, read-only)
- ✅ Input penyaluran + unggah bukti wajib (BR-2)
- ✅ Integritas saldo amanah (BR-3)
- ✅ Halaman Transparansi Donasi publik (3 angka + riwayat + metode)
- ✅ Detail penyaluran + tautan cerita ke Konten
- ✅ Log Audit (BR-9)

Seluruh task M3 telah dibangun dan diuji terhadap Supabase hosted. Data teknis membuktikan hitung 20%, penolakan publikasi tanpa bukti, penolakan saldo negatif, publikasi berbukti, detail publik, dan Log Audit; seluruh data serta berkas teknis kemudian dihapus. Pemilik mengonfirmasi kelanjutan ke M4 pada 22 Juli 2026.

Penyempurnaan tinjauan 22 Juli 2026 menambahkan mode pratinjau lokal berlabel agar komposisi Produk, Artikel, dan transparansi Donasi dapat diperiksa saat database bisnis masih kosong. Perubahan ini tidak membuka task M4 dan tidak mengubah data Supabase hosted.

## M4 — Jembatan Marketplace + Temukan Wangimu  ✅ (selesai dan dikonfirmasi)
- ✅ Tombol beli hybrid (1 marketplace langsung / 2 popup) (BR-5)
- ✅ Pencatatan KlikKeluar
- ✅ Pesan misi permanen di halaman produk
- ✅ Halaman kuis "Temukan Wangimu" + hasil shareable

Jembatan hanya mengaktifkan URL HTTPS domain resmi. Klik Produk Supabase dicatat untuk analitik tanpa menahan pembukaan tab, sedangkan data contoh tidak mencemari analitik. Kuis tiga pertanyaan mencocokkan karakter, waktu, dan okasi dengan data Produk serta memuat kembali hasil dari URL shareable. Pemilik mengonfirmasi kelanjutan ke M5 pada 22 Juli 2026.

## M5 — Portal Afiliasi  ✅ (selesai; menunggu konfirmasi)
- ✅ Landing "Jadi Afiliasi"
- ✅ Pendaftaran + input handle marketplace (BR-6)
- ✅ Login afiliasi + Dashboard (pemisahan komisi platform vs bonus)
- ✅ Panduan onboarding (ringkas + link resmi)
- ✅ Materi promosi (unduh privat bertautan sementara)
- ✅ Leaderboard beralias
- ✅ Admin: verifikasi/koreksi handle + rekonsiliasi CSV + hitung bonus per pcs + payout berbukti (BR-7)

Schema M5 telah diterapkan pada Supabase hosted dengan 10 kebijakan RLS dan tiga bucket privat. Transaksi uji membuktikan pencocokan handle, status belum cocok, hitung bonus per pcs, leaderboard beralias, serta penolakan payout tanpa bukti; seluruh data dan Log Audit uji dibatalkan dengan rollback. Tarif bonus, afiliasi, materi, laporan, dan bukti nyata tetap menunggu input pemilik. M6 belum boleh dimulai sebelum M5 dikonfirmasi.

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
