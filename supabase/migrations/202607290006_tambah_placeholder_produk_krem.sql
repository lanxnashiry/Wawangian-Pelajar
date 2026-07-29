-- Menambahkan Krem sebagai warna placeholder Produk sesuai panduan brand resmi.
-- Tidak ada data Produk yang diubah oleh migrasi ini.

alter table public.produk
  drop constraint if exists produk_warna_check;

alter table public.produk
  add constraint produk_warna_check
  check (warna in ('krem', 'tosca', 'emas', 'navy', 'merahMuda'));
