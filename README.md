 README.md — Spoolman Search Integration

# Spoolman Search Integration

A modular, theme‑matched search interface for Spoolman that adds:
- Unified search across **filaments** and **spools**
- Color swatches matching Spoolman’s native UI
- Remaining weight display (rounded to whole grams)
- Optional Bambu Spoolman integration
- Sidebar injection without modifying Spoolman source files

This integration is fully container‑safe: all customizations live in the `data/search` directory and are mounted into the container at runtime.
<img width="1564" height="492" alt="Screenshot 2025-12-26 140631" src="https://github.com/user-attachments/assets/a6438330-353a-418e-8d57-f4172d8157f3" />

---

# 📦 Version History

## v1.0.0 — Initial Release
**Release Date:** 2025‑12-26  
**Status:** Stable

### Features
- Adds a custom **Search** page to Spoolman
- Searches filaments and spools simultaneously
- Displays:
  - Filament/spool icons
  - Vendor
  - Material
  - Color swatch + label
  - Remaining weight (whole grams)
- Matches Spoolman’s dark/light theme automatically
- Optional Bambu Spoolman integration via `config.js`
- Sidebar injection via `sidebar-inject.js`
- Redirect helper (`home.html`) for clean routing

### Known Issues
- Color extraction requires `color_hex` to be present in filament data
- Spool color depends on filament color (Spoolman limitation)

---

# 🚀 Installation

## 1. Create the search directory


mkdir -p ./data/search


## 2. Copy required files into `./data/search`

- `search.html`
- `home.html`
- `config.js`
- `sidebar-inject.js`

## 3. Export Spoolman’s main index


docker exec -it spoolman-spoolman-1 cat /home/app/spoolman/client/dist/index.html > ./data/search/main-index.html


## 4. Inject the sidebar script

Add this line **above `</body>`** in `main-index.html`:

`<script src="/search/sidebar-inject.js"></script>`



## 5. Update docker-compose.yml

Add these lines under volumes::

  - ./data/search:/home/app/spoolman/client/dist/search:ro
  - ./data/search/main-index.html:/home/app/spoolman/client/dist/index.html:ro

## 6 Restart Spoolman:

docker compose down
docker compose up -d

# 📄 File Overview

search.html

>The full search UI:

>Fetches filaments + spools

>Displays results with icons, colors, weights

>Links to Bambu Spoolman (optional)

>Matches Spoolman’s theme

home.html

>Redirects /search → /search/search.html.

config.js

>Optional Bambu Spoolman integration:

>window.SPOOLMAN_CUSTOM_CONFIG = {
>    amsUrl: "http://your-bambu-spoolman-url"
>};

>Remove or comment out amsUrl if unused.

sidebar-inject.js

>Injects a Search menu item into Spoolman’s sidebar at runtime.
