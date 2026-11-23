export function UsageCode() {
  return <>
    <span className="syntax-keyword">{"from"}</span>
    {" social_jev "}
    <span className="syntax-keyword">{"import"}</span>
    {" "}
    <span className="syntax-class">{"Query"}</span>
    {", "}
    <span className="syntax-class">{"Request"}</span>
    {", "}
    <span className="syntax-class">{"SocialJev"}</span>
    {"\n\nmodel = "}
    <span className="syntax-class">{"SocialJev"}</span>
    {"."}
    <span className="syntax-function">{"from_pretrained"}</span>
    {"(\n    "}
    <span className="syntax-string">{"\"social-jev/social-jev-0.6B-preview\""}</span>
    {"\n)\n\nrequest = "}
    <span className="syntax-class">{"Request"}</span>
    {"(\n    state="}
    <span className="syntax-string">{"\"The council expanded the bus network.\""}</span>
    {",\n    queries=["}
    <span className="syntax-class">{"Query"}</span>
    {"(\n        text="}
    <span className="syntax-string">{"\"Which policy area does this document concern?\""}</span>
    {",\n        options=["}
    <span className="syntax-string">{"\"Transport\""}</span>
    {", "}
    <span className="syntax-string">{"\"Education\""}</span>
    {", "}
    <span className="syntax-string">{"\"Healthcare\""}</span>
    {"],\n    )],\n)\n\nresult = model."}
    <span className="syntax-function">{"query"}</span>
    {"(request)["}
    <span className="syntax-number">{"0"}</span>
    {"]["}
    <span className="syntax-number">{"0"}</span>
    {"]\nresult.choice         "}
    <span className="syntax-comment">{"# Selected candidate answer"}</span>
    {"\nresult.probabilities  "}
    <span className="syntax-comment">{"# dict[str, float]"}</span>
  </>;
}

const pythonTokens = /(#.*)|("[^"\n]*")|\b(from|import|with|as|lambda|None)\b|\b(\d+)\b|\b([A-Za-z_]\w*)(?=\()/g;

export function HighlightedPython({ code }) {
  const parts = [];
  let end = 0;
  for (const match of code.matchAll(pythonTokens)) {
    const [, comment, string, keyword, number, call] = match;
    const kind = comment ? "comment" : string ? "string" : keyword ? "keyword"
      : number ? "number" : /^[A-Z]/.test(call) ? "class" : "function";
    parts.push(code.slice(end, match.index));
    parts.push(<span key={match.index} className={`syntax-${kind}`}>{match[0]}</span>);
    end = match.index + match[0].length;
  }
  parts.push(code.slice(end));
  return parts;
}
