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
          <div className="candidate-mask-grid">
            {["Support", "Oppose", "Unclear"].map((candidate, branch) => {
              const tokens = attentionTokens.filter(token => token.branch === branch);
              return <div key={candidate} className="candidate-mask">
                <strong>{candidate}</strong>
                <svg viewBox="0 0 180 190" role="img" aria-label={`${candidate}: separate causal sequence, positions zero through six`}>
                  {tokens.map(row => tokens.map(key => <rect key={`${row.index}-${key.index}`} x={28+key.position*20} y={20+row.position*20} width="18" height="18" fill={canAttend(row,key) ? row.index===selected ? "#305e4d" : "#bfd0c2" : "#f0f1eb"} />))}
                  {[0,3,5,7].map(boundary=><path key={boundary} d={`M${28+boundary*20} 20V160 M28 ${20+boundary*20}H168`} fill="none" stroke="#738477" strokeWidth="1" />)}
                  {tokens.map(token=><g key={token.index}><text x={37+token.position*20} y="178" textAnchor="middle" className="matrix-index">{token.position}</text><text x="19" y={33+token.position*20} textAnchor="end" className="matrix-index">{token.position}</text></g>)}
                </svg>
                <small>State 0–2 · query 3–4 · candidate 5–6</small>
              </div>;
            })}
          </div>
          <span className="matrix-footnote">
            Each square is a separate input · rows = readers · columns = context tokens
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
