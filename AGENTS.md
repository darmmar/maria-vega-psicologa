# Project guidance

- This project runs Astro 5 on **Cloudflare Pages**, with Pages Functions for SSR and Tina previews. Consult the current official Astro and TinaCMS documentation before changing their integration. Do not introduce another hosting platform.
- Keep page rendering and unsaved preview rendering together. Register editable regions in `src/lib/tina/islands.ts`; use the official `TinaIsland`, `requestWithMetadata`, and `experimental_createIslandRoute` APIs.
- Use normal page navigation. Do not mutate the admin's parent hash, force editor cookies, intercept navigation clicks, or patch `node_modules` or generated files.
- Visitors read deployed content files. Only editor requests query Tina. Preserve request metadata and render Tina rich text when previewing unsaved MDX changes.
- Generate Tina before type checking or building Astro. Ignore `tina/__generated__`, `public/admin`, build output, caches, and local environment files. Commit `tina/tina-lock.json` whenever schema regeneration changes it.
- Verify with `pnpm typecheck`, `pnpm test:editor`, and `pnpm build`. Preview production output with `pnpm preview` (Wrangler). Run the editor tests against local Tina; never save test content to Tina Cloud.
- Keep the separate content on `dev` and `main` when applying technical fixes to both branches.
- Commit author and committer: **David Armenteros Martínez <davidarmenn1@gmail.com>**. Write commit messages in English using Conventional Commits.
- Business details and external integrations still pending are listed in `docs/deploy-checklist.md`. Do not invent tax IDs, change contact numbers, or mark email delivery, bookings, payments, or SEO verification complete without evidence.
