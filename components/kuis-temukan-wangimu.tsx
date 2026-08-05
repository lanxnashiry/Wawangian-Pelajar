"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { formatRupiah, type Produk } from "@/data/produk";
import { VisualProduk } from "@/components/visual-data";
import {
  ambilProdukDecant,
  jawabanKuisLengkap,
  labelJawabanKuis,
  parameterJawabanKuis,
  pertanyaanKuis,
  rekomendasikanProduk,
  type JawabanKuis,
} from "@/lib/kuis/rekomendasi";

function indeksPertanyaanAwal(jawaban: JawabanKuis) {
  const indeks = pertanyaanKuis.findIndex((item) => !jawaban[item.kunci]);
  return indeks === -1 ? pertanyaanKuis.length - 1 : indeks;
}

export function KuisTemukanWangimu({
  daftarProduk,
  jawabanAwal,
}: {
  daftarProduk: Produk[];
  jawabanAwal: JawabanKuis;
}) {
  const router = useRouter();
  const [jawaban, setJawaban] = useState(jawabanAwal);
  const [langkah, setLangkah] = useState(() => indeksPertanyaanAwal(jawabanAwal));
  const [hasilTerbuka, setHasilTerbuka] = useState(() => jawabanKuisLengkap(jawabanAwal));
  const [pesan, setPesan] = useState("");

  const hasil = useMemo(
    () => rekomendasikanProduk(daftarProduk, jawaban),
    [daftarProduk, jawaban],
  );
  const produkDecant = useMemo(
    () => ambilProdukDecant(daftarProduk),
    [daftarProduk],
  );
  const labelJawaban = labelJawabanKuis(jawaban);
  const pertanyaan = pertanyaanKuis[langkah];
  const pilihanSaatIni = jawaban[pertanyaan.kunci];

  function pilihJawaban(nilai: string) {
    setJawaban((sebelumnya) => ({
      ...sebelumnya,
      [pertanyaan.kunci]: nilai,
    }));
    setPesan("");
  }

  function lanjutkan(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!pilihanSaatIni) {
      setPesan("Pilih satu jawaban sebelum melanjutkan.");
      return;
    }
    if (langkah < pertanyaanKuis.length - 1) {
      setLangkah((nilai) => nilai + 1);
      setPesan("");
      return;
    }
    if (!jawabanKuisLengkap(jawaban)) {
      setLangkah(indeksPertanyaanAwal(jawaban));
      setPesan("Lengkapi semua jawaban untuk melihat rekomendasi.");
      return;
    }

    const tujuan = `/temukan?${parameterJawabanKuis(jawaban).toString()}#hasil-kuis`;
    setHasilTerbuka(true);
    setPesan("");
    router.push(tujuan, { scroll: false });
    requestAnimationFrame(() => {
      document.querySelector("#hasil-kuis")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  async function bagikanHasil() {
    const parameter = parameterJawabanKuis(jawaban).toString();
    const url = `${window.location.origin}/temukan?${parameter}#hasil-kuis`;
    const teks = `Wangiku: ${labelJawaban.aroma}, ${labelJawaban.kesan}, ${labelJawaban.intensitas}, ${labelJawaban.waktu}, dan ${labelJawaban.kegiatan}.`;
    const dataBagikan = {
      title: "Hasil Temukan Wangimu",
      text: `${teks} Lihat rekomendasinya di Wawangian Pelajar.`,
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(dataBagikan);
        setPesan("Hasil berhasil dibagikan.");
      } catch {
        return;
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setPesan("Tautan hasil tersalin.");
    } catch {
      setPesan("Salin tautan hasil dari bilah alamat.");
    }
  }

  if (!hasilTerbuka) {
    return (
      <section aria-labelledby="judul-pertanyaan-kuis" className="mx-auto max-w-4xl rounded-[2rem] border border-[#DED3C2] bg-white p-5 shadow-xl shadow-[#102A43]/6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-black tracking-[0.14em] text-[#087477] uppercase">Langkah {langkah + 1} dari {pertanyaanKuis.length}</p>
          <p className="text-xs font-bold text-[#687078]">{Math.round(((langkah + 1) / pertanyaanKuis.length) * 100)}%</p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E5F2EF]" aria-hidden="true">
          <div className="h-full rounded-full bg-[#087477] transition-[width]" style={{ width: `${((langkah + 1) / pertanyaanKuis.length) * 100}%` }} />
        </div>

        <form action="/temukan" method="get" onSubmit={lanjutkan} className="mt-8">
          {Object.entries(jawaban)
            .filter(([kunci, nilai]) => kunci !== pertanyaan.kunci && Boolean(nilai))
            .map(([kunci, nilai]) => (
              <input key={kunci} type="hidden" name={kunci} value={nilai} />
            ))}
          <fieldset>
            <legend id="judul-pertanyaan-kuis" className="text-2xl leading-tight font-black tracking-[-0.03em] text-[#102A43] sm:text-3xl">{pertanyaan.judul}</legend>
            <p className="mt-3 text-sm leading-6 text-[#4A4D52]">{pertanyaan.bantuan}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {pertanyaan.opsi.map((opsi) => (
                <label key={opsi.nilai} className="cursor-pointer">
                  <input
                    type="radio"
                    name={pertanyaan.kunci}
                    value={opsi.nilai}
                    checked={pilihanSaatIni === opsi.nilai}
                    onChange={() => pilihJawaban(opsi.nilai)}
                    className="peer sr-only"
                  />
                  <span className="block min-h-full rounded-2xl border border-[#DED3C2] bg-[#FAF7F1] p-4 transition hover:border-[#087477] peer-checked:border-[#087477] peer-checked:bg-[#E5F2EF] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-[#087477]">
                    <strong className="block text-sm text-[#102A43]">{opsi.label}</strong>
                    <span className="mt-1 block text-xs leading-5 text-[#4A4D52]">{opsi.deskripsi}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => setLangkah((nilai) => Math.max(0, nilai - 1))}
              disabled={langkah === 0}
              className="min-h-12 rounded-full border border-[#CFC3B2] px-6 py-3 text-sm font-black text-[#102A43] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Kembali
            </button>
            <button type="submit" className="min-h-12 rounded-full bg-[#087477] px-7 py-3 text-sm font-black text-white shadow-lg shadow-[#087477]/20 hover:bg-[#075E61]">
              {langkah === pertanyaanKuis.length - 1 ? "Lihat rekomendasi →" : "Lanjut →"}
            </button>
          </div>
          <p className="mt-3 min-h-5 text-sm text-[#9e3024]" role="status">{pesan}</p>
        </form>
      </section>
    );
  }

  return (
    <section id="hasil-kuis" className="scroll-mt-28">
      <p className="text-xs font-black tracking-[0.16em] text-[#087477] uppercase">Rekomendasi untukmu</p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#102A43] sm:text-4xl">Tiga aroma yang paling mendekati pilihanmu.</h2>
      <div className="mt-5 flex flex-wrap gap-2">
        {Object.values(labelJawaban).map((label) => (
          <span key={label} className="rounded-full bg-[#E5F2EF] px-3 py-2 text-xs font-bold text-[#0D5554]">{label}</span>
        ))}
      </div>
      <p className="mt-5 max-w-3xl rounded-2xl bg-[#FFF9EA] p-5 text-sm leading-6 text-[#765B2B]">Urutan dihitung dari profil katalog dengan prioritas keluarga aroma, kesan, kegiatan, waktu/cuaca, lalu intensitas. Hasil merupakan panduan selera, bukan jaminan kecocokan mutlak.</p>

      {hasil.length ? (
        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {hasil.map((item) => (
            <article key={item.profil.id} className="overflow-hidden rounded-3xl border border-[#DED3C2] bg-white shadow-sm">
              <VisualProduk produk={item.produkUtama} ringkas />
              <div className="p-5">
                <span className="rounded-full bg-[#F6EACD] px-3 py-1 text-[11px] font-black text-[#6D5426] uppercase">{item.tingkat}</span>
                <h3 className="mt-4 text-xl font-black text-[#102A43]">{item.profil.nama}</h3>
                <p className="mt-3 text-sm leading-6 text-[#282B2F]"><strong>Kenapa cocok:</strong> {item.alasan.length ? item.alasan.join(", ") : "profil katalog ini paling mendekati pilihan yang tersedia"}.</p>
                <div className="mt-5 grid gap-2" aria-label={`Pilihan ukuran ${item.profil.nama}`}>
                  {item.varian.map((produk) => (
                    <Link key={produk.slug} href={`/produk/${produk.slug}`} className="flex min-h-11 items-center justify-between gap-3 rounded-xl border border-[#CFE5E0] bg-[#E5F2EF] px-4 py-2 text-sm font-bold text-[#0D5554] hover:border-[#087477]">
                      <span>{produk.ukuran}</span>
                      <span>{produk.harga > 0 ? formatRupiah(produk.harga) : "Segera hadir"} →</span>
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-7 rounded-3xl border border-dashed border-[#CFC3B2] bg-white p-9 text-center">
          <h3 className="text-xl font-black text-[#102A43]">Rekomendasi belum tersedia</h3>
          <p className="mt-2 text-sm leading-6 text-[#282B2F]">Profil Produk belum dapat dibaca. Coba kembali setelah data katalog tersedia.</p>
        </div>
      )}

      {produkDecant.length ? (
        <aside className="mt-8 rounded-3xl bg-[#102A43] p-6 text-white sm:p-8">
          <p className="text-xs font-black tracking-[0.14em] text-[#D1B779] uppercase">Belum yakin membeli ukuran penuh?</p>
          <h3 className="mt-3 text-2xl font-black">Coba lewat decant.</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#D9E1E8]">Decant tidak memengaruhi peringkat karena satu produknya memuat beberapa pilihan aroma. Pilih ukurannya untuk mencoba hasil rekomendasimu.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {produkDecant.map((produk) => (
              <Link key={produk.slug} href={`/produk/${produk.slug}`} className="rounded-full bg-white px-4 py-2.5 text-sm font-black text-[#102A43] hover:bg-[#F6EACD]">{produk.ukuran} · {formatRupiah(produk.harga)}</Link>
            ))}
          </div>
        </aside>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={bagikanHasil} className="min-h-12 rounded-full bg-[#C7A25A] px-6 py-3 text-sm font-black text-white hover:bg-[#9C7B3C]">Bagikan hasil</button>
        <button type="button" onClick={() => { setHasilTerbuka(false); setLangkah(0); setPesan(""); }} className="min-h-12 rounded-full border border-[#087477] bg-[#E5F2EF] px-6 py-3 text-sm font-black text-[#087477]">Ubah jawaban</button>
        <Link href="/temukan" className="flex min-h-12 items-center justify-center rounded-full border border-[#CFC3B2] bg-white px-6 py-3 text-sm font-black text-[#102A43] hover:border-[#087477] hover:text-[#087477]">Ulangi kuis</Link>
      </div>
      <p className="mt-3 min-h-5 text-sm text-[#4A4D52]" aria-live="polite">{pesan}</p>
    </section>
  );
}
