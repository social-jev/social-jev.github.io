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
            social-jev<span className="wordmark-dot">.</span>
          </a>
          <span className="draft-label">Draft</span>
        </div>
        <nav aria-label="Main navigation">
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
              Bring a document, a research question, and candidate answers.
              social-jev turns them into a classification.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#evaluation">
                Explore the evidence ↓
              </a>
              <a className="text-link" href="/docs/">
                Use in Python ↗
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
        <Chapter
          id="evaluation"
          number="02"
          title={
            <>
              Small models.
              <br />A bigger question.
            </>
          }
          description="Where does classification performance meet computational cost? Compare model families at a glance."
          detail="The final figure will use measured scores and a common evaluation protocol. These points only demonstrate the intended chart."
        >
          <ParetoChart />
        </Chapter>
        <Chapter
          id="data"
          number="03"
          title={
            <>
              Many domains.
              <br />A shared foundation.
            </>
          }
          description="Different documents and codebooks become a common question-and-answer format. A treemap makes the mixture visible."
          detail="Each rectangle will represent a dataset’s share of usable training questions. Select a block to inspect it."
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
          title={
            <>
              A language model.
              <br />A different readout.
            </>
          }
          description="Control which tokens see each other and which positions they share. Decode the answer through the language model’s normal unembedding matrix."
          detail="Follow the tiles from attention and position IDs to the answer vector, vocabulary logits, and probabilities for your choices."
          link={{ href: modelUrl, label: "Read the released model card" }}
        >
          <ArchitectureAnimation />
        </Chapter>
        <Chapter
          id="attention"
          number="05"
          title={
            <>
              Shared context.
              <br />
              Separate questions.
            </>
          }
          description="The document is shared. Each question and its options follow explicit attention rules. An answer prefix can read all options for its own question."
          detail="Choose a token to inspect its context. Toggle physical and logical numbering to connect attention with position assignments."
        >
          <AttentionPlayground />
        </Chapter>
        <Chapter
          id="training"
          number="06"
          title={
            <>
              Learn to choose.
              <br />
              Measure the learning.
            </>
          }
          description="Train on the correct candidate answer with cross-entropy. Follow loss and validation performance as optimization progresses."
          detail="Architecture explains the mechanism; these figures will show the learning dynamics of actual runs."
        >
          <TrainingCharts />
        </Chapter>
        <section className="package-callout">
          <div>
            <p className="eyebrow">Bring it into your research</p>
            <h2>
              A Python interface.
              <br />
              Your next question.
            </h2>
          </div>
          <div>
            <p>
              The first 0.6B checkpoint is available. Package documentation is
              being prepared.
            </p>
            <a className="button primary" href="/docs/">
              Package documentation ↗
            </a>
            <a className="text-link" href={modelUrl}>
              Explore the checkpoint ↗
            </a>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div>
          <a className="wordmark" href="#">
            social-jev.
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
        <span className="footer-note">Design draft · simulated figures.</span>
      </footer>
    </>
  );
}
