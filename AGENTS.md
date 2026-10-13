# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Project decisions

- This is the social-jev project website, separate from the Python package repository.
- Follow the selected workbench concept: restrained academic typography, off-white paper, muted green, pale document/question/answer surfaces, and a single landing page with linked sections.
- Keep the project overview, models, data, training, evaluation and package on the landing page. Package documentation alone has a version selector.
- Pushes to main run checks only. Public website updates require a website release tag; no deployment is configured in this first draft.
- Later, package release tags publish docs independently, while retaining the last released website. Do not deploy unfinished website main content when package docs change.
- Never fabricate benchmark numbers or live model predictions. Examples are explicitly illustrative; larger model sizes are planned until released.
- Do not edit or create README.md without explicit user approval.
