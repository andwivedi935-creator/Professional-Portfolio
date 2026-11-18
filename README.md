# Anirudha Narayan Dwivedi — Engineering Portfolio

A clean, responsive digital portfolio website built using **HTML5**, **CSS3**, and **Vanilla JavaScript** for **Anirudha Narayan Dwivedi**, B.Tech Electronics and Communication Engineering (ECE Core) student at Lovely Professional University.

---

## Project Overview

This portfolio presents academic foundations, projects, hackathon achievements, leadership engagement, professional networking, references, career direction, and student declaration in an accessible, print-ready layout with zero framework or backend dependencies.

---

## File Structure

```text
.
├── index.html          # Semantic HTML5 portfolio document
├── style.css           # Pure CSS3 styling, responsive grids, and @media print rules
├── script.js           # Vanilla JavaScript for navigation, modal, filters, and print
├── assets/
│   ├── profile.jpg     # (Add your portrait photograph here)
│   └── README.txt      # Instructions for adding your portrait photograph
├── public/
│   └── assets/
│       └── aistudio/   # Hackathon certificate image asset
└── README.md           # Documentation & GitHub Pages deployment guide
```

---

## How to Run Locally

Because this website uses pure HTML5, CSS3, and Vanilla JavaScript without any build step or backend:

1. **Add your photograph (optional):**
   Place your portrait photo at `assets/profile.jpg`. Until added, the portfolio automatically displays a monogram placeholder.
2. **Open directly in a browser:**
   Double-click `index.html` to open it in Chrome, Firefox, Edge, or Safari.
3. **Or run a local static server (recommended):**
   ```bash
   python3 -m http.server 8080
   ```
   Then visit `http://localhost:8080` in your browser.

---

## How to Publish Through GitHub Pages

1. Create a new public repository on GitHub (for example, `portfolio` or `<your-username>.github.io`).
2. Upload or push `index.html`, `style.css`, `script.js`, `README.md`, `assets/`, and `public/` to the `main` branch:
   ```bash
   git init
   git add index.html style.css script.js README.md assets public
   git commit -m "Initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/andwivedi935-creator/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub, open **Settings → Pages**.
4. Under **Build and deployment → Source**, select **Deploy from a branch**.
5. Choose branch **`main`** and folder **`/ (root)`**, then click **Save**.
6. Wait 1–2 minutes for GitHub Pages to publish your live site URL.

---

## How to Publish Through Vercel (via Git)

This repository includes a `vercel.json` file configured to serve the static `index.html`, `style.css`, and `script.js` files directly without running `npm install` or a framework build step:

1. Push your repository (including `vercel.json`) to GitHub.
2. Import the repository in **Vercel → Add New → Project**.
3. If you previously imported the project before `vercel.json` was added, go to **Project Settings → Build and Deployment**, set **Framework Preset** to **Other**, clear any manual overrides on **Build Command**, **Install Command**, and **Output Directory**, and click **Redeploy**.

---

## Print / Save as PDF

Click **Print Portfolio** in the header or footer to open the browser print dialog. Dedicated `@media print` rules automatically hide navigation bars and action buttons, remove animations, apply clean white backgrounds, and keep portfolio cards intact across page breaks.
