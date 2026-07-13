@echo off
echo UWAGA: usuniesz lokalna baze danych. Eksporty i importy zostana.
set /p confirm=Wpisz RESET aby kontynuowac: 
if /I "%confirm%"=="RESET" del data\nush_leads.db data\nush_leads.db-shm data\nush_leads.db-wal
