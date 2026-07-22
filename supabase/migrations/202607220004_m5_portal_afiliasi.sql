-- M5: Portal Afiliasi berbasis sistem native marketplace dan bonus per pcs.

create table if not exists public.afiliasi (
  id uuid primary key default gen_random_uuid(),
  pengguna_id uuid not null unique references auth.users(id) on delete cascade,
  nama text not null check (char_length(trim(nama)) between 3 and 100),
  no_whatsapp text not null check (no_whatsapp ~ '^\+?[0-9]{9,15}$'),
  alias_publik text not null check (alias_publik ~ '^[A-Za-z0-9._-]{3,30}$'),
  handle_tiktok text,
  handle_shopee text,
  status text not null default 'menunggu' check (status in ('menunggu', 'aktif', 'nonaktif')),
  alasan_status text,
  diverifikasi_oleh uuid references auth.users(id) on delete set null,
  diverifikasi_pada timestamptz,
  bergabung_pada timestamptz not null default now(),
  diperbarui_pada timestamptz not null default now(),
  constraint afiliasi_wajib_satu_handle check (
    nullif(trim(handle_tiktok), '') is not null
    or nullif(trim(handle_shopee), '') is not null
  )
);

create unique index if not exists afiliasi_alias_unik_idx
  on public.afiliasi(lower(alias_publik));
create unique index if not exists afiliasi_handle_tiktok_unik_idx
  on public.afiliasi(lower(trim(leading '@' from handle_tiktok)))
  where handle_tiktok is not null;
create unique index if not exists afiliasi_handle_shopee_unik_idx
  on public.afiliasi(lower(trim(leading '@' from handle_shopee)))
  where handle_shopee is not null;
create index if not exists afiliasi_status_idx on public.afiliasi(status, bergabung_pada desc);

create table if not exists public.tingkat_bonus_afiliasi (
  id uuid primary key default gen_random_uuid(),
  nama text not null unique check (char_length(trim(nama)) between 3 and 40),
  minimal_pcs integer not null unique check (minimal_pcs >= 1),
  bonus_per_pcs bigint not null check (bonus_per_pcs >= 0),
  aktif boolean not null default true,
  dibuat_oleh uuid not null default auth.uid() references auth.users(id) on delete restrict,
  dibuat_pada timestamptz not null default now(),
  diperbarui_pada timestamptz not null default now()
);

create table if not exists public.laporan_afiliasi (
  id uuid primary key default gen_random_uuid(),
  platform text not null check (platform in ('shopee', 'tiktok')),
  periode_mulai date not null,
  periode_selesai date not null check (periode_selesai >= periode_mulai),
  nama_berkas text not null,
  lokasi_berkas text not null,
  jumlah_baris integer not null check (jumlah_baris > 0),
  dibuat_oleh uuid not null default auth.uid() references auth.users(id) on delete restrict,
  dibuat_pada timestamptz not null default now(),
  unique (platform, periode_mulai, periode_selesai)
);

create table if not exists public.bonus_afiliasi (
  id uuid primary key default gen_random_uuid(),
  laporan_id uuid not null references public.laporan_afiliasi(id) on delete restrict,
  afiliasi_id uuid references public.afiliasi(id) on delete set null,
  handle_laporan text not null,
  jumlah_pcs integer not null check (jumlah_pcs > 0),
  tingkat_nama text,
  bonus_per_pcs bigint not null default 0 check (bonus_per_pcs >= 0),
  bonus_dihitung bigint generated always as (jumlah_pcs::bigint * bonus_per_pcs) stored,
  status_cocok text not null default 'belum_cocok' check (status_cocok in ('cocok', 'belum_cocok')),
  status_payout text not null default 'menunggu' check (status_payout in ('menunggu', 'dibayar')),
  bukti_transfer text,
  dibayar_pada timestamptz,
  dibuat_pada timestamptz not null default now(),
  diperbarui_pada timestamptz not null default now(),
  unique (laporan_id, handle_laporan),
  constraint payout_wajib_bukti check (
    status_payout = 'menunggu'
    or (bukti_transfer is not null and bonus_dihitung > 0 and dibayar_pada is not null)
  )
);

create index if not exists bonus_afiliasi_pemilik_idx
  on public.bonus_afiliasi(afiliasi_id, dibuat_pada desc);
create index if not exists bonus_afiliasi_status_idx
  on public.bonus_afiliasi(status_cocok, status_payout);

create table if not exists public.materi_promosi (
  id uuid primary key default gen_random_uuid(),
  tipe text not null check (tipe in ('story', 'caption', 'skrip')),
  judul text not null check (char_length(trim(judul)) between 3 and 100),
  deskripsi text not null check (char_length(trim(deskripsi)) between 10 and 300),
  isi_teks text,
  lokasi_berkas text,
  produk_id uuid references public.produk(id) on delete set null,
  aktif boolean not null default true,
  dibuat_oleh uuid not null default auth.uid() references auth.users(id) on delete restrict,
  dibuat_pada timestamptz not null default now(),
  diperbarui_pada timestamptz not null default now(),
  constraint materi_wajib_isi check (
    nullif(trim(isi_teks), '') is not null
    or nullif(trim(lokasi_berkas), '') is not null
  )
);

create index if not exists materi_promosi_aktif_idx
  on public.materi_promosi(aktif, dibuat_pada desc);

create or replace function public.normalisasi_handle_afiliasi(nilai text)
returns text
language sql
immutable
set search_path = ''
as $$
  select lower(trim(leading '@' from trim(coalesce(nilai, ''))));
$$;

create or replace function public.apakah_afiliasi_aktif()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.afiliasi
    where pengguna_id = (select auth.uid()) and status = 'aktif'
  );
$$;

create or replace function public.buat_profil_afiliasi_baru()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (new.raw_user_meta_data ->> 'jenis_akun') is distinct from 'afiliasi' then
    return new;
  end if;

  insert into public.afiliasi (
    pengguna_id, nama, no_whatsapp, alias_publik, handle_tiktok, handle_shopee
  ) values (
    new.id,
    trim(new.raw_user_meta_data ->> 'nama'),
    trim(new.raw_user_meta_data ->> 'no_whatsapp'),
    trim(new.raw_user_meta_data ->> 'alias_publik'),
    nullif(public.normalisasi_handle_afiliasi(new.raw_user_meta_data ->> 'handle_tiktok'), ''),
    nullif(public.normalisasi_handle_afiliasi(new.raw_user_meta_data ->> 'handle_shopee'), '')
  );

  return new;
end;
$$;

drop trigger if exists pengguna_baru_buat_profil_afiliasi on auth.users;
create trigger pengguna_baru_buat_profil_afiliasi
after insert on auth.users
for each row execute function public.buat_profil_afiliasi_baru();

create or replace function public.tentukan_bonus_afiliasi()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  platform_laporan text;
  profil public.afiliasi;
  tingkat public.tingkat_bonus_afiliasi;
begin
  new.handle_laporan := public.normalisasi_handle_afiliasi(new.handle_laporan);
  select platform into platform_laporan
  from public.laporan_afiliasi where id = new.laporan_id;

  if platform_laporan is null then
    raise exception 'Laporan afiliasi tidak ditemukan.';
  end if;

  if platform_laporan = 'tiktok' then
    select * into profil from public.afiliasi
    where status = 'aktif'
      and public.normalisasi_handle_afiliasi(handle_tiktok) = new.handle_laporan;
  else
    select * into profil from public.afiliasi
    where status = 'aktif'
      and public.normalisasi_handle_afiliasi(handle_shopee) = new.handle_laporan;
  end if;

  if profil.id is null then
    new.afiliasi_id := null;
    new.status_cocok := 'belum_cocok';
    new.tingkat_nama := null;
    new.bonus_per_pcs := 0;
    return new;
  end if;

  select * into tingkat from public.tingkat_bonus_afiliasi
  where aktif = true and minimal_pcs <= new.jumlah_pcs
  order by minimal_pcs desc limit 1;

  new.afiliasi_id := profil.id;
  new.status_cocok := 'cocok';
  new.tingkat_nama := tingkat.nama;
  new.bonus_per_pcs := coalesce(tingkat.bonus_per_pcs, 0);
  return new;
end;
$$;

drop trigger if exists bonus_tentukan_pencocokan on public.bonus_afiliasi;
create trigger bonus_tentukan_pencocokan
before insert or update of laporan_id, handle_laporan, jumlah_pcs
on public.bonus_afiliasi
for each row execute function public.tentukan_bonus_afiliasi();

drop trigger if exists afiliasi_atur_diperbarui_pada on public.afiliasi;
create trigger afiliasi_atur_diperbarui_pada before update on public.afiliasi
for each row execute function public.atur_diperbarui_pada();
drop trigger if exists tingkat_bonus_atur_diperbarui_pada on public.tingkat_bonus_afiliasi;
create trigger tingkat_bonus_atur_diperbarui_pada before update on public.tingkat_bonus_afiliasi
for each row execute function public.atur_diperbarui_pada();
drop trigger if exists bonus_atur_diperbarui_pada on public.bonus_afiliasi;
create trigger bonus_atur_diperbarui_pada before update on public.bonus_afiliasi
for each row execute function public.atur_diperbarui_pada();
drop trigger if exists materi_atur_diperbarui_pada on public.materi_promosi;
create trigger materi_atur_diperbarui_pada before update on public.materi_promosi
for each row execute function public.atur_diperbarui_pada();

drop trigger if exists audit_afiliasi on public.afiliasi;
create trigger audit_afiliasi after update on public.afiliasi
for each row execute function public.catat_log_audit();
drop trigger if exists audit_laporan_afiliasi on public.laporan_afiliasi;
create trigger audit_laporan_afiliasi after insert on public.laporan_afiliasi
for each row execute function public.catat_log_audit();
drop trigger if exists audit_bonus_afiliasi on public.bonus_afiliasi;
create trigger audit_bonus_afiliasi after insert or update on public.bonus_afiliasi
for each row execute function public.catat_log_audit();

create or replace function public.leaderboard_afiliasi_bulan_ini()
returns table (
  urutan bigint,
  alias_publik text,
  jumlah_pcs bigint,
  milik_saya boolean
)
language sql
stable
security definer
set search_path = ''
as $$
  with peringkat as (
    select a.id, a.pengguna_id, a.alias_publik,
      coalesce(sum(b.jumlah_pcs), 0)::bigint as jumlah_pcs
    from public.afiliasi a
    join public.bonus_afiliasi b on b.afiliasi_id = a.id
    join public.laporan_afiliasi l on l.id = b.laporan_id
    where a.status = 'aktif'
      and l.periode_selesai >= date_trunc('month', current_date)::date
      and l.periode_mulai < (date_trunc('month', current_date) + interval '1 month')::date
    group by a.id, a.pengguna_id, a.alias_publik
  ), berurutan as (
    select row_number() over (order by jumlah_pcs desc, alias_publik asc) as urutan,
      pengguna_id, alias_publik, jumlah_pcs
    from peringkat
  )
  select b.urutan, b.alias_publik, b.jumlah_pcs,
    b.pengguna_id = (select auth.uid()) as milik_saya
  from berurutan b
  where public.apakah_afiliasi_aktif()
  order by b.urutan
  limit 50;
$$;

create or replace function public.proses_laporan_afiliasi(
  platform_baru text,
  periode_mulai_baru date,
  periode_selesai_baru date,
  nama_berkas_baru text,
  lokasi_berkas_baru text,
  baris_baru jsonb
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  id_laporan uuid;
  jumlah_data integer;
begin
  if not public.apakah_admin() then
    raise exception 'Akses Admin diperlukan.';
  end if;
  if platform_baru not in ('shopee', 'tiktok')
    or periode_selesai_baru < periode_mulai_baru then
    raise exception 'Platform atau periode laporan tidak valid.';
  end if;
  if not exists (
    select 1 from public.tingkat_bonus_afiliasi where aktif = true
  ) then
    raise exception 'Tetapkan minimal satu tingkat bonus aktif sebelum mengunggah laporan.';
  end if;

  jumlah_data := jsonb_array_length(baris_baru);
  if jumlah_data < 1 or jumlah_data > 5000 then
    raise exception 'Jumlah baris laporan harus antara 1 dan 5.000.';
  end if;

  insert into public.laporan_afiliasi (
    platform, periode_mulai, periode_selesai, nama_berkas, lokasi_berkas, jumlah_baris
  ) values (
    platform_baru, periode_mulai_baru, periode_selesai_baru,
    nama_berkas_baru, lokasi_berkas_baru, jumlah_data
  ) returning id into id_laporan;

  insert into public.bonus_afiliasi (laporan_id, handle_laporan, jumlah_pcs)
  select id_laporan, baris.handle, baris.jumlah_pcs
  from jsonb_to_recordset(baris_baru) as baris(handle text, jumlah_pcs integer);

  return id_laporan;
end;
$$;

alter table public.afiliasi enable row level security;
alter table public.tingkat_bonus_afiliasi enable row level security;
alter table public.laporan_afiliasi enable row level security;
alter table public.bonus_afiliasi enable row level security;
alter table public.materi_promosi enable row level security;

create policy "Afiliasi membaca profil sendiri"
on public.afiliasi for select to authenticated
using (pengguna_id = (select auth.uid()));
create policy "Admin membaca seluruh afiliasi"
on public.afiliasi for select to authenticated
using ((select public.apakah_admin()));
create policy "Admin mengubah afiliasi"
on public.afiliasi for update to authenticated
using ((select public.apakah_admin())) with check ((select public.apakah_admin()));

create policy "Admin mengelola tingkat bonus"
on public.tingkat_bonus_afiliasi for all to authenticated
using ((select public.apakah_admin())) with check ((select public.apakah_admin()));
create policy "Afiliasi membaca tingkat aktif"
on public.tingkat_bonus_afiliasi for select to authenticated
using (aktif = true and (select public.apakah_afiliasi_aktif()));

create policy "Admin mengelola laporan afiliasi"
on public.laporan_afiliasi for all to authenticated
using ((select public.apakah_admin())) with check ((select public.apakah_admin()));

create policy "Admin mengelola bonus afiliasi"
on public.bonus_afiliasi for all to authenticated
using ((select public.apakah_admin())) with check ((select public.apakah_admin()));
create policy "Afiliasi membaca bonus sendiri"
on public.bonus_afiliasi for select to authenticated
using (afiliasi_id in (
  select id from public.afiliasi where pengguna_id = (select auth.uid())
));

create policy "Admin mengelola materi promosi"
on public.materi_promosi for all to authenticated
using ((select public.apakah_admin())) with check ((select public.apakah_admin()));
create policy "Afiliasi aktif membaca materi"
on public.materi_promosi for select to authenticated
using (aktif = true and (select public.apakah_afiliasi_aktif()));

revoke all on table public.afiliasi from anon, authenticated;
revoke all on table public.tingkat_bonus_afiliasi from anon, authenticated;
revoke all on table public.laporan_afiliasi from anon, authenticated;
revoke all on table public.bonus_afiliasi from anon, authenticated;
revoke all on table public.materi_promosi from anon, authenticated;
grant select, update on table public.afiliasi to authenticated;
grant select, insert, update, delete on table public.tingkat_bonus_afiliasi to authenticated;
grant select, insert, update, delete on table public.laporan_afiliasi to authenticated;
grant select, insert, update, delete on table public.bonus_afiliasi to authenticated;
grant select, insert, update, delete on table public.materi_promosi to authenticated;

revoke all on function public.leaderboard_afiliasi_bulan_ini() from public;
revoke all on function public.proses_laporan_afiliasi(text, date, date, text, text, jsonb) from public;
revoke all on function public.normalisasi_handle_afiliasi(text) from public;
revoke all on function public.apakah_afiliasi_aktif() from public;
revoke all on function public.buat_profil_afiliasi_baru() from public;
revoke all on function public.tentukan_bonus_afiliasi() from public;
grant execute on function public.leaderboard_afiliasi_bulan_ini() to authenticated;
grant execute on function public.proses_laporan_afiliasi(text, date, date, text, text, jsonb) to authenticated;
grant execute on function public.apakah_afiliasi_aktif() to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('laporan-afiliasi', 'laporan-afiliasi', false, 2097152, array['text/csv', 'application/vnd.ms-excel']),
  ('materi-afiliasi', 'materi-afiliasi', false, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'text/plain']),
  ('bukti-bonus-afiliasi', 'bukti-bonus-afiliasi', false, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
on conflict (id) do update set public = excluded.public,
file_size_limit = excluded.file_size_limit,
allowed_mime_types = excluded.allowed_mime_types;

create policy "Admin mengelola berkas afiliasi"
on storage.objects for all to authenticated
using (
  bucket_id in ('laporan-afiliasi', 'materi-afiliasi', 'bukti-bonus-afiliasi')
  and (select public.apakah_admin())
)
with check (
  bucket_id in ('laporan-afiliasi', 'materi-afiliasi', 'bukti-bonus-afiliasi')
  and (select public.apakah_admin())
);

create policy "Afiliasi aktif membaca berkas materi"
on storage.objects for select to authenticated
using (
  bucket_id = 'materi-afiliasi'
  and (select public.apakah_afiliasi_aktif())
);
