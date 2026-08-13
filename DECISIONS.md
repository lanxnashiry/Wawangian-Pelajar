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

### KEP-031 — Simulasi Afiliasi hanya untuk akun uji pada mode pengembangan
**Tanggal:** 2026-07-22 · **Status:** Diterima
**Keputusan:** `MODE_PRATINJAU_DATA_CONTOH=true` dapat menampilkan bonus top-up, tingkat, riwayat rekonsiliasi, status payout, dan leaderboard contoh hanya ketika `NODE_ENV=development` serta identitas pengguna cocok dengan email dan alias akun `AfiliasiUji`. Dashboard dan leaderboard wajib menampilkan pemberitahuan “Data Contoh”.
**Alasan:** Pemilik perlu meninjau keadaan portal yang terisi, tetapi KEP-029 melarang tarif, penjualan, bonus, atau payout contoh masuk ke database dan terlihat sebagai janji bisnis nyata.
**Konsekuensi:** Simulasi tidak menjalankan RPC, tidak membuat atau mengubah baris Supabase, tidak berlaku untuk akun lain, dan otomatis mati pada build produksi. Nilai contoh wajib dihapus bersama mode pratinjau sebelum rilis M6 setelah data nyata terverifikasi.

### KEP-032 — Data contoh dapat aktif khusus pada Vercel Preview
**Tanggal:** 2026-07-22 · **Status:** Diterima
**Keputusan:** `MODE_PRATINJAU_DATA_CONTOH=true` mengaktifkan data contoh ketika aplikasi berjalan pada pengembangan lokal atau ketika variabel sistem Vercel menyatakan `VERCEL_ENV=preview`. Sakelar wajib tidak dipasang atau bernilai `false` pada lingkungan Production. Seluruh label “Data Contoh”, pembatas akun uji, dan larangan mutasi Supabase tetap berlaku.
**Alasan:** Pemilik perlu meninjau website yang terisi melalui deployment branch/PR Vercel, bukan hanya dari server lokal. `NODE_ENV` bernilai `production` pada build Vercel Preview sehingga pembatas lama mematikan simulasi meskipun sakelar sudah dipasang.
**Konsekuensi:** KEP-025 dan KEP-031 diperluas hanya untuk lingkungan Vercel Preview. Vercel Production tetap membaca data Supabase nyata atau keadaan kosong; pemilik wajib membatasi variabel ke lingkungan Preview dan melakukan deployment ulang setelah konfigurasi berubah.

### KEP-033 — Data contoh boleh aktif pada Production MVP terbatas
**Tanggal:** 2026-07-22 · **Status:** Diterima
**Keputusan:** Selama tahap peninjauan MVP, `MODE_PRATINJAU_DATA_CONTOH=true` mengaktifkan seluruh simulasi berlabel pada pengembangan lokal, Vercel Preview, dan Vercel Production. Sakelar tetap `false` secara default, simulasi Afiliasi tetap khusus akun `AfiliasiUji`, dan tidak ada data contoh yang ditulis ke Supabase.
**Alasan:** Website belum dirilis untuk konsumsi publik dan pemilik ingin meninjau serta membagikan Production kepada orang tepercaya dengan keadaan antarmuka yang terisi.
**Konsekuensi:** KEP-032 diperluas untuk Production MVP. Akses Production disarankan dilindungi melalui Deployment Protection Vercel, seluruh reviewer wajib memahami label “Data Contoh”, dan sakelar wajib dimatikan sebelum rilis publik M6.

### KEP-034 — Batas muatan Produk menyediakan ruang di atas batas file
**Tanggal:** 2026-07-28 · **Status:** Diterima
**Keputusan:** Server Action formulir Produk menerima muatan maksimal 6 MB, sedangkan foto tetap dibatasi JPEG/PNG/WebP maksimal 5 MB oleh aplikasi dan Supabase Storage.
**Alasan:** Batas bawaan Next.js 1 MB bertentangan dengan batas 5 MB yang dijanjikan antarmuka. Muatan multipart juga membawa field teks dan metadata sehingga batas transport harus sedikit lebih besar daripada batas berkas.
**Konsekuensi:** Foto di atas 5 MB tetap ditolak sebelum mutasi Produk. Kenaikan batas tidak mengizinkan jenis berkas baru, tidak mengubah bucket, dan tidak mengizinkan gambar produk AI.

### KEP-035 — Logo dan sistem warna resmi menggantikan placeholder M0
**Tanggal:** 2026-07-29 · **Status:** Diterima
**Keputusan:** Aset logo resmi dari pemilik menggantikan ikon SVG sementara. Sistem warna website memakai Warm Cream `#F4EBDD`, Off-White `#FAF7F1`, Deep Navy `#102A43`, Premium Teal `#087477`, Muted Gold `#C7A25A`, dan Charcoal `#282B2F` dengan komposisi brand sekitar 65/20/10/maksimal 5 persen. Produk juga menerima placeholder `krem`.
**Alasan:** Pemilik telah memberikan logo final dan color guide yang menggantikan status “logo belum ada” serta palet awal BUILD_SPEC. Placeholder Krem diperlukan agar visual Produk mengikuti data sumber dan kanvas brand resmi.
**Konsekuensi:** Logo dioptimalkan sebagai WebP untuk antarmuka dan PNG untuk favicon, ikon sementara dihapus, BUILD_SPEC naik ke v2.3, constraint warna Produk menerima `krem`, dan emas tetap dibatasi sebagai aksen. Larangan foto Produk AI tetap berlaku.

### KEP-036 — Visual Produk berbantuan AI diizinkan secara terkendali
**Tanggal:** 2026-07-31 · **Status:** Diterima
**Keputusan:** Gambar hasil AI dan penyempurnaan AI boleh digunakan untuk menambah serta mempercantik visual Produk. Foto asli tetap diutamakan. Visual yang bukan foto Produk nyata secara langsung wajib diberi penanda “Visual ilustrasi” pada antarmuka atau keterangan gambar.
**Alasan:** Pemilik mengizinkan AI sebagai alat kreasi visual selama tahap MVP agar katalog lebih menarik dan tidak bergantung sepenuhnya pada ketersediaan foto studio.
**Konsekuensi:** Bagian larangan foto AI pada KEP-016, KEP-034, dan KEP-035 digantikan oleh keputusan ini; ketentuan lainnya tetap berlaku. Visual AI tidak boleh memalsukan bentuk, ukuran, isi, warna, kemasan, manfaat, sertifikasi, dukungan pihak lain, atau kondisi Produk. Visual AI juga tidak boleh dipakai sebagai bukti donasi, transaksi, payout, penerima manfaat, atau dokumen faktual lain. BUILD_SPEC naik ke v2.4.

### KEP-037 — Markdown menjadi sumber isi artikel
**Tanggal:** 2026-08-01 · **Status:** Diterima
**Keputusan:** Isi artikel disimpan sebagai Markdown di kolom `isi_markdown`, sedangkan kolom `bagian` dipertahankan sebagai cadangan kompatibilitas.
**Alasan:** Parser teks lama tidak mendukung tautan, penekanan, daftar, kutipan, subjudul tingkat tiga, dan tabel. Markdown memungkinkan tautan internal ke halaman Produk tanpa membangun editor khusus.
**Konsekuensi:** Artikel lama tetap dapat dirender dari `bagian`. Penyimpanan baru menulis Markdown mentah dan hasil pemetaan `bagian` secara bersamaan sampai jalur lama resmi dihentikan.

### KEP-038 — Metadata pencarian terpisah dan opsional
**Tanggal:** 2026-08-01 · **Status:** Diterima
**Keputusan:** Judul serta deskripsi hasil pencarian dipisahkan dari Judul dan Cuplikan artikel. Keduanya opsional dan memakai fallback ke nilai utama saat kosong.
**Alasan:** H1 dapat dibuat naratif untuk pembaca, sedangkan judul pencarian perlu ringkas agar tidak terpotong. Sifat opsional menjaga artikel lama tetap valid tanpa penyuntingan massal.
**Konsekuensi:** Judul pencarian dibatasi 70 karakter dan deskripsi pencarian 200 karakter pada formulir, server, serta database. Fokus kata kunci hanya menjadi catatan internal dan tidak dikirim sebagai meta keyword.

### KEP-039 — Renderer Markdown aman tanpa HTML mentah
**Tanggal:** 2026-08-01 · **Status:** Diterima
**Keputusan:** Render Markdown memakai `react-markdown` dan `remark-gfm` tanpa `rehype-raw`.
**Alasan:** Pustaka teruji menggantikan parser buatan sendiri, sedangkan penolakan HTML mentah mencegah isi artikel menjadi jalur eksekusi skrip.
**Konsekuensi:** Tautan eksternal dibuka pada tab baru dengan `noopener noreferrer nofollow`; tautan internal tetap di tab yang sama. Admin dilarang menulis H1 Markdown karena judul halaman sudah menjadi satu-satunya H1.

### KEP-040 — Halaman artikel memakai ISR lima menit
**Tanggal:** 2026-08-01 · **Status:** Diterima
**Keputusan:** Daftar dan detail artikel publik memakai ISR dengan masa validasi ulang 300 detik, bukan `force-dynamic`.
**Alasan:** Artikel adalah konten yang jarang berubah. Render per kunjungan memperburuk waktu respons tanpa manfaat yang sepadan.
**Konsekuensi:** Server Action artikel tetap memanggil `revalidatePath` agar perubahan Admin terlihat tanpa menunggu siklus ISR penuh.

### KEP-041 — Tanggal terbit mengikuti perubahan status
**Tanggal:** 2026-08-01 · **Status:** Diterima
**Keputusan:** `tanggal_terbit` diisi otomatis ketika status menjadi `terbit`, dipertahankan pada penyuntingan berikutnya, dan dikosongkan ketika artikel kembali menjadi `draft`.
**Alasan:** Tanggal ISO diperlukan untuk urutan artikel, sitemap, Open Graph, dan schema `datePublished`; penyuntingan judul tidak boleh mengubah waktu penerbitan asli.
**Konsekuensi:** Formulir membawa tanggal lama sebagai nilai tersembunyi. Artikel lama dengan tanggal kosong perlu diterbitkan ulang atau diperbaiki secara terkontrol sebelum rilis publik.

### KEP-042 — Produk memakai satu foto utama
**Tanggal:** 2026-08-01 · **Status:** Diterima
**Keputusan:** Setiap Produk memiliki maksimal satu foto utama pada antarmuka. Formulir Admin tetap memakai satu input file, unggahan baru menggantikan referensi foto lama, dan halaman detail tidak menampilkan thumbnail galeri tanpa sumber gambar tersendiri.
**Alasan:** Admin hanya menyediakan satu unggahan foto per Produk. Label “Tampak depan”, “Detail botol”, dan “Kemasan” sebelumnya hanya berupa placeholder sehingga memberi kesan adanya galeri yang tidak benar-benar dikelola.
**Konsekuensi:** Kolom array lama dipertahankan untuk kompatibilitas database, tetapi aplikasi hanya membaca serta menyimpan satu URL aktif. Berkas Storage lama tidak dihapus otomatis. Kebijakan “Visual ilustrasi” pada KEP-036 tetap berlaku.

### KEP-043 — Metadata beranda menargetkan pencarian mahasiswa
**Tanggal:** 2026-08-02 · **Status:** Diterima
**Keputusan:** Judul metadata beranda, Open Graph, dan Twitter Card memakai “Wawangian Pelajar — Decant Parfum Original untuk Mahasiswa”. Deskripsinya menonjolkan decant serta parfum inspirasi mulai 5 ml dan misi 20% laba untuk pendidikan.
**Alasan:** Pemilik sedang menyiapkan website untuk ditemukan melalui Google dan memilih frasa yang lebih spesifik terhadap Produk serta sasaran mahasiswa daripada deskripsi brand yang umum.
**Konsekuensi:** Metadata sosial dan mesin pencari memakai naskah yang sama. Kata “laba” ditafsirkan sebagai keuntungan bersih sesuai BR-1; klaim ukuran mulai 5 ml harus tetap didukung Produk aktif sebelum rilis publik.

### KEP-044 — Lima aroma Mykonos tersedia dalam tiga ukuran
**Tanggal:** 2026-08-02 · **Status:** Diterima
**Keputusan:** Lima Produk Mykonos 100 ml menjadi sumber untuk varian 50 ml dan 15 ml. Varian menyalin harga Rp549.000, profil aroma, ringkasan, status, warna placeholder, serta tautan Shopee; nama, slug, ukuran, dan spesifikasi ukuran pada deskripsi disesuaikan.
**Alasan:** Pemilik meminta katalog berisi 15 Produk dengan lima aroma yang sama pada ukuran 100 ml, 50 ml, dan 15 ml, termasuk tautan Shopee yang sama.
**Konsekuensi:** Harga dan tautan marketplace ketiga ukuran tetap sama sampai pemilik memberikan nilai khusus per varian. Foto 100 ml tidak disalin ke ukuran lain agar tidak memalsukan ukuran sesuai KEP-036. Metadata “mulai 5 ml” belum didukung katalog hosted yang ukuran terkecilnya 15 ml dan perlu ditinjau sebelum rilis publik luas.

### KEP-045 — Harga Mykonos ditetapkan per ukuran dan input tanpa stepper
**Tanggal:** 2026-08-02 · **Status:** Diterima
**Keputusan:** Kelima Produk Mykonos berukuran 100 ml memakai harga Rp539.000, ukuran 50 ml memakai Rp289.000, dan ukuran 15 ml memakai Rp119.000. Input harga pada formulir Admin memakai isian teks dengan papan ketik numerik dan pola digit agar tidak menampilkan tombol panah naik/turun bawaan peramban.
**Alasan:** Pemilik menetapkan harga khusus untuk setiap ukuran dan meminta pengisian harga tanpa kontrol kenaikan atau penurunan angka.
**Konsekuensi:** Bagian harga pada KEP-044 digantikan oleh keputusan ini; profil aroma serta tautan Shopee tetap sama. Server tetap mengubah masukan menjadi angka dan menolak nilai yang bukan bilangan atau bernilai negatif. Perubahan harga tetap tercatat oleh Log Audit sesuai BR-9.

### KEP-046 — Decant multi-aroma memakai satu Produk per ukuran
**Tanggal:** 2026-08-03 · **Status:** Diterima
**Keputusan:** Decant Mykonos ukuran 1 ml, 2 ml, 5 ml, dan 10 ml disimpan sebagai empat Produk terpisah. Setiap Produk memuat lima pilihan aroma dengan nama varian pada deskripsi serta setiap kelompok profil aroma; pemilihan varian tetap dilakukan pada halaman Shopee yang sama.
**Alasan:** Sumber pemilik menetapkan empat ukuran sebagai empat Produk, sedangkan transaksi dan pilihan varian berlangsung di marketplace sesuai KEP-001. Awalan nama varian pada profil terstruktur mencegah gabungan notes terbaca sebagai satu formula parfum.
**Konsekuensi:** Website tidak menambah pemilih varian atau checkout. Keempat Produk tidak memiliki foto sampai aset decant tersedia, tidak memiliki tautan TikTok Shop, dan menggunakan satu tautan Shopee dari sumber. Profil Monaco Royale pada ukuran 100 ml, 50 ml, dan 15 ml diselaraskan dengan sumber terbaru 3 Agustus 2026. Metadata beranda “mulai 5 ml” tidak diubah tanpa keputusan naskah baru meskipun katalog kini memiliki ukuran 1 ml.

### KEP-047 — Foto katalog memakai aset bernama jelas dan referensi ukuran transparan
**Tanggal:** 2026-08-03 · **Status:** Diterima
**Keputusan:** Lima aroma Mykonos ukuran 100 ml memakai foto 100 ml yang namanya cocok, sedangkan ukuran 50 ml dan 15 ml memakai foto 50 ml yang sama. Berkas dengan nama memuat “WP”, video, serta nama yang tidak cocok dengan Produk tidak digunakan. Migrasi foto katalog tidak mengubah foto Produk Decant yang dikelola manual oleh pemilik.
**Alasan:** Pemilik menyediakan dua foto terpilih per aroma dan meminta varian 15 ml memakai foto 50 ml sampai aset khusus tersedia. Satu URL bersama untuk 50 ml dan 15 ml menghindari duplikasi Storage.
**Konsekuensi:** Foto dikonversi menjadi WebP ringan tanpa mengubah komposisinya. Detail Produk 15 ml wajib menjelaskan bahwa visual merupakan referensi kemasan 50 ml agar ukuran tidak disalahpahami; foto tersebut harus diganti ketika aset 15 ml tersedia. Foto Decant yang sudah diunggah pemilik dipertahankan dan Decant lain tetap memakai placeholder sampai pemilik mengunggah asetnya.

---

### KEP-048 — Analitik pengunjung memakai Umami self-host, di-proxy lewat domain sendiri
**Tanggal:** 2026-08-04 · **Status:** Diterima
**Keputusan:** Analitik pengunjung memakai **Umami self-host**, dipasang lewat komponen `components/analitik-umami.tsx` di `app/layout.tsx`. Skrip tracker dilayani melalui domain sendiri pada `/stats/script.js` dan `/stats/api/send` memakai `rewrites()` di `next.config.ts`. Tiga variabel lingkungan bersifat opsional: `NEXT_PUBLIC_UMAMI_ID_SITUS`, `UMAMI_URL_INSTANCE`, `NEXT_PUBLIC_UMAMI_URL_SKRIP`. Bila `NEXT_PUBLIC_UMAMI_ID_SITUS` kosong, komponen tidak merender apa pun dan tidak ada rewrite yang dibuat. Klik tombol beli mengirim event `klik-beli` berisi marketplace tujuan dan nama produk.
**Alasan:** Modul Analitik Klik-Keluar yang sudah ada hanya mengukur langkah terakhir sehingga menghasilkan pembilang tanpa penyebut — lima klik tidak bisa dibedakan apakah berasal dari sepuluh pengunjung atau seribu, padahal kedua angka itu menuntut perbaikan yang berlawanan. Umami dipilih karena data tetap milik pemilik, ringan sehingga tidak melawan rencana perbaikan kecepatan halaman, dan tanpa cookie sehingga tidak memerlukan banner persetujuan. Proxy lewat domain sendiri dipakai agar tracker tidak diblokir pemblokir iklan.
**Konsekuensi:** Analitik Klik-Keluar di panel Admin tetap menjadi catatan resmi; Umami hanya pelengkap untuk mengukur konversi dan sumber trafik. Pemilik wajib mendirikan instance Umami sendiri beserta beban perawatannya sebelum data mulai terkumpul; sampai itu terjadi, situs berjalan normal tanpa tracker. `data-domains` dibatasi pada domain produksi agar kunjungan dari localhost dan Vercel Preview tidak mengotori data. Tidak ada data pribadi pembeli yang dikumpulkan dan batas non-scope tetap terjaga.

### KEP-049 — `AGENTS.md` menjadi pedoman tunggal agent, awalan branch menandai pengerjanya
**Tanggal:** 2026-08-04 · **Status:** Diterima
**Keputusan:** Pedoman kerja seluruh agent dipindahkan ke **`AGENTS.md` di root repo**, menggantikan peran `PROMPT_PEMBUKA_CODEX.txt` yang harus disalin-tempel manual dan tersimpan di folder dokumen yang sudah basi. Branch wajib berawalan nama agent: `codex/...` untuk Codex/ChatGPT, `hermes/...` untuk Hermes. `base` setiap PR wajib `main`. Penomoran KEP diambil setelah `git pull` dari nomor terakhir di `DECISIONS.md`; bila dua agent memakai nomor yang sama, yang di-merge belakangan menaikkan nomornya.
**Alasan:** Tidak ada agent yang mengingat sesi sebelumnya, sehingga kesinambungan pekerjaan bergantung sepenuhnya pada dokumen di repo. Codex CLI membaca `AGENTS.md` dari root secara otomatis, sehingga aturan tidak lagi bergantung pada salin-tempel manual yang sudah terbukti gagal. Bukti kegagalannya: modul analitik Umami lengkap dan lolos build ditemukan menggantung di working tree tanpa satu pun catatan di `STATUS.md`, `CHANGELOG.md`, maupun `DECISIONS.md`, sehingga agent berikutnya tidak punya cara membedakannya dari percobaan yang dibuang. Awalan branch dipakai bukan untuk kredit, melainkan agar pemilik tahu harus bertanya ke agent mana ketika muncul bug.
**Konsekuensi:** Semua agent membaca `AGENTS.md` lebih dulu sebelum menulis kode, lalu memperbarui `STATUS.md`, `CHANGELOG.md`, `ROADMAP.md`, dan `DECISIONS.md` pada commit yang sama dengan perubahan kode. `PROMPT_PEMBUKA_CODEX.txt` di folder dokumen menjadi arsip dan tidak lagi dipakai sebagai sumber aturan. Salinan dokumen tata kelola di `C:\Users\lanxn\Documents\Wawangian_Pelajar_Website\` tetap berstatus basi kecuali `MEMORY_BISNIS.md`. `AGENTS.md` juga memuat daftar utang teknis dan pitfall git yang sudah pernah terjadi, termasuk rantai PR yang tidak pernah sampai `main`.

### KEP-050 — Entri massal memakai workbook `.xlsx`, create-only, pratinjau wajib, dan transaksi atomik
**Tanggal:** 2026-08-04 · **Status:** Diterima
**Keputusan:** Admin mengelola entri massal Produk dan Artikel melalui satu workbook `.xlsx` dengan sheet `Petunjuk`, `Produk`, dan `Artikel`. Unggahan pertama hanya menghasilkan pratinjau baris; berkas yang sama diparsing dan divalidasi ulang dari nol saat impor. Impor bersifat **create-only**: slug yang sudah ada atau ganda ditolak dan tidak ada mode overwrite. Maksimal 500 baris per sheet serta 5 MB per workbook. Seluruh Artikel hasil impor dipaksa menjadi `draft`, walaupun workbook meminta `terbit`. Foto tidak diunggah sebagai kumpulan berkas; versi pertama hanya menerima satu URL HTTPS publik per baris. Penyimpanan seluruh Produk dan Artikel valid dilakukan oleh satu RPC PostgreSQL dalam satu transaksi dan menghasilkan satu Log Audit batch.
**Alasan:** Artikel memuat Markdown multi-baris, tabel, dan koma sehingga CSV polos rawan rusak saat diedit di Excel; workbook `.xlsx` dapat mempertahankan isi serta menyediakan dropdown. Pratinjau wajib mencegah kesalahan massal, validasi ulang server mencegah manipulasi hasil lewat DevTools, create-only mencegah data lama tertimpa diam-diam, dan transaksi atomik mencegah setengah batch tersimpan ketika satu baris gagal. Artikel dipaksa draft karena penerbitan massal tanpa tinjauan dapat menayangkan puluhan naskah salah sekaligus.
**Konsekuensi:** Admin perlu menerbitkan Artikel satu per satu setelah tinjauan. Mengubah data massal, mencocokkan ZIP gambar, dan overwrite berdasarkan slug ditunda sampai ada kebutuhan nyata serta rancangan resolusi konflik. Dependensi `exceljs` hanya dijalankan di server/admin; sebelum ExcelJS dipanggil, metadata ZIP dibatasi maksimal 100 entry, 10 MB per entry, dan 25 MB total ekstraksi. `npm test` memakai `node:test` dan menjadi bagian Definition of Done. Migrasi `202608040012_entri_massal_produk_artikel.sql` wajib diterapkan ke Supabase hosted sebelum tombol impor dapat menyimpan data; tanpa migrasi, pratinjau tetap berfungsi tetapi RPC penyimpanan gagal secara aman.

### KEP-051 — Rilis tidak membawa Data Contoh; donasi per transaksi; subsidi silang & listing Shopee varian diterima
**Tanggal:** 2026-08-04 · **Status:** Diterima
**Keputusan:** Seluruh runtime Data Contoh dihapus dari aplikasi dan Production wajib fail closed saat Supabase tidak tersedia. Donasi dihitung **20% dari laba bersih setiap transaksi**—harga jual dikurangi harga beli dan biaya langsung transaksi—kemudian dijumlah per periode. Monaco Royale dan Dreamscape 100 ml yang bermargin negatif dipertahankan sebagai subsidi silang untuk menarik trafik. Semua Produk tetap menuju satu listing Shopee bervarian untuk mengonsolidasikan rating; tautan TikTok Shop menunggu konfirmasi platform. Foto Decant 1/2/5 ml memakai foto yang sama dengan 10 ml. Visual AI diperbolehkan selama atribut barang tidak dipalsukan; bukti penyaluran donasi tetap asli.
**Alasan:** Data simulasi tidak lagi dibutuhkan setelah Supabase hosted terisi dan justru berisiko menampilkan angka/produk palsu ketika konfigurasi atau koneksi gagal. Istilah “laba bersih” sebelumnya ambigu terhadap laba perusahaan; unit per transaksi sesuai praktik nyata donasi Rp6.000 dan tetap auditable bila biaya langsung serta metode pembulatannya dicatat. Kerugian dua SKU dan URL Shopee generik adalah strategi komersial sadar, bukan kesalahan data. Foto yang sama sesuai kenyataan bahwa empat ukuran berbagi visual Decant yang tersedia.
**Konsekuensi:** Development tanpa Supabase menampilkan keadaan kosong, bukan fixture runtime. Fixture hanya boleh berada di `tests/`. Migrasi pembersihan wajib menargetkan baris secara sempit dan berpenjaga `row_count`—rekap donasi tepat satu baris, penghapusan uji paling banyak satu baris, afiliasi uji diikat ke Auth user, dan ban memakai timestamp berhingga—agar pembersihan tidak pernah dapat menyentuh data nyata yang kebetulan berangka atau beralias sama. Transaksi Royal Ispahan Rp280.000 − Rp249.000 menghasilkan margin Rp31.000; basis laporan dibulatkan konservatif Rp30.000 sehingga 20% = Rp6.000 dan metode ini dicatat pada rekap. Keputusan subsidi silang wajib ditinjau jika volume penjualan membuat kerugian tidak tertutup laba produk lain. Akun/data uji dibersihkan dan aksesnya dicabut tanpa merusak referensi Log Audit.

### KEP-052 — Temukan Wangimu memakai profil rekomendasi baku per keluarga aroma
**Tanggal:** 2026-08-05 · **Status:** Diterima
**Keputusan:** Tag rekomendasi tidak lagi diturunkan dari teks bebas Produk. Satu baris `profil_rekomendasi` menyimpan kode, nama, dan tag baku untuk aroma, kesan, intensitas, waktu/cuaca, serta kegiatan. Varian 15/50/100 ml menunjuk ke profil yang sama melalui `profil_rekomendasi_id`. Admin mengelola profil melalui pilihan baku; entri massal hanya boleh merujuk kode profil aktif yang sudah tersedia.
**Alasan:** Data hosted memakai campuran istilah Indonesia–Inggris dan frasa panjang, sedangkan algoritma lama menuntut kecocokan persis. Akibatnya sebagian kombinasi kosong dan satu aroma berulang sebagai beberapa ukuran. Profil terpisah menjaga klasifikasi konsisten tanpa mengubah teks deskriptif Produk.
**Konsekuensi:** Profil memiliki RLS baca publik untuk baris aktif dan mutasi khusus Admin. Produk tanpa profil tidak ikut peringkat. Lima profil awal dibentuk dari deskripsi hosted; perubahan tag tercatat di Log Audit. Migrasi `202608050014_profil_rekomendasi_temukan_wangimu.sql` wajib diterapkan sebelum kode publik digabungkan ke Production.

### KEP-053 — Kuis lima tahap memberi hasil per aroma dan memisahkan Decant
**Tanggal:** 2026-08-05 · **Status:** Diterima
**Keputusan:** Kuis memakai lima jawaban tunggal: keluarga aroma, kesan, intensitas, waktu/cuaca, dan kegiatan. Bobotnya berturut-turut 5, 4, 1, 2, dan 3. Hasil selalu mengambil maksimal tiga keluarga aroma terdekat, menampilkan ukuran aktif/tersedia di dalam satu kartu, serta memakai label kualitatif tanpa persentase. Decant multi-aroma tidak ikut peringkat dan ditawarkan melalui CTA terpisah. URL lama tiga pertanyaan dipetakan ke kontrak baru.
**Alasan:** Pengunjung mencari karakter wanginya lebih dulu, bukan SKU ukuran. Lima tahap memberi konteks tambahan dengan bahasa awam, sedangkan hasil per keluarga menghilangkan duplikasi. Decant yang menggabungkan lima varian tidak dapat dinilai sebagai satu formula tanpa menyesatkan.
**Konsekuensi:** Seluruh 1.125 kombinasi pilihan wajib menghasilkan satu sampai tiga keluarga unik selama profil aktif tersedia. Tidak ada jawaban yang ditulis ke Supabase. Bila data gagal dibaca, halaman fail closed. Tag intensitas adalah klasifikasi pengalaman aroma, bukan janji ketahanan atau proyeksi.

### KEP-054 — Teks publik komersial dipisahkan dari data internal dan kanal mendatang
**Tanggal:** 2026-08-05 · **Status:** Diterima
**Keputusan:** Halaman publik memakai bahasa pengunjung tanpa label sumber data, catatan milestone, istilah database, atau keterangan penyimpanan. Detail Produk hanya menampilkan notes Atas, Tengah, dan Dasar; `karakter` serta `cocok_untuk` tetap menjadi data internal untuk pengelolaan dan Temukan Wangimu. Footer menampilkan nama kanal dengan ikon kecil. TikTok Shop disimpan sebagai `null` dan tampil redup tanpa tautan, fokus keyboard, atau aksi klik sampai URL resmi tersedia.
**Alasan:** Catatan implementasi mengganggu tampilan komersial dan membingungkan pengunjung, sedangkan karakter serta kecocokan masih dibutuhkan untuk rekomendasi. Kanal yang belum siap perlu dapat dikenali tanpa memberi kesan bahwa tautannya sudah berfungsi.
**Konsekuensi:** Kewajiban caption publik foto 15 ml pada KEP-047 digantikan oleh keputusan ini; pemetaan foto 50 ml ke Produk 15 ml tetap dipertahankan sampai aset khusus tersedia. Data Produk, field Admin, entri massal, relasi rekomendasi, dan database tidak berubah. Penambahan URL TikTok Shop memerlukan perubahan konfigurasi kanal resmi, bukan migrasi.

### KEP-055 — Detail Produk memakai CTA ganda dan nilai Decant faktual
**Tanggal:** 2026-08-05 · **Status:** Diterima
**Keputusan:** Detail Produk menempatkan CTA marketplace pertama setelah harga serta ringkasan dan CTA kedua setelah profil aroma serta pesan misi. WhatsApp menjadi CTA sekunder dengan pesan otomatis nama dan ukuran Produk. Kartu dan Detail Produk Decant menampilkan harga per ml yang dihitung dari harga aktif dibagi ukuran serta label nilai faktual; tidak ada harga coret atau diskon semu.
**Alasan:** CTA ganda menjaga tombol pembelian cepat terlihat ketika deskripsi panjang tanpa memakai sticky bar yang mengganggu estetika. Harga per ml membantu membandingkan ukuran Decant secara jujur, sedangkan harga coret buatan akan bertentangan dengan kewajiban informasi harga yang benar dan positioning transparansi brand.
**Konsekuensi:** Tidak ada perubahan database atau checkout internal. Harga pembanding hanya boleh ditambahkan kelak untuk promo nyata dengan harga normal, periode, serta sinkronisasi marketplace yang dapat dibuktikan. Semua hitungan nilai per ml memakai kode deterministik, bukan teks Admin atau AI.

### KEP-056 — Paket optimasi ringan memakai aset Decant faktual dan jalur Artikel
**Tanggal:** 2026-08-08 · **Status:** Diterima
**Keputusan:** Semua Produk Decant memakai satu visual katalog WebP lokal yang memuat enam varian aktif dan ukuran 1/2/5/10 ml. Detail Decant merangkum keenam varian tanpa selector checkout. Setiap Artikel memberi jalur ke Temukan Wangimu dan jalur kedua ke Decant 5 ml untuk kategori edukasi atau Katalog untuk kategori lain.
**Alasan:** Empat Produk Decant hosted sudah menunjuk satu PNG 2,20 MB yang sama, tetapi visualnya memuat atribut ukuran vial yang tidak sesuai. Visual katalog deterministik 46 KB mengurangi sumber sebesar 97,9% tanpa mengarang bentuk barang. Internal link kontekstual menghubungkan trafik Artikel ke kuis dan Produk tanpa menyunting konten hosted atau menjejalkan tautan ke paragraf.
**Konsekuensi:** Database dan objek Storage tidak diubah; foto non-Decant tetap memakai data hosted. Nama serta karakter ringkas varian harus mengikuti data Produk production. Transaksi dan pilihan varian tetap diselesaikan di listing Shopee.

### KEP-057 — Produk memakai galeri empat foto dan identitas visual terbaru
**Tanggal:** 2026-08-08 · **Status:** Diterima
**Keputusan:** Setiap Produk dapat memiliki maksimal empat foto. Detail Produk memakai galeri `object-contain`, thumbnail horizontal, tombol sebelumnya/berikutnya, dan status posisi accessible tanpa autoplay atau dependency carousel. Foto pertama menjadi gambar utama kartu/SEO. Admin dapat menambah foto, menghapus, dan menjadikan foto utama. Identitas terbaru WAWANGIAN PELAJAR — FRAGRANCE HOME dipakai sebagai monogram header, logo penuh footer, favicon, dan Open Graph.
**Alasan:** `object-cover` memotong botol/kemasan dan terasa seperti zoom, sedangkan galeri empat foto cukup untuk memperlihatkan Produk tanpa membuat halaman ramai. Logo penuh tidak terbaca pada header 70 px, sehingga header memakai monogram terbaru dengan nama brand teks, sementara footer menampilkan lockup lengkap.
**Konsekuensi:** Schema `foto text[]` yang sudah ada dipakai tanpa migrasi. Upload dibatasi empat foto dan 5 MB per foto. Kegagalan upload membersihkan berkas baru serta mempertahankan foto lama; URL tersembunyi wajib berasal dari Produk yang sedang diedit. Objek Storage yang dilepas hanya dihapus bila tidak dipakai Produk lain. Visual Decant lokal menjadi fallback saat tidak ada foto Admin, bukan override permanen.

### KEP-058 — Lima SKU Mykonos baru dan koreksi harga memakai sumber resmi
**Tanggal:** 2026-08-09 · **Status:** Diterima
**Keputusan:** Tambahkan Invade 50 ml, Reflection 50 ml, Reflection Elixir 50 ml, Conquer 100 ml, dan Penthouse 50 ml sebagai Produk Ori dengan foto kosong. Nama Conquer mengikuti nama resmi Mykonos, bukan sebutan Conqueror. Harga pemilik diterapkan persis pada lima Produk lama. Notes, BPOM, ringkasan, dan profil Temukan Wangimu diturunkan konservatif dari `officialmykonos.com`; Invade memakai kanal resmi regional `mykonos.com.my` karena halaman Indonesia tidak tersedia.
**Alasan:** Katalog perlu mengikuti SKU dan harga nyata pemilik tanpa mengarang aroma atau klaim performa. Produk aktif perlu memiliki profil rekomendasi agar tidak hilang dari Temukan Wangimu. Foto sengaja kosong sampai aset yang sesuai tersedia.
**Konsekuensi:** Migrasi `202608090015_tambah_lima_produk_dan_harga.sql` bersifat idempotent dan menjaga tepat lima Produk baru serta lima harga target. Katalog menjadi 27 Produk aktif setelah migrasi diterapkan. Tautan Shopee memakai listing bersama Produk Ori yang sudah ada; foto dapat ditambahkan kemudian lewat Admin.

### KEP-059 — Homepage memakai visual kiriman pemilik
**Tanggal:** 2026-08-09 · **Status:** Diterima
**Keputusan:** Hero homepage memakai visual koleksi parfum kiriman pemilik. Tiga kartu Prinsip Kami memakai visual dokumen terverifikasi, pendidikan, dan harga terverifikasi sesuai makna masing-masing. Semua aset dikompres menjadi WebP, memakai `object-contain`, alt deskriptif, dan tidak menggantikan foto SKU.
**Alasan:** Visual baru memperkuat identitas navy–teal–emas serta menjelaskan prinsip secara lebih cepat daripada simbol teks kecil. Visual koleksi bersifat promosi umum, bukan bukti stok atau representasi presisi setiap Produk.
**Konsekuensi:** Hero tidak lagi bergantung pada Produk unggulan pertama. Gambar koleksi tidak boleh dipakai sebagai foto Produk atau bukti barang. Empat aset sumber disalin dari cache unggahan ke repository agar permanen.

### KEP-060 — Identitas gelap terbaru menggantikan seluruh turunan logo web
**Tanggal:** 2026-08-09 · **Status:** Diterima
**Keputusan:** Artwork gelap WP dengan wordmark WAWANGIAN PELAJAR dan tagline FRAGRANCE HOME menjadi identitas terbaru. Satu sumber raster diturunkan menjadi monogram header, logo penuh footer, ikon persegi, dan OG 1200×630; nama file lama dipertahankan agar seluruh permukaan berubah konsisten.
**Alasan:** Pemilik memilih desain ini sebagai logo terbaru. Crop terpisah diperlukan karena satu komposisi 3:2 tidak cocok langsung untuk header, favicon, footer, dan OG.
**Konsekuensi:** Monogram header tidak memuat wordmark; footer mempertahankan logo lengkap; icon memakai monogram dalam safe area; OG memakai contain tanpa crop. Wordmark gelap berkontras rendah adalah keterbatasan sumber yang diterima sementara; master vektor/transparan tetap menjadi upgrade bila tersedia.

### KEP-061 — Seluruh permukaan memakai PNG asli tanpa pengolahan visual
**Tanggal:** 2026-08-09 · **Status:** Diterima; menggantikan cara implementasi KEP-060
**Keputusan:** File PNG kiriman pemilik dipasang byte-for-byte sebagai satu master `logo-wawangian-pelajar-resmi.png`. Header, login/Admin/Afiliasi, footer, metadata icon, schema Artikel, fallback OG Artikel, serta OG situs menunjuk file yang sama dengan `object-contain`. Tidak ada crop, sharpen, resize aset, recolor, compositing, atau turunan visual.
**Alasan:** Pengolahan crop/sharpen sebelumnya mengubah tampilan logo dan dinilai pemilik menjadi jelek. Kesetiaan pada artwork asli lebih penting daripada optimasi bentuk per konteks.
**Konsekuensi:** SHA-256 master dikunci lewat test ke `06bc362ff15041486c74a1bb9a97c2a4956b4535353dc4cdb18ff863b52ce08b`. Pada area kecil, seluruh komposisi 3:2 akan tampak kecil; itu diterima agar artwork tidak diubah.

### KEP-062 — Decant 3 ml menjadi pilihan paling direkomendasikan
**Tanggal:** 2026-08-10 · **Status:** Diterima
**Keputusan:** Tambahkan Decant Mykonos Original 3 ml seharga Rp45.000. Produk memakai profil enam varian yang sama dengan Decant lain dan menyalin galeri Decant 10 ml. Ringkasan memosisikan 3 ml sebagai “Paling Direkomendasikan” tanpa harga coret atau klaim jumlah semprotan.
**Alasan:** Ukuran 3 ml menyeimbangkan komitmen harga dan kecukupan pemakaian bagi pembeli yang masih mengeksplorasi aroma. Pemakaian galeri yang sama mengikuti instruksi pemilik dan menjaga konsistensi lini Decant.
**Konsekuensi:** Katalog hosted menjadi 28 Produk aktif dan lima Decant. Produk 1/2/5/10 ml tidak dihapus dalam task ini. Perubahan ukuran Decant lain dan sinkronisasi listing marketplace dikerjakan terpisah bila diputuskan pemilik. BUILD_SPEC naik ke 4.0.

### KEP-063 — Simpan Admin kembali ke daftar setelah sukses
**Tanggal:** 2026-08-10 · **Status:** Diterima
**Keputusan:** Setelah Produk berhasil dibuat atau diperbarui, Admin diarahkan ke `/admin/produk`. Setelah Artikel berhasil dibuat atau diperbarui, Admin diarahkan ke `/admin/konten`. Pesan sukses tetap dibawa melalui query `pesan`.
**Alasan:** Setelah penyimpanan selesai, pekerjaan berikutnya umumnya memeriksa atau mengelola daftar, bukan tetap berada di form edit yang sama.
**Konsekuensi:** Redirect hanya berubah pada penyimpanan yang sepenuhnya sukses. Validasi gagal, upload foto gagal, atau pembaruan galeri gagal tetap kembali ke form terkait agar pesan dan konteks perbaikan tidak hilang.

---

*DECISIONS.md — tambahkan KEP-XXX baru setiap ada keputusan. Jangan hapus yang lama.*
