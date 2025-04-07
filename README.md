# Next.js + NestJS Chat Application with Socket.IO

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A fullstack chat application featuring:

- JWT authentication
- Real-time messaging with Socket.IO
- REST API for historical data
- Modern frontend (Next.js) + robust backend (NestJS)
- TypeScript end-to-end

## ✨ Features

### Frontend (Next.js)

- Static export compatible (no SSR/api routes)
- Authentication flows (login/register)
- Real-time chat interface with Socket.IO client
- React Query for REST data fetching/caching integrated with socket events
- Zustand for global state management
- Online users list with presence indicators
- Message history with infinite scroll
- Tailwind CSS + Shadcn UI components
- JWT storage in localStorage

### Backend (NestJS)

- REST API for chat history and user data
- WebSocket gateway for real-time communication
- JWT authentication for both HTTP and WS
- Protected routes using Guards
- Prisma ORM with PostgreSQL
- Message persistence with read receipts
- Typed Socket.IO events
- Dockerized PostgreSQL setup

## 🚀 Quick Start

### Backend Setup

1. Install dependencies:

```bash
cd backend && pnpm install
```

2. Copy environment variables:

```bash
cp example.env .env
```

3. Start PostgreSQL (requires Docker):

```bash
./start-database.sh
```

4. Run database migrations:

```bash
pnpm prisma db push
```

5. Start dev server:

```bash
pnpm start:dev
```

### Frontend Setup

1. Install dependencies:

```bash
cd frontend && pnpm install
```

2. Configure API and WebSocket endpoints in `./src/config.ts`

3. Start dev server:

```bash
pnpm dev
```

## 📝 License

MIT
