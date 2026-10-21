-- M6: batch produksi, pembacaan publik terbatas, mutasi atomik, dan audit.
create table public.batch_produksi (
  id uuid primary key default gen_random_uuid(),
  kode_batch text not null unique,
  produk_id uuid not null references public.produk(id) on delete restrict,
  nama_varian text not null check (char_length(trim(nama_varian)) between 1 and 100),
  tanggal_produksi date not null,
  kode_formula text check (char_length(kode_formula) <= 100),
  status text not null default 'draft' check (status in ('draft', 'diedarkan', 'ditarik', 'nonaktif')),
  catatan_internal text check (char_length(catatan_internal) <= 2000),
  keterangan_publik text check (char_length(keterangan_publik) <= 500),
  diterbitkan_pada timestamptz,
  dibuat_oleh uuid not null default auth.uid() references auth.users(id) on delete restrict,
  dibuat_pada timestamptz not null default now(),
  diperbarui_pada timestamptz not null default now(),
  versi integer not null default 1 check (versi > 0),
  constraint batch_kode_valid check (
    kode_batch = upper(kode_batch)
    and char_length(kode_batch) between 3 and 40
    and kode_batch ~ '^[A-Z0-9]+(-[A-Z0-9]+)*$'
  ),
  constraint batch_terbit_valid check (
    (status = 'draft' and diterbitkan_pada is null)
    or (status <> 'draft' and diterbitkan_pada is not null)
  )
);

create index batch_daftar_idx on public.batch_produksi(status, diperbarui_pada desc);
alter table public.batch_produksi enable row level security;
create policy "Admin membaca batch" on public.batch_produksi
  for select to authenticated using ((select public.apakah_admin()));
revoke all on public.batch_produksi from anon, authenticated;
grant select on public.batch_produksi to authenticated;

create or replace function public.batch_publik(kode text)
returns table(
  kode_batch text,
  nama_varian text,
  tanggal_produksi date,
  status text,
  keterangan_publik text
)
language sql stable security definer set search_path = ''
as $$
  select b.kode_batch, b.nama_varian, b.tanggal_produksi, b.status, b.keterangan_publik
  from public.batch_produksi b
  where b.kode_batch = upper(trim(kode))
    and char_length(trim(kode)) between 3 and 40
    and upper(trim(kode)) ~ '^[A-Z0-9]+(-[A-Z0-9]+)*$'
    and b.status <> 'draft'
$$;
revoke all on function public.batch_publik(text) from public;
grant execute on function public.batch_publik(text) to anon, authenticated;

create or replace function public.simpan_batch(
  p_id uuid,
  p_kode text,
  p_produk uuid,
  p_tanggal text,
  p_formula text,
  p_catatan text,
  p_publik text,
  p_status text,
  p_versi integer,
  p_alasan text default null,
  p_konfirmasi_terbit boolean default false
)
returns public.batch_produksi
language plpgsql security definer set search_path = ''
as $$
declare
  lama public.batch_produksi;
  baru public.batch_produksi;
  produk public.produk;
  aksi text;
  kode text := upper(trim(p_kode));
  tanggal date;
begin
  if not public.apakah_admin() then
    raise exception 'Akses Admin diperlukan.' using errcode = '42501';
  end if;
  if kode is null or char_length(kode) not between 3 and 40
     or kode !~ '^[A-Z0-9]+(-[A-Z0-9]+)*$' then
    raise exception 'Format kode batch tidak valid.' using errcode = '22023';
  end if;
  if p_status is null or p_status not in ('draft', 'diedarkan', 'ditarik', 'nonaktif') then
    raise exception 'Status batch tidak valid.' using errcode = '22023';
  end if;
  if coalesce(char_length(trim(p_formula)), 0) > 100
     or coalesce(char_length(trim(p_catatan)), 0) > 2000
     or coalesce(char_length(trim(p_publik)), 0) > 500
     or p_versi is null or p_versi < 1 then
    raise exception 'Batas masukan batch tidak valid.' using errcode = '22023';
  end if;
  if p_tanggal is null or p_tanggal !~ '^\d{4}-\d{2}-\d{2}$' then
    raise exception 'Tanggal produksi tidak valid.' using errcode = '22007';
  end if;
  begin
    tanggal := make_date(
      substring(p_tanggal, 1, 4)::integer,
      substring(p_tanggal, 6, 2)::integer,
      substring(p_tanggal, 9, 2)::integer
    );
  exception when others then
    raise exception 'Tanggal produksi tidak valid.' using errcode = '22007';
  end;
  if to_char(tanggal, 'YYYY-MM-DD') <> p_tanggal
     or tanggal > (now() at time zone 'Asia/Jakarta')::date then
    raise exception 'Tanggal produksi tidak valid atau berada di masa depan.' using errcode = '22007';
  end if;

  select * into produk from public.produk where id = p_produk;
  if not found or char_length(trim(produk.nama)) not between 1 and 100 then
    raise exception 'Varian Produk tidak valid.' using errcode = '22023';
  end if;

  if p_id is null then
    if produk.aktif is not true or produk.kategori not in ('inspirasi', 'signature') then
      raise exception 'Varian Produk tidak aktif atau bukan racikan WP.' using errcode = '22023';
    end if;
    if p_status not in ('draft', 'diedarkan') then
      raise exception 'Status awal tidak valid.' using errcode = '22023';
    end if;
    if p_status = 'diedarkan' and p_konfirmasi_terbit is not true then
      raise exception 'Konfirmasi penerbitan wajib.' using errcode = '22023';
    end if;
    insert into public.batch_produksi(
      kode_batch, produk_id, nama_varian, tanggal_produksi, kode_formula,
      catatan_internal, keterangan_publik, status, diterbitkan_pada
    ) values (
      kode, produk.id, trim(produk.nama), tanggal, nullif(trim(p_formula), ''),
      nullif(trim(p_catatan), ''), nullif(trim(p_publik), ''), p_status,
      case when p_status = 'diedarkan' then now() end
    ) returning * into baru;
    aksi := 'tambah_batch';
  else
    select * into lama from public.batch_produksi where id = p_id for update;
    if not found then raise exception 'Batch tidak ditemukan.' using errcode = 'P0002'; end if;
    if lama.versi <> p_versi then raise exception 'Konflik versi. Muat ulang data.' using errcode = '40001'; end if;
    if lama.status <> 'draft' and (
      kode <> lama.kode_batch or p_produk <> lama.produk_id
      or tanggal <> lama.tanggal_produksi
    ) then raise exception 'Identitas batch terbit dikunci.' using errcode = '22023'; end if;
    if lama.status = 'draft' and p_status not in ('draft', 'diedarkan')
       or lama.status = 'diedarkan' and p_status not in ('diedarkan', 'ditarik', 'nonaktif')
       or lama.status in ('ditarik', 'nonaktif') and p_status not in (lama.status, 'diedarkan') then
      raise exception 'Transisi status tidak diizinkan.' using errcode = '22023';
    end if;
    if lama.status = 'draft' and p_status = 'diedarkan' and p_konfirmasi_terbit is not true then
      raise exception 'Konfirmasi penerbitan wajib.' using errcode = '22023';
    end if;
    if lama.status <> p_status and lama.status <> 'draft' and coalesce(trim(p_alasan), '') = '' then
      raise exception 'Alasan perubahan status wajib.' using errcode = '22023';
    end if;
    if lama.status <> p_status and p_status in ('ditarik', 'nonaktif')
       and coalesce(trim(p_publik), '') = '' then
      raise exception 'Keterangan publik wajib.' using errcode = '22023';
    end if;
    update public.batch_produksi set
      kode_batch = kode,
      produk_id = produk.id,
      nama_varian = case when lama.status = 'draft' then trim(produk.nama) else lama.nama_varian end,
      tanggal_produksi = tanggal,
      kode_formula = nullif(trim(p_formula), ''),
      catatan_internal = nullif(trim(p_catatan), ''),
      keterangan_publik = nullif(trim(p_publik), ''),
      status = p_status,
      diterbitkan_pada = case when lama.diterbitkan_pada is null and p_status <> 'draft' then now() else lama.diterbitkan_pada end,
      diperbarui_pada = now(),
      versi = versi + 1
    where id = p_id returning * into baru;
    aksi := case when lama.status is distinct from baru.status then 'ubah_status_batch' else 'ubah_batch' end;
  end if;

  insert into public.log_audit(aktor_id, aksi, entitas, entitas_id, nilai_lama, nilai_baru)
  values (
    auth.uid(), aksi, 'batch_produksi', baru.id, to_jsonb(lama),
    to_jsonb(baru) || jsonb_build_object('alasan_status', nullif(trim(p_alasan), ''))
  );
  return baru;
end
$$;
revoke all on function public.simpan_batch(uuid,text,uuid,text,text,text,text,text,integer,text,boolean) from public;
grant execute on function public.simpan_batch(uuid,text,uuid,text,text,text,text,text,integer,text,boolean) to authenticated;
