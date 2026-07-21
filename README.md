# Wawangian Pelajar — Website

Website resmi brand parfum lokal bermisi pendidikan. **“Wangi yang berpihak pada pendidikan.”**

Website ini adalah pusat brand, bukan tempat transaksi. Website akan menampilkan katalog, cerita, transparansi Dana Cahaya Pendidikan, dan portal afiliasi, lalu mengarahkan pembeli ke Shopee atau TikTok Shop.

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
  /(publik)      # rute publik mulai M1
  /afiliasi      # portal afiliasi mulai M5
  /admin         # panel admin mulai M2
  /layout.tsx    # tata letak global
  /page.tsx      # halaman penanda fondasi M0
/components      # komponen antarmuka yang dapat digunakan ulang
/lib/supabase    # konfigurasi dan pembuat klien Supabase
/public          # aset statis dan ikon sementara
```

Direktori milestone berikutnya hanya diberi catatan struktur. Fitur di dalamnya belum dibangun pada M0.

## Variabel Lingkungan

Salin `.env.example` menjadi `.env.local`, lalu isi:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

- URL dan kunci anon digunakan oleh klien browser serta server.
- `SUPABASE_SERVICE_ROLE_KEY` hanya boleh digunakan pada kode server untuk operasi admin.
- Jangan pernah commit `.env.local` atau kunci rahasia ke GitHub.
- Pasang nilai yang sama melalui pengaturan Environment Variables di Vercel.

Halaman M0 dapat dijalankan dan dibangun tanpa kredensial. Fungsi Supabase akan memberikan galat berbahasa Indonesia bila dipanggil sebelum konfigurasi tersedia.

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

Fondasi M0 selesai di branch `codex/m0-fondasi-proyek`. M1 tidak boleh dimulai sebelum konfirmasi pemilik.
