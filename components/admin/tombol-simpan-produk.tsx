"use client";

import { useFormStatus } from "react-dom";

export function TombolSimpanProduk() {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="submit"
        disabled={pending}
        className="min-h-12 rounded-full bg-[#087477] px-6 py-3 text-sm font-black text-white hover:bg-[#075E61] disabled:cursor-wait disabled:bg-[#7AA39E]"
      >
        {pending ? "Menyimpan produk..." : "Simpan produk"}
      </button>
      <span className="text-sm text-[#4A4D52]" role="status" aria-live="polite">
        {pending ? "Mohon tunggu, data sedang dikirim dan foto sedang diproses." : ""}
      </span>
    </div>
  );
}
