import type { Metadata } from "next";
import { KuisTemukanWangimu } from "@/components/kuis-temukan-wangimu";
import { ambilDaftarProdukPublik } from "@/lib/data/publik";
import {
  jawabanKuisKosong,
  parameterJawabanKuis,
  petakanJawabanKuisLama,
  pertanyaanKuis,
  type KunciJawaban,
  type JawabanKuis,
} from "@/lib/kuis/rekomendasi";

export const metadata: Metadata = {
  title: "Temukan Wangimu",
  description: "Jawab lima pertanyaan ringan untuk menemukan keluarga aroma dan pilihan ukuran yang paling mendekati seleramu.",
};

export const revalidate = 300;

type Properti = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function ambilNilaiAman(
  nilai: string | string[] | undefined,
  kunci: KunciJawaban,
) {
  const kandidat = typeof nilai === "string" ? nilai : "";
  const pertanyaan = pertanyaanKuis.find((item) => item.kunci === kunci);
  return pertanyaan?.opsi.some((item) => item.nilai === kandidat) ? kandidat : "";
}

export default async function HalamanTemukanWangimu({ searchParams }: Properti) {
  const [parameter, daftarProduk] = await Promise.all([
    searchParams,
    ambilDaftarProdukPublik(),
  ]);
  const punyaParameterLama =
    typeof parameter.karakter === "string" || typeof parameter.okasi === "string";
  const punyaParameterBaru =
    ["aroma", "kesan", "intensitas", "kegiatan"].some(
      (kunci) => typeof parameter[kunci] === "string",
    ) || (!punyaParameterLama && typeof parameter.waktu === "string");
  const jawabanBaru: JawabanKuis = {
    aroma: ambilNilaiAman(parameter.aroma, "aroma"),
    kesan: ambilNilaiAman(parameter.kesan, "kesan"),
    intensitas: ambilNilaiAman(parameter.intensitas, "intensitas"),
    waktu: ambilNilaiAman(parameter.waktu, "waktu"),
    kegiatan: ambilNilaiAman(parameter.kegiatan, "kegiatan"),
  };
  const jawabanAwal = punyaParameterBaru
    ? jawabanBaru
    : petakanJawabanKuisLama({
        karakter: typeof parameter.karakter === "string" ? parameter.karakter : undefined,
        waktu: typeof parameter.waktu === "string" ? parameter.waktu : undefined,
        okasi: typeof parameter.okasi === "string" ? parameter.okasi : undefined,
      }) ?? jawabanKuisKosong;

  return (
    <main className="px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-xs font-black tracking-[0.16em] text-[#087477] uppercase">
            Temukan Wangimu
          </p>
          <h1 className="mt-4 text-4xl leading-tight font-black tracking-[-0.045em] text-[#102A43] sm:text-6xl">
            Jawab lima pertanyaan, temukan aroma yang terasa seperti kamu.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#282B2F]">
            Jawabanmu tetap privat. Kami mencocokkannya dengan karakter setiap keluarga aroma, lalu menampilkan pilihan ukuran yang tersedia.
          </p>
        </div>
        <div className="mt-10">
          <KuisTemukanWangimu
            key={parameterJawabanKuis(jawabanAwal).toString()}
            daftarProduk={daftarProduk}
            jawabanAwal={jawabanAwal}
          />
        </div>
      </div>
    </main>
  );
}
