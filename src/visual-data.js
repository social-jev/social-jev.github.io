// Dataset weights and training curves remain illustrative.
export function paretoFrontier(models) {
  return models
    .filter(
      (model) =>
        !models.some(
          (other) =>
            other.params <= model.params &&
            other.score >= model.score &&
            (other.params < model.params || other.score > model.score),
        ),
    )
    .sort((a, b) => a.params - b.params);
}

export const mockWeights = [22, 15, 11, 9, 8, 7, 6, 5, 5, 4, 4, 3, 3, 3, 2, 2];
export const mockCurves = Array.from({ length: 21 }, (_, index) => ({
  step: index * 5,
  train: 1.45 * Math.exp(-index / 5) + 0.16,
  validation:
    1.22 * Math.exp(-index / 4) + 0.32 + Math.max(0, index - 12) * 0.009,
  accuracy: 50 + 36 * (1 - Math.exp(-index / 5)) + Math.sin(index * 1.2) * 0.6,
}));

// Packed full-context training path from mert/main/src/mert/attention.py.
const groups = [
  {label:"State",role:"state",words:["The","rent","cap"],offset:0},
  {label:"Query",role:"query",words:["Stance","?"],offset:3},
  {label:"Option 1",role:"option",words:["Support","end"],offset:5},
  {label:"Option 2",role:"option",words:["Oppose","end"],offset:5},
];
export const attentionTokens=groups.flatMap((group,branch)=>group.words.map((word,i)=>({
  label:group.label,role:group.role,word,branch,position:group.offset+i,
  readout:group.role==="option" && i===group.words.length-1,
}))).map((token,index)=>({...token,index}));
export function canAttend(reader,key) {
  if(reader.branch===key.branch) return key.index<=reader.index;
  if(reader.role==="state") return false;
  if(key.role==="state") return true;
  return reader.role==="option" && key.role==="query";
}
