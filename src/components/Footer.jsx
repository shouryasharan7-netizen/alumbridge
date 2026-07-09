import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <GraduationCap className="w-6 h-6" />
              <span>AlumBridge</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Helping students make informed decisions about their undergraduate programs through verified data and real alumni conversations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/programs" className="hover:text-white transition">Browse Programs</Link></li>
              <li><Link to="/compare" className="hover:text-white transition">Compare Programs</Link></li>
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">Contact</h3>
            <p className="text-sm text-gray-400">
              Have questions? Reach out at<br />
              <span className="text-primary-400">hello@alumbridge.in</span>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} AlumBridge. Built for students, by students.
        </div>
      </div>
    </footer>
  )
}
