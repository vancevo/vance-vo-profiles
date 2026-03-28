# Precision Portfolio (Full-Stack Monorepo)

A high-performance, modular portfolio platform and CMS built using an NPM Workspaces Monorepo.

## 🏗 System Architecture

This monorepo manages three core applications natively, allowing them to share interfaces and types through a `shared` workspace. 

- **Frontend Portfolio (`apps/portfolio`)**: The main client-facing portfolio. Built with React, Vite, Tailwind V4, and Zustand. Connects to the backend via React Query.
- **Admin Dashboard (`apps/admin-dashboard`)**: A private CMS for managing your Portfolio data (Experiences, Github Highlights, Tech Stack, Projects).
- **Backend API (`apps/api`)**: A Node.js and Express RESTful API with a Mongo database, structured natively in TypeScript.
- **Shared Packages (`packages/shared`)**: Single source of truth for Zod models, TypeScript interfaces, and generalized utilities used across all full-stack applications.

---

## 🚀 Prerequisites

1. **Node.js** (v18.x or v20.x+)
2. **MongoDB Community Server**: Make sure MongoDB is installed and running locally on port `27017` or update the `.env` MongoDB URI connection string inside `apps/api`.

---

## ⚙️ Installation

To initialize the entire monorepo with all sub-dependencies, execute one command from the **root directory**:

```bash
npm install
```

NPM will natively detect all workspaces, install their corresponding node modules, and link them correctly.

---

## ▶️ Running the Applications

### 1. Run Everything Simultaneously (Recommended)

Since the `package.json` at the root utilizes NPM's built-in `--workspaces` flag, you can boot up the Backend, Portfolio, and Admin panel concurrently:

```bash
npm run dev
```

> **Note**: This will launch `vite`, `tsx`, and `vite` servers. The output logs might be intertwined. Make sure MongoDB is running first.

### 2. Run Applications Individually

If you prefer to debug or run them in separate split terminals for better log clarets:

**Terminal 1: Start Backend API**
```bash
npm run dev --workspace=@workspace/api
```
*API will run on `http://localhost:5000`*

**Terminal 2: Start Portfolio**
```bash
npm run dev --workspace=@workspace/portfolio
```
*Portfolio will run on `http://localhost:3000`*

**Terminal 3: Start Admin Dashboard**
```bash
npm run dev --workspace=@workspace/admin-dashboard
```
*Dashboard will run on `http://localhost:3001`*

---

## 🛠 Adding New Workspaces/Dependencies

**Installing a root dependency (applies globally):**
```bash
npm install <package> -D
```

**Installing a dependency into a specific workspace:**
For example, to install `date-fns` into the portfolio only:
```bash
npm install date-fns --workspace=@workspace/portfolio
```

## 🏗 Project Stack

- **Client apps**: React 19, Vite, Tailwind CSS 4, Zustand, React Query, Lucide React, Framer Motion
- **Backend**: Express.js, TypeScript, Mongoose
- **Validation**: Zod
