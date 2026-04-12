from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import uvicorn
from chatbot_engine import chatbot


# Konfigurasi CORS agar frontend bisa akses API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ganti dengan ["http://localhost:5500"] jika ingin lebih aman
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    user_id: str
    message: str

class ChatResponse(BaseModel):
    user_id: str
    response: str
    history: List[Dict[str, str]]

@app.get("/")
async def root():
    return {"message": "Selamat datang di API Chatbot Dokter Santai! Ada yang bisa aku bantu?"}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Memproses input user melalui chatbot engine
        bot_response = chatbot.get_response(request.user_id, request.message)
        
        # Mendapatkan riwayat chat terbaru dari memory
        chat_history = chatbot.get_chat_history(request.user_id)
        
        return ChatResponse(
            user_id=request.user_id,
            response=bot_response,
            history=chat_history
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/history/{user_id}")
async def get_history(user_id: str):
    return {"user_id": user_id, "history": chatbot.get_chat_history(user_id)}

@app.delete("/history/{user_id}")
async def clear_history(user_id: str):
    if user_id in chatbot.memory:
        del chatbot.memory[user_id]
        return {"message": f"Riwayat untuk user {user_id} berhasil dihapus."}
    return {"message": f"Tidak ada riwayat untuk user {user_id}."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
