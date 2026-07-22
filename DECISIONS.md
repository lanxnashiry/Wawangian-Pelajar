# DECISIONS.md — Catatan Keputusan (ADR Ringkas)

> Semua keputusan penting proyek + alasannya. Format: ADR (Architecture Decision Record) ringkas.
> Aturan: selalu TAMBAH (append) keputusan baru, jangan hapus yang lama. Agent membaca ini sebelum bekerja.

---

### KEP-001 — Tempat transaksi: Opsi A (marketplace), final
**Tanggal:** 2026-07-12 · **Status:** Diterima
**Keputusan:** Website tidak memproses transaksi. Semua pembelian diarahkan ke Shopee & TikTok Shop.
**Alasan:** Modal tipis, strategi marketplace-first, memanfaatkan kepercayaan+pembayaran+ongkir marketplace yang sudah matang. Membangun checkout sendiri = mahal & berisiko konversi rendah di website baru.
**Konsekuensi:** Tidak ada payment gateway/keranjang. Checkout sendiri dibuang total dari scope.

### KEP-002 — Struktur situs: Hub & Spoke
**Tanggal:** 2026-07-12 · **Status:** Diterima
**Keputusan:** Homepage sebagai pusat, bercabang ke Katalog, Donasi, Afiliasi, Konten.
**Alasan:** Pola paling familiar, mudah dinavigasi, cocok untuk situs brand+katalog.

### KEP-003 — Akses: buka lebar, kunci seperlunya
**Tanggal:** 2026-07-12 · **Status:** Diterima
**Keputusan:** Donasi/katalog/konten publik tanpa login; afiliasi & admin wajib login; pembeli tidak perlu akun.
**Alasan:** Transparansi tidak boleh dihalangi login; belanja tidak boleh dihambat pendaftaran.

### KEP-004 — Perhitungan donasi: semi-otomatis anti-fabrikasi (Opsi C)
**Tanggal:** 2026-07-12 · **Status:** Diterima
**Keputusan:** Bukti penyaluran dibuka 100%; angka terkumpul dihitung sistem dari rekap penjualan + pernyataan metode (bukan diketik bebas). Granularitas total saja.
**Alasan:** Transaksi di marketplace → angka terkumpul mau tak mau berbasis rekap. Yang paling meyakinkan publik = bukti uang SAMPAI ke penerima, bukan detail omzet. Jaga privasi bisnis sekaligus tahan tuduhan manipulasi.

### KEP-005 — Hapus modul Akun Pelanggan & Repeat Order
**Tanggal:** 2026-07-12 · **Status:** Diterima
**Keputusan:** Tidak ada akun pembeli, riwayat pesanan on-site, atau wishlist.
**Alasan:** Transaksi di marketplace → data pesanan tidak ada di website. Modul ini jadi tidak relevan untuk MVP.

### KEP-006 — Afiliasi: pakai sistem native marketplace (rombak besar)
**Tanggal:** 2026-07-12 · **Status:** Diterima
**Keputusan:** Buang sistem kode kupon manual. Pakai program afiliasi bawaan TikTok Shop & Shopee (pelacakan + komisi dasar otomatis). Portal website = rekrutmen, panduan, materi, komunitas, leaderboard.
**Alasan:** Kode kupon manual di marketplace rapuh — pembeli malas menulis kode; memberi insentif voucher malah menggerus margin. Sistem native menyelesaikan atribusi otomatis tanpa biaya tambahan & tanpa kita membangun infrastruktur pelacakan.
**Konsekuensi:** Afiliasi wajib mencantumkan handle marketplace saat daftar (kunci pencocokan).

### KEP-007 — Bonus afiliasi: Path B, basis jumlah penjualan per pcs
**Tanggal:** 2026-07-12 · **Status:** Diterima
**Keputusan:** Komisi dasar dibayar platform; Wawangian Pelajar menambah bonus top-up berbasis jumlah penjualan per pcs, dihitung admin dari laporan afiliasi platform.
**Alasan:** Margin tipis, tapi bila kuantitas banyak tetap worth; pemilik ingin kesuksesan dirasakan banyak pihak. Basis per pcs sejalan strategi volume-first.
**Konsekuensi:** Ada kerja rekonsiliasi rutin (baca laporan platform, cocokkan handle). Bonus per pcs memberi bobot sama untuk semua lini (catatan: bisa dibobot per lini di masa depan bila terasa menggerus).

### KEP-008 — Dua marketplace (TikTok Shop + Shopee)
**Tanggal:** 2026-07-12 · **Status:** Diterima
**Keputusan:** Dukung dua-duanya sejak awal, dengan prioritas energi konten dinamis (bukan 50:50 kaku).
**Alasan:** Banyak pengguna Shopee belum pindah ke TikTok Shop; menjangkau dua basis pembeli.

### KEP-009 — Modul 1: strip cerita/artikel (Opsi C)
**Tanggal:** 2026-07-12 · **Status:** Diterima
**Keputusan:** Homepage mempertahankan teaser cerita misi emosional + menambah strip "Cerita & Edukasi Terbaru" (kartu horizontal geser) → lempar ke modul Konten.
**Alasan:** Memberi umpan konten tanpa membuat halaman terlalu panjang; memperkuat mesin marketing konten.

### KEP-010 — Modul 2: halaman "Temukan Wangimu" (kuis)
**Tanggal:** 2026-07-12 · **Status:** Diterima
**Keputusan:** Tambah halaman kuis (karakter aroma & okasi → rekomendasi produk), hasil shareable. Tanpa badge keaslian; tanpa wishlist. Lini inspirasi diberi label "Racikan Sendiri".
**Alasan:** Orang mencari parfum via karakter/okasi, bukan merek. Semua produk memang asli → badge tidak perlu; label "Racikan Sendiri" tetap ada demi transparansi.

### KEP-011 — Modul 3: hybrid + pencatatan klik-keluar
**Tanggal:** 2026-07-12 · **Status:** Diterima
**Keputusan:** 1 marketplace → beli langsung; 2 marketplace → popup pilihan. Pesan misi permanen di halaman produk. Catat klik-keluar untuk analitik minat.
**Alasan:** Tidak memaksa halaman antara untuk semua (cepat), tetap kasih pilihan saat perlu. Analitik klik berguna walau transaksi di marketplace.

### KEP-012 — Modul 6: tombol share ada, komentar tidak
**Tanggal:** 2026-07-12 · **Status:** Diterima
**Keputusan:** Artikel punya tombol berbagi ke sosmed; tidak ada kolom komentar. Cerita penerima donasi masuk kategori "Cerita Misi".
**Alasan:** Share memperkuat word-of-mouth (gratis); komentar = beban moderasi + rawan spam.

### KEP-013 — Modul 7: satu peran admin + rekonsiliasi dibantu sistem
**Tanggal:** 2026-07-12 · **Status:** Diterima
**Keputusan:** Satu peran "Admin" dulu (bukan granular). Rekonsiliasi afiliasi dibantu sistem (unggah laporan → cocokkan handle → hitung bonus otomatis). Log Audit tetap wajib. Sales Academy ditunda.
**Alasan:** Tim masih kecil → peran granular menambah kerumitan tak perlu. Sistem meringankan pencocokan manual.

### KEP-014 — Tech stack: Next.js + Supabase + Vercel
**Tanggal:** 2026-07-12 · **Status:** Diterima
**Keputusan:** Next.js (App Router, TypeScript) + Tailwind + Supabase (DB+Auth+Storage) + Vercel. Repo di GitHub. Agent: Codex (utama), Antigravity (cadangan).
**Alasan:** Ada tier gratis, AI agent paling mahir di stack ini, sanggup semua fitur custom, mobile-first mudah. Paling cocok untuk dikerjakan bertahap oleh AI agent.

### KEP-015 — Bahasa proyek: seluruhnya Bahasa Indonesia
**Tanggal:** 2026-07-12 · **Status:** Diterima
**Keputusan:** Seluruh kode, komentar, penamaan, commit, dan dokumen dalam Bahasa Indonesia.
**Alasan:** Preferensi pemilik; konsistensi tim lokal.

### KEP-016 — Ikon visual sementara sampai aset resmi tersedia
**Tanggal:** 2026-07-21 · **Status:** Diterima
**Keputusan:** Gunakan ikon SVG lokal sederhana dengan palet brand sebagai pengganti sementara untuk logo dan ikon yang belum tersedia. Ikon sementara tidak boleh dipakai sebagai foto produk dan harus diganti setelah aset resmi diberikan.
**Alasan:** Fondasi dan identitas dasar perlu dapat diuji tanpa mengarang aset produk. SVG lokal ringan, dapat diakses, dan tidak bergantung pada layanan eksternal.
**Konsekuensi:** Wordmark “Wawangian Pelajar” tetap menjadi identitas utama selama logo resmi belum tersedia; larangan gambar produk AI tetap berlaku.

### KEP-017 — Disiplin data contoh dan batas integrasi pada M1
**Tanggal:** 2026-07-21 · **Status:** Diterima
**Keputusan:** Semua produk, harga, artikel, dan visual M1 diberi status contoh. Angka donasi dan testimoni wireframe tidak dipakai. Tombol marketplace tetap nonaktif sampai M4, sedangkan rute Donasi dan Afiliasi hanya menampilkan state “segera hadir”.
**Alasan:** M1 bertujuan memvalidasi pengalaman publik statis tanpa mengarang bukti sosial, data dampak, tautan transaksi, atau perilaku milestone berikutnya.
**Konsekuensi:** Seluruh data contoh harus diganti atau diverifikasi saat M2 menyediakan sumber data nyata; fitur integrasi tetap mengikuti urutan ROADMAP.

### KEP-018 — Otorisasi Admin berlapis dengan tabel keanggotaan dan RLS
**Tanggal:** 2026-07-21 · **Status:** Diterima
**Keputusan:** Supabase Auth menangani identitas, sedangkan akses panel dan mutasi data hanya diberikan kepada pengguna aktif yang tercatat di `pengguna_admin`. Server Action memeriksa ulang keanggotaan dan database menegakkannya melalui RLS.
**Alasan:** Status `authenticated` saja tidak membuktikan bahwa pengguna adalah Admin. Pemeriksaan berlapis mencegah akun biasa mengakses data pengelolaan.
**Konsekuensi:** Admin pertama dibuat memakai service-role hanya dari lingkungan lokal atau dashboard Supabase; kata sandi tidak disimpan di repository/README.

### KEP-019 — Pembagian analitik klik antara M2 dan M4
**Tanggal:** 2026-07-21 · **Status:** Diterima
**Keputusan:** M2 menyediakan tabel, RPC pencatatan, route handler, dan halaman analitik. M4 menghubungkan tombol marketplace nyata ke pencatatan tersebut.
**Alasan:** ROADMAP menyebut analitik pada M2 dan pencatatan pada M4. Pembagian ini menyiapkan fondasi tanpa mengaktifkan jembatan marketplace lebih awal.
**Konsekuensi:** Halaman analitik M2 menampilkan kondisi nol sampai M4 mengirim klik nyata; data klik tidak pernah menjadi dasar komisi afiliasi.

### KEP-020 — Data contoh sebagai fallback terbatas sebelum Supabase aktif
**Tanggal:** 2026-07-21 · **Status:** Diterima
**Keputusan:** Data contoh M1 tetap digunakan dan diberi label hanya ketika konfigurasi/schema Supabase belum dapat dibaca. Setelah kueri Supabase berhasil, termasuk hasil kosong, website memakai hasil tersebut tanpa mengarang isi.
**Alasan:** Build dan preview harus tetap hidup sebelum migrasi hosted diterapkan, sementara data bisnis final memang belum tersedia.
**Konsekuensi:** Fallback harus dihapus pada M6 setelah data produksi dan konfigurasi deploy terverifikasi.

### KEP-021 — Aktivasi Admin melalui tautan Supabase dan halaman aplikasi
**Tanggal:** 2026-07-21 · **Status:** Diterima
**Keputusan:** Undangan dan pemulihan kata sandi Admin diarahkan ke `/admin/undangan`. Halaman aplikasi menerima sesi implicit atau PKCE dari Supabase, meminta kata sandi minimal 12 karakter, dan memeriksa keanggotaan `pengguna_admin` aktif sebelum membuka panel.
**Alasan:** Tautan bawaan sebelumnya mengarah ke localhost tanpa halaman penyelesaian sehingga email terkonfirmasi tetapi pemilik tidak dapat membuat kata sandi. Kata sandi harus tetap dibuat sendiri oleh pemilik dan tidak boleh melewati chat, README, atau repository.
**Konsekuensi:** Server lokal port 3000 harus aktif saat memakai Site URL lokal. Setelah domain Vercel tersedia, Site URL dan daftar pengalihan Supabase wajib diganti ke domain produksi/preview yang sah.

### KEP-022 — Kata sandi sementara Admin melalui SDK resmi
**Tanggal:** 2026-07-21 · **Status:** Diterima
**Keputusan:** Karena email undangan dan pemulihan tidak diterima, pemilik menyetujui kata sandi sementara minimal 12 karakter untuk ditetapkan satu kali melalui SDK Admin resmi Supabase. Nilainya hanya boleh berada di memori proses, tidak boleh ditulis ke berkas, dokumentasi, log, atau repository, dan wajib segera diganti oleh pemilik.
**Alasan:** Akun Auth dan keanggotaan Admin sudah aktif, tetapi pemilik tidak dapat menyelesaikan pembuatan kata sandi lewat email. Jalur SDK resmi memungkinkan aktivasi terkontrol tanpa menurunkan aturan panjang kata sandi.
**Konsekuensi:** Login awal harus diuji, pemilik mengganti kata sandi melalui `/admin/undangan`, dan secret key tidak boleh dipertahankan setelah operasi selesai.

### KEP-023 — Donasi 20% dihitung database dan laba mentah tetap privat
**Tanggal:** 2026-07-21 · **Status:** Diterima
**Keputusan:** `jumlah_donasi` disimpan sebagai kolom generated sebesar `untung_bersih × 20 / 100`. Publik memperoleh total dan metode melalui fungsi `SECURITY DEFINER` yang hanya mengembalikan data aman; tabel rekap mentah hanya dapat dibaca Admin.
**Alasan:** Perhitungan database mencegah angka donasi diketik atau diubah bebas, sedangkan RPC mempertahankan transparansi tanpa membuka rincian laba bisnis.
**Konsekuensi:** Perubahan persentase memerlukan keputusan requirement dan migrasi baru. Aplikasi tidak menyediakan input jumlah donasi maupun akses publik ke `untung_bersih`.

### KEP-024 — Penyaluran terpublikasi menjadi satu-satunya pengurang saldo
**Tanggal:** 2026-07-21 · **Status:** Diterima
**Keputusan:** Penyaluran draft tidak tampil atau mengurangi saldo publik. Status `terpublikasi` wajib memiliki minimal satu bukti dan ditolak database bila totalnya melebihi donasi terkumpul. Log Audit bersifat append-only bagi aplikasi. Bucket bukti memakai URL publik tanpa izin daftar objek publik.
**Alasan:** Pemisahan draft menjaga proses operasional, sedangkan bukti wajib dan validasi saldo menegakkan BR-2/BR-3. Pembatasan daftar objek mengurangi paparan nama berkas tanpa menghalangi pemeriksaan bukti yang dipublikasikan.
**Konsekuensi:** Koreksi angka sensitif tetap meninggalkan jejak audit. Penghapusan data teknis hanya dilakukan oleh pemilik database dalam transaksi terkontrol setelah pengujian.

### KEP-025 — Mode pratinjau lokal dengan data contoh berlabel
**Tanggal:** 2026-07-22 · **Status:** Diterima
**Keputusan:** Data contoh Produk dan Artikel M1 serta simulasi Donasi M3 dapat dipakai kembali hanya ketika `MODE_PRATINJAU_DATA_CONTOH=true` dan aplikasi berjalan dalam mode pengembangan. Seluruh halaman publik menampilkan pemberitahuan “Data Contoh”; angka, penerima, tujuan, dan visual bukti simulasi juga ditandai sebagai bukan transaksi nyata. Mode ini tidak membuat atau mengubah data Supabase.
**Alasan:** Database bisnis sengaja masih kosong, sedangkan pemilik perlu meninjau komposisi website yang terisi sebelum menyediakan data final. Pengecualian eksplisit ini menjaga preview berguna tanpa menyamarkan simulasi sebagai dampak nyata.
**Konsekuensi:** KEP-020 tetap berlaku untuk build produksi, Vercel, dan pengembangan lokal saat sakelar mati. Mode contoh tidak dapat aktif saat `NODE_ENV=production`, tidak digunakan di panel Admin, dan wajib dihapus bersama fallback pada M6 setelah data produksi terverifikasi.

### KEP-026 — Jembatan marketplace aman dan analitik hanya untuk Produk nyata
**Tanggal:** 2026-07-22 · **Status:** Diterima
**Keputusan:** Satu tautan marketplace valid dibuka langsung di tab baru; dua tautan valid menampilkan dialog pilihan. Tautan wajib memakai HTTPS serta domain resmi Shopee/TikTok. Pencatatan KlikKeluar dikirim tanpa menahan pembukaan tab dan hanya dilakukan untuk Produk Supabase; data contoh hanya menampilkan simulasi dialog tanpa navigasi atau pencatatan.
**Alasan:** Alur harus cepat sesuai BR-5, tetapi tautan salah atau data contoh tidak boleh mengarahkan pengunjung dan mencemari analitik bisnis.
**Konsekuensi:** Produk tanpa tautan valid tetap menampilkan tombol nonaktif. Pengujian klik-keluar nyata membutuhkan URL Produk resmi dari pemilik; data KlikKeluar tidak pernah dipakai untuk atribusi atau pembayaran komisi afiliasi.

### KEP-027 — Hasil kuis disimpan dalam URL tanpa akun
**Tanggal:** 2026-07-22 · **Status:** Diterima
**Keputusan:** Temukan Wangimu memakai tiga jawaban—karakter, waktu, dan okasi—untuk memberi skor pada `karakter` serta `cocok_untuk` Produk. Pilihan disimpan sebagai parameter URL tervalidasi agar hasil dapat dibagikan dan dimuat kembali tanpa akun atau tabel baru.
**Alasan:** URL menjaga kuis ringan, hemat data, dan sesuai Non-Scope akun pembeli. Alasan kecocokan dapat dijelaskan langsung dari data katalog.
**Konsekuensi:** Jawaban tidak dianggap data pribadi dan tidak disimpan di Supabase. Hasil adalah panduan selera, bukan klaim mutlak; kualitas rekomendasi mengikuti kelengkapan data Produk yang diisi Admin.

### KEP-028 — Identitas Afiliasi memakai Supabase Auth dan profil berstatus menunggu
**Tanggal:** 2026-07-22 · **Status:** Diterima
**Keputusan:** Afiliasi mendaftar serta masuk dengan email dan kata sandi Supabase Auth. Trigger database membuat profil dari metadata tervalidasi dengan status awal `menunggu`; Admin memverifikasi atau mengoreksi minimal satu handle sebelum mengaktifkan akses penuh. WhatsApp hanya menjadi kontak operasional, bukan metode login SMS.
**Alasan:** Autentikasi email sudah tersedia pada fondasi Supabase, sedangkan SMS memerlukan konfigurasi dan biaya tambahan yang tidak termasuk requirement. Status menunggu menjaga pencocokan handle sebelum materi serta leaderboard dibuka.
**Konsekuensi:** Redirect URL `/auth/konfirmasi?next=/afiliasi/dashboard` wajib diizinkan di Supabase. Afiliasi nonaktif atau belum diverifikasi hanya dapat melihat status pendaftarannya.

### KEP-029 — Tarif bonus nyata dikonfigurasi Admin dan laporan hanya membawa handle serta pcs
**Tanggal:** 2026-07-22 · **Status:** Diterima
**Keputusan:** Migrasi tidak menanam tarif, tingkat, penjualan, atau payout contoh. Admin menetapkan tingkat berdasarkan minimal pcs dan bonus per pcs nyata sebelum mengunggah CSV berkolom `handle,jumlah_pcs`. Database mencocokkan handle aktif, memilih tingkat tertinggi yang memenuhi batas, lalu menghitung bonus; payout `dibayar` wajib bukti transfer.
**Alasan:** BUILD_SPEC menetapkan basis per pcs tetapi tidak menetapkan nominal. Nilai contoh wireframe tidak boleh berubah menjadi janji pendapatan atau data bisnis palsu.
**Konsekuensi:** Laporan tidak dapat diproses tanpa minimal satu tingkat aktif. Website tidak menyimpan nilai komisi dasar, omzet, atau data dompet marketplace; komisi resmi tetap diperiksa dan dibayar platform.

### KEP-030 — Data operasional Afiliasi privat dan leaderboard beralias
**Tanggal:** 2026-07-22 · **Status:** Diterima
**Keputusan:** Laporan platform, materi, dan bukti payout disimpan pada bucket privat. Afiliasi memperoleh materi melalui URL bertanda tangan selama 10 menit. Leaderboard terautentikasi hanya mengembalikan alias, jumlah pcs, urutan, serta penanda baris sendiri.
**Alasan:** Handle, laporan, bukti transfer, dan identitas asli adalah data operasional yang tidak perlu dibuka ke publik. Materi tetap mudah diunduh tanpa membuat bucket menjadi publik.
**Konsekuensi:** Email, WhatsApp, nama asli, handle, lokasi laporan, dan bukti transfer tidak tersedia melalui leaderboard atau halaman publik. RLS dan Log Audit tetap menjadi lapisan pengamanan utama.

---

*DECISIONS.md — tambahkan KEP-XXX baru setiap ada keputusan. Jangan hapus yang lama.*
