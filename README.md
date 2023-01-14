## Full-stack TypeScript Monorepo Starter with Authentication

Setting up a new project is time-consuming. The purpose of this project is to make it effortless with state-of-the-art technology and tooling.

In short - it's a monorepo with Node.js backend, GraphQL API, and React frontend. The whole stack is with TypeScript.

### 1 Demo
[https://full-stack-typescript-monorepo-starter-with-authentication.up.railway.app](https://full-stack-typescript-monorepo-starter-with-authentication.up.railway.app)

### 1 Features

#### 1.1 Backend

- [Node.js](https://nodejs.org/en/) with [TypeScript](https://www.typescriptlang.org/)
- [GraphQL Yoga](https://www.graphql-yoga.com/) Server API
- [Prisma](https://www.prisma.io/) ORM with [PostgreSQL](https://www.postgresql.org/) database
- [Winston](https://github.com/winstonjs/winston)/[Grafana Loki](https://grafana.com/oss/loki/) logging
- [ESBuild](https://esbuild.github.io) bundling

#### 1.2 Frontend

- [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/)  with cache
- [Tailwind CSS](https://tailwindcss.com)
- [Vite](https://vitejs.dev) building

#### 1.3 Tooling/Infrastructure

- [GitHub Actions](https://github.com/features/actions) CI/CD
- [Prometheus](https://prometheus.io/) metrics
- [Grafana](https://grafana.com/grafana/) monitoring
- [Sentry](https://sentry.io) error monitoring
- [Railway](https://railway.app) hosting
- [PNPM](https://pnpm.io/) package manager
- [Jest](https://jestjs.io/) testing
- [ESLint](https://eslint.org/) linting
- [Turborepo](https://turbo.build/repo) caching

### 2 Setup
1. Install [Docker Compose](https://docs.docker.com/compose/install/)
2. Install dependencies in all projects: `pnpm install --recursive`
3. Build types from  GraphQL schema: `pnpm run graphql-codegen`
4. Create the file `server/.env` and add:
   - `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/fstmswa?schema=public`
   - `ACCESS_TOKEN_SECRET`
   - `REFRESH_TOKEN_SECRET`
   - `EMAIL_HOST`
   - `EMAIL_PORT`
   - `EMAIL_PASSWORD`
   - `APP_URL`
5. Run DB: `docker-compose up db`
6. Migrate DB schema: `npx prisma migrate dev` in `server`
7. Generate types: `npx prisma generate` in `server`
8. Run server: `pnpm run dev --prefix server`
9. Run app: `pnpm run dev --prefix app`

### 3. Maintenance and further development

#### 3.1 Database
- Edit DB schema in `server/prisma/schema.prisma`
- Migrate DB schema by running `npx prisma migrate dev` in `server`
- Generate types by running `npx prisma generate` in `server`
- Open DB admin panel by running `npx prisma studio` in `server`

#### 3.2 API
- Generate types by running `pnpm run graphql-codegen`
- Edit GraphQL Schema in `server/src/schema.graphql`
- Open GraphiQL in `localhost:4000` while running server

#### 3.3 Translations
- Run `pnpm run extract-translations` in `app`
- Edit json files in `app/src/assets/translations`

#### 3.4 Testing
- Run tests with `pnpm run test --recursive`

### 4. Deploy
#### 4.1 Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app?referralCode=brandhaug)
- Configure deploys in `server/railway.toml` and `app/railway.toml`
- Add `RAILWAY_TOKEN` to GitHub actions secret

#### 4.2 Turborepo
- Setup [Turborepo docker image](https://hub.docker.com/r/fox1t/turborepo-remote-cache)
- Add `TURBO_TOKEN` to GitHub actions secret
- Edit `.turbo/config.json`
