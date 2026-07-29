type TajukBagianProps = {
  label?: string;
  judul: string;
  deskripsi?: string;
  rataTengah?: boolean;
};

export function TajukBagian({
  label,
  judul,
  deskripsi,
  rataTengah = false,
}: TajukBagianProps) {
  return (
    <div className={rataTengah ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {label ? (
        <p className="mb-3 text-xs font-black tracking-[0.16em] text-[#087477] uppercase">
          {label}
        </p>
      ) : null}
      <h2 className="text-3xl leading-tight font-black tracking-[-0.035em] text-[#102A43] sm:text-4xl">
        {judul}
      </h2>
      {deskripsi ? (
        <p className="mt-4 text-base leading-7 text-[#282B2F]">{deskripsi}</p>
      ) : null}
    </div>
  );
}
