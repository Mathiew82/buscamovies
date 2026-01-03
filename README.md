# BuscaMovies

[https://buscamovies.vercel.app](https://buscamovies.vercel.app)

Movie search project developed in React JS and powered by the TMDb API.

## ⚙️ Technical Migration & Improvements

This project was originally built using **Create React App (CRA)** and was later **fully migrated to Vite** as part of a technical refactor focused on security, performance, and developer experience.

### 🔐 Motivation

- CRA depends on `webpack-dev-server`, which introduced **security vulnerabilities** that could not be patched without a major upgrade.
- CRA is no longer actively evolving, making long-term maintenance harder.
- Slower startup time and HMR compared to modern tooling.

### 🚀 Migration Highlights

- Migrated from **Create React App → Vite**
- Removed `react-scripts` and legacy Webpack configuration
- Replaced environment handling with **Vite native environment variables**
- Updated routing, assets handling, and build output (`build` → `dist`)
- Fixed production-only bugs revealed during the migration
- Simplified icon handling by replacing font icons with **SVG assets**
- Migrated tests from Jest (CRA) to **Vitest**
- Updated CI pipeline to use **pnpm** and modern GitHub Actions
- Updated Vercel configuration for Vite-compatible deployments

### 📈 Results

- ⚡ Much faster development startup and hot reload
- 🧼 Cleaner and more maintainable configuration
- 🔒 Security issues resolved
- 🧪 Faster and more reliable test execution
- 🧑‍💻 Improved developer experience overall

This migration reflects real-world maintenance work commonly required in production React applications and demonstrates the ability to modernize legacy setups while keeping functionality intact.
