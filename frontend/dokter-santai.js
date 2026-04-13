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

// Fetch API logic terintegrasi dengan backend FastAPI python
async function getAIResponseFromServer(message) {
  try {
    const response = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userId,
        message: message
      })
    });
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Fetch error:", error);
    return "Maaf, server Dokter Santai (backend) sepertinya sedang tidak aktif. Pastikan Anda sudah menjalankan `python main.py` ya!";
  }
}

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;
  
  addMessage('user', message, 'Baru saja');
  userInput.value = '';
  addBotTyping();
  
  // Ambil respon langsung dari server FastAPI LLM Python
  const responseText = await getAIResponseFromServer(message);
  
  removeBotTyping();
  addMessage('bot', responseText, 'Baru saja');
  updateSuggestions();
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
