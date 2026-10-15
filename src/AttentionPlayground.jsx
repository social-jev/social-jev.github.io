import { useState } from "react";
import { attentionTokens, canAttend } from "./visual-data.js";
const presets = [
  { index: 4, label: "Query" },
  { index: 6, label: "Support readout" },
  { index: 13, label: "Oppose readout" },
  { index: 20, label: "Unclear readout" },
];

export function AttentionPlayground() {
  const [selected, setSelected] = useState(6);
  const [logical, setLogical] = useState(false);
  const reader = attentionTokens[selected];
  const visible = attentionTokens.filter((token) => canAttend(reader, token));
  return (
    <figure className="attention-figure visual-surface">
      <div className="visual-topline">
        <span className="small-label">Separate candidate sequences</span>
        <div
          className="segmented-control"
          role="group"
          aria-label="Position numbering"
        >
          <button aria-pressed={!logical} onClick={() => setLogical(false)}>
            Stored index
          </button>
          <button aria-pressed={logical} onClick={() => setLogical(true)}>
            Position ID
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
                  x={30 + key.index * 14}
                  y={15 + row.index * 14}
                  width="12"
                  height="12"
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
            {[0, 7, 14, 21].map(boundary => <path key={boundary} d={`M${30 + boundary * 14} 15V309 M30 ${15 + boundary * 14}H324`} fill="none" stroke="#738477" strokeWidth="1" />)}
            {attentionTokens.map((token) => (
              <g key={token.index}>
                <text
                  x={37 + token.index * 14}
                  y="324"
                  textAnchor="middle"
                  className="matrix-index"
                >
                  {logical ? token.position : token.index}
                </text>
                <text
                  x="19"
                  y={26 + token.index * 14}
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
            Each token sees only the causal prefix of its own candidate sequence.
            The final token provides the hidden state for the shared scalar head.
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
        Independent causal sequences from the scalar-head inference path. Role markers and padding are omitted. The selected row highlights permitted context; sequence positions restart at zero.
      </figcaption>
    </figure>
  );
}
