import assert from "node:assert/strict";
import test from "node:test";
import { examples, datasets, filterDatasets } from "../src/examples.js";

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

test("domain filters form a complete non-overlapping partition of the mixture", () => {
  const categories = [...new Set(datasets.map((dataset) => dataset.category))];
  assert.equal(filterDatasets("All domains").length, 16);
  const partition = categories.flatMap((category) => filterDatasets(category));
  assert.equal(partition.length, datasets.length);
  assert.equal(
    new Set(partition.map((dataset) => dataset.slug)).size,
    datasets.length,
  );
  for (const category of categories)
    assert.ok(
      filterDatasets(category).every(
        (dataset) => dataset.category === category,
      ),
    );
});
