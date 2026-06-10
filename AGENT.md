# AGENT.md — Happy Hacking Space Main Site (`site/`)

This is the main website for **Happy Hacking Space (HHS)** deployed to `happyhacking.space`. It is a Next.js 15 application using the Pages Router.

## Commands

All commands must be run from within the `site/` directory:

```bash
cd site/
yarn install    # install dependencies (uses yarn, not npm)
yarn dev        # start development server (localhost:3000)
yarn build      # production build
yarn start      # start production server
yarn lint       # Next.js ESLint
yarn format     # Prettier formatting
yarn analyze    # bundle analysis (ANALYZE=true)
```

## Technology Stack

- **Framework**: Next.js 15 (Pages Router), React 19
- **Styling**: Theme UI (`theme-ui`), Emotion (`@emotion/react`, `@emotion/styled`), some `styled-components`
- **UI Components**: Hack Club icons (`@hackclub/icons`), custom components in `components/`
- **Content**: MDX via `@next/mdx` and `@mdx-js/loader`
- **Animation**: `animejs`, `framer-motion`, `vanilla-tilt`, `react-snowfall`, `react-tsparticles`, Three.js / `@react-three/fiber`
- **Bundle Optimization**: `million/compiler` (Million.js), `next-transpile-modules`
- **Data Fetching**: `swr`, `axios`
- **Analytics**: Plausible Analytics

## Code Style

- **Formatter**: Prettier with these settings:
  - `singleQuote: true`
  - `trailingComma: 'none'`
  - `semi: false`
  - `arrowParens: 'avoid'`
  - `printWidth: 80`
- **Linting**: ESLint (`next/core-web-vitals`), with these overrides:
  - `@next/next/no-img-element`: off
  - `react/no-unescaped-entities`: off
  - `eqeqeq`: warn
- **Types**: TypeScript is enabled but strict mode is off. Prefer implicit typing.
- **Imports**: Use relative imports for local modules (`../components/nav`). Use named imports from Theme UI (`{ Box, Text }`).
- **Components**: Functional components with destructured props, default exports for pages.
- **Naming**: `camelCase` for variables/functions, `PascalCase` for components.

## Architecture

### Directory Structure

- `pages/` — Next.js pages (file-system routing). Each `.js`/`.tsx` file is a route.
  - `pages/_app.js` — Custom app wrapper
  - `pages/_document.js` — Custom document
  - `pages/api/` — API routes
- `components/` — Reusable React components. Some subdirectories group related components (e.g., `components/index/cards/`).
- `hooks/` — Custom React hooks
- `lib/` — Utility functions and shared logic
- `languages/` — i18n translation files (English, Turkish, Korean)
- `public/` — Static assets served at root path
- `middleware.js` — Next.js Edge Middleware (handles geolocation for `/slack` routes)

### Notable Patterns

- **i18n**: Custom lightweight i18n system with `localStorage` persistence and IP-based locale detection (`ipapi.co`). Translation files live in `languages/`.
- **Redirects / Rewrites**: `next.config.mjs` contains extensive legacy path redirects, subdomain rewrites, and proxies to external Vercel apps (e.g., `/workshops/`, `/map/`, `/letters/`).
- **Middleware**: `middleware.js` sets a `continent` cookie based on the user's country via `country-list-js` for `/slack` routes.
- **Shared Packages**: Consumes `@happyhackingspace/theme`, `@happyhackingspace/meta`, `@happyhackingspace/banner`, `@happyhackingspace/markdown` from the `theme/` workspace.

## Environment Variables

The site may require a `.env.local` file for local development. Key variables (check `.env.local` if present):

- API keys for external services (GitHub, SendGrid, OpenAI, Mapbox, Airtable, etc.)
- Analytics configuration

`.env.local` is gitignored. Do not commit secrets.

## Testing

**No test framework is configured.** Testing is done via:
- Manual testing in dev mode
- `yarn lint` for static analysis
- Vercel preview deployments

## Deployment

- **Host**: Vercel
- **CI**: `.github/workflows/ci.yml` runs `yarn lint` on push/PR
- **Dependabot**: Weekly npm updates configured in `.github/dependabot.yml`

## Security Notes

- Never commit `.env.local` or any secrets
- Some pages use `dangerouslySetInnerHTML` — ensure content is sanitized
- The `markdown` package from `@happyhackingspace/markdown` does not use `rehype-sanitize` (it is commented out in the pipeline)

## Working with This Project

- When adding new pages, place them in `pages/` with the appropriate file name for the route
- When adding new components, place them in `components/` or an appropriate subdirectory
- Use Theme UI's `sx` prop for styling when possible
- Keep components modular and reusable
- Respect existing patterns in the codebase
