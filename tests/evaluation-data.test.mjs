import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluation, evaluationModels } from '../src/evaluation-data.js';
import { paretoFrontier } from '../src/visual-data.js';

test('all ten measured models have size metadata and scores on 512 queries', () => {
  assert.equal(evaluationModels.length, 10);
  assert.equal(evaluation.limit, 512);
  for (const model of evaluationModels) {
    assert.ok(model.name);
    assert.ok(model.params > 0);
    assert.equal(model.evaluated, 512);
    assert.equal(model.skipped, 0);
    assert.equal(Number.isInteger(model.accuracy * 512), true);
    assert.equal(model.score, model.accuracy * 100);
  }
  assert.deepEqual(evaluationModels.filter(model => model.ours).sort((a, b) => a.params - b.params).map(model => Math.round(model.accuracy * 512)), [492, 499, 502]);
});

test('estimated Jev size retains asterisk placement and ends the displayed frontier', () => {
  const estimated = evaluationModels.filter(model => model.estimated);
  assert.equal(estimated.length, 1);
  assert.equal(estimated[0].name, 'TypeSafe Jev*');
  assert.equal(estimated[0].params, 9);
  const frontier = paretoFrontier(evaluationModels);
  assert.deepEqual(frontier.map(model => model.name), ['GLiNER 2.5-Decide', 'SocialJev 0.6B', 'SocialJev 1.7B', 'SocialJev 4B', 'TypeSafe Jev*']);
});
