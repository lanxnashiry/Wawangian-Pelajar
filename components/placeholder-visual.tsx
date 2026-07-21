type PlaceholderVisualProps = {
  judul?: string;
  warna?: "tosca" | "emas" | "navy" | "merahMuda";
  ringkas?: boolean;
};

const warnaLatar = {
  tosca: "from-[#d9efeb] via-[#eef8f6] to-[#b9ddd6]",
  emas: "from-[#f7ebc7] via-[#fffaf0] to-[#ead18b]",
  navy: "from-[#dce3ef] via-[#f4f6f9] to-[#b9c7dd]",
  merahMuda: "from-[#f3e1e5] via-[#fff6f7] to-[#e7c7cf]",
};

export function PlaceholderVisual({
  judul = "Foto produk asli segera hadir",
  warna = "tosca",
  ringkas = false,
}: PlaceholderVisualProps) {
  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br ${warnaLatar[warna]} ${
        ringkas ? "aspect-[4/3]" : "aspect-[4/5]"
      }`}
      role="img"
      aria-label={judul}
    >
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_30%),radial-gradient(circle_at_80%_70%,white_0,transparent_26%)]" />
      <div className="relative flex flex-col items-center gap-3 px-5 text-center">
        <span className="flex h-20 w-14 items-end justify-center rounded-t-xl rounded-b-2xl border-2 border-white/80 bg-white/75 pb-3 shadow-lg shadow-[#14223d]/10">
          <span className="h-8 w-8 rounded-full bg-[#0f6b62]/20" />
        </span>
        <span className="max-w-44 rounded-full bg-white/85 px-3 py-1.5 text-xs font-bold text-[#14223d] shadow-sm">
          {judul}
        </span>
      </div>
    </div>
  );
}
