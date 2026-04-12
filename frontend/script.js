const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

const userId = 'user_' + Math.floor(Math.random() * 1000000);

function addMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message ' + (role === 'user' ? 'user' : 'bot');

    // Avatar
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.innerText = role === 'user' ? '🧑' : '🤖';

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.innerText = text;

    if (role === 'user') {
        msgDiv.appendChild(bubble);
        msgDiv.appendChild(avatar);
    } else {
        msgDiv.appendChild(avatar);
        msgDiv.appendChild(bubble);
    }
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;
    addMessage('user', message);
    userInput.value = '';
    addMessage('bot', 'Mengetik...');
    try {
        const res = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, message })
        });
        const data = await res.json();
        chatBox.removeChild(chatBox.lastChild); // remove 'Mengetik...'
        addMessage('bot', data.response);
    } catch (err) {
        chatBox.removeChild(chatBox.lastChild);
        addMessage('bot', 'Maaf, terjadi error. Coba lagi nanti.');
    }
});

// Sambutan awal
addMessage('bot', 'Halo! Aku Dokter Santai. Ada yang bisa aku bantu hari ini?');
