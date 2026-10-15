import { readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export async function updateDocVersions(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const versions = entries
    .filter(entry => entry.isDirectory() && /^v\d+\.\d+\.\d+$/.test(entry.name))
    .map(entry => entry.name)
    .sort((a, b) => {
      const left = a.slice(1).split('.').map(Number);
      const right = b.slice(1).split('.').map(Number);
      for (let i = 0; i < 3; i++) {
        if (left[i] !== right[i]) return right[i] - left[i];
      }
      return 0;
    });
  if (!versions.length) return;
  const latest = versions[0];
  await writeFile(resolve(directory, 'versions.json'), `${JSON.stringify({ latest, versions }, null, 2)}\n`);
  await writeFile(resolve(directory, 'index.html'), `<!doctype html>
<html lang="en"><meta charset="utf-8"><title>SocialJev documentation</title>
<meta http-equiv="refresh" content="0;url=./${latest}/">
<a href="./${latest}/">Open the latest SocialJev documentation</a></html>\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await updateDocVersions(resolve(process.argv[2]));
}
