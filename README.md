# Chatbot Dokter Santai AI 🩺🤖

Chatbot ini adalah asisten medis berbasis AI yang dirancang untuk memberikan edukasi kesehatan dan layanan pelanggan dengan gaya bahasa yang santai, akrab, dan menenangkan.

## Fitur Utama
- **NLP Engine**: Menggunakan logika pemrosesan bahasa alami untuk memahami keluhan pengguna.
- **Persona Dokter Santai**: Gaya bahasa yang akrab (menggunakan 'kamu', 'bro/sis') namun tetap informatif secara medis.
- **Memory System**: Menyimpan riwayat percakapan untuk memberikan respon yang kontekstual.
- **Integrasi API Eksternal (Simulasi)**: Mendapatkan tips kesehatan harian dan informasi penyakit dari database medis.
- **Rekomendasi**: Memberikan saran gaya hidup sehat berdasarkan topik pembicaraan.

## Tampilan Antarmuka (UI)
Berikut adalah tampilan antarmuka (UI) frontend yang telah diperbarui, minimalis dan berfokus murni pada fitur Chatbot (Konsultasi Aktif):

![Tampilan UI Dokter Santai](ui preview.png)
*(Catatan: Harap simpan tangkapan layar (screenshot) UI Anda ke direktori ini dengan nama `ui preview.png` agar gambar di atas bisa ditampilkan dengan benar saat membaca README ini).*

## Cara Menjalankan

1. **Install Dependensi**
   ```bash
   pip install -r requirements.txt
   ```

2. **Jalankan Server**
   ```bash
   python main.py
   ```
   Server akan berjalan di `http://localhost:8000`.

## API Endpoints

- `GET /`: Menampilkan pesan sambutan.
- `POST /chat`: Mengirim pesan ke chatbot.
  - Body: `{"user_id": "user123", "message": "Halo dok, saya pusing nih"}`
- `GET /history/{user_id}`: Melihat riwayat percakapan untuk user tertentu.
- `DELETE /history/{user_id}`: Menghapus riwayat percakapan.

## Contoh Interaksi
- **User**: "Halo dok!"
- **Bot**: "Halo juga bro/sis! Dokter Santai di sini. Ada keluhan apa nih hari ini?"
- **User**: "Aku lagi pusing nih dok."
- **Bot**: "Pusing itu nggak enak banget ya. Coba minum air putih yang banyak dulu, terus istirahat..."

---
*Disclaimer: Chatbot ini hanya untuk edukasi dan bukan pengganti saran medis profesional.*
