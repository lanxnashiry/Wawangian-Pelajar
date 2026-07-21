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
  /admin         # panel admin dengan login mulai M2
  /layout.tsx    # tata letak global
/components      # komponen antarmuka yang dapat digunakan ulang
/data            # data contoh produk dan artikel M1
/lib/supabase    # konfigurasi dan pembuat klien Supabase
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

M1 selesai di branch `codex/m1-website-publik-statis`. M2 tidak boleh dimulai sebelum tinjauan dan konfirmasi pemilik.
