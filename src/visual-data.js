// Dataset weights remain illustrative.
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

// Packed full-context training path from mert/main/src/mert/attention.py.
export const attentionGroups = [
  {label:"State",role:"state",words:["The","rent","cap"],offset:0,query:null},
  {label:"Query 1",role:"query",words:["Stance","?"],offset:3,query:1},
  {label:"Q1 · Option 1",role:"option",words:["Support","end"],offset:5,query:1},
  {label:"Q1 · Option 2",role:"option",words:["Oppose","end"],offset:5,query:1},
  {label:"Query 2",role:"query",words:["Topic","?"],offset:3,query:2},
  {label:"Q2 · Option 1",role:"option",words:["Housing","end"],offset:5,query:2},
  {label:"Q2 · Option 2",role:"option",words:["Transport","end"],offset:5,query:2},
];
export const attentionTokens=attentionGroups.flatMap((group,branch)=>group.words.map((word,i)=>({
  label:group.label,role:group.role,word,branch,query:group.query,position:group.offset+i,
  readout:group.role==="option" && i===group.words.length-1,
}))).map((token,index)=>({...token,index}));
export function canAttend(reader,key) {
  if(reader.branch===key.branch) return key.index<=reader.index;
  if(reader.role==="state") return false;
  if(key.role==="state") return true;
  return reader.role==="option" && key.role==="query" && reader.query===key.query;
}
