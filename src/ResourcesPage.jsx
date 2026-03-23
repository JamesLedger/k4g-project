import { Link } from 'react-router-dom'

const ORGS = [
  {
    name: 'Amplify for Animals',
    desc: 'Online course helping animal advocates understand and leverage AI.',
    url: 'https://amplifyforanimals.org',
  },
  {
    name: 'OxCAA AI & Animals Subgroup',
    desc: 'Oxford-based community exploring the intersection of AI and animal advocacy.',
    url: '#',
  },
  {
    name: 'Sandcastles Blog',
    desc: 'Blog by Aidan Kankyoku on AI strategy for the animal movement.',
    url: 'https://sandcastlesblog.substack.com/',
  },
  {
    name: 'Suggest an Organisation',
    desc: 'Know an org working at the intersection of AI and animals? Let us know.',
    url: 'mailto:hello@aiforanimals.org',
    placeholder: true,
  },
]

const STEPS = [
  {
    n: 1,
    title: 'Read the full briefing',
    desc: '"The Tsunami is Coming" on Sandcastles blog — the essay that started this conversation.',
    url: 'https://sandcastlesblog.substack.com/p/the-tsunami-is-coming',
    cta: 'Read the essay →',
  },
  {
    n: 2,
    title: 'Take a course',
    desc: 'Amplify for Animals offers a free course designed specifically for animal advocates.',
    url: 'https://amplifyforanimals.org',
    cta: 'Start learning →',
  },
  {
    n: 3,
    title: 'Join a community',
    desc: 'Connect with the OxCAA AI & Animals subgroup to meet others working at this intersection.',
    url: '#',
    cta: 'Join OxCAA →',
  },
  {
    n: 4,
    title: 'Start using AI in your advocacy',
    desc: 'Try Claude (claude.ai) or ChatGPT for campaign research, writing, and strategy. Start small.',
    url: 'https://claude.ai',
    cta: 'Try Claude →',
  },
  {
    n: 5,
    title: 'Talk to your org',
    desc: 'Raise AI at your next team meeting. Share this website. Start the conversation.',
    url: '/',
    cta: 'Share this site →',
    internal: true,
  },
]

const READING = [
  {
    title: 'Sandcastles Blog',
    desc: 'AI strategy for the animal movement',
    url: 'https://sandcastlesblog.substack.com/',
  },
  {
    title: '"Situational Awareness" by Leopold Aschenbrenner',
    desc: 'A comprehensive analysis of where AI is heading',
    url: 'https://situational-awareness.ai/',
  },
  {
    title: 'Cognitive Revolution Podcast',
    desc: 'In-depth conversations about AI progress and implications',
    url: 'https://www.cognitiverevolution.ai/',
  },
  {
    title: '80,000 Hours Podcast',
    desc: "Interviews on the world's most pressing problems, including AI",
    url: 'https://80000hours.org/podcast/',
  },
]

function ResourcesPage() {
  return (
    <>
      <section className="r-hero">
        <div className="r-hero-inner">
          <h1>Resources & Directory</h1>
          <p>Organisations, courses, next steps, and further reading for animal advocates getting started with AI.</p>
        </div>
      </section>

      <section className="r-section">
        <div className="r-inner">
          <h2>Organisations Working on AI × Animals</h2>
          <div className="org-grid">
            {ORGS.map(org => (
              <a
                key={org.name}
                href={org.url}
                target={org.url.startsWith('http') ? '_blank' : undefined}
                rel={org.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`org-card${org.placeholder ? ' org-card--placeholder' : ''}`}
              >
                <div className="org-avatar" aria-hidden="true">
                  {org.placeholder ? '+' : org.name.charAt(0)}
                </div>
                <div className="org-info">
                  <h3>{org.name}</h3>
                  <p>{org.desc}</p>
                </div>
                <span className="org-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="r-section r-section--alt">
        <div className="r-inner">
          <h2>Next Steps You Can Take</h2>
          <div className="steps-list">
            {STEPS.map(step => (
              <div className="step-row" key={step.n}>
                <div className="step-num">{step.n}</div>
                <div className="step-body">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  {step.internal ? (
                    <Link to={step.url} className="step-link">{step.cta}</Link>
                  ) : (
                    <a href={step.url} target="_blank" rel="noopener noreferrer" className="step-link">{step.cta}</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="r-section">
        <div className="r-inner">
          <h2>Further Reading</h2>
          <div className="reading-grid">
            {READING.map(item => (
              <a key={item.title} href={item.url} target="_blank" rel="noopener noreferrer" className="reading-card">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span className="reading-arrow">Visit →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-credit">
            Inspired by{' '}
            <a href="https://sandcastlesblog.substack.com/p/the-tsunami-is-coming" target="_blank" rel="noopener noreferrer">
              "The Tsunami is Coming"
            </a>{' '}
            by Aidan Kankyoku on Sandcastles blog.
          </p>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <a href="https://sandcastlesblog.substack.com" target="_blank" rel="noopener noreferrer">Sandcastles Blog</a>
            <a href="mailto:hello@aiforanimals.org">Contact</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default ResourcesPage
