"""Exercise documentation corrections with a real uv and MkDocs build."""

import subprocess
import tempfile
from pathlib import Path


def run(*args, cwd):
    return subprocess.run(args, cwd=cwd, capture_output=True, text=True)


script = Path(__file__).resolve().parents[1] / "scripts/rebuild-docs.sh"

with tempfile.TemporaryDirectory(prefix="socialjev-docs-correction-") as directory:
    root = Path(directory)
    package = root / "package"
    docs = package / "docs"
    docs.mkdir(parents=True)
    output = root / "published"
    destination = output / "docs/v0.1.0a3"
    destination.mkdir(parents=True)
    (destination / "index.html").write_text("Original docs")
    (destination / "obsolete.html").write_text("Obsolete page")
    (output / "index.html").write_text("Website")
    older = output / "docs/v0.1.0a2"
    older.mkdir()
    (older / "index.html").write_text("Older docs")
    manifest = output / "docs/versions.json"
    manifest.write_text('{"latest":"v0.1.0a3","versions":["v0.1.0a3","v0.1.0a2"]}')

    project = package / "pyproject.toml"
    project_text = '''[project]
name = "docs-correction-fixture"
version = "0.1.0a3"
requires-python = ">=3.12"

[dependency-groups]
docs = ["mkdocs==1.6.1"]
'''
    project.write_text(project_text)
    config = package / "mkdocs.yml"
    config_text = "site_name: Test\nhooks: [hooks.py]\nnav:\n  - Home: index.md\n"
    config.write_text(config_text)
    (package / "hooks.py").write_text('''import os
def on_config(config):
    config.site_url = "https://social-jev.github.io/docs/" + os.environ["DOCS_VERSION"] + "/"
    return config
''')
    (docs / "index.md").write_text("# Corrected documentation\n")

    result = run("uv", "lock", cwd=package)
    assert result.returncode == 0, result.stderr

    def rebuild(version="v0.1.0a3"):
        return run("bash", str(script), str(package), str(output), version, cwd=root)

    def published_files():
        return {str(p.relative_to(output)): p.read_bytes() for p in output.rglob("*") if p.is_file()}

    original = published_files()
    project.write_text(project_text.replace('version = "0.1.0a3"', 'version = "0.1.0a4"'))
    result = rebuild()
    assert result.returncode != 0
    assert "does not match" in result.stderr, result.stderr
    assert published_files() == original
    project.write_text(project_text)

    config.write_text(config_text + "  - Missing: missing.md\n")
    result = rebuild()
    assert result.returncode != 0
    assert "strict mode" in result.stdout + result.stderr, result.stderr
    assert published_files() == original
    config.write_text(config_text)

    result = rebuild()
    assert result.returncode == 0, result.stderr
    html = (destination / "index.html").read_text()
    assert "Corrected documentation" in html
    assert 'href="https://social-jev.github.io/docs/v0.1.0a3/"' in html
    assert not (destination / "obsolete.html").exists()
    assert (output / "index.html").read_text() == "Website"
    assert (older / "index.html").read_text() == "Older docs"
    assert manifest.read_bytes() == original["docs/versions.json"]

    corrected = published_files()
    result = rebuild("v0.1.0a9")
    assert result.returncode != 0
    assert "not published" in result.stderr
    assert published_files() == corrected
    result = rebuild("../v0.1.0a3")
    assert result.returncode != 0
    assert "Invalid documentation version" in result.stderr
    assert published_files() == corrected

print("Documentation correction e2e passed")
