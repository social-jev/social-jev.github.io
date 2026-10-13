import { useState } from "react";
import { examples } from "./examples.js";

export function ClassificationExample() {
  const [active, setActive] = useState(examples[0]);
  return (
    <div className="example-workbench">
      <div
        className="example-tabs"
        role="group"
        aria-label="Classification examples"
      >
        {examples.map((example) => (
          <button
            key={example.id}
            aria-pressed={active.id === example.id}
            onClick={() => setActive(example)}
          >
            {example.title}
          </button>
        ))}
      </div>
      <div className="example-content" aria-live="polite" aria-atomic="true">
        <div className="document-panel">
          <div className="panel-label">
            <span>01</span> Document
          </div>
          <p className="document-source">{active.source}</p>
          <p className="document-text">{active.document}</p>
        </div>
        <div className="question-panel">
          <div className="panel-label">
            <span>02</span> Research question
          </div>
          <p>{active.question}</p>
        </div>
        <div className="answers-panel">
          <div className="panel-label">
            <span>03</span> Candidate answers
          </div>
          <ul>
            {active.options.map((option) => (
              <li
                key={option}
                className={option === active.selected ? "selected-answer" : ""}
              >
                <span>{option}</span>
                {option === active.selected && (
                  <span className="answer-status">Example label</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="figure-note">
        <span className="note-mark">i</span> Illustrative examples. These labels
        are not live model predictions.
      </p>
    </div>
  );
}
