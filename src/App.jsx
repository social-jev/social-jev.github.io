import { useEffect, useRef, useState } from "react";
import { ApplicationAnimation } from "./ApplicationAnimation.jsx";
import { ParetoChart } from "./ResearchCharts.jsx";
import { MixtureTreemap } from "./MixtureTreemap.jsx";
import { ArchitectureAnimation } from "./ArchitectureAnimation.jsx";
import { AttentionPlayground } from "./AttentionPlayground.jsx";
const modelUrl = "https://huggingface.co/social-jev";
const packageUrl = "https://github.com/DGoettlich/social-jev";
const sections = [
  ["applications", "Applications"],
  ["evaluation", "Evaluation"],
  ["data", "Data"],
  ["architecture", "Architecture"],
  ["attention", "Attention"],
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
            {link.label} 
          </a>
        )}
      </div>
      {children}
    </section>
  );
}

export function App() {
  const [active, setActive] = useState("applications");
  const codeRef = useRef(null);
  const [copyStatus, setCopyStatus] = useState("Copy");
  async function copyCode() {
    try {
      await navigator.clipboard.writeText(codeRef.current.textContent);
      setCopyStatus("Copied");
    } catch {
      setCopyStatus("Select code to copy");
    }
  }
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
        </div>
        <nav aria-label="Main navigation">
          <a href="#applications">Overview</a>
          <a href="#usage">Usage</a>
          <a href="#evaluation">Evaluation</a>
          <a href="#architecture">How it works</a>
          <a href="/docs/">Docs</a>
        </nav>
        <a className="header-source resource-icon-link" href={packageUrl}>
          <img src="/github.svg" width="20" height="20" alt="" /> GitHub
        </a>
      </header>
      <main id="main">
        <section className="academic-hero" aria-labelledby="hero-title">
          <h1 id="hero-title">SocialJev</h1>
          <p className="academic-subtitle">A Classification Foundation Model<br />for the Social Sciences</p>
          <ul className="author-list" aria-label="Authors">
            <li>Elliott Ash</li><li>Felix Drinkall</li><li>Pranav Garg</li><li>Daniel Göttlich</li>
          </ul>
          <p className="academic-affiliation">ETH Zurich</p>
          <div className="academic-links">
            <a href={packageUrl}><img src="/github.svg" width="20" height="20" alt="" />GitHub</a>
            <a href={modelUrl}><span aria-hidden="true">🤗</span>Models</a>
            <a href="/docs/"><span aria-hidden="true">▤</span>Documentation</a>
          </div>
        </section>
        <section className="wikipedia-highlight" aria-labelledby="wikipedia-title">
          <h2 id="wikipedia-title">Wikipedia-scale labelling —<br />for the price of two coffees.</h2>
          <p className="wikipedia-description">SocialJev 0.6B (preview) classifies all 7.25 million English Wikipedia articles in an estimated 6½ hours on one GH200 — approximately $15 in GPU rental.</p>
          <figure>
            <img className="wikipedia-illustration" src="/wikipedia-coffee.png" width="2172" height="724" alt="SocialJev about to swallow the Wikipedia globe, approximately equal in cost to two plain takeaway coffees." />
            <div className="wikipedia-labels" aria-hidden="true"><span>English Wikipedia</span><span>Two coffees</span></div>
            <figcaption>Extrapolated from 100,000 articles · one binary question per chunk · $2.29/GPU-hour · excludes preparation and startup</figcaption>
          </figure>
        </section>
        <section id="applications" className="academic-overview" aria-labelledby="overview-title">
          <div className="overview-copy"><h2 id="overview-title">Overview</h2>
          <p>SocialJev is a Jev-like model that combines general transformer capabilities with decision training for social science, fast inference, and a flexible typed interface.</p>
          <p>It is designed for large-scale labelling, where frontier language models can be prohibitively expensive and lightweight classifiers often require task-specific training. SocialJev scores candidate answers directly instead of generating responses token by token.</p></div>
          <ApplicationAnimation />
        </section>
        <section id="usage" className="package-callout interface-section">
          <div className="interface-heading">
            <p className="eyebrow">Usage</p><h2>Using SocialJev</h2>
            <p>A typed request specifies the state, query, and candidate answers. Each query returns a Result with the selected answer and its candidate probabilities.</p>
            <div className="interface-links">
              <a className="button primary resource-icon-link" href="/docs/"><span aria-hidden="true">▤</span>Documentation</a>
              <a className="text-link resource-icon-link" href={modelUrl}><span aria-hidden="true">🤗</span>Models</a>
              <a className="text-link github-link" href={packageUrl}>
                <img src="/github.svg" width="20" height="20" alt="" /> GitHub
              </a>
            </div>
          </div>
          <div className="interface-code">
            <div className="interface-code-label"><span>Python · core interface</span><button className="copy-code-button" onClick={copyCode} aria-label="Copy Python code"><span aria-live="polite">{copyStatus}</span></button></div>
            <pre><code ref={codeRef}>{`from social_jev import Query, Request, SocialJev

model = SocialJev.from_pretrained(
    "social-jev/social-jev-0.6B-preview"
)

request = Request(
    state="The council expanded the bus network.",
    queries=[Query(
        text="Which policy area does this document concern?",
        options=["Transport", "Education", "Healthcare"],
    )],
)

result = model.query(request)[0][0]
result.choice         # Selected candidate answer
result.probabilities  # dict[str, float]`}</code></pre>
          </div>
        </section>
        <Chapter
          id="evaluation"
          number="02"
          title="Evaluation"
          description="We evaluate SocialJev across classification tasks and compare its performance, model size, and inference cost with other models. A matched comparison of 30,000 requests will measure the runtime difference between autoregressive decoding and SocialJev inference."
          detail="Evaluated on our internal benchmark, SocialJevBench (v0.1alpha). The matched speed and cost comparison is pending."
        >
          <ParetoChart />
        </Chapter>
        <Chapter
          id="data"
          number="03"
          title="The training mixture"
          description="SocialJev is trained across datasets covering political, social, and economic classification tasks. We assemble shorter sequences into passages and use an LLM to generate synthetic queries, with human labels and codebooks as reference."
          detail="The treemap shows each dataset’s share of training questions."
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
          description="SocialJev applies a shared linear or MLP head to the final hidden state of each candidate sequence. Each candidate receives one scalar score; softmax within the query produces candidate probabilities."
          detail="The diagram shows the packed training sequence. Each option’s final hidden state is read by the same Decision Head; softmax normalizes the scores within its query."
        >
          <ArchitectureAnimation />
        </Chapter>
        <Chapter
          id="attention"
          number="05"
          title="Attention masks and position assignments"
          description="During training, the state, multiple queries, and their candidate options are packed into one sequence. Queries cannot attend to each other. Each option can attend to the state and its own query, but not to other options."
          detail="Options reuse the same starting position after the state and query. The shared linear or MLP head reads each option’s final hidden state."
        >
          <AttentionPlayground />
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
      </footer>
    </>
  );
}
