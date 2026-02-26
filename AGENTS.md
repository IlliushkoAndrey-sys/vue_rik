# Repository Guidelines

## Project Structure & Module Organization
The app is a Vite-powered Vue 3 SPA. Core entry files live in `src/main.js` and `src/App.vue`, while feature logic is grouped under `src/views` and UI atoms/molecules under `src/components`. Shared state uses Vuex modules in `src/store` (`characters`, `locations`, `episodes`), with API concerns isolated in `src/store/api.js`. Static assets and global styles belong in `src/assets`, and public-facing files (favicons, static images) reside in `public`. Keep new domain-specific code close to its owning module to retain the “feature-first” layout.

## Build, Test, and Development Commands
Run `npm install` with Node 20.19+ to sync dependencies. Use `npm run dev` for local development; it launches Vite with hot module replacement at `http://localhost:5173`. `npm run build` produces the optimized bundle in `dist/`, and `npm run preview` serves that bundle for smoke testing before deploying. When debugging API calls, pair `npm run dev` with the browser network panel to observe the Axios interceptors defined in `src/store/api.js`.

## Coding Style & Naming Conventions
Follow Vue Style Guide defaults: single-file components with `<script setup>`, PascalCase filenames for components (`AppHeader.vue`), and kebab-case routes or asset names. Use two-space indentation, single quotes in JavaScript, and prefer composables/stores over prop drilling. Co-locate CSS in the component when scoped, but keep global tokens in `src/assets/base.css`. Any helper exported from `src/store` or `src/api` should be named verbs (`fetchEpisodes`) to clarify side effects.

## Testing Guidelines
No automated harness ships today, so every change must include manual verification steps (route visited, filters tried, viewport checked). If you introduce automated tests, use Vitest + Vue Test Utils under `src/__tests__` and provide scripts (e.g., `"test": "vitest"`). Mock Axios via `vi.mock` to avoid network calls, and ensure empty states (404, network loss) are covered because interceptors surface those paths.

## Commit & Pull Request Guidelines
Existing history favors short, imperative commits (`added axios`, `added page 404`). Continue that format: lowercase verb phrase under 60 characters, optional scope in parentheses. Each PR should include: summary of intent, screenshots or GIFs for visible changes, reproduction steps for bugs, and links to related issues. Request review from another contributor, tick the “build passes” checkbox, and keep PRs focused on a single feature or fix to ease review.
