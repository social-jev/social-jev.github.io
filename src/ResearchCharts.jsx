import { paretoFrontier } from "./visual-data.js";
import { evaluationModels, evaluation } from "./evaluation-data.js";

export function ParetoChart() {
  const x = value => 80 + Math.log10(value / 0.23) / Math.log10(1500 / 0.23) * 790;
  const y = value => 440 - (value - 50) / 52 * 350;
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
          {[50, 60, 70, 80, 90, 100].map(value => (
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
          <text transform="translate(24 265) rotate(-90)" textAnchor="middle" className="axis-title">Accuracy</text>
          <polyline points={frontier.map(point => `${x(point.params)},${y(point.score)}`).join(' ')} className="frontier-line" />
          {evaluationModels.map(point => (
            <g key={point.model}>
              <title>{point.name}{point.ours ? ' (preview)' : ''}: {point.score.toFixed(2)}% accuracy; {point.params}B{point.estimated ? ' illustrative size placement' : ' total parameters'}</title>
              <line x1={x(point.params)} y1={y(point.score)} x2={x(point.params) + point.dx + (point.anchor === 'end' ? 6 : -6)} y2={y(point.score) + point.dy - 6} className={point.ours ? 'chart-label-connector ours-connector' : 'chart-label-connector'} />
              <circle cx={x(point.params)} cy={y(point.score)} r={point.ours ? 8 : 6} className={point.ours ? 'ours-point' : 'baseline-point'} />
              <text x={x(point.params) + point.dx} y={y(point.score) + point.dy} textAnchor={point.anchor || 'start'} className={point.ours ? 'ours-label' : 'baseline-label'}>{point.name}{point.ours && <tspan className="preview-label"> (preview)</tspan>}</text>
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
