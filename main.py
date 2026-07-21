from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import sqlite3
import uuid

app = FastAPI()

DB_FILE = "nush_leads.db"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    # Tworzenie tabeli leads
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS leads (
            id TEXT PRIMARY KEY,
            url TEXT,
            email TEXT,
            ai_draft TEXT,
            status TEXT DEFAULT 'pending'
        )
    ''')
    conn.commit()
    conn.close()

# Inicjalizacja bazy danych przy starcie aplikacji
init_db()

# Model Pydantic do walidacji przychodzących danych z formularza
class LeadRequest(BaseModel):
    email: str
    url: str

@app.post("/api/analyze")
async def analyze_lead(request: LeadRequest):
    lead_id = str(uuid.uuid4())
    
    # Zapis do bazy danych
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO leads (id, url, email, status) VALUES (?, ?, ?, ?)",
        (lead_id, request.url, request.email, 'pending')
    )
    conn.commit()
    conn.close()
    
    return {"status": "success", "message": "Zgłoszenie przyjęte"}

@app.get("/")
async def serve_index():
    # Zwraca główny plik index.html
    return FileResponse("index.html")

# Serwowanie pozostałych plików statycznych (CSS, obrazki) z głównego katalogu
# Montujemy na końcu, aby nie nadpisać wcześniej zdefiniowanych route'ów
app.mount("/", StaticFiles(directory="."), name="static")
