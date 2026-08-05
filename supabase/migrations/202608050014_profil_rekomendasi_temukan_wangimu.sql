-- M6: profil rekomendasi baku untuk Temukan Wangimu dan pengelompokan varian Produk.

create table if not exists public.profil_rekomendasi (
  id uuid primary key default gen_random_uuid(),
  kode text not null unique check (kode ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  nama text not null check (char_length(trim(nama)) >= 3),
  tag_aroma text[] not null check (
    cardinality(tag_aroma) > 0 and tag_aroma <@ array[
      'segar-akuatik', 'manis-gourmand', 'floral-lembut',
      'woody-hangat', 'fruity-ceria'
    ]::text[]
  ),
  tag_kesan text[] not null check (
    cardinality(tag_kesan) > 0 and tag_kesan <@ array[
      'bersih-ringan', 'ceria-playful', 'hangat-nyaman',
      'elegan-dewasa', 'romantis-lembut'
    ]::text[]
  ),
  tag_intensitas text[] not null check (
    cardinality(tag_intensitas) > 0 and tag_intensitas <@ array[
      'ringan', 'sedang', 'kuat'
    ]::text[]
  ),
  tag_waktu text[] not null check (
    cardinality(tag_waktu) > 0 and tag_waktu <@ array[
      'siang-panas', 'malam-sejuk', 'fleksibel'
    ]::text[]
  ),
  tag_kegiatan text[] not null check (
    cardinality(tag_kegiatan) > 0 and tag_kegiatan <@ array[
      'kampus-kerja', 'sehari-hari', 'hangout-aktif', 'kencan',
      'formal-acara-khusus'
    ]::text[]
  ),
  aktif boolean not null default true,
  dibuat_pada timestamptz not null default now(),
  diperbarui_pada timestamptz not null default now()
);

alter table public.produk
  add column if not exists profil_rekomendasi_id uuid
  references public.profil_rekomendasi(id) on delete restrict;

create index if not exists profil_rekomendasi_aktif_idx
  on public.profil_rekomendasi(aktif, nama);
create index if not exists produk_profil_rekomendasi_idx
  on public.produk(profil_rekomendasi_id);

drop trigger if exists profil_rekomendasi_atur_diperbarui_pada
  on public.profil_rekomendasi;
create trigger profil_rekomendasi_atur_diperbarui_pada
before update on public.profil_rekomendasi
for each row execute function public.atur_diperbarui_pada();

drop trigger if exists audit_profil_rekomendasi on public.profil_rekomendasi;
create trigger audit_profil_rekomendasi
after insert or update on public.profil_rekomendasi
for each row execute function public.catat_log_audit();

alter table public.profil_rekomendasi enable row level security;

drop policy if exists "Publik membaca profil rekomendasi aktif"
  on public.profil_rekomendasi;
create policy "Publik membaca profil rekomendasi aktif"
on public.profil_rekomendasi for select
to anon, authenticated using (aktif = true);

drop policy if exists "Admin membaca seluruh profil rekomendasi"
  on public.profil_rekomendasi;
create policy "Admin membaca seluruh profil rekomendasi"
on public.profil_rekomendasi for select
to authenticated using ((select public.apakah_admin()));

drop policy if exists "Admin menambah profil rekomendasi"
  on public.profil_rekomendasi;
create policy "Admin menambah profil rekomendasi"
on public.profil_rekomendasi for insert
to authenticated with check ((select public.apakah_admin()));

drop policy if exists "Admin mengubah profil rekomendasi"
  on public.profil_rekomendasi;
create policy "Admin mengubah profil rekomendasi"
on public.profil_rekomendasi for update
to authenticated using ((select public.apakah_admin()))
with check ((select public.apakah_admin()));

grant select on table public.profil_rekomendasi to anon, authenticated;
grant insert, update on table public.profil_rekomendasi to authenticated;

insert into public.profil_rekomendasi (
  kode, nama, tag_aroma, tag_kesan, tag_intensitas, tag_waktu,
  tag_kegiatan, aktif
)
values
  (
    'california-blue', 'Mykonos California Blue',
    array['segar-akuatik', 'fruity-ceria', 'manis-gourmand'],
    array['bersih-ringan', 'ceria-playful'], array['ringan'],
    array['siang-panas'], array['sehari-hari', 'hangout-aktif'], true
  ),
  (
    'california-signature', 'Mykonos California Signature',
    array['segar-akuatik', 'woody-hangat'],
    array['bersih-ringan', 'elegan-dewasa'], array['sedang'],
    array['siang-panas'],
    array['kampus-kerja', 'sehari-hari', 'hangout-aktif'], true
  ),
  (
    'dreamscape', 'Mykonos Dreamscape',
    array['fruity-ceria', 'manis-gourmand'],
    array['ceria-playful', 'hangat-nyaman'], array['kuat'],
    array['fleksibel'], array['sehari-hari', 'hangout-aktif'], true
  ),
  (
    'monaco-royale', 'Mykonos Monaco Royale',
    array['segar-akuatik', 'fruity-ceria', 'woody-hangat', 'manis-gourmand'],
    array['elegan-dewasa', 'hangat-nyaman', 'romantis-lembut'],
    array['sedang'], array['malam-sejuk', 'fleksibel'],
    array['sehari-hari', 'kencan'], true
  ),
  (
    'royal-ispahan', 'Mykonos Royal Ispahan',
    array['floral-lembut', 'fruity-ceria', 'manis-gourmand'],
    array['romantis-lembut', 'hangat-nyaman', 'elegan-dewasa'],
    array['kuat'], array['malam-sejuk', 'fleksibel'],
    array['sehari-hari', 'kencan', 'formal-acara-khusus'], true
  )
on conflict (kode) do update set
  nama = excluded.nama,
  tag_aroma = excluded.tag_aroma,
  tag_kesan = excluded.tag_kesan,
  tag_intensitas = excluded.tag_intensitas,
  tag_waktu = excluded.tag_waktu,
  tag_kegiatan = excluded.tag_kegiatan,
  aktif = excluded.aktif,
  diperbarui_pada = now();

update public.produk as p
set profil_rekomendasi_id = r.id
from public.profil_rekomendasi as r
where p.kategori <> 'decant'
  and (
    (r.kode = 'california-blue' and lower(p.nama) like 'mykonos california blue %')
    or (r.kode = 'california-signature' and lower(p.nama) like 'mykonos california signature %')
    or (r.kode = 'dreamscape' and lower(p.nama) like 'mykonos dreamscape %')
    or (r.kode = 'monaco-royale' and lower(p.nama) like 'mykonos monaco royale %')
    or (r.kode = 'royal-ispahan' and lower(p.nama) like 'mykonos royal ispahan %')
  );

comment on table public.profil_rekomendasi is
  'Profil tag baku yang dipakai Temukan Wangimu untuk menilai satu keluarga aroma.';
comment on column public.produk.profil_rekomendasi_id is
  'Mengelompokkan beberapa ukuran Produk ke satu keluarga aroma rekomendasi.';

create or replace function public.impor_massal_produk_artikel(
  produk_baru jsonb default '[]'::jsonb,
  artikel_baru jsonb default '[]'::jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  jumlah_produk integer;
  jumlah_artikel integer;
  id_batch uuid := gen_random_uuid();
  id_produk uuid[];
  id_artikel uuid[];
begin
  if not public.apakah_admin() then
    raise exception 'Akses Admin diperlukan.';
  end if;

  if jsonb_typeof(produk_baru) <> 'array' or jsonb_typeof(artikel_baru) <> 'array' then
    raise exception 'Muatan impor harus berupa array.';
  end if;

  jumlah_produk := jsonb_array_length(produk_baru);
  jumlah_artikel := jsonb_array_length(artikel_baru);

  if jumlah_produk > 500 or jumlah_artikel > 500 then
    raise exception 'Maksimal 500 baris per jenis.';
  end if;
  if jumlah_produk + jumlah_artikel = 0 then
    raise exception 'Tidak ada baris valid untuk diimpor.';
  end if;

  if exists (
    select p.slug from jsonb_to_recordset(produk_baru) as p(slug text)
    group by p.slug having count(*) > 1
  ) then
    raise exception 'Impor dibatalkan: ada slug Produk ganda dalam batch.';
  end if;
  if exists (
    select a.slug from jsonb_to_recordset(artikel_baru) as a(slug text)
    group by a.slug having count(*) > 1
  ) then
    raise exception 'Impor dibatalkan: ada slug Artikel ganda dalam batch.';
  end if;

  if exists (
    select 1 from jsonb_to_recordset(produk_baru) as p(slug text)
    join public.produk lama on lama.slug = p.slug
  ) then
    raise exception 'Impor dibatalkan: ada slug Produk yang sudah tersedia.';
  end if;
  if exists (
    select 1 from jsonb_to_recordset(artikel_baru) as a(slug text)
    join public.artikel lama on lama.slug = a.slug
  ) then
    raise exception 'Impor dibatalkan: ada slug Artikel yang sudah tersedia.';
  end if;

  if exists (
    select 1
    from jsonb_to_recordset(produk_baru) as p(kode_profil_rekomendasi text)
    where nullif(trim(p.kode_profil_rekomendasi), '') is not null
      and not exists (
        select 1 from public.profil_rekomendasi r
        where r.kode = p.kode_profil_rekomendasi and r.aktif = true
      )
  ) then
    raise exception 'Impor dibatalkan: kode profil rekomendasi tidak tersedia atau nonaktif.';
  end if;

  with masuk as (
    insert into public.produk (
      nama, slug, kategori, ukuran, harga, ringkasan, deskripsi,
      aroma_atas, aroma_tengah, aroma_dasar, karakter, cocok_untuk,
      foto, link_shopee, link_tiktok, unggulan, tersedia, aktif, warna,
      profil_rekomendasi_id
    )
    select
      p.nama, p.slug, p.kategori, p.ukuran, p.harga, p.ringkasan, p.deskripsi,
      p.aroma_atas, p.aroma_tengah, p.aroma_dasar, p.karakter, p.cocok_untuk,
      p.foto, p.link_shopee, p.link_tiktok, p.unggulan, p.tersedia, p.aktif,
      p.warna, r.id
    from jsonb_to_recordset(produk_baru) as p(
      nama text, slug text, kategori text, ukuran text, harga bigint,
      ringkasan text, deskripsi text, aroma_atas text[], aroma_tengah text[],
      aroma_dasar text[], karakter text[], cocok_untuk text[], foto text[],
      link_shopee text, link_tiktok text, unggulan boolean, tersedia boolean,
      aktif boolean, warna text, kode_profil_rekomendasi text
    )
    left join public.profil_rekomendasi r
      on r.kode = nullif(trim(p.kode_profil_rekomendasi), '') and r.aktif = true
    returning id
  ) select coalesce(array_agg(id), '{}'::uuid[]) into id_produk from masuk;

  with masuk as (
    insert into public.artikel (
      judul, slug, kategori, cuplikan, bagian, isi_markdown, meta_judul,
      meta_deskripsi, fokus_kata_kunci, foto_utama, foto_alt, warna,
      menit_baca, share_aktif, status, tanggal_terbit, penulis
    )
    select
      a.judul, a.slug, a.kategori, a.cuplikan, a.bagian, a.isi_markdown,
      a.meta_judul, a.meta_deskripsi, a.fokus_kata_kunci, a.foto_utama,
      a.foto_alt, a.warna, a.menit_baca, a.share_aktif,
      'draft', null, a.penulis
    from jsonb_to_recordset(artikel_baru) as a(
      judul text, slug text, kategori text, cuplikan text, bagian jsonb,
      isi_markdown text, meta_judul text, meta_deskripsi text,
      fokus_kata_kunci text, foto_utama text, foto_alt text, warna text,
      menit_baca integer, share_aktif boolean, status text,
      tanggal_terbit timestamptz, penulis text
    )
    returning id
  ) select coalesce(array_agg(id), '{}'::uuid[]) into id_artikel from masuk;

  insert into public.log_audit (
    aktor_id, aksi, entitas, entitas_id, nilai_baru
  ) values (
    auth.uid(), 'impor_massal', 'produk_artikel', id_batch,
    jsonb_build_object(
      'jumlah_produk', jumlah_produk,
      'jumlah_artikel', jumlah_artikel,
      'id_produk', to_jsonb(id_produk),
      'id_artikel', to_jsonb(id_artikel)
    )
  );

  return jsonb_build_object(
    'batch_id', id_batch,
    'jumlah_produk', jumlah_produk,
    'jumlah_artikel', jumlah_artikel,
    'id_produk', to_jsonb(id_produk),
    'id_artikel', to_jsonb(id_artikel)
  );
end;
$$;

revoke all on function public.impor_massal_produk_artikel(jsonb, jsonb) from public;
grant execute on function public.impor_massal_produk_artikel(jsonb, jsonb)
  to authenticated;

comment on function public.impor_massal_produk_artikel(jsonb, jsonb) is
  'Menyimpan Produk dan Artikel baru secara atomik serta menghubungkan kode profil rekomendasi yang valid.';
