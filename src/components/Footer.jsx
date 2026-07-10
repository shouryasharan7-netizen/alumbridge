import { BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { programs } from '../data/programs'

const flags = [...new Set(programs.map(p => p.flag))]

export default function Footer() {
  return (
    <footer className="noise-overlay" style={{ background: 'var(--bg)' }}>
      {/* Marquee band */}
      <div className="overflow-hidden border-t-4 border-b-4" style={{ borderColor: 'var(--border-color)', background: 'var(--card)' }}>
        <div className="marquee-track py-4">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex items-center gap-12 px-6">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="font-display text-3xl sm:text-4xl tracking-wide whitespace-nowrap" style={{ color: i % 2 === 0 ? 'var(--fg)' : 'var(--crimson)' }}>
                  ALUMBRIDGE™
                </span>
              ))}
              {[...Array(6)].map((_, i) => (
                <span key={`s${i}`} className="text-xl" style={{ color: 'var(--orange)' }}>✦</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 flex items-center justify-center border-2" style={{ borderColor: 'var(--border-color)', background: 'var(--card)' }}>
                <BookOpen className="w-5 h-5" style={{ color: 'var(--crimson)' }} />
              </div>
              <span className="font-display text-xl tracking-wide" style={{ color: 'var(--fg)' }}>ALUMBRIDGE</span>
            </div>
            <p className="font-serif text-sm leading-relaxed max-w-xs" style={{ color: 'var(--muted-text)' }}>
              Helping students worldwide make informed decisions about undergraduate programs through verified data and real alumni conversations.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 max-w-[220px]">
              {flags.map((flag) => (
                <span key={flag} className="text-lg leading-none">{flag}</span>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--orange)', fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif" }}>EXPLORE</h3>
            <ul className="space-y-2.5 text-sm" style={{ fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif", letterSpacing: '0.3px' }}>
              <li><Link to="/" className="hover:underline" style={{ color: 'var(--fg)' }}>Home</Link></li>
              <li><Link to="/programs" className="hover:underline" style={{ color: 'var(--fg)' }}>Browse Programs</Link></li>
              <li><Link to="/alumni" className="hover:underline" style={{ color: 'var(--fg)' }}>Alumni Network</Link></li>
              <li><Link to="/projects" className="hover:underline" style={{ color: 'var(--fg)' }}>Student Projects</Link></li>
              <li><Link to="/sitemap" className="hover:underline" style={{ color: 'var(--fg)' }}>Site Map</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--orange)', fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif" }}>CONNECT</h3>
            <div className="space-y-2 text-sm" style={{ fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif", letterSpacing: '0.3px', color: 'var(--fg)' }}>
              <p>
                <a href="mailto:hello@alumbridge.in" className="underline hover:no-underline">hello@alumbridge.in</a>
              </p>
              <p className="flex items-center gap-1.5" style={{ color: 'var(--muted-text)' }}>
                📍 Built for students, worldwide
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t-4 px-4 py-6" style={{ borderColor: 'var(--border-color)', background: 'var(--card)' }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-xs" style={{ fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif", letterSpacing: '0.5px', color: 'var(--muted-text)' }}>
          <span className="font-bold tracking-wider" style={{ color: 'var(--fg)' }}>ALUMBRIDGE™ — GLOBAL PROGRAM INTELLIGENCE</span>
          <span>&copy; {new Date().getFullYear()} AlumBridge. Built for students, by students.</span>
        </div>
      </div>
    </footer>
  )
}
