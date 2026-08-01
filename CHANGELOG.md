# CHANGELOG.md — Riwayat Perubahan Aplikasi

> Catatan bertanggal semua perubahan aplikasi. Riwayat lama tidak boleh dihapus.

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
