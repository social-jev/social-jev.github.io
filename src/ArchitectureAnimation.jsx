import { useState } from "react";
import { usePlayback, PlaybackButton } from "./usePlayback.jsx";
const stages = [
  "Encode the request",
  "Apply the LM head",
  "Select answer codes",
  "Normalize the choices",
];
const descriptions = [
  "The transformer processes the masked request. Each question has an answer-prefix readout location.",
  "The hidden state at that location goes through the pretrained language-model head to obtain vocabulary logits.",
  "Keep the logits for A, B, and C: the letter codes assigned to the candidate answers.",
  "A softmax over those candidate logits yields probabilities for this question. No free-form response is generated.",
];
const positionRows = [
  { name: "Document", physical: [0, 1, 2], logical: [0, 1, 2], type: "state" },
  { name: "Question", physical: [3, 4], logical: [3, 4], type: "query" },
  { name: "Option A", physical: [5, 6], logical: [5, 6], type: "option" },
  { name: "Option B", physical: [7, 8], logical: [5, 6], type: "option" },
  { name: "Answer", physical: [9], logical: [7], type: "answer" },
];

export function ArchitectureAnimation() {
  const [mode, setMode] = useState("head");
  const playback = usePlayback(4, 2600);
  return (
    <figure className="architecture-figure visual-surface">
      <div className="visual-topline">
        <div
          className="segmented-control"
          role="group"
          aria-label="Architecture explanation"
        >
          <button
            aria-pressed={mode === "head"}
            onClick={() => setMode("head")}
          >
            Decision head
          </button>
          <button
            aria-pressed={mode === "positions"}
            onClick={() => setMode("positions")}
          >
            Positions
          </button>
        </div>
        <PlaybackButton {...playback} label="architecture animation" />
      </div>
      {mode === "head" ? (
        <div className="head-animation">
          <div className="readout-sequence">
            <span>Document</span>
            <span>Question</span>
            <span>A · B · C</span>
            <span className="answer-prefix">answer prefix</span>
          </div>
          <div className="head-stages">
            <div
              className={
                playback.step === 0 ? "head-stage current" : "head-stage"
              }
            >
              <span className="stage-label">01 / Backbone</span>
              <h3>Qwen3</h3>
              <p>
                One hidden state
                <br />
                at the answer prefix
              </p>
              <span className="hidden-state">
                h<sub>answer</sub>
              </span>
            </div>
            <div
              className={
                playback.step === 1 ? "head-stage current" : "head-stage"
              }
            >
              <span className="stage-label">02 / Decision head</span>
              <h3>LM head</h3>
              <p>
                Pretrained vocabulary
                <br />
                projection
              </p>
              <div className="vocabulary-strip">
                <span>the</span>
                <span>A</span>
                <span>is</span>
                <span>B</span>
                <span>C</span>
                <span>…</span>
              </div>
            </div>
            <div
              className={
                playback.step >= 2 ? "head-stage current" : "head-stage"
              }
            >
              <span className="stage-label">03 / Candidate codes</span>
              <h3>A · B · C</h3>
              <p>
                Keep the supplied
                <br />
                answer-code logits
              </p>
              <div className="candidate-logits">
                <span>
                  A <b>2.4</b>
                </span>
                <span>
                  B <b>0.1</b>
                </span>
                <span>
                  C <b>−0.6</b>
                </span>
              </div>
            </div>
          </div>
          <div
            className={`normalized-answer ${playback.step === 3 ? "visible-answer" : ""}`}
          >
            <span>softmax(A, B, C)</span>
            <strong>
              {playback.step === 3 ? "A → Support" : "Candidate probabilities"}
            </strong>
            <span>{playback.step === 3 ? "87% · 9% · 4%" : "— · — · —"}</span>
          </div>
          <div
            className="stage-navigation"
            role="group"
            aria-label="Readout animation steps"
          >
            {stages.map((stage, index) => (
              <button
                key={stage}
                aria-pressed={playback.step === index}
                onClick={() => playback.choose(index)}
              >
                <span>0{index + 1}</span>
                {stage}
              </button>
            ))}
          </div>
          <p className="animation-explanation">{descriptions[playback.step]}</p>
        </div>
      ) : (
        <div className="position-animation">
          <div className="position-caption">
            <span>Physical sequence order</span>
            <span>Assigned logical positions</span>
          </div>
          {positionRows.map((row, index) => (
            <div
              key={row.name}
              className={`position-row ${row.type} ${playback.step >= 2 && row.type === "option" ? "position-highlight" : ""}`}
            >
              <span>{row.name}</span>
              <div>
                {row.physical.map((value) => (
                  <span key={value}>{value}</span>
                ))}
              </div>
              <span className="position-arrow" aria-hidden="true">
                →
              </span>
              <div>
                {(playback.step < 2 ? row.physical : row.logical).map(
                  (value) => (
                    <span key={value}>{value}</span>
                  ),
                )}
              </div>
            </div>
          ))}
          <div className="position-takeaway">
            <strong>
              {playback.step < 2
                ? "One stored sequence."
                : "Branches share a starting position."}
            </strong>
            <p>
              {playback.step < 2
                ? "Tokens occupy different physical slots in the request."
                : "Options A and B both start at position 5. The answer prefix follows the longest option, rather than the sum of option lengths."}
            </p>
          </div>
          <button
            className="text-button"
            onClick={() => playback.choose(playback.step < 2 ? 2 : 0)}
          >
            {playback.step < 2
              ? "Show reassigned positions"
              : "Reset positions"}
          </button>
        </div>
      )}
      <figcaption className="figure-note">
        Mechanism follows the released 0.6B LM-head implementation. Tokens are
        schematic; logits and probabilities are illustrative.
      </figcaption>
    </figure>
  );
}
