import { paretoFrontier, mockCurves } from "./visual-data.js";
import { evaluationModels, evaluation } from "./evaluation-data.js";

export function ParetoChart() {
  const x = value => 80 + Math.log10(value / 0.23) / Math.log10(1500 / 0.23) * 790;
  const y = value => 440 - (value - 60) / 42 * 350;
  const frontier = paretoFrontier(evaluationModels);
  return (
    <figure className="chart-figure visual-surface measured-evaluation">
      <div className="visual-topline">
        <span className="small-label">Accuracy × model size</span>
      </div>
      <div className="pareto-scroll">
        <svg className="pareto-chart" viewBox="0 0 920 530" role="img" aria-labelledby="pareto-title pareto-desc">
          <title id="pareto-title">Classification accuracy and total model size</title>
          <desc id="pareto-desc">Classification accuracy on the internal SocialJevBench benchmark. TypeSafe Jev model size is estimated; see the note below.</desc>
          {[60, 70, 80, 90, 100].map(value => (
            <g key={value}>
              <line x1="80" x2="870" y1={y(value)} y2={y(value)} className="chart-grid" />
              <text x="63" y={y(value) + 6} textAnchor="end" className="axis-text">{value}</text>
            </g>
          ))}
          {[0.3, 1, 3, 10, 30, 100, 300, 1000].map(value => (
            <g key={value}>
              <line x1={x(value)} x2={x(value)} y1="440" y2="448" className="chart-axis" />
              <text x={x(value)} y="474" textAnchor="middle" className="axis-text">{value}</text>
            </g>
          ))}
          <line x1="80" x2="870" y1="440" y2="440" className="chart-axis" />
          <text x="475" y="515" textAnchor="middle" className="axis-title">Total parameters (billions · log scale)</text>
          <text transform="translate(24 265) rotate(-90)" textAnchor="middle" className="axis-title">Query-weighted accuracy (%)</text>
          <polyline points={frontier.map(point => `${x(point.params)},${y(point.score)}`).join(' ')} className="frontier-line" />
          {evaluationModels.map(point => (
            <g key={point.model}>
              <title>{point.name}: {point.score.toFixed(2)}% accuracy; {point.params}B{point.estimated ? ' illustrative size placement' : ' total parameters'}</title>
              <circle cx={x(point.params)} cy={y(point.score)} r={point.ours ? 8 : 6} className={point.ours ? 'ours-point' : 'baseline-point'} />
              <text x={x(point.params) + point.dx} y={y(point.score) + point.dy} textAnchor={point.anchor || 'start'} className={point.ours ? 'ours-label' : 'baseline-label'}>{point.name}</text>
            </g>
          ))}
        </svg>
      </div>
      <div className="chart-legend">
        <span><i className="legend-dot ours" />SocialJev</span>
        <span><i className="legend-dot baseline" />Reference models</span>
        <span><i className="legend-line" />Pareto frontier</span>
      </div>
      <figcaption className="figure-note">
        SocialJevBench ({evaluation.revision}).
        <br />
        * Jev size is estimated. <a href="https://jevresearch.github.io/Jev-Research/">API analysis ↗</a>
      </figcaption>
    </figure>
  );
}

function Curve({ metric }) {
  const isLoss = metric === "loss";
  const x = (step) => 45 + step * 2.65;
  const y = (value) =>
    isLoss ? 210 - (value / 1.8) * 160 : 210 - ((value - 40) / 60) * 160;
  const ticks = isLoss ? [0, 0.5, 1, 1.5] : [40, 60, 80, 100];
  const path = (key) =>
    mockCurves
      .map(
        (point, index) =>
          `${index ? "L" : "M"}${x(point.step)},${y(point[key])}`,
      )
      .join(" ");
  return (
    <svg
      viewBox="0 0 340 260"
      role="img"
      aria-label={`Simulated ${isLoss ? "training and validation loss" : "validation accuracy"} curve. Not actual training results.`}
    >
      {ticks.map((value) => (
        <g key={value}>
          <line
            x1="45"
            x2="310"
            y1={y(value)}
            y2={y(value)}
            className="chart-grid"
          />
          <text x="34" y={y(value) + 4} textAnchor="end" className="axis-text">
            {value}
          </text>
        </g>
      ))}
      {[0, 25, 50, 75, 100].map((step) => (
        <text
          key={step}
          x={x(step)}
          y="233"
          textAnchor="middle"
          className="axis-text"
        >
          {step}
        </text>
      ))}
      <text x="178" y="255" textAnchor="middle" className="axis-title">
        Optimizer step
      </text>
      <text x="175" y="142" textAnchor="middle" className="curve-watermark">
        SIMULATED
      </text>
      <path
        d={path(isLoss ? "train" : "accuracy")}
        className="training-curve"
      />
      {isLoss && <path d={path("validation")} className="validation-curve" />}
    </svg>
  );
}

export function TrainingCharts() {
  return (
    <figure className="training-figure visual-surface">
      <div className="visual-topline">
        <span className="small-label">The objective & learning curves</span>
        <span className="mock-label">Simulated curves</span>
      </div>
      <div className="objective-strip">
        <span>Cross-entropy on the correct choice</span>
        <span className="objective-equation">L = −log p(correct answer)</span>
      </div>
      <div className="learning-curves">
        <div>
          <h3>Loss</h3>
          <Curve metric="loss" />
          <div className="chart-legend">
            <span>
              <i className="legend-line green" />
              Train
            </span>
            <span>
              <i className="legend-line warm" />
              Validation
            </span>
          </div>
        </div>
        <div>
          <h3>Validation accuracy</h3>
          <Curve metric="accuracy" />
        </div>
      </div>
      <figcaption className="figure-note">
        Synthetic curves demonstrate the intended figures. They do not describe
        the released checkpoint or an actual training run.
      </figcaption>
    </figure>
  );
}
