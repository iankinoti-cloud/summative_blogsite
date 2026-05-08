 IAN Creative - Developer Portfolio

> **Built by Ian Kinoti** · [github.com/iankinoti-cloud](https://github.com/iankinoti-cloud)

A fully personalised, full-stack developer portfolio and project showcase - built from scratch with React, Vite, and a JSON REST API.

---

## Live Preview

| | Link |
|---|---|
| **This Portfolio (LIVE)** | [summativeblogsite.vercel.app](https://summativeblogsite.vercel.app) |
| My Portfolio | [my-portfolio-8fdc.vercel.app](https://my-portfolio-8fdc-peuzq8829-iankinoti-clouds-projects.vercel.app/) |
| Varsity Introduction 2026 | [varsityintroduction2026.vercel.app](https://varsityintroduction2026.vercel.app) |

---

## Features

-  **Live search** - filter projects by name or tech stack in real time
-  **Full CRUD** - add, view, and delete projects via a REST API
-  **Project detail pages** - each project has its own dedicated page with links, tech stack, and actions
-  **Fully responsive** - works clean on mobile, tablet, and desktop
-  **Dark theme** - easy on the eyes, professional by design
-  **Fast** - powered by Vite with hot module replacement during development
-  **GitHub integration** - direct links to every repo and profile

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6 |
| Styling | CSS Modules (no UI library — custom everything) |
| Build Tool | Vite |
| Backend / API | JSON Server (REST API on `db.json`) |
| Linting | ESLint |
| Deployment | Vercel / GitHub |

---

## Project Structure

```
summative_blogsite/
├── public/
│   └── ian-creative.jpg       # Personal brand image
├── src/
│   ├── components/
│   │   ├── Navbar/            # Sticky nav with GitHub link
│   │   ├── Footer/            # Footer with copyright + GitHub
│   │   ├── ProjectCard/       # Card with image, tags, hover effects
│   │   ├── ProjectList/       # Responsive project grid
│   │   ├── ProjectDetail/     # Full project detail view
│   │   └── AddProjectForm/    # Controlled form to add projects
│   ├── hooks/
│   │   └── useProjects.js     # Custom hook — all API logic lives here
│   ├── pages/
│   │   ├── HomePage.jsx       # Hero + search + project grid
│   │   ├── AddProjectPage.jsx # Add new project page
│   │   └── ProjectDetailPage.jsx
│   └── styles/
│       └── global.css         # CSS variables, resets, design tokens
├── db.json                    # Project data (served by JSON Server)
└── index.html
```

---

##  Running Locally

You need **two terminals** - one for the React app, one for the API:

**1. Clone the repo**
```bash
git clone https://github.com/iankinoti-cloud/summative_blogsite.git
cd summative_blogsite
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the JSON Server (API — port 3001)**
```bash
npx json-server --watch db.json --port 3001
```

**4. Start the React dev server (port 5173)**
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

##  Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

##  Projects Showcased

| Project | Tech | GitHub |
|---|---|---|
| Varsity Introduction 2026 | JavaScript, HTML, CSS | [repo](https://github.com/iankinoti-cloud/varsityintroduction2026) |
| Wordly — SPA Word Game | JavaScript, HTML, CSS | [repo](https://github.com/iankinoti-cloud/singlepageapplicationwordly) |
| Color Clock | CSS, JavaScript, HTML | [repo](https://github.com/iankinoti-cloud/color-clock) |
| Shop Ease Catalog | JavaScript, HTML, CSS, REST API | [repo](https://github.com/iankinoti-cloud/shop-ease-catalog) |
| My Portfolio | TypeScript, React, CSS Modules | [repo](https://github.com/iankinoti-cloud/my_portfolio) |
| Voting Poll App | JavaScript, HTML, CSS | [repo](https://github.com/iankinoti-cloud/voting_poll_app) |
| Ian Blog Site | TypeScript, React, CSS Modules | [repo](https://github.com/iankinoti-cloud/ian_blog_site) | [live](https://ian-blog-site.vercel.app) |
| Dynamic Product Dashboard | JavaScript, HTML, CSS, REST API | [repo](https://github.com/iankinoti-cloud/Dynamic_product_dashboard) |

---

##  Author

**Ian Kinoti**
- GitHub: [@iankinoti-cloud](https://github.com/iankinoti-cloud)
- Built in Nairobi, Kenya 🇰🇪

---

## Licence

This project is open source. Feel free to study it, fork it, and build something greater.

> *"Let's Make Kenya's Tech space great.[Ancora imparo]"* — Ian Kinoti
