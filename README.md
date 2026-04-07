# InvoiceAI

An AI-powered invoice management application built with Next.js 16, Better Auth, and PostgreSQL.

## Tech Stack

- **Framework** — Next.js 16 (App Router, Turbopack)
- **Language** — TypeScript 5.9
- **Auth** — Better Auth with Google OAuth
- **Database** — PostgreSQL 16 + Drizzle ORM
- **Styling** — Tailwind CSS 4, shadcn/ui (new-york), Radix UI
- **Icons** — Lucide React, Phosphor Icons
- **Theming** — next-themes (dark mode default)
- **Tooling** — pnpm, Biome, ESLint, Drizzle Kit

## Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) & Docker Compose

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd invoiceai
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
POSTGRES_PORT=5432
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"

# Adminer
ADMINER_PORT=8080

# Better Auth
BETTER_AUTH_SECRET=<your-secret>
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
```

### 4. Start the database

```bash
docker compose up -d
```

This starts PostgreSQL 16 and Adminer (accessible at `http://localhost:8080`).

### 5. Run database migrations

```bash
pnpm drizzle-kit migrate
```

### 6. Start the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/          # Login page (Google OAuth)
│   │   └── signup/         # Signup page
│   ├── api/
│   │   ├── auth/[...all]/  # Better Auth API routes
│   │   └── invoices/       # Invoice API endpoints
│   ├── invoices/
│   │   ├── create/         # Create invoice view
│   │   └── layout.tsx      # Invoice layout with sidebar
│   ├── layout.tsx          # Root layout (theme, fonts)
│   └── globals.css         # Tailwind + design tokens
├── components/             # UI components (shadcn/ui + custom)
├── db/
│   └── auth-schema.ts      # Drizzle schema (user, session, account, verification)
├── lib/
│   ├── auth.ts             # Better Auth server config
│   ├── auth-client.ts      # Better Auth client
│   └── utils.ts            # Utility helpers
├── constant/               # App constants (nav links, site title)
├── hooks/                  # Custom React hooks
├── types/                  # Shared TypeScript types
└── index.ts                # Drizzle database instance
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm drizzle-kit generate` | Generate a new migration |
| `pnpm drizzle-kit migrate` | Apply pending migrations |
| `pnpm drizzle-kit studio` | Open Drizzle Studio GUI |

## License

MIT
# InvoiceAi
# InvoiceAi
# InvoiceAi
# Invoice-Ai
