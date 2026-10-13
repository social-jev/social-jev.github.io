import { useState } from "react";
import { datasets, filterDatasets } from "./examples.js";
const categories = [
  "All domains",
  ...new Set(datasets.map((dataset) => dataset.category)),
];

export function DataSection() {
  const [category, setCategory] = useState("All domains");
  const visible = filterDatasets(category);
  return (
    <section id="data" className="chapter data-section">
      <div className="section-heading">
        <p className="eyebrow">02 / The data</p>
        <h2>
          Many domains.
          <br />A common language.
        </h2>
        <p>
          Documents, research questions, and candidate answers give different
          classification tasks a shared format.
        </p>
      </div>
      <div className="dataset-explorer">
        <div className="explorer-header">
          <span className="small-label">The 0.6B v1 training mixture</span>
          <span className="dataset-total">16 datasets</span>
        </div>
        <div className="filter-tabs" role="group" aria-label="Dataset domains">
          {categories.map((item) => (
            <button
              key={item}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">
          {visible.length} datasets shown
        </p>
        <div className="dataset-list">
          {visible.map((dataset) => (
            <a
              key={dataset.slug}
              href={`https://huggingface.co/datasets/social-jev/${dataset.slug}`}
              target="_blank"
              rel="noreferrer"
            >
              <span>{dataset.name}</span>
              <span>{dataset.topic}</span>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <p className="figure-note">
          Sources listed in the released checkpoint’s{" "}
          <a href="https://huggingface.co/social-jev/social-jev-0.6B-v1/blob/main/training_config.toml">
            training configuration
          </a>
          . See each dataset for provenance and terms.
        </p>
      </div>
    </section>
  );
}
