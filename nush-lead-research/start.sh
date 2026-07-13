#!/usr/bin/env bash
docker compose up --build -d
until curl -fsS http://localhost:8000/health >/dev/null; do sleep 2; done
xdg-open http://localhost:8000 2>/dev/null || open http://localhost:8000
