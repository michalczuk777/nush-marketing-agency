@echo off
if not exist backups mkdir backups
for /f "tokens=1-4 delims=/:. " %%a in ("%date% %time%") do copy data\nush_leads.db backups\nush_leads_%%d-%%b-%%c_%%a-%%e-%%f.db
