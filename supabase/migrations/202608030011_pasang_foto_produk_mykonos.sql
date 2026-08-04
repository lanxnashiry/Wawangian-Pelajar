begin;

with peta_foto(slug, nama_berkas) as (
  values
    ('mykonos-monaco-royale-100ml', 'monaco-royale-100ml.webp'),
    ('mykonos-monaco-royale-50ml', 'monaco-royale-50ml.webp'),
    ('mykonos-monaco-royale-15ml', 'monaco-royale-50ml.webp'),
    ('mykonos-royal-ispahan-100ml', 'royal-ispahan-100ml.webp'),
    ('mykonos-royal-ispahan-50ml', 'royal-ispahan-50ml.webp'),
    ('mykonos-royal-ispahan-15ml', 'royal-ispahan-50ml.webp'),
    ('mykonos-dreamscape-100ml', 'dreamscape-100ml.webp'),
    ('mykonos-dreamscape-50ml', 'dreamscape-50ml.webp'),
    ('mykonos-dreamscape-15ml', 'dreamscape-50ml.webp'),
    ('mykonos-california-signature-100ml', 'california-signature-100ml.webp'),
    ('mykonos-california-signature-50ml', 'california-signature-50ml.webp'),
    ('mykonos-california-signature-15ml', 'california-signature-50ml.webp'),
    ('mykonos-california-blue-100ml', 'california-blue-100ml.webp'),
    ('mykonos-california-blue-50ml', 'california-blue-50ml.webp'),
    ('mykonos-california-blue-15ml', 'california-blue-50ml.webp')
),
foto_baru as (
  select
    slug,
    array[
      'https://jttepaxwjmmopflpgbac.supabase.co/storage/v1/object/public/produk/' || nama_berkas
    ]::text[] as foto
  from peta_foto
)
update public.produk as produk
set foto = foto_baru.foto
from foto_baru
where produk.slug = foto_baru.slug
  and produk.foto is distinct from foto_baru.foto;

do $$
declare
  jumlah_produk_berfoto integer;
  jumlah_referensi_15ml integer;
begin
  select count(*)
  into jumlah_produk_berfoto
  from public.produk
  where slug in (
    'mykonos-monaco-royale-100ml',
    'mykonos-monaco-royale-50ml',
    'mykonos-monaco-royale-15ml',
    'mykonos-royal-ispahan-100ml',
    'mykonos-royal-ispahan-50ml',
    'mykonos-royal-ispahan-15ml',
    'mykonos-dreamscape-100ml',
    'mykonos-dreamscape-50ml',
    'mykonos-dreamscape-15ml',
    'mykonos-california-signature-100ml',
    'mykonos-california-signature-50ml',
    'mykonos-california-signature-15ml',
    'mykonos-california-blue-100ml',
    'mykonos-california-blue-50ml',
    'mykonos-california-blue-15ml'
  )
  and cardinality(foto) = 1
  and foto[1] like 'https://jttepaxwjmmopflpgbac.supabase.co/storage/v1/object/public/produk/%'
  and lower(foto[1]) not like '%wp%';

  if jumlah_produk_berfoto <> 15 then
    raise exception 'Pemasangan foto Mykonos tidak lengkap: ditemukan % dari 15 Produk.', jumlah_produk_berfoto;
  end if;

  select count(*)
  into jumlah_referensi_15ml
  from public.produk
  where slug like 'mykonos-%-15ml'
    and foto[1] like '%-50ml.webp';

  if jumlah_referensi_15ml <> 5 then
    raise exception 'Foto referensi 50 ml untuk Produk 15 ml tidak lengkap: ditemukan % dari 5 Produk.', jumlah_referensi_15ml;
  end if;
end;
$$;

commit;
