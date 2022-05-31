## Full-stack TypeScript monorepo starter with authentication

Setting up a new project is time-consuming. The purpose of this project is to make it effortless with state-of-the-art technology and tooling.

In short - it's a monorepo with Node.js backend, GraphQL API, and React frontend. The whole stack is with TypeScript.

### 1 Features

#### 1.1 Backend

- [Node.js](https://nodejs.org/en/) with [TypeScript](https://www.typescriptlang.org/)
- [GraphQL Yoga](https://www.graphql-yoga.com/) Server API
- [Prisma](https://www.prisma.io/) ORM with [PostgreSQL](https://www.postgresql.org/) database
- [Winston](https://github.com/winstonjs/winston) logging

#### 1.2 Frontend

- [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/)  with cache
- [Tailwind CSS](https://tailwindcss.com)
- [Vite](https://vitejs.dev) building

#### 1.3 Configuration

- [PNPM](https://pnpm.io/) package manager
- [Jest](https://jestjs.io/) testing
- [Babel](https://babeljs.io/) compiling
- [ESLint](https://eslint.org/) linting

#### 1.4 CI

- [GitHub Actions](https://github.com/features/actions)

### 2. Setup

1. Install dependencies in all projects with `pnpm install --recursive`
2. Build types by running `pnpm run graphql-codegen`
3. Download, install and setup [PostgreSQL](https://www.postgresql.org/)
4. Create the file `server/.env` and add
   - `ACCESS_TOKEN_SECRET`
   - `REFRESH_TOKEN_SECRET`
   - `DATABASE_URL`
   - `EMAIL_HOST`
   - `EMAIL_PORT`
   - `EMAIL_PASSWORD`
   - `APP_URL`
5. Migrate DB schema by running `npx prisma migrate dev` in `server`
6. Generate types by running `npx prisma generate` in `server`
7. Run server with `pnpm run dev --prefix server`
8. Run app with `pnpm run dev --prefix app`

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

#### 3.3 Testing
- Run tests with `pnpm run test --recursive`