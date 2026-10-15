import assert from "node:assert/strict";
import test from "node:test";
import {
  attentionTokens,
  canAttend,
  paretoFrontier,
} from "../src/visual-data.js";

test("candidate readouts see their complete sequence and no sibling candidate", () => {
  for (const reader of attentionTokens.filter(token => token.position === 6)) {
    for (const key of attentionTokens) assert.equal(canAttend(reader, key), reader.branch === key.branch);
  }
});
test("each candidate uses causal attention and starts positions at zero", () => {
  for (const reader of attentionTokens) {
    assert.equal(reader.position, reader.index % 7);
    for (const key of attentionTokens) assert.equal(canAttend(reader,key), reader.branch === key.branch && key.position <= reader.position);
  }
});
test("Pareto frontier excludes dominated points and sorts by parameter count", () => {
  const points = [
    { name: "large", params: 10, score: 90 },
    { name: "dominated", params: 5, score: 70 },
    { name: "small", params: 1, score: 80 },
    { name: "same-size worse", params: 10, score: 85 },
  ];
  assert.deepEqual(
    paretoFrontier(points).map((point) => point.name),
    ["small", "large"],
  );
});
