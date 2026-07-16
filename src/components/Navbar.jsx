import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Sun, Moon, BookOpen, LogIn, LogOut, User } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { dark, toggle } = useTheme()
  const { currentUser, logout } = useAuth()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/programs', label: 'Programs' },
    { to: '/alumni', label: 'Alumni' },
    { to: '/projects', label: 'Projects' },
    { to: '/mentor', label: 'Mentor' },
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

            {/* Auth Buttons */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <Link
                  to={currentUser.role === 'alumni' ? '/alumni-dashboard' : '/dashboard'}
                  className="flex items-center gap-1.5 px-3 py-2 border-2 transition-all hover:-translate-y-0.5"
                  style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '2px 2px 0px 0px var(--border-color)', fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif", fontSize: '11px', color: 'var(--fg)' }}
                >
                  <User className="w-3.5 h-3.5" /> {currentUser.name?.split(' ')[0]?.toUpperCase()}
                </Link>
                <button
                  onClick={() => { logout(); navigate('/') }}
                  className="flex items-center gap-1 px-3 py-2 border-2 transition-all hover:-translate-y-0.5"
                  style={{ borderColor: 'var(--border-color)', background: 'var(--card-alt)', boxShadow: '2px 2px 0px 0px var(--border-color)', fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif", fontSize: '11px', color: 'var(--crimson)' }}
                >
                  <LogOut className="w-3.5 h-3.5" /> EXIT
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-3 py-2 border-2 transition-all hover:-translate-y-0.5"
                style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '2px 2px 0px 0px var(--border-color)', fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif", fontSize: '11px', color: 'var(--fg)' }}
              >
                <LogIn className="w-3.5 h-3.5" /> LOGIN
              </Link>
            )}
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

            {/* Mobile Auth Buttons */}
            <div className="mt-3 pt-3 border-t-2" style={{ borderColor: 'var(--border-muted)' }}>
              {currentUser ? (
                <div className="flex flex-col gap-2">
                  <Link
                    to={currentUser.role === 'alumni' ? '/alumni-dashboard' : '/dashboard'}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 py-3 px-4 border-2 transition-all"
                    style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '2px 2px 0px 0px var(--border-color)', fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif", fontSize: '14px', color: 'var(--fg)', textTransform: 'uppercase' }}
                  >
                    <User className="w-4 h-4" /> {currentUser.name?.split(' ')[0]?.toUpperCase()} — DASHBOARD
                  </Link>
                  <button
                    onClick={() => { logout(); setMobileOpen(false); navigate('/') }}
                    className="flex items-center gap-2 py-3 px-4 border-2 transition-all"
                    style={{ borderColor: 'var(--border-color)', background: 'var(--card-alt)', boxShadow: '2px 2px 0px 0px var(--border-color)', fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif", fontSize: '14px', color: 'var(--crimson)', textTransform: 'uppercase' }}
                  >
                    <LogOut className="w-4 h-4" /> EXIT
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 py-3 px-4 border-2 transition-all"
                  style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '2px 2px 0px 0px var(--border-color)', fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif", fontSize: '14px', color: 'var(--fg)', textTransform: 'uppercase' }}
                >
                  <LogIn className="w-4 h-4" /> LOGIN
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <div className="h-20 sm:h-24" />
    </>
  )
}
