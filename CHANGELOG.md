# CHANGELOG.md — Riwayat Perubahan Aplikasi

> Catatan bertanggal semua perubahan aplikasi. Riwayat lama tidak boleh dihapus.

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
