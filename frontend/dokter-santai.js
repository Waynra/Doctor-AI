const chatThread = document.getElementById('chat-thread');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const suggestedQuestions = document.getElementById('suggested-questions');
const userId = 'user_' + Math.floor(Math.random() * 1000000);

const SUGGESTIONS = [
  'Berikan tips hidup sehat',
  'Apa itu maag?',
  'Bagaimana cara mengatasi pusing?',
  'Kapan harus ke dokter?',
  'Apa penyebab demam?',
];

function addMessage(role, text, time = null) {
  const isUser = role === 'user';
  const wrapper = document.createElement('div');
  wrapper.className = `flex gap-4 items-start ${isUser ? 'flex-row-reverse' : ''} group`;

  // Avatar
  const avatar = document.createElement('div');
  avatar.className = `w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isUser ? 'bg-blue-600 shadow-lg shadow-blue-400/20' : 'bg-[#e3e9ed]'}`;
  avatar.innerHTML = `<span class="material-symbols-outlined ${isUser ? 'text-white' : 'text-blue-700'}">${isUser ? 'person' : 'smart_toy'}</span>`;

  // Bubble
  const bubbleWrap = document.createElement('div');
  bubbleWrap.className = `flex flex-col gap-2 ${isUser ? 'items-end' : ''} max-w-[80%]`;
  const bubble = document.createElement('div');
  bubble.className = `${isUser ? 'bg-gradient-to-br from-blue-600 to-blue-300 text-white rounded-xl rounded-tr-sm' : 'bg-[#e3e9ed] text-[#2c3437] rounded-xl rounded-tl-sm'} px-6 py-4`;
  bubble.innerHTML = `<p class="leading-relaxed">${text}</p>`;
  bubbleWrap.appendChild(bubble);
  if (time) {
    const timeSpan = document.createElement('span');
    timeSpan.className = 'text-[10px] text-[#596064] font-medium';
    timeSpan.innerText = time;
    bubbleWrap.appendChild(timeSpan);
  }

  if (isUser) {
    wrapper.appendChild(bubbleWrap);
    wrapper.appendChild(avatar);
  } else {
    wrapper.appendChild(avatar);
    wrapper.appendChild(bubbleWrap);
  }
  chatThread.appendChild(wrapper);
  chatThread.scrollTop = chatThread.scrollHeight;
}

function addBotTyping() {
  addMessage('bot', '<span class="italic opacity-60">Mengetik...</span>');
}

function removeBotTyping() {
  const last = chatThread.lastChild;
  if (last && last.querySelector('span.italic')) chatThread.removeChild(last);
}

// NLP/AI Logic terintegrasi menggunakan compromise.js
function generateAIResponse(message) {
  // Jalankan model NLP pada text
  let doc = nlp(message);
  let text = message.toLowerCase();
  
  // Definisikan 'Intents' atau maksud pertanyaan dengan pendekatan keyword NLP
  const intents = {
    greeting: ["halo", "hai", "selamat p", "selamat s", "selamat m", "hey"],
    symptom_headache: ["pusing", "sakit kepala", "migrain", "migran", "cekat", "kepala"],
    symptom_stomach: ["maag", "mual", "sakit perut", "diare", "lambung", "mules", "perut"],
    symptom_fever: ["demam", "panas", "menggigil", "meriang", "suhu"],
    tips_healthy: ["tips", "hidup sehat", "makanan sehat", "diet", "olahraga", "jaga tubuh"],
    gratitude: ["terima kasih", "thanks", "makasih", "baik", "oke"]
  };

  let matchedIntent = 'unknown';

  for (let intent in intents) {
    if (intents[intent].some(kw => text.includes(kw))) {
      matchedIntent = intent;
      break;
    }
  }

  // Respon AI adaptif berdasarkan deteksi dari model
  switch (matchedIntent) {
    case 'greeting':
      return "Halo! Ada keluhan fisik yang sedang kamu rasakan saat ini, atau mungkin butuh tips gaya hidup sehat?";
    case 'symptom_headache':
      return "Keluhan pusing bisa disebabkan oleh kurangnya jam tidur, stres, atau dehidrasi ringan. Coba cukupi minum air putih dan rehat dari layar gadget. Jika pusing memburuk atau tidak hilang 2-3 hari, segera periksakan ke dokter.";
    case 'symptom_stomach':
      return "Gangguan lambung atau pencernaan sering muncul akibat pola makan tak teratur. Cobalah makan teratur dengan porsi kecil, hindari pedas, dan perbanyak air hangat. Hubungi klinik terdekat jika sakit perut tak tertahankan.";
    case 'symptom_fever':
      return "Masa demam adalah cara sistem imun kita melawan invasi virus/bakteri. Perbanyak air putih, istirahat berbaring, dan konsumsi paracetamol jika perlu. Tapi ingat, bila demam menetap >3 hari atau melebihi 39°C, bantuan tenaga medis adalah prioritas.";
    case 'tips_healthy':
      return "Tips utama sehat paripurna: 1. Tidur ideal 7-8 jam 2. Kurangi manis/gorengan 3. Aktivitas fisik (berjalan 30 menit sehari) sudah cukup baik. Adakah target kesehatan tertentu yang mau kamu capai?";
    case 'gratitude':
      return "Dengan senang hati! Jangan ragu ketikkan pertanyaan lain kapan pun kamu butuh masukan medis ringan.";
    default:
      // Gunakan NLP compromise untuk mengekstrak subjek (noun/topik utama)
      let nouns = doc.nouns().out('array');
      let topic = nouns.length > 0 ? nouns[0] : null;
      if (topic) {
        return `Aku membaca kamu menyebut topik soal "${topic}". Berhubung aku masih versi simulasi, bisa kamu jelaskan lebih detail kondisinya?`;
      }
      return "Aku belum menangkap detail spesifik dari masalah yang kamu infokan. Bisa diceritakan perlahan gejala apa tepatnya yang dominan?";
  }
}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;
  
  addMessage('user', message, 'Baru saja');
  userInput.value = '';
  addBotTyping();
  
  // Simulasi model process delay (latency NLP)
  setTimeout(() => {
    removeBotTyping();
    const responseText = generateAIResponse(message);
    addMessage('bot', responseText, 'Baru saja');
    updateSuggestions(responseText);
  }, 1000 + Math.random() * 1500);
});

function updateSuggestions(lastBotMsg) {
  // Sederhana: tampilkan SUGGESTIONS default
  suggestedQuestions.innerHTML = '';
  SUGGESTIONS.forEach(q => {
    const btn = document.createElement('button');
    btn.className = 'whitespace-nowrap px-4 py-2 bg-white border border-[#acb3b7]/10 rounded-full text-xs font-medium text-[#596064] hover:border-blue-600/50 hover:text-blue-700 transition-all';
    btn.innerText = q;
    btn.onclick = () => {
      userInput.value = q;
      userInput.focus();
    };
    suggestedQuestions.appendChild(btn);
  });
}

// Sambutan awal
addMessage('bot', 'Halo! Aku Dokter Santai. Ada yang bisa aku bantu hari ini?');
updateSuggestions();
