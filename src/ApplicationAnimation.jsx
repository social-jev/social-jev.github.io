import { examples } from "./examples.js";
import { usePlayback } from "./usePlayback.jsx";

export function ApplicationAnimation() {
  const playback = usePlayback(examples.length * 3, 2200);
  const index = Math.floor(playback.step / 3);
  const phase = playback.step % 3;
  const example = examples[index];
  const probabilities = [83, 11, 6];
  return <figure className="application-animation visual-surface refined-application" aria-label="Classification request and result">
    <div className="request-result-flow" key={example.id}>
      <div className="request-box">
        <h3>Request</h3>
        <div className="request-state"><h4>State</h4><p>{example.document}</p></div>
        <div className="request-query"><h4>Query</h4><p>{example.question}</p></div>
        <div className="request-options"><h4>Options</h4><ul>{(example.optionText || example.options).map(option=><li key={option}>{option}</li>)}</ul></div>
      </div>
      <div className={`request-model ${phase===1?'scoring':''}`}><span aria-hidden="true">→</span><div>SocialJev</div><span aria-hidden="true">→</span></div>
      <div className="result-box"><h3>Result</h3>
        <div className="result-probabilities">{example.options.map((option,i)=><div className="result-probability" key={option}>
          <div><span>{option}</span><strong>{phase===2?`${probabilities[i]}%`:'—'}</strong></div>
          <div className="result-track"><i className={i===0?'winning':''} style={{width:phase===2?`${probabilities[i]}%`:'0%'}} /></div>
        </div>)}</div>
      </div>
    </div>
  </figure>;
}
