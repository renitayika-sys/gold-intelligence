# GOLD INTELLIGENCE

PWA edukasi untuk membaca observasi makroekonomi FRED.

## Deploy
1. Upload seluruh isi ZIP ke root repository GitHub.
2. Hubungkan repository ke Netlify.
3. Tambahkan Environment Variable `FRED_API_KEY` dengan API key FRED pribadi.
4. Deploy ulang.
5. Uji `https://NAMA-SITE-ANDA.netlify.app/.netlify/functions/fred` dan pastikan respons berisi `success: true`.

FRED bukan feed harga spot XAUUSD atau kalender berita real-time. Seri memiliki frekuensi dan jeda rilis berbeda. Bias adalah heuristik sederhana, bukan prediksi, probabilitas, atau rekomendasi transaksi. Jangan menaruh API key di file frontend atau repository publik.
