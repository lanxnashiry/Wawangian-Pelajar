# BUILD_SPEC.md — Website Wawangian Pelajar

> **Dokumen ini adalah PRD (Product Requirements Document / spesifikasi produk) utama.**
> Dokumen ini menjadi sumber kebenaran (source of truth) bagi Agent/AI yang mengerjakan proyek secara bertahap.
> **WAJIB dibaca lebih dulu** sebelum menyentuh kode, bersama `ROADMAP.md`, `STATUS.md`, dan `DECISIONS.md`.

- **Produk:** Website resmi Wawangian Pelajar — brand parfum lokal bermisi pendidikan
- **Tagline:** "Wangi yang berpihak pada pendidikan"
- **Program donasi:** Dana Cahaya Pendidikan
- **Versi spesifikasi:** 2.0
- **Bahasa proyek:** Seluruh kode, komentar, dan dokumen menggunakan Bahasa Indonesia
- **Repositori:** GitHub
- **Agent pengerjaan:** Codex (utama), Antigravity (cadangan)

---

## Daftar Isi
1. Ringkasan Aplikasi
2. Tujuan
3. Scope (Ruang Lingkup)
4. Non-Scope (Di Luar Ruang Lingkup)
5. User Flow (Alur Pengguna)
6. Daftar Halaman
7. Business Rules (Aturan Bisnis)
8. Data Model (Model Data)
9. Tech Stack (Tumpukan Teknologi)
10. UI Direction (Arah Desain)
11. Acceptance Criteria (Kriteria Penerimaan)
12. Implementation Milestones (Tahapan Pengerjaan)
13. Definition of Done (Definisi Selesai)
14. Agent Instructions (Instruksi untuk Agent)
15. Documentation Update Rules (Aturan Pembaruan Dokumentasi)

---

## 1. Ringkasan Aplikasi

Website Wawangian Pelajar adalah **pusat brand (bukan tempat transaksi)** untuk sebuah bisnis parfum lokal yang memiliki misi sosial. Website menampilkan katalog produk, cerita brand, dan **halaman transparansi donasi** yang menjadi pembeda utama, lalu mengarahkan pembeli ke marketplace (Shopee & TikTok Shop) untuk bertransaksi.

Tiga lini produk yang dijual: **parfum ori** (asli bermerek), **decant** (parfum asli dibagi ke botol kecil terjangkau), dan **parfum inspirasi** (racikan sendiri). Setiap pembelian menyisihkan 20% keuntungan bersih untuk pendidikan (pelajar, mahasiswa, guru, hingga lembaga) melalui program **Dana Cahaya Pendidikan**, yang dilaporkan secara transparan dan dapat diperiksa publik.

Website juga menjadi **portal afiliasi**: merekrut pelajar sebagai tenaga jual yang memanfaatkan program afiliasi bawaan (native) marketplace, sementara website menyediakan lapisan rekrutmen, panduan, materi promosi, komunitas, dan bonus.

**Karakter pengguna sasaran:** anak muda (pelajar, mahasiswa, pekerja muda) yang mengakses via HP menengah dengan kuota terbatas. Karena itu website **wajib mobile-first, ringan, dan cepat.**

---

## 2. Tujuan

**Tujuan bisnis:**
1. Menjadi pusat kepercayaan (trust hub) yang meyakinkan calon pembeli bahwa produk asli dan misi sosialnya nyata.
2. Mengarahkan trafik ke marketplace untuk menghasilkan penjualan.
3. Membangun & mengelola pasukan afiliasi pelajar.
4. Membuktikan transparansi donasi sebagai pembeda brand yang sulit ditiru.

**Tujuan produk (website):**
1. Menyajikan katalog & cerita produk yang memikat dan membangun kepercayaan.
2. Menyediakan halaman transparansi donasi yang jujur, berbukti, dan tahan tuduhan manipulasi.
3. Menyediakan portal afiliasi yang memudahkan rekrutmen & memotivasi tanpa membebani margin.
4. Menjadi mesin konten (cerita misi & edukasi) yang mendukung pemasaran.

**Indikator keberhasilan (diukur setelah rilis):**
- Pengunjung menemukan produk & mengklik "Beli" menuju marketplace (tercatat via analitik klik-keluar).
- Halaman donasi dikunjungi & bukti penyaluran dapat diperiksa.
- Afiliasi mendaftar & aktif mempromosikan.

---

## 3. Scope (Ruang Lingkup)

Yang **DIKERJAKAN** dalam proyek ini:

1. **Website publik** (mobile-first, responsif): Homepage, Katalog + Detail Produk, halaman "Temukan Wangimu", Halaman Transparansi Donasi, Konten & Edukasi.
2. **Jembatan ke marketplace:** tombol beli yang mengarah ke Shopee/TikTok Shop (hybrid: langsung bila 1 marketplace, popup pilihan bila 2), pesan misi, dan pencatatan klik-keluar untuk analitik.
3. **Portal afiliasi** (dengan login): pendaftaran, panduan onboarding, dashboard afiliasi, materi promosi, leaderboard.
4. **Panel Admin/Backend** (dengan login): kelola produk, manajemen donasi (rekap + input penyaluran berbukti), rekonsiliasi & bonus afiliasi, editor konten, analitik klik, log audit.
5. **Perhitungan donasi semi-otomatis** dengan prinsip anti-fabrikasi.
6. **Enam dokumen tata kelola** (BUILD_SPEC, ROADMAP, STATUS, DECISIONS, CHANGELOG, README) yang dipelihara sepanjang pengerjaan.

---

## 4. Non-Scope (Di Luar Ruang Lingkup)

Yang **TIDAK DIKERJAKAN** (agar Agent tidak memperluas scope diam-diam):

1. **Checkout / keranjang / pembayaran sendiri.** Semua transaksi terjadi di marketplace. TIDAK ada payment gateway, tidak ada keranjang, tidak ada pengelolaan ongkir di website.
2. **Modul Akun Pelanggan / Repeat Order.** Tidak ada login untuk pembeli, tidak ada riwayat pesanan on-site, tidak ada wishlist.
3. **Sistem pelacakan & pembayaran komisi afiliasi sendiri.** Pelacakan penjualan & komisi dasar ditangani sistem native marketplace. Website hanya mengelola bonus top-up.
4. **Sales Academy** (pelatihan + sertifikat afiliasi) — ditunda ke fase lanjut.
5. **Badge keaslian** di produk (semua produk memang asli; hanya ada label "Racikan Sendiri" untuk lini inspirasi).
6. **Kolom komentar** pada artikel.
7. **Peran admin granular** (multi-level) — cukup satu peran Admin dulu.
8. **Notifikasi otomatis, program loyalitas, integrasi perbankan otomatis** — fase lanjut.
9. **Aplikasi mobile native** (iOS/Android) — hanya web responsif.


---

## 5. User Flow (Alur Pengguna)

### Flow A — Pengunjung menjadi Pembeli (jalur utama)
Homepage → tertarik banner misi → Katalog / "Temukan Wangimu" (kuis) → Detail Produk (profil aroma, harga, pesan misi) → klik "Beli" → (1 marketplace: langsung buka tab | 2 marketplace: popup pilih) → checkout & bayar DI MARKETPLACE. Opsional: mampir ke Halaman Donasi untuk memastikan transparansi sebelum membeli.

### Flow B — Pengunjung menjadi Afiliasi
Ajakan afiliasi (Homepage/Konten) → Landing "Jadi Afiliasi" → Pendaftaran (setuju aturan + cantumkan handle afiliasi TikTok/Shopee) → Admin verifikasi handle → login → Panduan Onboarding (daftar afiliasi di marketplace + ambil produk) → unduh Materi Promosi → sebar konten → platform melacak & bayar komisi dasar otomatis → cek Dashboard (komisi dasar di dompet marketplace; bonus tier per pcs dihitung & dibayar Wawangian Pelajar) → naik Leaderboard.

### Flow C — Publik memeriksa transparansi (tanpa membeli)
Homepage/footer → "Lihat bukti transparansi" → Halaman Donasi (3 angka: terkumpul/tersalurkan/saldo amanah) → buka detail penyaluran (bukti transfer + penerima) → baca "Bagaimana angka dihitung" → klik "Baca cerita lengkap" → artikel Cerita Misi (Modul Konten).

### Flow D — Admin (operasional rutin)
Login → Dasbor → kelola Produk (foto asli, profil aroma, data karakter/okasi untuk kuis, link marketplace) → Rekap Penjualan→Donasi (input untung + metode, sistem hitung 20%) → input Penyaluran + unggah bukti → publikasikan + tulis cerita dampak → Afiliasi (verifikasi handle, unggah laporan marketplace, sistem cocokkan & hitung bonus per pcs, payout) → Konten (tulis artikel) → semua aksi sensitif tercatat di Log Audit.

---

## 6. Daftar Halaman

**Publik (tanpa login):**
| Halaman | Rute (usulan) | Isi utama |
|---|---|---|
| Homepage | `/` | Hero, banner misi, produk unggulan, kenapa beda, cerita misi, strip konten, ajakan afiliasi, bukti sosial, footer |
| Katalog | `/katalog` | Grid produk + filter kategori + urutkan + pencarian |
| Detail Produk | `/produk/[slug]` | Galeri, profil aroma, harga, tombol beli, pesan misi, produk terkait |
| Temukan Wangimu | `/temukan` | Kuis karakter aroma & okasi → rekomendasi produk |
| Transparansi Donasi | `/donasi` | 3 angka, riwayat penyaluran berbukti, metode |
| Detail Penyaluran | `/donasi/[id]` | Bukti diperbesar + tautan cerita |
| Daftar Konten | `/cerita` | Grid artikel + filter kategori |
| Artikel | `/cerita/[slug]` | Isi + tombol share + CTA kontekstual |
| Landing Afiliasi | `/afiliasi` | Cara kerja + benefit + ajakan daftar |

**Login afiliasi:**
| Halaman | Rute | Isi |
|---|---|---|
| Masuk/Daftar Afiliasi | `/afiliasi/masuk`, `/afiliasi/daftar` | Form + input handle marketplace |
| Panduan Onboarding | `/afiliasi/panduan` | Langkah ringkas + link resmi platform |
| Dashboard Afiliasi | `/afiliasi/dashboard` | Tier, bonus, materi, progres |
| Materi Promosi | `/afiliasi/materi` | Template konten faceless unduh |
| Leaderboard | `/afiliasi/leaderboard` | Peringkat beralias |

**Login admin:**
| Halaman | Rute | Isi |
|---|---|---|
| Login Admin | `/admin/masuk` | Form login |
| Dasbor | `/admin` | Ringkasan |
| Kelola Produk | `/admin/produk` | CRUD + validasi anti-brand-asli |
| Rekap Donasi | `/admin/donasi/rekap` | Input untung → hitung 20% |
| Input Penyaluran | `/admin/donasi/penyaluran` | Form + unggah bukti wajib |
| Afiliasi | `/admin/afiliasi` | Verifikasi, rekonsiliasi, bonus |
| Editor Konten | `/admin/konten` | CRUD artikel |
| Analitik Klik | `/admin/analitik` | Produk paling diklik-beli |
| Pengaturan | `/admin/pengaturan` | Persentase donasi, dll |
| Log Audit | `/admin/log` | Jejak aksi sensitif |

---

## 7. Business Rules (Aturan Bisnis)

**BR-1 — Anti-fabrikasi donasi (terkumpul).** Angka donasi "terkumpul" TIDAK boleh diketik bebas. Harus dihitung sistem = untung bersih periode (diinput admin dari rekap penjualan marketplace) × 20%. Wajib menyimpan catatan metode/sumber periode.

**BR-2 — Anti-fabrikasi donasi (tersalurkan).** Entri penyaluran hanya tampil ke publik jika memiliki minimal 1 bukti (foto transfer/kuitansi) + nama penerima + tanggal. Tanpa bukti → status "draft", tidak tampil.

**BR-3 — Integritas saldo.** `Saldo amanah = Terkumpul − Tersalurkan`. Sistem menolak/memperingatkan bila Tersalurkan > Terkumpul. Saldo tidak boleh negatif.

**BR-4 — Anti-nama-brand-asli.** Field profil aroma untuk lini "inspirasi" ditolak sistem bila memuat nama merek terkenal (validasi daftar kata terlarang). Lini inspirasi diberi label "Racikan Sendiri".

**BR-5 — Beli mengarah ke marketplace.** Tombol beli tidak pernah memproses pembayaran. 1 marketplace → redirect langsung; 2 marketplace → popup pilihan. Setiap klik dicatat sebagai KlikKeluar (analitik).

**BR-6 — Atribusi afiliasi via platform.** Website tidak melacak/membayar komisi dasar. Afiliasi wajib mencantumkan handle marketplace saat daftar; itu kunci pencocokan ke laporan afiliasi platform.

**BR-7 — Bonus afiliasi (Path B).** Bonus top-up dihitung berbasis JUMLAH PENJUALAN PER PCS yang dikaitkan ke handle afiliasi (dari laporan platform yang diunggah admin). Dibayar manual oleh admin, dengan bukti transfer.

**BR-8 — Aturan main afiliasi.** Afiliasi = individu. Dilarang mengklaim "didukung IPNU"/organisasi, dilarang banting harga, dilarang klaim palsu. Pelanggaran → dinonaktifkan admin.

**BR-9 — Log audit wajib.** Semua aksi sensitif (ubah angka donasi, input penyaluran, ubah harga, payout, hapus) tercatat di Log Audit yang tidak bisa dihapus.

**BR-10 — Satu peran admin.** Untuk MVP hanya ada satu peran "Admin" dengan akses penuh. Peran granular ditunda.

**BR-11 — Mobile-first.** Semua halaman publik wajib dirancang untuk layar HP lebih dulu, ringan, hemat kuota.

---

## 8. Data Model (Model Data)

Skema entitas (pseudo-typed; final disesuaikan Supabase/Postgres):

```
Produk {
  id, nama, slug, kategori (ori|decant|inspirasi|signature),
  ukuran, harga:int,
  profil_aroma { notes_atas, notes_tengah, notes_dasar,
                 karakter: string[], cocok_untuk: string[] },
  foto: string[], label_racikan_sendiri: bool,
  link_marketplace { shopee?:url, tiktok?:url },
  unggulan: bool, stok: bool|int, aktif: bool, dibuat_pada
}

KlikKeluar { id, produk_id, marketplace_tujuan, waktu }   // analitik

DonasiTerkumpul {
  id, periode_mulai, periode_selesai,
  sumber (shopee|tiktok|gabungan),
  untung_bersih:int, persentase:int(=20),
  jumlah_donasi:int,        // dihitung sistem, read-only
  catatan_metode, dibuat_oleh, waktu
}

Penyaluran {
  id, tanggal, jumlah:int,
  penerima_nama, penerima_jenis (pelajar|mahasiswa|guru|lembaga),
  tujuan_deskripsi,
  bukti: {tipe, url}[],      // WAJIB minimal 1 untuk publikasi
  artikel_ref?,             // tautan cerita ke modul Konten
  status (draft|terpublikasi), dibuat_oleh, waktu
}

Afiliasi {
  id, user_id, nama, alias_publik,
  handle_tiktok?, handle_shopee?,   // kunci Path B
  tier, status (menunggu|aktif|nonaktif), bergabung_pada
}

BonusAfiliasi {
  id, afiliasi_id, periode, jumlah_pcs:int,
  bonus_dihitung:int, status_payout (menunggu|dibayar),
  bukti_transfer?, waktu
}

MateriPromosi { id, tipe (story|caption|skrip), judul, file_url, produk_ref? }

Artikel {
  id, judul, slug, kategori (cerita_misi|edukasi|tips|komunitas),
  cuplikan, isi_richtext, foto_utama,
  cta_tipe (produk|donasi|afiliasi|none), cta_target,
  share_aktif: bool, status (draft|terbit), penulis, tanggal_terbit
}

PenggunaAdmin { id, nama, email, password_hash, peran(=admin) }

LogAudit { id, aktor_id, aksi, entitas, entitas_id, nilai_lama, nilai_baru, waktu }

Pengaturan { key, value }   // persentase_donasi, dll
```


---

## 9. Tech Stack (Tumpukan Teknologi)

| Lapisan | Teknologi | Alasan |
|---|---|---|
| Framework web | **Next.js** (App Router, React, TypeScript) | Populer, agent paling mahir, mobile-first mudah, SEO-friendly |
| Styling | **Tailwind CSS** | Cepat, konsisten, mobile-first by default |
| Database + Auth | **Supabase** (Postgres + Auth + Storage) | Database, login, & penyimpanan file (foto produk/bukti) siap pakai, ada tier gratis |
| Hosting | **Vercel** | Integrasi mulus dengan Next.js, tier gratis, deploy otomatis dari GitHub |
| Penyimpanan file | **Supabase Storage** | Foto produk asli & bukti penyaluran donasi |
| Repositori | **GitHub** | Sumber kode + 6 dokumen tata kelola |

**Catatan teknis:**
- Login hanya untuk **Afiliasi** & **Admin** (Supabase Auth). Halaman publik tidak butuh login.
- Perhitungan donasi & bonus afiliasi = logika server (Next.js server actions / route handlers), bukan di sisi klien.
- Bahasa: seluruh kode, komentar, penamaan variabel, dan pesan commit dalam **Bahasa Indonesia**.
- Environment variable (kunci Supabase, dll) disimpan di `.env.local` dan Vercel — TIDAK di-commit ke repo.

---

## 10. UI Direction (Arah Desain)

**Palet warna (dari deck brand):**
- Navy `#14223d` (utama, teks & header)
- Tosca `#0f6b62` (aksen, tombol utama, tautan)
- Emas `#b8860b` (highlight, misi/donasi)
- Netral: putih `#ffffff`, abu latar `#f4f6f9`, garis `#e3e8ef`

**Prinsip visual:**
- **Mobile-first**: rancang untuk layar HP dulu, lalu lebarkan ke desktop.
- **Ringan & cepat**: optimalkan gambar, hindari animasi berat, hemat kuota.
- **Foto produk ASLI** — dilarang keras memakai gambar hasil AI untuk produk (menggerus kepercayaan).
- **Cerita dulu, jualan kemudian**: elemen misi tampil dekat elemen produk.
- **Kepercayaan terlihat**: angka donasi, bukti, dan transparansi mudah ditemukan.

**Tipografi:** font sans-serif bersih (default sistem / Inter). Judul tebal navy, isi abu gelap, ukuran teks ≥14px untuk keterbacaan di HP.

**Logo:** BELUM ADA. Gunakan wordmark teks "Wawangian Pelajar" (navy, tebal) sebagai placeholder sampai logo tersedia. Sisakan slot logo di navbar & footer.

**Referensi rasa:** bersih & hangat seperti brand parfum lokal modern; bukan mewah-berat, bukan murah-ramai. Nuansa "terjangkau tapi terpercaya".

---

## 11. Acceptance Criteria (Kriteria Penerimaan)

Kriteria yang harus terpenuhi agar fitur dianggap diterima. Format: diuji per fitur.

**AC-Homepage:**
- Menampilkan angka donasi terkumpul yang ditarik dari data nyata (bukan hardcode).
- Saat donasi Rp 0, menampilkan framing "perjalanan baru dimulai" (bukan "Rp 0" telanjang).
- Semua tautan cabang (Katalog/Donasi/Cerita/Afiliasi) berfungsi.
- Responsif: tata letak rapi di lebar 360px (HP) dan 1440px (desktop).

**AC-Katalog & Produk:**
- Filter kategori & pencarian mengembalikan hasil yang benar; state kosong menampilkan "segera hadir"/"tidak ditemukan".
- Detail produk menampilkan profil aroma lengkap & tombol beli sesuai jumlah marketplace aktif.
- Lini "inspirasi" menampilkan label "Racikan Sendiri".

**AC-Temukan Wangimu:**
- Kuis menghasilkan rekomendasi produk yang cocok berdasarkan data karakter/okasi.
- Hasil dapat dibagikan (tautan/kartu shareable).

**AC-Jembatan Marketplace:**
- Produk 1 marketplace → klik langsung membuka tab marketplace.
- Produk 2 marketplace → muncul popup pilihan.
- Setiap klik tercatat sebagai KlikKeluar.

**AC-Donasi:**
- Angka "terkumpul" dihitung sistem (= untung × 20%), tidak dapat diketik bebas.
- Penyaluran tanpa bukti TIDAK tampil publik (status draft).
- Saldo amanah = terkumpul − tersalurkan, tidak negatif.
- Setiap penyaluran punya tautan "baca cerita" bila artikel tersedia.

**AC-Afiliasi:**
- Pendaftaran wajib mengisi handle marketplace.
- Dashboard memisahkan jelas "komisi dasar (di platform)" vs "bonus tier (dari kami)".
- Admin dapat mengunggah laporan & sistem membantu mencocokkan handle + menghitung bonus per pcs.

**AC-Konten:**
- Artikel punya tombol share; tidak ada kolom komentar.
- CTA berubah sesuai kategori (edukasi→produk, misi→donasi, komunitas→afiliasi).

**AC-Admin:**
- Validasi anti-brand-asli menolak input nama merek terkenal di aroma inspirasi.
- Semua aksi sensitif tercatat di Log Audit.
- Hanya satu peran Admin dengan akses penuh.

**AC-Umum:**
- Tidak ada fitur di daftar Non-Scope yang muncul.
- Semua teks antarmuka dalam Bahasa Indonesia.

---

## 12. Implementation Milestones (Tahapan Pengerjaan)

Dikerjakan **berurutan**. Agent TIDAK memulai milestone berikutnya sebelum yang aktif selesai (lihat Agent Instructions).

**M0 — Fondasi Proyek.**
Setup Next.js + Tailwind + Supabase + repo GitHub + deploy kosong ke Vercel. Struktur folder, koneksi database, environment variable. Buat 6 dokumen tata kelola.

**M1 — Website Publik Statis (data contoh).**
Homepage, Katalog, Detail Produk, Konten (daftar+artikel), navigasi, footer, responsif mobile-first. Data masih contoh (belum dari admin).

**M2 — Panel Admin + Data Nyata.**
Login admin, CRUD Produk (+validasi anti-brand-asli), editor Konten, koneksi data nyata ke website publik. Analitik klik-keluar.

**M3 — Donasi (fitur andalan).**
Rekap penjualan→hitung donasi, input penyaluran+bukti, Halaman Transparansi Donasi publik, Log Audit. Terapkan BR-1, BR-2, BR-3, BR-9.

**M4 — Jembatan Marketplace + Temukan Wangimu.**
Tombol beli hybrid + popup + pencatatan KlikKeluar. Halaman kuis "Temukan Wangimu".

**M5 — Portal Afiliasi.**
Landing, pendaftaran (+handle marketplace), login afiliasi, dashboard, panduan, materi promosi, leaderboard. Admin: verifikasi + rekonsiliasi + bonus per pcs (BR-6, BR-7).

**M6 — Poles & Rilis.**
Optimasi kecepatan/gambar, aksesibilitas, uji lintas perangkat, konten awal, rilis produksi.

*(Fase lanjut di luar milestone ini: Sales Academy, notifikasi, loyalitas, peran granular.)*


---

## 13. Definition of Done (Definisi Selesai)

Sebuah task dianggap SELESAI hanya jika SEMUA berikut terpenuhi:

1. **Fungsional:** fitur bekerja sesuai Acceptance Criteria yang relevan.
2. **Sesuai scope:** tidak menambah fitur di luar task (lihat Non-Scope).
3. **Business rules dipatuhi:** semua BR terkait diterapkan (khususnya anti-fabrikasi & anti-brand-asli).
4. **Responsif:** rapi di HP (360px) dan desktop (1440px).
5. **Bahasa Indonesia:** semua teks UI, kode, komentar berbahasa Indonesia.
6. **Tidak merusak yang lama:** fitur sebelumnya tetap berjalan (tidak ada regresi).
7. **Validasi lolos:** build berhasil (`npm run build` tanpa error), lint bersih, tidak ada error konsol.
8. **Dokumentasi diperbarui:** STATUS.md, CHANGELOG.md, ROADMAP.md, dan dokumen lain sesuai Aturan Pembaruan (aspek 15).
9. **Ter-commit ke GitHub** dengan pesan commit jelas (Bahasa Indonesia) yang merujuk milestone/task.
10. **Asumsi dicatat:** bila ada asumsi yang diambil, tercatat di STATUS.md / DECISIONS.md.

---

## 14. Agent Instructions (Instruksi untuk Agent)

Agent (Codex utama / Antigravity cadangan) WAJIB mematuhi protokol berikut.

### Sebelum mengerjakan, Agent HARUS:
1. Membaca **BUILD_SPEC.md** (dokumen ini) sepenuhnya.
2. Membaca **ROADMAP.md** untuk mengetahui milestone.
3. Membaca **STATUS.md** untuk tahu posisi pekerjaan terakhir.
4. Memeriksa **milestone yang sedang aktif** (jangan lompat).
5. Membaca keputusan terkait di **DECISIONS.md**.
6. **Membatasi pekerjaan hanya pada task yang diberikan** — tidak mengerjakan hal lain.

### Saat mengerjakan, Agent HARUS:
1. **Mengikuti pola codebase yang sudah ada** (struktur folder, penamaan, gaya kode yang sudah terbentuk).
2. **Tidak memperluas scope diam-diam** — bila menemukan kebutuhan di luar task, CATAT sebagai usulan di STATUS.md, jangan langsung kerjakan.
3. **Mencatat asumsi** yang diambil (di STATUS.md / DECISIONS.md).
4. **Menjalankan validasi secara bertahap** (build & uji tiap bagian, bukan sekaligus di akhir).
5. **Tidak memulai milestone berikutnya** sebelum yang aktif dinyatakan selesai (Definition of Done) & dikonfirmasi.

### Setelah mengerjakan, Agent HARUS memperbarui dokumen (lihat aspek 15).

### Prinsip perilaku tambahan:
- Bila requirement tampak bertentangan, **berhenti dan tanyakan** — jangan menebak lalu mengubah arah produk.
- Utamakan **perubahan kecil & bertahap** daripada penulisan ulang besar.
- Jaga **kunci rahasia (env)** tidak pernah masuk ke repo.
- Semua keluaran (kode, UI, commit, dokumen) dalam **Bahasa Indonesia**.

---

## 15. Documentation Update Rules (Aturan Pembaruan Dokumentasi)

Setelah menyelesaikan task, Agent memperbarui dokumen berikut **sesuai pemicunya**:

| Dokumen | Diperbarui bila... | Isi pembaruan |
|---|---|---|
| **BUILD_SPEC.md / PRD** | requirement berubah | Revisi bagian terkait + naikkan versi + catat di DECISIONS |
| **ROADMAP.md** | progres milestone berubah | Tandai task selesai/berjalan, persentase milestone |
| **STATUS.md** | setiap selesai sesi kerja | Posisi terkini, task aktif, langkah berikutnya, asumsi |
| **CHANGELOG.md** | ada perubahan pada aplikasi | Entri bertanggal: ditambah/diubah/diperbaiki |
| **DECISIONS.md** | ada keputusan baru | Keputusan + alasan + tanggal (format ADR ringkas) |
| **README.md** | setup atau command berubah | Instruksi install, menjalankan, deploy terbaru |

**Aturan umum:**
- Perbarui dokumen **di commit yang sama** dengan perubahan kode terkait.
- Tulis ringkas, bertanggal, dan dalam Bahasa Indonesia.
- Jangan menghapus riwayat lama di CHANGELOG/DECISIONS — selalu **menambah** (append), bukan menimpa.
- STATUS.md selalu mencerminkan **kondisi TERKINI** (boleh ditimpa, karena riwayat ada di CHANGELOG).

---

*BUILD_SPEC.md v2.0 — Website Wawangian Pelajar. Sumber kebenaran utama. Dibaca bersama ROADMAP.md, STATUS.md, DECISIONS.md, CHANGELOG.md, README.md.*
