-- M6: menambahkan empat ukuran Decant Mykonos dan menyelaraskan profil Monaco Royale.

begin;

with profil_varian as (
  select
    $profil$
Pilihan varian aroma:

1. Mykonos Monaco Royale
Ringkasan aroma:
Perpaduan fruity-green yang segar dengan kayu lembut, karamel, musk, dan moss yang terasa elegan serta sensual.

Aroma atas: Pear, Melon, Green Notes
Aroma tengah: Soft Wood, Cedarwood
Aroma dasar: Moss, Caramel, Musk
Karakter: Fresh, Green, Fruity, Woody, Sweet, Musky
Cocok untuk: Harian, kencan, acara santai, dan suasana ber-AC
BPOM full bottle original: NA18240609900

2. Mykonos Royal Ispahan
Ringkasan aroma:
Aroma floral-fruity yang lembut dan romantis dengan raspberry, lychee, rose milk, violet, vanilla, dan amber.

Aroma atas: Bergamot, Raspberry, Lychee, Cotton Flower
Aroma tengah: Violet, Rose Milk, Soft Wood
Aroma dasar: Vanilla, Guaiac Wood, Amber
Karakter: Fruity, Rosy, Creamy, Soft, Sweet, Ambery
Cocok untuk: Harian, kencan, acara santai, dan penggemar aroma mawar yang lembut
BPOM full bottle original: NA18250604162

3. Mykonos Dreamscape
Ringkasan aroma:
Aroma tropical-fruity yang cerah dan adiktif dengan mangga, lemon Italia, praline, jasmine, tonka bean, dan grey amber.

Aroma atas: Mango, Italian Lemon, Rhubarb
Aroma tengah: Ginger, Jasmine, Violet, Praline, Pink Pepper
Aroma dasar: Cedar, Grey Amber, Tonka Beans, Moss
Karakter: Tropical, Fruity, Sweet, Spicy, Woody, Ambery
Cocok untuk: Aktivitas harian, hangout, siang maupun malam
BPOM full bottle original: NA18250605476

4. Mykonos California Signature
Ringkasan aroma:
Aroma citrus-aquatic yang segar dengan sentuhan aromatic, lavender, lychee, teak wood, tonka bean, dan vetiver.

Aroma atas: Mandarin Orange, Lemon
Aroma tengah: Lychee, Rosemary, Cardamom, Lavender, Geranium, Aquatic Notes
Aroma dasar: Tonka Bean, Teak Wood, Vetiver
Karakter: Fresh, Citrus, Aquatic, Aromatic, Woody
Cocok untuk: Kuliah, kerja, olahraga ringan, aktivitas siang, dan cuaca panas
BPOM full bottle original: NA18230605923

5. Mykonos California Blue
Ringkasan aroma:
Aroma fruity-aquatic yang playful dan menyegarkan dengan pear, grapefruit, pink salt, marine notes, softwood, serta caramel.

Aroma atas: Lavender, Pear, Grapefruit, Pink Salt
Aroma tengah: Rhubarb, Water Blossoms, Marine Notes
Aroma dasar: Moss, Softwood, Caramel
Karakter: Fruity, Aquatic, Fresh, Salty, Playful, Slightly Sweet
Cocok untuk: Aktivitas kasual, jalan-jalan, siang hari, dan cuaca panas
BPOM full bottle original: NA18250600809
    $profil$::text as pilihan,
    array[
      'Monaco Royale: Pear, Melon, Green Notes',
      'Royal Ispahan: Bergamot, Raspberry, Lychee, Cotton Flower',
      'Dreamscape: Mango, Italian Lemon, Rhubarb',
      'California Signature: Mandarin Orange, Lemon',
      'California Blue: Lavender, Pear, Grapefruit, Pink Salt'
    ]::text[] as aroma_atas,
    array[
      'Monaco Royale: Soft Wood, Cedarwood',
      'Royal Ispahan: Violet, Rose Milk, Soft Wood',
      'Dreamscape: Ginger, Jasmine, Violet, Praline, Pink Pepper',
      'California Signature: Lychee, Rosemary, Cardamom, Lavender, Geranium, Aquatic Notes',
      'California Blue: Rhubarb, Water Blossoms, Marine Notes'
    ]::text[] as aroma_tengah,
    array[
      'Monaco Royale: Moss, Caramel, Musk',
      'Royal Ispahan: Vanilla, Guaiac Wood, Amber',
      'Dreamscape: Cedar, Grey Amber, Tonka Beans, Moss',
      'California Signature: Tonka Bean, Teak Wood, Vetiver',
      'California Blue: Moss, Softwood, Caramel'
    ]::text[] as aroma_dasar,
    array[
      'Monaco Royale: Fresh, Green, Fruity, Woody, Sweet, Musky',
      'Royal Ispahan: Fruity, Rosy, Creamy, Soft, Sweet, Ambery',
      'Dreamscape: Tropical, Fruity, Sweet, Spicy, Woody, Ambery',
      'California Signature: Fresh, Citrus, Aquatic, Aromatic, Woody',
      'California Blue: Fruity, Aquatic, Fresh, Salty, Playful, Slightly Sweet'
    ]::text[] as karakter,
    array[
      'Monaco Royale: Harian, kencan, acara santai, dan suasana ber-AC',
      'Royal Ispahan: Harian, kencan, acara santai, dan penggemar aroma mawar yang lembut',
      'Dreamscape: Aktivitas harian, hangout, siang maupun malam',
      'California Signature: Kuliah, kerja, olahraga ringan, aktivitas siang, dan cuaca panas',
      'California Blue: Aktivitas kasual, jalan-jalan, siang hari, dan cuaca panas'
    ]::text[] as cocok_untuk
),
sumber (
  nama,
  slug,
  ukuran,
  harga,
  ringkasan,
  deskripsi_awal,
  deskripsi_akhir
) as (
  values
  (
    'Decant Mykonos Original 1ml – Pilih Varian'::text,
    'decant-mykonos-original-1ml-pilih-varian'::text,
    '1 ml'::text,
    19000::bigint,
    'Decant parfum original Mykonos ukuran 1 ml yang ekonomis untuk mencoba karakter aroma sebelum membeli ukuran lebih besar. Tersedia dalam lima varian pilihan dengan isi parfum tanpa campuran.'::text,
    $awal_1$Ingin mencoba parfum Mykonos tetapi belum yakin dengan varian aroma yang paling cocok? Decant Mykonos Original 1 ml dari Wawangian Pelajar merupakan pilihan paling hemat untuk mengenal karakter suatu parfum sebelum membeli ukuran decant yang lebih besar atau full bottle.

Isi parfum dipindahkan dari botol original Mykonos ke kemasan decant mini tanpa pengenceran, tanpa penambahan alkohol, dan tanpa pencampuran bahan lain. Dengan ukuran yang sangat ringkas, produk ini cocok digunakan sebagai tester pribadi, sampel aroma, atau dibawa sebagai parfum cadangan di dalam saku dan pouch kecil.

Ukuran 1 ml direkomendasikan bagi pembeli yang ingin mencoba aroma pada kulit dalam beberapa kali pemakaian. Karena aroma parfum dapat berkembang secara berbeda pada setiap orang, mencoba decant terlebih dahulu membantu Anda menilai opening, perkembangan aroma, dry-down, tingkat kemanisan, serta kenyamanan parfum ketika digunakan.

Spesifikasi:
- Isi bersih: 1 ml
- Jenis produk: Decant / share in bottle
- Sumber isi: Dipindahkan dari botol original Mykonos
- Kondisi isi: Tanpa campuran dan tanpa pengenceran
- Konsentrasi: Mengikuti konsentrasi full bottle original masing-masing varian
- Kemasan: Botol decant mini
- Estimasi penggunaan: Sekitar 8–15 kali aplikasi, tergantung tipe aplikator dan jumlah pemakaian
- Jenis kelamin: Unisex
- Cocok untuk: Tester aroma, eksplorasi parfum, dan mencoba sebelum membeli ukuran lebih besar$awal_1$::text,
    $akhir_1$Keunggulan:
- Isi parfum berasal dari botol original Mykonos
- Tidak diencerkan dan tidak dicampur bahan lain
- Harga lebih hemat untuk mencoba aroma
- Membantu mengurangi risiko salah membeli full bottle
- Ukuran sangat kecil dan praktis dibawa
- Cocok untuk membandingkan beberapa varian sekaligus

Cara penggunaan:
Aplikasikan parfum secukupnya pada titik nadi seperti pergelangan tangan, leher, belakang telinga, atau lipatan siku. Jangan langsung menggosok area yang telah diberi parfum agar perkembangan aromanya tidak terganggu.

Cara penyimpanan:
Simpan di tempat yang sejuk dan kering. Hindarkan dari sinar matahari langsung, suhu panas, serta area yang terlalu lembap. Tutup kemasan dengan rapat setelah digunakan.

Catatan penting:
- Produk ini adalah parfum decant, bukan botol full size dan bukan kemasan resmi pabrik Mykonos.
- Isi parfum dipindahkan dari botol original ke kemasan yang lebih kecil.
- Bentuk, warna, tutup, atau aplikator botol decant dapat menyesuaikan stok tanpa mengubah jumlah isi.
- Warna cairan dapat berbeda pada setiap varian.
- Ketahanan, proyeksi, dan perkembangan aroma dapat berbeda tergantung jenis kulit, cuaca, aktivitas, jumlah pemakaian, dan cara penyimpanan.
- Selera aroma bersifat pribadi. Ketidaksesuaian aroma dengan selera tidak berarti produk rusak atau tidak original.
- Nomor BPOM yang dicantumkan merupakan nomor BPOM produk full bottle original sebagai sumber parfum, bukan registrasi khusus kemasan decant.
- Untuk komplain kebocoran, kerusakan, kekurangan isi, atau kesalahan varian, pembeli disarankan membuat video unboxing tanpa jeda sejak paket masih tertutup.$akhir_1$::text
  ),
  (
    'Decant Mykonos Original 2ml – Pilih Varian'::text,
    'decant-mykonos-original-2ml-pilih-varian'::text,
    '2 ml'::text,
    34000::bigint,
    'Decant parfum original Mykonos ukuran 2 ml untuk mencoba aroma lebih menyeluruh dalam beberapa kali pemakaian. Praktis, hemat, dan tersedia dalam lima varian pilihan.'::text,
    $awal_2$Decant Mykonos Original 2 ml dari Wawangian Pelajar cocok untuk Anda yang ingin mencoba sebuah aroma lebih dari satu kali sebelum menentukan pilihan. Ukuran ini memberikan kesempatan untuk mengenakan parfum pada kondisi yang berbeda, misalnya saat kuliah, bekerja, bepergian, berada di ruangan ber-AC, atau beraktivitas di luar ruangan.

Parfum dipindahkan dari botol original Mykonos ke botol decant berukuran kecil tanpa pengenceran, tanpa penambahan alkohol, dan tanpa campuran material lain. Aroma dan konsentrasinya mengikuti parfum yang terdapat di dalam full bottle original.

Dibandingkan ukuran tester 1 ml, ukuran 2 ml lebih ideal untuk mengamati perkembangan parfum sejak semprotan awal hingga dry-down. Anda dapat mengetahui apakah aromanya nyaman dipakai dalam durasi lebih panjang, sesuai dengan gaya pribadi, serta cocok digunakan pada situasi yang Anda inginkan.

Spesifikasi:
- Isi bersih: 2 ml
- Jenis produk: Decant / share in bottle
- Sumber isi: Dipindahkan dari botol original Mykonos
- Kondisi isi: Tanpa campuran dan tanpa pengenceran
- Konsentrasi: Mengikuti konsentrasi full bottle original masing-masing varian
- Kemasan: Botol decant praktis
- Estimasi penggunaan: Sekitar 20–35 kali semprot, tergantung atomizer dan jumlah semprotan
- Jenis kelamin: Unisex
- Cocok untuk: Mencoba aroma beberapa kali, tester sebelum membeli ukuran lebih besar, dan dibawa sehari-hari$awal_2$::text,
    $akhir_2$Keunggulan:
- Isi parfum berasal dari botol original Mykonos
- Tanpa campuran dan tanpa pengenceran
- Cukup untuk mencoba aroma dalam beberapa kali pemakaian
- Lebih hemat daripada langsung membeli full bottle
- Praktis disimpan di saku, pouch, atau tas kecil
- Cocok untuk membuat koleksi aroma dalam berbagai varian

Cara penggunaan:
Semprotkan secukupnya pada titik nadi dari jarak yang sesuai. Untuk menilai aromanya, biarkan parfum berkembang secara alami dan hindari menggosok kulit setelah penyemprotan.

Cara penyimpanan:
Simpan di tempat sejuk, kering, dan terlindung dari sinar matahari langsung. Pastikan tutup botol terpasang rapat setelah digunakan.

Catatan penting:
- Produk ini adalah parfum decant, bukan botol full size dan bukan kemasan resmi pabrik Mykonos.
- Isi dipindahkan dari full bottle original ke botol decant.
- Model dan warna botol atau atomizer dapat menyesuaikan stok.
- Estimasi jumlah semprotan bukan angka pasti karena dipengaruhi tipe atomizer dan tekanan semprot.
- Ketahanan dan proyeksi aroma dapat berbeda pada setiap orang.
- Selera terhadap aroma bersifat subjektif.
- Nomor BPOM yang dicantumkan mengacu pada full bottle original sumber parfum.
- Rekam video unboxing tanpa jeda untuk pengajuan komplain terkait kerusakan, kebocoran, kekurangan isi, atau kesalahan pengiriman.$akhir_2$::text
  ),
  (
    'Decant Mykonos Original 5ml – Pilih Varian'::text,
    'decant-mykonos-original-5ml-pilih-varian'::text,
    '5 ml'::text,
    69000::bigint,
    'Decant parfum original Mykonos ukuran 5 ml yang praktis untuk penggunaan rutin dan travelling. Lebih leluasa digunakan tanpa harus membeli full bottle.'::text,
    $awal_5$Decant Mykonos Original 5 ml dari Wawangian Pelajar menawarkan keseimbangan antara ukuran yang praktis dan jumlah pemakaian yang lebih memadai. Ukuran ini cocok bagi Anda yang sudah menyukai suatu varian Mykonos, tetapi belum membutuhkan full bottle atau ingin memiliki parfum travel-friendly untuk menemani aktivitas sehari-hari.

Isi parfum berasal dari botol original Mykonos yang dipindahkan ke botol decant tanpa pengenceran, tanpa penambahan alkohol, dan tanpa campuran bahan lain. Dengan kemasan yang lebih kecil, parfum lebih mudah dibawa saat kuliah, bekerja, hangout, menghadiri acara, atau bepergian.

Ukuran 5 ml memberikan kesempatan yang lebih luas untuk menikmati aroma dalam berbagai situasi dan cuaca. Anda juga dapat menggunakannya untuk mengevaluasi performa parfum secara lebih akurat sebelum memutuskan membeli full bottle.

Spesifikasi:
- Isi bersih: 5 ml
- Jenis produk: Decant / share in bottle / travel size
- Sumber isi: Dipindahkan dari botol original Mykonos
- Kondisi isi: Tanpa campuran dan tanpa pengenceran
- Konsentrasi: Mengikuti konsentrasi full bottle original masing-masing varian
- Kemasan: Botol decant dengan atomizer
- Estimasi penggunaan: Sekitar 60–85 kali semprot, tergantung atomizer dan jumlah semprotan
- Jenis kelamin: Unisex
- Cocok untuk: Pemakaian rutin, koleksi, perjalanan, dan mencoba parfum dalam jangka lebih panjang$awal_5$::text,
    $akhir_5$Keunggulan:
- Berasal dari botol original Mykonos
- Tidak dicampur dan tidak diencerkan
- Ukuran ideal untuk pemakaian rutin
- Praktis untuk dibawa bepergian
- Lebih hemat daripada membeli full bottle
- Memberikan waktu pemakaian yang cukup untuk mengenal karakter parfum
- Cocok sebagai parfum utama dalam ukuran ringkas

Cara penggunaan:
Semprotkan parfum pada titik nadi seperti pergelangan tangan, leher, belakang telinga, atau lipatan siku. Gunakan secukupnya dan sesuaikan jumlah semprotan dengan situasi.

Cara penyimpanan:
Letakkan botol dalam posisi tegak di tempat sejuk dan kering. Jauhkan dari paparan matahari langsung, suhu panas, dan kelembapan tinggi.

Catatan penting:
- Produk yang dijual adalah parfum decant, bukan botol full size.
- Kemasan decant bukan kemasan resmi pabrik Mykonos.
- Warna, bentuk, dan tipe atomizer dapat menyesuaikan stok.
- Aroma dan warna cairan berbeda pada setiap varian.
- Estimasi semprotan dapat berubah tergantung tipe atomizer.
- Performa parfum dipengaruhi kulit, cuaca, aktivitas, dan jumlah semprotan.
- Nomor BPOM mengacu pada produk full bottle original.
- Sertakan video unboxing tanpa jeda apabila terjadi kerusakan, kebocoran, kekurangan isi, atau kesalahan varian.$akhir_5$::text
  ),
  (
    'Decant Mykonos Original 10ml – Pilih Varian'::text,
    'decant-mykonos-original-10ml-pilih-varian'::text,
    '10 ml'::text,
    129000::bigint,
    'Decant parfum original Mykonos ukuran 10 ml untuk penggunaan lebih lama. Kapasitas besar, tetap praktis dibawa, dan lebih hemat dibandingkan membeli full bottle.'::text,
    $awal_10$Decant Mykonos Original 10 ml dari Wawangian Pelajar merupakan pilihan bagi Anda yang ingin menggunakan aroma favorit secara rutin tanpa langsung membeli full bottle. Kapasitas 10 ml memberi jumlah pemakaian yang lebih panjang, tetapi tetap memiliki bentuk yang ringkas dan mudah dibawa.

Isi parfum dipindahkan langsung dari botol original Mykonos ke botol decant tanpa pengenceran, tanpa tambahan alkohol, dan tanpa campuran bahan lain. Dengan demikian, karakter aroma yang diterima mengikuti parfum pada botol aslinya.

Ukuran 10 ml cocok digunakan sebagai parfum harian, dibawa saat bepergian, disimpan di tas kerja atau tas kuliah, maupun dijadikan alternatif bagi pembeli yang menyukai beberapa aroma dan ingin mengoleksinya dalam ukuran yang lebih terjangkau.

Spesifikasi:
- Isi bersih: 10 ml
- Jenis produk: Decant / share in bottle / travel size
- Sumber isi: Dipindahkan dari botol original Mykonos
- Kondisi isi: Tanpa campuran dan tanpa pengenceran
- Konsentrasi: Mengikuti konsentrasi full bottle original masing-masing varian
- Kemasan: Botol decant dengan atomizer
- Estimasi penggunaan: Sekitar 120–170 kali semprot, tergantung atomizer dan jumlah semprotan
- Jenis kelamin: Unisex
- Cocok untuk: Pemakaian harian, perjalanan, koleksi parfum, dan alternatif full bottle$awal_10$::text,
    $akhir_10$Keunggulan:
- Isi diambil dari botol original Mykonos
- Tanpa campuran dan tanpa pengenceran
- Kapasitas besar untuk pemakaian lebih panjang
- Tetap praktis untuk dibawa
- Lebih terjangkau dibandingkan full bottle
- Ideal bagi pengguna yang telah menemukan varian favorit
- Cocok untuk penggunaan harian maupun acara tertentu

Cara penggunaan:
Semprotkan parfum pada titik nadi dari jarak yang sesuai. Mulai dengan jumlah semprotan secukupnya, kemudian sesuaikan dengan kekuatan aroma, lokasi, cuaca, dan kebutuhan.

Cara penyimpanan:
Simpan botol secara tegak di tempat sejuk dan kering. Hindari paparan sinar matahari langsung, dashboard kendaraan, kamar mandi, serta lokasi dengan perubahan suhu ekstrem.

Catatan penting:
- Produk ini adalah parfum decant dan bukan full bottle.
- Kemasan yang diterima merupakan botol decant, bukan kemasan resmi pabrik Mykonos.
- Bentuk, warna, dan model atomizer dapat berubah sesuai stok.
- Estimasi penggunaan bukan jaminan jumlah semprotan pasti.
- Ketahanan, sillage, proyeksi, dan dry-down dapat berbeda pada setiap pengguna.
- Selera parfum bersifat subjektif.
- Nomor BPOM yang dicantumkan merupakan nomor produk full bottle original.
- Pembeli disarankan merekam video unboxing tanpa jeda untuk keperluan komplain barang rusak, bocor, kurang isi, atau salah varian.$akhir_10$::text
  )
),
data_produk as (
  select
    sumber.nama,
    sumber.slug,
    sumber.ukuran,
    sumber.harga,
    sumber.ringkasan,
    sumber.deskripsi_awal || E'\n\n' || profil_varian.pilihan || E'\n\n' || sumber.deskripsi_akhir as deskripsi,
    profil_varian.aroma_atas,
    profil_varian.aroma_tengah,
    profil_varian.aroma_dasar,
    profil_varian.karakter,
    profil_varian.cocok_untuk
  from sumber
  cross join profil_varian
)
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
)
select
  data_produk.nama,
  data_produk.slug,
  'decant',
  data_produk.ukuran,
  data_produk.harga,
  data_produk.ringkasan,
  data_produk.deskripsi,
  data_produk.aroma_atas,
  data_produk.aroma_tengah,
  data_produk.aroma_dasar,
  data_produk.karakter,
  data_produk.cocok_untuk,
  '{}'::text[],
  'https://shopee.co.id/product/1898971991/45615078540/',
  null,
  false,
  true,
  true,
  'krem'
from data_produk
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
  link_shopee = excluded.link_shopee,
  link_tiktok = excluded.link_tiktok,
  warna = excluded.warna
where row(
  produk.nama,
  produk.kategori,
  produk.ukuran,
  produk.harga,
  produk.ringkasan,
  produk.deskripsi,
  produk.aroma_atas,
  produk.aroma_tengah,
  produk.aroma_dasar,
  produk.karakter,
  produk.cocok_untuk,
  produk.link_shopee,
  produk.link_tiktok,
  produk.warna
) is distinct from row(
  excluded.nama,
  excluded.kategori,
  excluded.ukuran,
  excluded.harga,
  excluded.ringkasan,
  excluded.deskripsi,
  excluded.aroma_atas,
  excluded.aroma_tengah,
  excluded.aroma_dasar,
  excluded.karakter,
  excluded.cocok_untuk,
  excluded.link_shopee,
  excluded.link_tiktok,
  excluded.warna
);

with pembaruan_monaco (slug, deskripsi) as (
  values
  (
    'mykonos-monaco-royale-100ml'::text,
    $monaco_100$Mykonos Monaco Royale menghadirkan perpaduan fruity-green yang segar dengan kayu lembut, karamel, musk, dan moss yang terasa elegan serta sensual. Aroma dibuka oleh Pear, Melon, dan Green Notes, berlanjut ke Soft Wood dan Cedarwood, lalu mengering pada Moss, Caramel, dan Musk.

Spesifikasi:
- Ukuran: 100 ml
- Konsentrasi: Extrait De Parfum
- Kesan Aroma: Fresh, Green, Fruity, Woody, Sweet, Musky
- Cocok untuk: Harian, kencan, acara santai, dan suasana ber-AC
- BPOM full bottle original: NA18240609900$monaco_100$::text
  ),
  (
    'mykonos-monaco-royale-50ml'::text,
    $monaco_50$Mykonos Monaco Royale menghadirkan perpaduan fruity-green yang segar dengan kayu lembut, karamel, musk, dan moss yang terasa elegan serta sensual. Aroma dibuka oleh Pear, Melon, dan Green Notes, berlanjut ke Soft Wood dan Cedarwood, lalu mengering pada Moss, Caramel, dan Musk.

Spesifikasi:
- Ukuran: 50 ml
- Konsentrasi: Extrait De Parfum
- Kesan Aroma: Fresh, Green, Fruity, Woody, Sweet, Musky
- Cocok untuk: Harian, kencan, acara santai, dan suasana ber-AC
- BPOM full bottle original: NA18240609900$monaco_50$::text
  ),
  (
    'mykonos-monaco-royale-15ml'::text,
    $monaco_15$Mykonos Monaco Royale menghadirkan perpaduan fruity-green yang segar dengan kayu lembut, karamel, musk, dan moss yang terasa elegan serta sensual. Aroma dibuka oleh Pear, Melon, dan Green Notes, berlanjut ke Soft Wood dan Cedarwood, lalu mengering pada Moss, Caramel, dan Musk.

Spesifikasi:
- Ukuran: 15 ml
- Konsentrasi: Extrait De Parfum
- Kesan Aroma: Fresh, Green, Fruity, Woody, Sweet, Musky
- Cocok untuk: Harian, kencan, acara santai, dan suasana ber-AC
- BPOM full bottle original: NA18240609900$monaco_15$::text
  )
)
update public.produk as produk
set
  ringkasan = 'Perpaduan fruity-green yang segar dengan kayu lembut, karamel, musk, dan moss yang terasa elegan serta sensual.',
  deskripsi = pembaruan_monaco.deskripsi,
  aroma_atas = array['Pear', 'Melon', 'Green Notes'],
  aroma_tengah = array['Soft Wood', 'Cedarwood'],
  aroma_dasar = array['Moss', 'Caramel', 'Musk'],
  karakter = array['Fresh', 'Green', 'Fruity', 'Woody', 'Sweet', 'Musky'],
  cocok_untuk = array['Harian', 'Kencan', 'Acara santai', 'Suasana ber-AC']
from pembaruan_monaco
where produk.slug = pembaruan_monaco.slug
and row(
  produk.ringkasan,
  produk.deskripsi,
  produk.aroma_atas,
  produk.aroma_tengah,
  produk.aroma_dasar,
  produk.karakter,
  produk.cocok_untuk
) is distinct from row(
  'Perpaduan fruity-green yang segar dengan kayu lembut, karamel, musk, dan moss yang terasa elegan serta sensual.',
  pembaruan_monaco.deskripsi,
  array['Pear', 'Melon', 'Green Notes']::text[],
  array['Soft Wood', 'Cedarwood']::text[],
  array['Moss', 'Caramel', 'Musk']::text[],
  array['Fresh', 'Green', 'Fruity', 'Woody', 'Sweet', 'Musky']::text[],
  array['Harian', 'Kencan', 'Acara santai', 'Suasana ber-AC']::text[]
);

do $$
declare
  jumlah_decant integer;
  jumlah_monaco_sesuai integer;
begin
  select count(*)
  into jumlah_decant
  from public.produk
  where slug = any(array[
    'decant-mykonos-original-1ml-pilih-varian',
    'decant-mykonos-original-2ml-pilih-varian',
    'decant-mykonos-original-5ml-pilih-varian',
    'decant-mykonos-original-10ml-pilih-varian'
  ])
  and kategori = 'decant'
  and harga = case ukuran
    when '1 ml' then 19000
    when '2 ml' then 34000
    when '5 ml' then 69000
    when '10 ml' then 129000
    else -1
  end
  and link_shopee = 'https://shopee.co.id/product/1898971991/45615078540/'
  and aktif = true;

  if jumlah_decant <> 4 then
    raise exception 'Batch Decant Mykonos tidak lengkap: ditemukan %, diharapkan 4.', jumlah_decant;
  end if;

  select count(*)
  into jumlah_monaco_sesuai
  from public.produk
  where slug = any(array[
    'mykonos-monaco-royale-100ml',
    'mykonos-monaco-royale-50ml',
    'mykonos-monaco-royale-15ml'
  ])
  and aroma_atas = array['Pear', 'Melon', 'Green Notes']::text[]
  and aroma_tengah = array['Soft Wood', 'Cedarwood']::text[]
  and aroma_dasar = array['Moss', 'Caramel', 'Musk']::text[];

  if jumlah_monaco_sesuai <> 3 then
    raise exception 'Koreksi profil Monaco Royale tidak lengkap: ditemukan %, diharapkan 3.', jumlah_monaco_sesuai;
  end if;
end;
$$;

commit;
