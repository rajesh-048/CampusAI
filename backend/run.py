import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

site_pkgs = os.path.abspath(os.path.join(os.path.dirname(__file__), "site-packages"))
if site_pkgs not in sys.path:
    sys.path.insert(0, site_pkgs)
sys.path.insert(0, os.path.abspath("."))

from app.main import app
import uvicorn

if __name__ == "__main__":
    print("[CampusAI] AI Microservice starting on http://localhost:8000 ...", flush=True)
    uvicorn.run(app, host="0.0.0.0", port=8000)
