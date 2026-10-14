import { useEffect, useState } from "react";
import { ApplicationAnimation } from "./ApplicationAnimation.jsx";
import { ParetoChart, TrainingCharts } from "./ResearchCharts.jsx";
import { MixtureTreemap } from "./MixtureTreemap.jsx";
import { ArchitectureAnimation } from "./ArchitectureAnimation.jsx";
import { AttentionPlayground } from "./AttentionPlayground.jsx";
const modelUrl = "https://huggingface.co/social-jev/social-jev-0.6B-v1";
const packageUrl = "https://github.com/DGoettlich/social-jev";
const sections = [
  ["applications", "Applications"],
  ["evaluation", "Evaluation"],
  ["data", "Data"],
  ["architecture", "Architecture"],
  ["attention", "Attention"],
  ["training", "Training"],
];

function Chapter({ id, number, title, children, description, link, detail }) {
  return (
    <section id={id} className="chapter visual-chapter">
      <div className="section-heading">
        <p className="eyebrow">
          {number} / {sections.find((section) => section[0] === id)[1]}
        </p>
        <h2>{title}</h2>
        <p>{description}</p>
        {detail && <p className="chapter-detail">{detail}</p>}
        {link && (
          <a className="text-link" href={link.href}>
            {link.label} <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
      {children}
    </section>
  );
}

export function App() {
  const [active, setActive] = useState("applications");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-10% 0px -55% 0px" },
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
        <div className="brand-lockup">
          <a className="wordmark" href="#">
            SocialJev<span className="wordmark-dot">.</span>
          </a>
          <span className="draft-label">Draft</span>
        </div>
        <nav aria-label="Main navigation">
          <a href="#usage">Usage</a>
          <a href="#evaluation">Evaluation</a>
          <a href="#architecture">How it works</a>
          <a href="/docs/">Docs ↗</a>
        </nav>
        <a className="header-source" href={packageUrl}>
          GitHub ↗
        </a>
      </header>
      <div className="mock-data-banner">
        Design preview{" "}
        <span>
          Charts, dataset sizes, and example outputs use simulated data.
        </span>
      </div>
      <main id="main">
        <section
          id="applications"
          className="hero visual-hero"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="eyebrow">
              Social science classification
            </p>
            <h1 id="hero-title" className="descriptive-title">SocialJev — a Classification Foundation Model for the Social Sciences</h1>
            <p className="hero-intro">SocialJev is a Jev-like model that combines the general capabilities of transformers with decision training for social science. Direct answer scoring enables fast inference, while typed requests and responses provide a flexible, predictable interface.</p>
            <h2 className="motivation-title">Classification at dataset scale</h2>
            <p className="chapter-detail">Large-scale labelling can make frontier language models prohibitively expensive, while lightweight classifiers often require task-specific training. SocialJev applies a shared model across tasks, using direct scoring instead of autoregressive decoding to reduce inference time and cost.</p>
            <div className="hero-actions">
              <a className="button primary" href="#evaluation">
                Evaluation ↓
              </a>
              <a className="text-link" href="#usage">
                Using SocialJev ↓
              </a>
            </div>
            <p className="release-note">
              <span className="availability-dot" />
              0.6B v1 available · 1.7B and 4B planned
            </p>
          </div>
          <ApplicationAnimation />
        </section>
        <nav className="chapter-nav" aria-label="Page sections">
          {sections.map(([id, label], index) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
            >
              <span>0{index + 1}</span>
              {label}
            </a>
          ))}
        </nav>
        <section id="usage" className="package-callout interface-section">
          <div className="interface-heading">
            <p className="eyebrow">Usage</p><h2>Using SocialJev</h2>
            <p>A typed request specifies the state, query, and candidate answers. Each query returns a Result with the selected answer and its candidate probabilities.</p>
            <div className="interface-links">
              <a className="button primary" href="/docs/">Documentation ↗</a>
              <a className="text-link" href={modelUrl}>Model ↗</a>
              <a className="text-link github-link" href={packageUrl}>
                <img src="/github.svg" width="20" height="20" alt="" /> GitHub ↗
              </a>
            </div>
          </div>
          <div className="interface-code">
            <div className="interface-code-label">Python · core interface</div>
            <pre><code>{`from social_jev import Query, Request, SocialJev

model = SocialJev.from_pretrained(
    "social-jev/social-jev-0.6B-v1"
)

request = Request(
    state="The council expanded the bus network.",
    queries=[Query(
        text="Which policy area does this document concern?",
        options=["Transport", "Education", "Healthcare"],
    )],
)

result = model.query(request)[0]
result.choice         # Selected candidate answer
result.probabilities  # dict[str, float]`}</code></pre>
          </div>
        </section>
        <Chapter
          id="evaluation"
          number="02"
          title="Classification performance, inference time, and cost"
          description="We evaluate SocialJev across classification tasks and compare its performance, model size, and inference cost with other models. A matched comparison of 30,000 requests will measure the runtime difference between autoregressive decoding and SocialJev inference."
          detail="The speed comparison is pending. The performance figure currently uses illustrative values."
        >
          <ParetoChart />
        </Chapter>
        <Chapter
          id="data"
          number="03"
          title="The training mixture"
          description="SocialJev is trained across datasets covering political, social, and economic classification tasks. The treemap shows each dataset’s contribution to the training mixture."
          detail="Rectangle areas will represent the number of training questions. The current proportions are illustrative."
          link={{
            href: "https://huggingface.co/social-jev",
            label: "Explore the datasets",
          }}
        >
          <MixtureTreemap />
        </Chapter>
        <Chapter
          id="architecture"
          number="04"
          title="Classification without autoregressive decoding"
          description="At each answer prefix, SocialJev uses the language model’s unembedding matrix to score eligible answer codes. It retains the codes present in that query and normalizes their scores into candidate-answer probabilities."
          detail="The same language-model head is fine-tuned with the backbone; classification does not require generating an answer as text."
          link={{ href: modelUrl, label: "Read the released model card" }}
        >
          <ArchitectureAnimation />
        </Chapter>
        <Chapter
          id="attention"
          number="05"
          title="Attention masks and position assignments"
          description="Queries share the state while their candidate answers remain separate attention branches. Candidate answers reuse a common starting position, and each answer prefix follows its query’s longest candidate."
          detail="Select a token to inspect its permitted context. Compare physical sequence indices with the assigned position IDs."
        >
          <AttentionPlayground />
        </Chapter>
        <Chapter
          id="training"
          number="06"
          title="Training objective and learning curves"
          description="SocialJev is trained to maximize the probability of the correct candidate answer. The figures show the classification objective, training loss, and validation performance."
          detail="The current curves are illustrative; measured learning curves will replace them."
        >
          <TrainingCharts />
        </Chapter>

      </main>
      <footer className="site-footer">
        <div>
          <a className="wordmark" href="#">
            SocialJev.
          </a>
          <p>Social science classification.</p>
        </div>
        <nav aria-label="Resources">
          <a href={packageUrl}>Package</a>
          <a href="https://huggingface.co/social-jev">Models & data</a>
          <a href="/docs/">Documentation</a>
          <a href="https://github.com/social-jev/SocialJev.github.io">
            Website source
          </a>
        </nav>
        <span className="footer-note">Design draft · simulated figures.</span>
      </footer>
    </>
  );
}
