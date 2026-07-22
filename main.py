import os
import sqlite3
import uuid
import smtplib
from email.message import EmailMessage
from fastapi import FastAPI, BackgroundTasks, Request
from fastapi.responses import FileResponse, HTMLResponse
import resend
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup
from google import genai
from google.genai import types
from dotenv import load_dotenv
import html
import time
from urllib.parse import urlparse
from fastapi.middleware.cors import CORSMiddleware
import socket
import ipaddress
import re

# ZADANIE 1: Zależności i Zmienne Środowiskowe
load_dotenv()

app = FastAPI()

# Zabezpieczenie CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://nush.pl", "http://localhost:5173", "http://localhost:8000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_FILE = "nush_leads.db"
RATE_LIMITS = {} # Proste logowanie IP -> timestamp

def get_db_connection():
    conn = sqlite3.connect(DB_FILE, timeout=10.0)
    conn.execute('PRAGMA journal_mode=WAL;')
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS leads (
            id TEXT PRIMARY KEY,
            url TEXT,
            email TEXT,
            ai_draft TEXT,
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    company_fax: str | None = None

class ContactRequest(BaseModel):
    name: str
    email: str
    message: str
    company_fax: str | None = None

def send_security_alert(reason: str, email: str, url: str, client_ip: str):
    resend.api_key = os.getenv("RESEND_API_KEY")
    if not resend.api_key:
        return
    try:
        from_email = os.getenv("CONTACT_FROM", "onboarding@resend.dev")
        to_email = os.getenv("CONTACT_TO", from_email)
        body = f"System NUSH zablokował podejrzane żądanie.\n\nPowód: {reason}\nIP: {client_ip}\nEmail: {email}\nURL: {url}"
        resend.Emails.send({
            "from": from_email,
            "to": to_email,
            "subject": f"⚠️ ALARM BEZPIECZEŃSTWA: {reason}",
            "text": body
        })
    except Exception as e:
        print(f"Błąd alertu bezp: {str(e)}")

BLACKLIST_DOMAINS = [
    'google.', 'facebook.', 'youtube.', 'allegro.pl', 'onet.pl', 'wp.pl', 'interia.pl', 
    'olx.pl', 'otomoto.pl', 'wikipedia.org', 'amazon.', 'tiktok.com', 'instagram.com', 
    'twitter.com', 'x.com', 'linkedin.com', 'netflix.com', 'apple.com', 'microsoft.com', 
    'yahoo.com', 'reddit.com', 'gov.pl'
]

def is_valid_public_url(url: str) -> bool:
    try:
        parsed = urlparse(url)
        hostname = parsed.hostname
        if not hostname:
            return False
        ip = socket.gethostbyname(hostname)
        ip_obj = ipaddress.ip_address(ip)
        if ip_obj.is_loopback or ip_obj.is_private or ip_obj.is_reserved or not ip_obj.is_global:
            return False
        return True
    except Exception:
        return False

# ZADANIE 2: Logika Scrapowania i AI
def analyze_website(url: str) -> str:
    if not is_valid_public_url(url):
        return "Błąd: Adres URL rozwiązuje się do sieci prywatnej lub jest nieosiągalny (Blokada bezpieczeństwa SSRF)."

    try:
        parsed_url = urlparse(url)
        if parsed_url.scheme not in ('http', 'https'):
            return "Błąd: Niedozwolony schemat URL. Proszę użyć http:// lub https://"
            
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0'
        }
        # SSRF i DoS Protection: Stream download, max 3MB
        response = requests.get(url, headers=headers, timeout=15, stream=True)
        response.raise_for_status()
        
        content = b""
        for chunk in response.iter_content(chunk_size=8192):
            content += chunk
            if len(content) > 3 * 1024 * 1024: # Limit 3MB
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

def generate_audit_draft(website_content: str, retries: int = 3, client_name: str = "") -> str:
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        return "Brak klucza API Gemini"
        
    name_instruction = f" Zwracaj się do klienta, używając formy 'Dzień dobry, Panie/Pani {client_name}' lub profesjonalnego 'Dzień dobry'." if client_name else " Zwracaj się do klienta profesjonalnie (Dzień dobry)."
        
    system_prompt = (
        "Jesteś inżynierem technologii i analitykiem z butiku technologicznego NUSH. Przeanalizuj tekst ze strony WWW klienta. "
        "Znajdź 1-2 konkretne, techniczne wąskie gardła (np. błędy UX/UI psujące konwersję, luki technologiczne, brak optymalizacji). "
        "Napisz e-mail B2B do właściciela, wskazując te problemy w sposób w pełni profesjonalny, chłodny i wysoce merytoryczny. "
        "Tekst nie może brzmieć jak wygenerowany przez AI (zero korpomowy, zero sztucznego entuzjazmu, zero podpunktów), ale nie może też być zbyt 'luzacki' czy spoufalający się. "
        "Pisz jak szanujący się ekspert z branży IT do partnera biznesowego – konkretnie, rzeczowo, skupiając się na liczbach i technologii. "
        f"Rozpocznij maila od uprzejmego, biznesowego powitania.{name_instruction} "
        "Opisz, jak błędy techniczne na stronie bezpośrednio przekładają się na utratę klientów lub spadek przychodów. "
        "Na końcu maila zaproponuj 15-minutową, profesjonalną konsultację w celu omówienia technicznych rozwiązań tych problemów. Nie używaj sformułowań typu 'złapać się'. Zachowaj pełną klasę biznesową. "
        "Zakończ maila zwrotem: 'Pozdrawia zespół NUSH'."
    )
    
    client = genai.Client(api_key=gemini_api_key)
    
    for attempt in range(retries):
        try:
            # Ograniczamy treść by nie przekroczyć limitów darmowego API
            response = client.models.generate_content(
                model='gemini-3.5-flash',
                contents=website_content[:15000],
                config=types.GenerateContentConfig(
                    system_instruction=system_prompt,
                )
            )
            return response.text
        except Exception as e:
            error_str = str(e)
            if "429" in error_str or "RESOURCE_EXHAUSTED" in error_str:
                if attempt < retries - 1:
                    print(f"Przekroczono limit zapytań (429). Oczekiwanie 60 sekund przed ponowną próbą {attempt+2}/{retries}...")
                    time.sleep(60)
                    continue
                    
            try:
                available_models = [m.name for m in client.models.list()]
                models_str = ", ".join(available_models)
            except Exception:
                models_str = "Nie udało się pobrać listy modeli."
                
            return f"Błąd podczas generowania audytu z AI: {error_str}\n\nTwoje dostępne modele dla tego klucza API to:\n{models_str}"
            
    return "Błąd: Przekroczono limit prób generowania z powodu błędu 429 (Resource Exhausted)."

# Logika tła (Background Task)
def process_lead_task(lead_id: str, url: str, email: str, base_url: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM leads WHERE id = ?", (lead_id,))
    row = cursor.fetchone()
    client_name = row[0] if (row and row[0]) else ""
    
    content = analyze_website(url)
    
    # 2. Wygenerowanie szkicu z AI
    draft = generate_audit_draft(content, client_name=client_name)
    
    # 3. Aktualizacja rekordu w bazie
    conn = get_db_connection()
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
    email_body = (
        f"Nowy lead wpadł do systemu!\n\n"
        f"Dane klienta:\n"
        f"Imię: {client_name}\n"
        f"Email: {email}\n"
        f"Strona WWW: {url}\n\n"
        f"Nowa analiza AI jest gotowa do weryfikacji. Kliknij, aby zatwierdzić lub odrzucić:\n"
        f"{approval_link}"
    )
    
    resend.api_key = os.getenv("RESEND_API_KEY")
    
    if resend.api_key:
        try:
            from_email = os.getenv("CONTACT_FROM", "onboarding@resend.dev")
            to_email = os.getenv("CONTACT_TO", from_email)
            
            resend.Emails.send({
                "from": from_email,
                "to": to_email,
                "subject": email_subject,
                "text": email_body
            })
        except Exception as e:
            print(f"Błąd wysyłki powiadomienia e-mail (Resend): {str(e)}")

# ZADANIE 3: Endpoint z BackgroundTasks
@app.post("/api/analyze")
async def analyze_lead(request_data: LeadRequest, background_tasks: BackgroundTasks, request: Request):
    client_ip = request.headers.get("X-Forwarded-For", request.client.host).split(",")[0].strip()
    now = time.time()
    
    # 1. Zabezpieczenie Front-end (Honeypot)
    if request_data.company_fax:
        send_security_alert("Honeypot (Bot)", request_data.email, request_data.url, client_ip)
        return {"status": "success", "message": "Zgłoszenie przyjęte"} # Ciche odrzucenie
        
    # Walidacja Email
    if not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", request_data.email):
        send_security_alert("Nieprawidłowy Email", request_data.email, request_data.url, client_ip)
        return {"status": "error", "message": "Podano nieprawidłowy adres e-mail."}
        
    # 2. Zabezpieczenie Domen (Blacklist)
    domain = urlparse(request_data.url).netloc.lower()
    if any(blocked in domain for blocked in BLACKLIST_DOMAINS):
        send_security_alert("Zablokowana domena", request_data.email, request_data.url, client_ip)
        return {"status": "error", "message": "Podana strona jest zbyt duża lub nieobsługiwana do automatycznej analizy."}
        
    # 3. Rate Limiting per IP (Max 3 na dobę)
    if client_ip not in RATE_LIMITS:
        RATE_LIMITS[client_ip] = []
    
    # Usuwamy zapytania starsze niż 24h
    RATE_LIMITS[client_ip] = [t for t in RATE_LIMITS[client_ip] if now - t < 86400]
    
    # Usuwamy całkowicie puste klucze z pamięci (Ochrona przed wyciekiem RAM przy zmasowanym ataku)
    for ip in list(RATE_LIMITS.keys()):
        if not RATE_LIMITS[ip]:
            del RATE_LIMITS[ip]
    
    if client_ip in RATE_LIMITS and len(RATE_LIMITS[client_ip]) >= 3:
        send_security_alert("Rate Limit IP (>3/24h)", request_data.email, request_data.url, client_ip)
        return {"status": "error", "message": "Przekroczono dzienny limit zapytań z tego adresu IP."}
        
    # 4. Blokada powielania w bazie
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM leads WHERE url = ? OR email = ?", (request_data.url, request_data.email))
    count = cursor.fetchone()[0]
    if count >= 3:
        conn.close()
        send_security_alert("Rate Limit URL/Email (>3 w bazie)", request_data.email, request_data.url, client_ip)
        return {"status": "error", "message": "Dla tego adresu email lub strony wykorzystano już darmowy limit audytów."}
    RATE_LIMITS.setdefault(client_ip, []).append(now)
    
    lead_id = str(uuid.uuid4())
    
    conn = get_db_connection()
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

@app.post("/api/contact")
async def contact_form(request_data: ContactRequest, request: Request):
    client_ip = request.headers.get("X-Forwarded-For", request.client.host).split(",")[0].strip()
    now = time.time()
    
    # 1. Zabezpieczenie Front-end (Honeypot)
    if request_data.company_fax:
        send_security_alert("Honeypot (Bot - Contact)", request_data.email, "Brak", client_ip)
        return {"status": "success", "message": "Zgłoszenie przyjęte"}
        
    # Walidacja Email
    if not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", request_data.email):
        send_security_alert("Nieprawidłowy Email (Contact)", request_data.email, "Brak", client_ip)
        return {"status": "error", "message": "Podano nieprawidłowy adres e-mail."}
        
    # Rate Limiting per IP (Max 3 na dobę - współdzielone z analyze)
    if client_ip not in RATE_LIMITS:
        RATE_LIMITS[client_ip] = []
    RATE_LIMITS[client_ip] = [t for t in RATE_LIMITS[client_ip] if now - t < 86400]
    
    if len(RATE_LIMITS[client_ip]) >= 3:
        send_security_alert("Rate Limit IP (>3/24h) Contact", request_data.email, "Brak", client_ip)
        return {"status": "error", "message": "Przekroczono dzienny limit zapytań z tego adresu IP."}
    
    RATE_LIMITS[client_ip].append(now)
    
    # Wysłanie wiadomości na skrzynkę z pominięciem AI
    resend.api_key = os.getenv("RESEND_API_KEY")
    if resend.api_key:
        try:
            from_email = os.getenv("CONTACT_FROM", "onboarding@resend.dev")
            to_email = os.getenv("CONTACT_TO", from_email)
            email_body = (
                f"Nowa wiadomość z formularza kontaktowego (klient bez strony WWW):\n\n"
                f"Imię: {request_data.name}\n"
                f"Email: {request_data.email}\n\n"
                f"Wiadomość:\n{request_data.message}"
            )
            resend.Emails.send({
                "from": from_email,
                "to": to_email,
                "subject": "NOWE ZAPYTANIE NUSH (Wiadomość)",
                "text": email_body
            })
        except Exception as e:
            print(f"Błąd wysyłki wiadomości (Resend): {str(e)}")
            
    return {"status": "success", "message": "Wiadomość została pomyślnie wysłana."}

class ApproveRequest(BaseModel):
    draft: str

@app.get("/approve/{lead_id}", response_class=HTMLResponse)
async def get_approval_panel(lead_id: str):
    conn = get_db_connection()
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
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT email, name FROM leads WHERE id = ?", (lead_id,))
    row = cursor.fetchone()
    
    if not row:
        conn.close()
        return {"status": "error", "message": "Nie znaleziono leada"}
        
    client_email, client_name = row
    final_draft = request.draft
    
    resend.api_key = os.getenv("RESEND_API_KEY")
    
    if resend.api_key:
        try:
            from_email = os.getenv("CONTACT_FROM", "onboarding@resend.dev")
            
            resend.Emails.send({
                "from": from_email,
                "to": client_email,
                "subject": "Wstępna diagnoza NUSH",
                "text": final_draft
            })
        except Exception as e:
            print(f"Błąd wysyłki do klienta (Resend): {str(e)}")
    else:
        print(f"Symulacja wysyłki do {client_email}:\n{final_draft}")
        
    # Zmiana statusu w bazie
    cursor.execute("UPDATE leads SET status = 'sent', ai_draft = ? WHERE id = ?", (final_draft, lead_id))
    conn.commit()
    conn.close()
    
    return {"status": "success"}

@app.post("/api/reject/{lead_id}")
async def reject_audit(lead_id: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE leads SET status = 'rejected' WHERE id = ?", (lead_id,))
    conn.commit()
    conn.close()
    return {"status": "success"}

@app.exception_handler(404)
async def custom_404_handler(request, exc):
    if request.url.path.startswith("/api/") or request.url.path.startswith("/approve/") or request.url.path.startswith("/assets/"):
        from fastapi.responses import JSONResponse
        return JSONResponse({"error": "Not found"}, status_code=404)
    response = FileResponse("nush-agency/dist/index.html")
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    return response

@app.get("/")
async def serve_index():
    response = FileResponse("nush-agency/dist/index.html")
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    return response

app.mount("/", StaticFiles(directory="nush-agency/dist", html=True), name="static")
