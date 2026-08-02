# STATUS.md — Posisi Terkini Pengerjaan

> Dokumen ini selalu mencerminkan kondisi terkini. Riwayat lengkap perubahan tersedia di `CHANGELOG.md`.

**Terakhir diperbarui:** 2 Agustus 2026
**Milestone aktif:** M6 — Poles & Rilis
**Status milestone aktif:** Batch fondasi SEO artikel selesai secara teknis; menunggu tinjauan visual pemilik dan task rilis M6 lainnya

---

## Posisi saat ini

Instruksi pemilik pada 1 Agustus 2026 untuk mengerjakan rangkaian revisi SEO diperlakukan sebagai konfirmasi eksplisit memulai M6. Task fondasi dikerjakan dalam urutan `7 → 8 → 9 → 1 → 2`, dilanjutkan Task 3–18, dan setiap task memiliki commit terpisah sesuai rencana.

Fondasi SEO Artikel kini mencakup kolom database khusus, editor Markdown aman, panel metadata Admin, alt text, ISR lima menit, canonical, Open Graph, Twitter Card, sitemap, robots, optimasi gambar Supabase, serta JSON-LD `Article` dan `BreadcrumbList`. Artikel lama tetap memiliki fallback dari `bagian` dan artikel baru menyimpan Markdown mentah tanpa mengeksekusi HTML.

Metadata beranda, Open Graph, dan Twitter Card kini menargetkan frasa “Decant Parfum Original untuk Mahasiswa” dengan deskripsi pilihan mulai 5 ml serta misi 20% laba untuk pendidikan. Istilah “laba” tetap merujuk keuntungan bersih sesuai BR-1. Katalog hosted saat ini berukuran paling kecil 15 ml, sehingga klaim “mulai 5 ml” perlu dikonfirmasi atau direvisi sebelum rilis publik luas.

M5 telah selesai sebagai landasan. Portal Afiliasi menyediakan landing publik, pendaftaran Supabase Auth, login, dashboard, panduan resmi, materi promosi privat, leaderboard beralias, dan pengelolaan Admin.
M4 telah dikonfirmasi pemilik dan hasil teknis M5 beserta penyempurnaan formulir Produk, identitas visual, serta katalog awal sudah digabungkan ke `main`. Dokumentasi dua akun Admin uji tambahan dikerjakan pada branch `codex/m5-admin-uji-tambahan`. Portal Afiliasi kini menyediakan landing publik, pendaftaran Supabase Auth, login, dashboard, panduan resmi, materi promosi privat, leaderboard beralias, dan pengelolaan Admin.

Schema M5 telah diterapkan pada Supabase hosted. Database memisahkan profil Afiliasi, tingkat bonus, laporan platform, hasil rekonsiliasi bonus, dan materi promosi; RLS membatasi setiap afiliasi pada profil serta bonus miliknya dan menjaga laporan/payout untuk Admin.

Satu akun Afiliasi teknis beralias `AfiliasiUji` tersedia khusus untuk peninjauan M5. Supabase hosted tetap tidak memiliki laporan, bonus, payout, atau posisi leaderboard untuk akun tersebut. Saat mode Data Contoh aktif, aplikasi menggantinya dengan simulasi berlabel agar Dashboard, progres tingkat, riwayat, dan leaderboard dapat ditinjau tanpa dianggap sebagai aktivitas bisnis nyata. Akun ini wajib dihapus sebelum rilis publik M6.

Penyempurnaan pratinjau publik membuat `/temukan` dapat dicoba dengan Produk contoh melalui kuis manual maupun tautan “Coba contoh”. Jawaban dikirim sebagai parameter GET sehingga pemilihan, hasil, muat ulang, dan pengulangan tetap berfungsi tanpa bergantung penuh pada hidrasi JavaScript. Skenario cepat memakai `Fresh · Siang · Kuliah / Kerja` dan seluruh hasil tetap berlabel Data Contoh.

Mode Data Contoh dapat dipakai pada Development, Vercel Preview, dan Vercel Production MVP ketika sakelar khusus aktif. Production ditujukan untuk peninjauan terbatas, seluruh simulasi tetap berlabel, dan perubahan ini tidak membuat data hosted.

Peninjauan panel Produk menemukan bahwa penyimpanan tanpa foto sebenarnya berhasil, tetapi tidak memiliki indikator proses sehingga tampak gagal selama respons Vercel berlangsung. Batas unggahan Server Action juga masih 1 MB meskipun formulir menyatakan maksimal 5 MB. Perbaikan berada pada branch `codex/m5-perbaiki-formulir-produk`: batas muatan menjadi 6 MB untuk menampung foto 5 MB beserta data formulir, validasi file dijalankan sebelum mutasi, tombol mencegah kirim ganda, dan pesan galat dibuat lebih jelas.

Identitas visual resmi telah menggantikan ikon sementara. Revisi simbol logo dari pemilik kini memenuhi kanvas lebih besar agar terbaca jelas pada navbar, footer, halaman autentikasi, dan favicon; nama aset baru mencegah cache browser atau Vercel mempertahankan logo lama. Palet website tetap mengikuti color guide Warm Cream, Off-White, Deep Navy, Premium Teal, Muted Gold, dan Charcoal. Placeholder Produk `krem` ditambahkan melalui migrasi terpisah agar tetap konsisten dengan sistem warna.

Katalog Supabase hosted kini memuat 15 Produk aktif: Monaco Royale, Royal Ispahan, Dreamscape, California Signature, dan California Blue masing-masing pada ukuran 100 ml, 50 ml, dan 15 ml. Harga setiap ukuran telah ditetapkan menjadi Rp539.000 untuk 100 ml, Rp289.000 untuk 50 ml, dan Rp119.000 untuk 15 ml; kelimanya tetap memakai tautan Shopee sumber dan tidak diberi tautan TikTok Shop. Monaco 100 ml mempertahankan satu foto yang sudah tersimpan; sepuluh varian baru tidak menyalin foto ukuran 100 ml agar visual tidak menyesatkan.

Pemilik merevisi kebijakan visual pada 31 Juli 2026: foto asli tetap diutamakan, tetapi gambar hasil AI atau penyempurnaan AI kini boleh dipakai untuk menambah dan mempercantik visual Produk. Gambar yang bukan foto Produk nyata wajib ditandai “Visual ilustrasi” dan tidak boleh memalsukan atribut Produk atau dipakai sebagai bukti faktual. Belum ada gambar baru yang diunggah sebagai bagian dari perubahan kebijakan ini.

Detail Produk kini mengikuti kemampuan formulir Admin: setiap Produk hanya menampilkan satu foto utama. Thumbnail placeholder “Tampak depan”, “Detail botol”, dan “Kemasan” dihapus, sedangkan unggahan baru menggantikan satu referensi foto utama lama tanpa menghapus berkas Storage secara otomatis.

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
7. ✅ Dokumentasi KEP-037 sampai KEP-045, BUILD_SPEC v2.8, README, ROADMAP, STATUS, dan CHANGELOG.
8. ✅ Validasi akhir bersih, uji alur artikel lengkap, regresi artikel lama, pembersihan artikel teknis, dan preview lokal.
9. ✅ Katalog hosted berisi tepat 15 Produk Mykonos: lima aroma pada ukuran 100 ml, 50 ml, dan 15 ml.
10. ✅ Harga 15 Produk ditetapkan berdasarkan ukuran dan input harga Admin tidak lagi menampilkan stepper.

## Validasi yang sudah dilakukan

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

1. Pemilik meninjau halaman Artikel dan formulir Admin pada 360px serta 1440px melalui preview lokal.
2. Pemilik meninjau formulir Produk, identitas visual resmi, 15 Produk Mykonos, dan akun Admin uji melalui Production serta pull request aktif.
3. Pemilik menambahkan `NEXT_PUBLIC_URL_SITUS=https://www.wawangianpelajar.com` pada Vercel Preview dan Production sebelum redeploy.
4. Pemilik memastikan custom domain Production dan Preview tercantum pada Redirect URLs Supabase.
5. Pemilik menyediakan Konten awal Artikel, foto atau visual ilustrasi Produk terpilih, serta data bisnis Afiliasi nyata ketika sudah tersedia.
6. Sebelum rilis publik, matikan Data Contoh, hapus akun `AfiliasiUji`, serta ganti kata sandi atau hapus seluruh akun Admin uji dan Admin utama sementara.
7. Setelah hasil ditinjau, pemilik mengonfirmasi penggabungan pull request aktif ke `main`, lalu mengirim sitemap ke Google Search Console.

## Asumsi yang berlaku

- Email dan kata sandi dipakai untuk autentikasi Afiliasi; WhatsApp hanya data kontak karena autentikasi SMS tidak dikonfigurasi.
- Minimal salah satu handle TikTok Shop atau Shopee wajib dan disimpan tanpa awalan `@` untuk pencocokan stabil.
- Pendaftar berstatus `menunggu`; panduan, materi, dan leaderboard baru terbuka setelah Admin mengaktifkan profil.
- Tarif bonus tidak diisi data contoh. Admin wajib menetapkan tingkat serta nilai bisnis nyata sebelum laporan dapat diproses.
- Nilai bonus, tingkat, riwayat, dan peringkat contoh hanya dihitung dari berkas lokal ketika mode data contoh aktif untuk akun `AfiliasiUji`; nilai tersebut bukan tarif atau kewajiban bisnis.
- Produk dan jawaban contoh pada `/temukan` hanya dipakai saat mode data contoh aktif, tidak disimpan sebagai jawaban pengguna, dan tidak membuat data Supabase.
- Mode contoh boleh dipasang pada Vercel Production selama tahap MVP tertutup; seluruh reviewer harus memahami label simulasi dan sakelar wajib dimatikan sebelum rilis publik M6.
- CSV M5 sengaja hanya membutuhkan `handle` dan `jumlah_pcs`; website tidak menyimpan, menghitung, atau membayar komisi dasar marketplace.
- Laporan, materi, dan bukti bonus disimpan pada bucket privat. Materi diberikan lewat URL bertanda tangan yang berlaku 10 menit.
- Leaderboard hanya menampilkan alias dan jumlah pcs bulan berjalan; identitas, WhatsApp, email, dan handle tidak dipublikasikan.
- Lima Produk Mykonos ditampilkan aktif karena pemilik meminta unggahan katalog awal. Harga, ukuran, profil aroma, dan deskripsi mengikuti dokumen sumber tanpa klaim tambahan.
- Satu tautan Shopee dipakai untuk kelima Produk karena dokumen sumber memberikan URL yang sama. Tautan TikTok Shop dibiarkan kosong.
- Foto Monaco yang sudah tersimpan dipertahankan. Empat Produk lain menunggu foto asli atau visual AI terpilih dari pemilik; penggunaan AI wajib diberi penanda “Visual ilustrasi” bila bukan foto Produk nyata.
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
- Data bisnis M5 di Supabase masih kosong secara sengaja; isi portal akun uji berasal dari simulasi lokal berlabel dan tidak membuat tingkat, laporan, bonus, materi, atau payout hosted.
- Login Admin lokal berhasil dipakai untuk pengujian Task 3; kata sandi tetap tidak disimpan dalam dokumentasi atau repository.
- `NEXT_PUBLIC_URL_SITUS` wajib ditambahkan pada Vercel Production dan Preview sebelum deployment SEO ditinjau.
- `npm audit --omit=dev` mencatat tiga kerentanan tingkat tinggi pada rantai Next.js 16.2.10, PostCSS, dan Sharp. Perbaikan memerlukan pembaruan framework di luar task SEO dan harus ditangani secara terpisah.
- Login dua akun Admin uji tambahan telah tervalidasi pada custom domain. Alamatnya memakai domain cadangan `example.com`, sehingga pemulihan atau undangan melalui email tidak diandalkan; pengelolaan kata sandi dilakukan langsung oleh pemilik dan nilainya tidak disimpan dalam dokumentasi atau repository.
- Empat dari lima Produk masih memakai placeholder Krem karena sumber terbaru tidak memuat foto produk asli. Foto nyata Monaco yang telah ada tetap dipakai.

---

`STATUS.md` diperbarui setiap akhir sesi kerja.
