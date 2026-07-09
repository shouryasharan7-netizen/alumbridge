import { Link, useLocation } from 'react-router-dom'
import { GraduationCap, Menu, X, Globe } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { to: '/programs', label: 'Programs' },
    { to: '/compare', label: 'Compare' },
  ]

  const isActive = (path) => location.pathname.startsWith(path)

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-primary-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center group-hover:bg-crimson-600 transition-colors duration-300">
              <GraduationCap className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="font-display font-bold text-primary-600 text-lg leading-none">AlumBridge</span>
              <span className="block text-[10px] text-gold-500 font-medium tracking-widest uppercase leading-none">Global Programs</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-all duration-200 pb-0.5 border-b-2 ${
                  isActive(link.to)
                    ? 'text-crimson-600 border-crimson-600'
                    : 'text-primary-600/70 border-transparent hover:text-primary-600 hover:border-gold-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/programs"
              className="inline-flex items-center gap-1.5 bg-primary-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-crimson-600 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <Globe className="w-3.5 h-3.5" />
              Explore Programs
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-primary-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-primary-100 animate-fade-in">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-primary-600 hover:bg-cream hover:text-crimson-600 transition font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/programs"
              onClick={() => setMobileOpen(false)}
              className="block mx-4 mt-2 text-center bg-primary-600 text-white font-medium px-4 py-2.5 rounded-lg hover:bg-crimson-600 transition"
            >
              Explore Programs
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
