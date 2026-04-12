import os
import random
from typing import List, Dict
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class ExternalMedicalAPI:
    """Simulasi integrasi API eksternal untuk data medis."""
    def __init__(self):
        self.health_tips = [
            "Minum air putih minimal 2 liter sehari ya, biar ginjalmu seneng.",
            "Jangan begadang terus, tidur 7-8 jam biar sel tubuh bisa regenerasi.",
            "Olahraga ringan 15 menit tiap pagi bisa bikin mood makin mantap.",
            "Kurangi konsumsi gula berlebih, manisnya cukup di senyumanmu aja.",
            "Sering cuci tangan ya, kuman ada di mana-mana tapi nggak kelihatan."
        ]
        
    def get_random_tip(self) -> str:
        return random.choice(self.health_tips)

    def search_disease_info(self, disease: str) -> str:
        # Simulasi pencarian informasi penyakit dari database eksternal
        db = {
            "flu": "Flu itu disebabkan virus. Istirahat cukup dan makan bergizi kuncinya.",
            "maag": "Pola makan teratur ya, hindari makanan terlalu pedas atau asam dulu.",
            "insomnia": "Coba kurangi main HP sebelum tidur, bikin suasana kamar nyaman.",
            "obesitas": "Jaga pola makan dan rutin gerak badan, pelan-pelan aja yang penting konsisten."
        }
        return db.get(disease.lower(), "Maaf nih, dataku soal itu belum lengkap. Coba tanya hal lain atau cek ke dokter ya.")

class ChatbotEngine:
    def __init__(self):
        self.api = ExternalMedicalAPI()
        self.persona = """
        Kamu adalah 'Dokter Santai', seorang asisten medis AI yang ahli namun berbicara dengan gaya bahasa yang santai, 
        akrab, dan menenangkan, layaknya seorang teman dekat yang juga seorang dokter. 
        Tugas utamamu adalah memberikan edukasi kesehatan, saran pertolongan pertama, dan menjawab pertanyaan medis 
        dasar kepada pasien atau pengguna.
        
        Aturan:
        1. Gunakan bahasa Indonesia yang santai (misalnya 'kamu', 'aku', 'bro/sis', 'sip', 'mantap').
        2. Berikan informasi yang akurat secara medis namun mudah dimengerti (hindari terlalu banyak jargon teknis).
        3. Selalu ingatkan pengguna untuk berkonsultasi dengan dokter nyata jika gejalanya serius.
        4. Jika ditanya hal di luar kesehatan, arahkan kembali dengan cara yang sopan dan santai.
        5. Berikan rekomendasi pola hidup sehat jika relevan.
        """
        # Memory sederhana menggunakan dictionary (dalam memori)
        self.memory: Dict[str, List[Dict[str, str]]] = {}

    def get_chat_history(self, user_id: str) -> List[Dict[str, str]]:
        if user_id not in self.memory:
            self.memory[user_id] = [{"role": "system", "content": self.persona}]
        return self.memory[user_id]

    def add_to_history(self, user_id: str, role: str, content: str):
        if user_id not in self.memory:
            self.get_chat_history(user_id)
        self.memory[user_id].append({"role": role, "content": content})
        
        # Batasi memory ke 10 pesan terakhir agar tidak terlalu panjang
        if len(self.memory[user_id]) > 11:
            self.memory[user_id] = [self.memory[user_id][0]] + self.memory[user_id][-10:]

    def get_response(self, user_id: str, user_input: str) -> str:
        # Menambahkan input user ke memory
        self.add_to_history(user_id, "user", user_input)
        
        # Proses input dengan simulasi logika
        response = self._process_logic(user_input)
        
        # Menambahkan respons chatbot ke memory
        self.add_to_history(user_id, "assistant", response)
        
        return response

    def _process_logic(self, user_input: str) -> str:
        input_lower = user_input.lower()
        
        # 1. Cek jika user minta tips kesehatan
        if "tips" in input_lower or "saran" in input_lower:
            tip = self.api.get_random_tip()
            return f"Oke bro/sis, nih ada tips buat kamu: {tip} Gimana, gampang kan?"

        # 2. Cek jika user tanya tentang penyakit tertentu (simulasi API)
        for disease in ["flu", "maag", "insomnia", "obesitas"]:
            if disease in input_lower:
                info = self.api.search_disease_info(disease)
                recommendation = self._get_smart_recommendation(disease)
                return f"Soal {disease} ya? Gini penjelasannya: {info}\n\nSaran tambahan: {recommendation}\nAda lagi yang mau ditanyain?"

        # 3. Respon umum berdasarkan kata kunci
        if any(word in input_lower for word in ["halo", "hi", "pagi", "siang", "sore", "malam"]):
            return "Halo juga bro/sis! Dokter Santai di sini. Ada keluhan apa nih hari ini? Atau mau sekadar tanya tips sehat?"
        
        if any(word in input_lower for word in ["pusing", "sakit kepala", "migrain"]):
            return "Pusing itu nggak enak banget ya. Coba minum air putih yang banyak dulu, terus istirahat di ruangan gelap. Kalau besok masih sama, mending cek ke dokter ya biar pasti. Jangan lupa makan teratur!"
            
        if any(word in input_lower for word in ["demam", "panas"]):
            return "Badan lagi panas ya? Kompres pake air hangat aja di dahi atau lipatan ketiak. Jangan lupa minum yang banyak biar nggak dehidrasi. Kalau panasnya di atas 39 derajat, buruan ke IGD ya, jangan ditunda."

        if any(word in input_lower for word in ["makan", "diet", "nutrisi"]):
            return "Wah, ngomongin diet nih. Prinsipnya simpel: makan secukupnya, gizi seimbang. Jangan ekstrem-ekstrem dietnya, yang penting konsisten. Mau aku kasih tips makan sehat?"

        # 4. Default response
        return "Hmm, aku paham. Tapi boleh ceritain lebih jelas nggak gejalanya gimana? Biar aku bisa kasih gambaran yang lebih oke. Inget ya, aku AI, bukan pengganti pemeriksaan langsung oleh dokter beneran."

    def _get_smart_recommendation(self, topic: str) -> str:
        """Fitur rekomendasi cerdas berdasarkan topik."""
        recs = {
            "flu": "Coba minum teh jahe hangat, mantap buat legain tenggorokan.",
            "maag": "Biasakan sarapan ya, biar lambungnya nggak demo pagi-pagi.",
            "insomnia": "Kurangi kopi setelah jam 2 siang, biar tidurnya nyenyak.",
            "obesitas": "Jalan kaki 30 menit sehari udah cukup kok buat awal, yang penting rutin."
        }
        return recs.get(topic.lower(), "Jaga kesehatan terus ya!")

chatbot = ChatbotEngine()
