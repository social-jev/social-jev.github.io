import assert from "node:assert/strict";
import test from "node:test";
import { examples, datasets } from "../src/examples.js";

test("every example changes document, question and candidate labels together", () => {
  assert.equal(
    new Set(examples.map((example) => example.document)).size,
    examples.length,
  );
  for (const example of examples) {
    assert.ok(example.options.includes(example.selected));
    assert.ok(example.question.endsWith("?"));
    assert.equal(new Set(example.options).size, example.options.length);
  }
});

test("dataset catalogue has distinct entries for the treemap", () => {
  assert.equal(datasets.length, 16);
  assert.equal(
    new Set(datasets.map((dataset) => dataset.slug)).size,
    datasets.length,
  );
});
