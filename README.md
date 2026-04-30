# Landing Box

An experimental 3D z-depth scroll experience. A manifesto on creating with taste, presented through a punk-aesthetic wireframe tunnel.

![Landing Box Preview](public/og-image.png)

## ✨ Experience

Scroll through a 3D wireframe box as text and shapes fly past at parallax speeds. The journey explores the philosophy of developing taste in creative work, inspired by [Emil Kowalski's "Developing Taste"](https://emilkowal.ski/ui/developing-taste).

**Key features:**
- 🎨 3D perspective wireframe room rendered with Canvas
- 📜 Z-depth scrolling with GSAP ScrollTrigger
- 💫 Parallax collage elements at various depths
- 🌈 Color progression from muted to bold neon
- ✨ Neon-glow text underlines
- 🌅 Emergence into light at the end

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 Tech Stack

- **Framework:** React + TypeScript + Vite
- **Animation:** GSAP + ScrollTrigger
- **3D Effects:** Canvas 2D API + CSS 3D transforms
- **Typography:** Clash Display + Geist Sans

## 📁 Project Structure

```
src/
├── components/
│   ├── Scene/         # 3D wireframe box, camera system
│   ├── Zones/         # Text clearings, emergence
│   ├── Collage/       # Parallax floating elements
│   └── UI/            # Scroll hints, overlays
├── hooks/             # Scroll depth, parallax, color
├── systems/           # Parallax engine, color interpolation
├── data/              # Zone definitions, text content
└── types/             # TypeScript interfaces
```

## 🎨 Design Philosophy

This project follows the principles from "Developing Taste":

> "In a world of scarcity, we treasure tools. In a world of abundance, we treasure taste." — Anu Atluru

- **Trained instinct over personal preference**
- **Study excellence, think critically**
- **Create relentlessly, even when it falls short**
- **The gap proves you're growing**

## 🌐 Inspiration

- [Subverting The Borders](https://www.uabb.hk/) - UABB 2017 poster design
- [Emil Kowalski's "Developing Taste"](https://emilkowal.ski/ui/developing-taste)
- Parallax experiences: [The Goonies](https://the-goonies.webflow.io/), [Jomor Design](https://www.jomor.design/)

## 📱 Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (touch scroll supported)

## 🤝 Contributing

This is a personal experiment, but feel free to fork and create your own version!

## ☕ Support

If you enjoyed this experience:

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ff5e5b?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/shiaradesign)

---

**an experiment by [Shiara](https://ko-fi.com/shiaradesign)**
