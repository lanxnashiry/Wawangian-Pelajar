import { NextResponse } from "next/server";
import { wajibAdmin } from "@/lib/admin/otorisasi";
import { buatTemplateEntriMassal } from "@/lib/admin/entri-massal/workbook";

export async function GET() {
  await wajibAdmin();
  const buffer = await buatTemplateEntriMassal();
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="template-entri-massal-wawangian-pelajar.xlsx"',
      "Cache-Control": "private, no-store",
    },
  });
}
