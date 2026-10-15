import { attentionTokens, canAttend } from "./visual-data.js";
import { usePlayback } from "./usePlayback.jsx";
const groups = [{name:'State',start:0,end:3},{name:'Query',start:3,end:5},{name:'Option 1',start:5,end:7},{name:'Option 2',start:7,end:9}];
export function AttentionPlayground() {
  const playback = usePlayback(attentionTokens.length, 1700);
  const selected=playback.step;
  const reader=attentionTokens[selected];
  const visible=attentionTokens.filter(token=>canAttend(reader,token));
  return <figure className="attention-figure visual-surface training-mask-figure">
    <div className="visual-topline"><span className="small-label">Packed training sequence · linear / MLP head</span></div>
    <p className="playground-instruction">Select a token to inspect its context. Numbers below tiles are position IDs.</p>
    <div className="training-token-scroll"><div className="training-token-groups">{groups.map(group=><div key={group.name} className="training-token-group"><span>{group.name}</span><div>{attentionTokens.slice(group.start,group.end).map(token=><button key={token.index} className={`training-token ${token.role} ${canAttend(reader,token)?'visible':'masked'}`} aria-pressed={selected===token.index} aria-label={`${token.label}: ${token.word}, stored slot ${token.index}, position ${token.position}`} onClick={()=>playback.choose(token.index)}><strong>{token.word}</strong><small>{token.position}</small></button>)}</div></div>)}</div></div>
    <div className="attention-inspector">
      <div className="matrix-container"><span className="matrix-axis-label">Keys / context →</span>
        <svg viewBox="0 0 340 350" role="img" aria-label={`Training attention mask. Selected reader ${reader.label}, ${reader.word}. Options see state and query but not sibling options.`}>
          {attentionTokens.map(row=>attentionTokens.map(key=><rect key={`${row.index}-${key.index}`} x={32+key.index*32} y={15+row.index*32} width="29" height="29" fill={canAttend(row,key)?row.index===selected?'#305e4d':'#bfd0c2':'#f0f1eb'} />))}
          {[0,3,5,7,9].map(b=><path key={b} d={`M${30+b*32} 13V303 M30 ${13+b*32}H320`} fill="none" stroke="#788b7c" strokeWidth="1" />)}
          {attentionTokens.map(token=><g key={token.index}><text x={46+token.index*32} y="323" textAnchor="middle" className="matrix-index">{token.position}</text><text x="19" y={34+token.index*32} textAnchor="end" className="matrix-index">{token.index}</text></g>)}
        </svg><span className="matrix-footnote">Rows = readers · columns = context · bottom numbers = position IDs</span>
      </div>
      <div className="visibility-detail" aria-live="off"><p className="small-label">Selected token</p><h3>{reader.word}</h3><p className="reader-description">{reader.label} · stored slot {reader.index} · position {reader.position}</p><div className="context-summary"><span>Visible context</span><p>{visible.map(token=>token.word).join(' ')}</p></div><p className="mask-explanation">{reader.role==='option'?'This option sees the state, its query, and its own causal prefix. Sibling options are masked.':reader.role==='query'?'The query sees the state and its own causal prefix.':'State tokens attend causally within the state.'}</p>{reader.readout&&<div className="training-readout"><span>Final option hidden state</span><span>↓ Shared linear / MLP head</span><strong>One scalar score</strong></div>}</div>
    </div>
    <figcaption className="figure-note">Training mask and positions follow MERT’s full-context scalar-head path. Options start at the same position. Role markers, padding, and optional examples are omitted.</figcaption>
  </figure>;
}
