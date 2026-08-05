"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  nilaiTagAroma,
  nilaiTagIntensitas,
  nilaiTagKegiatan,
  nilaiTagKesan,
  nilaiTagWaktu,
} from "@/data/profil-rekomendasi";
import { wajibAdmin } from "@/lib/admin/otorisasi";
import { buatSlug } from "@/lib/admin/validasi-produk";

function kembali(pesan: string): never {
  redirect(`/admin/profil-rekomendasi?pesan=${encodeURIComponent(pesan)}`);
}

function daftarTerpilih<const T extends readonly string[]>(
  formulir: FormData,
  nama: string,
  nilaiSah: T,
) {
  const hasil = formulir
    .getAll(nama)
    .map(String)
    .filter((nilai): nilai is T[number] => nilaiSah.includes(nilai as T[number]));
  return [...new Set(hasil)];
}

function segarkanHalaman() {
  revalidatePath("/temukan");
  revalidatePath("/admin/profil-rekomendasi");
  revalidatePath("/admin/produk");
}

export async function simpanProfilRekomendasi(formulir: FormData) {
  const { supabase } = await wajibAdmin();
  const id = String(formulir.get("id") ?? "").trim();
  const nama = String(formulir.get("nama") ?? "").trim();
  const kode = buatSlug(String(formulir.get("kode") ?? "") || nama);
  const tagAroma = daftarTerpilih(formulir, "tag_aroma", nilaiTagAroma);
  const tagKesan = daftarTerpilih(formulir, "tag_kesan", nilaiTagKesan);
  const tagIntensitas = daftarTerpilih(
    formulir,
    "tag_intensitas",
    nilaiTagIntensitas,
  );
  const tagWaktu = daftarTerpilih(formulir, "tag_waktu", nilaiTagWaktu);
  const tagKegiatan = daftarTerpilih(
    formulir,
    "tag_kegiatan",
    nilaiTagKegiatan,
  );

  if (
    nama.length < 3 ||
    !kode ||
    !tagAroma.length ||
    !tagKesan.length ||
    !tagIntensitas.length ||
    !tagWaktu.length ||
    !tagKegiatan.length
  ) {
    kembali("Nama, kode, dan minimal satu tag pada setiap kelompok wajib diisi.");
  }

  const muatan = {
    nama,
    kode,
    tag_aroma: tagAroma,
    tag_kesan: tagKesan,
    tag_intensitas: tagIntensitas,
    tag_waktu: tagWaktu,
    tag_kegiatan: tagKegiatan,
  };
  const hasil = id
    ? await supabase.from("profil_rekomendasi").update(muatan).eq("id", id)
    : await supabase.from("profil_rekomendasi").insert({ ...muatan, aktif: true });

  if (hasil.error) {
    kembali(
      hasil.error.code === "23505"
        ? "Kode profil sudah dipakai. Gunakan kode lain."
        : "Profil rekomendasi gagal disimpan.",
    );
  }

  segarkanHalaman();
  kembali("Profil rekomendasi berhasil disimpan.");
}

export async function ubahStatusProfilRekomendasi(formulir: FormData) {
  const { supabase } = await wajibAdmin();
  const id = String(formulir.get("id") ?? "").trim();
  const aktif = formulir.get("aktif") === "true";
  if (!id) kembali("Profil rekomendasi tidak ditemukan.");

  const { error } = await supabase
    .from("profil_rekomendasi")
    .update({ aktif })
    .eq("id", id);
  if (error) kembali("Status profil rekomendasi gagal diubah.");

  segarkanHalaman();
  kembali(aktif ? "Profil rekomendasi diaktifkan." : "Profil rekomendasi dinonaktifkan.");
}
