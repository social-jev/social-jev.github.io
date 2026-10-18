const tasks = [
  { name: "Topic presence", definition: "Whether a specified subject is discussed.", passage: "Construction of 20,000 homes began last year.", question: "Does this discuss housing affordability?", answer: "No" },
  { name: "Stance", definition: "Support for or opposition to a specified target.", passage: "Remote working is convenient, but we oppose making it the default.", question: "Making remote work the default", answer: "Opposes" },
  { name: "Sentiment", definition: "An assessment of a subject or a particular aspect.", passage: "Hospitals provide excellent treatment, although appointments are difficult to book.", question: "Assessment of treatment quality", answer: "Positive" },
  { name: "Framing", definition: "The perspective used to present or justify an issue.", passage: "Renewable energy creates skilled jobs and strengthens domestic industry.", question: "Is renewable energy justified by economic benefits?", answer: "Yes" },
];
function Chevron() {
  return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>;
}
export function EvaluationExamples() {
  return <details className="evaluation-examples">
    <summary className="examples-summary">
      <span><span className="examples-title">Task definitions and examples</span><span className="examples-subtitle">Four tasks · abbreviated, stylized examples</span></span>
      <span className="examples-toggle"><span className="when-closed">Show all tasks</span><span className="when-open">Hide all tasks</span><Chevron /></span>
    </summary>
    <div className="examples-body">{tasks.map(task => <details className="task-example" key={task.name}>
      <summary><span className="task-name">{task.name}</span><span className="task-definition">{task.definition}</span><span className="example-toggle"><span className="when-closed">Show example</span><span className="when-open">Hide example</span><Chevron /></span></summary>
      <div className="task-example-body"><span className="small-label">Passage</span><p>“{task.passage}”</p><div className="example-decision"><span>{task.question}</span><strong>{task.answer}</strong></div></div>
    </details>)}</div>
  </details>;
}
