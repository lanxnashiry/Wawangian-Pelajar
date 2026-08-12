-- M6: menambahkan Decant Mykonos 3 ml sebagai pilihan paling direkomendasikan.

begin;

do $$
declare
  sumber_profil public.produk%rowtype;
  foto_sumber text[];
begin
  select * into sumber_profil
  from public.produk
  where slug = 'decant-mykonos-original-2ml-pilih-varian';

  if sumber_profil.id is null then
    raise exception 'Decant Mykonos 2 ml belum tersedia sebagai sumber profil.';
  end if;

  select foto into foto_sumber
  from public.produk
  where slug = 'decant-mykonos-original-10ml-pilih-varian';

  if foto_sumber is null or cardinality(foto_sumber) = 0 then
    raise exception 'Foto Decant sumber belum tersedia; migrasi dibatalkan.';
  end if;

  insert into public.produk (
    nama,
    slug,
    kategori,
    ukuran,
    harga,
    ringkasan,
    deskripsi,
    aroma_atas,
    aroma_tengah,
    aroma_dasar,
    karakter,
    cocok_untuk,
    foto,
    link_shopee,
    link_tiktok,
    unggulan,
    tersedia,
    aktif,
    warna
  ) values (
    'Decant Mykonos Original 3ml – Pilih Varian',
    'decant-mykonos-original-3ml-pilih-varian',
    'decant',
    '3 ml',
    45000,
    'Pilihan Paling Direkomendasikan untuk mengenal aroma Mykonos dalam beberapa kali pemakaian tanpa langsung membeli ukuran besar. Tersedia dalam enam varian pilihan.',
    $deskripsi$Decant Mykonos Original 3 ml dari Wawangian Pelajar adalah pilihan Paling Direkomendasikan untuk mengenal perkembangan aroma secara lebih utuh tanpa langsung membeli ukuran besar. Isinya cukup untuk beberapa kali pemakaian pada situasi berbeda, sehingga Anda dapat menilai opening, perkembangan aroma, dan dry-down dengan lebih tenang.

Isi parfum dipindahkan dari botol original Mykonos ke botol decant 3 ml tanpa pengenceran, tanpa penambahan alkohol, dan tanpa campuran bahan lain. Aroma dan konsentrasinya mengikuti full bottle original dari varian yang dipilih.

Spesifikasi:
- Isi bersih: 3 ml
- Jenis produk: Decant / share in bottle
- Sumber isi: Dipindahkan dari botol original Mykonos
- Kondisi isi: Tanpa campuran dan tanpa pengenceran
- Konsentrasi: Mengikuti konsentrasi full bottle original masing-masing varian
- Kemasan: Botol decant dengan atomizer
- Jenis kelamin: Unisex
- Cocok untuk: Mengenal aroma dalam beberapa kali pemakaian sebelum memilih ukuran lebih besar

Pilihan varian aroma dan profil notes mengikuti daftar pada halaman produk. Pilihan aroma dilakukan di marketplace saat membeli.

Keunggulan:
- Isi berasal dari botol original Mykonos
- Tidak dicampur dan tidak diencerkan
- Komitmen harga masih ringan dengan isi yang cukup untuk beberapa kali pemakaian
- Praktis dibawa dalam pouch atau tas kecil
- Membantu mengurangi risiko salah memilih full bottle

Cara penggunaan:
Semprotkan secukupnya pada titik nadi, lalu biarkan parfum berkembang tanpa menggosok area yang telah disemprot.

Cara penyimpanan:
Simpan botol dalam posisi tegak di tempat sejuk dan kering. Hindari sinar matahari langsung, suhu panas, dan kelembapan tinggi.

Catatan penting:
- Produk ini adalah parfum decant, bukan botol full size dan bukan kemasan resmi pabrik Mykonos.
- Bentuk, warna, tutup, atau atomizer botol decant dapat menyesuaikan stok tanpa mengubah isi bersih 3 ml.
- Warna cairan dapat berbeda pada setiap varian.
- Ketahanan, proyeksi, dan perkembangan aroma dipengaruhi kulit, cuaca, aktivitas, jumlah pemakaian, serta penyimpanan.
- Selera aroma bersifat pribadi dan tidak menjadi ukuran keaslian atau kondisi produk.
- Nomor BPOM yang dicantumkan mengacu pada full bottle original sebagai sumber parfum.
- Rekam video unboxing tanpa jeda untuk komplain kebocoran, kerusakan, kekurangan isi, atau kesalahan varian.$deskripsi$,
    sumber_profil.aroma_atas,
    sumber_profil.aroma_tengah,
    sumber_profil.aroma_dasar,
    sumber_profil.karakter,
    sumber_profil.cocok_untuk,
    foto_sumber,
    sumber_profil.link_shopee,
    sumber_profil.link_tiktok,
    true,
    true,
    true,
    sumber_profil.warna
  )
  on conflict (slug) do update
  set
    nama = excluded.nama,
    kategori = excluded.kategori,
    ukuran = excluded.ukuran,
    harga = excluded.harga,
    ringkasan = excluded.ringkasan,
    deskripsi = excluded.deskripsi,
    aroma_atas = excluded.aroma_atas,
    aroma_tengah = excluded.aroma_tengah,
    aroma_dasar = excluded.aroma_dasar,
    karakter = excluded.karakter,
    cocok_untuk = excluded.cocok_untuk,
    foto = excluded.foto,
    link_shopee = excluded.link_shopee,
    link_tiktok = excluded.link_tiktok,
    unggulan = excluded.unggulan,
    tersedia = excluded.tersedia,
    aktif = excluded.aktif,
    warna = excluded.warna,
    diperbarui_pada = now();
end;
$$;

commit;
