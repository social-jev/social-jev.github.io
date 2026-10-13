import assert from "node:assert/strict";
import test from "node:test";
import {
  attentionTokens,
  canAttend,
  paretoFrontier,
} from "../src/visual-data.js";

test("options share positions while remaining isolated from sibling options", () => {
  const optionA = attentionTokens[6],
    optionB = attentionTokens[8];
  assert.equal(optionA.position, optionB.position);
  assert.ok(canAttend(optionA, attentionTokens[2]));
  assert.ok(canAttend(optionA, attentionTokens[4]));
  assert.ok(canAttend(optionA, attentionTokens[5]));
  assert.ok(!canAttend(optionB, optionA));
  assert.ok(!canAttend(optionA, optionB));
  assert.ok(!canAttend(attentionTokens[5], optionA));
});
test("an answer sees all own candidates but none of the other question", () => {
  const answer = attentionTokens[9];
  for (const token of attentionTokens.slice(0, 10))
    assert.ok(canAttend(answer, token));
  for (const token of attentionTokens.slice(10))
    assert.ok(!canAttend(answer, token));
  assert.ok(canAttend(attentionTokens[16], attentionTokens[2]));
  assert.ok(!canAttend(attentionTokens[16], answer));
});
test("document and query context stays causal and branch-local", () => {
  assert.ok(!canAttend(attentionTokens[0], attentionTokens[1]));
  assert.ok(!canAttend(attentionTokens[3], attentionTokens[4]));
  assert.ok(!canAttend(attentionTokens[4], attentionTokens[10]));
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
