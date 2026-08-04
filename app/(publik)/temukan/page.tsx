import type { Metadata } from "next";
import { KuisTemukanWangimu } from "@/components/kuis-temukan-wangimu";
import { ambilDaftarProdukPublik } from "@/lib/data/publik";
import {
  opsiKarakter,
  opsiOkasi,
  opsiWaktu,
  type JawabanKuis,
} from "@/lib/kuis/rekomendasi";

export const metadata: Metadata = {
  title: "Temukan Wangimu",
  description: "Jawab tiga pertanyaan ringan untuk menemukan karakter parfum yang sesuai dengan kegiatanmu.",
};

export const revalidate = 300;

type Properti = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function ambilNilaiAman(
  nilai: string | string[] | undefined,
  daftar: Array<{ nilai: string }>,
) {
  const kandidat = typeof nilai === "string" ? nilai : "";
  return daftar.some((item) => item.nilai === kandidat) ? kandidat : "";
}

export default async function HalamanTemukanWangimu({ searchParams }: Properti) {
  const [parameter, daftarProduk] = await Promise.all([
    searchParams,
    ambilDaftarProdukPublik(),
  ]);
  const jawabanAwal: JawabanKuis = {
    karakter: ambilNilaiAman(parameter.karakter, opsiKarakter),
    waktu: ambilNilaiAman(parameter.waktu, opsiWaktu),
    okasi: ambilNilaiAman(parameter.okasi, opsiOkasi),
  };

  return (
    <main className="px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-xs font-black tracking-[0.16em] text-[#087477] uppercase">
            Temukan Wangimu
          </p>
          <h1 className="mt-4 text-4xl leading-tight font-black tracking-[-0.045em] text-[#102A43] sm:text-6xl">
            Jawab tiga pertanyaan, temukan aroma yang terasa seperti kamu.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#282B2F]">
            Tanpa login dan tanpa menyimpan jawaban pribadi. Rekomendasi dihitung dari data karakter serta kegiatan pada katalog, lalu hasilnya dapat dibagikan lewat tautan.
          </p>
        </div>
        <div className="mt-10">
          <KuisTemukanWangimu
            daftarProduk={daftarProduk}
            jawabanAwal={jawabanAwal}
          />
        </div>
      </div>
    </main>
  );
}
