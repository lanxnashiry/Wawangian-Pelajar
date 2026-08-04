-- M6: pembersihan data teknis dan penyamaan foto empat ukuran Decant.

-- Foto yang diunggah pemilik pada 10 ml menjadi referensi untuk 1/2/5 ml.
do $$
declare
  foto_decant text[];
  jumlah_diperbarui integer;
begin
  select foto into foto_decant
  from public.produk
  where slug = 'decant-mykonos-original-10ml-pilih-varian';

  if foto_decant is null or cardinality(foto_decant) = 0 then
    raise exception 'Foto Decant 10 ml belum tersedia; migrasi dibatalkan.';
  end if;

  update public.produk
  set foto = foto_decant, diperbarui_pada = now()
  where slug in (
    'decant-mykonos-original-1ml-pilih-varian',
    'decant-mykonos-original-2ml-pilih-varian',
    'decant-mykonos-original-5ml-pilih-varian'
  );
  get diagnostics jumlah_diperbarui = row_count;

  if jumlah_diperbarui <> 3 then
    raise exception 'Foto Decant hanya diterapkan ke % dari 3 Produk.', jumlah_diperbarui;
  end if;
end;
$$;

-- Metode periode pertama diperjelas: transaksi offline Rp280.000 dikurangi
-- harga beli Rp249.000 menghasilkan margin Rp31.000; basis laporan dibulatkan
-- konservatif menjadi laba bersih transaksi Rp30.000 sehingga 20% = Rp6.000.
-- Sasaran dipersempit ke rekap paling awal dengan angka tersebut dan dijaga
-- row_count = 1 agar rekap nyata lain yang kebetulan berangka sama tidak ikut
-- berubah; jika lebih dari satu cocok, migrasi digulung balik untuk ditinjau.
do $$
declare
  rekap_sasaran uuid;
  jumlah_cocok integer;
  jumlah_diperbarui integer;
begin
  select count(*) into jumlah_cocok
  from public.rekap_donasi
  where jumlah_donasi = 6000
    and untung_bersih = 30000;

  if jumlah_cocok <> 1 then
    raise exception 'Rekap donasi sasaran tidak tunggal (ditemukan %); perbaiki manual.', jumlah_cocok;
  end if;

  select id into rekap_sasaran
  from public.rekap_donasi
  where jumlah_donasi = 6000
    and untung_bersih = 30000;

  update public.rekap_donasi
  set catatan_metode = 'Penjualan offline Royal Ispahan 50 ml: harga jual Rp280.000 dikurangi harga beli Rp249.000 = margin Rp31.000. Basis laba bersih transaksi dibulatkan konservatif menjadi Rp30.000; 20% = Rp6.000.',
      diperbarui_pada = now()
  where id = rekap_sasaran;
  get diagnostics jumlah_diperbarui = row_count;

  if jumlah_diperbarui <> 1 then
    raise exception 'Pembaruan catatan metode menyentuh % baris, seharusnya 1.', jumlah_diperbarui;
  end if;
end;
$$;

-- Data uji entri massal tidak boleh menetap di katalog hosted.
do $$
declare
  jumlah_dihapus integer;
begin
  delete from public.produk
  where slug = 'uji-hermes-produk-20260804';
  get diagnostics jumlah_dihapus = row_count;

  if jumlah_dihapus > 1 then
    raise exception 'Penghapusan Produk uji menyentuh % baris, seharusnya paling banyak 1.', jumlah_dihapus;
  end if;
end;
$$;

-- Profil afiliasi dummy dihapus. Sasaran diikat ke Auth user uji, bukan hanya
-- alias publik, agar afiliasi nyata dengan alias serupa tidak pernah tersentuh.
-- FK auth.users -> public.afiliasi memakai ON DELETE CASCADE, tetapi
-- penghapusan profil di sini tidak menghapus Auth user.
do $$
declare
  jumlah_dihapus integer;
begin
  delete from public.afiliasi a
  using auth.users u
  where a.pengguna_id = u.id
    and lower(u.email) = 'afiliasi.uji@gmail.com'
    and lower(a.alias_publik) = 'afiliasiuji';
  get diagnostics jumlah_dihapus = row_count;

  if jumlah_dihapus > 1 then
    raise exception 'Penghapusan afiliasi uji menyentuh % baris, seharusnya paling banyak 1.', jumlah_dihapus;
  end if;
end;
$$;

-- Cabut seluruh hak Admin akun teknis. Auth user sengaja tidak dihapus melalui
-- migrasi karena dapat direferensikan Log Audit; tanpa pengguna_admin mereka tidak
-- dapat melewati apakah_admin().
delete from public.pengguna_admin pa
using auth.users u
where pa.pengguna_id = u.id
  and lower(u.email) in ('admin.uji2@example.com', 'admin.uji3@example.com');

-- Ban permanen dan putus sesi aktif akun uji. Record Auth dipertahankan hanya
-- untuk integritas referensi audit.
update auth.users
set banned_until = '9999-12-31 23:59:59+00'::timestamptz,
    updated_at = now()
where lower(email) in (
  'admin.uji2@example.com',
  'admin.uji3@example.com',
  'afiliasi.uji@gmail.com'
);

delete from auth.sessions
where user_id in (
  select id from auth.users
  where lower(email) in (
    'admin.uji2@example.com',
    'admin.uji3@example.com',
    'afiliasi.uji@gmail.com'
  )
);

delete from auth.refresh_tokens
where user_id in (
  select id::text from auth.users
  where lower(email) in (
    'admin.uji2@example.com',
    'admin.uji3@example.com',
    'afiliasi.uji@gmail.com'
  )
);

-- Verifikasi pascakondisi; exception menggulung balik seluruh migrasi.
do $$
begin
  if exists (select 1 from public.produk where slug = 'uji-hermes-produk-20260804') then
    raise exception 'Produk uji masih ada.';
  end if;
  if exists (select 1 from public.afiliasi where alias_publik = 'AfiliasiUji') then
    raise exception 'AfiliasiUji masih ada.';
  end if;
  if exists (
    select 1 from public.pengguna_admin pa
    join auth.users u on u.id = pa.pengguna_id
    where lower(u.email) in ('admin.uji2@example.com', 'admin.uji3@example.com')
  ) then
    raise exception 'Hak Admin akun uji masih ada.';
  end if;
  if exists (
    select 1 from public.produk
    where slug in (
      'decant-mykonos-original-1ml-pilih-varian',
      'decant-mykonos-original-2ml-pilih-varian',
      'decant-mykonos-original-5ml-pilih-varian',
      'decant-mykonos-original-10ml-pilih-varian'
    ) and cardinality(foto) = 0
  ) then
    raise exception 'Masih ada Produk Decant tanpa foto.';
  end if;
end;
$$;
