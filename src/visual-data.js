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

// Message fragments are schematic: each displayed word stands for one token.
const groups = [
  {
    id: "state",
    label: "Document",
    role: "state",
    query: null,
    words: ["The", "rent", "cap."],
    offset: 0,
  },
  {
    id: "q1",
    label: "Question 1",
    role: "query",
    query: 1,
    words: ["Stance", "?"],
    offset: 3,
  },
  {
    id: "a1",
    label: "Option A",
    role: "option",
    query: 1,
    words: ["A:", "Support"],
    offset: 5,
  },
  {
    id: "b1",
    label: "Option B",
    role: "option",
    query: 1,
    words: ["B:", "Oppose"],
    offset: 5,
  },
  {
    id: "r1",
    label: "Answer 1",
    role: "answer",
    query: 1,
    words: ["answer"],
    offset: 7,
  },
  {
    id: "q2",
    label: "Question 2",
    role: "query",
    query: 2,
    words: ["Topic", "?"],
    offset: 3,
  },
  {
    id: "a2",
    label: "Option A",
    role: "option",
    query: 2,
    words: ["A:", "Housing"],
    offset: 5,
  },
  {
    id: "b2",
    label: "Option B",
    role: "option",
    query: 2,
    words: ["B:", "Trade"],
    offset: 5,
  },
  {
    id: "r2",
    label: "Answer 2",
    role: "answer",
    query: 2,
    words: ["answer"],
    offset: 7,
  },
];
export const attentionTokens = groups
  .flatMap((group) =>
    group.words.map((word, index) => ({
      ...group,
      word,
      position: group.offset + index,
    })),
  )
  .map((token, index) => ({ ...token, index }));

export function canAttend(reader, key) {
  if (reader.id === key.id) return key.index <= reader.index;
  if (reader.role === "state") return false;
  if (key.role === "state") return true;
  if (reader.query !== key.query) return false;
  if (reader.role === "query") return false;
  if (key.role === "query") return true;
  return reader.role === "answer" && key.role === "option";
}
