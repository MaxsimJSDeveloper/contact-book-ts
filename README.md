# 📱 Contact Book Application (Full-Stack)

A robust, full-stack contact management application built with **React**, **TypeScript**, **Redux Toolkit**, **Node.js**, **Express**, and **MongoDB Atlas**. The project implements clean architecture principles, server-side data processing, strict type safety, and an adaptive responsive UI.

---

## ✨ Key Features

* **🔐 Authentication System:** Secure user registration and login forms with custom field validation (`Formik` + `Yup`) and reusable password visibility toggle components.
* **⚡ Adaptive Server-Side Pagination:** Server-calculated pagination that dynamically adjusts per-page item limits based on screen size (9 items for Desktop, 6 for Tablet, 3 for Mobile) with debounced window resize handling to prevent layout shifts.
* **🔍 Live Debounced Search:** Instant search across contacts by name or phone number using MongoDB `$regex` pattern matching and debounced Redux state dispatching.
* **🎛️ Advanced Filtering & Sorting:** Dynamic query-based filtering by contact type (`home` / `personal`) and favorite status (`isFavorite`), combined with multi-directional sorting (A-Z, Z-A, Newest, Oldest).
* **🔄 Full Real-time Sync CRUD:** Create, Read, Update, and Delete operations synced directly with MongoDB Atlas with optimistic UX feedback and toast notifications (`react-hot-toast`).
* **📱 Fully Responsive UI:** Tailored layout powered by **Tailwind CSS**, sticky sidebars for desktop, and drawer/modal overlays for mobile screens.

---

## 🛠️ Tech Stack

### **Frontend**
* **Core:** React 18, TypeScript, Vite
* **State Management:** Redux Toolkit, Async Thunks
* **Routing & Forms:** React Router v6, Formik, Yup
* **Styling & UI:** Tailwind CSS, Lucide React (Icons), React Hot Toast, React Helmet Async

### **Backend**
* **Runtime & Framework:** Node.js, Express.js
* **Database & ORM:** MongoDB Atlas, Mongoose
* **Middleware & Tools:** CORS, Express JSON Parser, Multer, Joi Validation

---

## 🏗️ Architecture & Engineering Highlights

1. **Single Source of Truth (Redux Thunks):** Async operations automatically infer state parameters (`page`, `perPage`, `filter`, `sort`) from the Redux store via `thunkAPI.getState()`, avoiding redundant parameters in UI components.
2. **Multi-Instance Search Sync:** Built-in local state synchronization for search fields rendered simultaneously across mobile and desktop viewports, eliminating infinite re-render loops.
3. **Query Parameter Normalization:** Strict backend parsing of boolean strings (`"true"` / `"false"`) and regex escaping to prevent Mongoose schema type mismatches during filtration.

---

## 🔌 API Endpoints Overview

| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/contacts` | Fetch paginated & filtered contacts | `page`, `perPage`, `sortBy`, `sortOrder`, `contactType`, `isFavorite`, `name` |
| `GET` | `/contacts/:id` | Get contact by unique ID | — |
| `POST` | `/contacts` | Create a new contact | — |
| `PATCH` | `/contacts/:id` | Update contact details | — |
| `DELETE` | `/contacts/:id` | Delete a contact | — |

---

## 🚀 Getting Started

### **Prerequisites**
* Node.js (v18+ recommended)
* npm or yarn
* MongoDB Atlas account

### **Installation**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MaxsimJSDeveloper/contact-book-ts.git
   cd contact-book-ts
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

---

## 👨‍💻 Author

**Maksym Holovko**
* **LinkedIn:** [maksymholovko](https://www.linkedin.com/in/maksymholovko/)
* **GitHub:** [@MaxsimJSDeveloper](https://github.com/MaxsimJSDeveloper)