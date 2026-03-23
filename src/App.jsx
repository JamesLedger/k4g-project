import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import MainPage from './MainPage'
import ResourcesPage from './ResourcesPage'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onEsc = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [])

  const handleCTA = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById('action')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById('action')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <ScrollToTop />
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <Link to="/" className="nav-brand" aria-label="AI × Animals home">
            AI <span className="nav-x">×</span> Animals
          </Link>
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li>
              <a href="#action" className="nav-cta" onClick={handleCTA}>Take Action</a>
            </li>
          </ul>
        </div>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
