# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Project decisions

- This is the social-jev project website, separate from the Python package repository.
- Follow the selected workbench concept: restrained academic typography, off-white paper, muted green, pale document/question/answer surfaces, and a single landing page with linked sections.
- Keep the project overview, models, data, training, evaluation and package on the landing page. Package documentation alone has a version selector.
- During active website development, pushes to main publish immediately. Release tags are not required; existing tags remain historical.
- The public website is a draft. Keep a prominent Draft label beside the header wordmark on desktop, mobile, and the docs placeholder until explicitly asked to remove it.
- Later, package release tags publish docs independently, while retaining the last released website. Do not deploy unfinished website main content when package docs change.
- Never fabricate benchmark numbers or live model predictions. Examples are explicitly illustrative; larger model sizes are planned until released.
- Do not edit or create README.md without explicit user approval.

## Visual walkthrough draft

- Pair each section with a short explanation and a substantial visual, usually text on the left and visual on the right.
- Applications use a looping input → model → output scene; evaluation uses a static Pareto figure; data uses a treemap; training shows the objective and curves rather than a full pipeline.
- Explain the decision head and logical positions with a focused animation; provide an attention-mask playground separately.
- User-authorized mock data is permitted for this design draft only. Label all simulated results, dataset sizes, training curves, and model outputs prominently. Never present them as measured findings.
- Architecture uses persistent token tiles to connect attention masks and reused position IDs to the normal pretrained unembedding matrix, vocabulary logits, and answer-code softmax.

## Copy decisions

- Use SocialJev in prose; retain social-jev in package and model identifiers. Use descriptive academic headings, without slogans.
- Lead with a Jev-like classification foundation model: general transformer capabilities and social-science decision training, fast direct inference, and a flexible typed interface.
- Explain large-dataset labelling, then show usage prominently before evaluation. Include a pending matched 30,000-request speed comparison; never invent its result.
- Label example inputs State and Query explicitly, with complete sentences.
