import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const script = resolve('scripts/build-release-docs.sh');
test('release build skips historical tags, preserves versions, and retries failed builds', async () => {
  const root = await mkdtemp(join(tmpdir(), 'social-jev-release-'));
  const repo = join(root, 'package');
  const output = join(root, 'published');
  const bin = join(root, 'bin');
  try {
    await Promise.all([mkdir(repo), mkdir(bin), mkdir(output)]);
    const git = (...args) => {
      const result = spawnSync('git', args, { cwd: repo, encoding: 'utf8' });
      assert.equal(result.status, 0, result.stderr);
    };
    git('init', '-b', 'main');
    git('config', 'user.name', 'Test');
    git('config', 'user.email', 'test@example.com');
    await writeFile(join(repo, 'package.txt'), 'package');
    git('add', '.'); git('commit', '-m', 'Historical package'); git('tag', 'v0.1.0');
    await writeFile(join(repo, 'mkdocs.yml'), 'site_name: Test');
    git('add', '.'); git('commit', '-m', 'Add docs');
    for (const version of ['v0.1.0a2', 'v0.2.0b1', 'v0.2.0rc1', 'v0.2.0']) git('tag', version);
    git('update-ref', 'refs/remotes/origin/main', 'main');
    await writeFile(join(bin, 'uv'), `#!/usr/bin/env bash
set -eu
if [[ "$1" == sync ]]; then exit 0; fi
while [[ "$1" != --site-dir ]]; do shift; done
mkdir -p "$2"
echo "$DOCS_VERSION" > "$2/index.html"
if [[ "\${FAIL_BUILD:-}" == 1 ]]; then exit 1; fi
`, { mode: 0o755 });
    const build = fail => spawnSync('bash', [script, repo, output], {
      env: { ...process.env, PATH: `${bin}:${process.env.PATH}`, FAIL_BUILD: fail ? '1' : '' },
      encoding: 'utf8',
    });
    assert.notEqual(build(true).status, 0);
    await assert.rejects(access(join(output, 'docs/v0.2.0')));
    const result = build(false);
    assert.equal(result.status, 0, result.stderr);
    for (const version of ['v0.1.0a2', 'v0.2.0b1', 'v0.2.0rc1', 'v0.2.0']) {
      assert.equal(await readFile(join(output, `docs/${version}/index.html`), 'utf8'), `${version}\n`);
    }
    await assert.rejects(access(join(output, 'docs/v0.1.0')));
    assert.equal(build(true).status, 0, 'existing release must not rebuild');
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
