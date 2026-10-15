// All values in these charts are invented for the layout draft.
export const mockModels = [
  { name: "Small baseline", params: 0.35, score: 65, ours: false },
  { name: "social-jev 0.6B", params: 0.6, score: 79, ours: true },
  { name: "social-jev 1.7B", params: 1.7, score: 85, ours: true },
  { name: "social-jev 4B", params: 4, score: 88, ours: true },
  { name: "Baseline 7B", params: 7, score: 82, ours: false },
  { name: "Baseline 14B", params: 14, score: 89.5, ours: false },
  { name: "Baseline 32B", params: 32, score: 92, ours: false },
  { name: "Baseline 70B", params: 70, score: 93, ours: false },
];

export function paretoFrontier(models) {
  return models
    .filter(
      (model) =>
        !models.some(
          (other) =>
            other.params <= model.params &&
            other.score >= model.score &&
            (other.params < model.params || other.score > model.score),
        ),
    )
    .sort((a, b) => a.params - b.params);
}

export const mockWeights = [22, 15, 11, 9, 8, 7, 6, 5, 5, 4, 4, 3, 3, 3, 2, 2];
export const mockCurves = Array.from({ length: 21 }, (_, index) => ({
  step: index * 5,
  train: 1.45 * Math.exp(-index / 5) + 0.16,
  validation:
    1.22 * Math.exp(-index / 4) + 0.32 + Math.max(0, index - 12) * 0.009,
  accuracy: 50 + 36 * (1 - Math.exp(-index / 5)) + Math.sin(index * 1.2) * 0.6,
}));

// Separate causal state–query–candidate sequences, omitting role markers and padding.
export const attentionTokens = ["Support", "Oppose", "Unclear"].flatMap((candidate, branch) =>
  ["The", "rent", "cap.", "Stance", "?", candidate, "end"].map((word, position) => ({
    index: branch * 7 + position, position, branch, word,
    role: position < 3 ? "state" : position < 5 ? "query" : "option",
    label: `${candidate} sequence · ${position < 3 ? "State" : position < 5 ? "Query" : "Candidate"}`,
  }))
);
export function canAttend(reader, key) {
  return reader.branch === key.branch && key.position <= reader.position;
}
