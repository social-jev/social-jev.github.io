import { useEffect, useRef, useState } from "react";
import { UsageCode } from "./UsageCode.jsx";
import { ApplicationAnimation } from "./ApplicationAnimation.jsx";
import { EvaluationExamples } from "./EvaluationExamples.jsx";
import { ParetoChart } from "./ResearchCharts.jsx";
import { MixtureTreemap } from "./MixtureTreemap.jsx";
import { ArchitectureAnimation } from "./ArchitectureAnimation.jsx";
import { AttentionPlayground } from "./AttentionPlayground.jsx";
const modelUrl = "https://huggingface.co/collections/social-jev/socialjev-preview";
const packageUrl = "https://github.com/social-jev/social-jev";
const citation = `@article{socialjev2026,
  author  = {Ash, Elliott and Drinkall, Felix and
             Garg, Pranav and Göttlich, Daniel},
  title   = {{SocialJev}: A Family of Classification Foundation Models
             for the Social Sciences},
  journal = {Working Paper},
  year    = {2026}
}`;
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
  const [emailCopyStatus, setEmailCopyStatus] = useState("");
  const [citationCopyStatus, setCitationCopyStatus] = useState("Cite");
  async function copyCitation() {
    try {
      await navigator.clipboard.writeText(citation);
      setCitationCopyStatus("Copied");
    } catch {
      setCitationCopyStatus("Copy failed");
    }
    window.setTimeout(() => setCitationCopyStatus("Cite"), 2000);
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("dgoettlich@ethz.ch");
      setEmailCopyStatus("Copied");
    } catch {
      setEmailCopyStatus("Select the address to copy");
    }
    window.setTimeout(() => setEmailCopyStatus(""), 2000);
  }
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
          <button className="hero-email" type="button" onClick={copyEmail} title="Copy email address" aria-label="Copy dgoettlich@ethz.ch"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></svg><span>dgoettlich@ethz.ch</span><svg className="email-copy-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="2" /><path d="M15 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3" /></svg><span className="email-copy-status" role="status">{emailCopyStatus}</span></button>
          <div className="academic-links">
            <a href={packageUrl}><img src="/github.svg" width="20" height="20" alt="" />GitHub</a>
            <a href={modelUrl}><span aria-hidden="true">🤗</span>Models</a>
            <a href="/docs/"><span aria-hidden="true">▤</span>Documentation</a>
            <button className="cite-button" type="button" onClick={copyCitation} aria-label="Copy working-paper citation" title="Copy BibTeX citation"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 6h5v6H6c0 3 1 4 3 5M14 6h5v6h-4c0 3 1 4 3 5" /></svg><span aria-live="polite">{citationCopyStatus}</span></button>
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
          <p>SocialJev is a general classifier for the social sciences, inspired by <a href="https://jevresearch.github.io/Jev-Research/">TypeSafe’s Jev</a>. It combines transformer capabilities with social-science training, fast inference and a flexible interface for specifying tasks and candidate answers at inference time.</p>
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
            <div className="interface-code-label"><span className="code-language"><i aria-hidden="true" />Python <span aria-hidden="true">/</span> core interface</span><button className="copy-code-button" onClick={copyCode} aria-label="Copy Python code"><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="5" y="5" width="8" height="9" rx="1" /><path d="M3 11H2V2h8v1" /></svg><span aria-live="polite">{copyStatus}</span></button></div>
            <pre><code ref={codeRef}><UsageCode /></code></pre>
          </div>
        </section>
        <Chapter
          id="evaluation"
          number="02"
          title="Evaluation"
          description="We currently evaluate four classification tasks central to social-science research: topic presence, stance, sentiment and framing."
          detail="On SocialJevBench, the SocialJev models lie on the Pareto frontier of accuracy and model size: none of the evaluated alternatives achieves equal or higher accuracy with fewer parameters. Future versions of the benchmark will extend its task coverage."
        >
          <div className="evaluation-content"><ParetoChart /><EvaluationExamples /></div>
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
          description="SocialJev reads the text, question, and candidate answers, then scores how well each answer fits. It returns a probability for each option directly, rather than writing an answer token by token."
          detail="This avoids the repeated generation steps of a conventional language model, making classification much faster. The answers are supplied with each request, so you can change the task and its possible answers without retraining the model."
        >
          <ArchitectureAnimation />
        </Chapter>
        <Chapter
          id="attention"
          number="05"
          title="Option order does not determine the prediction"
          description="SocialJev treats each candidate option independently: it sees the state and its own query, but cannot attend to other options. All options also begin at the same position ID, so the model cannot distinguish “first option” from “second option” or learn a preference based on that ordering."
          detail="Reordering the options therefore leaves their predicted probabilities unchanged. The same isolation and position assignments apply across queries, so their order does not affect the results either."
        >
          <AttentionPlayground />
        </Chapter>

        <section id="roadmap" className="limitations-section" aria-labelledby="roadmap-title">
          <h2 id="roadmap-title">Limitations and roadmap</h2>
          <p>SocialJev is an early release. These are its current limits and the work planned to address them.</p>
          <ol className="roadmap-prose">
<li><strong>Domain specificity.</strong> SocialJev is currently trained on a limited amount of data covering four types of social science-related NLP tasks. Therefore, at present, we would not be surprised if it performed noticeably worse on very different tasks or data. We are actively working on including a broader task set applied to a wider range of datasets of interest to social science researchers.</li>
<li><strong>Classification and extraction.</strong> SocialJev currently answers questions by choosing between options supplied with the request. This means that researchers need to specify the possible answers in advance; it cannot yet extract features directly from the text. We are working on adding extraction alongside classification, so that SocialJev can also identify information that has not been enumerated as a set of options.</li>
<li><strong>Multimodality.</strong> SocialJev can currently only read text. We are working on a multimodal version.</li>
<li><strong>Compute provider integrations.</strong> Running SocialJev on large datasets currently requires access to a suitable GPU and some familiarity with setting up inference. This can make it harder to use for researchers without their own computing infrastructure. We plan to add integrations with GPU providers so that inference jobs can be launched without handling GPU rental and setup separately.</li>
<li><strong>Adapting the model.</strong> Some research projects may require more specialised decisions than the released models can reliably make. At present, adapting a model to such a task requires a separate fine-tuning workflow. We plan to provide a simple training interface so that researchers can fine-tune SocialJev using labelled examples from their own projects.</li>
<li><strong>Assessing performance.</strong> The benchmark results shown here do not establish how well SocialJev will perform on a particular research dataset. Researchers currently need to assemble their own evaluation workflow to assess this. We plan to add an evaluation interface that makes it easier to measure performance on labelled examples and compare alternative queries.</li>
<li><strong>Query optimization.</strong> Predictions can depend on how a question and its candidate answers are formulated. Finding a suitable formulation currently requires manual experimentation, even when the underlying research task is unchanged. We plan to add tools that help researchers optimise their queries using labelled examples from the task they want to study.</li>
</ol>
        </section>
      </main>
      <footer className="site-footer">
        <div>
          <a className="wordmark" href="#">
            SocialJev.
          </a>
        </div>
        <nav aria-label="Resources">
          <a href={packageUrl}>Package</a>
          <a href="https://huggingface.co/social-jev">Models & data</a>
          <a href="/docs/">Documentation</a>
        </nav>
      </footer>
    </>
  );
}
