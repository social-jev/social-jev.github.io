import { examples } from "./examples.js";
import { usePlayback, PlaybackButton } from "./usePlayback.jsx";

export function ApplicationAnimation() {
  const playback = usePlayback(examples.length * 3, 1800);
  const index = Math.floor(playback.step / 3);
  const phase = playback.step % 3;
  const example = examples[index];
  return (
    <figure className="application-animation visual-surface">
      <div className="visual-topline">
        <span className="small-label">
          Classification request and response
        </span>
        <PlaybackButton {...playback} label="application animation" />
      </div>
      <div className="application-flow" key={example.id}>
        <div className="flow-input">
          <div className="small-label">01 / Input</div>
          <div className="input-document">
            <span>State — text to classify</span>
            <p>{example.document}</p>
          </div>
          <div className="input-query">
            <span>Query — classification question</span>
            <p>{example.question}</p>
          </div>
          <div className="input-options">
            <span>Candidate answers</span>
            <p>{example.options.join(" · ")}</p>
          </div>
        </div>
        <div className={`flow-model ${phase === 1 ? "processing" : ""}`}>
          <span className="flow-arrow" aria-hidden="true">
            →
          </span>
          <div className="model-core">
            <span className="model-wordmark">SocialJev</span>
            <span>
              {phase === 0
                ? "Read the input"
                : phase === 1
                  ? "Score the choices"
                  : "Return probabilities"}
            </span>
            <div className="model-activity" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          </div>
          <span className="flow-arrow" aria-hidden="true">
            →
          </span>
        </div>
        <div className={`flow-output ${phase === 2 ? "output-revealed" : ""}`}>
          <div className="small-label">02 / Output</div>
          <span className="output-caption">Highest-probability answer</span>
          <p className="output-choice">
            {phase === 2 ? example.selected : "…"}
          </p>
          <div className="score-bars">
            {example.options.map((option, optionIndex) => (
              <div key={option}>
                <span>{option}</span>
                <div>
                  <i
                    style={{
                      width:
                        phase === 2 ? `${[83, 11, 6][optionIndex]}%` : "0%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <span className="simulated-output">Simulated output</span>
        </div>
      </div>
      <div className="animation-footer">
        <div
          className="scene-selector"
          role="group"
          aria-label="Application scenes"
        >
          {examples.map((item, i) => (
            <button
              key={item.id}
              aria-pressed={index === i}
              onClick={() => playback.choose(i * 3 + 2)}
            >
              {item.title}
            </button>
          ))}
        </div>
        <span className="scene-count">
          0{index + 1} / 0{examples.length}
        </span>
      </div>
      <figcaption className="figure-note">
        Illustrative examples and simulated outputs. No inference runs in your
        browser.
      </figcaption>
    </figure>
  );
}
