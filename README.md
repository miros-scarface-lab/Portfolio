# 📜 Vintage 2D CSE Developer Portfolio & Station Master Console

> **A tactile, vintage 2D mechanical-aesthetic portfolio, personal cloud archive, and acoustic jukebox designed for Computer Science & Engineering students and software engineers.**  
> *Crafted with precision • Made on Scarface Lab*

---

## 🌟 Key Highlights

- **Vintage 2D Aesthetic & Dynamic Atmosphere**:
  - Tactile parchment paper textures, mechanical stamp badges, typewriter click audio FX, and retro ticker-tape marquees.
  - Interactive weather simulation: gentle and blizzard snowfall particle effects.
  - CRT green phosphor, blueprint cyan, amber gas discharge, and vintage parchment color themes with optional CRT scanlines.

- **Acoustic Jukebox (Genshin Impact Style BGM)**:
  - Atmospheric acoustic soundtrack deck with audio visualizer, playlist catalog, interactive track picker, volume controls, and track looping.

- **Encrypted Personal Directory & Cloud Filesystem**:
  - Password-protected vault modal (`default: 1234`) organizing cloud files and resources hosted on Google Drive, GitHub, and remote storage into an interactive filesystem view.

- **Private Station Master Admin Desk**:
  - Hidden URL-only admin console (`/admin.html` or `/admin`) secured with PIN authentication (`admin123`).
  - Live CRUD controls: profile details, profile picture & background image uploader, projects, competencies, coursework, soundtrack tracks, personal directory files, and contact dispatch messages.

- **Fast & Lightweight Architecture**:
  - Pure Vanilla JavaScript, HTML5, and CSS with zero heavy UI framework overhead.
  - Node.js & Express REST API backend with file-backed JSON persistence (`data/portfolio.json` & `data/messages.json`).

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or newer)
- [npm](https://www.npmjs.com/)

### Installation & Launch

```bash
# Clone the repository
git clone https://github.com/miros-scarface-lab/Portfolio.git

# Enter the project directory
cd Portfolio

# Install backend dependencies
npm install

# Start the server
npm start
```

Visit the portfolio in your browser at:
```
http://localhost:3000
```

---

## 🔐 Administrative Access

The Admin Desk is intentionally concealed from public navigation and can only be accessed via direct URL:

- **URL**: `http://localhost:3000/admin.html` (or `http://localhost:3000/admin`)
- **Default PIN**: `admin123`

---

## 📁 Project Architecture

```
pORTFILO/
├── assets/
│   ├── audio/          # Acoustic BGM tracks & sound effects
│   ├── images/         # Vintage illustrations, backgrounds, and avatars
│   └── uploads/        # Uploaded custom backgrounds & portraits
├── data/
│   ├── portfolio.json  # Primary database (Profile, Projects, Skills, Directory, etc.)
│   └── messages.json   # Dispatch inquiries inbox
├── about.html          # Station Master biography & systems engineering backstory
├── academics.html      # Coursework, academic timeline & publications
├── admin.html          # Authenticated Station Master management console
├── admin.js            # Admin console controller & live synchronization
├── contact.html        # Pneumatic dispatch terminal & contact form
├── experience.html     # Work history, research appointments & internships
├── index.html          # Main hub, hero, floating props, jukebox & directory
├── projects.html       # Systems, compilers, algorithms & web showcases
├── script.js           # Core client-side interactions, audio, themes & snow
├── server.js           # Express API server for CRUD & static serving
├── skills.html         # Technical competencies & skill radar
├── style.css           # Custom vintage design system & typography
└── terminal.html       # Interactive CLI emulator for terminal enthusiasts
```

---

## 🛠️ Built With

- **Frontend**: Vanilla HTML5, CSS3 Variables, ES6+ JavaScript, Web Audio API, Canvas 2D
- **Backend**: Node.js, Express.js
- **Fonts**: Playfair Display, Courier Prime, JetBrains Mono, Space Grotesk
- **Data Store**: Structured JSON with atomic write mechanisms

---

## 📜 License

Created by **Mir A K Sajid** (Scarface Lab). All rights reserved.
