import { modePratinjauDataContohAktif } from "@/lib/pratinjau/data-contoh";

export type TingkatBonusAfiliasiContoh = {
  nama: string;
  minimal_pcs: number;
  bonus_per_pcs: number;
};

export type RiwayatBonusAfiliasiContoh = {
  id: string;
  jumlah_pcs: number;
  tingkat_nama: string;
  bonus_dihitung: number;
  status_payout: "menunggu" | "dibayar";
  laporan_afiliasi: {
    platform: "tiktok" | "shopee";
    periode_mulai: string;
    periode_selesai: string;
  };
};

export type PeringkatAfiliasiContoh = {
  urutan: number;
  alias_publik: string;
  jumlah_pcs: number;
  milik_saya: boolean;
};

function tanggalBulan(tanggalAcuan: Date, selisihBulan: number, hari: number) {
  const tahun = tanggalAcuan.getFullYear();
  const bulan = tanggalAcuan.getMonth() + selisihBulan;
  const hariTerakhir = new Date(tahun, bulan + 1, 0).getDate();
  return new Date(tahun, bulan, Math.min(hari, hariTerakhir), 12, 0, 0)
    .toISOString()
    .slice(0, 10);
}

export function pratinjauAfiliasiAktif(email: string | undefined, aliasPublik: string) {
  return (
    modePratinjauDataContohAktif()
    && email === "afiliasi.uji@gmail.com"
    && aliasPublik === "AfiliasiUji"
  );
}

export const tingkatBonusAfiliasiContoh: TingkatBonusAfiliasiContoh[] = [
  { nama: "Pemula Contoh", minimal_pcs: 1, bonus_per_pcs: 1_500 },
  { nama: "Kreator Contoh", minimal_pcs: 20, bonus_per_pcs: 2_000 },
  { nama: "Bintang Contoh", minimal_pcs: 50, bonus_per_pcs: 2_500 },
];

export function buatRiwayatBonusAfiliasiContoh(tanggalAcuan = new Date()): RiwayatBonusAfiliasiContoh[] {
  return [
    {
      id: "contoh-bonus-bulan-ini-tiktok",
      jumlah_pcs: 24,
      tingkat_nama: "Kreator Contoh",
      bonus_dihitung: 48_000,
      status_payout: "dibayar",
      laporan_afiliasi: {
        platform: "tiktok",
        periode_mulai: tanggalBulan(tanggalAcuan, 0, 1),
        periode_selesai: tanggalBulan(tanggalAcuan, 0, 7),
      },
    },
    {
      id: "contoh-bonus-bulan-ini-shopee",
      jumlah_pcs: 13,
      tingkat_nama: "Pemula Contoh",
      bonus_dihitung: 19_500,
      status_payout: "menunggu",
      laporan_afiliasi: {
        platform: "shopee",
        periode_mulai: tanggalBulan(tanggalAcuan, 0, 8),
        periode_selesai: tanggalBulan(tanggalAcuan, 0, 14),
      },
    },
    {
      id: "contoh-bonus-bulan-lalu-tiktok",
      jumlah_pcs: 18,
      tingkat_nama: "Pemula Contoh",
      bonus_dihitung: 27_000,
      status_payout: "dibayar",
      laporan_afiliasi: {
        platform: "tiktok",
        periode_mulai: tanggalBulan(tanggalAcuan, -1, 1),
        periode_selesai: tanggalBulan(tanggalAcuan, -1, 15),
      },
    },
    {
      id: "contoh-bonus-bulan-lalu-shopee",
      jumlah_pcs: 8,
      tingkat_nama: "Pemula Contoh",
      bonus_dihitung: 12_000,
      status_payout: "dibayar",
      laporan_afiliasi: {
        platform: "shopee",
        periode_mulai: tanggalBulan(tanggalAcuan, -1, 16),
        periode_selesai: tanggalBulan(tanggalAcuan, -1, 28),
      },
    },
  ];
}

export const peringkatAfiliasiContoh: PeringkatAfiliasiContoh[] = [
  { urutan: 1, alias_publik: "AromaKampusContoh", jumlah_pcs: 64, milik_saya: false },
  { urutan: 2, alias_publik: "ScentScholarContoh", jumlah_pcs: 52, milik_saya: false },
  { urutan: 3, alias_publik: "AfiliasiUji", jumlah_pcs: 37, milik_saya: true },
  { urutan: 4, alias_publik: "WangianHarianContoh", jumlah_pcs: 28, milik_saya: false },
  { urutan: 5, alias_publik: "CatatanAromaContoh", jumlah_pcs: 16, milik_saya: false },
];
