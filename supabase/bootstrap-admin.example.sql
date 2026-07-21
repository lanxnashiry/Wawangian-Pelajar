-- Jalankan setelah pengguna Auth pertama dibuat.
-- Ganti email dan nama, lalu jalankan melalui SQL Editor Supabase.
insert into public.pengguna_admin (pengguna_id, nama)
select id, 'Pemilik Wawangian Pelajar'
from auth.users
where email = 'GANTI_DENGAN_EMAIL_ADMIN'
on conflict (pengguna_id) do update
set nama = excluded.nama, aktif = true;

