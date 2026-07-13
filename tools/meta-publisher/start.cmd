@echo off
docker compose up --build -d
for /L %%i in (1,1,30) do (curl -fsS http://localhost:8000/health >nul 2>&1 && start http://localhost:8000 && exit /b 0 || timeout /t 2 >nul)
echo Panel nie odpowiedzial. Sprawdz: docker compose logs -f
