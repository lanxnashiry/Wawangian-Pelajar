import type { NextRequest } from "next/server";
import { perbaruiSesi } from "@/lib/supabase/perbarui-sesi";

export async function proxy(permintaan: NextRequest) {
  return perbaruiSesi(permintaan);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
