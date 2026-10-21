-- M6 / KEP-065: kode batch dibuat server dari kode formula, kode varian, tanggal produksi, dan urutan.
-- Format: <KODE FORMULA>-<KODE VARIAN>-<YYYYMMDD>-<NN>, contoh AV-T03-MC-20261021-01.

alter table public.produk
  add column if not exists kode_varian text
  check (kode_varian is null or kode_varian ~ '^[A-Z0-9]{2,4}$');

do $$
declare jumlah integer;
begin
  update public.produk set kode_varian = case slug
    when 'main-character-30ml' then 'MC'
    when 'afterclass-30ml' then 'AC'
    when 'secret-crush-30ml' then 'SC'
    when 'first-bell-30ml' then 'FB'
  end
  where slug in ('main-character-30ml', 'afterclass-30ml', 'secret-crush-30ml', 'first-bell-30ml');
  get diagnostics jumlah = row_count;
  if jumlah <> 4 then
    raise exception 'Seed kode varian harus mengenai tepat 4 Produk, ditemukan %.', jumlah;
  end if;
end $$;

-- ponytail: Produk tanpa kode_varian memakai inisial nama (kata "ML" dan angka diabaikan);
-- nama satu kata memakai dua huruf pertama. Tambahkan isian kode_varian di form Produk
-- bila varian baru butuh kode khusus.
create or replace function public.kode_varian_produk(p_kode text, p_nama text)
returns text
language sql immutable set search_path = ''
as $$
  select left(coalesce(
    nullif(p_kode, ''),
    case when char_length(s.inisial) >= 2 then s.inisial
      else left(regexp_replace(upper(p_nama), '[^A-Z]', '', 'g'), 2) end
  ), 4)
  from (
    select string_agg(left(t.kata, 1), '' order by t.n) as inisial
    from regexp_split_to_table(upper(p_nama), '[^A-Z]+') with ordinality as t(kata, n)
    where t.kata not in ('', 'ML')
  ) s
$$;
revoke all on function public.kode_varian_produk(text, text) from public;

create or replace function public.buat_kode_batch(p_formula text, p_varian text, p_tanggal date)
returns text
language plpgsql volatile set search_path = ''
as $$
declare
  awalan text := p_formula || '-' || p_varian || '-' || to_char(p_tanggal, 'YYYYMMDD');
  urut integer;
begin
  -- Kunci per awalan: simpan bersamaan menunggu bergiliran, tidak mendapat nomor sama.
  -- Constraint UNIQUE kode_batch tetap menjadi pengaman terakhir.
  perform pg_advisory_xact_lock(hashtextextended(awalan, 0));
  select coalesce(max(substring(b.kode_batch from '-(\d{2})$')::integer), 0) + 1 into urut
  from public.batch_produksi b
  where b.kode_batch ~ ('^' || awalan || '-\d{2}$');
  if urut > 99 then
    raise exception 'Urutan batch untuk formula, varian, dan tanggal ini melebihi 99.' using errcode = '22023';
  end if;
  return awalan || '-' || lpad(urut::text, 2, '0');
end
$$;
revoke all on function public.buat_kode_batch(text, text, date) from public;

-- Signature sama dengan migrasi 017 agar aplikasi lama tetap kompatibel selama deploy;
-- p_kode diabaikan karena kode dibuat server.
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
  kode text;
  formula text := nullif(upper(trim(p_formula)), '');
  formula_valid boolean;
  varian text;
  tanggal date;
begin
  if not public.apakah_admin() then
    raise exception 'Akses Admin diperlukan.' using errcode = '42501';
  end if;
  if p_status is null or p_status not in ('draft', 'diedarkan', 'ditarik', 'nonaktif') then
    raise exception 'Status batch tidak valid.' using errcode = '22023';
  end if;
  if coalesce(char_length(formula), 0) > 100
     or coalesce(char_length(trim(p_catatan)), 0) > 2000
     or coalesce(char_length(trim(p_publik)), 0) > 500
     or p_versi is null or p_versi < 1 then
    raise exception 'Batas masukan batch tidak valid.' using errcode = '22023';
  end if;
  formula_valid := formula is not null and char_length(formula) <= 20
    and formula ~ '^[A-Z0-9]+(-[A-Z0-9]+)*$';
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
  varian := public.kode_varian_produk(produk.kode_varian, produk.nama);
  if varian is null or varian !~ '^[A-Z0-9]{1,4}$' then
    raise exception 'Kode varian Produk tidak dapat dibentuk.' using errcode = '22023';
  end if;

  if p_id is null then
    if produk.aktif is not true or produk.kategori not in ('inspirasi', 'signature') then
      raise exception 'Varian Produk tidak aktif atau bukan racikan WP.' using errcode = '22023';
    end if;
    if not formula_valid then
      raise exception 'Kode formula wajib, maksimal 20 karakter huruf/angka dengan tanda hubung.' using errcode = '22023';
    end if;
    if p_status not in ('draft', 'diedarkan') then
      raise exception 'Status awal tidak valid.' using errcode = '22023';
    end if;
    if p_status = 'diedarkan' and p_konfirmasi_terbit is not true then
      raise exception 'Konfirmasi penerbitan wajib.' using errcode = '22023';
    end if;
    kode := public.buat_kode_batch(formula, varian, tanggal);
    insert into public.batch_produksi(
      kode_batch, produk_id, nama_varian, tanggal_produksi, kode_formula,
      catatan_internal, keterangan_publik, status, diterbitkan_pada
    ) values (
      kode, produk.id, trim(produk.nama), tanggal, formula,
      nullif(trim(p_catatan), ''), nullif(trim(p_publik), ''), p_status,
      case when p_status = 'diedarkan' then now() end
    ) returning * into baru;
    aksi := 'tambah_batch';
  else
    select * into lama from public.batch_produksi where id = p_id for update;
    if not found then raise exception 'Batch tidak ditemukan.' using errcode = 'P0002'; end if;
    if lama.versi <> p_versi then raise exception 'Konflik versi. Muat ulang data.' using errcode = '40001'; end if;
    if lama.status <> 'draft' and (
      p_produk <> lama.produk_id or tanggal <> lama.tanggal_produksi
      or formula is distinct from lama.kode_formula
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

    kode := lama.kode_batch;
    if lama.status = 'draft' then
      if not formula_valid then
        raise exception 'Kode formula wajib, maksimal 20 karakter huruf/angka dengan tanda hubung.' using errcode = '22023';
      end if;
      if p_produk <> lama.produk_id
         and (produk.aktif is not true or produk.kategori not in ('inspirasi', 'signature')) then
        raise exception 'Varian Produk tidak aktif atau bukan racikan WP.' using errcode = '22023';
      end if;
      -- Draft membuat kode baru hanya bila komponen identitasnya berubah.
      if p_produk <> lama.produk_id or tanggal <> lama.tanggal_produksi
         or formula is distinct from lama.kode_formula then
        kode := public.buat_kode_batch(formula, varian, tanggal);
      end if;
    end if;

    update public.batch_produksi set
      kode_batch = kode,
      produk_id = produk.id,
      nama_varian = case when lama.status = 'draft' then trim(produk.nama) else lama.nama_varian end,
      tanggal_produksi = tanggal,
      kode_formula = formula,
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
