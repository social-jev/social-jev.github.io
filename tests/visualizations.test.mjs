import assert from "node:assert/strict";
import test from "node:test";
import {
  attentionTokens,
  canAttend,
  paretoFrontier,
} from "../src/visual-data.js";

test("training options share positions and read state/query without sibling leakage", () => {
  const first=attentionTokens[6],second=attentionTokens[8];
  assert.equal(first.position,second.position);
  assert.ok(first.readout && second.readout);
  for(const reader of [first,second]) {
    for(const token of attentionTokens.slice(0,5)) assert.ok(canAttend(reader,token));
    for(const token of attentionTokens.filter(t=>t.role==="option")) assert.equal(canAttend(reader,token),reader.branch===token.branch);
  }
});
test("training mask is causal within each message and cannot read future roles", () => {
  for(const reader of attentionTokens) {
    for(const key of attentionTokens.filter(t=>t.branch===reader.branch)) assert.equal(canAttend(reader,key),key.index<=reader.index);
  }
  assert.ok(!canAttend(attentionTokens[0],attentionTokens[3]));
  assert.ok(!canAttend(attentionTokens[4],attentionTokens[5]));
  assert.deepEqual(attentionTokens.map(t=>t.position),[0,1,2,3,4,5,6,5,6,3,4,5,6,5,6]);
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


test("queries are isolated and each option reads only its own query", () => {
  const queries=attentionTokens.filter(token=>token.role==='query');
  for (const reader of queries) {
    for (const key of queries.filter(token=>token.query!==reader.query)) assert.equal(canAttend(reader,key),false);
  }
  for (const reader of attentionTokens.filter(token=>token.role==='option')) {
    for (const key of queries) assert.equal(canAttend(reader,key),reader.query===key.query);
  }
});
