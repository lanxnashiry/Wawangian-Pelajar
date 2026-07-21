-- M3: Dana Cahaya Pendidikan, bukti penyaluran, saldo amanah, dan Log Audit.

create table if not exists public.rekap_donasi (
  id uuid primary key default gen_random_uuid(),
  periode_mulai date not null,
  periode_selesai date not null check (periode_selesai >= periode_mulai),
  sumber text not null check (sumber in ('shopee', 'tiktok', 'gabungan')),
  untung_bersih bigint not null check (untung_bersih >= 0),
  persentase smallint not null default 20 check (persentase = 20),
  jumlah_donasi bigint generated always as ((untung_bersih * persentase) / 100) stored,
  catatan_metode text not null check (char_length(trim(catatan_metode)) >= 10),
  dibuat_oleh uuid not null default auth.uid() references auth.users(id) on delete restrict,
  dibuat_pada timestamptz not null default now(),
  diperbarui_pada timestamptz not null default now(),
  unique (periode_mulai, periode_selesai, sumber)
);

create table if not exists public.penyaluran_donasi (
  id uuid primary key default gen_random_uuid(),
  tanggal date not null,
  jumlah bigint not null check (jumlah > 0),
  penerima_nama text not null check (char_length(trim(penerima_nama)) >= 3),
  penerima_jenis text not null check (penerima_jenis in ('pelajar', 'mahasiswa', 'guru', 'lembaga')),
  tujuan_deskripsi text not null check (char_length(trim(tujuan_deskripsi)) >= 10),
  bukti text[] not null default '{}',
  artikel_id uuid references public.artikel(id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'terpublikasi')),
  dibuat_oleh uuid not null default auth.uid() references auth.users(id) on delete restrict,
  dibuat_pada timestamptz not null default now(),
  diperbarui_pada timestamptz not null default now(),
  constraint penyaluran_terpublikasi_wajib_bukti
    check (status = 'draft' or cardinality(bukti) >= 1)
);

create table if not exists public.log_audit (
  id uuid primary key default gen_random_uuid(),
  aktor_id uuid references auth.users(id) on delete set null,
  aksi text not null,
  entitas text not null,
  entitas_id uuid,
  nilai_lama jsonb,
  nilai_baru jsonb,
  waktu timestamptz not null default now()
);

create index if not exists rekap_donasi_periode_idx
  on public.rekap_donasi(periode_selesai desc);
create index if not exists penyaluran_donasi_publik_idx
  on public.penyaluran_donasi(status, tanggal desc);
create index if not exists log_audit_waktu_idx
  on public.log_audit(waktu desc);

create or replace function public.validasi_saldo_penyaluran()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  total_terkumpul bigint;
  total_tersalurkan_lain bigint;
begin
  if new.status <> 'terpublikasi' then
    return new;
  end if;

  select coalesce(sum(jumlah_donasi), 0)
    into total_terkumpul
    from public.rekap_donasi;

  select coalesce(sum(jumlah), 0)
    into total_tersalurkan_lain
    from public.penyaluran_donasi
    where status = 'terpublikasi'
      and (tg_op = 'INSERT' or id <> new.id);

  if total_tersalurkan_lain + new.jumlah > total_terkumpul then
    raise exception 'Penyaluran ditolak: jumlah melampaui saldo amanah yang tersedia.';
  end if;

  return new;
end;
$$;

create or replace function public.validasi_saldo_rekap()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  total_rekap_lain bigint;
  total_setelah_perubahan bigint;
  total_tersalurkan bigint;
begin
  select coalesce(sum(jumlah_donasi), 0)
    into total_rekap_lain
    from public.rekap_donasi
    where id <> old.id;

  if tg_op = 'DELETE' then
    total_setelah_perubahan := total_rekap_lain;
  else
    total_setelah_perubahan := total_rekap_lain + ((new.untung_bersih * new.persentase) / 100);
  end if;

  select coalesce(sum(jumlah), 0)
    into total_tersalurkan
    from public.penyaluran_donasi
    where status = 'terpublikasi';

  if total_setelah_perubahan < total_tersalurkan then
    raise exception 'Perubahan rekap ditolak: saldo amanah akan menjadi negatif.';
  end if;

  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;

create or replace function public.catat_log_audit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  aksi_log text;
  id_entitas uuid;
  data_lama jsonb;
  data_baru jsonb;
begin
  data_lama := case when tg_op = 'INSERT' then null else to_jsonb(old) end;
  data_baru := case when tg_op = 'DELETE' then null else to_jsonb(new) end;
  id_entitas := coalesce((data_baru ->> 'id')::uuid, (data_lama ->> 'id')::uuid);

  if tg_table_name = 'produk' and tg_op = 'UPDATE' then
    if old.harga is distinct from new.harga then
      aksi_log := 'ubah_harga_produk';
    elsif old.aktif = true and new.aktif = false then
      aksi_log := 'nonaktifkan_produk';
    else
      return new;
    end if;
  elsif tg_table_name = 'artikel' and tg_op = 'DELETE' then
    aksi_log := 'hapus_artikel';
  elsif tg_table_name = 'rekap_donasi' then
    aksi_log := case tg_op
      when 'INSERT' then 'tambah_rekap_donasi'
      when 'UPDATE' then 'ubah_rekap_donasi'
      else 'hapus_rekap_donasi'
    end;
  elsif tg_table_name = 'penyaluran_donasi' then
    aksi_log := case tg_op
      when 'INSERT' then 'tambah_penyaluran'
      when 'UPDATE' then 'ubah_penyaluran'
      else 'hapus_penyaluran'
    end;
  else
    aksi_log := lower(tg_op) || '_' || tg_table_name;
  end if;

  insert into public.log_audit (
    aktor_id, aksi, entitas, entitas_id, nilai_lama, nilai_baru
  ) values (
    (select auth.uid()), aksi_log, tg_table_name, id_entitas, data_lama, data_baru
  );

  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;

create or replace function public.tolak_perubahan_log_audit()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  raise exception 'Log Audit tidak dapat diubah atau dihapus.';
end;
$$;

create or replace function public.ringkasan_donasi_publik()
returns table (
  terkumpul bigint,
  tersalurkan bigint,
  saldo_amanah bigint,
  jumlah_rekap bigint,
  jumlah_penyaluran bigint
)
language sql
stable
security definer
set search_path = ''
as $$
  with rekap as (
    select coalesce(sum(jumlah_donasi), 0)::bigint as jumlah,
      count(*)::bigint as banyak
    from public.rekap_donasi
  ), salur as (
    select coalesce(sum(jumlah), 0)::bigint as jumlah,
      count(*)::bigint as banyak
    from public.penyaluran_donasi
    where status = 'terpublikasi'
  )
  select rekap.jumlah,
    salur.jumlah,
    greatest(rekap.jumlah - salur.jumlah, 0)::bigint,
    rekap.banyak,
    salur.banyak
  from rekap cross join salur;
$$;

create or replace function public.daftar_metode_donasi_publik()
returns table (
  id uuid,
  periode_mulai date,
  periode_selesai date,
  sumber text,
  persentase smallint,
  jumlah_donasi bigint,
  catatan_metode text
)
language sql
stable
security definer
set search_path = ''
as $$
  select r.id, r.periode_mulai, r.periode_selesai, r.sumber,
    r.persentase, r.jumlah_donasi, r.catatan_metode
  from public.rekap_donasi r
  order by r.periode_selesai desc, r.dibuat_pada desc;
$$;

drop trigger if exists penyaluran_validasi_saldo on public.penyaluran_donasi;
create trigger penyaluran_validasi_saldo
before insert or update on public.penyaluran_donasi
for each row execute function public.validasi_saldo_penyaluran();

drop trigger if exists rekap_validasi_saldo on public.rekap_donasi;
create trigger rekap_validasi_saldo
before update or delete on public.rekap_donasi
for each row execute function public.validasi_saldo_rekap();

drop trigger if exists rekap_atur_diperbarui_pada on public.rekap_donasi;
create trigger rekap_atur_diperbarui_pada
before update on public.rekap_donasi
for each row execute function public.atur_diperbarui_pada();

drop trigger if exists penyaluran_atur_diperbarui_pada on public.penyaluran_donasi;
create trigger penyaluran_atur_diperbarui_pada
before update on public.penyaluran_donasi
for each row execute function public.atur_diperbarui_pada();

drop trigger if exists audit_rekap_donasi on public.rekap_donasi;
create trigger audit_rekap_donasi
after insert or update or delete on public.rekap_donasi
for each row execute function public.catat_log_audit();

drop trigger if exists audit_penyaluran_donasi on public.penyaluran_donasi;
create trigger audit_penyaluran_donasi
after insert or update or delete on public.penyaluran_donasi
for each row execute function public.catat_log_audit();

drop trigger if exists audit_produk_sensitif on public.produk;
create trigger audit_produk_sensitif
after update or delete on public.produk
for each row execute function public.catat_log_audit();

drop trigger if exists audit_hapus_artikel on public.artikel;
create trigger audit_hapus_artikel
after delete on public.artikel
for each row execute function public.catat_log_audit();

drop trigger if exists log_audit_tidak_dapat_diubah on public.log_audit;
create trigger log_audit_tidak_dapat_diubah
before update or delete on public.log_audit
for each row execute function public.tolak_perubahan_log_audit();

alter table public.rekap_donasi enable row level security;
alter table public.penyaluran_donasi enable row level security;
alter table public.log_audit enable row level security;

create policy "Admin membaca seluruh rekap donasi"
on public.rekap_donasi for select to authenticated
using ((select public.apakah_admin()));
create policy "Admin menambah rekap donasi"
on public.rekap_donasi for insert to authenticated
with check ((select public.apakah_admin()) and dibuat_oleh = (select auth.uid()));
create policy "Admin mengubah rekap donasi"
on public.rekap_donasi for update to authenticated
using ((select public.apakah_admin()))
with check ((select public.apakah_admin()));

create policy "Publik membaca penyaluran terpublikasi"
on public.penyaluran_donasi for select to anon, authenticated
using (status = 'terpublikasi');
create policy "Admin membaca seluruh penyaluran"
on public.penyaluran_donasi for select to authenticated
using ((select public.apakah_admin()));
create policy "Admin menambah penyaluran"
on public.penyaluran_donasi for insert to authenticated
with check ((select public.apakah_admin()) and dibuat_oleh = (select auth.uid()));
create policy "Admin mengubah penyaluran"
on public.penyaluran_donasi for update to authenticated
using ((select public.apakah_admin()))
with check ((select public.apakah_admin()));

create policy "Admin membaca Log Audit"
on public.log_audit for select to authenticated
using ((select public.apakah_admin()));

revoke all on table public.rekap_donasi from anon, authenticated;
revoke all on table public.penyaluran_donasi from anon, authenticated;
revoke all on table public.log_audit from anon, authenticated;
grant select, insert, update on table public.rekap_donasi to authenticated;
grant select on table public.penyaluran_donasi to anon, authenticated;
grant insert, update on table public.penyaluran_donasi to authenticated;
grant select on table public.log_audit to authenticated;

revoke all on function public.ringkasan_donasi_publik() from public;
revoke all on function public.daftar_metode_donasi_publik() from public;
grant execute on function public.ringkasan_donasi_publik() to anon, authenticated;
grant execute on function public.daftar_metode_donasi_publik() to anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'bukti-donasi', 'bukti-donasi', true, 5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set public = excluded.public,
file_size_limit = excluded.file_size_limit,
allowed_mime_types = excluded.allowed_mime_types;

create policy "Admin menambah bukti donasi"
on storage.objects for insert to authenticated
with check (bucket_id = 'bukti-donasi' and (select public.apakah_admin()));
create policy "Admin mengubah bukti donasi"
on storage.objects for update to authenticated
using (bucket_id = 'bukti-donasi' and (select public.apakah_admin()))
with check (bucket_id = 'bukti-donasi' and (select public.apakah_admin()));
create policy "Admin menghapus bukti donasi"
on storage.objects for delete to authenticated
using (bucket_id = 'bukti-donasi' and (select public.apakah_admin()));
