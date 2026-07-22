begin;

create or replace function public.buat_profil_afiliasi_baru()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (new.raw_user_meta_data ->> 'jenis_akun') is distinct from 'afiliasi' then
    return new;
  end if;

  insert into public.afiliasi (
    pengguna_id, nama, no_whatsapp, alias_publik, handle_tiktok, handle_shopee
  ) values (
    new.id,
    trim(new.raw_user_meta_data ->> 'nama'),
    trim(new.raw_user_meta_data ->> 'no_whatsapp'),
    trim(new.raw_user_meta_data ->> 'alias_publik'),
    nullif(public.normalisasi_handle_afiliasi(new.raw_user_meta_data ->> 'handle_tiktok'), ''),
    nullif(public.normalisasi_handle_afiliasi(new.raw_user_meta_data ->> 'handle_shopee'), '')
  );

  return new;
end;
$$;

revoke all on function public.buat_profil_afiliasi_baru() from public;

commit;
