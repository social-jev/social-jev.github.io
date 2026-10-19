import evaluation from './data/evaluation.json' with { type: 'json' };

// Sizes and Jev placement retained from the earlier eval-size-plot/sources.md.
const sizes = {
  'fastino/GLiNER2.5-multi-Decide': { name: 'GLiNER 2.5-multi-Decide', params: 0.287 },
  'fastino/GLiNER2.5-Decide': { name: 'GLiNER 2.5-Decide', params: 0.34 },
  'social-jev/social-jev-0.6B-preview': { name: 'SocialJev 0.6B', params: 0.6, dx: -65, dy: 52 },
  'social-jev/social-jev-1.7B-preview': { name: 'SocialJev 1.7B', params: 1.7, dx: -60, dy: -50 },
  'social-jev/social-jev-4B-preview': { name: 'SocialJev 4B', params: 4, dx: 15, dy: 4 },
  'LiquidAI/d1-3B': { name: 'Liquid d1-3B', params: 3.12 },
  'typesafe/jev-1.13': { name: 'TypeSafe Jev*', params: 9, estimated: true },
  'cloudflare/clef-flash': { name: 'CLEF Flash', params: 9 },
  'cloudflare/clef': { name: 'CLEF', params: 27 },
  'z-ai/glm-5.3-flash': { name: 'GLM 5.3 Flash', params: 320 },
  'deepseek/deepseek-v4.1-flash': { name: 'DeepSeek V4.1 Flash', params: 748 },
};

export const evaluationModels = evaluation.models.map(model => ({
  ...model,
  ...sizes[model.model],
  ours: model.model.startsWith('social-jev/'),
  score: model.accuracy * 100,
}));
export { evaluation };
