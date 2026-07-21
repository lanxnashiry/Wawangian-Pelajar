-- M2: berikan hak tabel dasar; RLS tetap menentukan baris yang boleh diakses.
grant usage on schema public to anon, authenticated;

grant select on table public.pengguna_admin to authenticated;

grant select on table public.produk to anon, authenticated;
grant insert, update on table public.produk to authenticated;

grant select on table public.artikel to anon, authenticated;
grant insert, update, delete on table public.artikel to authenticated;

grant select on table public.klik_keluar to authenticated;
