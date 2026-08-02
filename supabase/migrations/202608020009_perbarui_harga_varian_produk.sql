-- M6: menetapkan harga lima aroma Mykonos berdasarkan ukuran.

begin;

update public.produk
set harga = case ukuran
  when '100 ml' then 539000
  when '50 ml' then 289000
  when '15 ml' then 119000
  else harga
end
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

do $$
declare
  jumlah_sesuai integer;
begin
  select count(*)
  into jumlah_sesuai
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
  ])
  and harga = case ukuran
    when '100 ml' then 539000
    when '50 ml' then 289000
    when '15 ml' then 119000
    else -1
  end;

  if jumlah_sesuai <> 15 then
    raise exception 'Pembaruan harga Produk tidak lengkap: ditemukan %, diharapkan 15.', jumlah_sesuai;
  end if;
end;
$$;

commit;
