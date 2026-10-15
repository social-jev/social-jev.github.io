#!/usr/bin/env bash
set -euo pipefail

package_dir="$1"
output_dir="$2"
cd "$package_dir"

# A release notification also picks up versions missed by earlier notifications.
while IFS= read -r version; do
  [[ "$version" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]] || continue
  [[ ! -d "$output_dir/docs/$version" ]] || continue
  git merge-base --is-ancestor "$version" origin/main || continue
  git cat-file -e "$version:mkdocs.yml" 2>/dev/null || continue
  git checkout --detach "$version"
  uv sync --locked --group docs
  build_dir=$(mktemp -d)
  trap 'rm -rf "$build_dir"' EXIT
  DOCS_VERSION="$version" uv run --group docs mkdocs build --strict --site-dir "$build_dir/site"
  mkdir -p "$output_dir/docs"
  mv "$build_dir/site" "$output_dir/docs/$version"
  rm -rf "$build_dir"
done < <(git tag --list 'v*' --sort=version:refname)
