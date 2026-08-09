-- M6: tambah lima Produk Mykonos dari data resmi dan perbarui lima harga pemilik.
-- Sumber profil aroma:
-- https://officialmykonos.com/products/mykonos-reflection-elixir-extrait-de-parfum-50ml
-- https://officialmykonos.com/products/mykonos-reflection-extrait-de-parfum-50ml-100ml
-- https://officialmykonos.com/products/mykonos-conquer-extrait-de-parfum-100ml
-- https://officialmykonos.com/products/mykonos-penthouse-extrait-de-parfum-100ml
-- https://mykonos.com.my/product/invade

begin;

insert into public.profil_rekomendasi (
  kode, nama, tag_aroma, tag_kesan, tag_intensitas, tag_waktu, tag_kegiatan, aktif
)
values
  ('invade', 'Mykonos Invade', array['woody-hangat','manis-gourmand'], array['hangat-nyaman','elegan-dewasa'], array['kuat'], array['malam-sejuk'], array['kencan','formal-acara-khusus'], true),
  ('reflection', 'Mykonos Reflection', array['segar-akuatik','floral-lembut'], array['bersih-ringan','elegan-dewasa'], array['sedang'], array['siang-panas','fleksibel'], array['kampus-kerja','sehari-hari'], true),
  ('reflection-elixir', 'Mykonos Reflection Elixir', array['segar-akuatik','fruity-ceria','floral-lembut'], array['bersih-ringan','ceria-playful','elegan-dewasa'], array['kuat'], array['siang-panas','fleksibel'], array['kampus-kerja','sehari-hari','hangout-aktif'], true),
  ('conquer', 'Mykonos Conquer', array['segar-akuatik','floral-lembut','woody-hangat'], array['elegan-dewasa','hangat-nyaman'], array['kuat'], array['fleksibel'], array['kampus-kerja','formal-acara-khusus'], true),
  ('penthouse', 'Mykonos Penthouse', array['fruity-ceria','floral-lembut','woody-hangat'], array['bersih-ringan','hangat-nyaman','elegan-dewasa'], array['sedang'], array['fleksibel'], array['kampus-kerja','sehari-hari','kencan'], true)
on conflict (kode) do update set
  nama=excluded.nama, tag_aroma=excluded.tag_aroma, tag_kesan=excluded.tag_kesan,
  tag_intensitas=excluded.tag_intensitas, tag_waktu=excluded.tag_waktu,
  tag_kegiatan=excluded.tag_kegiatan, aktif=excluded.aktif, diperbarui_pada=now();

with tautan as (
  select link_shopee, link_tiktok from public.produk
  where kategori='ori' and link_shopee is not null order by dibuat_pada limit 1
), data_produk(
  nama,slug,ukuran,harga,ringkasan,deskripsi,atas,tengah,dasar,karakter,cocok,kode_profil
) as (values
  ('Mykonos Invade 50ml','mykonos-invade-50ml','50 ml',319000,
   'Aroma spicy-hangat dengan lavender, caramel, vanilla, amber, dan dry woods yang tegas.',
   E'Mykonos Invade membuka aroma dengan Pink Pepper, Lavender Absolute, dan Juniper yang segar-spicy. Bagian tengah memadukan Cashmeran, Cinnamon Bark, dan Caramel, lalu mengering pada Amber, Madagascar Vanilla, dan Dry Woods.\n\nSpesifikasi:\n- Ukuran: 50 ml\n- Konsentrasi: Extrait de Parfum\n- Jenis: Unisex\n- Sumber profil aroma: Mykonos Malaysia',
   array['Pink Pepper','Lavender Absolute','Juniper'],array['Cashmeran','Cinnamon Bark','Caramel'],array['Amber','Madagascar Vanilla','Dry Woods'],array['Spicy','Warm','Woody','Sweet','Aromatic'],array['Malam hari','Cuaca sejuk','Kencan','Acara khusus'],'invade'),
  ('Mykonos Reflection 50ml','mykonos-reflection-50ml','50 ml',319000,
   'Citrus segar dan bercahaya dengan marine notes, floral lembut, musk, amber, dan patchouli.',
   E'Mykonos Reflection menghadirkan Grapefruit, Ginger, dan Bergamot yang segar, dilanjutkan Marine Notes, Cardamom, serta Lily of the Valley. Musk, Patchouli, Amber, dan Ambroxan membentuk dasar yang hangat dan bersih.\n\nSpesifikasi:\n- Ukuran: 50 ml\n- Konsentrasi: Extrait de Parfum\n- Jenis: Unisex\n- BPOM: NA18250611091',
   array['Grapefruit','Ginger','Bergamot'],array['Marine Notes','Cardamom','Lily of the Valley'],array['Musk','Patchouli','Amber','Ambroxan'],array['Fresh Citrus','Aquatic','Floral','Clean','Warm'],array['Aktivitas harian','Kuliah','Kantor','Siang hari'],'reflection'),
  ('Mykonos Reflection Elixir 50ml','mykonos-reflection-elixir-50ml','50 ml',319000,
   'Ledakan citrus segar dengan rhubarb, peach, magnolia, ambroxan, musk, dan chypre modern.',
   E'Mykonos Reflection Elixir dibuka oleh Grapefruit, Bergamot, Ginger, dan Rhubarb Leaves. Ylang-Ylang, Peach, dan Magnolia memberi lapisan floral-fruity sebelum Ambroxan, Musk, dan Chypre Accord membentuk dasar modern.\n\nSpesifikasi:\n- Ukuran: 50 ml\n- Konsentrasi: Extrait de Parfum\n- Jenis: Unisex\n- BPOM: NA18250611889',
   array['Grapefruit','Bergamot','Ginger','Rhubarb Leaves'],array['Ylang-Ylang','Peach','Magnolia'],array['Ambroxan','Musk','Chypre Accord'],array['Fresh Citrus','Fruity','Floral','Musky','Modern'],array['Aktivitas harian','Kuliah','Kantor','Hangout'],'reflection-elixir'),
  ('Mykonos Conquer 100ml','mykonos-conquer-100ml','100 ml',548000,
   'Bergamot, ginger, dan cardamom yang energik dengan orris, orange blossom, amber, dan kayu hangat.',
   E'Mykonos Conquer membuka dengan Bergamot, Ginger, dan Cardamom. Orris serta Orange Blossom memberi kedalaman floral, lalu Patchouli, Musk, Modern Amber, dan Vanilla membentuk dasar hangat.\n\nSpesifikasi:\n- Ukuran: 100 ml\n- Konsentrasi: Extrait de Parfum\n- Jenis: Unisex\n- BPOM: NA18260600178',
   array['Bergamot','Ginger','Cardamom'],array['Orris','Orange Blossom'],array['Patchouli','Musk','Modern Amber','Vanilla'],array['Fresh Spicy','Floral','Woody','Warm','Confident'],array['Kantor','Acara formal','Aktivitas harian'],'conquer'),
  ('Mykonos Penthouse 50ml','mykonos-penthouse-50ml','50 ml',319000,
   'Aroma clean-soapy dengan blackcurrant, white tea, white florals, cashmere wood, dan clean musk.',
   E'Mykonos Penthouse dibuka oleh Sparkling Blackcurrant, Aldehydes, Mandarin Zest, dan Rose Mist. White Florals, White Tea Vapor, White Soap Accord, Cashmere Wood, serta Cedarwood membangun kesan bersih; Tonka Foam, Iso E Super, Amber, Clean Musks, dan Cashmeran menyempurnakan dasarnya.\n\nSpesifikasi:\n- Ukuran: 50 ml\n- Konsentrasi: Extrait de Parfum\n- Jenis: Unisex\n- BPOM: NA18250611825',
   array['Sparkling Blackcurrant','Aldehydes','Mandarin Zest','Rose Mist'],array['Velvety White Floral','White Tea Vapor','White Soap Accord','Cashmere Wood','Cedarwood'],array['Tonka Foam','Iso E Super','Amber','Clean Musks','Cashmeran'],array['Clean','Soapy','Floral','Soft','Woody'],array['Aktivitas harian','Kuliah','Kantor','Kencan'],'penthouse')
)
insert into public.produk (
  nama,slug,kategori,ukuran,harga,ringkasan,deskripsi,aroma_atas,aroma_tengah,
  aroma_dasar,karakter,cocok_untuk,foto,link_shopee,link_tiktok,unggulan,
  tersedia,aktif,warna,profil_rekomendasi_id
)
select d.nama,d.slug,'ori',d.ukuran,d.harga,d.ringkasan,d.deskripsi,d.atas,d.tengah,
 d.dasar,d.karakter,d.cocok,'{}'::text[],t.link_shopee,t.link_tiktok,false,true,true,
 'krem',r.id
from data_produk d
join public.profil_rekomendasi r on r.kode=d.kode_profil
cross join tautan t
on conflict (slug) do update set
  nama=excluded.nama,ukuran=excluded.ukuran,harga=excluded.harga,ringkasan=excluded.ringkasan,
  deskripsi=excluded.deskripsi,aroma_atas=excluded.aroma_atas,aroma_tengah=excluded.aroma_tengah,
  aroma_dasar=excluded.aroma_dasar,karakter=excluded.karakter,cocok_untuk=excluded.cocok_untuk,
  profil_rekomendasi_id=excluded.profil_rekomendasi_id,tersedia=true,aktif=true,diperbarui_pada=now();

with harga(slug,nilai) as (values
  ('mykonos-glitch-100ml', 548000),
  ('mykonos-monaco-royale-100ml', 548000),
  ('mykonos-dreamscape-100ml', 548000),
  ('mykonos-glitch-50ml', 319000),
  ('mykonos-dreamscape-50ml', 298000)
)
update public.produk p set harga=h.nilai,diperbarui_pada=now() from harga h where p.slug=h.slug;

do $$ declare jumlah_baru int; jumlah_harga int; begin
  select count(*) into jumlah_baru from public.produk where slug=any(array[
    'mykonos-invade-50ml','mykonos-reflection-50ml','mykonos-reflection-elixir-50ml',
    'mykonos-conquer-100ml','mykonos-penthouse-50ml']);
  if jumlah_baru<>5 then raise exception 'Produk baru tidak lengkap: ditemukan %, diharapkan 5.',jumlah_baru; end if;
  select count(*) into jumlah_harga from public.produk where (slug,harga) in (
    ('mykonos-glitch-100ml',548000),('mykonos-monaco-royale-100ml',548000),
    ('mykonos-dreamscape-100ml',548000),('mykonos-glitch-50ml',319000),
    ('mykonos-dreamscape-50ml',298000));
  if jumlah_harga<>5 then raise exception 'Harga target tidak lengkap: ditemukan %, diharapkan 5.',jumlah_harga; end if;
end $$;

commit;
