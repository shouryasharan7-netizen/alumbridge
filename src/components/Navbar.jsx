import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon, BookOpen } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { dark, toggle } = useTheme()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/programs', label: 'Programs' },
    { to: '/alumni', label: 'Alumni' },
    { to: '/projects', label: 'Projects' },
  ]

  const isActive = (path) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <>
      <nav className="fixed top-4 sm:top-6 left-3 right-3 sm:left-6 sm:right-6 z-50"
        style={{
          background: 'var(--bg)',
          border: '3px solid var(--border-color)',
          boxShadow: '4px 4px 0px 0px var(--border-color)',
        }}
      >
        <div className="flex items-center justify-between px-4 sm:px-5 py-2.5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 flex items-center justify-center border-2 border-current"
              style={{ borderColor: 'var(--border-color)', background: 'var(--card)' }}>
              <BookOpen className="w-5 h-5" style={{ color: 'var(--crimson)' }} />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-lg leading-none tracking-wide" style={{ color: 'var(--fg)' }}>ALUMBRIDGE</span>
              <span className="block font-mono text-[9px] font-bold tracking-widest uppercase leading-none" style={{ color: 'var(--muted-text)' }}>
                GLOBAL • PROGRAMS • DATA
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="nav-link px-4 py-2 border-2 transition-all duration-150 hover:-translate-y-0.5"
                style={{
                  fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif",
                  fontSize: '13px',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  color: isActive(link.to) ? 'var(--orange)' : 'var(--fg)',
                  borderColor: isActive(link.to) ? 'var(--border-color)' : 'transparent',
                  background: isActive(link.to) ? 'var(--card)' : 'transparent',
                  boxShadow: isActive(link.to) ? '2px 2px 0px 0px var(--border-color)' : 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/programs"
              className="btn-brutal btn-primary text-[11px]"
              style={{ padding: '8px 20px', fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif" }}
            >
              BROWSE PROGRAMS
            </Link>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-150 hover:-translate-y-0.5"
              style={{
                background: 'var(--card)',
                border: '2px solid var(--border-color)',
                boxShadow: '2px 2px 0px 0px var(--border-color)',
              }}
              aria-label="Toggle theme"
            >
              {dark ? (
                <Sun className="w-4 h-4" style={{ color: 'var(--orange)' }} />
              ) : (
                <Moon className="w-4 h-4" style={{ color: 'var(--fg)' }} />
              )}
            </button>

            <button
              className="md:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-150"
              style={{
                background: 'var(--card)',
                border: '2px solid var(--border-color)',
                boxShadow: '2px 2px 0px 0px var(--border-color)',
              }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" style={{ color: 'var(--fg)' }} /> : <Menu className="w-5 h-5" style={{ color: 'var(--fg)' }} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t-2 px-4 py-3 animate-fade-in" style={{ borderColor: 'var(--border-muted)' }}>
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block py-3 px-4 border-2 mb-2 transition-all duration-150"
                style={{
                  fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif",
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: isActive(link.to) ? 'var(--orange)' : 'var(--fg)',
                  borderColor: isActive(link.to) ? 'var(--border-color)' : 'var(--border-muted)',
                  background: isActive(link.to) ? 'var(--card)' : 'transparent',
                  boxShadow: isActive(link.to) ? '2px 2px 0px 0px var(--border-color)' : 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <div className="h-20 sm:h-24" />
    </>
  )
}
