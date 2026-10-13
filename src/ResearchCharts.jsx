import { mockModels, paretoFrontier, mockCurves } from "./visual-data.js";

export function ParetoChart() {
  const x = (value) =>
    65 +
    ((Math.log10(value) - Math.log10(0.25)) /
      (Math.log10(100) - Math.log10(0.25))) *
      610;
  const y = (value) => 330 - ((value - 55) / 45) * 270;
  const frontier = paretoFrontier(mockModels);
  return (
    <figure className="chart-figure visual-surface">
      <div className="visual-topline">
        <span className="small-label">Performance × model size</span>
        <span className="mock-label">Simulated results</span>
      </div>
      <div className="pareto-scroll">
        <svg
          className="pareto-chart"
          viewBox="0 0 740 405"
          role="img"
          aria-labelledby="pareto-title pareto-desc"
        >
          <title id="pareto-title">
            Illustrative Pareto comparison — all performance values are invented
          </title>
          <desc id="pareto-desc">
            A layout demonstration comparing three social-jev sizes and generic
            baselines. These are not measured benchmark results.
          </desc>
          {[60, 70, 80, 90, 100].map((value) => (
            <g key={value}>
              <line
                x1="65"
                x2="675"
                y1={y(value)}
                y2={y(value)}
                className="chart-grid"
              />
              <text
                x="51"
                y={y(value) + 4}
                textAnchor="end"
                className="axis-text"
              >
                {value}
              </text>
            </g>
          ))}
          {[0.3, 1, 3, 10, 30, 100].map((value) => (
            <g key={value}>
              <line
                x1={x(value)}
                x2={x(value)}
                y1="330"
                y2="336"
                className="chart-axis"
              />
              <text
                x={x(value)}
                y="355"
                textAnchor="middle"
                className="axis-text"
              >
                {value}
              </text>
            </g>
          ))}
          <line x1="65" x2="675" y1="330" y2="330" className="chart-axis" />
          <text x="370" y="390" textAnchor="middle" className="axis-title">
            Parameters (billions, log scale)
          </text>
          <text
            transform="translate(18 198) rotate(-90)"
            textAnchor="middle"
            className="axis-title"
          >
            Macro F1 (%)
          </text>
          <text x="365" y="215" textAnchor="middle" className="chart-watermark">
            LAYOUT DEMO
          </text>
          <polyline
            points={frontier
              .map((point) => `${x(point.params)},${y(point.score)}`)
              .join(" ")}
            className="frontier-line"
          />
          {mockModels.map((point) => (
            <g key={point.name}>
              <circle
                cx={x(point.params)}
                cy={y(point.score)}
                r={point.ours ? 8 : 5}
                className={point.ours ? "ours-point" : "baseline-point"}
              />
              <text
                x={
                  x(point.params) +
                  (point.params > 60 ? -10 : point.ours ? 0 : 9)
                }
                y={
                  y(point.score) +
                  (point.ours ? -20 : point.params > 60 ? -10 : 18)
                }
                textAnchor={
                  point.params > 60 ? "end" : point.ours ? "middle" : "start"
                }
                className={point.ours ? "ours-label" : "baseline-label"}
              >
                {point.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="chart-legend">
        <span>
          <i className="legend-dot ours" />
          social-jev
        </span>
        <span>
          <i className="legend-dot baseline" />
          Baselines
        </span>
        <span>
          <i className="legend-line" />
          Illustrative Pareto frontier
        </span>
      </div>
      <figcaption className="figure-note">
        Every performance value is invented for this draft. The 1.7B and 4B
        models remain planned. No benchmark claim is made.
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
