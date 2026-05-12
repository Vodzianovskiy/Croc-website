# 🐊 CR0C Clan Portal

**CR0C Clan Portal** is a website for the European **World of Tanks** clan **CR0C**. The portal provides complete information about the clan, its members, vehicles, mods, and allows players to submit join requests via Discord.

---

## 🚀 Features

### 📊 Clan Statistics

- **Clan Search** — search by tag or name via the Wargaming API
- **Detailed Clan Page** — clan info, ratings (GM ELO, FB ELO), member list with pagination, stronghold data
- **Recent Searches** — stores the last 5 viewed clans in localStorage

### 🎮 Clan Vehicles

- **Tank List** — all Tier X vehicles the clan plays
- **Detailed View** — modal window with three tabs:
  - **Equipment** — additional equipment
  - **Consumables** — nation-specific provisions
  - **Skills** — crew perks (6 perks per role: commander, gunner, driver, loader, radio operator)

### 🛠 Mods

- **Modpack List** — PROTanki EU, LeBwa Team with ratings and download links
- **Modal Window** — detailed mod description with install buttons (via intercepting routes)
- **Mods Preview** — quick mod overview modal on the homepage

### 📝 Joining the Clan

- **Application Form** — search player by nickname, check stats (winrate ≥ 48%, battles ≥ 2500)
- **Vehicle Selection** — mark Tier X and Tier VIII tanks the player owns
- **Discord Submission** — application is sent to a Discord channel via webhook, with a limit of 3 applications per day per IP

### 🎨 3D Animation

- **Interactive Crocodile** — 3D model on the main page with animations (walking, running, dancing, waking up), responsive to screen resolution

### ℹ️ Clan Info Cards

- **Interactive Feature Cards** — clickable cards on the homepage (Maneuvers & GM, Tournaments, Discord chat, Helping each other, Play 3 times a week, European clan) with detailed modal descriptions

### 🗺 Navigation & UX

- **Responsive Header** — navigation with active link highlighting, Discord button, and mobile burger menu with keyboard (Escape) support
- **Footer** — quick navigation links and Discord invite
- **Custom 404 Page** — glitch-style not-found page with 3-second countdown auto-redirect to homepage

---

## 🧱 Tech Stack

| Technology                                                    | Purpose                                   |
| ------------------------------------------------------------- | ----------------------------------------- |
| **Next.js 16** (App Router)                                   | Framework, server-side rendering, routing |
| **React 19**                                                  | UI library                                |
| **TypeScript**                                                | Type safety                               |
| **Three.js** + **@react-three/fiber** + **@react-three/drei** | 3D graphics (crocodile model)             |
| **@react-three/postprocessing** + **postprocessing**          | Post-processing effects for 3D            |
| **Axios**                                                     | HTTP requests to Wargaming API            |
| **Formik** + **Yup**                                          | Forms and validation (clan application)   |
| **react-paginate**                                            | Player list pagination                    |
| **react-icons**                                               | Icons (Discord, etc.)                     |
| **CSS Modules**                                               | Component styling                         |

---

## 🏗 Architecture

```
croc-website/
├── app/                    # Next.js App Router
│   ├── api/                # API routes (proxy to WG API, Discord webhook, skill icons)
│   ├── clan/               # Clan search + detailed clan page
│   │   └── [id]/           # Dynamic clan detail page (info, rating, members, stronghold)
│   ├── mods/               # Mods page
│   │   └── [id]/           # Redirects to /mods
│   ├── mods-preview/       # Redirect to /mods
│   ├── tanks/              # Clan vehicles with modals
│   │   └── TankModal/      # Tank detail modal (Equipment, Consumables, Skills tabs)
│   ├── @modal/             # Parallel route for intercepting modals
│   │   ├── (.)mods/        # Intercepted mod detail modal
│   │   └── (.)mods-preview/# Intercepted mods preview modal
│   ├── not-found.tsx       # Custom 404 page with auto-redirect
│   └── page.tsx            # Main page (hero, about, tanks preview, clan stats cards)
├── components/             # Reusable components
│   ├── Header/             # Header with navigation, Discord link, mobile burger menu
│   ├── Footer/             # Footer with navigation and Discord invite
│   ├── HeroCroc/           # 3D scene with crocodile
│   ├── JoinUs/             # Clan join form (modal with player search, stats check, tank selection)
│   ├── ClanStatsClick/     # Interactive feature cards on homepage
│   └── ClanStatsModal/     # Modal for feature card details
├── config/                 # Configuration files
│   ├── links.ts            # Centralized links (Discord, etc.)
│   ├── crewBuilds.ts       # Crew perk builds for each tank
│   ├── mods.ts             # Mod list
│   ├── tankEquipment.ts    # Tank equipment and consumables
│   └── clanStatsContent.ts # Content for homepage feature cards
├── services/               # API services
│   ├── clanService.ts      # Wargaming API (clans, ratings, stronghold, tanks, provisions, skills)
│   └── wotService.ts       # Wargaming API (players, stats, tanks)
├── types/                  # TypeScript types
│   ├── clan.ts             # Clan types
│   ├── wot.ts              # WoT API types
│   ├── mod.ts              # Mod types
│   └── crewBuild.ts        # Crew build types
└── public/                 # Static files
    ├── croc.jpg            # OG image
    └── croc_Animations.glb # 3D crocodile model
```

---

## 🔌 API Endpoints

| Endpoint                        | Description                             |
| ------------------------------- | --------------------------------------- |
| `GET /api/wot?endpoint=...`     | Proxy to Wargaming API (hides APP_ID)   |
| `POST /api/discord`             | Send application to Discord via webhook |
| `GET /api/skill-icon?skill=...` | Proxy for skill icons                   |

---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root:

```env
WOT_APP_ID=your_wargaming_app_id
DISCORD_WEBHOOK_URL=your_discord_webhook_url
```

---

## 🛠 Getting Started

```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Production build
npm run build

# Start production server
npm start
```

---

## 📄 License

All rights reserved. CR0C Clan © 2026.
