# Chatbot Dokter Santai AI 🩺

Chatbot ini adalah asisten medis berbasis AI yang dirancang untuk memberikan edukasi kesehatan dan layanan pelanggan dengan gaya bahasa yang santai, akrab, dan menenangkan.

## Fitur Utama
- **Generative AI LLM**: Didukung penuh oleh kecerdasan model canggih *Google Gemini 2.5 Flash* lewat paket `google-genai` SDK terbaru untuk memahami hampir seluruh ragam kalimat pengguna.

- **Dual-State Memory System**: Menyimpan untaian riwayat percakapan Anda baik di ranah *server FastAPI lokal* maupun sinkronisasi asli berbasis _System Context_ agar konsultasi tidak tercampur/lupa.
- **Konsultasi Tanpa Batas Ruang Lingkup**: Tidak terkunci pada kata sandi tertentu (bukan tipe _hardcoded intent_), sehingga model bersedia menjawab keluhan fisik paling rumit sekalipun.

## Tampilan Antarmuka (UI)
Berikut adalah tampilan antarmuka (UI) frontend yang telah diperbarui, terasa minimalis dan berfokus murni pada fitur utama Chatbot (Konsultasi Aktif):

![Tampilan UI Dokter Santai](UI%20Preview.png)

## Panduan Instalasi & Menjalankan

Aplikasi ini sekarang berjalan menggunakan arsitektur *Fullstack* (Klien & Peladen) yang nyata dan secara harafiah diotaki langsung oleh kehebatan Google Gemini. Oleh hal itu, Anda **WAJIB** menjalankan *server backend* Python-nya terlebih dahulu agar tampilannya tidak error kehilangan koneksi klien.

**Langkah 1: Siapkan API Key Google Gemini (Gratis)**
- Buka antarmuka situs [Google AI Studio](https://aistudio.google.com/app/apikey).
- Buat dan salin (*Copy*) sebuah ruas *API Key*. 
- Dalam *folder template* kode ini, cari berkas `.env.example` lalu ubah persis memudar format berawalan namanya ke file konfigurasi `.env`.
- Masukkan teks sandi salinan Anda langsung tanpa ada tambahan spasi: `GEMINI_API_KEY="AI..."`

**Langkah 2: Instalasi Kebutuhan Sistem (Dependensi)**
- Pastikan sistem peranti komputer telah membekali instalasi [Python](https://www.python.org/downloads/) aktif dan nilai jejak lokasinya ditambahkan ke jalur *System PATH*.
- Buka jendela Hitam *Terminal / CMD* (pastikan ada di direktori lokasi folder ini), dan tempelkan proses tarikan muat:
  ```bash
  pip install -r requirements.txt
  ```

**Langkah 3: Jalankan Mesin Server Backend Otak**
- Langsung dari terminal yang identik pasca unduhan sukses, jalankan instruksi:
  ```bash
  python main.py
  ```
- Biarkan *Terminal / CMD* Anda meronta menyajikan jejak rekam aktif berjalan (_Running Uvicorn_) terpusat di ranah `http://localhost:8000`. 

**Langkah 4: Buka Aplikasi Antarmuka HTML**
- Masuk ke folder *File Explorer* bernama `frontend`.
- Pilah penemuan berkas **`dokter-santai.html`** dan hantam segera **`Klik 2x / Double-Click`**. 
- Tampilan Chatbot AI Dokter Santai yang cantik nan segar menguar lewat bilah layar mesin jelajah pelacak peramban Anda (Chrome/Safari/Edge), dan selamat asyik berkonsultasi AI memukau!

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
