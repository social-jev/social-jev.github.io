const tasks = [
  { name: "Topic presence", definition: "Whether a specified subject is discussed.", passage: "Construction of 20,000 homes began last year.", question: "Does the passage discuss housing affordability, rather than housing construction alone?", options: ["Yes", "No"], answer: "No" },
  { name: "Stance", definition: "Support for or opposition to a specified target.", passage: "Remote working is convenient, but we oppose making it the default.", question: "What position does the passage express on making remote work the default?", options: ["Supports", "Opposes", "No position expressed"], answer: "Opposes" },
  { name: "Sentiment", definition: "An assessment of a subject or a particular aspect.", passage: "Hospitals provide excellent treatment, although appointments are difficult to book.", question: "Considering treatment quality rather than access to appointments, what assessment of hospitals is expressed?", options: ["Positive", "Negative", "Mixed", "No assessment"], answer: "Positive" },
  { name: "Framing", definition: "The perspective used to present or justify an issue.", passage: "Renewable energy creates skilled jobs and strengthens domestic industry.", question: "Is investment in renewable energy justified by economic benefits, such as jobs or domestic industry?", options: ["Yes", "No", "Unclear"], answer: "Yes" },
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
      <div className="task-example-body">
        <div className="example-state"><div className="small-label">State</div><p>{task.passage}</p></div>
        <div className="example-query"><div className="small-label">Query</div><p>{task.question}</p></div>
        <div className="example-options"><div className="small-label">Options</div><ul>{task.options.map(option => {
          const correct = option === task.answer;
          return <li key={option} className={correct ? "correct-option" : "incorrect-option"}><span>{option}</span><span className="option-status"><svg viewBox="0 0 16 16" aria-hidden="true"><path d={correct ? "m3 8 3 3 7-7" : "m4 4 8 8M12 4l-8 8"} /></svg>{correct ? "Correct" : "Incorrect"}</span></li>;
        })}</ul></div>
        <p className="example-answer-note">Colours indicate the correct answer for this example, rather than a live model prediction.</p>
      </div>
    </details>)}</div>
  </details>;
}
