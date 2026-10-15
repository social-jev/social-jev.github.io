import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { updateDocVersions } from '../scripts/update-doc-versions.mjs';

test('version manifest sorts releases numerically and preserves existing pages', async () => {
  const root = await mkdtemp(join(tmpdir(), 'social-jev-docs-'));
  try {
    for (const version of ['v0.9.0', 'v0.10.0', 'v0.11.0rc1']) await mkdir(join(root, version));
    await writeFile(join(root, 'v0.9.0', 'index.html'), 'older docs');
    await updateDocVersions(root);
    assert.deepEqual(JSON.parse(await readFile(join(root, 'versions.json'), 'utf8')), {
      latest: 'v0.10.0', versions: ['v0.10.0', 'v0.9.0'],
    });
    assert.match(await readFile(join(root, 'index.html'), 'utf8'), /url=\.\/v0\.10\.0\//);
    assert.equal(await readFile(join(root, 'v0.9.0', 'index.html'), 'utf8'), 'older docs');
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('docs placeholder remains until the first stable release', async () => {
  const root = await mkdtemp(join(tmpdir(), 'social-jev-docs-'));
  try {
    await writeFile(join(root, 'index.html'), 'placeholder');
    await updateDocVersions(root);
    assert.equal(await readFile(join(root, 'index.html'), 'utf8'), 'placeholder');
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
