<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:f97316,100:ea580c&height=180&section=header&text=HomeHero&fontSize=50&fontColor=ffffff&animation=fadeIn&desc=Service-Based%20Web%20Platform%20(Full-Stack)&descSize=18&descAlignY=70" />
</p>

<h1 align="center">HomeHero — Service-Based Web Platform (Full-Stack)</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Firebase-12.5.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=black"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind-4.1.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
</p>

<p align="center">
  <em>Connect with trusted local professionals for cleaning, plumbing, electrical, and more!</em>
</p>

---

## 🔗 Live Links

<p align="center">
  <a href="https://homehero-org.netlify.app" target="_blank">
    <img src="https://img.shields.io/badge/🌐%20Live%20Site-Visit%20Now-brightgreen?style=for-the-badge"/>
  </a>
  <a href="https://github.com/mbmugdho/homehero-client" target="_blank">
    <img src="https://img.shields.io/badge/💻%20Client%20Repo-GitHub-blue?style=for-the-badge"/>
  </a>
  <a href="https://github.com/mbmugdho/homehero-server" target="_blank">
    <img src="https://img.shields.io/badge/🖥️%20Server%20Repo-GitHub-orange?style=for-the-badge"/>
  </a>
</p>

| Link Type | URL |
|-----------|-----|
| 🌐 **Live Site** | [https://homehero-org.netlify.app](https://homehero-org.netlify.app) |
| 💻 **Client Repo** | [GitHub Link](https://github.com/mbmugdho/homehero-client) |
| 🖥️ **Server Repo** | [GitHub Link](https://github.com/mbmugdho/homehero-server) |

---

## 📋 Project Overview

**HomeHero** is a full-stack **Local Household Service Finder** platform that connects homeowners with trusted local professionals for various home services.

### 🎯 What It Solves

| Problem | Solution |
|---------|----------|
| Hard to find reliable local pros | Browse verified service providers |
| No transparent pricing | View prices upfront before booking |
| Complex booking process | Simple modal-based booking flow |
| Can't manage bookings | Track and cancel bookings easily |
| Providers lack visibility | Providers can list and manage services |

### 🏡 Services Available

| Category | Examples |
|----------|----------|
| 🧹 **Cleaning** | House cleaning, deep cleaning, carpet cleaning |
| 🔧 **Plumbing** | Pipe repair, fixture installation, drain cleaning |
| ⚡ **Electrical** | Wiring, outlet repair, light installation |
| 🔨 **Handyman** | Furniture assembly, minor repairs |
| 🌿 **Gardening** | Lawn care, landscaping, tree trimming |

---

## 🛠️ Technologies Used

<div align="center">

### Frontend
<p>
  <img src="https://skillicons.dev/icons?i=react,vite,tailwind,firebase" alt="Frontend"/>
</p>

### Backend
<p>
  <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb" alt="Backend"/>
</p>

### Deployment
<p>
  <img src="https://skillicons.dev/icons?i=netlify,vercel" alt="Deployment"/>
</p>

</div>

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React, Vite, Tailwind CSS, Framer Motion |
| **Authentication** | Firebase (Email/Password + Google) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **Deployment** | Netlify (Client), Vercel (Server) |

---

## ✨ Core Features

### 🔐 Authentication

| Feature | Description |
|---------|-------------|
| ✅ Email/Password Login | Secure credential-based authentication |
| ✅ Google Login | One-click social authentication |
| ✅ Private Routes | Protected pages persist on reload |
| ✅ Role Management | User & Provider roles |

### 📅 Booking System

| Feature | Description |
|---------|-------------|
| ✅ Modal Preview | View service details before booking |
| ✅ Date/Time Selection | Choose preferred appointment slot |
| ✅ Price Display | Transparent pricing shown upfront |
| ✅ My Bookings | View all your bookings in a table |
| ✅ Cancel Booking | Delete bookings with confirmation |

### 🛠️ Provider CRUD Operations

| Action | Description |
|--------|-------------|
| ➕ **Add Service** | Private route for providers to list services |
| 📋 **My Services** | View all services you've created |
| ✏️ **Edit Service** | Update service details (PATCH) |
| 🗑️ **Delete Service** | Remove service with ownership check |

### 🔍 Search, Filter & Sort

| Feature | Description |
|---------|-------------|
| 🔎 **Search** | Find services by keyword |
| 🏷️ **Category Chips** | Filter by service category |
| 💰 **Price Range** | Min/max price filtering |
| ⭐ **Sort by Rating** | Highest rated first |
| 💵 **Sort by Price** | Low to high or high to low |

### 🎨 UI/UX Features

| Feature | Description |
|---------|-------------|
| 📱 **Responsive Design** | Mobile, tablet & desktop layouts |
| ✨ **Framer Motion** | Smooth page transitions & animations |
| 🌙 **Theme Toggle** | Light/Dark cosmic background |
| 🎯 **Cosmic Design** | Unique cosmic-themed buttons & cards |
| 🔔 **SweetAlert2** | Beautiful confirmation dialogs |

---

## 📦 Dependencies

### Client-Side

```json
{
  "dependencies": {
    "@tailwindcss/vite": "^4.1.17",
    "firebase": "^12.5.0",
    "framer-motion": "^12.23.24",
    "lucide": "^0.553.0",
    "lucide-react": "^0.553.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-fast-marquee": "^1.6.5",
    "react-helmet": "^6.1.0",
    "react-icons": "^5.5.0",
    "react-router": "^7.9.5",
    "react-router-dom": "^7.9.5",
    "sweetalert2": "^11.26.3",
    "swiper": "^12.0.3",
    "tailwindcss": "^4.1.17"
  }
}
