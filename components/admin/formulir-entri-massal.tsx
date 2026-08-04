"use client";

import { useState, useTransition } from "react";
import { imporWorkbook, pratinjauWorkbook, type HasilAksiEntriMassal } from "@/app/admin/(terlindungi)/entri-massal/tindakan";

type BarisPratinjau = {
  baris: number;
  data?: { slug: string };
  galat: string[];
  peringatan: string[];
};

function DaftarBaris({ judul, baris }: {
  judul: string;
  baris: BarisPratinjau[];
}) {
  if (!baris.length) return null;
  return (
    <section className="mt-6">
      <h2 className="text-lg font-black text-[#102A43]">{judul}</h2>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-[#DED3C2] bg-white">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="bg-[#F4EBDD] text-xs uppercase text-[#4A4D52]">
            <tr><th className="p-3">Baris</th><th className="p-3">Slug</th><th className="p-3">Status</th><th className="p-3">Keterangan</th></tr>
          </thead>
          <tbody>
            {baris.map((item) => (
              <tr key={item.baris} className="border-t border-[#DED3C2] align-top">
                <td className="p-3 font-bold">{item.baris}</td>
                <td className="p-3 font-mono text-xs">{item.data?.slug ?? "—"}</td>
                <td className="p-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.galat.length ? "bg-[#fff2f0] text-[#9e3024]" : item.peringatan.length ? "bg-[#F6EACD] text-[#6D5426]" : "bg-[#E5F2EF] text-[#087477]"}`}>
                    {item.galat.length ? "Ditolak" : item.peringatan.length ? "Valid + peringatan" : "Valid"}
                  </span>
                </td>
                <td className="p-3 text-xs leading-5">
                  {item.galat.map((pesan) => <p key={pesan} className="text-[#9e3024]">• {pesan}</p>)}
                  {item.peringatan.map((pesan) => <p key={pesan} className="text-[#6D5426]">• {pesan}</p>)}
                  {!item.galat.length && !item.peringatan.length ? <span className="text-[#087477]">Siap diimpor.</span> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function FormulirEntriMassal() {
  const [file, setFile] = useState<File>();
  const [hasil, setHasil] = useState<HasilAksiEntriMassal>();
  const [sedang, mulaiTransisi] = useTransition();

  function jalankan(aksi: "pratinjau" | "impor") {
    if (!file) {
      setHasil({ berhasil: false, pesan: "Pilih workbook .xlsx terlebih dahulu." });
      return;
    }
    mulaiTransisi(async () => {
      const formulir = new FormData();
      formulir.set("workbook", file);
      const respons = aksi === "pratinjau" ? await pratinjauWorkbook(formulir) : await imporWorkbook(formulir);
      setHasil(respons);
      if (respons.hasilImpor) setFile(undefined);
    });
  }

  const pratinjauBersih = hasil?.pratinjau && hasil.pratinjau.ringkasan.galat === 0;
  return (
    <div className="mt-8">
      <div className="rounded-2xl border border-[#DED3C2] bg-white p-5 sm:p-6">
        <label className="block text-sm font-black text-[#102A43]">
          Workbook Excel
          <input
            className="mt-2 min-h-12 w-full rounded-xl border border-[#CFC3B2] bg-white px-3 py-2 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-[#E5F2EF] file:px-4 file:py-2 file:font-bold file:text-[#087477]"
            type="file"
            accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={(event) => { setFile(event.target.files?.[0]); setHasil(undefined); }}
          />
        </label>
        <p className="mt-2 text-xs leading-5 text-[#4A4D52]">Maksimal 5 MB dan 500 baris per sheet. Sistem tidak menyimpan apa pun saat pratinjau.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" disabled={!file || sedang} onClick={() => jalankan("pratinjau")} className="min-h-11 rounded-full bg-[#087477] px-5 py-2 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-50">
            {sedang ? "Memeriksa…" : "Periksa & pratinjau"}
          </button>
          {pratinjauBersih ? (
            <button type="button" disabled={sedang} onClick={() => jalankan("impor")} className="min-h-11 rounded-full bg-[#102A43] px-5 py-2 text-sm font-black text-white disabled:opacity-50">
              Impor semua baris valid
            </button>
          ) : null}
        </div>
      </div>

      {hasil ? <p role={hasil.berhasil ? "status" : "alert"} className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${hasil.berhasil ? "border-[#CFE5E0] bg-[#E5F2EF] text-[#087477]" : "border-[#efc9c3] bg-[#fff2f0] text-[#9e3024]"}`}>{hasil.pesan}</p> : null}

      {hasil?.pratinjau ? (
        <div className="mt-6">
          <div className="grid gap-3 sm:grid-cols-4">
            {[["Total", hasil.pratinjau.ringkasan.total], ["Valid", hasil.pratinjau.ringkasan.valid], ["Ditolak", hasil.pratinjau.ringkasan.galat], ["Peringatan", hasil.pratinjau.ringkasan.peringatan]].map(([label, nilai]) => (
              <div key={label} className="rounded-2xl border border-[#DED3C2] bg-white p-4"><p className="text-xs font-bold uppercase text-[#687078]">{label}</p><p className="mt-1 text-2xl font-black text-[#102A43]">{nilai}</p></div>
            ))}
          </div>
          <DaftarBaris judul="Produk" baris={hasil.pratinjau.produk} />
          <DaftarBaris judul="Artikel" baris={hasil.pratinjau.artikel} />
        </div>
      ) : null}
    </div>
  );
}
