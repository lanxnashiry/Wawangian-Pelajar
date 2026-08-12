# CHANGELOG.md — Riwayat Perubahan Aplikasi

> Catatan bertanggal semua perubahan aplikasi. Riwayat lama tidak boleh dihapus.

## [2026-08-10] — Decant Mykonos 3 ml

### Ditambahkan

- Produk Decant Mykonos Original 3 ml seharga Rp45.000 sebagai pilihan Paling Direkomendasikan.
- Migrasi idempotent `202608100016` menyalin profil enam varian dari Decant 2 ml dan galeri dari Decant 10 ml.
- Tiga pengujian kontrak untuk harga/slug, pemakaian foto yang sama, serta deskripsi tanpa jaminan jumlah semprotan.

### Validasi

- Migrasi diterapkan ke Supabase hosted; REST membuktikan 28 Produk aktif, lima Decant, satu galeri, dan data 3 ml yang tepat.

## [2026-08-09] — Logo asli tanpa edit

### Diubah

- PNG kiriman pemilik disalin byte-for-byte sebagai satu master dan dipakai langsung di seluruh permukaan identitas.
- Seluruh crop, sharpen, resize aset, compositing, dan turunan sebelumnya tidak lagi direferensikan.
- Test mengunci ukuran 1.265.733 byte dan SHA-256 sumber resmi.
- BUILD_SPEC naik ke 3.9 dan KEP-061 menggantikan cara implementasi KEP-060.

### Validasi

- `npm test` 58/58, TypeScript, lint, build produksi, dan `git diff --check` lulus.

## [2026-08-09] — Identitas logo gelap terbaru

### Diubah

- Sumber logo gelap kiriman pemilik diturunkan menjadi monogram header, logo penuh footer, icon 512×512, dan OG 1200×630.
- Nama aset lama dipertahankan agar seluruh permukaan web berubah tanpa duplikasi kode.
- BUILD_SPEC naik ke 3.8 dan KEP-060 mencatat keterbatasan wordmark gelap serta upgrade vektor berikutnya.

### Validasi

- `npm test` 58/58, TypeScript, lint, build produksi, `git diff --check`, QA turunan, Vercel production, dan QA header nyata lulus.
- Monogram dipertajam dan diperbesar menjadi 48 px; footer diperlebar 320 px serta melepas latar putih warisan logo lama.

## [2026-08-09] — Visual homepage kiriman pemilik

### Diubah

- Hero homepage memakai visual koleksi parfum kiriman pemilik, bukan Produk unggulan pertama.
- Tiga simbol teks Prinsip Kami diganti visual dokumen terverifikasi, pendidikan, dan harga terverifikasi.
- Empat sumber PNG 4,5 MB dioptimalkan menjadi WebP total sekitar 254 KB tanpa mengubah komposisi.
- BUILD_SPEC naik ke 3.7 dan KEP-059 mengunci pemakaian visual sebagai promosi umum, bukan foto SKU.

### Validasi

- `npm test` 58/58, TypeScript, lint, build produksi, `git diff --check`, Vercel production, QA desktop, dan QA mobile 390 px lulus.
- Panel Dana Cahaya dipindahkan ke bawah foto setelah QA menemukan overlay menutupi baris bawah koleksi.

## [2026-08-09] — Lima SKU Mykonos dan lima koreksi harga

### Ditambahkan

- Migrasi idempotent `202608090015` untuk Invade 50 ml, Reflection 50 ml, Reflection Elixir 50 ml, Conquer 100 ml, dan Penthouse 50 ml dengan foto kosong.
- Lima profil Temukan Wangimu yang diturunkan konservatif dari notes resmi.
- Empat pengujian kontrak migrasi: Produk/harga/foto, koreksi harga, sumber resmi/tanpa klaim performa, dan nama resmi Conquer.

### Diubah

- Harga Glitch 100 ml, Monaco Royale 100 ml, Dreamscape 100 ml, Glitch 50 ml, dan Dreamscape 50 ml mengikuti keputusan pemilik.
- BUILD_SPEC naik ke 3.6 dan KEP-058 mengunci sumber data serta penamaan SKU.

### Validasi

- `npm test` 56/56, TypeScript, lint, build produksi, dan `git diff --check` lulus.
- Supabase CLI diinisialisasi dan di-link ke project Wawangian; histori 13 migrasi lama direkonsiliasi sebagai applied.
- Migrasi cleanup `0013` dan Produk/harga `0015` berhasil diterapkan; histori lokal/remote 15/15 sejajar dan dry-run menyatakan up to date.
- REST production membuktikan 27 Produk aktif, foto lima SKU baru kosong, lima harga target benar, dan lima profil Temukan Wangimu terpasang.

## [2026-08-08] — Galeri Produk dan identitas visual terbaru

### Ditambahkan

- Galeri Produk maksimal empat foto dengan thumbnail, tombol sebelumnya/berikutnya, indikator posisi, dan navigasi keyboard.
- Pengelola foto Admin untuk multi-upload, hapus, dan jadikan utama.
- Helper validasi urutan foto serta ekstraksi lokasi Storage project sendiri.
- Turunan logo terbaru untuk monogram header, lockup penuh footer, favicon, dan Open Graph.
- Tujuh pengujian galeri, keamanan foto, fallback Decant, object-contain, Admin, dan aset logo.

### Diubah

- Foto Produk pada kartu dan detail memakai `object-contain`, bukan `object-cover`.
- Visual Decant lokal menjadi fallback saat galeri kosong, bukan override permanen.
- BUILD_SPEC naik dari 3.4 menjadi 3.5; KEP-057 menggantikan kebijakan satu foto KEP-054/versi lama.

### Keamanan data

- Hidden URL hanya diterima bila sudah dimiliki Produk; total foto dan ukuran/MIME divalidasi server.
- Upload parsial gagal membersihkan berkas baru dan tidak menghapus foto lama.
- Objek Storage yang dilepas hanya dihapus bila tidak direferensikan Produk lain.

### Validasi

- `npm test` 52/52, TypeScript, lint, build produksi, dan `git diff --check` lulus.
- Render lokal mengonfirmasi Produk satu-foto tampil utuh tanpa kontrol panah kosong; kartu/detail bebas crop dan identitas terbaru muncul di seluruh permukaan terkait.
- Monogram, lockup footer, favicon, dan Open Graph lulus QA visual pada rasio pemakaiannya.

## [2026-08-08] — Paket 2 optimasi aset dan internal link

### Ditambahkan

- Satu visual katalog WebP lokal 46 KB untuk seluruh Produk Decant, berisi enam varian aktif dan empat ukuran tanpa atribut fisik palsu.
- Ringkasan enam varian pada Detail Decant beserta keterangan bahwa pilihan dilakukan di Shopee.
- Internal link Artikel menuju Temukan Wangimu dan jalur kedua menuju Decant 5 ml atau Katalog sesuai kategori.
- Lima pengujian untuk override foto Decant, batas 200 KB, isolasi foto non-Decant, penyelarasan enam varian, ringkasan varian, dan jalur Artikel.

### Diubah

- Foto Decant publik beralih dari satu PNG hosted 2,20 MB ke satu WebP lokal 46 KB (hemat 97,9%) tanpa mengubah database atau Storage.
- BUILD_SPEC naik dari 3.3 menjadi 3.4; KEP-056 mencatat batas aset faktual dan internal link kontekstual.

### Validasi

- `npm test` 45/45, TypeScript, lint, build produksi, dan `git diff --check` lulus.
- Render lokal mengonfirmasi WebP/ringkasan enam varian hanya pada Decant, foto Ori tetap hosted, serta jalur Artikel mengikuti kategori.

## [2026-08-05] — CTA ganda dan nilai Decant faktual

### Ditambahkan

- CTA marketplace pertama setelah harga/ringkasan dan CTA kedua setelah profil aroma/pesan misi.
- CTA WhatsApp sekunder dengan pesan otomatis nama serta ukuran Produk.
- Harga per ml dan label nilai faktual pada kartu serta detail Produk Decant.
- Pengujian deterministik untuk nilai Decant dan penjaga agar harga coret/diskon semu tidak masuk antarmuka publik.

### Diubah

- Deskripsi panjang dipindahkan ke blok “Tentang produk” setelah CTA pertama agar pembeli cepat segera melihat tombol beli.
- BUILD_SPEC naik dari 3.2 menjadi 3.3; KEP-055 mengunci CTA ganda dan melarang harga pembanding tanpa promo nyata.

### Validasi

- `npm test` 40/40, TypeScript, lint, build produksi, dan `git diff --check` lulus.
- Render lokal mengonfirmasi nilai per ml hanya tampil pada Decant, CTA WhatsApp/Tentang Produk tampil pada Decant dan Ori, serta tidak ada harga coret.

## [2026-08-05] — Pemolesan teks komersial dan footer kanal resmi

### Ditambahkan

- Ikon monokrom kecil untuk Shopee, TikTok Shop, Instagram, Facebook, Email, dan WhatsApp pada footer.
- Status TikTok Shop nonaktif tanpa tautan, fokus keyboard, atau aksi klik sampai toko siap.
- Pengujian otomatis untuk mencegah catatan implementasi, caption teknis, label sumber data, dan chip internal kembali tampil pada halaman publik.

### Diubah

- Footer memakai label kanal ringkas dalam dua kolom Belanja serta Ikuti & Hubungi.
- Teks Beranda, Katalog, Temukan Wangimu, Dana Cahaya Pendidikan, Cerita, Artikel, dan Afiliasi diselaraskan menjadi bahasa pengunjung.
- Detail Produk hanya menampilkan notes Atas, Tengah, dan Dasar; Karakter serta Cocok untuk tetap tersimpan untuk pengelolaan dan rekomendasi.
- Alt foto Produk disederhanakan menjadi “Foto produk [nama]”, sedangkan Artikel tanpa gambar memakai judulnya sebagai keterangan visual.
- BUILD_SPEC naik dari 3.1 menjadi 3.2 dan KEP-054 menggantikan kewajiban caption publik pada KEP-047 tanpa mengubah pemetaan foto.

### Dihapus

- Label “Data terverifikasi” atau “Data contoh”, caption penyimpanan/foto referensi, catatan milestone, pesan Admin, dan istilah implementasi lain dari antarmuka publik.
- Kalimat identitas palet dari footer serta chip Karakter/Cocok untuk dari detail Produk.

### Validasi

- `npm.cmd test` 34/34, lint, TypeScript, dan build produksi lulus.
- Seluruh 19 halaman Produk mempertahankan tiga lapisan notes dan tombol Shopee tanpa chip internal atau caption teknis.
- Beranda, Katalog, detail Produk, Decant, Temukan, Dana Cahaya, Cerita, Artikel, dan Afiliasi publik diperiksa pada 360px serta 1440px tanpa overflow horizontal.
- Footer aktif memiliki URL serta atribut keamanan yang benar; TikTok Shop tidak memiliki tautan, fokus keyboard, atau aksi klik.

## [2026-08-05] — Revisi Temukan Wangimu dan kanal resmi

### Ditambahkan

- Profil rekomendasi baku dengan lima dimensi, RLS, Log Audit, pengelolaan Admin, serta relasi keluarga aroma pada Produk.
- Kuis bertahap lima pertanyaan dengan 1.125 kombinasi tervalidasi, hasil per keluarga aroma, pilihan ukuran, alasan kecocokan, dan CTA Decant terpisah.
- Dukungan `kode_profil_rekomendasi` pada pratinjau, validator, template, dan RPC entri massal.
- Kanal resmi Facebook, Instagram, Shopee, email, dan WhatsApp pada footer global.

### Diubah

- Rekomendasi tidak lagi mencocokkan teks bebas `karakter`/`cocok_untuk` atau mengulang satu aroma dalam beberapa ukuran.
- Parameter hasil menjadi `aroma`, `kesan`, `intensitas`, `waktu`, dan `kegiatan`; tautan lama tetap dipetakan.
- BUILD_SPEC naik dari 3.0 menjadi 3.1 dan dokumentasi runtime Data Contoh yang telah dihapus diselaraskan.

### Diperbaiki

- Empat dari 32 kombinasi lama yang kosong, dominasi Produk Decant, dan duplikasi varian ukuran pada hasil rekomendasi.
- Placeholder Shopee/TikTok pada footer diganti dengan kanal yang sudah dikonfirmasi pemilik; TikTok tidak ditampilkan sampai tautan resmi tersedia.

### Validasi

- `npm test` 32/32, lint, TypeScript, dan build produksi lulus; seluruh 1.125 kombinasi kuis teruji.
- Migrasi hosted berakhir dengan tepat 19 Produk, lima profil rekomendasi, 15 SKU tertaut, serta empat Decant tanpa profil.
- Alur hasil baru, URL lama, footer resmi, dan tampilan 360px/1440px diperiksa melalui server lokal tanpa galat aplikasi.

## [2026-08-04] — Pembersihan penghalang rilis

### Diubah

- Seluruh runtime Data Contoh Produk, Artikel, donasi, bonus, dan leaderboard dihapus; kegagalan Supabase kini fail closed.
- Next.js 16.2.10 → 16.3.0; audit turun dari 4 high + 2 moderate menjadi 0 high + 2 moderate transitif ExcelJS.
- Data publik memakai klien anon stateless; katalog dan donasi memakai ISR lima menit.
- Detail Produk memiliki JSON-LD `Product` + `Offer`.
- Definisi donasi diperjelas menjadi 20% laba bersih setiap transaksi; naskah “mulai 5 ml” menjadi “mulai 1 ml”; aturan visual AI diselaraskan.
- Hero dan cerita beranda memakai gambar data nyata, bukan teks placeholder developer.

### Data & keamanan

- Migrasi `202608040013_pembersihan_data_uji_dan_foto_decant.sql` menyalin foto 10 ml ke Decant 1/2/5 ml, menghapus Produk/Afiliasi uji, mencabut hak Admin uji, memban akun dan memutus sesi tanpa merusak Log Audit.
- Setiap pembersihan pada migrasi itu dibungkus penjaga `row_count`: pembaruan catatan metode rekap donasi hanya boleh menyentuh tepat satu baris, penghapusan Produk/afiliasi uji paling banyak satu baris, dan afiliasi uji diikat ke Auth user `afiliasi.uji@gmail.com` alih-alih hanya alias publik. Rekap atau afiliasi nyata yang kebetulan berangka/beralias sama tidak dapat tersentuh; jika sasaran tidak tunggal, migrasi digulung balik.
- Ban akun uji memakai `9999-12-31 23:59:59+00` alih-alih `infinity` agar klien GoTrue tidak gagal mengurai nilai timestamp.
- Strategi satu listing Shopee bervarian dan subsidi silang dua SKU 100 ml dicatat sebagai keputusan sadar; TikTok Shop menunggu konfirmasi.
- Test otomatis menjadi 21 dan seluruhnya lulus.

## [2026-08-04] — Entri massal Produk dan Artikel

### Ditambah

- Halaman Admin `/admin/entri-massal` yang dapat diakses dari navigasi, daftar Produk, dan daftar Artikel.
- Template workbook `.xlsx` berisi sheet Petunjuk, Produk, serta Artikel dengan header baku dan dropdown nilai pilihan.
- Pratinjau kering per baris yang menampilkan slug hasil normalisasi, status valid/peringatan/ditolak, serta alasan dengan nomor baris.
- Validator bersama untuk Produk dan Artikel: kategori, warna, boolean, harga, menit baca, HTTPS, domain marketplace, BR-4, metadata SEO, H1 Markdown, slug ganda, dan batas 500 baris.
- RPC `impor_massal_produk_artikel` untuk penyimpanan create-only secara atomik serta satu Log Audit batch.
- 17 pengujian otomatis berbasis `node:test`; perintah baru `npm test` menjadi bagian Definition of Done.
- Pemeriksaan metadata ZIP sebelum ExcelJS: maksimal 100 entry, 10 MB per entry, 25 MB total setelah ekstraksi, dan penolakan nama traversal.

### Diubah

- BUILD_SPEC naik dari v2.8 menjadi v2.9 dan M6 mencakup efisiensi operasional Admin.
- Artikel yang masuk melalui entri massal selalu disimpan sebagai draft, walaupun workbook meminta terbit.
- `tsconfig.json` mengizinkan impor ekstensi TypeScript khusus alur test tanpa menghasilkan output build.

### Catatan

- Ukuran workbook maksimal 5 MB dan 500 baris per sheet. Mode overwrite, ubah massal, serta unggah ZIP gambar sengaja tidak dibangun pada versi pertama.
- Foto pada workbook hanya berupa satu URL HTTPS publik opsional per baris.
- Kode, lint, TypeScript, 17 test, dan build produksi lulus. Migrasi `202608040012_entri_massal_produk_artikel.sql` belum dapat diterapkan otomatis karena Supabase CLI/dashboard tidak memiliki sesi pada mesin ini; SQL Editor pemilik diperlukan sebelum impor produksi menyimpan data.
- Audit dependensi mencatat 4 advisory tinggi dan 2 sedang. Next.js 16.2.10 perlu ditingkatkan ke ≥16.2.11 dalam task terpisah; `exceljs` membawa advisory sedang lewat UUID lama tetapi jalur fitur tidak menggunakan fungsi UUID tersebut.

## [2026-08-04] — Analitik pengunjung Umami dan pedoman agent

### Ditambah

- Komponen `components/analitik-umami.tsx` yang memasang tracker Umami (analitik pengunjung self-host) di `app/layout.tsx`. Komponen tidak merender apa pun bila `NEXT_PUBLIC_UMAMI_ID_SITUS` kosong, sehingga build dan deploy tetap jalan meski instance Umami belum berdiri.
- Deklarasi tipe `types/umami.d.ts` untuk objek global `window.umami`.
- Rewrite proxy `/stats/script.js` dan `/stats/api/send` di `next.config.ts` agar tracker dilayani lewat domain sendiri dan tidak diblokir pemblokir iklan. Tanpa `UMAMI_URL_INSTANCE`, tidak ada rewrite yang dibuat.
- Event `klik-beli` pada `components/jembatan-marketplace.tsx` berisi marketplace tujuan dan nama produk, dikirim berdampingan dengan pencatatan klik-keluar yang sudah ada.
- Tiga variabel opsional di `.env.example`: `NEXT_PUBLIC_UMAMI_ID_SITUS`, `UMAMI_URL_INSTANCE`, `NEXT_PUBLIC_UMAMI_URL_SKRIP`.
- **`AGENTS.md` di root repo** sebagai pedoman wajib semua agent: bahasa, dokumen yang harus dibaca lebih dulu, pembagian kerja Codex dan Hermes, konvensi penomoran KEP, Definition of Done, batas scope, pitfall git, serta daftar utang teknis.
- Berkas rencana `.hermes/plans/2026-08-01_092610-revisi-seo-form-artikel.md` mulai dilacak sebagai jejak serah-terima pekerjaan antar agent.

### Catatan

- Analitik Klik-Keluar di panel Admin tetap menjadi catatan resmi; Umami hanya pelengkap untuk mengukur jumlah pengunjung dan sumber trafik. Sebelumnya klik tercatat tanpa pembanding jumlah pengunjung, sehingga angka konversi tidak bisa dibaca.
- Modul Umami sebenarnya sudah selesai ditulis pada sesi sebelumnya tetapi tidak pernah di-commit dan tidak tercatat di dokumen mana pun. Perilaku itulah yang kini dilarang oleh `AGENTS.md` Bagian 0.
- Pencatatan dibatasi pada domain produksi melalui `data-domains`, sehingga kunjungan dari localhost dan Vercel Preview tidak mengotori data.
- Pemilik masih perlu mendirikan instance Umami sendiri dan mengisi ketiga variabel di Vercel sebelum data mulai terkumpul.

## [2026-08-03] — Foto utama Produk Mykonos

### Ditambah

- Sepuluh foto utama Mykonos terpilih untuk lima aroma pada kemasan 100 ml dan 50 ml.
- Migrasi idempoten `202608030011_pasang_foto_produk_mykonos.sql` untuk memasang satu URL foto pada 15 Produk tanpa mengubah foto Decant milik pemilik.
- Keterangan transparan pada detail Produk 15 ml bahwa visual memakai foto referensi kemasan 50 ml.

### Diubah

- Foto sumber JPEG, PNG, dan WebP dikonversi menjadi WebP teroptimasi berukuran sekitar 29–68 KB tanpa mengubah komposisi gambar.
- Komponen foto Produk kembali memakai optimasi gambar Next.js untuk URL publik Supabase.

### Catatan

- Berkas dengan nama memuat “WP”, video, serta aset “monro” yang tidak memiliki pasangan Produk katalog tidak digunakan.
- Produk 50 ml dan 15 ml memakai satu URL foto 50 ml yang sama untuk menghindari duplikasi Storage; aset 15 ml khusus tetap perlu menggantikannya ketika tersedia.
- Foto Decant 10 ml yang diunggah manual oleh pemilik dipertahankan; Decant 1 ml, 2 ml, dan 5 ml tetap menampilkan placeholder.

## [2026-08-03] — Produk Decant Mykonos

### Ditambah

- Empat Produk Decant Mykonos “Pilih Varian” pada ukuran 1 ml, 2 ml, 5 ml, dan 10 ml dengan harga masing-masing Rp19.000, Rp34.000, Rp69.000, dan Rp129.000.
- Lima pilihan aroma beserta notes, karakter, kecocokan, serta nomor BPOM full bottle sumber pada setiap deskripsi Decant.
- Migrasi idempoten `202608030010_tambah_decant_mykonos.sql` yang memvalidasi empat Produk Decant dan tiga profil Monaco Royale.

### Diubah

- Profil Monaco Royale ukuran 100 ml, 50 ml, dan 15 ml diselaraskan menjadi Pear/Melon/Green Notes, Soft Wood/Cedarwood, serta Moss/Caramel/Musk sesuai sumber 3 Agustus 2026.
- Ringkasan, deskripsi, karakter, dan kecocokan Monaco diperbarui agar tidak lagi menyebut profil gourmand lama yang bertentangan.

### Catatan

- Keempat Decant memakai satu tautan Shopee dari sumber, tidak memiliki tautan TikTok Shop, dan belum memiliki foto.
- API publik memuat 19 Produk aktif; keempat detail Decant merespons HTTP 200 dan menampilkan profil berlabel per varian.
- Metadata beranda “mulai 5 ml” belum diubah meskipun ukuran terkecil kini 1 ml karena naskah SEO memerlukan konfirmasi pemilik.

## [2026-08-02] — Harga Produk per ukuran

### Diubah

- Harga kelima Produk Mykonos 100 ml menjadi Rp539.000, kelima Produk 50 ml menjadi Rp289.000, dan kelima Produk 15 ml menjadi Rp119.000.
- Input harga pada formulir Admin tidak lagi memakai kontrol angka dengan tombol panah naik/turun; isian tetap menampilkan papan ketik numerik dan hanya menerima digit.
- BUILD_SPEC dinaikkan dari v2.7 menjadi v2.8 dan KEP-045 menggantikan bagian harga sementara pada KEP-044.

### Ditambah

- Migrasi idempoten `202608020009_perbarui_harga_varian_produk.sql` yang menetapkan harga dan memvalidasi tepat 15 Produk sasaran.
- Petunjuk formulir agar harga dimasukkan tanpa titik atau pemisah ribuan.

### Catatan

- Perubahan harga dijalankan pada Supabase hosted dan otomatis dicatat oleh trigger Log Audit Produk sesuai BR-9.
- API publik serta katalog Production memuat tepat lima Produk pada setiap tingkat harga baru.
- Profil aroma, status Produk, foto utama, dan tautan Shopee tidak diubah.

## [2026-08-02] — Varian ukuran katalog Mykonos

### Ditambah

- Sepuluh Produk hosted baru dari lima aroma Mykonos: masing-masing satu varian 50 ml dan satu varian 15 ml.
- Migrasi idempoten `202608020008_tambah_varian_ukuran_produk.sql` yang memastikan batch berakhir dengan tepat 15 Produk.

### Diubah

- Nama, slug, field ukuran, dan bagian spesifikasi deskripsi disesuaikan untuk setiap varian baru.
- Harga Rp549.000, profil aroma, status, warna placeholder, serta tautan Shopee disalin dari Produk 100 ml sesuai instruksi pemilik.

### Catatan

- Foto Monaco 100 ml tidak disalin ke varian 50 ml dan 15 ml agar visual kemasan tidak menyatakan ukuran yang salah.
- API publik dan katalog Production memuat tepat 15 Produk aktif: masing-masing lima Produk berukuran 100 ml, 50 ml, dan 15 ml.
- Sitemap Production memuat 15 URL Produk dan mencakup ketiga ukuran.
- `npm.cmd run lint`, `npm.cmd run build`, dan pemeriksaan diff berhasil setelah migrasi serta dokumentasi ditambahkan.
- Metadata beranda masih menyebut “mulai 5 ml”, sedangkan katalog hosted terkecil saat ini 15 ml; naskah metadata perlu dikonfirmasi kembali sebelum rilis publik luas.

## [2026-08-02] — Metadata SEO beranda untuk mahasiswa

### Diubah

- Judul beranda, Open Graph, dan Twitter Card menjadi “Wawangian Pelajar — Decant Parfum Original untuk Mahasiswa”.
- Deskripsi metadata menonjolkan decant parfum original, parfum inspirasi mulai 5 ml, dan misi 20% laba untuk pendidikan.
- BUILD_SPEC dinaikkan dari v2.6 menjadi v2.7 dan KEP-043 mencatat sasaran metadata baru.

### Catatan

- Istilah “laba” pada metadata tetap berarti keuntungan bersih sesuai BR-1.
- Klaim ukuran mulai 5 ml perlu tetap didukung Produk aktif sebelum website dirilis untuk publik luas.
- Lint, build produksi, serta pemeriksaan HTML lokal membuktikan title, description, Open Graph, Twitter Card, dan gambar sosial memakai nilai baru.

## [2026-08-01] — Satu foto utama pada detail Produk

### Diubah

- Detail Produk hanya menampilkan satu foto utama tanpa thumbnail “Tampak depan”, “Detail botol”, atau “Kemasan”.
- Label input Admin diselaraskan menjadi “Foto utama produk” dan unggahan baru menggantikan referensi foto lama.
- BUILD_SPEC dinaikkan dari v2.5 menjadi v2.6 dan KEP-042 mencatat keputusan satu foto utama.

### Diperbaiki

- Penyuntingan Produk tidak lagi menambahkan URL baru di belakang foto lama yang tetap terpilih sebagai gambar pertama.
- Teks formulir dan alt gambar tidak lagi selalu mengklaim visual sebagai foto asli sehingga tetap selaras dengan KEP-036.

### Catatan

- Struktur kolom array Supabase dipertahankan untuk kompatibilitas, tetapi aplikasi membatasi referensi aktif menjadi maksimal satu URL.
- Berkas foto lama di Storage tidak dihapus otomatis untuk menghindari penghapusan data tanpa tindakan eksplisit pemilik.
- Tampilan lokal pada 360 px dan 1440 px memiliki satu blok foto utama, tanpa overflow horizontal maupun galat konsol aplikasi.

## [2026-08-01] — Fondasi SEO dan editor artikel Markdown M6

### Ditambah

- Isi artikel mendukung Markdown: tautan internal, penekanan, daftar, subjudul tingkat tiga, kutipan, dan tabel GFM.
- Panel “Optimasi mesin pencari” pada formulir artikel untuk judul pencarian, deskripsi pencarian, dan fokus kata kunci.
- Kolom keterangan gambar atau alt text untuk gambar utama artikel.
- Endpoint `sitemap.xml` dan `robots.txt` dengan URL domain produksi.
- Schema JSON-LD `Article` dan `BreadcrumbList` pada halaman artikel.
- Open Graph serta Twitter Card global dan per artikel, termasuk aset pratinjau 1200×630.
- Canonical URL per artikel dan variabel lingkungan `NEXT_PUBLIC_URL_SITUS`.

### Diubah

- BUILD_SPEC dinaikkan dari v2.4 menjadi v2.5 untuk mencatat sumber isi Markdown serta metadata artikel.
- Daftar dan detail artikel memakai ISR lima menit.
- Gambar artikel dari Supabase Storage dapat diproses oleh optimasi gambar Next.js.

### Diperbaiki

- `tanggal_terbit` kini dibuat saat artikel diterbitkan, dipertahankan saat disunting, dan dikosongkan saat kembali menjadi draf.
- Preview tautan kini memiliki `metadataBase`, gambar berasio sosial, judul, deskripsi, dan URL absolut.
- Alt text gambar utama kini berasal dari isian Admin dengan fallback ke judul artikel.

### Catatan

- Migrasi `202608010007_m6_kolom_seo_artikel.sql` telah diterapkan pada Supabase hosted tanpa membuat konten bisnis.
- Instruksi pemilik pada 1 Agustus 2026 diperlakukan sebagai konfirmasi eksplisit untuk memulai M6; rilis produksi tetap menunggu validasi akhir dan peninjauan pemilik.
- Audit dependensi saat implementasi masih melaporkan tiga kerentanan tingkat tinggi pada rantai Next.js 16.2.10; pembaruan framework dicatat untuk penanganan terpisah agar tidak memperluas task SEO diam-diam.
- Build bersih, lint, tipe, metadata, Markdown, lima Artikel lama, sitemap, robots, dan JSON-LD telah lolos validasi akhir. Artikel teknis hosted dihapus setelah pengujian.
- Preview lokal Data Contoh dijalankan kembali untuk tinjauan pemilik; peninjauan visual 360px dan 1440px tetap menjadi langkah manual sebelum penggabungan.

## [2026-08-01] — Konsolidasi dokumentasi setelah penggabungan branch

### Diperbaiki

- Status aktif M5 yang sudah usang, judul task, langkah berikutnya, dan catatan audit yang terduplikasi dihapus dari `STATUS.md`.
- Hasil validasi dua akun Admin uji dipindahkan ke bagian validasi agar tidak tercampur dengan langkah berikutnya.
- Status validasi M6 pada `ROADMAP.md` diselaraskan dengan Task 18 yang sudah selesai.

### Catatan

- Urutan commit implementasi tetap `Task 7 → 8 → 9 → 1 → 2`, lalu Task 3–18; tidak ada source code task yang hilang atau ditulis ulang.

## [2026-07-31] — Kebijakan visual Produk berbantuan AI

### Diubah

- BUILD_SPEC dinaikkan dari v2.3 menjadi v2.4.
- Foto asli tetap diutamakan, tetapi gambar hasil AI dan penyempurnaan AI kini boleh dipakai untuk menambah serta mempercantik visual Produk.
- Visual yang bukan foto Produk nyata wajib diberi penanda “Visual ilustrasi”.

### Diperbaiki

- Kebijakan visual kini membedakan materi kreatif Produk dari bukti faktual. AI tetap dilarang untuk memalsukan atribut Produk, bukti donasi, transaksi, payout, atau penerima manfaat.

### Catatan

- Perubahan ini menggantikan larangan foto Produk AI pada keputusan terdahulu melalui KEP-036.
- Belum ada gambar Produk baru yang diunggah dalam perubahan dokumentasi ini.
- Revisi tetap berada pada tahap tinjauan M5 dan tidak memulai M6.

## [2026-07-31] — Akun Admin uji tambahan

### Ditambah

- Dua pengguna Auth teknis terkonfirmasi untuk menguji akses Admin selama peninjauan MVP.
- Dua keanggotaan aktif pada satu peran Admin yang sama, masing-masing berlabel “Admin Uji 2” dan “Admin Uji 3”.

### Diperbaiki

- Akses kedua akun divalidasi pada custom domain Production sampai Dasbor Admin menampilkan identitas yang sesuai dan alur keluar berhasil.

### Catatan

- Kata sandi sementara tidak dicatat dalam repository, dokumentasi, atau commit.
- Alamat pengujian memakai domain cadangan `example.com`, sehingga pengiriman pemulihan email tidak diandalkan.
- Kedua akun wajib dihapus atau kata sandinya diganti sebelum rilis publik M6. Perubahan ini tidak menambah peran Admin granular dan tidak memulai M6.

## [2026-07-29] — Identitas resmi dan katalog awal Mykonos

### Ditambah

- Logo resmi Wawangian Pelajar dalam format WebP untuk antarmuka dan PNG untuk ikon browser.
- Placeholder Produk Krem beserta migrasi constraint warna Supabase.
- Empat Produk nyata baru: Mykonos Royal Ispahan, Dreamscape, California Signature, dan California Blue.

### Diubah

- Palet seluruh website mengikuti color guide Warm Cream, Off-White, Deep Navy, Premium Teal, Muted Gold, dan Charcoal.
- Aset logo antarmuka dan favicon diganti dengan revisi simbol yang memenuhi kanvas lebih besar agar terbaca jelas pada ukuran kecil.
- Data Mykonos Monaco Royale diselaraskan dengan dokumen deskripsi terbaru tanpa menghapus foto produk nyata yang telah tersimpan.
- Lima Produk Mykonos diaktifkan dengan ukuran 100 ml, harga Rp549.000, serta tautan Shopee sesuai dokumen sumber.
- Formulir Admin menerima pilihan placeholder Krem.

### Diperbaiki

- Logo dan favicon tidak lagi memakai aset sementara.
- Referensi logo memakai nama aset baru agar cache optimasi gambar dan favicon tidak mempertahankan versi sebelumnya.
- Warna Produk Krem kini diterima oleh constraint database dan dapat disunting kembali melalui panel Admin.

### Dihapus

- Ikon logo sementara dari antarmuka dan aset publik.

### Catatan

- Batch ini tidak mengunggah foto Produk AI atau membuat tautan TikTok Shop. Monaco mempertahankan foto produk nyata yang sudah ada; empat Produk lain tetap memakai placeholder sampai foto asli tersedia.
- Penyempurnaan ini tetap berada pada tahap tinjauan M5 dan tidak memulai M6.

## [2026-07-28] — Penyempurnaan tinjauan M5

### Ditambah

- Produk nyata `Mykonos Monaco Royale 100ml` beserta profil aroma, harga, deskripsi, status aktif, dan tautan Shopee resmi.
- Status proses “Menyimpan produk...” pada formulir Admin agar respons Vercel tidak tampak sebagai kegagalan dan kirim ganda dapat dicegah.

### Diubah

- Batas muatan Server Action menjadi 6 MB agar selaras dengan foto maksimal 5 MB beserta field formulir multipart.
- Validasi jenis dan ukuran foto dijalankan sebelum data Produk dibuat atau diubah.

### Diperbaiki

- Unggahan foto berukuran lebih dari batas bawaan 1 MB tidak lagi ditolak Next.js sebelum mencapai validasi formulir.
- Galat slug ganda dan kegagalan penyimpanan Produk kini disajikan dalam Bahasa Indonesia.
- Perubahan Produk merevalidasi Beranda, Katalog, Temukan Wangimu, dan halaman detail berdasarkan slug.
- Baris dan bagian pada deskripsi Produk dipertahankan agar spesifikasi serta tips penggunaan lebih mudah dibaca.

### Catatan

- Foto Produk belum dipasang karena aset yang diberikan merupakan gambar AI. Placeholder dipertahankan sampai foto produk asli tersedia sesuai larangan foto produk AI.

## [2026-07-22] — Milestone M5

### Ditambah

- Landing “Jadi Afiliasi”, pendaftaran ber-handle, login, dashboard, panduan resmi, materi privat, dan leaderboard beralias.
- Migrasi Supabase untuk profil Afiliasi, tingkat bonus, laporan, rekonsiliasi bonus, materi, RLS, Log Audit, serta tiga bucket privat.
- Panel Admin Afiliasi untuk koreksi/verifikasi handle, konfigurasi tingkat nyata, unggah CSV, payout berbukti, dan materi promosi.
- Rekonsiliasi CSV `handle,jumlah_pcs` dengan penggabungan handle ganda dan batas 5.000 baris.
- Akun Afiliasi teknis berlabel uji untuk validasi login dan seluruh portal terlindungi tanpa transaksi bisnis fiktif.
- Simulasi lokal berlabel untuk bonus top-up, tiga tingkat, empat riwayat rekonsiliasi, dan leaderboard lima alias pada akun `AfiliasiUji`.
- Tautan “Coba contoh” pada `/temukan` untuk membuka skenario `Fresh · Siang · Kuliah / Kerja` beserta tiga rekomendasi Produk contoh.

### Diubah

- Navigasi publik, footer, dasbor Admin, dan navigasi Admin terhubung ke Portal Afiliasi M5.
- Alur konfirmasi Supabase menerima pendaftaran Afiliasi selain undangan Admin.
- Dashboard memisahkan komisi dasar marketplace dari bonus top-up Wawangian Pelajar secara tegas.
- Mode `MODE_PRATINJAU_DATA_CONTOH` mencakup portal akun Afiliasi uji tanpa membuat laporan, bonus, atau payout di Supabase.
- Kuis “Temukan Wangimu” memakai form GET dan parameter URL sebagai alur utama sehingga pilihan manual, demo cepat, muat ulang, dan pengulangan tetap konsisten.
- Mode Data Contoh dapat diaktifkan pada Vercel Preview melalui variabel lingkungan khusus, sementara Vercel Production tetap memaksa data nyata atau keadaan kosong.
- Mode Data Contoh diperluas ke Vercel Production selama tahap MVP tertutup dengan sakelar eksplisit, label simulasi, dan tanpa mutasi Supabase.
- Pemberitahuan publik, Donasi, dan Portal Afiliasi memakai istilah “peninjauan MVP” agar sesuai untuk lokal maupun Vercel.

### Diperbaiki

- Tarif bonus dan angka penjualan contoh wireframe tidak ditanam ke database atau antarmuka sebagai data nyata.
- Pendaftaran tanpa handle ditolak sebelum akun dibuat; payout tanpa bukti ditolak oleh database.
- Laporan, materi, dan bukti bonus tidak tersedia secara publik; leaderboard tidak mengekspos identitas atau handle.
- Data serta Log Audit uji rekonsiliasi tidak tertinggal karena seluruh validasi hosted dijalankan dalam transaksi rollback.
- Trigger profil Afiliasi kini mengabaikan pengguna Auth tanpa metadata `jenis_akun=afiliasi`; migrasi koreksi terpisah diterapkan pada database hosted.
- Kontrol kuis tidak lagi bergantung penuh pada hidrasi JavaScript; seluruh 32 kombinasi jawaban tervalidasi menghasilkan rekomendasi Produk contoh tanpa mutasi data hosted.
- Deployment branch/PR Vercel tidak lagi kehilangan data contoh hanya karena Next.js memakai `NODE_ENV=production`; pemeriksaan `VERCEL_ENV=preview` kini membedakan Preview dari Production.
- Sakelar Data Contoh tidak lagi ditolak oleh pemeriksaan lingkungan Production sehingga pemilik dapat meninjau deployment `main` yang terisi sebelum rilis publik.

## [2026-07-22] — Milestone M4

### Ditambah

- Jembatan marketplace hybrid: satu tautan membuka toko langsung dan dua tautan menampilkan dialog pilihan.
- Simulasi dialog marketplace khusus data contoh tanpa tautan keluar atau pencatatan analitik palsu.
- Halaman `/temukan` dengan tiga pertanyaan, pemeringkatan rekomendasi, alasan kecocokan, dan hasil shareable melalui URL.
- Tautan Temukan Wangimu pada navbar, footer, Beranda, dan Katalog.
- Validasi URL HTTPS serta domain resmi Shopee dan TikTok Shop pada penyimpanan Produk.

### Diubah

- Detail Produk mengaktifkan tombol marketplace M4 dan mempertahankan pesan misi Dana Cahaya Pendidikan sebelum tombol beli.
- Halaman Analitik menjelaskan bahwa KlikKeluar mengukur minat dan bukan komisi afiliasi.
- API KlikKeluar memberikan respons terkontrol ketika layanan Supabase belum tersedia.

### Diperbaiki

- Klik data contoh tidak dikirim ke Supabase sehingga analitik bisnis tetap hanya berisi interaksi Produk nyata.
- Hasil kuis tidak membutuhkan akun atau penyimpanan jawaban; kombinasi dapat dimuat kembali dari parameter URL yang divalidasi.

## [2026-07-22] — Penyempurnaan pratinjau M3

### Ditambah

- Mode pratinjau lokal berlabel untuk menampilkan delapan Produk contoh dan lima Artikel contoh saat Supabase bisnis masih kosong.
- Simulasi transparansi Donasi dengan dua rekap, dua penyaluran, saldo aritmetis yang konsisten, serta SVG bukti bertuliskan “Bukan Transaksi Nyata”.
- Banner global “Data Contoh” pada seluruh halaman publik ketika mode pratinjau aktif.

### Diubah

- README dan `.env.example` mendokumentasikan `MODE_PRATINJAU_DATA_CONTOH` serta batas penggunaannya.
- Sumber data Donasi membedakan data Supabase dan simulasi lokal agar antarmuka dapat memberi label yang sesuai.

### Diperbaiki

- Preview lokal tidak lagi terlihat kosong ketika kueri Supabase berhasil tetapi belum memiliki Produk, Artikel, atau data Donasi.
- Mode contoh secara teknis dinonaktifkan pada build produksi dan tidak melakukan mutasi ke Supabase.

## [2026-07-21] — Milestone M3

### Ditambah

- Migrasi Supabase untuk rekap donasi, penyaluran berbukti, saldo amanah, Log Audit, RLS, RPC publik, dan bucket `bukti-donasi`.
- Panel Admin Donasi untuk rekap untung bersih, pratinjau 20%, penyaluran draft/terpublikasi, unggah bukti, dan tautan Cerita Misi.
- Halaman Transparansi Donasi publik dengan angka terkumpul, tersalurkan, saldo amanah, metode periode, riwayat, dan detail bukti.
- Halaman Log Audit untuk memeriksa aksi sensitif Produk, Artikel, rekap, dan penyaluran.

### Diubah

- Homepage dan dasbor Admin membaca ringkasan donasi nyata dari Supabase.
- Navigasi Admin menambahkan Donasi dan Log Audit.
- Supabase hosted menerima migrasi M3 dan hak akses tabel yang dibatasi sesuai peran.

### Diperbaiki

- Jumlah donasi tidak dapat diketik bebas karena dihitung database sebagai 20% dari untung bersih.
- Publikasi penyaluran tanpa bukti dan penyaluran yang melebihi saldo amanah ditolak di server serta database.
- Laba bersih mentah tidak diekspos ke publik; pengunjung hanya memakai RPC ringkasan dan metode aman.
- Kegagalan membaca Supabase ditandai sebagai data belum tersedia dan tidak lagi disamarkan sebagai angka nol.
- Bucket bukti tidak mengizinkan pengunjung membuat daftar seluruh nama berkas meskipun URL bukti terpublikasi dapat dibuka.

### Dihapus

- Seluruh data, Log Audit, dan berkas bukti teknis sementara setelah validasi end-to-end berhasil.

## [2026-07-21] — Milestone M2

### Ditambah

- Migrasi Supabase untuk Admin, Produk, Artikel, KlikKeluar, RLS, Storage, dan fungsi pencatatan klik.
- Login/logout Admin, proteksi sesi, dasbor, dan navigasi panel yang responsif.
- CRUD Produk dengan unggah foto asli, soft-delete, data karakter/okasi, serta validasi BR-4 di server dan database.
- CRUD Artikel dengan draft/terbit, editor teks terstruktur, gambar utama, share, dan CTA otomatis.
- Halaman Analitik Klik-Keluar dengan kondisi nol yang jujur.
- Skrip bootstrap akun Admin yang hanya membaca rahasia dari `.env.local`.
- Migrasi hak tabel dasar untuk peran `anon` dan `authenticated` dengan RLS tetap sebagai pembatas baris.

### Diubah

- Konfigurasi Supabase menerima kunci publishable baru dengan kompatibilitas kunci anon lama.
- Homepage, Katalog, Detail Produk, daftar Konten, dan Artikel dapat membaca data aktif/terbit dari Supabase.
- Data contoh M1 menjadi fallback berlabel saat schema Supabase belum diterapkan.
- Migrasi M2 diterapkan pada proyek Supabase hosted dan akun Admin awal diundang melalui dashboard tanpa menyimpan kata sandi atau service-role.
- Kata sandi sementara akun Admin ditetapkan satu kali melalui SDK Admin resmi di lingkungan server sementara, lalu login panel berhasil diuji.

### Diperbaiki

- Rute Admin menolak sesi tanpa keanggotaan `pengguna_admin` aktif.
- Produk racikan sendiri ditolak bila profil aromanya memuat nama merek asli.
- Produk nonaktif dan artikel draft tidak dapat tampil melalui kebijakan publik setelah schema diaktifkan.
- Tautan undangan atau pemulihan Admin kini diproses pada `/admin/undangan`, mendukung sesi implicit maupun PKCE, dan tidak lagi berhenti pada halaman localhost tanpa alur pembuatan kata sandi.
- Hak `SELECT`, `INSERT`, `UPDATE`, dan `DELETE` yang diperlukan diberikan pada tabel M2 sehingga kebijakan RLS dapat bekerja dan profil Admin tidak lagi gagal dengan `permission denied`.

## [2026-07-21] — Milestone M1

### Ditambah

- Layout publik global dengan navbar desktop, drawer mobile, dan footer.
- Homepage lengkap berdasarkan wireframe, termasuk state donasi awal dan penyembunyian otomatis blok ulasan kosong.
- Katalog data contoh dengan pencarian, filter kategori, pengurutan, grid responsif, dan state kosong.
- Detail Produk dengan galeri placeholder, profil aroma, label “Racikan Sendiri”, pesan misi, dan produk terkait.
- Daftar Konten dengan filter kategori serta halaman Artikel dengan share dan CTA kontekstual.
- Halaman “segera hadir” untuk Donasi dan Afiliasi agar cabang navigasi tidak buntu tanpa mendahului milestone.
- Data contoh produk dan artikel yang dipusatkan dalam modul terpisah.

### Diubah

- Halaman penanda fondasi M0 diganti dengan website publik statis M1.
- Struktur rute publik mengikuti route group App Router.
- Placeholder visual dan ikon digunakan secara konsisten sampai aset asli tersedia.

### Diperbaiki

- Angka donasi contoh pada wireframe tidak digunakan; Homepage menampilkan “Perjalanan baru dimulai”.
- Testimoni contoh tidak ditampilkan untuk mencegah fabrikasi bukti sosial.
- Tombol marketplace dinonaktifkan sampai integrasi dan pencatatan KlikKeluar dibangun pada M4.
- Bilah scrollbar chip filter disembunyikan tanpa menghilangkan fungsi geser mobile.

## [2026-07-21] — Milestone M0

### Ditambah

- Fondasi Next.js App Router, TypeScript, Tailwind CSS, dan ESLint.
- Struktur awal `app`, `components`, `lib`, dan `public` sesuai rencana proyek.
- Klien Supabase untuk browser dan server serta `.env.example` tanpa rahasia.
- Halaman penanda fondasi yang responsif pada 360px dan 1440px.
- Ikon logo SVG sementara dengan palet brand.
- Panduan setup lokal, Supabase, GitHub, dan Vercel.

### Diubah

- README awal GitHub diganti dengan dokumentasi proyek lengkap.
- ROADMAP dan STATUS diperbarui untuk mencerminkan penyelesaian M0.
- Metadata, bahasa dokumen HTML, dan gaya global disesuaikan untuk Wawangian Pelajar.

### Diperbaiki

- Pengamanan `.gitignore` memastikan berkas environment rahasia diabaikan sementara `.env.example` tetap dilacak.
- Font eksternal bawaan scaffold dihapus agar halaman awal lebih ringan dan build tidak bergantung pada jaringan font.

## [Belum Dirilis]

### Ditambah

- Inisiasi dokumen tata kelola proyek: BUILD_SPEC.md, ROADMAP.md, STATUS.md, DECISIONS.md, CHANGELOG.md, README.md (12 Juli 2026).

### Catatan

- M1 belum dimulai dan menunggu konfirmasi pemilik setelah M0 ditinjau.

---

<!--
Template entri untuk Agent:

## [Tanggal YYYY-MM-DD] — Milestone MX

### Ditambah
- (fitur baru)

### Diubah
- (perubahan perilaku/tampilan)

### Diperbaiki
- (bug yang diperbaiki)

### Dihapus
- (fitur/kode yang dibuang)
-->
