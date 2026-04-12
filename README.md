# Chatbot Dokter Santai AI 🩺🤖

Chatbot ini adalah asisten medis berbasis AI yang dirancang untuk memberikan edukasi kesehatan dan layanan pelanggan dengan gaya bahasa yang santai, akrab, dan menenangkan.

## Fitur Utama
- **NLP Engine**: Menggunakan logika pemrosesan bahasa alami untuk memahami keluhan pengguna.
- **Persona Dokter Santai**: Gaya bahasa yang akrab (menggunakan 'kamu', 'bro/sis') namun tetap informatif secara medis.
- **Memory System**: Menyimpan riwayat percakapan untuk memberikan respon yang kontekstual.
- **Integrasi API Eksternal (Simulasi)**: Mendapatkan tips kesehatan harian dan informasi penyakit dari database medis.
- **Rekomendasi**: Memberikan saran gaya hidup sehat berdasarkan topik pembicaraan.

## Tampilan Antarmuka (UI)
Berikut adalah tampilan antarmuka (UI) frontend yang telah diperbarui, terasa minimalis dan berfokus murni pada fitur utama Chatbot (Konsultasi Aktif):

<<<<<<< HEAD
![Tampilan UI Dokter Santai](UI%20Preview.png)
=======
![Tampilan UI Dokter Santai](ui preview.png)
*(Catatan: Harap simpan tangkapan layar (screenshot) UI Anda ke direktori ini dengan nama `ui preview.png` agar gambar di atas bisa ditampilkan dengan benar saat membaca README ini).*
>>>>>>> 3890e695b90f92094b8a4406241b3cd270f6bae6

## Panduan Konfigurasi & Menjalankan (Untuk Pemula)

Ikuti langkah demi langkah di bawah ini dengan santai untuk mulai memakai aplikasi ini di komputer Anda:

### Cara 1: Mengakses Chatbot AI Secara Langsung (Sangat Mudah)
Kecerdasan buatan (Logika *NLP/Natural Language Processing*) saat ini sudah terintegrasi langsung di dalam berkas HTML, sehingga Anda tidak perlu menyalakan *server backend* untuk mencoba konsultasi awal:
1. Buka folder `frontend` yang ada di dalam proyek ini menggunakan *File Explorer*.
2. Cari file bernama **`dokter-santai.html`**.
3. **Klik dua kali** (`Double click`) pada file tersebut.
4. Voila! Tampilan Chatbot AI akan otomatis terbuka di browser Anda (Google Chrome / Microsoft Edge / Safari) dan siap menjadi teman konsultasi kesehatan.

### Cara 2: Menyalakan Server Backend (Untuk Pengembangan / API)
Bila Anda adalah *developer* yang ingin mengubah fungsionalitas lanjutan di sistem Python, Anda perlu menjalankan proses ini:

**Langkah 1: Pastikan Python Sudah Terinstal**
- Jika komputer Anda belum pernah dipasangi bahasa pemrograman Python, unduh gratis dari [python.org/downloads](https://www.python.org/downloads/). 
- *Penting:* Ingatlah untuk mencentang tulisan *"Add Python to PATH"* di bagian bawah saat awal mula klik tombol Install!

**Langkah 2: Buka Jendela Perintah (Terminal / CMD)**
- Buka lokasi folder proyek ini menggunakan File Explorer.
- Di kotak alamat atas (*Address Bar*), ketikkan `cmd` kemudian tekan *Enter* di keyboard. Jendela terminal hitam akan muncul.

**Langkah 3: Mengunduh Persiapan Sistem (Dependensi)**
- Pada jendela hitam tersebut, salin & tempel kode ini lalu tekan *Enter*:
   ```bash
   pip install -r requirements.txt
   ```
- Tunggu proses muatan atau *download* bar merah/putih hingga tertulis status *Successful*.

**Langkah 4: Menghidupkan Mesin (Server)**
- Masih di jendela hitam yang sama, ketikkan:
   ```bash
   python main.py
   ```
- Biarkan jendela layar hitam tersebut tetap terbuka saat mengecek aplikasinya. Tanda bahwa *server* telah sukses menyala adalah ketika terminal menayangkan tulisan bahwa server berjalan di `http://localhost:8000`.

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
