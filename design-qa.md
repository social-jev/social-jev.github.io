# First-draft design QA

final result: passed

## Scope and evidence

The selected third visual concept is the direction, with a single landing page and revised sections agreed in the conversation. This is an adaptation, not a pixel-identical clone. The generated architecture and benchmark placeholder were replaced with current release facts and a compact evaluation status table.

Local evidence (screenshots are not committed):

- Source visual: `screenshots/reference-workbench.png`, 934 × 1683 pixels.
- Final desktop: `screenshots/desktop-full.jpg`, 1440 × 4325 pixels; CSS viewport 1440 × 1000.
- Final phone: `screenshots/mobile-hero.jpg`; CSS viewport 390 × 1080.
- Full-view comparison: `screenshots/design-comparison.jpg`. Both source and implementation were resized proportionally to 720 pixels wide and placed side by side. Different page heights reflect the agreed new sections.
- Focused hero comparison: `screenshots/hero-comparison.jpg`. No device or browser frames are included.
- Additional captures: `screenshots/desktop-data.jpg`, `screenshots/desktop-evaluation.jpg`, and `screenshots/docs-desktop.jpg`.

## Fidelity surfaces

- Typography: Newsreader headings and DM Sans interface text preserve the academic hierarchy. Supporting labels and body text were enlarged after the first comparison. The italic green final hero line is an intentional refinement.
- Spacing: restrained two-column desktop composition, fine dividers, sticky chapter navigation, and stacked mobile sections. No page overflow at 320, 390, 768, 1024, or 1440 pixels.
- Colors: off-white paper, dark slate-green text, forest green actions, and pale blue/lavender/sage document/question/answer surfaces. Visible focus outlines and selected text states accompany color.
- Assets: the visual example consists of functional text UI, not a flattened image. No bespoke raster illustration or photographic asset is required by this adaptation. The mock's decorative architecture drawing is intentionally replaced with a text explanation grounded in the released LM-head model.
- Copy: 0.6B is available; 1.7B and 4B are planned. The 16-dataset mixture and recipe come from the public model card and training configuration. Examples explicitly state that they are illustrative. Validation checkpoint selection is distinguished from pending comparative benchmark evidence. Package docs have a real placeholder route.

## Comparison history

1. P2: supporting text was too small. Enlarged desktop and mobile body, labels, dataset entries, model metadata, and table text. Final side-by-side and focused captures show improved readability.
2. P2: the 320-pixel hero heading and actions wrapped excessively. Added a narrow-screen typography and action-spacing adjustment. A post-fix 320-pixel browser capture shows the heading in three lines, both actions on one row, and no page overflow.
3. P1 functional issue: Vite's local directory route fell back to the app shell for `/docs/`. Added a directory-index middleware for development and preview. Browser navigation now shows the documentation placeholder and its working return link.

## Verification

- Changed all three classification examples and checked the question/options update together.
- Selected the politics dataset filter and verified five matching entries, then restored all sixteen.
- Copied the checkpoint-loading code and verified the success status.
- Opened the docs placeholder and returned to the landing page.
- Followed a mobile chapter link and verified the destination and active chapter.
- Checked keyboard access to the visible skip link and focus outline.
- Browser warning/error log was empty.
- Production build and six Node tests passed.

## Follow-up polish and limits

- User review may change section order, typography, content, or visual storytelling.
- Self-host fonts if offline operation is required; the current draft loads Google Fonts with system fallbacks.
- Live inference and predictive-quality checks are outside this website draft.
- Versioned docs synchronization remains future work. Public deployment now runs only for `site-v*` release tags on main; ordinary main pushes run checks only.
- The published draft has a visible amber Draft label beside the header wordmark, including on mobile and the docs placeholder.
