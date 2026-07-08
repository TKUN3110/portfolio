# 🌸 Tejas Salunke - Sumi-e Aesthetic Developer Portfolio

A premium, highly interactive, and responsive developer portfolio website themed with a traditional Japanese **Sumi-e (ink wash painting)** and **Sakura** aesthetic. Built with Next.js 14, React, TypeScript, and Framer Motion.

---

## 🎨 Design & Aesthetic Features

- **Sumi-e (墨絵) Canvas Effects:** Clean parchment textures, charcoal-drawn lines, and calligraphy-inspired animations.
- **Interactive Page Intro (`InkStrokeIntro`):** A custom calligraphy ink-stroke transition on initial page load.
- **Sakura Petal Simulation (`SakuraPetals`):** A physics-based HTML5 canvas particle system simulating falling cherry blossom petals.
- **Unrolling Scrolls (`ProjectCard`):** Interactive project cards designed as scroll containers that unroll dynamically as you scroll them into view.
- **Blooming Timeline (`TimelineItem`):** Chronological milestone timeline decorated with custom SVG blooming Sakura blossoms.
- **Interactive Mouse Glow (`MouseGlow`):** Subtly renders a faint calligraphic ink aura that follows the user's cursor.
- **Music Player:** Ambient musical backdrop widget integrated with calligraphic Hanko seals.

---

## 🛠️ Frameworks & Tech Stack

- **Core Framework:** Next.js 14 (App Router)
- **Frontend Library:** React 18
- **Language:** TypeScript
- **Animations:** Framer Motion (v11)
- **Icons:** Lucide React
- **Styling:** Vanilla CSS Variables & Custom Theme Modules (supporting parchment base, charcoal main, crimson accents, and sakura pink)

---

## 📂 Project Structure

```text
├── app/                  # Next.js App Router (Layout & Entry Page)
├── components/           # UI & Interactive Components
│   ├── about/            # About me section cards
│   ├── contact/          # Interactive contact forms
│   ├── effects/          # Canvas falling petals, Mouse glow, Ink stroke load
│   ├── hero/             # Landing hero banners and Fuji mountain silhouettes
│   ├── layout/           # Navbar, Footer, Ambient music player
│   ├── projects/         # Unrolling scroll cards for featured works
│   ├── timeline/         # Chronological milestones & blooming SVG flowers
│   └── ui/               # Reusable UI blocks (PaperCard, SumiTooltip, Lantern, etc.)
├── data/                 # Centralized Configuration & Content
│   ├── config.ts         # Master profile, socials, keywords, and Kanji translations
│   ├── projects.ts       # Structured portfolio project details
│   ├── skills.ts         # Level-ranked technical skill categories & icons
│   └── timeline.ts       # Education & work history items
├── public/               # Static assets (images, PDF resume)
├── styles/               # CSS global settings, color palettes & styles
└── tsconfig.json         # TypeScript configuration
```

---

## ⚙️ Configuration & Content Customization

The entire site is configured using structured data files. No content is hardcoded into components:

1. **Personal info & Socials:** Edit [data/config.ts](file:///c:/Users/tejas/Desktop/Coding/portfolio/data/config.ts)
2. **Projects list:** Edit [data/projects.ts](file:///c:/Users/tejas/Desktop/Coding/portfolio/data/projects.ts)
3. **Technical Skills:** Edit [data/skills.ts](file:///c:/Users/tejas/Desktop/Coding/portfolio/data/skills.ts)
4. **Experience & Education Timeline:** Edit [data/timeline.ts](file:///c:/Users/tejas/Desktop/Coding/portfolio/data/timeline.ts)

---

## 🚀 Getting Started

To run the portfolio website locally on your computer, follow these commands:

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the live page.

### 3. Production Build
To build and check for compilation errors:
```bash
npm run build
npm start
```
