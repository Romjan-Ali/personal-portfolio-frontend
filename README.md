# 📁 B5A7 — Portfolio Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  

[Live Demo](romjan-ali.vercel.app/)

## 🧭 Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Architecture & Folder Structure](#architecture--folder-structure)  
- [Installation & Running Locally](#installation--running-locally)  
- [Environment Variables](#environment-variables)  
- [Deployment](#deployment)  
- [Future Improvements](#future-improvements)  

---

## 📖 Project Overview

This is the **frontend** portion of the B5A7 portfolio project. It’s a modern, responsive web application built with Next.js (App Router), TypeScript, Tailwind CSS, and integrates with a backend API.

The frontend supports:

- Public pages: Home, Blog list, Single blog posts, About Me, Projects showcase  
- Admin dashboard & content management (blogs, projects, etc.)  
- Rich text editing for blog content  
- Public pages are optimized for SEO using SSG / ISR  
- Private pages (admin) are protected, only accessible to authenticated users  

---

## ✨ Features

- Static generation (SSG) for static content (About section, etc.)  
- Incremental Static Regeneration (ISR) for dynamic pages (blogs, projects)  
- Rich text editor for blog content creation  
- Authentication & authorization for admin routes  
- Responsive design  
- Dark mode support  
- Form validation & UX feedback (errors, loading states)  
- SEO & meta tags configured per page  

---

## 🛠 Tech Stack

| Layer         | Technologies |
|----------------|------------------------------|
| Framework       | Next.js (App Router) |
| Language        | TypeScript |
| Styling         | Tailwind CSS |
| API Client      | `fetch` / custom wrappers |
| Rich Text Editor| TipTap (with StarterKit, underline, alignment, etc.) |
| Icons           | Lucide Icons |
| Authentication  | next-auth (or JWT) |
| Validation       | Zod |
| Notifications    | Sonner |

---

## 🏗 Architecture & Folder Structure

Here’s an example of how the project is structured:

```
app/
├─ blog/
│ ├ page.tsx
│ └ [slug]/page.tsx
├─ admin/
│ ├ blogs/
│ │ └ create/page.tsx
│ └ dashboard/page.tsx
├─ about/
│ └ page.tsx
├─ projects/
│ └ page.tsx
└ layout.tsx
components/
├─ sections/
│ ├ AboutSection.tsx
│ ├ ProjectsSection.tsx
│ └ SkillsSection.tsx
├─ blog/
│ └ RichTextEditor.tsx
└ ui/
lib/
├─ blog-data.ts
├─ project-data.ts
└ validation/
public/
└ assets, images
```


**Key ideas:**

- Pages are **server components** by default; fetch data with ISR or static fetch.  
- Use **client components** only when you need interactivity (e.g. RichTextEditor, buttons).  
- Shared UI components (buttons, cards, etc.) live in `components/ui`.

---

## 🧰 Installation & Running Locally

1. Clone the repo  
```bash
   git clone https://github.com/Apollo-Level2-Web-Dev/B5A7.git
   cd B5A7
```
2. Install dependencies
```bash
  npm install
  # or
  yarn install
```
3. Set up environment variables (see next section)

4. Run the dev server

```bash
  npm run dev
  # or
  yarn dev
```

5. Visit http://localhost:3000

---

## 🔐 Environment Variables

Create a .env.local file in the root and add keys like:

```bash
  NEXT_PUBLIC_API_URL=https://api.yourdomain.com
  NEXTAUTH_URL=http://localhost:3000
  NEXTAUTH_SECRET=your-secret
```

---

## 🚀 Deployment

You can deploy this frontend to any platform that supports Next.js (Vercel, Netlify, etc.).

For example, using Vercel:

1. Push your code to GitHub

2. Import the repository in Vercel

3. Set environment variables in Vercel dashboard

4. Choose “Next.js” and deploy

Vercel will handle static builds + revalidation automatically.

---

## 🛠 Future Improvements

- Add image upload support (for blog thumbnails or images in content)

- More rich editor features: tables, media embeds, inline code, syntax highlighting

- Real-time previews / collaborative editing

- Search & filtering on blog list (full text search)

- Pagination & infinite scroll for blogs

- Analytics, comments, or social sharing integration