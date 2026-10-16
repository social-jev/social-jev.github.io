import { useState } from "react";
import { hierarchy, treemap } from "d3-hierarchy";
import { datasets } from "./examples.js";
import mixture from "./data/training-mixture.json";
const colors = {
  "Politics & policy": "#d8e5dc",
  "Media & society": "#e4e7ef",
  "Institutions & economy": "#eee2c9",
};
const shortNames = {
  mfrc: "MFRC",
  "social-bias-frames": "Bias frames",
  "measuring-hate-speech": "Hate speech",
  "environmental-claims": "Env. claims",
};
const sample = datasets.map((dataset) => ({
  ...dataset,
  value: mixture.datasets[dataset.slug].questions,
}));
const categories = [...new Set(sample.map((dataset) => dataset.category))];
const root = hierarchy({
  children: categories.map((category) => ({
    name: category,
    children: sample.filter((dataset) => dataset.category === category),
  })),
})
  .sum((node) => node.value || 0)
  .sort((a, b) => b.value - a.value);
const tiles = treemap()
  .size([760, 390])
  .paddingInner(4)
  .paddingOuter(0)(root)
  .leaves();

export function MixtureTreemap() {
  const [selected, setSelected] = useState(sample[0]);
  const total = sample.reduce((sum, item) => sum + item.value, 0);
  return (
    <figure className="mixture-figure visual-surface">
      <div className="visual-topline">
        <span className="small-label">Share of training questions</span>
      </div>
      <div
        className="treemap"
        role="group"
        aria-label="Dataset composition by the number of labelled training questions."
      >
        {tiles.map((tile) => (
          <button
            key={tile.data.slug}
            className={tile.y1 - tile.y0 < 65 ? "compact-tile" : ""}
            onClick={() => setSelected(tile.data)}
            aria-label={tile.data.name}
            aria-pressed={selected.slug === tile.data.slug}
            title={`${tile.data.name}: ${((tile.data.value / total) * 100).toFixed(1)}% of training questions`}
            style={{
              left: `${tile.x0 / 7.6}%`,
              top: `${tile.y0 / 3.9}%`,
              width: `${(tile.x1 - tile.x0) / 7.6}%`,
              height: `${(tile.y1 - tile.y0) / 3.9}%`,
              background: colors[tile.data.category],
            }}
          >
            <span>{shortNames[tile.data.slug] || tile.data.name}</span>
            {tile.x1 - tile.x0 > 120 && tile.y1 - tile.y0 > 80 && (
              <small>{((tile.data.value / total) * 100).toFixed(1)}%</small>
            )}
          </button>
        ))}
      </div>
      <div className="chart-legend">
        {categories.map((category) => (
          <span key={category}>
            <i
              className="legend-square"
              style={{ background: colors[category] }}
            />
            {category}
          </span>
        ))}
      </div>
      <div className="dataset-detail" aria-live="polite">
        <div>
          <strong>{selected.name}</strong>
          <span>{selected.topic}</span>
        </div>
        <span>
          {((selected.value / total) * 100).toFixed(1)}%{" "}
          <small>of training questions</small>
        </span>
        <a href={`https://huggingface.co/datasets/social-jev/${selected.slug}`}>
          Dataset ↗
        </a>
      </div>
      <figcaption className="figure-note">
        Rectangle areas represent each dataset’s share of training questions.
      </figcaption>
    </figure>
  );
}
