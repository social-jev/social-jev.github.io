#!/usr/bin/env bash
set -euo pipefail

package_dir="$1"
output_dir="$2"
version="$3"

if [[ ! "$version" =~ ^v[0-9]+\.[0-9]+\.[0-9]+(([ab]|rc)[0-9]+)?$ ]]; then
  echo "Invalid documentation version: $version" >&2
  exit 1
fi

destination="$output_dir/docs/$version"
if [[ ! -d "$destination" ]]; then
  echo "Documentation version is not published: $version" >&2
  exit 1
fi

cd "$package_dir"
package_version=$(uv run --no-project python -c \
  'import tomllib; print(tomllib.load(open("pyproject.toml", "rb"))["project"]["version"])')
if [[ "v$package_version" != "$version" ]]; then
  echo "Package version v$package_version does not match requested docs version $version" >&2
  exit 1
fi

build_dir=$(mktemp -d)
trap 'rm -rf "$build_dir"' EXIT

uv sync --locked --group docs
DOCS_VERSION="$version" uv run --group docs mkdocs build \
  --strict --site-dir "$build_dir/site"

rm -rf "$destination"
mv "$build_dir/site" "$destination"
