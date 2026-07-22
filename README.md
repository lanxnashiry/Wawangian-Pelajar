# Wawangian Pelajar — Website

Website resmi brand parfum lokal bermisi pendidikan. **“Wangi yang berpihak pada pendidikan.”**

Website ini adalah pusat brand, bukan tempat transaksi. Website menampilkan katalog dan konten publik, serta secara bertahap menyiapkan transparansi Dana Cahaya Pendidikan dan portal afiliasi sebelum mengarahkan pembeli ke marketplace resmi.

## Dokumen Wajib Dibaca

Sebelum mengubah kode, baca berurutan:

1. `BUILD_SPEC.md` — PRD dan sumber kebenaran utama.
2. `ROADMAP.md` — milestone dan progres.
3. `STATUS.md` — posisi pengerjaan terkini.
4. `DECISIONS.md` — keputusan arsitektur dan produk.
5. `CHANGELOG.md` — riwayat perubahan aplikasi.

## Tumpukan Teknologi

- Next.js dengan App Router dan TypeScript.
- Tailwind CSS.
- Supabase untuk Postgres, Auth, dan Storage.
- Vercel untuk hosting.
- GitHub untuk repositori dan tinjauan perubahan.

## Persyaratan Lokal

- Node.js 22.
- npm 12 atau versi yang kompatibel.
- Git.
- GitHub CLI untuk publikasi branch dan pull request.

Pada Windows dengan kebijakan eksekusi PowerShell yang membatasi `npm.ps1`, gunakan `npm.cmd` sebagai pengganti `npm`.

## Menjalankan Proyek

```bash
# 1. Klon repositori
git clone https://github.com/lanxnashiry/Wawangian-Pelajar.git
cd "Wawangian-Pelajar"

# 2. Pasang dependensi
npm install

# 3. Siapkan variabel lingkungan
copy .env.example .env.local

# 4. Jalankan mode pengembangan
npm run dev

# 5. Validasi
npm run lint
npm run build

# 6. Jalankan hasil build produksi
npm run start
```

Server pengembangan tersedia di `http://localhost:3000`.

## Struktur Folder Awal

```text
/app
  /(publik)      # layout dan seluruh rute publik
    /katalog     # katalog dengan filter dan pencarian
    /produk      # detail produk berdasarkan slug
    /temukan     # kuis karakter, waktu, okasi, dan hasil shareable M4
    /cerita      # daftar dan detail artikel
    /donasi      # transparansi dan detail bukti M3
    /afiliasi    # landing publik Portal Afiliasi M5
  /afiliasi      # daftar, login, dasbor, panduan, materi, dan leaderboard M5
  /admin         # login dan seluruh pengelolaan M2–M5
  /layout.tsx    # tata letak global
/components      # komponen antarmuka yang dapat digunakan ulang
/data            # data contoh produk dan artikel M1
/lib/supabase    # konfigurasi dan pembuat klien Supabase
/lib/admin       # otorisasi dan validasi Admin
/lib/afiliasi    # otorisasi, CSV, dan format Portal Afiliasi
/lib/data        # repositori data publik Supabase + fallback berlabel
/lib/pratinjau   # sakelar data contoh khusus pengembangan lokal
/lib/marketplace # validasi tujuan toko resmi M4
/lib/kuis        # pemeringkatan rekomendasi Temukan Wangimu
/supabase        # migrasi database dan contoh bootstrap Admin
/scripts         # utilitas lokal, termasuk pembuatan Admin
/public          # aset statis dan ikon sementara
```

## Rute Publik

- `/` — Homepage lengkap.
- `/katalog` — pencarian, filter, pengurutan, dan state kosong.
- `/produk/[slug]` — detail produk contoh dan produk terkait.
- `/temukan` — kuis tiga pertanyaan dan hasil rekomendasi yang dapat dibagikan.
- `/cerita` — daftar artikel dan filter kategori.
- `/cerita/[slug]` — isi artikel, share, dan CTA kontekstual.
- `/donasi` — transparansi tiga angka, riwayat penyaluran, dan metode perhitungan M3.
- `/donasi/[id]` — detail penyaluran serta bukti yang dapat diperiksa.
- `/afiliasi` — landing publik program Afiliasi Pelajar.
- `/afiliasi/daftar` — pendaftaran dengan minimal satu handle marketplace.
- `/afiliasi/masuk` — login email Afiliasi.
- `/afiliasi/dashboard` — status, pcs, tingkat, bonus, dan riwayat rekonsiliasi.
- `/afiliasi/panduan` — panduan ringkas dan tautan resmi marketplace.
- `/afiliasi/materi` — materi promosi privat dengan tautan unduh sementara.
- `/afiliasi/leaderboard` — peringkat bulanan beralias.

Data M1 berada di `data/produk.ts` dan `data/artikel.ts`. Seluruh data tersebut adalah contoh, bukan data bisnis final.

## Variabel Lingkungan

Salin `.env.example` menjadi `.env.local`, lalu isi:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAIL=
ADMIN_PASSWORD=
MODE_PRATINJAU_DATA_CONTOH=false
```

- URL dan kunci publishable digunakan oleh klien browser serta server. Kunci anon lama tetap didukung untuk kompatibilitas.
- `SUPABASE_SERVICE_ROLE_KEY` hanya boleh digunakan pada kode server untuk operasi admin.
- `ADMIN_EMAIL` dan `ADMIN_PASSWORD` hanya dipakai sekali oleh skrip bootstrap Admin.
- `MODE_PRATINJAU_DATA_CONTOH=true` hanya berlaku saat `npm run dev` untuk mengisi preview lokal dengan Produk, Artikel, dan simulasi Donasi berlabel.
- Jangan pernah commit `.env.local` atau kunci rahasia ke GitHub.
- Pasang nilai yang sama melalui pengaturan Environment Variables di Vercel.

Halaman M0 dapat dijalankan dan dibangun tanpa kredensial. Fungsi Supabase akan memberikan galat berbahasa Indonesia bila dipanggil sebelum konfigurasi tersedia.

### Mode pratinjau data contoh

Tambahkan `MODE_PRATINJAU_DATA_CONTOH=true` ke `.env.local`, lalu jalankan `npm run dev`. Website publik akan memakai delapan Produk contoh, lima Artikel contoh, serta simulasi transparansi Donasi yang jumlahnya konsisten. Banner kuning dan label pada data Donasi menegaskan bahwa semua nilai hanya untuk pemeriksaan tampilan.

Mode ini secara teknis dibatasi pada `NODE_ENV=development`. Build produksi dan Vercel tetap membaca data Supabase apa adanya, termasuk keadaan kosong, walaupun variabel tersebut tidak sengaja dipasang. Mode ini tidak menulis Produk, Artikel, rekap, penyaluran, atau bukti ke Supabase. Untuk kembali memeriksa data nyata lokal, ubah nilainya menjadi `false` atau hapus variabel tersebut.

## Mengaktifkan Supabase M2

1. Buka SQL Editor pada proyek Supabase.
2. Jalankan isi `supabase/migrations/202607210001_m2_panel_admin.sql` satu kali.
3. Jalankan isi `supabase/migrations/202607210002_m2_hak_akses.sql` untuk memberikan hak tabel dasar; RLS tetap menentukan baris yang boleh diakses.
4. Isi `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAIL`, dan kata sandi acak minimal 12 karakter pada `.env.local`.
5. Jalankan `npm run buat-admin`.
6. Setelah berhasil, hapus nilai `ADMIN_PASSWORD` dan `SUPABASE_SERVICE_ROLE_KEY` dari mesin yang tidak memerlukannya.
7. Masuk melalui `/admin/masuk` dan uji Produk, Konten, serta Analitik.

Kata sandi atau kunci service-role tidak pernah ditulis di README, commit, log publik, maupun antarmuka. Bila akun Auth sudah dibuat melalui dashboard, gunakan `supabase/bootstrap-admin.example.sql` untuk menambahkan keanggotaan Admin secara manual.

### Akun Admin awal

- Email: `lanxnashiry@gmail.com`
- Nama peran: `Pemilik Wawangian Pelajar`
- Status: akun Supabase Auth terkonfirmasi, keanggotaan `pengguna_admin` aktif, dan login panel sudah teruji.
- Kata sandi sementara dibuat melalui SDK Admin resmi dengan persetujuan pemilik, hanya dipakai di memori proses, dan tidak ditulis di README, `.env.example`, commit, atau log.
- Pemilik wajib segera mengganti kata sandi sementara melalui `/admin/undangan` saat sudah masuk.

Metode undangan dashboard dipakai untuk akun awal. Karena email pemulihan tidak diterima, kata sandi sementara ditetapkan satu kali melalui SDK Admin resmi tanpa menyimpannya ke repository. Skrip `npm run buat-admin` tetap tersedia untuk bootstrap terkontrol pada lingkungan lain.

Untuk aktivasi lokal, `Site URL` Supabase Auth diarahkan ke `http://localhost:3000/admin/undangan`. Jalankan `npm run dev` pada port 3000 sebelum membuka tautan undangan atau pemulihan kata sandi. Halaman tersebut menerima sesi Supabase dari alur tautan standar, meminta kata sandi minimal 12 karakter, memeriksa keanggotaan Admin aktif, lalu membuka panel. Saat aplikasi sudah memiliki domain Vercel, ganti `Site URL` dengan domain produksi dan tambahkan URL preview yang diperlukan ke daftar pengalihan Supabase.

## Rute Admin M2

- `/admin/masuk` — login satu peran Admin.
- `/admin` — dasbor berbasis data Supabase.
- `/admin/produk` — daftar, tambah, edit, unggah foto, dan nonaktifkan produk.
- `/admin/konten` — daftar, tambah, edit, terbitkan, dan hapus artikel.
- `/admin/analitik` — ringkasan minat KlikKeluar dari Produk marketplace nyata.

## Mengaktifkan Supabase M3

Setelah dua migrasi M2 selesai, buka SQL Editor Supabase dan jalankan isi `supabase/migrations/202607210003_m3_donasi_transparan.sql` satu kali. Migrasi ini membuat tabel rekap, penyaluran, Log Audit, RPC publik, trigger saldo, RLS, dan bucket bukti.

Data bisnis tidak dibuat oleh migrasi. Admin memasukkan data nyata melalui panel setelah rekap dan bukti tersedia.

### Rute Admin M3

- `/admin/donasi` — ringkasan terkumpul, tersalurkan, dan saldo amanah.
- `/admin/donasi/rekap` — input untung bersih dan metode; donasi 20% dihitung database.
- `/admin/donasi/penyaluran` — input draft atau penyaluran terpublikasi berbukti.
- `/admin/donasi/penyaluran/[id]` — edit penyaluran dan periksa bukti tersimpan.
- `/admin/log` — daftar Log Audit tanpa aksi ubah atau hapus.

## Jembatan Marketplace dan Kuis M4

Admin mengisi URL Produk melalui `/admin/produk`. Tautan wajib memakai HTTPS dan domain resmi Shopee atau TikTok. Pada halaman Produk, satu marketplace membuka tab langsung, sedangkan dua marketplace menampilkan dialog pilihan. Setiap klik Produk Supabase dikirim ke `/api/klik-keluar`; data contoh tidak dikirim ke analitik.

Rute `/temukan` mencocokkan tiga jawaban dengan data `karakter` dan `cocok_untuk` Produk. Hasil dapat dibagikan melalui URL seperti `/temukan?karakter=fresh&waktu=siang&okasi=kuliah-kerja` tanpa login atau penyimpanan jawaban baru.

Saat mode data contoh aktif dan URL Produk asli belum tersedia, detail Produk hanya menampilkan simulasi dialog dengan pilihan nonaktif. Masukkan tautan Produk resmi melalui Admin untuk menguji pembukaan tab dan pencatatan KlikKeluar nyata.

## Mengaktifkan Supabase M5

Setelah migrasi M2 dan M3 selesai, jalankan `supabase/migrations/202607220004_m5_portal_afiliasi.sql` melalui SQL Editor Supabase. Migrasi membuat profil Afiliasi, tingkat bonus, laporan platform, hasil rekonsiliasi, materi promosi, RLS, Log Audit, serta bucket privat.

Tambahkan URL berikut ke daftar **Redirect URLs** Supabase Auth:

```text
http://localhost:3000/auth/konfirmasi
https://DOMAIN-PRODUKSI/auth/konfirmasi
https://DOMAIN-PREVIEW/auth/konfirmasi
```

Gunakan URL produksi dan preview yang benar setelah Vercel tersedia. Afiliasi masuk dengan email dan kata sandi; nomor WhatsApp hanya dipakai sebagai kontak operasional.

### Format laporan Afiliasi

Sebelum mengunggah laporan, Admin wajib menetapkan minimal satu tingkat bonus nyata melalui `/admin/afiliasi`. CSV maksimal 2 MB dan 5.000 baris dengan kepala berikut:

```csv
handle,jumlah_pcs
```

- Pilih platform dan periode pada panel; handle dicocokkan ke field platform yang sesuai.
- Baris handle ganda digabung dan `jumlah_pcs` harus bilangan bulat positif.
- CSV tidak memuat komisi dasar, omzet, atau data dompet. Komisi dasar tetap dikelola marketplace.
- Status payout hanya dapat diubah menjadi `dibayar` setelah Admin mengunggah bukti JPEG, PNG, WebP, atau PDF.
- Materi promosi disimpan privat; tautan unduh Afiliasi berlaku 10 menit.

### Rute Admin M5

- `/admin/afiliasi` — verifikasi/koreksi handle, tingkat bonus, laporan, rekonsiliasi, payout, dan materi promosi.
- `/admin/log` — jejak perubahan status Afiliasi, laporan, bonus, dan payout.

## Deploy ke Vercel

1. Masuk ke Vercel dan pilih **Add New → Project**.
2. Impor repository `lanxnashiry/Wawangian-Pelajar`.
3. Pastikan Framework Preset terdeteksi sebagai **Next.js** dan Root Directory tetap di akar repository.
4. Tambahkan tiga variabel lingkungan Supabase untuk Development, Preview, dan Production.
5. Jalankan deploy pertama.
6. Setelah branch utama terhubung, push ke `main` akan memicu deployment produksi; branch pull request menghasilkan preview deployment.

Proyek tidak memerlukan `vercel.json` pada M0 karena konfigurasi standar Next.js sudah mencukupi.

## Aturan Kontribusi

- Kerjakan hanya task pada milestone aktif.
- Jangan memperluas scope tanpa keputusan pemilik.
- Gunakan Bahasa Indonesia untuk kode, komentar, antarmuka, dokumentasi, dan commit buatan proyek.
- Nama file dan paket yang diwajibkan framework tetap mengikuti konvensi teknisnya.
- Perbarui dokumen tata kelola dalam commit yang sama dengan perubahan kode.

---

M5 selesai secara teknis di branch `codex/m5-portal-afiliasi` dan menunggu tinjauan pemilik. M6 tidak dimulai sebelum konfirmasi eksplisit.
