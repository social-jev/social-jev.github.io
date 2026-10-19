# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. GitHub Pages hosts the static Vite output in `dist/client/`. Run `npm run build` and `npm test` before publishing. No custom server or Sites hosting configuration is required.

## Project decisions

- This is the social-jev project website, separate from the Python package repository.
- Follow the selected workbench concept: restrained academic typography, off-white paper, muted green, pale document/question/answer surfaces, and a single landing page with linked sections.
- Keep the project overview, models, data, training, evaluation and package on the landing page. Package documentation alone has a version selector.
- During active website development, pushes to main publish immediately. Release tags are not required; existing tags remain historical.
- The public website no longer displays Draft labels or the Design preview banner. The user explicitly requested their removal.
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

- Show the actual typed core interface in the usage section, with separate Documentation, Model, and GitHub links. Include the GitHub icon. Verify examples against the package source.

## Academic header

- Use the approved centered academic layout: SocialJev title, descriptive subtitle, author list, ETH Zurich, then GitHub/Models/Documentation links above all explanations. No checkpoint availability line.
- Author order: Elliott Ash, Felix Drinkall, Pranav Garg, Daniel Göttlich.
- Start Overview and the wide application animation below the title block; usage follows. Keep restrained cream and green styling.

- Keep the academic header centered; below it restore explanation-left/visual-right sections, stacking on mobile.
- Current architecture uses a shared scalar linear/MLP head on each candidate’s final nonpadding hidden state, followed by query-local softmax. Remove answer-code, unembedding, and shared answer-prefix explanations. Attention follows independent causal state–query–candidate sequences with positions restarting per sequence.
- Remove the initial application animation’s Pause button.

- Verify the current scalar-head architecture against GitHub social-jev PR #3, not merely a local checkout. Display separate candidate attention matrices, not a single packed block-diagonal mask. Remove all playback buttons; preserve the application input/model/probabilities visual.

## Approved classification and training visuals

- Classification: a Request outer box encloses State, Query, and an Options box with individually outlined choices. A SocialJev block connects to a Result box with animated labelled probability bars. No Candidate probabilities subtitle or Pause buttons.
- Attention diagram depicts TRAINING, sourced from MERT attention.py with option_context=full, not package inference: one packed state/query/options sequence, branch-isolated causal options, shared state/query visibility, and reused option position offsets. No shared answer prefix. Keep one large matrix, token tiles above, selected-token detail beside it.

- The application animation has no overall enclosing frame, title bar, clickable scene selectors, counter, or local illustration disclaimers. Keep Request and Result borders and cycle examples automatically.

- The decoding section uses the approved vertical model cutaway: closed Request/Result boxes, token-aligned residual streams through transformer layers, short numeric final hidden-state vectors with a labelled brace, one Decision Head, scores and softmax. No headings or playback controls within the visual. Keep diagram typography legible; allow horizontal diagram scrolling on narrow screens instead of shrinking labels.

## Documentation publishing

- Package docs source and the locked `docs` dependency group belong in social-jev/social-jev. Documentation tooling must not become package runtime dependencies or published extras.
- The website `published` branch stores generated landing-page files and immutable `docs/vMAJOR.MINOR.PATCH/` builds. Website main pushes rebuild the landing page while preserving docs. Package release dispatches reuse the stored landing page. Never schedule hourly or other periodic deployments.
- The website workflow reconciles missing stable, alpha, beta, and release-candidate package tags reachable from package main and containing mkdocs.yml. It builds with `uv sync --locked --group docs` and `DOCS_VERSION` set for MkDocs.
- `/docs/versions.json` contains `{latest, versions}` in descending release order; latest prefers the newest stable release or the newest prerelease if no stable docs exist. `/docs/` redirects to latest once docs exist. Keep the placeholder before that.
- Immediate cross-repository dispatch uses the configured package secret WEBSITE_PUBLISH_TOKEN scoped to website repository Contents:write. Failed docs publishing is retried explicitly; there is no scheduled polling.

- The final training-objective and learning-curves section has been removed at the user’s request. Keep the training-mixture/data section and training attention explanation.

- The attention visualization uses one continuous sequence: State, Query 1 and its options, Query 2 and its options. Keep query branches isolated and reuse logical positions across queries and options. The Pareto y-axis is labelled Accuracy.

- Use the approved thin outlined external-link SVG symbol on every text link, on resource links. Section navigation links (Overview, Usage, Evaluation, How it works) have no symbol. Keep brand wordmarks and the accessibility skip link free of the symbol. Do not use Unicode arrow glyphs for links.

## Future roadmap

- Extend SocialJev to modalities beyond text. This is a future direction, not a claim about currently supported inputs. Do not add a public roadmap section yet.

- Keep landing-page body copy at 18px and supporting captions, legends, plot notes and controls at 16px. Maintain readable text on mobile rather than shrinking it to fit.

- Application examples put task definitions in the query and use short answer options. The stance example uses Support, Oppose and Unclear.

- Pareto chart: keep full SocialJev names with inline preview suffixes visible close to their dots, linked by vertical connectors. Reference model names appear on hover, keyboard focus or tap as borderless text with a cream halo; omit accuracy and parameter counts from hover labels.

- Omit the figure headings “Accuracy × model size”, “Share of training questions” and “Packed training sequence · linear / MLP head”. Keep the attention interaction instruction at 16px.

- Hero authors use 22px medium text and the institution uses 20px darker text, with 44px above the author line. On mobile use 20px authors and 18px affiliation.

- Show a copyable envelope + dgoettlich@ethz.ch line between ETH Zurich and the header resource buttons, with brief copy confirmation.
