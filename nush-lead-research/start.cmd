@echo off
docker compose up --build -d
for /L %%i in (1,1,30) do (curl -fsS http://localhost:8000/health >nul 2>&1 && start http://localhost:8000 && echo Dane: .\data && exit /b 0 || timeout /t 2 >nul)
echo Aplikacja nie odpowiedziala. Uruchom: docker compose logs -f
