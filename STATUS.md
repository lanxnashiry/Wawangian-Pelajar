# STATUS.md — Posisi Terkini Pengerjaan

> Dokumen ini selalu mencerminkan kondisi terkini. Riwayat lengkap perubahan tersedia di `CHANGELOG.md`.

**Terakhir diperbarui:** 22 Juli 2026
**Milestone aktif:** M3 — Donasi (fitur andalan)
**Status milestone aktif:** Selesai secara teknis; menunggu tinjauan dan konfirmasi pemilik sebelum M4

---

## Posisi saat ini

M3 selesai dibangun dan sudah digabungkan ke branch M2 bertumpuk. Penyempurnaan tinjauan saat ini dikerjakan pada branch `codex/m3-preview-data-contoh`. Migrasi telah diterapkan pada Supabase hosted dan menyediakan rekap donasi 20%, penyaluran berbukti, integritas saldo amanah, transparansi publik, detail bukti, serta Log Audit.

Untuk kebutuhan tinjauan pemilik, preview lokal kini memakai mode data contoh pengembangan. Beranda, Katalog, Produk, Cerita, Artikel, Transparansi Donasi, dan detail bukti dapat ditinjau dalam keadaan terisi tanpa menambahkan data ke Supabase. Banner global dan label khusus menegaskan bahwa seluruh isi tersebut bukan data bisnis atau bukti penyaluran nyata.

Validasi end-to-end menggunakan data teknis sementara berhasil membuktikan aturan BR-1, BR-2, BR-3, dan BR-9. Seluruh rekap, penyaluran, log, dan berkas bukti teknis kemudian dihapus sehingga database bisnis dan halaman publik kembali menampilkan keadaan nol yang jujur.

## Task M3

1. ✅ Rekap penjualan dan donasi 20% — `jumlah_donasi` dihitung sebagai kolom generated database dan tidak memiliki input bebas.
2. ✅ Penyaluran berbukti — draft didukung; publikasi wajib memiliki minimal satu bukti JPEG/PNG/WebP maksimal 5 MB.
3. ✅ Saldo amanah — database menolak penyaluran atau perubahan rekap yang membuat saldo negatif.
4. ✅ Transparansi publik — tiga angka, riwayat berbukti, metode per periode, dan keadaan kosong tersedia.
5. ✅ Detail penyaluran — bukti ukuran penuh dan tautan opsional ke Artikel Cerita Misi tersedia.
6. ✅ Log Audit — aksi donasi, penyaluran, perubahan harga, penonaktifan Produk, dan penghapusan Artikel dicatat tanpa aksi ubah/hapus dari aplikasi.

## Validasi yang sudah dilakukan

- `npm.cmd run lint` — berhasil tanpa galat.
- `npm.cmd run build` — berhasil; seluruh rute M0–M3 terkompilasi.
- Migrasi `202607210003_m3_donasi_transparan.sql` — berhasil diterapkan pada Supabase hosted.
- Akses publik — RPC ringkasan dan metode berhasil, sedangkan laba bersih mentah tidak menghasilkan baris karena RLS.
- BR-1 — laba teknis Rp100.000 menghasilkan donasi read-only Rp20.000 di database dan halaman publik.
- BR-2 — publikasi tanpa bukti ditolak dengan pesan Bahasa Indonesia.
- BR-3 — penyaluran Rp25.000 pada saldo Rp20.000 ditolak database; penyaluran berbukti Rp15.000 berhasil dan menghasilkan saldo Rp5.000.
- BR-9 — penambahan rekap dan penyaluran muncul pada Log Audit; aplikasi tidak menyediakan mutasi Log Audit.
- Halaman `/donasi`, `/donasi/[id]`, `/admin/donasi`, formulir rekap/penyaluran, dan `/admin/log` berhasil diuji melalui browser.
- Responsif 360px dan 1440px — halaman publik dan panel Donasi tidak mengalami overflow horizontal.
- Data teknis sementara — satu rekap, satu penyaluran, dua log, dan satu berkas bukti telah dihapus; hitungan akhir hosted `0/0/0`.
- Storage — bukti tetap dapat dibuka melalui URL publik, tetapi kebijakan untuk membuat daftar seluruh nama berkas publik dihapus.
- `git diff --check` — bersih; `.env.local` tetap diabaikan dan tidak ada rahasia yang ditambahkan ke perubahan.
- Mode pratinjau lokal — delapan Produk, lima Artikel, dua rekap, dua penyaluran, dan placeholder bukti tampil dengan label “Data Contoh”.
- Aritmetika simulasi — Rp2.400.000 terkumpul dikurangi Rp1.650.000 tersalurkan menghasilkan saldo amanah Rp750.000.
- Browser lokal — beranda, `/donasi`, dan `/donasi/contoh-penyaluran-002` berhasil dibuka; tidak ada galat konsol localhost atau overflow horizontal pada viewport aplikasi yang tersedia.
- `npm.cmd run lint` dan `npm.cmd run build` setelah integrasi pratinjau — berhasil tanpa galat; mode contoh otomatis mati pada build produksi.

## Langkah berikutnya

1. Selesaikan commit dan push penyempurnaan preview ke draft pull request M3.
2. Pemilik meninjau M3 melalui server lokal yang tetap berjalan dan mengganti kata sandi Admin sementara sebelum penggunaan produksi.
3. M4 tidak boleh dimulai sampai pemilik memberi konfirmasi eksplisit.
4. Data penjualan, penerima, bukti, Produk, dan Artikel nyata dimasukkan oleh pemilik saat sudah tersedia.

## Asumsi yang berlaku

- Persentase donasi M3 tetap 20% sesuai BR-1 dan hanya dapat berubah melalui requirement serta migrasi baru.
- Publik hanya memperoleh jumlah donasi, metode, dan penyaluran terpublikasi; `untung_bersih` tidak diekspos.
- Hanya penyaluran berstatus `terpublikasi` yang mengurangi saldo publik dan wajib memiliki bukti.
- Bucket `bukti-donasi` bersifat publik untuk URL bukti, tetapi daftar objek tidak dibuka kepada pengunjung.
- Tautan Cerita Misi bersifat opsional sampai Artikel dampak nyata tersedia.
- Database bisnis tetap kosong sampai data nyata diberikan; data contoh hanya menggantikan pembacaan pada mode pengembangan lokal yang dinyalakan eksplisit dan tidak pernah disimpan ke Supabase.
- `MODE_PRATINJAU_DATA_CONTOH` tidak dapat mengaktifkan simulasi pada build produksi atau Vercel.
- M3 selesai secara teknis, tetapi M4 belum aktif sebelum konfirmasi pemilik.

## Batas scope yang tetap dijaga

- Tidak ada checkout, keranjang, pembayaran, akun pembeli, wishlist, atau pengelolaan ongkir.
- Tidak ada pelacakan komisi afiliasi buatan sendiri.
- Tidak ada jembatan marketplace/kuis M4 atau Portal Afiliasi M5.
- Tidak ada foto produk AI, testimoni, cerita dampak buatan, atau angka simulasi yang diklaim sebagai donasi nyata; preview lokal memakai label “Data Contoh” dan placeholder bukti yang eksplisit.

## Catatan dan kendala

- Kata sandi sementara Admin sudah berfungsi dan wajib segera diganti oleh pemilik; nilainya tidak disimpan dalam dokumentasi atau repository.
- `npm audit --omit=dev` dari M0 masih mencatat dua kerentanan sedang pada PostCSS bawaan Next.js; belum ada perbaikan kompatibel.

---

`STATUS.md` diperbarui setiap akhir sesi kerja.
