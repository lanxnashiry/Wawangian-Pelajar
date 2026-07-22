export type BarisLaporanAfiliasi = {
  handle: string;
  jumlahPcs: number;
};

export function normalisasiHandle(nilai: string) {
  return nilai.trim().replace(/^@/, "").toLowerCase();
}

function pecahBaris(baris: string, pemisah: string) {
  const hasil: string[] = [];
  let nilai = "";
  let dalamKutipan = false;

  for (let indeks = 0; indeks < baris.length; indeks += 1) {
    const karakter = baris[indeks];
    if (karakter === '"') {
      if (dalamKutipan && baris[indeks + 1] === '"') {
        nilai += '"';
        indeks += 1;
      } else {
        dalamKutipan = !dalamKutipan;
      }
    } else if (karakter === pemisah && !dalamKutipan) {
      hasil.push(nilai.trim());
      nilai = "";
    } else {
      nilai += karakter;
    }
  }

  hasil.push(nilai.trim());
  return hasil;
}

export function bacaLaporanAfiliasiCsv(isi: string): BarisLaporanAfiliasi[] {
  const baris = isi.replace(/^\uFEFF/, "").split(/\r?\n/).filter((nilai) => nilai.trim());
  if (baris.length < 2) throw new Error("Laporan CSV belum memiliki data.");

  const pemisah = baris[0].includes(";") ? ";" : ",";
  const kepala = pecahBaris(baris[0], pemisah).map((nilai) => nilai.toLowerCase());
  const indeksHandle = kepala.indexOf("handle");
  const indeksJumlah = kepala.indexOf("jumlah_pcs");
  if (indeksHandle < 0 || indeksJumlah < 0) {
    throw new Error("Kolom CSV wajib bernama handle dan jumlah_pcs.");
  }

  if (baris.length - 1 > 5000) throw new Error("Laporan maksimal berisi 5.000 baris.");
  const gabungan = new Map<string, number>();

  baris.slice(1).forEach((barisIsi, urutan) => {
    const kolom = pecahBaris(barisIsi, pemisah);
    const handle = normalisasiHandle(kolom[indeksHandle] ?? "");
    const jumlahPcs = Number(kolom[indeksJumlah]);
    if (!/^[a-z0-9._-]{2,60}$/.test(handle)) {
      throw new Error(`Handle pada baris ${urutan + 2} tidak valid.`);
    }
    if (!Number.isSafeInteger(jumlahPcs) || jumlahPcs <= 0) {
      throw new Error(`Jumlah pcs pada baris ${urutan + 2} harus bilangan bulat positif.`);
    }
    gabungan.set(handle, (gabungan.get(handle) ?? 0) + jumlahPcs);
  });

  return Array.from(gabungan, ([handle, jumlahPcs]) => ({ handle, jumlahPcs }));
}
