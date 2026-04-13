import os
from typing import List, Dict
from dotenv import load_dotenv
from google import genai

# Load environment variables dari .env
load_dotenv()

class ChatbotEngine:
    def __init__(self):
        self.persona = """
        Kamu adalah 'Dokter Santai', seorang asisten medis AI profesional namun memiliki kepedulian dan empati yang sangat tinggi terhadap pasien. 
        Gaya bicaramu santai, akrab, lembut, dan merangkul layaknya seorang teman dekat.
        
        Aturan UTAMA:
        1. JAWABLAH DENGAN RINGKAS DAN SINGKAT (usahakan maksimal 2-3 kalimat pendek yang langsung ke intinya).
        2. Selalu tunjukkan rasa perhatian, menenangkan, atau turut bersimpati pada rasa sakit pasien sebelum memberikan saran medis.
        3. Gunakan bahasa kasual sehari-hari (seperti 'aku', 'kamu', 'bro/sis', 'gws ya', 'jangan dipaksa').
        4. Berikan panduan pertolongan pertama yang mudah dilakukan sekarang juga.
        5. Jangan berbelit-belit layaknya robot, buat senatural mungkin.
        """
        # Dictionary untuk instance Chat session internal API Google
        self.sessions: Dict[str, any] = {}
        # Memori sederhana dalam bentuk array text untuk dikirim balik ke format web
        self.memory: Dict[str, List[Dict[str, str]]] = {}
        # Menjaga state HTTP Client agar tidak tertutup otomatis oleh Python Garbage Collector
        self.client = None

    def get_chat_history(self, user_id: str) -> List[Dict[str, str]]:
        if user_id not in self.memory:
            return [{"role": "system", "content": self.persona}]
        
        return self.memory[user_id]

    def get_response(self, user_id: str, user_input: str) -> str:
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            return "Maaf bro/sis, kunci rahasiaku (GEMINI_API_KEY) belum ada di file `.env`. Coba diisi dulu ya biar sistemnya jalan."

        try:
            # Menggunakan client global yang tidak akan terhapus
            if self.client is None:
                self.client = genai.Client(api_key=api_key)
            
            # Setup model session jika belum ada sesi untuk user_id ini
            if user_id not in self.sessions:
                # Memulai chat menggunakan model canggih terbaru
                self.sessions[user_id] = self.client.chats.create(
                    model="gemini-2.5-flash",
                    config={"system_instruction": self.persona}
                )
                # Inisialisasi ingatan lokal untuk dibalas ke frontend UI
                self.memory[user_id] = [{"role": "system", "content": self.persona}]
            
            chat_session = self.sessions[user_id]
            
            # Kirim pesan ke sesi Gemini
            response = chat_session.send_message(user_input)
            
            # Update history memori untuk antarmuka visual
            self.memory[user_id].append({"role": "user", "content": user_input})
            self.memory[user_id].append({"role": "assistant", "content": response.text})

            return response.text

        except Exception as e:
            return f"Waduh, koneksiku lagi agak pusing nih ({str(e)}). Boleh ulangi lagi nggak pertanyaannya?"

    def clear_history(self, user_id: str) -> bool:
        if user_id in self.sessions:
            del self.sessions[user_id]
        if user_id in self.memory:
            del self.memory[user_id]
            return True
        return False

chatbot = ChatbotEngine()
