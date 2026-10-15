Model sizes use total parameters, not active parameters. DeepSeek includes 552B backbone + 196B Engram memory = 748B.

- GLiNER 0.34B: https://huggingface.co/fastino/GLiNER2.5-Decide
- SocialJev nominal 0.6B: https://huggingface.co/social-jev/social-jev-0.6B-v1
- Liquid 3.12B: https://huggingface.co/LiquidAI/d1-3B
- GLM 320B: https://huggingface.co/zai-org/GLM-5.3-Flash/raw/main/README.md
- DeepSeek 748B: https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash/raw/main/README.md
- TypeSafe Jev: https://jevresearch.github.io/Jev-Research/ — preferred dense interpretation 4–9B; dot at 9B, the upper end of that range. This is an illustrative placement within a speculative range, not a measured parameter count; the source also permits MoE interpretations with larger total counts.

Only size values and the illustrative TypeSafe Jev placement are retained from the earlier plot. Accuracy values now come from MERT PR #115, artifacts/evals/v0.1alpha/summary.json, imported October 15, 2026: https://github.com/DGoettlich/mert/pull/115 . The new metric is query-weighted accuracy on the same 512 test queries, with zero skipped. SocialJev 1.7B and 4B use nominal checkpoint sizes.

- CLEF 27B: https://openrouter.ai/cloudflare/clef
- CLEF Flash 9B: https://openrouter.ai/cloudflare/clef-flash
