# STATUS.md — Posisi Terkini Pengerjaan

> Dokumen ini selalu mencerminkan kondisi terkini. Riwayat lengkap perubahan tersedia di `CHANGELOG.md`.

**Terakhir diperbarui:** 5 Agustus 2026
**Milestone aktif:** M6 — Poles & Rilis
**Status milestone aktif:** identitas logo gelap terbaru sudah aktif di production; konteks header/footer sudah disesuaikan.

## Identitas logo gelap terbaru — keadaan terbaru

- Artwork 1536×1024 diturunkan menjadi monogram header 1090×665, logo penuh footer 1456×885, icon 512×512, dan OG 1200×630.
- Turunan mempertahankan semua bentuk tanpa crop; icon/OG memakai safe area dan latar gelap.
- Nama aset lama dipertahankan sehingga header, login/Admin/Afiliasi, footer, metadata, favicon, dan schema Artikel berubah serempak.
- Wordmark navy berkontras rendah pada artwork gelap adalah keterbatasan sumber yang diterima sementara; master vektor/transparan tetap upgrade berikutnya.

**Verifikasi akhir:** `npm test` 58/58, TypeScript, lint, build produksi, `git diff --check`, QA turunan, Vercel production, dan QA header nyata lulus. Monogram dibuat lebih ketat/tajam dan tampil 48 px; footer tampil 320 px tanpa latar putih. Efek glow tetap lebih lembut daripada logo flat—master vector/flat diperlukan bila pemilik menghendaki ketajaman favicon/header maksimal.

## Visual homepage kiriman pemilik — keadaan terbaru

- Hero memakai visual koleksi parfum WebP 196 KB dengan `object-contain`; visual ini promosi umum, bukan foto SKU atau bukti stok.
- Prinsip Kami memakai tiga visual WebP: dokumen terverifikasi 19 KB, pendidikan 14 KB, dan harga terverifikasi 25 KB.
- Semua visual memiliki alt deskriptif, rasio konsisten, dan tersimpan permanen di `public/`.
- BUILD_SPEC naik ke 3.7 dan KEP-059 mengunci pemakaian visual.

**Verifikasi akhir:** `npm test` 58/58, TypeScript, lint, build produksi, `git diff --check`, Vercel production, QA desktop, dan QA mobile 390 px lulus. Panel misi dipindahkan ke bawah foto agar tidak menutupi koleksi.

## Lima SKU Mykonos dan koreksi harga — keadaan terbaru

- Lima Produk Ori baru disiapkan dengan foto kosong: Invade 50 ml Rp319.000, Reflection 50 ml Rp319.000, Reflection Elixir 50 ml Rp319.000, Conquer 100 ml Rp548.000, dan Penthouse 50 ml Rp319.000.
- Nama `Conquer` mengikuti katalog resmi Mykonos; `Conqueror` tidak dipakai karena bukan nama SKU resmi.
- Lima harga lama disiapkan: Glitch 100 ml, Monaco Royale 100 ml, dan Dreamscape 100 ml menjadi Rp548.000; Glitch 50 ml Rp319.000; Dreamscape 50 ml Rp298.000.
- Notes/BPOM berasal dari `officialmykonos.com`; Invade memakai `mykonos.com.my/product/invade`. Tidak ada klaim performa yang ditambahkan.
- Lima profil Temukan Wangimu baru disiapkan agar SKU aktif ikut rekomendasi. Migrasi idempotent `202608090015` memiliki penjaga tepat lima Produk dan lima harga.
- Supabase CLI sudah login/link ke project `jttepaxwjmmopflpgbac`. Histori 13 migrasi hosted lama direkonsiliasi sebagai applied; migrasi cleanup `0013` dan Produk/harga `0015` diterapkan lewat `db push --include-all`.

**Verifikasi akhir:** `npm test` 56/56, TypeScript, lint, build produksi, dan `git diff --check` lulus. Migration history lokal/remote 15/15 sejajar dan dry-run menyatakan database up to date. REST production membuktikan 27 Produk aktif, lima Produk baru tanpa foto, lima harga target benar, dan lima profil rekomendasi terpasang.

## Galeri Produk dan identitas visual — keadaan terbaru

- Detail Produk mendukung maksimal empat foto dengan `object-contain`, thumbnail horizontal, tombol sebelumnya/berikutnya, dan status posisi accessible tanpa autoplay atau library carousel.
- Kartu Katalog/Temukan juga memakai `object-contain`, sehingga botol dan kemasan terlihat utuh tanpa crop/zoom agresif.
- Admin dapat menambah beberapa foto, menghapus, dan menjadikan foto utama. Upload dibatasi empat total serta 5 MB per foto; rollback membersihkan berkas baru bila gagal dan foto lama tetap aman.
- URL foto dari hidden input hanya diterima bila sudah dimiliki Produk. Objek Storage hanya dihapus jika tidak dipakai Produk lain.
- Visual Decant lokal menjadi fallback ketika galeri hosted kosong; foto Admin mengalahkan fallback.
- Logo terbaru diturunkan langsung dari aset pemilik: monogram untuk header/login, lockup penuh untuk footer, ikon 512, dan OG 1200×630. QA visual lulus; header tidak memakai lockup penuh karena tagline tidak terbaca pada tinggi 70 px.
- Tidak ada migrasi database karena `foto text[]` sudah mendukung banyak foto. BUILD_SPEC naik ke 3.5 dan KEP-057 mengunci perilaku.

**Verifikasi akhir:** `npm test` 52/52, TypeScript, lint, build produksi, dan `git diff --check` lulus. Render lokal membuktikan Produk satu-foto tampil utuh tanpa kontrol panah kosong, kartu/detail bebas crop, serta logo terbaru tampil pada header, footer, login, favicon, dan metadata. Seluruh turunan logo lulus QA visual.

## Paket 2 optimasi ringan — keadaan terbaru

- Empat Produk Decant hosted sudah menunjuk satu URL PNG 2,20 MB yang sama. Antarmuka kini mengoverride semuanya ke satu visual katalog WebP lokal 46 KB (hemat 97,9%); database dan Storage tidak diubah.
- Visual katalog deterministik menampilkan enam varian production—California Blue, California Signature, Dreamscape, Glitch, Monaco Royale, dan Royal Ispahan—serta ukuran 1/2/5/10 ml tanpa menggambarkan botol atau volume palsu.
- Detail Decant merangkum keenam varian dan menjelaskan bahwa pilihan dilakukan di Shopee, tanpa selector checkout.
- Semua Artikel mendapat internal link ke Temukan Wangimu; Artikel edukasi juga menuju Decant 5 ml, sedangkan kategori lain menuju Katalog.
- BUILD_SPEC naik ke 3.4 dan keputusan dicatat sebagai KEP-056.

**Verifikasi akhir:** `npm test` 45/45, TypeScript, lint, build produksi, dan `git diff --check` lulus. Render lokal membuktikan WebP/ringkasan enam varian hanya berlaku pada Decant, foto Ori tetap dari hosted, dan jalur Artikel sesuai kategori.

## Optimasi konversi Detail Produk — keadaan terbaru

- CTA marketplace pertama berada setelah harga dan ringkasan agar pembeli cepat tidak perlu melewati deskripsi panjang; CTA kedua tetap setelah profil aroma serta pesan misi.
- WhatsApp menjadi CTA sekunder dengan pesan otomatis nama serta ukuran Produk. Checkout tetap hanya di marketplace.
- Kartu dan Detail Produk Decant menampilkan harga per ml yang dihitung deterministik dan label nilai faktual; tidak ada harga coret atau diskon semu.
- Tidak ada perubahan database, harga aktif, tautan marketplace, atau data Produk. BUILD_SPEC naik ke 3.3 dan keputusan dicatat sebagai KEP-055.

**Verifikasi akhir:** `npm test` 40/40, TypeScript, lint, build produksi, dan `git diff --check` lulus. Render lokal membuktikan nilai per ml hanya muncul pada Decant, WhatsApp/Tentang Produk tampil pada Decant maupun Ori, dan tidak ada harga coret.

## Pemolesan teks komersial — keadaan terbaru

- Branch aktif `codex/m6-poles-teks-komersial` memisahkan bahasa publik dari catatan teknis tanpa mengubah data hosted, migrasi, tautan marketplace individual, atau algoritma rekomendasi.
- Footer menampilkan Shopee, Instagram, Facebook, Email, dan WhatsApp sebagai tautan berikon dengan label ringkas. TikTok Shop tetap terlihat redup sebagai kanal mendatang, tetapi bukan tautan dan tidak dapat difokuskan atau diklik.
- Detail seluruh 19 Produk hanya menampilkan Aroma Atas, Tengah, dan Dasar. Data Karakter serta Cocok untuk tetap tersimpan untuk Admin, entri massal, dan Temukan Wangimu.
- Teks halaman publik Beranda, Katalog, Produk, Temukan, Dana Cahaya, Cerita, Artikel, dan Afiliasi sudah memakai bahasa pengunjung serta tidak menampilkan catatan milestone, database, Admin, placeholder, atau sumber data.
- BUILD_SPEC naik ke 3.2. KEP-054 menggantikan kewajiban caption publik KEP-047, tetapi pemetaan foto 50 ml ke SKU 15 ml tetap dipertahankan sebagai data internal.

**Validasi sesi:** 34 pengujian lulus; lint, TypeScript, dan build produksi lulus. Seluruh 19 halaman Produk serta rute publik utama diperiksa pada pratinjau lokal tanpa overflow, chip internal, atau caption teknis. Server lokal tetap berjalan pada port 3000 untuk peninjauan pemilik.

## Revisi Temukan Wangimu — keadaan terbaru

- Revisi sebelumnya menambahkan profil rekomendasi baku, kuis lima tahap, hasil per keluarga aroma, pilihan ukuran, CTA Decant, dan kanal resmi pada footer.
- Migrasi `202608050014_profil_rekomendasi_temukan_wangimu.sql` telah diterapkan pada Supabase hosted. Verifikasi akhir mencatat 19 Produk tetap utuh, lima profil tersedia, 15 SKU tertaut, dan empat Decant tidak tertaut.
- Form Admin Produk dapat memilih profil, sedangkan `/admin/profil-rekomendasi` mengelola lima kelompok tag baku. Workbook menerima `kode_profil_rekomendasi` opsional dan menolak kode tidak aktif/tidak dikenal.
- Seluruh 1.125 kombinasi jawaban menghasilkan tiga keluarga unik pada fixture pengujian; ukuran dikelompokkan dan Decant tidak pernah masuk peringkat.
- Footer global menautkan Facebook, Instagram, toko Shopee, email, dan WhatsApp resmi. TikTok Shop tampil nonaktif sampai URL resmi tersedia.
- Jawaban kuis hanya berada pada state/URL dan tidak ditulis ke Supabase. Runtime Data Contoh tetap tidak tersedia.

**Validasi akhir:** `npm test` 32/32, lint, TypeScript, dan build produksi lulus. Alur hasil baru, URL lama, kanal resmi, serta tampilan 360px/1440px telah diperiksa melalui server lokal tanpa galat aplikasi.

## Fondasi rilis sebelumnya

- Entri massal Produk & Artikel sudah merged, migrasi RPC sudah diterapkan, dan alur Production berhasil mengimpor 1 Produk + 1 Artikel secara atomik. Artikel dipaksa draft; Log Audit batch tercatat.
- Seluruh runtime **Data Contoh dihapus**. Produk, Artikel, donasi, bonus, dan leaderboard simulasi tidak lagi dapat tampil. Jika Supabase gagal, halaman publik fail closed dengan keadaan kosong/galat—bukan data buatan.
- Next.js dinaikkan 16.2.10 → 16.3.0. Audit turun dari 4 high + 2 moderate menjadi **0 high + 2 moderate**; dua moderate berasal dari UUID transitif ExcelJS yang tidak dipanggil fitur.
- `/katalog` dan `/donasi` memakai ISR 5 menit; data publik memakai klien anon stateless tanpa cookie. Detail Produk/Donasi tetap dinamis per slug/ID dan `/temukan` dinamis karena query kuis.
- Halaman Produk memasang JSON-LD `Product` + `Offer` dengan harga, IDR, ketersediaan, foto, dan seller Wawangian Pelajar.
- Definisi donasi dikunci: **20% dari laba bersih setiap transaksi** (harga jual − harga beli − biaya langsung transaksi), dijumlah per periode. Transaksi Royal Ispahan: Rp280.000 − Rp249.000 = Rp31.000; basis laporan dibulatkan konservatif Rp30.000 sehingga donasi Rp6.000.
- Monaco Royale dan Dreamscape 100 ml yang rugi dipertahankan sebagai **subsidi silang/produk pemancing trafik** atas keputusan pemilik; bukan salah data harga.
- Satu URL Shopee dipertahankan karena semua produk berada dalam satu listing bervarian untuk mengonsolidasikan rating. TikTok Shop tetap kosong karena menunggu konfirmasi TikTok.
- Visual AI boleh digunakan selama tidak memalsukan atribut barang; bukti penyaluran donasi tetap harus asli.
- Migrasi `202608040013_pembersihan_data_uji_dan_foto_decant.sql` akan: menyalin foto 10 ml ke Decant 1/2/5 ml, menghapus Produk uji dan `AfiliasiUji`, mencabut hak Admin uji2/uji3, memban akun uji, memutus sesi, serta memperjelas metode donasi Rp6.000.

**Verifikasi fondasi sebelumnya:** `npm test` 21/21, TypeScript, lint, dan build Next 16.3.0 lulus. Event Umami `klik-beli` menunggu uji akhir setelah deploy agar tidak mencemari analitik.

---

## Posisi saat ini

Instruksi pemilik pada 1 Agustus 2026 untuk mengerjakan rangkaian revisi SEO diperlakukan sebagai konfirmasi eksplisit memulai M6. Task fondasi dikerjakan dalam urutan `7 → 8 → 9 → 1 → 2`, dilanjutkan Task 3–18, dan setiap task memiliki commit terpisah sesuai rencana.

Fondasi SEO Artikel kini mencakup kolom database khusus, editor Markdown aman, panel metadata Admin, alt text, ISR lima menit, canonical, Open Graph, Twitter Card, sitemap, robots, optimasi gambar Supabase, serta JSON-LD `Article` dan `BreadcrumbList`. Artikel lama tetap memiliki fallback dari `bagian` dan artikel baru menyimpan Markdown mentah tanpa mengeksekusi HTML.

Metadata beranda, Open Graph, dan Twitter Card menargetkan frasa “Decant Parfum Original untuk Mahasiswa” dengan deskripsi pilihan **mulai 1 ml** serta misi 20% laba bersih setiap transaksi untuk pendidikan. Klaim ukuran kini cocok dengan katalog hosted yang memiliki Decant 1 ml.

M5 telah selesai sebagai landasan. Portal Afiliasi menyediakan landing publik, pendaftaran Supabase Auth, login, dashboard, panduan resmi, materi promosi privat, leaderboard beralias, dan pengelolaan Admin.
M4 telah dikonfirmasi pemilik dan hasil teknis M5 beserta penyempurnaan formulir Produk, identitas visual, serta katalog awal sudah digabungkan ke `main`. Dokumentasi dua akun Admin uji tambahan dikerjakan pada branch `codex/m5-admin-uji-tambahan`. Portal Afiliasi kini menyediakan landing publik, pendaftaran Supabase Auth, login, dashboard, panduan resmi, materi promosi privat, leaderboard beralias, dan pengelolaan Admin.

Schema M5 telah diterapkan pada Supabase hosted. Database memisahkan profil Afiliasi, tingkat bonus, laporan platform, hasil rekonsiliasi bonus, dan materi promosi; RLS membatasi setiap afiliasi pada profil serta bonus miliknya dan menjaga laporan/payout untuk Admin.

Akun Afiliasi teknis `AfiliasiUji` dan dua akun Admin uji dibersihkan oleh migrasi `202608040013`: profil afiliasi dihapus, hak `pengguna_admin` dicabut, Auth user diban permanen, sesi serta refresh token diputus. Record Auth sengaja tidak dihapus agar referensi Log Audit tetap utuh.

Kuis `/temukan` bekerja pada Produk hosted. Jawaban dikirim sebagai parameter GET sehingga pemilihan, hasil, muat ulang, dan pengulangan tetap berfungsi tanpa bergantung penuh pada hidrasi JavaScript. Route ini dinamis karena bergantung query.

Mode Data Contoh **tidak lagi ada di runtime**. Sakelar `MODE_PRATINJAU_DATA_CONTOH`, dataset simulasi Produk/Artikel/donasi/afiliasi, dan komponen labelnya sudah dihapus dari kode. Fixture hanya boleh berada di `tests/`. Bila Supabase tidak tersedia, halaman publik fail closed dengan keadaan kosong atau galat, bukan data buatan.

Peninjauan panel Produk menemukan bahwa penyimpanan tanpa foto sebenarnya berhasil, tetapi tidak memiliki indikator proses sehingga tampak gagal selama respons Vercel berlangsung. Batas unggahan Server Action juga masih 1 MB meskipun formulir menyatakan maksimal 5 MB. Perbaikan berada pada branch `codex/m5-perbaiki-formulir-produk`: batas muatan menjadi 6 MB untuk menampung foto 5 MB beserta data formulir, validasi file dijalankan sebelum mutasi, tombol mencegah kirim ganda, dan pesan galat dibuat lebih jelas.

Identitas visual resmi telah menggantikan ikon sementara. Revisi simbol logo dari pemilik kini memenuhi kanvas lebih besar agar terbaca jelas pada navbar, footer, halaman autentikasi, dan favicon; nama aset baru mencegah cache browser atau Vercel mempertahankan logo lama. Palet website tetap mengikuti color guide Warm Cream, Off-White, Deep Navy, Premium Teal, Muted Gold, dan Charcoal. Placeholder Produk `krem` ditambahkan melalui migrasi terpisah agar tetap konsisten dengan sistem warna.

Katalog Supabase hosted kini memuat 19 Produk aktif. Lima aroma Mykonos masing-masing tersedia pada ukuran 100 ml, 50 ml, dan 15 ml dengan harga Rp539.000, Rp289.000, serta Rp119.000. Empat Produk Decant “Pilih Varian” tersedia pada ukuran 1 ml seharga Rp19.000, 2 ml seharga Rp34.000, 5 ml seharga Rp69.000, dan 10 ml seharga Rp129.000. Keempatnya memakai tautan Shopee sumber yang sama, tidak memiliki tautan TikTok Shop, dan tetap memakai placeholder sampai foto decant tersedia. Monaco 100 ml mempertahankan satu foto yang sudah tersimpan.

Profil Monaco Royale sebelumnya tidak sesuai sumber terbaru karena masih memuat Hazelnut, Salted Caramel, Heliotrope, Toffee, Vanilla, Amberwood, dan Tonka Bean. Ketiga ukuran Monaco kini memakai Pear, Melon, Green Notes; Soft Wood, Cedarwood; serta Moss, Caramel, Musk. Ringkasan, deskripsi, karakter, dan kecocokannya ikut diselaraskan agar tidak bertentangan dengan notes resmi serta nomor BPOM full bottle sumber.

Pemilik merevisi kebijakan visual pada 31 Juli 2026: foto asli tetap diutamakan, tetapi gambar hasil AI atau penyempurnaan AI kini boleh dipakai untuk menambah dan mempercantik visual Produk. Gambar yang bukan foto Produk nyata wajib ditandai “Visual ilustrasi” dan tidak boleh memalsukan atribut Produk atau dipakai sebagai bukti faktual. Belum ada gambar baru yang diunggah sebagai bagian dari perubahan kebijakan ini.

Detail Produk kini mengikuti kemampuan formulir Admin: setiap Produk hanya menampilkan satu foto utama. Thumbnail placeholder “Tampak depan”, “Detail botol”, dan “Kemasan” dihapus, sedangkan unggahan baru menggantikan satu referensi foto utama lama tanpa menghapus berkas Storage secara otomatis.

Sepuluh foto terpilih untuk lima aroma Mykonos telah dicocokkan berdasarkan nama serta ukuran, dikonversi menjadi WebP sekitar 29–68 KB, dan dipetakan ke 15 Produk. Produk 100 ml memakai foto 100 ml; Produk 50 ml dan 15 ml memakai satu URL foto 50 ml yang sama sesuai instruksi pemilik. Berkas bernama “WP”, video, dan aset yang tidak mempunyai pasangan Produk tidak digunakan. Detail 15 ml menampilkan keterangan bahwa fotonya merupakan referensi kemasan 50 ml. Foto Decant 10 ml yang diunggah manual oleh pemilik dipertahankan; Decant 1 ml, 2 ml, dan 5 ml masih memakai placeholder.

Dua akun Admin teknis tambahan, `admin.uji2@example.com` dan `admin.uji3@example.com`, telah dibuat dalam keadaan terkonfirmasi dan diaktifkan pada satu peran Admin yang sama. Keduanya hanya untuk pengujian akses selama peninjauan MVP, bukan peran organisasi baru atau Admin bertingkat. Login keduanya pada custom domain Production telah berhasil; kata sandi sementara hanya disampaikan kepada pemilik dan tidak disimpan dalam repository maupun dokumentasi. Akun wajib dihapus atau kata sandinya diganti sebelum rilis publik M6.

## Task M5 — selesai

1. ✅ Landing “Jadi Afiliasi” — menjelaskan native marketplace dan memisahkan komisi platform dari bonus kami.
2. ✅ Pendaftaran — email, WhatsApp, alias, persetujuan aturan, serta minimal satu handle TikTok Shop/Shopee wajib.
3. ✅ Login dan Dashboard — status verifikasi, bonus per pcs, progres tingkat, riwayat, dan penegasan komisi dasar tetap di platform.
4. ✅ Panduan onboarding — langkah ringkas dengan tautan resmi TikTok Shop dan Shopee.
5. ✅ Materi promosi — teks/berkas privat dengan tautan unduh sementara dan rambu BR-8.
6. ✅ Leaderboard — agregasi pcs bulan berjalan dengan alias saja.
7. ✅ Admin — verifikasi/koreksi handle, konfigurasi tingkat nyata, unggah CSV, pencocokan, bonus per pcs, payout berbukti, dan materi.
8. ✅ Keamanan — RLS, bucket privat, validasi payout, dan Log Audit untuk aksi sensitif.
9. ✅ Penyempurnaan pratinjau — kuis `/temukan` berbasis URL, demo cepat, dan validasi Produk contoh tanpa data hosted.
10. ✅ Production MVP — sakelar Data Contoh berlaku konsisten pada lokal, Preview, dan Production dengan label simulasi.
11. ✅ Perbaikan regresi Produk — dukungan unggahan 5 MB, status penyimpanan, pencegahan kirim ganda, dan pesan galat berbahasa Indonesia.
12. ✅ Identitas visual resmi — logo, favicon, dan palet color guide diterapkan.
13. ✅ Katalog awal — lima Produk Mykonos nyata diunggah dan divalidasi pada Admin serta halaman publik.

## Task M6 — aktif

1. ✅ Variabel URL kanonis, dependensi Markdown, dan pengelolaan tanggal terbit.
2. ✅ ISR daftar/detail cerita, metadata global, aset Open Graph, sitemap, dan robots.
3. ✅ Migrasi kolom SEO hosted, tipe Artikel, serta pemetaan data publik.
4. ✅ Renderer Markdown aman dan fallback artikel lama.
5. ✅ Panel SEO Admin serta penyimpanan Markdown, metadata, fokus kata kunci, dan alt text.
6. ✅ Optimasi gambar artikel, metadata per artikel, canonical, Twitter Card, dan JSON-LD.
7. ✅ Dokumentasi KEP-037 sampai KEP-046, BUILD_SPEC v2.8, README, ROADMAP, STATUS, dan CHANGELOG.
8. ✅ Validasi akhir bersih, uji alur artikel lengkap, regresi artikel lama, pembersihan artikel teknis, dan preview lokal.
9. ✅ Katalog hosted berisi tepat 15 Produk Mykonos: lima aroma pada ukuran 100 ml, 50 ml, dan 15 ml.
10. ✅ Harga 15 Produk ditetapkan berdasarkan ukuran dan input harga Admin tidak lagi menampilkan stepper.
11. ✅ Empat Produk Decant Mykonos ditambahkan dan profil tiga ukuran Monaco Royale diselaraskan dengan sumber 3 Agustus 2026.
12. ✅ Sepuluh foto utama teroptimasi dipetakan ke 15 Produk Mykonos tanpa menimpa foto Decant milik pemilik.
13. ✅ Profil rekomendasi baku, relasi varian, Admin, dukungan entri massal, dan migrasi hosted selesai.
14. ✅ Kuis lima tahap, kompatibilitas URL lama, hasil keluarga aroma, pilihan ukuran, CTA Decant, dan tinjauan visual selesai.
15. ✅ Kanal resmi Facebook, Instagram, Shopee, email, dan WhatsApp dipasang pada footer global.
16. ✅ Pengujian otomatis bertambah menjadi 32 dan mencakup seluruh 1.125 kombinasi kuis.
17. ✅ Teks publik dipoles menjadi bahasa komersial, footer kanal resmi diringkas dengan ikon, dan Karakter/Cocok untuk dijaga sebagai data internal.

## Validasi yang sudah dilakukan

- Pengujian otomatis menjadi 34 dan mencakup penjaga teks publik serta perilaku TikTok Shop nonaktif.
- Seluruh 19 halaman Produk merespons dengan tiga lapisan notes, tombol Shopee, nol chip profil, nol caption teknis, dan tanpa overflow horizontal pada pemeriksaan desktop; sampel 15/50/100 ml serta Decant juga diperiksa pada 360px.
- Beranda, Katalog, Temukan, Dana Cahaya, Cerita, detail Artikel, dan Afiliasi publik diperiksa pada 360px dan 1440px tanpa istilah implementasi yang dilarang atau overflow horizontal.
- Footer memuat lima kanal aktif dengan URL yang benar dan atribut keamanan, sedangkan TikTok Shop tidak memiliki `href`, fokus keyboard, atau aksi klik.
- Kuis Temukan Wangimu tetap memakai 1.125 kombinasi dan pengelompokan keluarga aroma yang sama; perubahan sesi ini hanya menyentuh teks pengunjung.
- Migrasi `202608050014_profil_rekomendasi_temukan_wangimu.sql` berhasil diterapkan pada Supabase hosted dan menghasilkan tepat 19 Produk, lima profil rekomendasi, 15 SKU tertaut, serta empat Decant tanpa profil.
- RLS tabel profil aktif dengan empat kebijakan untuk baca profil aktif dan pengelolaan khusus Admin.
- Seluruh 1.125 kombinasi sah menghasilkan tiga keluarga aroma unik dan deterministik pada fixture; Decant serta ukuran ganda tidak pernah masuk peringkat.
- URL lima parameter membuka hasil lengkap, URL lama `karakter`/`waktu`/`okasi` tetap dipetakan, dan URL parsial membuka pertanyaan pertama yang belum terjawab.
- Hasil hosted menampilkan California Signature, California Blue, dan Monaco Royale sebagai tiga keluarga terdekat untuk skenario Segar/Akuatik; setiap keluarga memiliki pilihan 15/50/100 ml dan CTA Decant terpisah memuat 1/2/5/10 ml.
- Footer lokal memuat Facebook, Instagram, toko Shopee, `mailto:admin@wawangianpelajar.com`, dan `wa.me/6285176985756` tanpa placeholder TikTok/Shopee lama.
- Tampilan awal kuis pada 360px dan hasil tiga kolom pada 1440px tidak mengalami overflow horizontal atau galat konsol aplikasi.
- `npm.cmd test` 32/32, `npm.cmd run lint`, `npx.cmd tsc --noEmit --incremental false`, dan `npm.cmd run build` lulus setelah migrasi hosted.
- Migrasi `202608010007_m6_kolom_seo_artikel.sql` berhasil diterapkan pada Supabase hosted; lima kolom bertipe teks tersedia dan opsional.
- Login Admin lokal berhasil membuat artikel teknis, mempertahankan `tanggal_terbit` saat judul diubah, lalu mengosongkannya saat status kembali menjadi draf.
- Renderer Markdown menampilkan penekanan, tautan internal, daftar, H2/H3, dan tabel; artikel contoh lama tetap tampil melalui fallback `bagian`.
- Metadata global dan artikel menghasilkan URL absolut `https://www.wawangianpelajar.com`, canonical, Open Graph, serta Twitter Card.
- `sitemap.xml` memuat halaman publik, lima Artikel contoh, dan Produk; `robots.txt` memblokir Admin, autentikasi Afiliasi, dan API.
- Halaman artikel menghasilkan tepat dua blok JSON-LD yang dapat dibaca sebagai `Article` dan `BreadcrumbList`.
- Build bertahap dan pemeriksaan TypeScript berhasil sampai Task 16.
- Folder `.next` lama dihapus setelah target absolut diverifikasi, lalu build produksi bersih berhasil.
- `npm.cmd run lint`, `npx.cmd tsc --noEmit`, build mode Data Contoh, dan build mode data hosted semuanya berhasil.
- Artikel teknis lengkap memvalidasi meta title, meta description 156 karakter, canonical absolut, dua JSON-LD, tepat satu H1, alt text, tautan internal, penekanan, daftar, tabel, kutipan, H2/H3, CTA, dan tombol Bagikan.
- Sitemap mode data hosted memuat artikel terbit beserta `lastmod`; robots memuat blok Admin/API dan alamat sitemap kanonis.
- Lima Artikel contoh lama masing-masing merespons HTTP 200, memiliki tepat satu H1, isi fallback, dan CTA.
- Artikel teknis M6 dihapus dari Supabase hosted setelah pengujian; verifikasi akhir mengembalikan jumlah `0`.
- Tabel Markdown dibungkus `overflow-x-auto` agar tidak memperlebar halaman seluler. Tinjauan visual pemilik tetap diperlukan pada preview karena sesi browser otomatis lokal terputus saat server dimulai ulang.
- Migrasi `202607220004_m5_portal_afiliasi.sql` berhasil diterapkan pada Supabase hosted.
- Lima tabel M5, 10 kebijakan RLS, tiga bucket privat, fungsi rekonsiliasi, dan fungsi leaderboard tersedia.
- Transaksi uji hosted menghasilkan satu handle cocok dan satu belum cocok sesuai masukan.
- Empat pcs dengan tarif uji Rp1.250 menghasilkan bonus Rp5.000; angka hanya berada dalam transaksi uji.
- Payout tanpa bukti transfer ditolak constraint database.
- Leaderboard hanya mengembalikan alias, jumlah pcs, urutan, dan penanda milik sendiri.
- Transaksi uji diakhiri `ROLLBACK`; panel Admin kembali menunjukkan nol afiliasi, tingkat, laporan, bonus, dan materi.
- Pendaftaran tanpa kedua handle ditolak sebelum membuat pengguna Supabase.
- Panel `/admin/afiliasi` berhasil membaca schema hosted melalui sesi Admin.
- Migrasi koreksi `202607220005_perbaiki_pemicu_afiliasi.sql` berhasil diterapkan; pengguna Auth tanpa metadata Afiliasi kini diabaikan trigger tanpa menggagalkan pembuatan akun.
- Akun `AfiliasiUji` terkonfirmasi, berstatus aktif, memiliki satu Log Audit aktivasi dengan UID Admin, serta tetap memiliki 0 bonus.
- Login akun uji berhasil membuka Dashboard, Panduan, Materi, dan Leaderboard; leaderboard menampilkan keadaan kosong tanpa penjualan fiktif.
- Mode pratinjau akun uji menampilkan 37 pcs, bonus top-up Rp67.500, Rp48.000 berstatus dibayar, tingkat “Kreator Contoh”, empat riwayat, dan peringkat ketiga; seluruh halaman membawa label “Data Contoh”.
- Mode pratinjau Afiliasi dapat aktif pada Vercel Production MVP, tetap hanya berlaku untuk akun `AfiliasiUji`, dan tidak menulis baris laporan, bonus, maupun payout ke Supabase.
- Kuis manual `/temukan`, tautan “Coba contoh”, pemuatan ulang hasil, dan “Ulangi kuis” berhasil diuji melalui browser lokal.
- Seluruh 32 kombinasi karakter, waktu, dan okasi menghasilkan minimal satu rekomendasi Produk contoh; skenario cepat menampilkan tiga Produk beserta alasan kecocokan.
- Halaman hasil `/temukan` tidak mengalami overflow horizontal pada viewport 360px dan 1440px serta konsol browser tetap tanpa galat atau peringatan aplikasi.
- Responsif 360px dan 1440px — landing serta panel Admin tidak mengalami overflow horizontal.
- Konsol browser localhost — tidak ada galat atau peringatan aplikasi.
- `npm.cmd run lint`, `npm.cmd run build`, dan `git diff --check` — berhasil sebelum pembaruan dokumen akhir.
- Matriks lingkungan tervalidasi: sakelar `true` aktif pada Development, Preview, dan Production, sedangkan `false` mati pada ketiganya.
- Server hasil build dengan simulasi `VERCEL_ENV=production` menampilkan banner, Produk contoh, dan hasil kuis tanpa overflow pada 360px maupun 1440px.
- Login akun `AfiliasiUji` pada server Production lokal berhasil membuka Dashboard berisi bonus, tingkat, riwayat, dan Leaderboard contoh; konsol browser tanpa galat atau peringatan aplikasi.
- Halaman `/admin/masuk` Production lokal tersedia dan responsif; login Admin belum diuji ulang karena kata sandi aktif hanya diketahui pemilik.
- Penyimpanan Produk tanpa foto pada custom domain menghasilkan respons `303`, membuka halaman edit dengan pesan berhasil, dan hanya membuat satu baris Produk.
- Produk nyata dapat dibuka melalui slug publik, menampilkan harga sesuai ukuran, profil aroma lengkap, serta satu tautan Shopee yang valid.
- Build produksi memuat `serverActions.bodySizeLimit=6mb`; `npm.cmd run lint`, `npm.cmd run build`, dan `git diff --check` berhasil.
- Migrasi `202607290006_tambah_placeholder_produk_krem.sql` berhasil diterapkan pada Supabase hosted.
- Batch katalog awal menghasilkan tepat lima Produk aktif berkategori Ori, ukuran 100 ml, placeholder Krem, dan tautan Shopee sesuai dokumen sumber; harga awal batch tersebut kemudian digantikan oleh KEP-045.
- `/admin/produk` menampilkan tepat lima baris Produk dan `/katalog` menampilkan tepat lima kartu Produk aktif.
- Halaman detail Dreamscape dan Monaco berhasil dibuka pada custom domain; Monaco mempertahankan foto produk nyata yang telah ada, sedangkan Produk tanpa foto menampilkan placeholder.
- Detail Produk satu foto utama tervalidasi pada 360 px dan 1440 px: satu blok visual, tanpa tiga thumbnail lama, tanpa overflow horizontal, dan tanpa galat konsol aplikasi.
- Metadata beranda tervalidasi melalui HTML lokal: title, description, Open Graph, Twitter Card, dan gambar sosial memakai nilai SEO baru; lint serta build produksi berhasil.
- Migrasi `202608020008_tambah_varian_ukuran_produk.sql` berhasil diterapkan pada Supabase hosted dan membuat 10 varian tanpa menduplikasi lima Produk sumber.
- API publik memuat 15 slug unik dan aktif: masing-masing lima Produk ukuran 100 ml, 50 ml, dan 15 ml; harga tiap kelompok tepat Rp539.000, Rp289.000, dan Rp119.000, deskripsi ukuran sesuai, serta tautan Shopee tersedia.
- Migrasi `202608020009_perbarui_harga_varian_produk.sql` berhasil diterapkan pada Supabase hosted. Trigger `audit_produk_sensitif` mencatat setiap perubahan sebagai `ubah_harga_produk` sesuai BR-9.
- Katalog Production menampilkan masing-masing lima harga Rp539.000, Rp289.000, dan Rp119.000 serta tetap memiliki 15 tautan detail Produk unik.
- Input harga Admin memakai teks berpola digit dengan papan ketik numerik, sehingga tombol panah naik/turun bawaan input angka tidak ditampilkan dan validasi angka server tetap berlaku.
- `npm.cmd run lint`, `npm.cmd run build`, dan pemeriksaan diff berhasil setelah perubahan formulir, validasi harga, migrasi, serta dokumentasi.
- Migrasi `202608030010_tambah_decant_mykonos.sql` berhasil diterapkan pada Supabase hosted dan berakhir dengan empat Produk Decant yang unik.
- API publik memuat 19 Produk aktif; keempat Decant memiliki ukuran, harga, tautan Shopee, lima kelompok profil berlabel varian, catatan BPOM sumber, serta foto kosong sesuai sumber.
- Keempat halaman detail Decant merespons HTTP 200, memuat lima pilihan aroma, catatan status decant, dan tautan Shopee yang benar.
- Ketiga ukuran Monaco Royale memuat notes Pear/Melon/Green Notes, Soft Wood/Cedarwood, serta Moss/Caramel/Musk; profil lama tidak lagi tampil pada halaman detail.
- Detail Decant 1 ml tidak mengalami overflow horizontal pada viewport 360 px maupun 1440 px dan konsol browser tidak memuat galat atau peringatan aplikasi.
- Katalog lokal mode hosted memuat 19 tautan detail unik; sitemap memuat 19 URL Produk termasuk empat URL Decant.
- `npm.cmd run lint`, `npm.cmd run build`, dan `git diff --check` berhasil setelah migrasi serta dokumentasi Decant ditambahkan.
- Sepuluh foto sumber non-`WP` tervalidasi cocok dengan lima aroma dan dua ukuran; hasil WebP tetap persegi serta berukuran sekitar 29–68 KB.
- Sepuluh URL publik Storage merespons HTTP 200 dengan tipe `image/webp`; API publik mengembalikan 15 Produk utama berfoto, satu Decant berfoto manual, tiga Decant tanpa foto, dan nol URL Produk utama yang memuat “WP”.
- Lima Produk 15 ml memakai URL foto 50 ml yang sama dengan pasangannya dan halaman detail menjelaskan perbedaan ukuran secara terbuka.
- Migrasi foto katalog tidak mengubah foto Decant; unggahan manual pemilik pada Decant 10 ml tetap tersedia dan tiga Decant lain tetap tanpa foto.
- Katalog lokal mode hosted memuat 19 tautan Produk, tiga placeholder Decant, tanpa overflow horizontal pada 360 px maupun 1440 px, serta tanpa peringatan atau galat browser pada pemuatan akhir.
- `npm.cmd run lint`, `npm.cmd run build`, dan pemeriksaan diff berhasil setelah pemasangan foto serta penyesuaian transparansi ukuran.
- Katalog `https://www.wawangianpelajar.com/katalog` menampilkan tepat 15 tautan detail Produk tanpa label Data Contoh.
- Sitemap Production memuat 15 URL Produk dan mencakup slug ukuran 100 ml, 50 ml, serta 15 ml.
- `npm.cmd run lint`, `npm.cmd run build`, dan pemeriksaan diff berhasil setelah penambahan varian hosted serta migrasinya.
- Logo resmi, warna global, halaman publik, login Admin, dan login Afiliasi telah diperiksa pada viewport 360px dan 1440px tanpa overflow horizontal atau galat konsol aplikasi.
- Revisi logo simbol berhasil dimuat melalui URL aset baru pada Beranda dan halaman masuk Admin; komposisinya terlihat lebih besar pada kotak 46–48 px tanpa mengubah tinggi navigasi.
- `npm.cmd run lint`, `npm.cmd run build`, dan `git diff --check` berhasil setelah BUILD_SPEC v2.4 serta KEP-036 ditambahkan.
- Dua pengguna Auth Admin uji tambahan terkonfirmasi dan masing-masing memiliki baris `pengguna_admin` aktif.
- Login Production `admin.uji2@example.com` menampilkan identitas “Admin Uji 2” pada Dasbor Admin dan berhasil keluar.
- Login Production `admin.uji3@example.com` menampilkan identitas “Admin Uji 3” pada Dasbor Admin dan berhasil keluar.
- `npm.cmd run lint`, `npm.cmd run build`, `git diff --check`, dan pemeriksaan rahasia berhasil setelah dokumentasi akun; server lokal kembali memberi respons HTTP 200 pada port 3000.

## Langkah berikutnya

1. Pemilik meninjau preview lokal dan draft PR M6. Jangan gabungkan ke `main` sebelum persetujuan eksplisit pemilik.
2. Setelah disetujui, gabungkan branch ke `main`, tunggu deployment Vercel selesai, lalu lakukan smoke test Production.
3. Pemilik menyediakan Konten awal Artikel serta data bisnis Afiliasi nyata ketika tersedia, lalu mengirim sitemap ke Google Search Console saat rilis disetujui.

## Asumsi yang berlaku

- Email dan kata sandi dipakai untuk autentikasi Afiliasi; WhatsApp hanya data kontak karena autentikasi SMS tidak dikonfigurasi.
- Minimal salah satu handle TikTok Shop atau Shopee wajib dan disimpan tanpa awalan `@` untuk pencocokan stabil.
- Pendaftar berstatus `menunggu`; panduan, materi, dan leaderboard baru terbuka setelah Admin mengaktifkan profil.
- Tarif bonus tidak diisi data contoh. Admin wajib menetapkan tingkat serta nilai bisnis nyata sebelum laporan dapat diproses.
- Runtime Data Contoh tidak boleh dihidupkan kembali; fixture hanya berada di `tests/`.
- Lima jawaban `/temukan` tidak disimpan ke database. Parameter URL diperlukan agar hasil dapat dimuat ulang dan dibagikan.
- Satu profil rekomendasi mewakili satu keluarga aroma dan boleh ditautkan ke beberapa ukuran. Decant multi-aroma sengaja tidak memiliki profil.
- Tag intensitas adalah klasifikasi pengalaman aroma berdasarkan deskripsi hosted, bukan jaminan ketahanan, sillage, atau proyeksi.
- Tautan kanal, email, dan nomor WhatsApp yang diberikan pemilik dianggap resmi serta boleh tampil publik.
- Nilai `tiktokShop: null` berarti kanal hanya menjadi penanda mendatang dan tidak boleh menghasilkan tautan atau aksi sampai URL resmi diberikan.
- CSV M5 sengaja hanya membutuhkan `handle` dan `jumlah_pcs`; website tidak menyimpan, menghitung, atau membayar komisi dasar marketplace.
- Laporan, materi, dan bukti bonus disimpan pada bucket privat. Materi diberikan lewat URL bertanda tangan yang berlaku 10 menit.
- Leaderboard hanya menampilkan alias dan jumlah pcs bulan berjalan; identitas, WhatsApp, email, dan handle tidak dipublikasikan.
- Lima Produk Mykonos ditampilkan aktif karena pemilik meminta unggahan katalog awal. Harga, ukuran, profil aroma, dan deskripsi mengikuti dokumen sumber tanpa klaim tambahan.
- Satu tautan Shopee dipakai untuk kelima Produk karena dokumen sumber memberikan URL yang sama. Tautan TikTok Shop dibiarkan kosong.
- Empat ukuran Decant disimpan sebagai empat Produk; lima aroma di dalam setiap Produk dipilih pada Shopee dan dicantumkan dengan nama varian agar profilnya tidak terbaca sebagai satu formula.
- Foto Decant tidak diatur oleh migrasi katalog ini. Unggahan manual pemilik dipertahankan, sedangkan placeholder pada Decant lain tidak menyatakan bentuk atau model botol tertentu.
- Foto 100 ml memakai aset 100 ml yang namanya cocok. Foto 50 ml juga dipakai sebagai referensi pada Produk 15 ml sesuai instruksi pemilik dan wajib diganti saat aset 15 ml khusus tersedia.
- Afiliasi nyata, materi, tarif, laporan, dan payout bisnis menyusul dari pemilik. `AfiliasiUji` hanya identitas teknis untuk peninjauan.
- Batas Server Action 6 MB hanya menyediakan ruang untuk foto maksimal 5 MB beserta field multipart; validasi aplikasi dan bucket Storage tetap membatasi file produk pada JPEG/PNG/WebP maksimal 5 MB.
- Instruksi eksplisit pemilik pada 1 Agustus 2026 menjadi dasar aktivasi M6 meskipun dokumen sebelumnya masih mencatat M5 menunggu konfirmasi.
- Domain kanonis M6 adalah `https://www.wawangianpelajar.com`, bukan alamat deployment Vercel lama pada rancangan awal.
- Artikel teknis M6 bukan konten bisnis dan wajib dihapus setelah validasi akhir.
- Dua akun Admin tambahan memakai peran Admin tunggal yang sama sesuai BR-10 dan hanya menjadi akses teknis pengujian, bukan perluasan scope menjadi peran granular.

## Batas scope yang tetap dijaga

- Tidak ada checkout, keranjang, pembayaran, akun pembeli, wishlist, atau pengelolaan ongkir.
- Tidak ada pelacakan atau pembayaran komisi dasar buatan website.
- Tidak ada payout otomatis, integrasi bank, klaim pendapatan, tarif bonus, klaim anggota nyata, atau leaderboard palsu.
- Tidak ada Sales Academy, sertifikat, notifikasi otomatis, loyalitas, atau peran Admin granular.
- Tidak ada visual Produk yang menipu, klaim organisasi, banting harga, atau klaim promosi palsu.
- Rangkaian ini tidak menambah checkout, akun pembeli, pelacakan komisi, atau klaim dampak baru.

## Catatan dan kendala

- Custom domain Production aktif pada `https://www.wawangianpelajar.com`; domain tanpa `www` mengalihkan ke domain utama.
- Redirect URL konfirmasi Afiliasi perlu dipastikan mencakup `https://www.wawangianpelajar.com/auth/konfirmasi`.
- Data bisnis M5 di Supabase masih kosong secara sengaja; runtime tidak menyediakan simulasi bonus, materi, payout, atau leaderboard.
- Login Admin lokal berhasil dipakai untuk pengujian Task 3; kata sandi tetap tidak disimpan dalam dokumentasi atau repository.
- `NEXT_PUBLIC_URL_SITUS` wajib ditambahkan pada Vercel Production dan Preview sebelum deployment SEO ditinjau.
- `npm audit` setelah kenaikan ke Next.js 16.3.0 mencatat **0 high dan 2 moderate**. Dua moderate berasal dari UUID transitif ExcelJS yang tidak dipanggil fitur mana pun; tidak ada perbaikan upstream yang tersedia tanpa mengganti ExcelJS.
- Login dua akun Admin uji tambahan telah tervalidasi pada custom domain. Alamatnya memakai domain cadangan `example.com`, sehingga pemulihan atau undangan melalui email tidak diandalkan; pengelolaan kata sandi dilakukan langsung oleh pemilik dan nilainya tidak disimpan dalam dokumentasi atau repository.
- Decant 1 ml, 2 ml, dan 5 ml memakai foto yang sama dengan 10 ml (KEP-051) setelah migrasi `202608040013` diterapkan; migrasi membatalkan diri jika foto 10 ml belum ada.
- Naskah metadata sudah diselaraskan menjadi “mulai 1 ml” sesuai ukuran terkecil katalog hosted (KEP-051), sehingga klaim SEO tidak lagi bertentangan dengan data Produk.

---

`STATUS.md` diperbarui setiap akhir sesi kerja.
