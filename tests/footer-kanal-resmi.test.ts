import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { kanalResmi } from "../data/kanal-resmi.ts";

const sumberFooter = readFileSync(
  new URL("../components/footer-utama.tsx", import.meta.url),
  "utf8",
);

test("kanal resmi memakai tautan yang disetujui pemilik", () => {
  assert.equal(kanalResmi.facebook, "https://www.facebook.com/share/1Bim2TZoPD/");
  assert.equal(kanalResmi.instagram, "https://www.instagram.com/wawangianpelajar");
  assert.match(kanalResmi.shopee, /^https:\/\/shopee\.co\.id\//);
  assert.equal(kanalResmi.email, "mailto:admin@wawangianpelajar.com");
  assert.equal(kanalResmi.whatsapp, "https://wa.me/6285176985756");
});

test("footer membuka kanal eksternal secara aman tanpa placeholder lama", () => {
  assert.match(sumberFooter, /noopener noreferrer/);
  assert.doesNotMatch(sumberFooter, /segera ditautkan/i);
  assert.doesNotMatch(sumberFooter, /TikTok Shop/);
  assert.match(sumberFooter, /Ikuti & Hubungi/);
});
