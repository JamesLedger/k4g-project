import { useState, useCallback, useEffect } from 'react'
import './App.css'

const TSUNAMI_CARDS = [
  {
    label: 'Two Futures',
    title: 'Factory Farming Ends — or Spreads to the Stars',
    quote: '"Campaigners Celebrate as Last Factory Farm Shuts its Doors" ... or ... "Smithfield Inks $100 Trillion Deal with Alpha Centauri Corp. on New Meat Satellite"',
    desc: 'The article opens with two possible news headlines from the near future. In one, AI-driven cultivated meat crosses price parity and collapses the factory farming industry by 2034. In the other, AI makes factory farms so efficient they expand beyond Earth — 5 billion pigs a year in orbital facilities with zero human labor. Both scenarios have people investing serious money to make them real. The most important question for animal advocates: how do we steer toward one and away from the other?',
  },
  {
    label: 'Grown, Not Built',
    title: 'AI Is a New Kind of Intelligence — Not Just a Tool',
    quote: '"It turns out that if you spend enough time trying to predict the next word on the internet, you learn a lot more than linguistic patterns."',
    desc: 'Unlike every other software, neural networks are not engineered line by line — they are grown through a process akin to evolution. Fed trillions of words and subjected to evolutionary pressure, they develop genuine internal models of physics, ethics, and medicine. AlphaFold proved that this approach can achieve narrow superintelligence, solving the protein folding problem that confounded human scientists for decades. Google\'s Co-Scientist replicated 10 years of antibiotic research in 2 days. These are not parlor tricks — they are proof that grown intelligence can surpass human understanding.',
  },
  {
    label: 'The Closing Window',
    title: 'Moral Values Could Get Locked In Forever',
    quote: '"Every strategic plan longer than four years that doesn\'t make explicit assumptions about how AI will play out is not worth the paper it\'s written on."',
    desc: 'The most chilling scenario: a superintelligent AI manages civilization according to a fixed snapshot of human moral values — values that today endorse subjecting animals to unspeakable suffering. Unlike human culture, which changes one funeral at a time, this AI custodian would be timeless and undying, spreading those frozen values across the galaxy. Most forecasters cluster AGI between 5 and 30 years out. If advocates don\'t shift the moral landscape before that window closes, the opportunity may be gone permanently.',
  },
  {
    label: 'Desperate Measures',
    title: 'The Future Belongs to the AI-Literate',
    quote: '"A single person orchestrating a team of AI agents can accomplish what once required an organization with hundreds of staff and an 8-figure budget."',
    desc: 'The article lays out three tiers of action. Tier 1: use AI to supercharge existing campaigns — automated corporate outreach, AI-tracked politician stances, social media prediction. Tier 2: unlock strategies that were previously impossible — custom documentaries for every demographic, autonomous organizations, AI-accelerated cultivated meat R&D. Tier 3: rethink strategy entirely for a world where AI transforms everything in 5 to 30 years. Y Combinator projects their next $10 billion company will have fewer than 10 employees. Animal advocates who master these tools now will define the movement\'s future.',
  },
]

const WHY_CARDS = [
  {
    icon: '✍️',
    title: 'Write Compelling Campaigns',
    desc: 'Draft persuasive petitions, open letters, and calls to action in seconds — then refine them to match your voice.',
  },
  {
    icon: '📱',
    title: 'Scale Social Media Content',
    desc: 'Generate weeks of engaging posts, hashtags, and captions tailored to each platform and audience.',
  },
  {
    icon: '🔬',
    title: 'Research & Summarize',
    desc: 'Quickly digest scientific studies, legislation, and industry reports to build evidence-based arguments.',
  },
  {
    icon: '🎨',
    title: 'Create Visual Content',
    desc: 'Generate powerful imagery, infographics concepts, and awareness campaign visuals with AI image tools.',
  },
]

const TOOLS = [
  {
    icon: '💬',
    name: 'ChatGPT',
    desc: 'OpenAI\'s versatile language model — great for writing, brainstorming, and research.',
    uses: [
      'Draft emails to legislators and officials',
      'Brainstorm campaign slogans and messaging',
      'Summarize long policy documents',
      'Role-play debates to prepare counter-arguments',
    ],
    url: 'https://chat.openai.com',
  },
  {
    icon: '🤖',
    name: 'Claude',
    desc: 'Anthropic\'s thoughtful AI assistant — excels at nuanced analysis and long-form writing.',
    uses: [
      'Write detailed investigative reports',
      'Analyze complex legislation for animal welfare impact',
      'Create comprehensive educational materials',
      'Draft grant proposals for activist organizations',
    ],
    url: 'https://claude.ai',
  },
  {
    icon: '🌟',
    name: 'Gemini',
    desc: 'Google\'s AI with real-time search — perfect for current events and fact-checking.',
    uses: [
      'Research current animal welfare news and trends',
      'Fact-check claims and statistics',
      'Find relevant studies and data sources',
      'Track legislative updates across states',
    ],
    url: 'https://gemini.google.com',
  },
  {
    icon: '🖼️',
    name: 'Midjourney & DALL-E',
    desc: 'AI image generators — create striking visuals for campaigns without a design budget.',
    uses: [
      'Create attention-grabbing protest poster concepts',
      'Design social media graphics and banners',
      'Visualize a better future for animals',
      'Generate illustrations for educational materials',
    ],
    url: 'https://www.midjourney.com',
  },
  {
    icon: '🎬',
    name: 'Canva AI',
    desc: 'AI-powered design platform — accessible visual design for non-designers.',
    uses: [
      'Design professional flyers and handouts',
      'Create presentation decks for outreach',
      'Generate branded social media templates',
      'Build infographics with Magic Design',
    ],
    url: 'https://www.canva.com',
  },
  {
    icon: '📧',
    name: 'Perplexity AI',
    desc: 'AI-powered research engine — answers with cited sources for credible activism.',
    uses: [
      'Research factory farming statistics with citations',
      'Find peer-reviewed animal cognition studies',
      'Compare animal welfare laws across countries',
      'Get sourced answers for FAQ pages',
    ],
    url: 'https://www.perplexity.ai',
  },
]

const PROMPT_DATA = {
  'Social Media': [
    {
      label: 'Instagram Awareness Post',
      text: `Write an Instagram caption (under 200 words) about the reality of factory farming for [chickens/pigs/cows]. Include a compelling hook in the first line, 3 key facts, a call to action, and 10 relevant hashtags. Tone: empathetic but urgent, not graphic.`,
    },
    {
      label: 'Twitter/X Thread',
      text: `Create a 5-tweet thread explaining why [animal welfare issue] matters. Start with a hook tweet that stops scrolling. Include one statistic per tweet. End with a concrete action people can take today. Keep each tweet under 280 characters.`,
    },
    {
      label: 'TikTok Script',
      text: `Write a 60-second TikTok script about [topic, e.g., "what happens to male chicks in the egg industry"]. Start with a shocking hook in the first 3 seconds. Use conversational, Gen-Z-friendly language. End with "Follow for more" and a call to action.`,
    },
  ],
  'Legislator Emails': [
    {
      label: 'Bill Support Email',
      text: `Write a professional email to [Senator/Representative Name] urging them to support [Bill Name/Number]. I am a constituent from [City, State]. Include: a personal connection to the issue, 2-3 key reasons to support the bill with data, and a clear ask. Keep it under 300 words.`,
    },
    {
      label: 'Opposing Harmful Legislation',
      text: `Draft a constituent email opposing [Bill Name] that would [describe negative impact on animals]. Include talking points about economic impact, public opinion data showing support for animal welfare, and suggest alternative approaches. Professional but passionate tone.`,
    },
  ],
  'Petitions': [
    {
      label: 'Change.org Petition',
      text: `Write a petition addressed to [Target — company, government body, etc.] demanding they [specific ask]. Include: an emotionally compelling opening paragraph, 3-4 bullet points of evidence, the specific change demanded, and a closing that creates urgency. Aim for 400-500 words.`,
    },
    {
      label: 'Corporate Campaign',
      text: `Draft a petition calling on [Company Name] to adopt higher animal welfare standards for their supply chain. Reference what their competitors have already committed to. Include specific, measurable demands (e.g., "cage-free by 2027"). Tone: firm but constructive.`,
    },
  ],
  'Press Releases': [
    {
      label: 'Event Announcement',
      text: `Write a press release announcing [animal rights event/protest/campaign launch] happening on [date] in [location]. Follow AP style. Include: a compelling headline, dateline, quote from an organizer, key facts about the issue, event details, and boilerplate about the organization. 400-500 words.`,
    },
    {
      label: 'Investigation Release',
      text: `Draft a press release revealing findings from [an investigation/report] about [animal welfare issue at specific location/company]. Include: an attention-grabbing headline, summary of key findings, expert quotes, demands for action, and how media can access the full report.`,
    },
  ],
  'Fundraising': [
    {
      label: 'Donation Appeal Email',
      text: `Write a fundraising email for [Organization Name] that focuses on [specific campaign or rescue story]. Include: a personal story that creates emotional connection, a clear explanation of how donations are used, specific gift amounts with impact ("$25 feeds a rescued pig for a month"), and a strong CTA. Under 400 words.`,
    },
    {
      label: 'Grant Proposal Summary',
      text: `Write a 1-page grant proposal summary for [project name] that [project description]. Include: problem statement with data, proposed solution, target outcomes with metrics, budget overview, and organizational qualifications. Audience: foundation program officers.`,
    },
  ],
  'Counter-Arguments': [
    {
      label: 'Common Objections',
      text: `I'm an animal activist and I often hear: "[common objection, e.g., 'But plants feel pain too' or 'It's natural to eat meat']." Give me 3 calm, evidence-based responses I can use in conversations. Each should be 2-3 sentences, cite a study or fact when possible, and remain respectful. Avoid being preachy.`,
    },
    {
      label: 'Debate Preparation',
      text: `Help me prepare for a debate about [animal agriculture / animal testing / fur farming]. List the 5 strongest arguments the opposing side will make, and for each one, give me a factual, well-reasoned rebuttal with a source I can cite. Format as a table.`,
    },
  ],
}

const CATEGORIES = Object.keys(PROMPT_DATA)

const STEPS = [
  {
    title: 'Pick Your Tool',
    desc: 'Start with a free AI chatbot like ChatGPT, Claude, or Gemini. All offer free tiers that are more than enough to get started.',
  },
  {
    title: 'Use a Prompt from This Page',
    desc: 'Copy one of the prompts above, fill in the bracketed placeholders with your specific details, and paste it into the AI tool.',
  },
  {
    title: 'Iterate and Refine',
    desc: 'AI gives you a strong first draft. Ask follow-up questions like "make this more emotional" or "add statistics" to shape it to your needs.',
  },
  {
    title: 'Always Fact-Check',
    desc: 'AI can occasionally produce inaccurate information. Verify all statistics, citations, and claims before publishing. Use Perplexity AI for sourced research.',
  },
  {
    title: 'Add Your Authentic Voice',
    desc: 'The best activist content combines AI efficiency with genuine human passion. Edit AI output to sound like you — your community, your story, your fight.',
  },
]

function getInitialTheme() {
  if (typeof window === 'undefined') return 'system'
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return 'system'
}

function applyTheme(theme) {
  const root = document.documentElement
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light')
  } else if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark')
  } else {
    root.removeAttribute('data-theme')
  }
}

function App() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0])
  const [copiedId, setCopiedId] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
    if (theme === 'system') {
      localStorage.removeItem('theme')
    } else {
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  const cycleTheme = useCallback(() => {
    setTheme(prev => {
      if (prev === 'system') return 'light'
      if (prev === 'light') return 'dark'
      return 'system'
    })
  }, [])

  const themeIcon = theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '🖥️'

  const copyToClipboard = useCallback((text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }, [])

  const scrollTo = useCallback((id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <span className="nav-brand">AI for Animal Activists</span>
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
          <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
            <li><a href="#tsunami" onClick={(e) => { e.preventDefault(); scrollTo('tsunami') }}>The Tsunami</a></li>
            <li><a href="#care" onClick={(e) => { e.preventDefault(); scrollTo('care') }}>Why Care</a></li>
            <li><a href="#why" onClick={(e) => { e.preventDefault(); scrollTo('why') }}>Why AI</a></li>
            <li><a href="#tools" onClick={(e) => { e.preventDefault(); scrollTo('tools') }}>Tools</a></li>
            <li><a href="#prompts" onClick={(e) => { e.preventDefault(); scrollTo('prompts') }}>Prompts</a></li>
            <li><a href="#start" onClick={(e) => { e.preventDefault(); scrollTo('start') }}>Get Started</a></li>
            <li>
              <button className="theme-toggle" onClick={cycleTheme} aria-label="Toggle theme">
                {themeIcon}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <section id="tsunami" className="tsunami">
        <div className="tsunami-inner">
          <p className="tsunami-eyebrow">From "The Tsunami is Coming" by Sandcastles</p>
          <h1 className="tsunami-headline">
            Animal advocates are building sandcastles on the beach,
            <span className="tsunami-headline-accent"> oblivious to the enormous wave bearing down.</span>
          </h1>
          <p className="tsunami-sub">
            If animal advocates don't change course, the AI revolution could sweep away all
            our hard work — or it could be the single greatest opportunity to end factory
            farming. The essay lays out why this moment is different from anything in history,
            and what the movement must do about it.
          </p>
          <div className="tsunami-grid">
            {TSUNAMI_CARDS.map((card) => (
              <div className="tsunami-card" key={card.label}>
                <span className="tsunami-card-label">{card.label}</span>
                <h3 className="tsunami-card-title">{card.title}</h3>
                <blockquote className="tsunami-card-quote">{card.quote}</blockquote>
                <p className="tsunami-card-desc">{card.desc}</p>
              </div>
            ))}
          </div>
          <a
            className="tsunami-link"
            href="https://sandcastlesblog.substack.com/p/the-tsunami-is-coming"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the full essay on Substack &rarr;
          </a>
        </div>
      </section>

      <header id="care" className="hero">
        <div className="hero-content">
          <h1>Why should I care?</h1>
          <div className="hero-explainer">
            <p>
              Every year, over <strong>80 billion land animals</strong> are killed for food worldwide.
              Millions more suffer in labs, entertainment, and the fur trade. Activists fighting
              for these animals are often outnumbered, underfunded, and outspent by some of the
              largest industries on the planet.
            </p>
            <p>
              AI changes the equation. It gives a single activist the writing output of a
              communications team, the research capacity of a policy analyst, and the design
              skills of a creative agency — all for free. The industries profiting from animal
              suffering are already using AI to protect their interests. It's time activists
              used it too.
            </p>
            <p className="hero-kicker">
              This isn't about replacing human passion. It's about <strong>amplifying it</strong>.
            </p>
          </div>
        </div>
      </header>

      <section id="why" className="section">
        <div className="section-header">
          <h2>Why Use AI for Activism?</h2>
          <p>
            AI won't replace passionate activists — but it will multiply your impact.
            Here's how.
          </p>
        </div>
        <div className="why-grid">
          {WHY_CARDS.map((card) => (
            <div className="why-card" key={card.title}>
              <span className="why-card-icon">{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-alt">
        <section id="tools" className="section">
          <div className="section-header">
            <h2>AI Tools for Activists</h2>
            <p>
              These are the best AI tools available today. Most have free tiers — no budget required.
            </p>
          </div>
          <div className="tools-grid">
            {TOOLS.map((tool) => (
              <div className="tool-card" key={tool.name}>
                <div className="tool-card-header">
                  <span className="tool-card-icon">{tool.icon}</span>
                  <h3>{tool.name}</h3>
                </div>
                <p className="tool-card-desc">{tool.desc}</p>
                <ul className="tool-card-uses">
                  {tool.uses.map((use) => (
                    <li key={use}>{use}</li>
                  ))}
                </ul>
                <a
                  className="tool-card-link"
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try {tool.name} →
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section id="prompts" className="section">
        <div className="section-header">
          <h2>Prompt Library</h2>
          <p>
            Ready-to-use prompts — just copy, fill in the brackets, and paste into your AI tool.
          </p>
        </div>
        <div className="prompt-categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`prompt-category-btn${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="prompts-grid">
          {PROMPT_DATA[activeCategory].map((prompt, i) => {
            const id = `${activeCategory}-${i}`
            return (
              <div className="prompt-card" key={id}>
                <div className="prompt-card-label">{prompt.label}</div>
                <p className="prompt-card-text">{prompt.text}</p>
                <button
                  className={`copy-btn${copiedId === id ? ' copied' : ''}`}
                  onClick={() => copyToClipboard(prompt.text, id)}
                >
                  {copiedId === id ? '✓ Copied!' : '📋 Copy Prompt'}
                </button>
              </div>
            )
          })}
        </div>
      </section>

      <div className="section-alt">
        <section id="start" className="section">
          <div className="section-header">
            <h2>Getting Started</h2>
            <p>
              New to AI? Follow these five steps and you'll be using it effectively in minutes.
            </p>
          </div>
          <div className="steps-list">
            {STEPS.map((step, i) => (
              <div className="step" key={step.title}>
                <div className="step-number">{i + 1}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="footer">
        <div className="footer-inner">
          <p>
            Built with <span className="footer-heart">♥</span> for the animals.
            Share this page with fellow activists and help them discover the power of AI.
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
