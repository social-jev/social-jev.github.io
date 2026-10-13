import { useEffect, useState } from "react";
import { ClassificationExample } from "./ClassificationExample.jsx";
import { DataSection } from "./DataSection.jsx";
const modelUrl = "https://huggingface.co/social-jev/social-jev-0.6B-v1";
const packageUrl = "https://github.com/DGoettlich/social-jev";
const chapters = ["Models", "Data", "Training", "Evaluation", "Package"];
const loadingCode = `from transformers import AutoModel

model = AutoModel.from_pretrained(
    "social-jev/social-jev-0.6B-v1",
    trust_remote_code=True,
)

# Use model.query(...) for classification.
# See the model card for the interface.`;

function PackageSection() {
  const [copyStatus, setCopyStatus] = useState("");
  async function copyCode() {
    try {
      await navigator.clipboard.writeText(loadingCode);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }
  return (
    <section id="package" className="chapter package-section">
      <div className="section-heading">
        <p className="eyebrow">05 / The Python package</p>
        <h2>
          Part of your
          <br />
          research workflow.
        </h2>
        <p>
          A Python interface for working with social-jev models. Start with the
          released checkpoint; package documentation is on its way.
        </p>
        <a className="text-link" href="/docs/">
          Package documentation <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="code-example">
        <div className="code-header">
          <span>Load the 0.6B checkpoint</span>
          <button onClick={copyCode}>
            {copyStatus === "copied" ? "Copied" : "Copy code"}
          </button>
        </div>
        <pre>
          <code>{loadingCode}</code>
        </pre>
        <p role="status" className="copy-status">
          {copyStatus === "failed"
            ? "Copy unavailable. Select and copy the code above."
            : copyStatus === "copied"
              ? "Code copied to clipboard."
              : "Uses the custom model code in the released checkpoint."}
        </p>
        <div className="code-links">
          <a href={modelUrl}>
            Read the model card <span aria-hidden="true">↗</span>
          </a>
          <a href={packageUrl}>
            Explore the package <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function App() {
  const [activeChapter, setActiveChapter] = useState("models");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActiveChapter(entry.target.id);
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    document
      .querySelectorAll("section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a className="wordmark" href="#">
          social-jev<span className="wordmark-dot">.</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#models">Models</a>
          <a href="#data">Data</a>
          <a href="#evaluation">Evaluation</a>
          <a href="/docs/">
            Docs <span aria-hidden="true">↗</span>
          </a>
        </nav>
        <a className="header-source" href={packageUrl}>
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              Classification foundation models for social science
            </p>
            <h1 id="hero-title">
              Your questions.
              <br />
              Your labels.
              <br />
              <em>One shared model.</em>
            </h1>
            <p className="hero-intro">
              Turn text into structured evidence. Bring your documents, research
              questions, and candidate answers.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#models">
                Explore the models <span aria-hidden="true">↓</span>
              </a>
              <a className="text-link" href="#package">
                Use in Python <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="release-note">
              <span className="availability-dot" /> 0.6B v1 checkpoint available{" "}
              <a href={modelUrl}>
                View release <span aria-hidden="true">↗</span>
              </a>
            </p>
          </div>
          <ClassificationExample />
        </section>
        <nav className="chapter-nav" aria-label="Page sections">
          {chapters.map((chapter, index) => (
            <a
              key={chapter}
              href={`#${chapter.toLowerCase()}`}
              aria-current={
                activeChapter === chapter.toLowerCase() ? "location" : undefined
              }
            >
              <span>0{index + 1}</span>
              {chapter}
            </a>
          ))}
        </nav>
        <section id="models" className="chapter models-section">
          <div className="section-heading">
            <p className="eyebrow">01 / The models</p>
            <h2>
              A family of models.
              <br />A shared purpose.
            </h2>
            <p>
              Classification with questions and answer choices supplied as text.
              The first checkpoint is available to explore.
            </p>
          </div>
          <div className="model-list">
            <article className="model-release available">
              <div className="model-topline">
                <span className="small-label">social-jev</span>
                <span className="release-state">Available · v1</span>
              </div>
              <h3>
                0.6<span>B</span>
              </h3>
              <p>
                Qwen3-0.6B backbone
                <br />
                Fine-tuned for classification
              </p>
              <a className="text-link" href={modelUrl}>
                Explore checkpoint <span aria-hidden="true">↗</span>
              </a>
            </article>
            {[
              ["1.7", "A larger member of the family."],
              ["4", "Scaling the shared approach."],
            ].map(([size, description]) => (
              <article key={size} className="model-release planned">
                <div className="model-topline">
                  <span className="small-label">social-jev</span>
                  <span className="release-state">Planned</span>
                </div>
                <h3>
                  {size}
                  <span>B</span>
                </h3>
                <p>
                  {description}
                  <br />
                  Release details forthcoming
                </p>
                <span className="planned-note">In the research roadmap</span>
              </article>
            ))}
            <p className="figure-note model-size-note">
              Model names refer to backbone size. See the model card for
              checkpoint details.
            </p>
          </div>
        </section>
        <DataSection />
        <section id="training" className="chapter training-section">
          <div className="section-heading">
            <p className="eyebrow">03 / The training</p>
            <h2>
              Learn the task.
              <br />
              Keep the context.
            </h2>
            <p>
              The released 0.6B model adapts a pretrained transformer to
              multiple-choice classification, using its language-model head.
            </p>
            <a
              className="text-link"
              href={`${modelUrl}/blob/main/training_config.toml`}
            >
              Inspect the training recipe <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="training-details">
            <div className="training-steps">
              <article>
                <span className="step-number">01</span>
                <h3>Start with language.</h3>
                <p>
                  A pretrained Qwen3 backbone brings representations learned
                  from text.
                </p>
              </article>
              <article>
                <span className="step-number">02</span>
                <h3>Learn across tasks.</h3>
                <p>
                  Documents, questions, and candidate answers share a
                  classification format.
                </p>
              </article>
              <article>
                <span className="step-number">03</span>
                <h3>Compare the answers.</h3>
                <p>
                  Training updates the backbone and language-model head to score
                  the supplied choices.
                </p>
              </article>
            </div>
            <dl className="recipe-facts">
              <div>
                <dt>Training mixture</dt>
                <dd>16 datasets</dd>
              </div>
              <div>
                <dt>Sequence length</dt>
                <dd>2,048 tokens</dd>
              </div>
              <div>
                <dt>Optimizer updates</dt>
                <dd>100</dd>
              </div>
              <div>
                <dt>Global batch</dt>
                <dd>64</dd>
              </div>
            </dl>
            <p className="figure-note">
              Recipe for 0.6B v1, as reported in its model card. Training
              settings are not benchmark results.
            </p>
          </div>
        </section>
        <section id="evaluation" className="chapter evaluation-section">
          <div className="section-heading">
            <p className="eyebrow">04 / The evaluation</p>
            <h2>
              Evidence before
              <br />
              claims.
            </h2>
            <p>
              How well does it transfer? How does it compare? Benchmark results
              will be published with the tasks, metrics, and evaluation
              protocol.
            </p>
            <a className="text-link" href={modelUrl}>
              Current release evidence <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="evaluation-content">
            <div className="evaluation-heading">
              <span className="small-label">Benchmark comparisons</span>
              <span className="pending-status">Evaluation pending</span>
            </div>
            <div className="benchmark-table-wrap">
              <table>
                <caption className="sr-only">
                  Publication status of planned benchmark comparisons
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Model family</th>
                    <th scope="col">Task performance</th>
                    <th scope="col">Inference cost</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    "social-jev",
                    "Size-matched baselines",
                    "Frontier baselines",
                  ].map((model) => (
                    <tr key={model}>
                      <th scope="row">{model}</th>
                      <td>Pending</td>
                      <td>Pending</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="evaluation-note">
              The 0.6B model card reports validation accuracy used for
              checkpoint selection. That is separate from held-out benchmark
              comparisons; the card says the test split was not evaluated for
              that run.
            </p>
            <p className="figure-note">
              No comparative benchmark scores are presented here.
            </p>
          </div>
        </section>
        <PackageSection />
        <section className="closing">
          <p className="eyebrow">
            A shared foundation. Questions that are yours.
          </p>
          <h2>
            Bring your next
            <br />
            research question.
          </h2>
          <a className="button primary" href={modelUrl}>
            Explore social-jev <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>
      <footer className="site-footer">
        <div>
          <a className="wordmark" href="#">
            social-jev<span className="wordmark-dot">.</span>
          </a>
          <p>Classification foundation models for social science.</p>
        </div>
        <nav aria-label="Resources">
          <a href={packageUrl}>Package</a>
          <a href="https://huggingface.co/social-jev">Models & data</a>
          <a href="/docs/">Documentation</a>
          <a href="https://github.com/social-jev/social-jev.github.io">
            Website source
          </a>
        </nav>
        <span className="footer-note">A research project in progress.</span>
      </footer>
    </>
  );
}
