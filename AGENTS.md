# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Project decisions

- This is the social-jev project website, separate from the Python package repository.
- Follow the selected workbench concept: restrained academic typography, off-white paper, muted green, pale document/question/answer surfaces, and a single landing page with linked sections.
- Keep the project overview, models, data, training, evaluation and package on the landing page. Package documentation alone has a version selector.
- Pushes to main run checks only. Public website updates require a `site-v*` release tag pointing to a commit on main.
- The public website is a draft. Keep a prominent Draft label beside the header wordmark on desktop, mobile, and the docs placeholder until explicitly asked to remove it.
- Later, package release tags publish docs independently, while retaining the last released website. Do not deploy unfinished website main content when package docs change.
- Never fabricate benchmark numbers or live model predictions. Examples are explicitly illustrative; larger model sizes are planned until released.
- Do not edit or create README.md without explicit user approval.

## Visual walkthrough draft

- Pair each section with a short explanation and a substantial visual, usually text on the left and visual on the right.
- Applications use a looping input → model → output scene; evaluation uses a static Pareto figure; data uses a treemap; training shows the objective and curves rather than a full pipeline.
- Explain the decision head and logical positions with a focused animation; provide an attention-mask playground separately.
- User-authorized mock data is permitted for this design draft only. Label all simulated results, dataset sizes, training curves, and model outputs prominently. Never present them as measured findings.
- Keep this visual iteration on its draft branch. Do not publish a website tag without explicit authorization for this iteration.
