# Portfolio Frontend

This is the frontend application for the the personal portfolio. It is built with **Next.js + TypeScript** and uses **Tailwind CSS** for styling. It communicates with the backend (Express + Prisma) for dynamic content, authentication, and CMS-like functionality.

---

### Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [Authentication & Authorization](#authentication--authorization)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

### Features

- Public-facing pages:
  - Home / About Me
  - Projects showcase
  - Blog listing & individual blog pages
- Private (owner only) dashboard to:
  - Create / edit / delete blog posts
  - Add / edit projects
- Static site generation (SSG) & ISR (Incremental Static Regeneration) for improved performance
- Responsive UI and good UX
- Error handling, form validation, and user feedback (toasts)

---

### Tech Stack

- React / Next.js
- TypeScript
- Tailwind CSS
- react-hot-toast (for notifications)
- Axios or fetch API (for backend communication)
- NextAuth / custom JWT-based auth (depending on implementation)

---

### Setup & Installation

1. Clone the repo (or inside the monorepo, go into the frontend folder)
```bash
  git clone <repository-url>
  cd B5A7/frontend
```

2.  Install dependencies
```bash
  npm install
  # or
  yarn install
```
3. Create a .env.local file (in the frontend folder) with environment variables (see below)

4. Run the development server

```bash
  npm run dev
  # or
  yarn dev
```

5. Build & start in production mode

```bash
  npm run build
  npm run start
```

### Scripts

| Command             | Description                         |
| ------------------- | ----------------------------------- |
| `dev`               | Runs the Next.js development server |
| `build`             | Builds the app for production       |
| `start`             | Starts the built Next.js app        |
| `lint` / `lint:fix` | Run ESLint (and fix)                |
| `format`            | Format code with Prettier (if used) |

You can add or customize scripts (e.g. test) as needed.

### Environment Variables

In `.env.local` (frontend):

```bash
  NEXT_PUBLIC_API_URL=http://localhost:4000
  NEXT_PUBLIC_JWT_REFRESH_ENDPOINT=/auth/refresh
  # any other public environment variables
```

### Folder Structure (example)

```
/frontend
 ├── components/
 ├── pages/
 │    ├── index.tsx
 │    ├── about.tsx
 │    ├── projects/
 │    └── blogs/
 ├── public/
 ├── styles/
 ├── utils/
 ├── hooks/
 └── ...
```

You can modify this structure to suit your preferences (feature-based, domain-based, etc.).

### Authentication & Authorization

- The frontend interacts with the backend API for login, logout, token refresh, etc.

- Access to private routes (like the dashboard) is protected; only authenticated users can enter.

- If using JWT, tokens are stored (for example in HttpOnly cookies or secure storage) and sent with requests to protected endpoints.

### Deployment

You can deploy the frontend to platforms like Vercel, Netlify, or any static hosting that supports Next.js.
Remember to configure environment variables in production.

Example steps (for Vercel):

1. Push the frontend branch to GitHub

2. Connect to Vercel, select the project

3. Add environment variables (same keys as .env.local)

4. Deploy

### Contributing

- Fork the repository

- Create a feature branch (e.g. feat/blog-crud)

- Write clean, modular code

- Add meaningful commits

- Submit a pull request