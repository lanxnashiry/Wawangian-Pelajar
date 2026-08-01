# STATUS.md — Posisi Terkini Pengerjaan

> Dokumen ini selalu mencerminkan kondisi terkini. Riwayat lengkap perubahan tersedia di `CHANGELOG.md`.

**Terakhir diperbarui:** 31 Juli 2026
**Milestone aktif:** M5 — Portal Afiliasi
**Status milestone aktif:** Selesai secara teknis; menunggu tinjauan dan konfirmasi pemilik sebelum M6

---

## Posisi saat ini

M4 telah dikonfirmasi pemilik dan hasil teknis M5 beserta penyempurnaan formulir Produk, identitas visual, serta katalog awal sudah digabungkan ke `main`. Dokumentasi dua akun Admin uji tambahan dikerjakan pada branch `codex/m5-admin-uji-tambahan`. Portal Afiliasi kini menyediakan landing publik, pendaftaran Supabase Auth, login, dashboard, panduan resmi, materi promosi privat, leaderboard beralias, dan pengelolaan Admin.

Schema M5 telah diterapkan pada Supabase hosted. Database memisahkan profil Afiliasi, tingkat bonus, laporan platform, hasil rekonsiliasi bonus, dan materi promosi; RLS membatasi setiap afiliasi pada profil serta bonus miliknya dan menjaga laporan/payout untuk Admin.

Satu akun Afiliasi teknis beralias `AfiliasiUji` tersedia khusus untuk peninjauan M5. Supabase hosted tetap tidak memiliki laporan, bonus, payout, atau posisi leaderboard untuk akun tersebut. Saat mode Data Contoh aktif, aplikasi menggantinya dengan simulasi berlabel agar Dashboard, progres tingkat, riwayat, dan leaderboard dapat ditinjau tanpa dianggap sebagai aktivitas bisnis nyata. Akun ini wajib dihapus sebelum rilis publik M6.

Penyempurnaan pratinjau publik membuat `/temukan` dapat dicoba dengan Produk contoh melalui kuis manual maupun tautan “Coba contoh”. Jawaban dikirim sebagai parameter GET sehingga pemilihan, hasil, muat ulang, dan pengulangan tetap berfungsi tanpa bergantung penuh pada hidrasi JavaScript. Skenario cepat memakai `Fresh · Siang · Kuliah / Kerja` dan seluruh hasil tetap berlabel Data Contoh.

Mode Data Contoh kini dapat dipakai pada Development, Vercel Preview, dan Vercel Production MVP ketika sakelar khusus aktif. Production ditujukan untuk peninjauan terbatas, seluruh simulasi tetap berlabel, dan perubahan ini tidak membuat data hosted maupun memulai M6.

Peninjauan panel Produk menemukan bahwa penyimpanan tanpa foto sebenarnya berhasil, tetapi tidak memiliki indikator proses sehingga tampak gagal selama respons Vercel berlangsung. Batas unggahan Server Action juga masih 1 MB meskipun formulir menyatakan maksimal 5 MB. Perbaikan berada pada branch `codex/m5-perbaiki-formulir-produk`: batas muatan menjadi 6 MB untuk menampung foto 5 MB beserta data formulir, validasi file dijalankan sebelum mutasi, tombol mencegah kirim ganda, dan pesan galat dibuat lebih jelas.

Identitas visual resmi telah menggantikan ikon sementara. Revisi simbol logo dari pemilik kini memenuhi kanvas lebih besar agar terbaca jelas pada navbar, footer, halaman autentikasi, dan favicon; nama aset baru mencegah cache browser atau Vercel mempertahankan logo lama. Palet website tetap mengikuti color guide Warm Cream, Off-White, Deep Navy, Premium Teal, Muted Gold, dan Charcoal. Placeholder Produk `krem` ditambahkan melalui migrasi terpisah agar tetap konsisten dengan sistem warna.

Lima Produk nyata Mykonos telah disimpan pada Supabase hosted dan tampil aktif pada katalog publik: Monaco Royale, Royal Ispahan, Dreamscape, California Signature, dan California Blue, seluruhnya berukuran 100 ml dengan harga Rp549.000. Kelimanya memakai tautan Shopee yang sama sesuai dokumen sumber dan tidak diberi tautan TikTok Shop. Monaco mempertahankan satu foto produk nyata yang sudah tersimpan; empat Produk lain tetap memakai placeholder karena tidak ada foto asli dalam sumber. Tidak ada gambar produk AI yang diunggah.

Dua akun Admin teknis tambahan, `admin.uji2@example.com` dan `admin.uji3@example.com`, telah dibuat dalam keadaan terkonfirmasi dan diaktifkan pada satu peran Admin yang sama. Keduanya hanya untuk pengujian akses selama peninjauan MVP, bukan peran organisasi baru atau Admin bertingkat. Login keduanya pada custom domain Production telah berhasil; kata sandi sementara hanya disampaikan kepada pemilik dan tidak disimpan dalam repository maupun dokumentasi. Akun wajib dihapus atau kata sandinya diganti sebelum rilis publik M6.

## Task M5

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
12. ✅ Identitas visual resmi — logo, favicon, dan palet color guide diterapkan tanpa memulai M6.
13. ✅ Katalog awal — lima Produk Mykonos nyata diunggah dan divalidasi pada Admin serta halaman publik.

## Validasi yang sudah dilakukan

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
- Produk nyata dapat dibuka melalui slug publik, menampilkan harga Rp549.000, profil aroma lengkap, serta satu tautan Shopee yang valid.
- Build produksi memuat `serverActions.bodySizeLimit=6mb`; `npm.cmd run lint`, `npm.cmd run build`, dan `git diff --check` berhasil.
- Migrasi `202607290006_tambah_placeholder_produk_krem.sql` berhasil diterapkan pada Supabase hosted.
- Batch katalog menghasilkan tepat lima Produk aktif dengan harga Rp549.000, kategori Ori, ukuran 100 ml, placeholder Krem, dan tautan Shopee sesuai dokumen sumber.
- `/admin/produk` menampilkan tepat lima baris Produk dan `/katalog` menampilkan tepat lima kartu Produk aktif.
- Halaman detail Dreamscape dan Monaco berhasil dibuka pada custom domain; Monaco mempertahankan foto produk nyata yang telah ada, sedangkan Produk tanpa foto menampilkan placeholder.
- Logo resmi, warna global, halaman publik, login Admin, dan login Afiliasi telah diperiksa pada viewport 360px dan 1440px tanpa overflow horizontal atau galat konsol aplikasi.
- Revisi logo simbol berhasil dimuat melalui URL aset baru pada Beranda dan halaman masuk Admin; komposisinya terlihat lebih besar pada kotak 46–48 px tanpa mengubah tinggi navigasi.
- Dua pengguna Auth Admin uji tambahan terkonfirmasi dan masing-masing memiliki baris `pengguna_admin` aktif.
- Login Production `admin.uji2@example.com` menampilkan identitas “Admin Uji 2” pada Dasbor Admin dan berhasil keluar.
- Login Production `admin.uji3@example.com` menampilkan identitas “Admin Uji 3” pada Dasbor Admin dan berhasil keluar.
- `npm.cmd run lint`, `npm.cmd run build`, `git diff --check`, dan pemeriksaan rahasia berhasil setelah dokumentasi akun; server lokal kembali memberi respons HTTP 200 pada port 3000.

## Langkah berikutnya

1. Pemilik meninjau formulir Produk, identitas visual resmi, lima Produk Mykonos, dan dua akun Admin uji melalui Production serta pull request.
2. Pemilik menyediakan foto asli untuk Royal Ispahan, Dreamscape, California Signature, dan California Blue; gambar AI tidak digunakan sebagai foto Produk.
3. Pemilik menentukan nama tingkat, batas minimal pcs, dan nominal bonus per pcs nyata melalui `/admin/afiliasi`.
4. Pemilik menambahkan materi promosi serta laporan platform nyata setelah tersedia.
5. Pemilik memastikan custom domain Production dan preview tercantum pada Redirect URLs Supabase.
6. Pemilik mengganti kata sandi atau menghapus kedua akun Admin uji tambahan sebelum rilis publik.
7. Pemilik mengganti kata sandi Admin utama sementara sebelum produksi.
8. Pemilik menghapus akun `AfiliasiUji` dari Supabase Auth sebelum rilis produksi M6.
9. Setelah hasil ditinjau, pemilik mengonfirmasi penggabungan branch ke `main`; M6 tetap tidak boleh dimulai tanpa konfirmasi eksplisit.

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
- Foto Monaco yang sudah tersimpan dipertahankan setelah pemeriksaan memastikan foto tersebut merupakan foto produk nyata. Empat Produk lain menunggu foto asli dari pemilik.
- Afiliasi nyata, materi, tarif, laporan, dan payout bisnis menyusul dari pemilik. `AfiliasiUji` hanya identitas teknis untuk peninjauan.
- Batas Server Action 6 MB hanya menyediakan ruang untuk foto maksimal 5 MB beserta field multipart; validasi aplikasi dan bucket Storage tetap membatasi file produk pada JPEG/PNG/WebP maksimal 5 MB.
- Dua akun Admin tambahan memakai peran Admin tunggal yang sama sesuai BR-10 dan hanya menjadi akses teknis pengujian, bukan perluasan scope menjadi peran granular.

## Batas scope yang tetap dijaga

- Tidak ada checkout, keranjang, pembayaran, akun pembeli, wishlist, atau pengelolaan ongkir.
- Tidak ada pelacakan atau pembayaran komisi dasar buatan website.
- Tidak ada payout otomatis, integrasi bank, klaim pendapatan, tarif bonus, klaim anggota nyata, atau leaderboard palsu.
- Tidak ada Sales Academy, sertifikat, notifikasi otomatis, loyalitas, atau peran Admin granular.
- Tidak ada foto produk AI, klaim organisasi, banting harga, atau klaim promosi palsu.
- M6 belum dimulai.

## Catatan dan kendala

- Custom domain Production aktif pada `https://www.wawangianpelajar.com`; domain tanpa `www` mengalihkan ke domain utama.
- Redirect URL konfirmasi Afiliasi perlu dipastikan mencakup `https://www.wawangianpelajar.com/auth/konfirmasi`.
- Data bisnis M5 di Supabase masih kosong secara sengaja; isi portal akun uji berasal dari simulasi lokal berlabel dan tidak membuat tingkat, laporan, bonus, materi, atau payout hosted.
- Login dua akun Admin uji tambahan telah tervalidasi pada custom domain. Alamatnya memakai domain cadangan `example.com`, sehingga pemulihan atau undangan melalui email tidak diandalkan; pengelolaan kata sandi dilakukan langsung oleh pemilik dan nilainya tidak disimpan dalam dokumentasi atau repository.
- Empat dari lima Produk masih memakai placeholder Krem karena sumber terbaru tidak memuat foto produk asli. Foto nyata Monaco yang telah ada tetap dipakai.
- `npm audit --omit=dev` dari M0 masih mencatat dua kerentanan sedang pada PostCSS bawaan Next.js; belum ada perbaikan kompatibel.

---

`STATUS.md` diperbarui setiap akhir sesi kerja.
