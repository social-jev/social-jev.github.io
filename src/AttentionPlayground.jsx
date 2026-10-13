import { useState } from "react";
import { attentionTokens, canAttend } from "./visual-data.js";
const presets = [
  { index: 4, label: "Question 1" },
  { index: 6, label: "Option A" },
  { index: 9, label: "Answer 1" },
  { index: 16, label: "Answer 2" },
];

export function AttentionPlayground() {
  const [selected, setSelected] = useState(9);
  const [logical, setLogical] = useState(false);
  const reader = attentionTokens[selected];
  const visible = attentionTokens.filter((token) => canAttend(reader, token));
  return (
    <figure className="attention-figure visual-surface">
      <div className="visual-topline">
        <span className="small-label">Who can see what?</span>
        <div
          className="segmented-control"
          role="group"
          aria-label="Position numbering"
        >
          <button aria-pressed={!logical} onClick={() => setLogical(false)}>
            Physical
          </button>
          <button aria-pressed={logical} onClick={() => setLogical(true)}>
            Logical
          </button>
        </div>
      </div>
      <p className="playground-instruction">
        Select a token. Its visible context lights up below.
      </p>
      <div className="token-scroll">
        <div
          className="attention-token-strip"
          role="group"
          aria-label="Select a reader token"
        >
          {attentionTokens.map((token) => (
            <button
              key={token.index}
              className={`token ${token.role} ${canAttend(reader, token) ? "token-visible" : "token-hidden"}`}
              aria-pressed={selected === token.index}
              aria-label={`Token ${token.index}: ${token.word}, ${token.label}`}
              onClick={() => setSelected(token.index)}
            >
              <span>{token.word}</span>
              <small>{logical ? token.position : token.index}</small>
            </button>
          ))}
        </div>
      </div>
      <div className="attention-inspector">
        <div className="matrix-container">
          <span className="matrix-axis-label">Keys / context →</span>
          <svg
            viewBox="0 0 340 340"
            role="img"
            aria-label={`Schematic attention mask. Highlighted row: token ${selected}, ${reader.word}. Green cells are permitted attention.`}
          >
            {attentionTokens.map((row) =>
              attentionTokens.map((key) => (
                <rect
                  key={`${row.index}-${key.index}`}
                  x={30 + key.index * 17}
                  y={15 + row.index * 17}
                  width="14"
                  height="14"
                  rx="1"
                  fill={
                    canAttend(row, key)
                      ? row.index === selected
                        ? "#305e4d"
                        : "#bfd0c2"
                      : row.index === selected
                        ? "#ebe6d9"
                        : "#f0f1eb"
                  }
                  stroke={row.index === selected ? "#8b9e8c" : "none"}
                  strokeWidth=".5"
                />
              )),
            )}
            {attentionTokens.map((token) => (
              <g key={token.index}>
                <text
                  x={37 + token.index * 17}
                  y="324"
                  textAnchor="middle"
                  className="matrix-index"
                >
                  {logical ? token.position : token.index}
                </text>
                <text
                  x="19"
                  y={26 + token.index * 17}
                  textAnchor="end"
                  className="matrix-index"
                >
                  {token.index}
                </text>
              </g>
            ))}
          </svg>
          <span className="matrix-footnote">
            Rows = readers · columns = context tokens
          </span>
        </div>
        <div className="visibility-detail" aria-live="polite">
          <p className="small-label">Selected reader</p>
          <h3>{reader.word}</h3>
          <p className="reader-description">
            {reader.label} · physical {reader.index} · position{" "}
            {reader.position}
          </p>
          <div className="context-summary">
            <span>Visible context</span>
            <p>{visible.map((token) => token.word).join(" ")}</p>
          </div>
          <p className="mask-explanation">
            {reader.role === "answer"
              ? "The answer prefix sees its document, its own question, and all candidate options for that question."
              : reader.role === "option"
                ? "An option sees the document, its own question, and its own prefix. Sibling options remain isolated."
                : reader.role === "query"
                  ? "A question sees the document and its own prefix. Other questions remain isolated."
                  : "Document tokens attend causally within the document."}
          </p>
          <div
            className="attention-presets"
            role="group"
            aria-label="Example reader positions"
          >
            {presets.map((preset) => (
              <button
                key={preset.index}
                aria-pressed={selected === preset.index}
                onClick={() => setSelected(preset.index)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="figure-note">
        Schematic mask from the released full-context LM-head path, without
        examples, role markers, or padding. Dark green highlights one reader’s
        allowed context.
      </figcaption>
    </figure>
  );
}
