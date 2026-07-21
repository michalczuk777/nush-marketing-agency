import os
import sqlite3
import uuid
import smtplib
from email.message import EmailMessage
from fastapi import FastAPI, BackgroundTasks
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup
import google.generativeai as genai
from dotenv import load_dotenv

# ZADANIE 1: Zależności i Zmienne Środowiskowe
load_dotenv()

# Konfiguracja API Gemini
gemini_api_key = os.getenv("GEMINI_API_KEY")
if gemini_api_key:
    genai.configure(api_key=gemini_api_key)

app = FastAPI()
DB_FILE = "nush_leads.db"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
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

init_db()

class LeadRequest(BaseModel):
    email: str
    url: str

# ZADANIE 2: Logika Scrapowania i AI
def analyze_website(url: str) -> str:
    try:
        # Nagłówki zapobiegające blokadom
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Usuwamy skrypty i style
        for script_or_style in soup(['script', 'style']):
            script_or_style.decompose()
            
        # Zwracamy tekst z tagu body
        if soup.body:
            return soup.body.get_text(separator=' ', strip=True)
        else:
            return soup.get_text(separator=' ', strip=True)
    except Exception as e:
        return f"Błąd pobierania strony: {str(e)}"

def generate_audit_draft(website_content: str) -> str:
    if not gemini_api_key:
        return "Brak klucza API Gemini"
        
    try:
        # System prompt zgodnie z zadaniem
        system_prompt = (
            "Jesteś inżynierem z butiku technologicznego NUSH. Przeanalizuj podany tekst ze strony WWW. "
            "Znajdź 1-2 wąskie gardła (np. technologiczne lub analityczne). "
            "Napisz krótki, surowy, techniczny e-mail (max 4 zdania) do właściciela, wskazując problem "
            "i proponując 15-minutowy sprint wdrożeniowy w celu jego naprawy. "
            "Bez lania wody, bez powitań typu 'Szanowny Panie'. Zakończ 'Pozdrawiam, NUSH'."
        )
        
        model = genai.GenerativeModel('gemini-1.5-flash', system_instruction=system_prompt)
        # Ograniczamy treść by nie przekroczyć limitów darmowego API
        response = model.generate_content(website_content[:15000])
        return response.text
    except Exception as e:
        return f"Błąd podczas generowania audytu z AI: {str(e)}"

# Logika tła (Background Task)
def process_lead_task(lead_id: str, url: str, email: str):
    # 1. Pobranie strony
    content = analyze_website(url)
    
    # 2. Wygenerowanie szkicu z AI
    draft = generate_audit_draft(content)
    
    # 3. Aktualizacja rekordu w bazie
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE leads SET ai_draft = ? WHERE id = ?",
        (draft, lead_id)
    )
    conn.commit()
    conn.close()
    
    # 4. Wewnętrzny mail organizacyjny
    approval_link = f"https://localhost:8000/approve/{lead_id}"
    email_subject = "NOWY LEAD NUSH"
    email_body = f"Nowa analiza gotowa. Kliknij, aby zatwierdzić: {approval_link}"
    
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")
    smtp_server = os.getenv("SMTP_SERVER")
    
    # Zawsze wypisujemy w konsoli serwera do testów
    print(f"\n[{lead_id}] {email_subject}\n{email_body}\n--- WYGENEROWANY DRAFT ---\n{draft}\n")
    
    if smtp_user and smtp_pass and smtp_server:
        try:
            msg = EmailMessage()
            msg.set_content(email_body)
            msg['Subject'] = email_subject
            msg['From'] = smtp_user
            msg['To'] = smtp_user # wysyłamy do siebie (na adres organizacyjny)
            
            # Można dostosować port w zależności od dostawcy (465 SSL, 587 TLS itp.)
            with smtplib.SMTP_SSL(smtp_server, 465) as server:
                server.login(smtp_user, smtp_pass)
                server.send_message(msg)
        except Exception as e:
            print(f"Błąd wysyłki powiadomienia e-mail: {str(e)}")

# ZADANIE 3: Endpoint z BackgroundTasks
@app.post("/api/analyze")
async def analyze_lead(request: LeadRequest, background_tasks: BackgroundTasks):
    lead_id = str(uuid.uuid4())
    
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO leads (id, url, email, status) VALUES (?, ?, ?, ?)",
        (lead_id, request.url, request.email, 'pending')
    )
    conn.commit()
    conn.close()
    
    background_tasks.add_task(process_lead_task, lead_id, request.url, request.email)
    
    return {"status": "success", "message": "Zgłoszenie przyjęte"}

@app.get("/")
async def serve_index():
    return FileResponse("index.html")

app.mount("/", StaticFiles(directory="."), name="static")
