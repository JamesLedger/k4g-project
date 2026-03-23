import { useState, useCallback, useEffect } from 'react'
import './App.css'

const DIRECTORY_CATEGORIES = ['All', 'Movement Tools', 'AI Assistants', 'Automation', 'Coding Agents', 'Content', 'Learning']

const DIRECTORY_TOOLS = [
  {
    category: 'Movement Tools',
    name: 'Open Paws',
    desc: 'AI engineering team building tools specifically for animal advocates. Offers ready-made n8n agent templates for corporate campaign outreach, social media performance prediction, and a codeless "vibe coding" framework that walks non-technical activists through directing their first AI coding project.',
    highlight: 'Recommended by Sandcastles as the activist\'s AI sidekick',
    url: 'https://www.openpaws.ai',
    free: true,
  },
  {
    category: 'Movement Tools',
    name: 'WhereTheyStand.org',
    desc: 'AI-powered platform that monitors 7,000 U.S. politicians, generating an Animal Welfare Score and detailed report on each one\'s stances and voting record. Suggests tailored outreach strategies for framing farmed animal issues in terms each politician is most likely to support.',
    highlight: 'Tracks every U.S. politician on animal issues',
    url: 'https://www.wheretheystand.org',
    free: true,
  },
  {
    category: 'Movement Tools',
    name: 'Amplify for Animals',
    desc: 'A 12-week course created by the animal movement\'s top AI experts. Takes advocates from zero to building real AI-powered solutions for campaigns, outreach, and organizational operations. Designed for activists with no technical background.',
    highlight: '12-week hands-on AI course for advocates',
    url: 'https://www.amplifyforanimals.org',
    free: false,
  },
  {
    category: 'Movement Tools',
    name: 'Futurekind Fellowship',
    desc: 'A deep-dive fellowship from Electric Sheep for animal advocates who want to go further with AI. Goes beyond the basics into advanced strategy, building autonomous systems, and preparing the movement for transformative AI timelines.',
    highlight: 'Advanced AI fellowship for the movement',
    url: 'https://www.electricsheep.ai',
    free: false,
  },
  {
    category: 'AI Assistants',
    name: 'ChatGPT',
    desc: 'OpenAI\'s versatile language model. Great for drafting emails to legislators, brainstorming campaign slogans, summarizing policy documents, and role-playing debates to prepare counter-arguments.',
    highlight: 'The most widely used AI assistant',
    url: 'https://chat.openai.com',
    free: true,
  },
  {
    category: 'AI Assistants',
    name: 'Claude',
    desc: 'Anthropic\'s thoughtful AI assistant. Widely considered the most aligned model with the best personality — and notably pro-animal. Excels at nuanced analysis, long-form writing, investigative reports, and grant proposals.',
    highlight: 'Pro-animal values and deep reasoning',
    url: 'https://claude.ai',
    free: true,
  },
  {
    category: 'AI Assistants',
    name: 'Gemini',
    desc: 'Google\'s AI with real-time search integration. Ideal for researching current animal welfare news, fact-checking industry claims, finding peer-reviewed studies, and tracking legislative updates across states.',
    highlight: 'Live web search built in',
    url: 'https://gemini.google.com',
    free: true,
  },
  {
    category: 'AI Assistants',
    name: 'Perplexity AI',
    desc: 'AI-powered research engine that answers with cited sources. Perfect for building credible, evidence-based arguments with factory farming statistics, peer-reviewed animal cognition studies, and cross-country welfare law comparisons.',
    highlight: 'Every answer comes with sources',
    url: 'https://www.perplexity.ai',
    free: true,
  },
  {
    category: 'Automation',
    name: 'n8n',
    desc: 'Open-source workflow automation platform with a visual drag-and-drop interface. Build AI-powered pipelines that scrape company data, find employee contacts, estimate personality traits, and generate personalized outreach emails — all in minutes instead of months.',
    highlight: 'Open Paws publishes activist-specific templates',
    url: 'https://n8n.io',
    free: true,
  },
  {
    category: 'Automation',
    name: 'Zapier',
    desc: 'The market leader in workflow automation. Connect thousands of apps to automate repetitive tasks — auto-reply to social media comments, route petition signatures, sync donor databases, and trigger email sequences without writing code.',
    highlight: 'Easiest place to start building automations',
    url: 'https://zapier.com',
    free: true,
  },
  {
    category: 'Coding Agents',
    name: 'Claude Code',
    desc: 'Anthropic\'s terminal-based AI coding agent. Give it natural language instructions and it reads files, writes code, and runs it on your machine. The article\'s author went from zero coding experience to building a complete web scraper in 15 minutes.',
    highlight: '"15 minutes from zero to a working tool"',
    url: 'https://docs.anthropic.com/en/docs/claude-code',
    free: false,
  },
  {
    category: 'Coding Agents',
    name: 'Cursor',
    desc: 'AI-powered code editor that lets non-programmers build custom software through conversation. Recommended in the article as the fastest path to directing your own AI coding projects — no prior programming experience needed.',
    highlight: 'Code editor that speaks plain English',
    url: 'https://cursor.com',
    free: true,
  },
  {
    category: 'Content',
    name: 'Midjourney',
    desc: 'AI image generator for creating striking campaign visuals without a design budget. Generate protest poster concepts, social media graphics, illustrations for educational materials, and imagery that visualizes a better future for animals.',
    highlight: 'Stunning visuals from text descriptions',
    url: 'https://www.midjourney.com',
    free: false,
  },
  {
    category: 'Content',
    name: 'Canva AI',
    desc: 'AI-powered design platform accessible to non-designers. Design professional flyers, presentation decks for outreach, branded social media templates, and infographics with Magic Design — all without learning graphic design.',
    highlight: 'Professional design with zero learning curve',
    url: 'https://www.canva.com',
    free: true,
  },
  {
    category: 'Content',
    name: 'ElevenLabs',
    desc: 'AI voice generation platform. Create audio versions of articles, podcasts, and campaign materials in natural-sounding voices. Used to produce the audio version of the Sandcastles article itself.',
    highlight: 'Turn any text into a realistic podcast',
    url: 'https://elevenlabs.io',
    free: true,
  },
  {
    category: 'Learning',
    name: 'AI Impact Hub',
    desc: 'Resources and training geared at nonprofit professionals. Covers AI for operations, fundraising, communications, and program management — useful for anyone in an animal advocacy organization looking to modernize their workflow.',
    highlight: 'Nonprofit-focused AI training',
    url: 'https://www.aiimpacthub.org',
    free: true,
  },
  {
    category: 'Learning',
    name: 'Sandcastles Blog',
    desc: 'The newsletter that started this page. Weekly posts about how animal activists can focus on what matters in the age of AI. "The Tsunami is Coming" is the essential primer — covering what AI is, where it\'s headed, and what advocates must do differently.',
    highlight: 'The essential AI primer for animal advocates',
    url: 'https://sandcastlesblog.substack.com/p/the-tsunami-is-coming',
    free: true,
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
  const [activeDirCat, setActiveDirCat] = useState('All')
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
            <li><a href="#directory" onClick={(e) => { e.preventDefault(); scrollTo('directory') }}>Tool Directory</a></li>
            <li><a href="#care" onClick={(e) => { e.preventDefault(); scrollTo('care') }}>Why Care</a></li>
            <li><a href="#why" onClick={(e) => { e.preventDefault(); scrollTo('why') }}>Why AI</a></li>
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

      <section id="directory" className="directory">
        <div className="directory-inner">
          <p className="directory-eyebrow">AI Tools Directory for Animal Activists</p>
          <h1 className="directory-headline">
            The future belongs to
            <span className="directory-headline-accent"> the AI-literate.</span>
          </h1>
          <p className="directory-sub">
            Every tool an animal activist needs to supercharge campaigns, automate outreach,
            build custom software, and prepare for a world being reshaped by artificial
            intelligence — curated from the Sandcastles essay
            {' '}<a href="https://sandcastlesblog.substack.com/p/the-tsunami-is-coming" target="_blank" rel="noopener noreferrer">"The Tsunami is Coming"</a> and
            the broader movement.
          </p>
          <div className="directory-filters">
            {DIRECTORY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`directory-filter-btn${activeDirCat === cat ? ' active' : ''}`}
                onClick={() => setActiveDirCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="directory-grid">
            {DIRECTORY_TOOLS
              .filter((t) => activeDirCat === 'All' || t.category === activeDirCat)
              .map((tool) => (
                <div className="directory-card" key={tool.name}>
                  <div className="directory-card-top">
                    <span className="directory-card-category">{tool.category}</span>
                    {tool.free && <span className="directory-card-free">Free tier</span>}
                  </div>
                  <h3 className="directory-card-name">{tool.name}</h3>
                  <p className="directory-card-highlight">{tool.highlight}</p>
                  <p className="directory-card-desc">{tool.desc}</p>
                  <a
                    className="directory-card-link"
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit {tool.name} &rarr;
                  </a>
                </div>
              ))}
          </div>
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
