import os
import sqlite3
import uuid
import smtplib
from email.message import EmailMessage
from fastapi import FastAPI, BackgroundTasks, Request
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup
import google.generativeai as genai
from dotenv import load_dotenv
import html
import time
from urllib.parse import urlparse
from fastapi.middleware.cors import CORSMiddleware

# ZADANIE 1: Zależności i Zmienne Środowiskowe
load_dotenv()

# Konfiguracja API Gemini
gemini_api_key = os.getenv("GEMINI_API_KEY")
if gemini_api_key:
    genai.configure(api_key=gemini_api_key)

app = FastAPI()

# Zabezpieczenie CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Na produkcji zdefiniuj konkretną domenę
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_FILE = "nush_leads.db"
RATE_LIMITS = {} # Proste logowanie IP -> timestamp

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
    try:
        cursor.execute("ALTER TABLE leads ADD COLUMN name TEXT")
    except sqlite3.OperationalError:
        pass # Kolumna już istnieje
    conn.commit()
    conn.close()

init_db()

class LeadRequest(BaseModel):
    name: str
    email: str
    url: str

# ZADANIE 2: Logika Scrapowania i AI
def analyze_website(url: str) -> str:
    try:
        parsed_url = urlparse(url)
        if parsed_url.scheme not in ('http', 'https'):
            return "Błąd: Niedozwolony schemat URL. Proszę użyć http:// lub https://"
            
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0'
        }
        # SSRF i DoS Protection: Stream download, max 1MB
        response = requests.get(url, headers=headers, timeout=10, stream=True)
        response.raise_for_status()
        
        content = b""
        for chunk in response.iter_content(chunk_size=8192):
            content += chunk
            if len(content) > 1024 * 1024: # Limit 1MB
                break
                
        soup = BeautifulSoup(content, 'html.parser')
        
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
def process_lead_task(lead_id: str, url: str, email: str, base_url: str):
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
    approval_link = f"{base_url}/approve/{lead_id}"
    email_subject = "NOWY LEAD NUSH"
    email_body = f"Nowa analiza gotowa. Kliknij, aby zatwierdzić: {approval_link}"
    
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")
    smtp_server = os.getenv("SMTP_SERVER") or os.getenv("SMTP_HOST")
    
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
async def analyze_lead(request_data: LeadRequest, background_tasks: BackgroundTasks, request: Request):
    # Fix for proxies (like Railway)
    client_ip = request.headers.get("X-Forwarded-For", request.client.host).split(",")[0].strip()
    now = time.time()
    
    # Prosty Rate Limiting: max 1 request na minutę z jednego IP
    if client_ip in RATE_LIMITS:
        if now - RATE_LIMITS[client_ip] < 60:
            return {"status": "error", "message": "Zbyt wiele zapytań. Spróbuj ponownie za minutę."}
    RATE_LIMITS[client_ip] = now
    
    lead_id = str(uuid.uuid4())
    
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO leads (id, url, email, name, status) VALUES (?, ?, ?, ?, ?)",
        (lead_id, request_data.url, request_data.email, request_data.name, 'pending')
    )
    conn.commit()
    conn.close()
    
    base_url = str(request.base_url).rstrip("/")
    background_tasks.add_task(process_lead_task, lead_id, request_data.url, request_data.email, base_url)
    
    return {"status": "success", "message": "Zgłoszenie przyjęte"}

class ApproveRequest(BaseModel):
    draft: str

@app.get("/approve/{lead_id}", response_class=HTMLResponse)
async def get_approval_panel(lead_id: str):
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("SELECT status, ai_draft FROM leads WHERE id = ?", (lead_id,))
    row = cursor.fetchone()
    conn.close()
    
    if not row:
        return HTMLResponse("<h1>Nie znaleziono leada</h1>", status_code=404)
        
    status, ai_draft = row
    
    if status == 'sent':
        return HTMLResponse("<h1>Audyt już wysłany</h1>")
    elif status == 'rejected':
        return HTMLResponse("<h1>Audyt został odrzucony</h1>")
        
    # XSS Protection
    safe_draft = html.escape(ai_draft or '')
    
    html_content = f"""
    <!DOCTYPE html>
    <html lang="pl">
    <head>
        <meta charset="UTF-8">
        <title>Panel Akceptacji NUSH</title>
        <style>
            body {{
                background-color: #0a0a0a;
                color: #ffffff;
                font-family: monospace;
                padding: 40px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }}
            textarea {{
                width: 100%;
                max-width: 800px;
                height: 400px;
                background-color: #111111;
                color: #00ff00;
                border: 2px solid #00ff00;
                padding: 15px;
                font-family: monospace;
                font-size: 16px;
                margin-bottom: 20px;
                outline: none;
            }}
            .btn-container {{
                display: flex;
                gap: 20px;
            }}
            button {{
                padding: 15px 30px;
                font-family: monospace;
                font-size: 18px;
                font-weight: bold;
                cursor: pointer;
                border: none;
                text-transform: uppercase;
            }}
            .btn-send {{
                background-color: #00ff00;
                color: #000000;
            }}
            .btn-reject {{
                background-color: #444444;
                color: #ffffff;
            }}
        </style>
    </head>
    <body>
        <h2>AKCEPTACJA AUDYTU</h2>
        <textarea id="draft-text">{safe_draft}</textarea>
        <div class="btn-container">
            <button class="btn-send" onclick="sendAudit()">Wyślij Audyt</button>
            <button class="btn-reject" onclick="rejectAudit()">Odrzuć</button>
        </div>
        
        <script>
            async function sendAudit() {{
                const draft = document.getElementById('draft-text').value;
                const response = await fetch('/api/approve/{lead_id}', {{
                    method: 'POST',
                    headers: {{ 'Content-Type': 'application/json' }},
                    body: JSON.stringify({{ draft: draft }})
                }});
                if (response.ok) {{
                    document.body.innerHTML = '<h1>Audyt został wysłany!</h1>';
                }} else {{
                    alert('Wystąpił błąd podczas wysyłania');
                }}
            }}
            
            async function rejectAudit() {{
                const response = await fetch('/api/reject/{lead_id}', {{
                    method: 'POST'
                }});
                if (response.ok) {{
                    document.body.innerHTML = '<h1>Audyt odrzucony.</h1>';
                }} else {{
                    alert('Wystąpił błąd');
                }}
            }}
        </script>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)

@app.post("/api/approve/{lead_id}")
async def approve_audit(lead_id: str, request: ApproveRequest):
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("SELECT email, name FROM leads WHERE id = ?", (lead_id,))
    row = cursor.fetchone()
    
    if not row:
        conn.close()
        return {"status": "error", "message": "Nie znaleziono leada"}
        
    client_email, client_name = row
    final_draft = request.draft
    
    if client_name:
        final_draft = f"Cześć {client_name},\n\n" + final_draft
    
    # 2. Wysyłka maila do klienta
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")
    smtp_server = os.getenv("SMTP_SERVER") or os.getenv("SMTP_HOST")
    
    if smtp_user and smtp_pass and smtp_server:
        try:
            msg = EmailMessage()
            msg.set_content(final_draft)
            msg['Subject'] = "Wstępna diagnoza NUSH"
            msg['From'] = smtp_user
            msg['To'] = client_email
            
            with smtplib.SMTP_SSL(smtp_server, 465) as server:
                server.login(smtp_user, smtp_pass)
                server.send_message(msg)
        except Exception as e:
            print(f"Błąd wysyłki do klienta: {str(e)}")
    else:
        print(f"Symulacja wysyłki do {client_email}:\n{final_draft}")
        
    # Zmiana statusu w bazie
    cursor.execute("UPDATE leads SET status = 'sent', ai_draft = ? WHERE id = ?", (final_draft, lead_id))
    conn.commit()
    conn.close()
    
    return {"status": "success"}

@app.post("/api/reject/{lead_id}")
async def reject_audit(lead_id: str):
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("UPDATE leads SET status = 'rejected' WHERE id = ?", (lead_id,))
    conn.commit()
    conn.close()
    return {"status": "success"}

@app.exception_handler(404)
async def custom_404_handler(request, exc):
    if request.url.path.startswith("/api/") or request.url.path.startswith("/approve/"):
        return {"error": "Not found"}
    return FileResponse("nush-agency/dist/index.html")

app.mount("/", StaticFiles(directory="nush-agency/dist", html=True), name="static")
