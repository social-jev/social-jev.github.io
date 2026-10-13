import { useState } from "react";
import { usePlayback, PlaybackButton } from "./usePlayback.jsx";
import { attentionTokens, canAttend } from "./visual-data.js";

const tokens = attentionTokens.slice(0, 10);
const stages = ["Attention", "Position IDs", "Unembedding", "Choose an answer"];
const descriptions = [
  "Select any tile. Solid tiles are visible to it; faded tiles are masked. Each option sees the document and question, but not the other option.",
  "Storage order keeps increasing. Position IDs do not: both options occupy positions 5–6. The answer starts at 7, after the longest option.",
  "At the answer prefix, take the final hidden vector h. Multiply by the pretrained unembedding matrix Wᵤ, exactly as in normal next-token prediction.",
  "Keep the vocabulary logits for the answer-code tokens A and B. Softmax over just these logits gives probabilities for the supplied choices.",
];
const vocabulary = [
  { word: "the", value: "−0.8" },
  { word: "A", value: "2.4", choice: true },
  { word: "is", value: "0.6" },
  { word: "B", value: "0.1", choice: true },
  { word: "…", value: "…" },
];

export function ArchitectureAnimation() {
  const playback = usePlayback(4, 5000);
  const [selected, setSelected] = useState(6);
  const reader = tokens[playback.step >= 2 ? 9 : selected];
  return (
    <figure className="architecture-figure visual-surface computation-figure">
      <div className="visual-topline">
        <strong>One sequence → one answer vector → vocabulary logits</strong>
        <PlaybackButton {...playback} label="architecture animation" />
      </div>
      <div className="computation-body">
        <div className="computation-steps" role="group" aria-label="Architecture steps">
          {stages.map((stage, index) => <button key={stage} aria-pressed={playback.step === index} onClick={() => playback.choose(index)}><span>0{index + 1}</span>{stage}</button>)}
        </div>
        <p className="computation-explanation">{descriptions[playback.step]}</p>
        <div className="sequence-scroll" tabIndex="0" role="region" aria-label="Token sequence with storage indices and position IDs">
          <div className="computation-sequence">
            <div className="tile-axis"><span>Stored slot</span><strong>Token</strong><span>Position ID</span></div>
            {tokens.map((token) => {
              const visible = canAttend(reader, token);
              return <button key={token.index} className={`computation-token ${token.role} ${visible ? "attends" : "masked"} ${reader.index === token.index ? "reader" : ""} ${playback.step === 1 && token.role === "option" ? "reused" : ""}`} aria-pressed={reader.index === token.index} aria-label={`${token.label}: ${token.word}, stored slot ${token.index}, position ${token.position}${visible ? ", visible to selected token" : ", masked"}`} onClick={() => { setSelected(token.index); playback.choose(playback.step < 2 ? playback.step : 0); }}>
                <span>{token.index}</span><strong>{token.word}</strong><span>{token.position}</span><small>{token.role === "answer" ? "Readout" : token.role === "option" ? token.id === "a1" ? "Option A" : "Option B" : token.label}</small>
              </button>;
            })}
          </div>
        </div>
        <p className="tile-key">Selected: <strong>{reader.label} · {reader.word}</strong> <span>Solid = visible · faded = masked · outlined = selected</span></p>
        <div className={`unembedding-flow ${playback.step >= 2 ? "active" : "waiting"}`}>
          <div className="answer-vector"><span>Answer hidden state</span><strong>h<sub>answer</sub></strong><div aria-hidden="true">▥ ▥ ▥ ▥</div><small>Transformer output</small></div>
          <span className="math-operator" aria-hidden="true">×</span>
          <div className="unembedding-matrix"><span>Pretrained unembedding</span><strong>W<sub>u</sub></strong><div className="matrix-grid" aria-hidden="true">{Array.from({length: 24}, (_, i) => <i key={i} className={i % 6 === 1 || i % 6 === 3 ? "code-column" : ""} />)}</div><small>Hidden dimension × vocabulary</small></div>
          <span className="math-operator" aria-hidden="true">→</span>
          <div className="vocabulary-logits"><span>Vocabulary logits</span>{vocabulary.map(entry => <div key={entry.word} className={entry.choice ? "code-logit" : "other-logit"}><b>{entry.word}</b><span>{entry.value}</span></div>)}</div>
        </div>
        <div className={`choice-readout ${playback.step === 3 ? "revealed" : ""}`}>
          <span>Gather A, B → softmax([2.4, 0.1])</span>
          <div><strong>A · Support <b>91%</b></strong><span>B · Oppose <b>9%</b></span></div>
        </div>
      </div>
      <figcaption className="figure-note">Schematic tokens omit role markers and examples. Uses the normal LM unembedding head, fine-tuned with the backbone. Logits and probabilities are illustrative.</figcaption>
    </figure>
  );
}
