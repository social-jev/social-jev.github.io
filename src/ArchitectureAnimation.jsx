import { usePlayback, PlaybackButton } from "./usePlayback.jsx";
const stages = ["Candidate inputs", "Candidate states", "Shared head", "Probabilities"];
const descriptions = [
  "Each candidate is encoded with the same state and query.",
  "Read the final nonpadding hidden state from each candidate sequence.",
  "Apply the same trained linear or MLP head to every candidate state, producing one scalar score per candidate.",
  "Softmax over the scores for this query gives candidate probabilities.",
];
export function ArchitectureAnimation() {
  const playback = usePlayback(4, 3000);
  return <figure className="visual-surface scalar-figure">
    <div className="visual-topline"><strong>Candidate scoring</strong><PlaybackButton {...playback} label="architecture animation" /></div>
    <div className="computation-steps" role="group" aria-label="Candidate scoring steps">{stages.map((stage,i)=><button key={stage} aria-pressed={playback.step===i} onClick={()=>playback.choose(i)}>{stage}</button>)}</div>
    <p className="computation-explanation">{descriptions[playback.step]}</p>
    <div className="scalar-lanes">
      {[['Support','2.0','67%'],['Oppose','1.0','24%'],['Unclear','0.0','9%']].map(([option,score,pct])=><div className="scalar-lane" key={option}>
        <div className="candidate-sequence"><small>State + query</small><strong>{option}</strong><span className={playback.step>=1?'scalar-state active':'scalar-state'}>Final hidden state</span></div>
        <span aria-hidden="true">→</span>
        <div className={playback.step>=2?'scalar-head active':'scalar-head'}><strong>Shared head</strong><small>Linear / MLP</small></div>
        <span aria-hidden="true">→</span>
        <div className="scalar-score"><small>{playback.step===3?'Probability':'Score'}</small><strong>{playback.step===3?pct:playback.step>=2?score:'—'}</strong></div>
      </div>)}
    </div>
    <figcaption className="figure-note">One scalar per candidate; normalization is within each query. Schematic hidden states and illustrative scores.</figcaption>
  </figure>;
}
