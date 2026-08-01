-- M6: kolom SEO untuk tabel artikel (KEP-037 s.d. KEP-040)
-- Semua kolom nullable agar artikel yang sudah ada tetap valid.

alter table public.artikel
  add column if not exists isi_markdown text,
  add column if not exists meta_judul text check (meta_judul is null or char_length(meta_judul) <= 70),
  add column if not exists meta_deskripsi text check (meta_deskripsi is null or char_length(meta_deskripsi) <= 200),
  add column if not exists foto_alt text,
  add column if not exists fokus_kata_kunci text;

comment on column public.artikel.isi_markdown is
  'Isi artikel dalam Markdown. Bila terisi, dipakai sebagai sumber render dan kolom bagian diabaikan.';
comment on column public.artikel.meta_judul is
  'Judul untuk hasil pencarian. Maksimal 70 karakter. Bila kosong, judul dipakai.';
comment on column public.artikel.meta_deskripsi is
  'Deskripsi untuk hasil pencarian. Ideal 150-160 karakter. Bila kosong, cuplikan dipakai.';
comment on column public.artikel.foto_alt is
  'Teks alternatif gambar utama untuk aksesibilitas dan Google Images.';
comment on column public.artikel.fokus_kata_kunci is
  'Kata kunci target. Tidak dirender ke publik, hanya alat bantu Admin.';
