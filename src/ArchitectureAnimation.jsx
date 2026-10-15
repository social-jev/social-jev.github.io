import { usePlayback } from "./usePlayback.jsx";
const options = [
  {name:"Support", x:270, values:["0.3","−0.8","…"], score:"2.0", percent:67},
  {name:"Oppose", x:390, values:["−0.2","0.9","…"], score:"1.0", percent:24},
  {name:"Unclear", x:510, values:["0.1","−0.3","…"], score:"0.0", percent:9},
];
const tokens=["State","Query","Support","end","Oppose","end","Unclear","end"];
export function ArchitectureAnimation() {
  const {step}=usePlayback(5,2000);
  return <figure className="visual-surface model-cutaway" aria-label="SocialJev: transformer residual streams, final option hidden states, shared decision head, and normalized probabilities">
    <div className="cutaway-scroll" role="region" aria-label="Model computation diagram" tabIndex="0">
      <svg className="cutaway-svg" viewBox="0 0 640 1080" role="img" aria-labelledby="cutaway-title cutaway-desc">
        <title id="cutaway-title">Classification inside SocialJev</title>
        <desc id="cutaway-desc">Request tokens pass through transformer layers. The final hidden state at each option’s end token goes through the same Decision Head, producing a scalar score. Softmax within the query gives probabilities. Vector values and scores are schematic.</desc>
        <defs><marker id="cutaway-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#305e4d" /></marker></defs>
        <rect x="248" y="8" width="144" height="48" rx="5" className="closed-model-box" /><text x="320" y="39" className="closed-model-label">Request</text>
        <path d="M320 56V88" className="cutaway-arrow" />
        <rect x="12" y="90" width="616" height="896" rx="6" className="model-outline" /><text x="36" y="120" className="model-name">SocialJev</text>
        {options.map((option,i)=><g key={option.name}><path d={`M${210+i*120-28} 152V143H${270+i*120+28}V152`} className="cutaway-bracket" /><text x={240+i*120} y="136" className="option-group-label">{option.name}</text></g>)}
        {tokens.map((token,i)=>{const x=90+i*60;return <g key={i}>
          <path d={`M${x} 199V${i===3||i===5||i===7?456:434}`} className={i===3||i===5||i===7?`residual-stream selected-stream ${step===1?'current':''}`:'residual-stream'} />
          <rect x={x-28} y="158" width="56" height="41" rx="3" className={i===0?'state-tile':i===1?'query-tile':'option-tile'} /><text x={x} y="184" className="token-label">{token}</text>
        </g>;})}
        {[235,300,365].map((y,i)=><g key={y} className={step===0?'cutaway-active':''}><rect x="65" y={y} width="505" height="36" rx="3" className="transformer-layer" /><text x="317" y={y+24} className="layer-label">Transformer layer {i+1}</text></g>)}
        <path d="M226 457H218V490Q218 507 208 507Q218 507 218 524V557H226" className="hidden-state-brace" />
        <text x="38" y="499" className="brace-label">Final hidden</text><text x="38" y="523" className="brace-label">states</text>
        {options.map(option=><g key={option.name}>
          {option.values.map((value,i)=><g key={i} className={step===1?'cutaway-active':''}><rect x={option.x-25} y={457+i*34} width="50" height="34" className="vector-cell" /><text x={option.x} y={480+i*34} className="vector-value">{value}</text></g>)}
          <text x={option.x} y="589" className="candidate-label">{option.name}</text><path d={`M${option.x} 603V635`} className="cutaway-arrow" />
        </g>)}
        <g className={step===2?'cutaway-active':''}><rect x="222" y="637" width="337" height="46" rx="3" className="decision-head" /><text x="390" y="667" className="head-label">Decision Head</text></g>
        {options.map(option=><g key={option.name}><path d={`M${option.x} 683V707`} className="cutaway-arrow" /><rect x={option.x-28} y="710" width="56" height="36" rx="3" className="score-cell" /><text x={option.x} y="735" className="score-label">{option.score}</text><path d={`M${option.x} 746V771`} className="cutaway-arrow" /></g>)}
        <g className={step===3?'cutaway-active':''}><rect x="222" y="774" width="337" height="36" rx="3" className="decision-head" /><text x="390" y="798" className="head-label">softmax</text></g>
        {options.map(option=><g key={option.name}><path d={`M${option.x} 810V830`} className="cutaway-arrow" /><text x={option.x} y="856" className="probability-label">{option.percent}%</text><rect x={option.x-20} y={944-option.percent} width="40" height={option.percent} rx="2" className={step===4?'probability-column current':'probability-column'} /><text x={option.x} y="970" className="candidate-label">{option.name}</text></g>)}
        <path d="M230 944H550" className="cutaway-bracket" /><path d="M320 986V1014" className="cutaway-arrow" /><rect x="248" y="1018" width="144" height="48" rx="5" className="closed-model-box" /><text x="320" y="1049" className="closed-model-label">Result</text>
      </svg>
    </div>
  </figure>;
}
