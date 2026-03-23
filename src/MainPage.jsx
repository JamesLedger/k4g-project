import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

const GOOD_CARDS = [
  {
    title: "Cultivated meat breakthroughs",
    body: "AI is already helping labs design animal-free meat at the molecular level. The same approach that solved protein folding (AlphaFold) could crack the remaining barriers to cheap, scalable cultivated meat.",
    icon: (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="16" cy="7" r="4.5" />
        <circle cx="8" cy="26" r="4.5" />
        <circle cx="24" cy="26" r="4.5" />
        <line x1="13.5" y1="11" x2="10.5" y2="22" />
        <line x1="18.5" y1="11" x2="21.5" y2="22" />
      </svg>
    ),
  },
  {
    title: "Animal language decoding",
    body: "Researchers are using AI to decode whale, dolphin, and bee communication. Imagine if the public could actually hear what animals have to say.",
    icon: (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 18c0-5 6-10 14-10 6 0 10 3 10 7s-5 8-11 8c-5 0-9-1-13-5z" />
        <circle cx="21" cy="14" r="1.2" fill="currentColor" stroke="none" />
        <path d="M4 18s-1-5 1-8" />
      </svg>
    ),
  },
  {
    title: "Supercharged advocacy",
    body: "AI can write more persuasive campaigns, personalised to every individual. One AI model was already more persuasive than 99% of human debaters on Reddit — and that was a model from 2024.",
    icon: (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M24 6L10 14H4v6h6l14 8V6z" />
        <path d="M27 12c1.5 1.5 1.5 4.5 0 6" />
        <path d="M29.5 9c3 3 3 9 0 12" />
      </svg>
    ),
  },
  {
    title: "Replacing animal testing",
    body: "AI-powered simulations could make drug testing on animals obsolete.",
    icon: (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="10" y="4" width="12" height="8" rx="2" />
        <path d="M16 12v6" />
        <circle cx="16" cy="22" r="5" />
        <path d="M6 30h20" />
        <path d="M16 27v3" />
      </svg>
    ),
  },
];

const BAD_CARDS = [
  {
    title: "Hyper-efficient factory farms",
    body: "AI is already being used to optimise factory farm operations. Without intervention, it will make industrial animal agriculture cheaper and more scalable.",
    icon: (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="14" width="24" height="14" rx="2" />
        <path d="M8 14V8h16v6" />
        <circle cx="16" cy="21" r="3" />
        <path d="M9 28v2M23 28v2" />
      </svg>
    ),
  },
  {
    title: "Space colonisation with factory farms",
    body: "This isn't a joke. Companies are investing in plans to expand agriculture beyond Earth. AI-powered automation could make off-world factory farming possible.",
    icon: (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 4l3 8h-6l3-8z" />
        <rect x="14" y="12" width="4" height="10" rx="1" />
        <path d="M10 22l-4 6M22 22l4 6M12 22h8" />
        <circle cx="16" cy="18" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Speciesism baked into AI models",
    body: "Current AI systems reflect humanity's biases, including speciesism. When asked about animal welfare, AI equivocates. These biases will compound as AI becomes more influential.",
    icon: (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="24" height="18" rx="3" />
        <path d="M4 22h24" />
        <path d="M12 28h8" />
        <path d="M16 22v6" />
        <path d="M10 11h4M10 15h8" />
      </svg>
    ),
  },
  {
    title: "A future shaped without us",
    body: "If the animal movement ignores AI, decisions that determine the fate of trillions of animals will be made entirely by people who aren't thinking about them.",
    icon: (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="6" y="12" width="20" height="16" rx="3" />
        <path d="M10 12V8a6 6 0 0 1 12 0v4" />
        <circle cx="16" cy="20" r="2" />
        <path d="M16 22v3" />
      </svg>
    ),
  },
];

const TIMELINE = [
  {
    year: "2023",
    event: "GPT-4 matches human experts across dozens of professional fields",
  },
  {
    year: "2024",
    event: "AI writes the majority of code at the companies building it",
  },
  {
    year: "2025",
    event: "AI wins gold at the International Mathematical Olympiad",
    active: true,
  },
  {
    year: "~2028",
    event: "AI capabilities continue doubling roughly every 7 months",
  },
  {
    year: "~2030",
    event:
      "Artificial General Intelligence — AI that matches any human at any task",
  },
];

function MainPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="hero" aria-label="Introduction">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-orb hero-orb--1" />
          <div className="hero-orb hero-orb--2" />
          <svg
            className="hero-wave"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              d="M0,224C180,180,360,260,540,220C720,180,900,240,1080,200C1200,172,1360,220,1440,200L1440,320L0,320Z"
              fill="rgba(232,114,58,0.08)"
            />
            <path
              d="M0,260C240,220,480,280,720,240C960,200,1200,260,1440,230L1440,320L0,320Z"
              fill="rgba(232,114,58,0.04)"
            />
          </svg>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            Why animal advocates should care about AI
          </h1>
        </div>
        <div className="scroll-indicator" aria-hidden="true">
          <span>Scroll to learn why</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M10 4v12M10 16l-4-4M10 16l4-4" />
          </svg>
        </div>
      </section>

      {/* ── SECTION 1: AI Is a Huge Deal ── */}
      <section className="s" aria-label="AI is a huge deal">
        <div className="s-inner">
          <Reveal>
            <span className="s-label">The Reality</span>
            <h2>This Isn't Hype. This Is Happening.</h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="s-body">
              AI systems are already outperforming doctors at diagnosing
              diseases, winning gold at international maths competitions, and
              writing the majority of code at the companies building them. The
              world's leading AI researchers — including the people building
              these systems — warn that AI could transform civilisation within
              5–10 years.
            </p>
            <p className="s-body s-body--strong">
              This isn't science fiction. The curve is exponential, and it's not
              slowing down.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div
              className="exp-curve"
              aria-label="Exponential growth curve showing AI capability acceleration"
            >
              <svg viewBox="0 0 500 220" fill="none">
                <defs>
                  <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E8723A" stopOpacity="0.18" />
                    <stop
                      offset="100%"
                      stopColor="#E8723A"
                      stopOpacity="0.01"
                    />
                  </linearGradient>
                </defs>
                <line
                  x1="50"
                  y1="190"
                  x2="460"
                  y2="190"
                  stroke="#E2E8F0"
                  strokeWidth="1"
                />
                <line
                  x1="50"
                  y1="30"
                  x2="50"
                  y2="190"
                  stroke="#E2E8F0"
                  strokeWidth="1"
                />
                {[70, 110, 150].map((y) => (
                  <line
                    key={y}
                    x1="50"
                    y1={y}
                    x2="460"
                    y2={y}
                    stroke="#E2E8F0"
                    strokeWidth="0.5"
                    strokeDasharray="4 4"
                  />
                ))}
                <path
                  d="M50,185 C150,183 250,178 320,160 C370,145 400,110 430,55 L460,20"
                  stroke="#E8723A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M50,185 C150,183 250,178 320,160 C370,145 400,110 430,55 L460,20 L460,190 L50,190Z"
                  fill="url(#curveGrad)"
                />
                <text
                  x="120"
                  y="208"
                  fill="#94A3B8"
                  fontSize="11"
                  fontFamily="Inter, sans-serif"
                >
                  2020
                </text>
                <text
                  x="250"
                  y="208"
                  fill="#94A3B8"
                  fontSize="11"
                  fontFamily="Inter, sans-serif"
                >
                  2024
                </text>
                <text
                  x="380"
                  y="208"
                  fill="#94A3B8"
                  fontSize="11"
                  fontFamily="Inter, sans-serif"
                >
                  2028
                </text>
                <text
                  x="255"
                  y="16"
                  fill="#334155"
                  fontSize="11"
                  fontFamily="Inter, sans-serif"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  AI Capability
                </text>
              </svg>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 2: Relevant to You ── */}
      <section className="s s--alt" aria-label="Why this matters for animals">
        <div className="s-inner">
          <Reveal>
            <span className="s-label">The Connection</span>
            <h2>If You Care About Animals, You Need to Care About AI</h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="s-body">
              Over the last century, the biggest driver of animal suffering
              hasn't been individual attitudes — it's been economics. The rise
              of the middle class in China did more to increase factory farming
              than decades of Western activism could undo.
            </p>
            <p className="s-body">
              AI is about to reshape the entire global economy. That means it
              will reshape what happens to animals — for better or worse. The
              question is whether animal advocates will have any say in how.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="connection-visual" aria-hidden="true">
              <div className="connection-hub">
                <span>AI</span>
              </div>
              <div className="connection-stem" />
              <div className="connection-bar" />
              <div className="connection-nodes">
                {[
                  {
                    label: "Factory Farming",
                    iconPath: "M4 14h24v14H4zM8 14V8h16v6",
                  },
                  {
                    label: "Plant-Based Food",
                    iconPath:
                      "M16 4C10 10 8 18 10 26M16 4c6 6 8 14 6 22M10 16h12",
                  },
                  { label: "Advocacy", iconPath: "M24 6L10 14H4v6h6l14 8V6z" },
                  {
                    label: "Global Economy",
                    iconPath:
                      "M16 4a12 12 0 1 0 0 24 12 12 0 0 0 0-24zM4 16h24M16 4c-4 4-4 12-4 12s0 8 4 12M16 4c4 4 4 12 4 12s0 8-4 12",
                  },
                ].map((n) => (
                  <div className="connection-node" key={n.label}>
                    <svg
                      viewBox="0 0 32 32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={n.iconPath} />
                    </svg>
                    <span>{n.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 3: The Good ── */}
      <section className="s" aria-label="How AI could help animals">
        <div className="s-inner">
          <Reveal>
            <span className="s-label">The Opportunity</span>
            <h2>AI Could Accelerate Everything We've Been Working Towards</h2>
          </Reveal>
          <div className="card-grid">
            {GOOD_CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 100}>
                <div className="card card--good">
                  <div className="card-icon card-icon--green">{card.icon}</div>
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-body">{card.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: The Bad ── */}
      <section className="s s--dark" aria-label="Risks of ignoring AI">
        <div className="s-inner">
          <Reveal>
            <span className="s-label s-label--on-dark">The Risk</span>
            <h2 className="s-heading--light">
              Without Our Input, AI Could Make Things Much Worse
            </h2>
          </Reveal>
          <div className="card-grid">
            {BAD_CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 100}>
                <div className="card card--bad">
                  <div className="card-icon card-icon--red">{card.icon}</div>
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-body">{card.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: Environmental Concerns ── */}
      <section className="s" aria-label="Environmental perspective">
        <div className="s-inner">
          <Reveal>
            <span className="s-label">The Perspective</span>
            <h2>Don't Let Environmental Concerns Distract You</h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="s-body">
              You may have heard that AI uses enormous amounts of energy and
              water. That's true — but it's not a reason for animal advocates to
              dismiss AI. The environmental impact of AI is a rounding error
              compared to the environmental destruction caused by animal
              agriculture.
            </p>
            <p className="s-body s-body--strong">
              More importantly, the question isn't whether AI should exist — it
              will, regardless. The question is whether it will be shaped to
              help animals or harm them. Opting out isn't a strategy. It's
              surrender.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div
              className="comparison"
              aria-label="Comparison of environmental footprints"
            >
              <div className="comparison-row">
                <span className="comparison-label">
                  AI's environmental footprint
                </span>
                <div className="comparison-track">
                  <div className="comparison-fill comparison-fill--small" />
                </div>
              </div>
              <div className="comparison-row">
                <span className="comparison-label">
                  Animal agriculture's footprint
                </span>
                <div className="comparison-track">
                  <div className="comparison-fill comparison-fill--large" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 6: Moving Fast ── */}
      <section className="s s--alt" aria-label="Urgency and timeline">
        <div className="s-inner">
          <Reveal>
            <span className="s-label">The Urgency</span>
            <h2>We Don't Have Decades. We Might Not Have Five Years.</h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="s-body">
              AI capabilities are doubling roughly every 7 months. Leading
              researchers estimate we could reach artificial general
              intelligence — AI that can do anything a human can do, but better
              — by around 2030. After that, recursive self-improvement could
              accelerate things beyond anything we can currently predict.
            </p>
            <p className="s-body s-body--strong">
              The window for the animal movement to get involved is now. Not
              next year. Now.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="timeline" role="list" aria-label="AI milestones">
              {TIMELINE.map((item, i) => (
                <div
                  className={`tl-item${item.active ? " tl-item--active" : ""}`}
                  key={i}
                  role="listitem"
                >
                  <div className="tl-dot" />
                  {i < TIMELINE.length - 1 && <div className="tl-line" />}
                  <div className="tl-content">
                    <span className="tl-year">{item.year}</span>
                    <span className="tl-event">{item.event}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 7: What Can You Do ── */}
      <section className="s s--cta" id="action" aria-label="Take action">
        <div className="s-inner">
          <Reveal>
            <span className="s-label s-label--on-cta">Your Move</span>
            <h2 className="s-heading--light">
              You Don't Need to Be Technical. You Just Need to Start.
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="s-body s-body--on-cta">
              The animal movement needs people at every level to become
              AI-literate. You don't need to learn to code. You just need to
              understand what's happening and start thinking about how it
              affects your work.
            </p>
          </Reveal>
          <div className="cta-grid">
            <Reveal delay={200}>
              <Link to="/resources" className="cta-card">
                <div className="cta-icon">
                  <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 6h10l2 2h12v18H4V6z" />
                    <path d="M4 14h24" />
                  </svg>
                </div>
                <h3>Learn More</h3>
                <p>
                  Explore organisations, courses, and resources in our
                  directory.
                </p>
                <span className="cta-link">View resources →</span>
              </Link>
            </Reveal>
            <Reveal delay={300}>
              <a
                href="https://amplifyforanimals.org"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-card"
              >
                <div className="cta-icon">
                  <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 28V10l10-6 10 6v18" />
                    <rect x="12" y="18" width="8" height="10" />
                    <circle cx="16" cy="14" r="2" />
                  </svg>
                </div>
                <h3>Take a Course</h3>
                <p>
                  Amplify for Animals offers a free course on AI for animal
                  advocates.
                </p>
                <span className="cta-link">Start learning →</span>
              </a>
            </Reveal>
            <Reveal delay={400}>
              <a
                href="https://sandcastlesblog.substack.com/p/the-tsunami-is-coming"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-card"
              >
                <div className="cta-icon">
                  <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 4h20v24l-10-6-10 6V4z" />
                  </svg>
                </div>
                <h3>Read the Full Article</h3>
                <p>
                  "The Tsunami is Coming" — the essay that started this
                  conversation.
                </p>
                <span className="cta-link">Read on Substack →</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-credit">
            Inspired by{" "}
            <a
              href="https://sandcastlesblog.substack.com/p/the-tsunami-is-coming"
              target="_blank"
              rel="noopener noreferrer"
            >
              "The Tsunami is Coming"
            </a>{" "}
            by Aidan Kankyoku on Sandcastles blog.
          </p>
          <div className="footer-links">
            <Link to="/resources">Resources</Link>
            <a
              href="https://sandcastlesblog.substack.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sandcastles Blog
            </a>
            <a href="mailto:hello@aiforanimals.org">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default MainPage;
