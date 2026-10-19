import { attentionTokens, attentionGroups, canAttend } from "./visual-data.js";
import { usePlayback } from "./usePlayback.jsx";
const groups = attentionGroups.map((group, branch) => ({
  name: group.label, branch, tokens: attentionTokens.filter(token => token.branch === branch),
}));
const rows = [groups];
const boundaries = [0,3,5,7,9,11,13,15];
export function AttentionPlayground() {
  const playback = usePlayback(attentionTokens.length, 1700);
  const selected=(playback.step+10)%attentionTokens.length;
  const reader=attentionTokens[selected];
  return <figure className="attention-figure visual-surface training-mask-figure multi-query-attention">
    <p className="playground-instruction">Select a token to inspect its context. Numbers below tiles are position IDs.</p>
    <div className="training-token-scroll"><div className="training-token-groups">{rows.map((row,i)=><div className="training-token-line" key={i}>{row.map(group=><div key={group.name} className="training-token-group"><span>{group.name}</span><div>{group.tokens.map(token=><button key={token.index} className={`training-token ${token.role} ${canAttend(reader,token)?'visible':'masked'}`} aria-pressed={selected===token.index} aria-label={`${token.label}: ${token.word}, stored slot ${token.index}, position ${token.position}`} onClick={()=>playback.choose((token.index+attentionTokens.length-10)%attentionTokens.length)}><strong>{token.word}</strong><small>{token.position}</small></button>)}</div></div>)}</div>)}</div></div>
    <div className="attention-inspector">
      <div className="matrix-container"><span className="matrix-axis-label">Keys / context →</span>
        <svg viewBox="0 0 540 540" role="img" aria-label={`Training attention mask. Selected reader ${reader.label}, ${reader.word}. Queries cannot see other queries. Options see state and their own query, but no other options.`}>
          {attentionTokens.map(row=>attentionTokens.map(key=><rect key={`${row.index}-${key.index}`} x={32+key.index*32} y={15+row.index*32} width="29" height="29" fill={canAttend(row,key)?row.index===selected?'#305e4d':'#bfd0c2':'#f0f1eb'} />))}
          {boundaries.map(b=><path key={b} d={`M${30+b*32} 13V495 M30 ${13+b*32}H512`} fill="none" stroke="#788b7c" strokeWidth="1" />)}
          {attentionTokens.map(token=><g key={token.index}><text x={46+token.index*32} y="519" textAnchor="middle" className="matrix-index">{token.position}</text><text x="19" y={34+token.index*32} textAnchor="end" className="matrix-index">{token.index}</text></g>)}
        </svg><span className="matrix-footnote">Rows = readers · columns = context · bottom numbers = position IDs</span>
      </div>
      <div className="visibility-detail-stack" style={{ display: "grid" }}>{attentionTokens.map(reader => {
        const visible = attentionTokens.filter(token => canAttend(reader, token));
        return <div className="visibility-detail" key={reader.index} aria-hidden={reader.index !== selected} style={{ visibility: reader.index === selected ? "visible" : "hidden", gridArea: "1 / 1" }}><p className="small-label">Selected token</p><h3>{reader.word}</h3><p className="reader-description">{reader.label} · stored slot {reader.index} · position {reader.position}</p><div className="context-summary"><span>Visible context</span><p>{visible.map(token=>token.word).join(' ')}</p></div><p className="mask-explanation">{reader.role==='option'?`This option sees the state and Query ${reader.query} only, plus its own causal prefix. Other queries and options are masked.`:reader.role==='query'?'This query sees the state and its own causal prefix. Other queries and all options are masked.':'State tokens attend causally within the state.'}</p>{reader.readout&&<div className="training-readout"><span>Final option hidden state</span><span>↓ Shared linear / MLP head</span><strong>One scalar score</strong></div>}</div>;
      })}</div>
    </div>
  </figure>;
}
