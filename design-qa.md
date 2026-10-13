# Visual walkthrough draft QA

final result: passed

## Source and scope

Style reference: `screenshots/public-draft-desktop.jpg`, the previously published academic workbench layout (1440 × 1000). Content and visual changes follow the user-approved section plan in AGENTS.md: brief explanation beside each visual, a looping application scene, static evaluation, dataset treemap, decision-head/position animation, attention playground, and training objective/curves.

The user explicitly permitted fake data for this draft. All synthetic outputs and numerical figures are marked as illustrative or simulated. No website release tag was created for this iteration.

## Browser evidence

- Local preview: http://127.0.0.1:4173/
- Desktop CSS viewport: 1440 × 1050.
- Phone CSS viewport: 390 × 1080.
- Desktop hero: `screenshots/walkthrough-hero.jpg` (1440 × 1050).
- Full page: `screenshots/walkthrough-full.jpg` (1440 × 5331).
- Phone: `screenshots/walkthrough-mobile.jpg` (390 × 1080).
- Detailed screenshots: `screenshots/walkthrough-evaluation.jpg`, `screenshots/walkthrough-data.jpg`, `screenshots/walkthrough-architecture.jpg`, `screenshots/walkthrough-positions.jpg`, `screenshots/walkthrough-attention.jpg`, `screenshots/walkthrough-training.jpg`.
- Combined source/implementation comparison: `screenshots/walkthrough-comparison.jpg`; both screenshots scaled proportionally to 720 pixels wide. The new banner and larger animation intentionally increase hero height.
- Animated application preview: `screenshots/applications-preview.gif` (726 × 566), assembled from actual browser captures of the three scene selections.

Screenshots are local review artifacts, excluded from Git.

## Required surfaces

- Fonts: Newsreader display type and DM Sans supporting text preserve the prior academic hierarchy. Left explanations remain short. Charts use explicit readable axis labels and direct model labels.
- Layout: text/visual pairing throughout; columns stack on mobile. No page overflow at 320, 390, 768, or 1024 pixels. Token strips and the static Pareto chart scroll within their own containers on narrow screens.
- Colors: paper background, slate-green ink, green emphasis, restrained semantic pastels. Draft and simulation notices use an amber surface. Selection is indicated with text or outlines as well as color.
- Visual assets: diagrams, matrix, treemap, and charts are functional data visualizations; no photographic or decorative raster assets are required. Treemap sizing uses D3 hierarchy rather than approximate manual rectangle areas.
- Copy: simulation is explicit in the top banner, figure headers, SVG accessible descriptions, and captions. Planned models remain identified as planned. The attention/readout description was checked against the released model's attention.py, model.py, head.py, and template.

## Iteration history

- P2: initial application arrows pointed vertically despite the horizontal desktop flow. Repositioned arrows between the input, model, and output columns; retained a vertical first transition for mobile.
- P2: long dataset labels clipped in small treemap blocks. Added compact labels, retained full accessible names and detail text, and hid percentages where space is insufficient. Post-fix data screenshot shows clear labels.
- P2: scaling the entire Pareto chart to phone width made its text too small. Kept a readable chart width inside a locally scrollable container, without page overflow.
- Expected change: the architecture visual depicts Qwen3's LM head and candidate-code readout, not the generic scorer from the original mockup.

## Verification

- Application scenes update document, query, options, and simulated choice together; playback advances scenes and pause stops it.
- Treemap selection updates dataset name, topic, illustrative share, and destination link.
- Architecture steps reveal candidate-code readout and normalization; position mode demonstrates reused option starts and the answer prefix after the longest option.
- Attention selection isolates sibling options, permits all own candidates at an answer prefix, and keeps the second question independent. Logical numbering updates the displayed positions.
- Mobile attention interaction works without page overflow.
- Docs placeholder and return link work.
- Keyboard skip link is reachable and visibly focused.
- Browser warning/error log is empty.
- Production build and ten Node tests pass, including attention-mask semantics and Pareto dominance.

## Remaining limits

- This is an exploratory visual draft: simulated benchmarks, mixture sizes, curves, and outputs must be replaced before any evidence-based release.
- No live inference, training run, or predictive-quality evaluation was performed.
- Animations are native browser sequences, not final motion-design videos. Fine timing and richer transitions can be refined after review.
- Public site remains on its existing tagged release; this draft is kept separately for review.
