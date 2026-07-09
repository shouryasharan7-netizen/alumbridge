import { Link } from 'react-router-dom'
import { BookOpen, Users, BarChart3, ArrowRight, Shield, MessageCircle } from 'lucide-react'
import { programs } from '../data/programs'
import ProgramCard from '../components/ProgramCard'

export default function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgY3g9IjMwIiBjeT0iMzAiIHI9IjIiLz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
              <Shield className="w-4 h-4" />
              <span>Verified alumni &middot; Real data &middot; No fluff</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              Pick the right college program — with confidence.
            </h1>
            <p className="text-lg text-primary-100 leading-relaxed mb-8">
              AlumBridge combines structured program facts — fees, eligibility, placement outcomes — with real conversations from verified alumni who've been there. No more guessing, no more marketing hype.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/programs"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 font-semibold px-6 py-3 rounded-lg hover:bg-primary-50 transition shadow-lg"
              >
                Browse Programs
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/compare"
                className="inline-flex items-center justify-center gap-2 bg-primary-500/50 border border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-500/70 transition"
              >
                Compare Side-by-Side
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Two pillars, one platform</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Everything you need to make an informed decision — in one place.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-primary-50 rounded-2xl p-8 border border-primary-100">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Program Intelligence</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Standardized profiles for every program: eligibility criteria, annual fees, entrance tests, placement statistics, and research opportunities. Compare programs side by side on metrics that matter.
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-8 border border-purple-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Alumni Guidance</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Connect with verified graduates of that exact program. Ask questions, book a short call, and read honest reviews from people who've walked the path — not anonymous forum posts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Programs Listed', value: '4+', icon: BookOpen },
              { label: 'Verified Alumni', value: '14+', icon: Users },
              { label: 'Avg. Placement', value: '91%', icon: BarChart3 },
              { label: 'Questions Answered', value: '100+', icon: MessageCircle },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label}>
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary-100 rounded-lg mb-3">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{value}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Programs</h2>
              <p className="text-gray-600 text-sm mt-1">Top programs with verified alumni</p>
            </div>
            <Link to="/programs" className="text-primary-600 text-sm font-medium hover:text-primary-700 flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.slice(0, 3).map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-indigo-600 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to find your perfect program?</h2>
          <p className="text-primary-100 mb-8">
            Browse all programs, compare them side by side, and talk to alumni who've been there.
          </p>
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-8 py-3 rounded-lg hover:bg-primary-50 transition shadow-lg"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
