# Better Auth - Full-Stack Authentication Demo

A comprehensive full-stack authentication system built with **Better Auth**, **NestJS**, **Next.js**, and **PostgreSQL**. This project demonstrates modern authentication patterns using a monorepo architecture with Turborepo.

## 🏗️ Project Architecture

This is a **monorepo** containing multiple applications and shared packages:

```text
better-auth/
├── apps/
│   ├── backend/          # NestJS API server with Better Auth
│   └── web/              # Next.js frontend application
├── packages/
│   ├── eslint-config/    # Shared ESLint configurations
│   └── typescript-config/ # Shared TypeScript configurations
└── pnpm-workspace.yaml   # PNPM workspace configuration
```

## 🚀 Tech Stack

### Backend (`apps/backend/`)

- **Framework**: NestJS 11.x
- **Authentication**: Better Auth 1.3.7 with NestJS integration
- **Database**: PostgreSQL with Drizzle ORM
- **Language**: TypeScript
- **Package Manager**: PNPM

### Frontend (`apps/web/`)

- **Framework**: Next.js 15.x with App Router
- **Authentication**: Better Auth React client
- **Styling**: Tailwind CSS 4.x
- **Language**: TypeScript
- **Package Manager**: PNPM

### Development Tools

- **Monorepo**: Turborepo for build orchestration
- **Package Manager**: PNPM with workspaces
- **Linting**: ESLint with shared configurations
- **Formatting**: Prettier
- **Database Migrations**: Drizzle Kit

## 📁 Project Structure

### Backend Application (`apps/backend/`)

```text
src/
├── auth/
│   ├── auth.ts           # Better Auth configuration
│   └── schema.ts         # Database schema definitions
├── database/
│   ├── database-connection.ts  # Database connection setup
│   └── database.module.ts      # Database module configuration
├── users/
│   ├── users.constroller.ts    # User endpoints
│   └── users.module.ts         # User module
├── app.module.ts         # Main application module
└── main.ts              # Application entry point
```

**Key Features:**

- **Better Auth Integration**: Configured with email/password authentication
- **Database Schema**: Complete auth schema with users, sessions, accounts, and verification tables
- **Global Auth Guard**: Protects all routes by default
- **Drizzle ORM**: Type-safe database operations with PostgreSQL

### Frontend Application (`apps/web/`)

```text
app/
├── dashboard/
│   └── page.tsx         # Protected dashboard page
├── layout.tsx           # Root layout with auth provider
└── page.tsx            # Home page with auth forms
components/
├── auth-forms.tsx      # Login and signup forms
└── auth-provider.tsx   # React context for auth state
lib/
└── auth-client.ts      # Better Auth client configuration
```

**Key Features:**

- **Authentication Forms**: Complete login and signup UI
- **Protected Routes**: Dashboard page requiring authentication
- **Auth Context**: React context for managing auth state
- **Responsive Design**: Modern UI with Tailwind CSS

## 🗄️ Database Schema

The application uses a comprehensive authentication schema with the following tables:

- **`user`**: Core user information (id, name, email, emailVerified, image, timestamps)
- **`session`**: User sessions with tokens and metadata
- **`account`**: OAuth provider accounts and credentials
- **`verification`**: Email verification and password reset tokens

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- PNPM 9.0.0+
- PostgreSQL database

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd better-auth
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Setup**

   Create environment files for both applications:

   **Backend** (`apps/backend/.env`):

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/better_auth_db
   UI_URL=http://localhost:3001
   PORT=3000
   ```

   **Frontend** (`apps/web/.env.local`):

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Database Setup**

   ```bash
   cd apps/backend
   pnpm drizzle-kit push
   ```

### Development

**Start all applications:**

```bash
pnpm dev
```

This will start:

- Backend API server on `http://localhost:3000`
- Frontend web app on `http://localhost:3001`

**Individual applications:**

```bash
# Backend only
cd apps/backend && pnpm dev

# Frontend only
cd apps/web && pnpm dev
```

### Available Scripts

**Root level:**

- `pnpm dev` - Start all applications in development mode
- `pnpm build` - Build all applications
- `pnpm lint` - Lint all applications
- `pnpm format` - Format code with Prettier
- `pnpm check-types` - Type check all applications

**Backend specific:**

- `pnpm test` - Run unit tests
- `pnpm test:e2e` - Run end-to-end tests
- `pnpm start:prod` - Start production server

## 🔐 Authentication Flow

### Backend Authentication

1. **Better Auth Configuration**: Set up in `apps/backend/src/auth/auth.ts`
2. **Database Adapter**: Uses Drizzle adapter for PostgreSQL
3. **Email/Password**: Enabled for user registration and login
4. **Global Guard**: All routes protected by default with `AuthGuard`

### Frontend Authentication

1. **Auth Client**: Configured in `apps/web/lib/auth-client.ts`
2. **React Hooks**: Uses `authClient.useSession()` for auth state
3. **Auth Provider**: Context provider for sharing auth state
4. **Protected Routes**: Dashboard page requires authentication

### Authentication Features

- ✅ **Email/Password Registration**
- ✅ **Email/Password Login**
- ✅ **Session Management**
- ✅ **Protected Routes**
- ✅ **User Profile Display**
- ✅ **Sign Out Functionality**

## 🏃‍♂️ Usage Examples

### User Registration

```typescript
await authClient.signUp.email({
  email: "user@example.com",
  password: "securepassword",
  name: "John Doe",
});
```

### User Login

```typescript
await authClient.signIn.email({
  email: "user@example.com",
  password: "securepassword",
});
```

### Session Management

```typescript
const { data: session, isPending } = authClient.useSession();
```

### Sign Out

```typescript
await authClient.signOut();
```

## 🔧 Configuration

### Better Auth Configuration

The authentication is configured in `apps/backend/src/app.module.ts`:

```typescript
AuthModule.forRootAsync({
  useFactory: (database, configService) => ({
    auth: betterAuth({
      database: drizzleAdapter(database, { provider: "pg" }),
      emailAndPassword: { enabled: true },
      trustedOrigins: [configService.getOrThrow("UI_URL")],
    }),
  }),
});
```

### Database Configuration

Database connection is managed through the `DatabaseModule` with:

- PostgreSQL connection pool
- Drizzle ORM integration
- Schema registration for auth tables

## 🧪 Testing

The backend includes comprehensive testing setup:

```bash
# Unit tests
cd apps/backend && pnpm test

# E2E tests
cd apps/backend && pnpm test:e2e

# Test coverage
cd apps/backend && pnpm test:cov
```

## 📦 Deployment

### Build for Production

```bash
# Build all applications
pnpm build

# Start production servers
cd apps/backend && pnpm start:prod
cd apps/web && pnpm start
```

### Environment Variables

Ensure all required environment variables are set in production:

- `DATABASE_URL` - PostgreSQL connection string
- `UI_URL` - Frontend application URL
- `PORT` - Backend server port

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify PostgreSQL is running
   - Check `DATABASE_URL` environment variable
   - Ensure database exists

2. **Authentication Issues**
   - Verify `UI_URL` matches frontend URL
   - Check CORS configuration
   - Ensure auth endpoints are accessible

3. **Build Errors**
   - Clear node_modules and reinstall: `pnpm clean && pnpm install`
   - Check TypeScript configuration
   - Verify all dependencies are installed

### Getting Help

- Check the [Better Auth documentation](https://better-auth.com)
- Review NestJS and Next.js documentation
- Open an issue for bugs or feature requests
