import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-primary-600 text-primary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 text-white font-bold text-lg mb-4">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4.5 h-4.5 text-gold-400" />
              </div>
              <span className="font-display">AlumBridge</span>
            </div>
            <p className="text-sm text-primary-300 leading-relaxed max-w-xs">
              Helping students worldwide make informed decisions about undergraduate programs through verified data and real alumni conversations.
            </p>
          </div>

          <div>
            <h3 className="text-gold-400 font-semibold text-xs uppercase tracking-widest mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/programs" className="hover:text-white transition-colors">Browse Programs</Link></li>
              <li><Link to="/compare" className="hover:text-white transition-colors">Compare Programs</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gold-400 font-semibold text-xs uppercase tracking-widest mb-4">Contact</h3>
            <p className="text-sm text-primary-300">
              Questions? We'd love to hear from you.<br />
              <span className="text-gold-300 font-medium">hello@alumbridge.in</span>
            </p>
            <div className="mt-4 flex gap-2">
              {["🇮🇳", "🇺🇸", "🇬🇧", "🇨🇭", "🇸🇬", "🇨🇦"].map((flag) => (
                <span key={flag} className="text-lg">{flag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-500/30 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-primary-400">
          <span>&copy; {new Date().getFullYear()} AlumBridge. Built for students, by students.</span>
          <span className="mt-2 sm:mt-0">Programs from 6 countries and counting</span>
        </div>
      </div>
    </footer>
  )
}
