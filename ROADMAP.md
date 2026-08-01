# ROADMAP.md — Website Wawangian Pelajar

> Peta jalan milestone. Agent membaca dokumen ini untuk tahu **milestone mana yang aktif** dan **apa yang berikutnya**.
> Aturan: milestone dikerjakan BERURUTAN. Jangan mulai milestone berikutnya sebelum yang aktif berstatus SELESAI.

**Status keseluruhan:** M6 sedang dikerjakan; fondasi SEO artikel dan validasi teknisnya selesai, menunggu tinjauan pemilik serta task rilis lainnya.
**Milestone aktif:** M6 — Poles & Rilis.

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
- ✅ Detail Produk (satu foto utama, profil aroma, tombol beli, produk terkait)
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

## M5 — Portal Afiliasi  ✅ (selesai dan dikonfirmasi melalui instruksi M6)
- ✅ Landing "Jadi Afiliasi"
- ✅ Pendaftaran + input handle marketplace (BR-6)
- ✅ Login afiliasi + Dashboard (pemisahan komisi platform vs bonus)
- ✅ Panduan onboarding (ringkas + link resmi)
- ✅ Materi promosi (unduh privat bertautan sementara)
- ✅ Leaderboard beralias
- ✅ Admin: verifikasi/koreksi handle + rekonsiliasi CSV + hitung bonus per pcs + payout berbukti (BR-7)
- ✅ Data Contoh berlabel pada Production MVP tertutup tanpa mutasi Supabase

Schema M5 telah diterapkan pada Supabase hosted dengan 10 kebijakan RLS dan tiga bucket privat. Transaksi uji membuktikan pencocokan handle, status belum cocok, hitung bonus per pcs, leaderboard beralias, serta penolakan payout tanpa bukti; seluruh data dan Log Audit uji dibatalkan dengan rollback. Tarif bonus, afiliasi, materi, laporan, dan bukti nyata tetap menunggu input pemilik. Instruksi pengerjaan M6 pada 1 Agustus 2026 menjadi konfirmasi eksplisit untuk melanjutkan milestone.

Validasi lanjutan menambahkan satu akun teknis berlabel uji untuk memeriksa login dan seluruh portal terlindungi tanpa laporan, bonus, payout, atau posisi leaderboard. Trigger profil juga dikoreksi agar pengguna Auth non-Afiliasi tidak menggagalkan pembuatan akun. Akun teknis wajib dihapus sebelum rilis produksi M6.

Untuk peninjauan visual, mode pratinjau berlabel mengisi akun `AfiliasiUji` dengan bonus top-up, progres tingkat, riwayat rekonsiliasi, dan leaderboard yang semuanya berlabel “Data Contoh”. Simulasi tidak tersedia pada Vercel Production atau akun lain serta tidak membuat data hosted.

Penyempurnaan tinjauan M5 memperkuat `/temukan` dengan form GET yang tetap dapat dipakai tanpa bergantung penuh pada hidrasi JavaScript serta tautan “Coba contoh” khusus mode data contoh. Seluruh 32 kombinasi jawaban tervalidasi menghasilkan rekomendasi dari Produk contoh berlabel tanpa menulis data ke Supabase. Perubahan ini tidak membuka kembali M4 dan tidak memulai M6.

Mode Data Contoh mula-mula diaktifkan pada deployment Vercel Preview agar pemilik dapat meninjau branch M5 yang terisi. Seluruh simulasi tetap tanpa mutasi Supabase dan perubahan ini tidak membuka kembali M4 maupun memulai M6.

Atas keputusan pemilik untuk tahap MVP tertutup, mode berlabel diperluas ke Vercel Production ketika sakelar eksplisit aktif. Production ditujukan untuk pemilik dan reviewer tepercaya, seluruh simulasi tetap tanpa mutasi Supabase, dan sakelar wajib dimatikan sebelum rilis publik M6. Perubahan ini tetap merupakan penyempurnaan tinjauan M5.

Perbaikan regresi 28 Juli 2026 memastikan formulir Produk M2 tetap dapat dipakai selama tinjauan M5: unggahan JPEG/PNG/WebP maksimal 5 MB didukung oleh batas muatan Server Action yang selaras, kirim ganda dicegah, dan status proses terlihat. Produk nyata pertama berhasil disimpan tanpa foto AI dan tampil pada website publik. Perbaikan ini tidak memulai M6.

Penyempurnaan tinjauan 29 Juli 2026 menerapkan logo dan palet resmi pemilik, menambahkan placeholder Krem, serta mengisi katalog hosted dengan lima Produk Mykonos nyata dari dokumen sumber. Simbol logo kemudian diganti dengan revisi yang memenuhi kanvas lebih besar agar jelas pada navbar dan halaman autentikasi. Kelima Produk tervalidasi pada panel Admin dan katalog publik tanpa menambah foto AI, transaksi, atau fitur M6. Batch ini telah digabungkan ke `main`; konfirmasi penutupan M5 tetap menunggu pemilik.

Validasi akses 31 Juli 2026 menambahkan dua akun Admin teknis terkonfirmasi pada peran Admin tunggal yang sama. Kedua akun berhasil masuk ke Dasbor Admin melalui custom domain Production dan wajib dihapus atau diganti kata sandinya sebelum rilis publik. Penambahan akses pengujian ini tidak membuat peran granular, tidak memperluas BR-10, dan tidak memulai M6.

Revisi requirement 31 Juli 2026 mengizinkan gambar hasil AI atau penyempurnaan AI untuk mempercantik visual Produk dengan foto asli tetap diutamakan. Visual yang bukan foto Produk nyata wajib diberi penanda “Visual ilustrasi”, dilarang memalsukan atribut Produk atau bukti faktual, dan diatur melalui KEP-036 serta BUILD_SPEC v2.4. Revisi kebijakan ini belum mengunggah gambar baru dan tidak memulai M6.

## M6 — Poles & Rilis  🟡 (aktif)
- ✅ Migrasi kolom SEO artikel dan pemetaan tipe/data publik
- ✅ Editor Markdown aman dengan fallback artikel lama
- ✅ Panel SEO, alt text, dan penyimpanan metadata Admin
- ✅ Metadata global/artikel, canonical, Open Graph, Twitter Card, sitemap, robots, dan JSON-LD
- ✅ ISR lima menit serta optimasi gambar artikel Supabase
- ✅ Validasi teknis menyeluruh dan pembersihan data teknis; tinjauan visual pemilik tetap menunggu
- ✅ Penyederhanaan detail Produk menjadi satu foto utama yang selaras dengan satu input unggahan Admin
- ✅ Revisi judul dan deskripsi SEO beranda, Open Graph, serta Twitter Card
- ✅ Perluasan katalog hosted menjadi 15 Produk Mykonos pada ukuran 100 ml, 50 ml, dan 15 ml
- ⬜ Konten awal Artikel nyata dari pemilik
- ⬜ Penonaktifan Data Contoh dan penghapusan akun `AfiliasiUji` sebelum rilis publik
- ⬜ Rilis produksi dan pengiriman sitemap ke Google Search Console

---

## Fase Lanjut (di luar milestone MVP — JANGAN dikerjakan tanpa instruksi)
- ⏸️ Sales Academy (pelatihan + sertifikat afiliasi)
- ⏸️ Notifikasi otomatis & program loyalitas
- ⏸️ Peran admin granular (multi-level)
- ⏸️ Bonus afiliasi berbobot per lini produk
- ⏸️ Ekspor laporan donasi (PDF)

---

*ROADMAP.md — perbarui status tiap task saat progres berubah. Selaras dengan Milestones di BUILD_SPEC.md aspek 12.*
