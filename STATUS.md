# STATUS.md — Posisi Terkini Pengerjaan

> Dokumen ini selalu mencerminkan kondisi terkini. Riwayat lengkap perubahan tersedia di `CHANGELOG.md`.

**Terakhir diperbarui:** 22 Juli 2026
**Milestone aktif:** M5 — Portal Afiliasi
**Status milestone aktif:** Selesai secara teknis; menunggu tinjauan dan konfirmasi pemilik sebelum M6

---

## Posisi saat ini

M4 telah dikonfirmasi pemilik dan hasil teknis M5 sudah digabungkan ke `main`. Penyempurnaan Production MVP dikerjakan pada branch `codex/m5-data-contoh-production`. Portal Afiliasi kini menyediakan landing publik, pendaftaran Supabase Auth, login, dashboard, panduan resmi, materi promosi privat, leaderboard beralias, dan pengelolaan Admin.

Schema M5 telah diterapkan pada Supabase hosted. Database memisahkan profil Afiliasi, tingkat bonus, laporan platform, hasil rekonsiliasi bonus, dan materi promosi; RLS membatasi setiap afiliasi pada profil serta bonus miliknya dan menjaga laporan/payout untuk Admin.

Satu akun Afiliasi teknis beralias `AfiliasiUji` tersedia khusus untuk peninjauan M5. Supabase hosted tetap tidak memiliki laporan, bonus, payout, atau posisi leaderboard untuk akun tersebut. Saat mode Data Contoh aktif, aplikasi menggantinya dengan simulasi berlabel agar Dashboard, progres tingkat, riwayat, dan leaderboard dapat ditinjau tanpa dianggap sebagai aktivitas bisnis nyata. Akun ini wajib dihapus sebelum rilis publik M6.

Penyempurnaan pratinjau publik membuat `/temukan` dapat dicoba dengan Produk contoh melalui kuis manual maupun tautan “Coba contoh”. Jawaban dikirim sebagai parameter GET sehingga pemilihan, hasil, muat ulang, dan pengulangan tetap berfungsi tanpa bergantung penuh pada hidrasi JavaScript. Skenario cepat memakai `Fresh · Siang · Kuliah / Kerja` dan seluruh hasil tetap berlabel Data Contoh.

Mode Data Contoh kini dapat dipakai pada Development, Vercel Preview, dan Vercel Production MVP ketika sakelar khusus aktif. Production ditujukan untuk peninjauan terbatas, seluruh simulasi tetap berlabel, dan perubahan ini tidak membuat data hosted maupun memulai M6.

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

## Langkah berikutnya

1. Pemilik meninjau penyempurnaan M5 melalui server lokal dan draft pull request.
2. Pemilik masuk ke Vercel agar `MODE_PRATINJAU_DATA_CONTOH=true` dapat dipasang pada Preview dan Production serta deployment dapat dijalankan ulang.
3. Pemilik menentukan nama tingkat, batas minimal pcs, dan nominal bonus per pcs nyata melalui `/admin/afiliasi`.
4. Pemilik menambahkan materi promosi serta laporan platform nyata setelah tersedia.
5. Pemilik menambahkan domain produksi/preview ke Redirect URLs Supabase sebelum rilis.
6. Pemilik mengganti kata sandi Admin sementara sebelum produksi.
7. Pemilik menghapus akun `AfiliasiUji` dari Supabase Auth sebelum rilis produksi M6.
8. M6 tidak boleh dimulai sampai pemilik memberi konfirmasi eksplisit.

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
- Data produk, afiliasi nyata, materi, tarif, laporan, dan payout bisnis menyusul dari pemilik; `AfiliasiUji` hanya identitas teknis untuk peninjauan.

## Batas scope yang tetap dijaga

- Tidak ada checkout, keranjang, pembayaran, akun pembeli, wishlist, atau pengelolaan ongkir.
- Tidak ada pelacakan atau pembayaran komisi dasar buatan website.
- Tidak ada payout otomatis, integrasi bank, klaim pendapatan, tarif bonus, klaim anggota nyata, atau leaderboard palsu.
- Tidak ada Sales Academy, sertifikat, notifikasi otomatis, loyalitas, atau peran Admin granular.
- Tidak ada foto produk AI, klaim organisasi, banting harga, atau klaim promosi palsu.
- M6 belum dimulai.

## Catatan dan kendala

- Redirect URL konfirmasi Afiliasi harus ditambahkan ke konfigurasi Supabase untuk domain Vercel ketika domain tersedia.
- Alias Production `web-wawangian-pelajar.vercel.app` terakhir terpantau mengembalikan 404; domain Production harus dihubungkan kembali ke deployment `main` terbaru sebelum validasi live.
- Sesi browser Vercel belum terautentikasi, sehingga Environment Variables dan Deployment Protection belum dapat diubah pada sesi ini.
- Data bisnis M5 di Supabase masih kosong secara sengaja; isi portal akun uji berasal dari simulasi lokal berlabel dan tidak membuat tingkat, laporan, bonus, materi, atau payout hosted.
- Login Admin pernah tervalidasi, tetapi kata sandi lama yang dicoba ulang kini ditolak; pemilik perlu memastikan kata sandi Admin saat ini sebelum pemeriksaan panel berikutnya. Nilainya tidak disimpan dalam dokumentasi atau repository.
- `npm audit --omit=dev` dari M0 masih mencatat dua kerentanan sedang pada PostCSS bawaan Next.js; belum ada perbaikan kompatibel.

---

`STATUS.md` diperbarui setiap akhir sesi kerja.
