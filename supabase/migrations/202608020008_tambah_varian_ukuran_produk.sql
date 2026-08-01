-- M6: menambah varian 50 ml dan 15 ml dari lima Produk Mykonos 100 ml.
-- Foto tidak disalin karena visual botol 100 ml dapat menyesatkan untuk ukuran lain.

begin;

with sumber as (
  select *
  from public.produk
  where slug in (
    'mykonos-california-blue-100ml',
    'mykonos-california-signature-100ml',
    'mykonos-dreamscape-100ml',
    'mykonos-monaco-royale-100ml',
    'mykonos-royal-ispahan-100ml'
  )
),
varian(ukuran, sufiks) as (
  values
    ('50 ml'::text, '50ml'::text),
    ('15 ml'::text, '15ml'::text)
)
insert into public.produk (
  nama,
  slug,
  kategori,
  ukuran,
  harga,
  ringkasan,
  deskripsi,
  aroma_atas,
  aroma_tengah,
  aroma_dasar,
  karakter,
  cocok_untuk,
  foto,
  link_shopee,
  link_tiktok,
  unggulan,
  tersedia,
  aktif,
  warna
)
select
  regexp_replace(sumber.nama, '100ml$', varian.sufiks),
  regexp_replace(sumber.slug, '100ml$', varian.sufiks),
  sumber.kategori,
  varian.ukuran,
  sumber.harga,
  sumber.ringkasan,
  replace(sumber.deskripsi, '- Ukuran: 100 ml', '- Ukuran: ' || varian.ukuran),
  sumber.aroma_atas,
  sumber.aroma_tengah,
  sumber.aroma_dasar,
  sumber.karakter,
  sumber.cocok_untuk,
  '{}'::text[],
  sumber.link_shopee,
  sumber.link_tiktok,
  sumber.unggulan,
  sumber.tersedia,
  sumber.aktif,
  sumber.warna
from sumber
cross join varian
on conflict (slug) do nothing;

do $$
declare
  jumlah_produk integer;
begin
  select count(*)
  into jumlah_produk
  from public.produk
  where slug = any(array[
    'mykonos-california-blue-100ml',
    'mykonos-california-blue-50ml',
    'mykonos-california-blue-15ml',
    'mykonos-california-signature-100ml',
    'mykonos-california-signature-50ml',
    'mykonos-california-signature-15ml',
    'mykonos-dreamscape-100ml',
    'mykonos-dreamscape-50ml',
    'mykonos-dreamscape-15ml',
    'mykonos-monaco-royale-100ml',
    'mykonos-monaco-royale-50ml',
    'mykonos-monaco-royale-15ml',
    'mykonos-royal-ispahan-100ml',
    'mykonos-royal-ispahan-50ml',
    'mykonos-royal-ispahan-15ml'
  ]);

  if jumlah_produk <> 15 then
    raise exception 'Batch varian Produk tidak lengkap: ditemukan %, diharapkan 15.', jumlah_produk;
  end if;
end;
$$;

commit;
