import os
import sqlite3
import uuid
import smtplib
from email.message import EmailMessage
from fastapi import FastAPI, BackgroundTasks
from fastapi.responses import FileResponse, HTMLResponse
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
        <textarea id="draft-text">{ai_draft or ''}</textarea>
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
    cursor.execute("SELECT email FROM leads WHERE id = ?", (lead_id,))
    row = cursor.fetchone()
    
    if not row:
        conn.close()
        return {"status": "error", "message": "Nie znaleziono leada"}
        
    client_email = row[0]
    final_draft = request.draft
    
    # 2. Wysyłka maila do klienta
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")
    smtp_server = os.getenv("SMTP_SERVER")
    
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
    
    import os
    if os.path.exists("nush-agency/dist/index.html"):
        return FileResponse("nush-agency/dist/index.html")
    return FileResponse("index.html")

import os
dist_dir = "nush-agency/dist" if os.path.exists("nush-agency/dist") else "."
app.mount("/", StaticFiles(directory=dist_dir, html=True), name="static")
