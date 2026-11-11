// Hook dipasang sebelum tracker: berlaku juga sesudah navigasi SPA dan pada referer.
window.saringAnalitikBatch = function (_jenis, data) {
  try {
    const terlindungi = function (nilai) {
      const path = decodeURIComponent(new URL(nilai, window.location.href).pathname);
      return /^\/(batch|cek-batch)(\/|$)/i.test(path);
    };
    if (terlindungi(window.location.href) || terlindungi(data.url) || (data.referrer && terlindungi(data.referrer))) return false;
    return data;
  } catch {
    return false;
  }
};
