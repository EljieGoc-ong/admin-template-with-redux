# Admin Template

A high-performance React admin template with Vite, TypeScript, GraphQL, Redux Toolkit, and Tailwind CSS. Replicates a modern dashboard design with authentication, user management, analytics, and data tables.

## Features

- **React 18 + TypeScript** - Type-safe, modern React
- **Vite** - Fast build tool and dev server
- **Redux Toolkit + RTK Query** - State management with optimistic updates
- **GraphQL** - Mock GraphQL API via MSW
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Dashboard charts and visualizations
- **React Hook Form + Zod** - Form validation
- **Authentication** - Login with JWT simulation
- **RBAC** - Role-based access control
- **Unit Tests** - Vitest + React Testing Library

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (with MSW mock API)
npm run dev

# Build for production
npm run build

# Run tests
npm run test:run
```

## Login Credentials (Mock)

- **Email:** admin@example.com
- **Password:** password123

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── store/          # Redux store, slices, API
├── hooks/          # Custom hooks
├── services/       # GraphQL, MSW mocks
├── types/          # TypeScript types
├── utils/          # Utilities
└── tests/          # Centralized test directory
```

## Tech Stack

- Build: Vite
- Framework: React 18
- Language: TypeScript
- State: Redux Toolkit + RTK Query
- Styling: Tailwind CSS
- Charts: Recharts
- Forms: React Hook Form + Zod
- Testing: Vitest + React Testing Library
- Mock API: MSW (Mock Service Worker)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests (watch) |
| `npm run test:run` | Run tests once |
| `npm run test:coverage` | Run with coverage |
| `npm run test:unit` | Run unit tests only |
| `npm run lint` | Run ESLint |

## Performance

- Route-based code splitting
- Optimistic updates for mutations
- Redux-persist for offline support
- Cached API responses

## License

MIT
