-- M2: panel admin, data produk dan artikel, serta fondasi analitik klik-keluar.
create extension if not exists pgcrypto;

create table if not exists public.pengguna_admin (
  pengguna_id uuid primary key references auth.users(id) on delete cascade,
  nama text not null default 'Admin',
  aktif boolean not null default true,
  dibuat_pada timestamptz not null default now()
);

create table if not exists public.produk (
  id uuid primary key default gen_random_uuid(),
  nama text not null check (char_length(trim(nama)) >= 3),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  kategori text not null check (kategori in ('ori', 'decant', 'inspirasi', 'signature')),
  ukuran text not null,
  harga bigint not null default 0 check (harga >= 0),
  ringkasan text not null,
  deskripsi text not null,
  aroma_atas text[] not null default '{}',
  aroma_tengah text[] not null default '{}',
  aroma_dasar text[] not null default '{}',
  karakter text[] not null default '{}',
  cocok_untuk text[] not null default '{}',
  foto text[] not null default '{}',
  label_racikan_sendiri boolean not null default false,
  link_shopee text,
  link_tiktok text,
  unggulan boolean not null default false,
  tersedia boolean not null default true,
  aktif boolean not null default true,
  warna text not null default 'tosca' check (warna in ('tosca', 'emas', 'navy', 'merahMuda')),
  dibuat_pada timestamptz not null default now(),
  diperbarui_pada timestamptz not null default now()
);

create table if not exists public.artikel (
  id uuid primary key default gen_random_uuid(),
  judul text not null check (char_length(trim(judul)) >= 5),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  kategori text not null check (kategori in ('cerita_misi', 'edukasi', 'tips', 'komunitas')),
  cuplikan text not null,
  bagian jsonb not null default '[]'::jsonb check (jsonb_typeof(bagian) = 'array'),
  foto_utama text,
  warna text not null default 'tosca' check (warna in ('tosca', 'emas', 'navy', 'merahMuda')),
  menit_baca integer not null default 1 check (menit_baca > 0),
  cta_tipe text not null default 'none' check (cta_tipe in ('produk', 'donasi', 'afiliasi', 'none')),
  share_aktif boolean not null default true,
  status text not null default 'draft' check (status in ('draft', 'terbit')),
  penulis text not null default 'Wawangian Pelajar',
  tanggal_terbit timestamptz,
  dibuat_pada timestamptz not null default now(),
  diperbarui_pada timestamptz not null default now()
);

create table if not exists public.klik_keluar (
  id uuid primary key default gen_random_uuid(),
  produk_id uuid not null references public.produk(id) on delete restrict,
  marketplace_tujuan text not null check (marketplace_tujuan in ('shopee', 'tiktok')),
  waktu timestamptz not null default now()
);

create index if not exists produk_aktif_idx on public.produk(aktif, unggulan);
create index if not exists artikel_terbit_idx on public.artikel(status, tanggal_terbit desc);
create index if not exists klik_keluar_produk_waktu_idx on public.klik_keluar(produk_id, waktu desc);

create or replace function public.apakah_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.pengguna_admin
    where pengguna_id = (select auth.uid()) and aktif = true
  );
$$;

create or replace function public.atur_diperbarui_pada()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.diperbarui_pada = now();
  return new;
end;
$$;

create or replace function public.validasi_produk_sebelum_simpan()
returns trigger language plpgsql set search_path = '' as $$
declare
  profil_aroma text;
  merek_terlarang text[] := array[
    'chanel', 'dior', 'gucci', 'yves saint laurent', 'ysl', 'armani',
    'versace', 'creed', 'tom ford', 'jo malone', 'lancome', 'bvlgari',
    'hermes', 'hugo boss', 'paco rabanne', 'carolina herrera',
    'maison francis kurkdjian', 'byredo', 'le labo', 'azzaro',
    'burberry', 'calvin klein', 'dolce & gabbana'
  ];
  merek text;
begin
  if new.kategori in ('inspirasi', 'signature') then
    new.label_racikan_sendiri = true;
    profil_aroma = lower(array_to_string(
      new.aroma_atas || new.aroma_tengah || new.aroma_dasar || new.karakter,
      ' '
    ));
    foreach merek in array merek_terlarang loop
      if profil_aroma like '%' || merek || '%' then
        raise exception 'Profil aroma racikan sendiri tidak boleh memuat nama merek asli: %', merek;
      end if;
    end loop;
  else
    new.label_racikan_sendiri = false;
  end if;
  return new;
end;
$$;

create or replace function public.atur_cta_artikel()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.cta_tipe = case new.kategori
    when 'cerita_misi' then 'donasi'
    when 'komunitas' then 'afiliasi'
    when 'edukasi' then 'produk'
    when 'tips' then 'produk'
    else 'none'
  end;
  if new.status = 'terbit' and new.tanggal_terbit is null then
    new.tanggal_terbit = now();
  end if;
  return new;
end;
$$;

drop trigger if exists produk_validasi_sebelum_simpan on public.produk;
create trigger produk_validasi_sebelum_simpan before insert or update on public.produk
for each row execute function public.validasi_produk_sebelum_simpan();
drop trigger if exists produk_atur_diperbarui_pada on public.produk;
create trigger produk_atur_diperbarui_pada before update on public.produk
for each row execute function public.atur_diperbarui_pada();
drop trigger if exists artikel_atur_cta on public.artikel;
create trigger artikel_atur_cta before insert or update on public.artikel
for each row execute function public.atur_cta_artikel();
drop trigger if exists artikel_atur_diperbarui_pada on public.artikel;
create trigger artikel_atur_diperbarui_pada before update on public.artikel
for each row execute function public.atur_diperbarui_pada();

alter table public.pengguna_admin enable row level security;
alter table public.produk enable row level security;
alter table public.artikel enable row level security;
alter table public.klik_keluar enable row level security;

create policy "Admin membaca profil sendiri" on public.pengguna_admin for select
to authenticated using (pengguna_id = (select auth.uid()) and aktif = true);
create policy "Publik membaca produk aktif" on public.produk for select
to anon, authenticated using (aktif = true);
create policy "Admin membaca seluruh produk" on public.produk for select
to authenticated using ((select public.apakah_admin()));
create policy "Admin menambah produk" on public.produk for insert
to authenticated with check ((select public.apakah_admin()));
create policy "Admin mengubah produk" on public.produk for update
to authenticated using ((select public.apakah_admin())) with check ((select public.apakah_admin()));
create policy "Publik membaca artikel terbit" on public.artikel for select
to anon, authenticated using (status = 'terbit');
create policy "Admin membaca seluruh artikel" on public.artikel for select
to authenticated using ((select public.apakah_admin()));
create policy "Admin menambah artikel" on public.artikel for insert
to authenticated with check ((select public.apakah_admin()));
create policy "Admin mengubah artikel" on public.artikel for update
to authenticated using ((select public.apakah_admin())) with check ((select public.apakah_admin()));
create policy "Admin menghapus artikel" on public.artikel for delete
to authenticated using ((select public.apakah_admin()));
create policy "Admin membaca analitik klik" on public.klik_keluar for select
to authenticated using ((select public.apakah_admin()));

create or replace function public.catat_klik_keluar(id_produk uuid, tujuan text)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  id_baru uuid;
  produk_valid public.produk;
begin
  if tujuan not in ('shopee', 'tiktok') then
    raise exception 'Tujuan marketplace tidak valid.';
  end if;
  select * into produk_valid from public.produk
  where id = id_produk and aktif = true and tersedia = true;
  if not found then raise exception 'Produk tidak aktif atau tidak tersedia.'; end if;
  if (tujuan = 'shopee' and produk_valid.link_shopee is null)
    or (tujuan = 'tiktok' and produk_valid.link_tiktok is null) then
    raise exception 'Tautan marketplace belum tersedia.';
  end if;
  insert into public.klik_keluar(produk_id, marketplace_tujuan)
  values (id_produk, tujuan) returning id into id_baru;
  return id_baru;
end;
$$;

revoke all on function public.catat_klik_keluar(uuid, text) from public;
grant execute on function public.catat_klik_keluar(uuid, text) to anon, authenticated;
grant execute on function public.apakah_admin() to anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('produk', 'produk', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']),
  ('artikel', 'artikel', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = excluded.public,
file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "Publik membaca media M2" on storage.objects for select
to anon, authenticated using (bucket_id in ('produk', 'artikel'));
create policy "Admin menambah media M2" on storage.objects for insert
to authenticated with check (bucket_id in ('produk', 'artikel') and (select public.apakah_admin()));
create policy "Admin mengubah media M2" on storage.objects for update
to authenticated using (bucket_id in ('produk', 'artikel') and (select public.apakah_admin()))
with check (bucket_id in ('produk', 'artikel') and (select public.apakah_admin()));
create policy "Admin menghapus media M2" on storage.objects for delete
to authenticated using (bucket_id in ('produk', 'artikel') and (select public.apakah_admin()));

