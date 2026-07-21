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
    /cerita      # daftar dan detail artikel
    /donasi      # state sementara sampai M3
    /afiliasi    # state sementara sampai M5
  /afiliasi      # portal afiliasi dengan login mulai M5
  /admin         # login, dasbor, Produk, Konten, dan Analitik M2
  /layout.tsx    # tata letak global
/components      # komponen antarmuka yang dapat digunakan ulang
/data            # data contoh produk dan artikel M1
/lib/supabase    # konfigurasi dan pembuat klien Supabase
/lib/admin       # otorisasi dan validasi Admin
/lib/data        # repositori data publik Supabase + fallback berlabel
/supabase        # migrasi database dan contoh bootstrap Admin
/scripts         # utilitas lokal, termasuk pembuatan Admin
/public          # aset statis dan ikon sementara
```

## Rute Publik M1

- `/` — Homepage lengkap.
- `/katalog` — pencarian, filter, pengurutan, dan state kosong.
- `/produk/[slug]` — detail produk contoh dan produk terkait.
- `/cerita` — daftar artikel dan filter kategori.
- `/cerita/[slug]` — isi artikel, share, dan CTA kontekstual.
- `/donasi` dan `/afiliasi` — halaman sementara sampai milestone fiturnya aktif.

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
```

- URL dan kunci publishable digunakan oleh klien browser serta server. Kunci anon lama tetap didukung untuk kompatibilitas.
- `SUPABASE_SERVICE_ROLE_KEY` hanya boleh digunakan pada kode server untuk operasi admin.
- `ADMIN_EMAIL` dan `ADMIN_PASSWORD` hanya dipakai sekali oleh skrip bootstrap Admin.
- Jangan pernah commit `.env.local` atau kunci rahasia ke GitHub.
- Pasang nilai yang sama melalui pengaturan Environment Variables di Vercel.

Halaman M0 dapat dijalankan dan dibangun tanpa kredensial. Fungsi Supabase akan memberikan galat berbahasa Indonesia bila dipanggil sebelum konfigurasi tersedia.

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
- `/admin/analitik` — ringkasan minat klik-keluar; tetap nol sebelum M4.

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

M1 selesai dan telah digabungkan. M2 aktif di branch `codex/m2-panel-admin-data-nyata`; migrasi hosted dan akun Admin sudah aktif, sedangkan validasi login/CRUD menunggu penerimaan undangan oleh pemilik.
