-- M6: entri massal Produk dan Artikel secara atomik, create-only, dan auditable.

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

  with masuk as (
    insert into public.produk (
      nama, slug, kategori, ukuran, harga, ringkasan, deskripsi,
      aroma_atas, aroma_tengah, aroma_dasar, karakter, cocok_untuk,
      foto, link_shopee, link_tiktok, unggulan, tersedia, aktif, warna
    )
    select
      p.nama, p.slug, p.kategori, p.ukuran, p.harga, p.ringkasan, p.deskripsi,
      p.aroma_atas, p.aroma_tengah, p.aroma_dasar, p.karakter, p.cocok_untuk,
      p.foto, p.link_shopee, p.link_tiktok, p.unggulan, p.tersedia, p.aktif, p.warna
    from jsonb_to_recordset(produk_baru) as p(
      nama text, slug text, kategori text, ukuran text, harga bigint,
      ringkasan text, deskripsi text, aroma_atas text[], aroma_tengah text[],
      aroma_dasar text[], karakter text[], cocok_untuk text[], foto text[],
      link_shopee text, link_tiktok text, unggulan boolean, tersedia boolean,
      aktif boolean, warna text
    )
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
grant execute on function public.impor_massal_produk_artikel(jsonb, jsonb) to authenticated;

comment on function public.impor_massal_produk_artikel(jsonb, jsonb) is
  'Menyimpan Produk dan Artikel baru dalam satu transaksi. Create-only, maksimal 500 per jenis, artikel selalu draft, dan mencatat satu Log Audit batch.';
