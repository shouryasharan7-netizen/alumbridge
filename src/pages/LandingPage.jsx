import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Users, BarChart3, ArrowRight, Globe, Star, Sparkles, ChevronRight } from 'lucide-react'
import { programs } from '../data/programs'
import { alumni } from '../data/alumni'
import ProgramCard from '../components/ProgramCard'

function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration])
  return <span>{count}{suffix}</span>
}

const TESTIMONIALS = [
  { text: "AlumBridge helped me compare IIT Delhi vs MIT in 5 minutes. The alumni chatbot answered questions I couldn't find anywhere else.", name: "Arjun S.", role: "Class 12 Student, Delhi" },
  { text: "Finally, a platform that shows real placement data AND lets you talk to actual graduates. Not just marketing brochures.", name: "Priya K.", role: "JEE Aspirant, Mumbai" },
  { text: "The ETH Zurich page blew my mind — $730/year tuition for a world-class CS program? I had no idea!", name: "Rohan M.", role: "Class 11 Student, Bangalore" },
]

export default function LandingPage() {
  const [testimonialIdx, setTestimonialIdx] = useState(0)
  const countries = [...new Set(programs.map(p => p.country))]

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx(prev => (prev + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-primary-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-crimson-600 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold-400 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4"></div>
          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-primary-400 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6 hover:bg-white/15 transition">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>{programs.length} programs · {countries.length} countries · {alumni.length} alumni</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
              Your perfect college? <br/>
              <span className="text-gold-400">Let's find it together.</span>
            </h1>
            <p className="text-lg text-primary-200 leading-relaxed mb-8 max-w-xl">
              Stop drowning in scattered brochures and confusing forum posts. AlumBridge brings you verified facts and real conversations with alumni from <strong className="text-white">IITs, MIT, Oxford, ETH Zurich</strong> and more — so you choose with confidence, not confusion.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/programs"
                className="inline-flex items-center justify-center gap-2 bg-gold-400 text-primary-800 font-bold px-7 py-3.5 rounded-xl hover:bg-gold-300 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                Browse Programs
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/compare"
                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-[1.02]"
              >
                Compare Side-by-Side
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-cream" style={{clipPath: 'ellipse(60% 100% at 50% 100%)'}}></div>
      </section>

      {/* University Flags Marquee */}
      <section className="py-8 bg-cream">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-primary-400 font-medium uppercase tracking-widest mb-4">Programs from top universities worldwide</p>
          <div className="flex justify-center gap-6 flex-wrap">
            {programs.map(p => (
              <Link key={p.id} to={`/programs/${p.id}`} className="group flex flex-col items-center gap-1 transition-all hover:scale-110 hover:-translate-y-1 duration-300">
                <span className="text-3xl drop-shadow-sm">{p.flag}</span>
                <span className="text-[10px] text-primary-500 group-hover:text-crimson-600 font-medium transition-colors max-w-[80px] truncate">{p.university}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Two Pillars */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-600 mb-3">Two pillars. One decision.</h2>
            <p className="text-primary-400 max-w-lg mx-auto">We combine hard data with human insight — so you never have to choose blind.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-parchment rounded-2xl p-8 border border-gold-200/50 hover:border-gold-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
              <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-crimson-600 group-hover:scale-110 transition-all duration-300">
                <BarChart3 className="w-7 h-7 text-gold-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-primary-600 mb-3">Program Intelligence</h3>
              <p className="text-primary-500 text-sm leading-relaxed">
                Standardized profiles for every program — fees, eligibility, entrance tests, placement stats, and research opportunities. Compare apples to apples, not marketing fluff.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Fees", "Cutoffs", "Placements", "Research"].map(tag => (
                  <span key={tag} className="text-[11px] bg-white text-primary-500 px-2.5 py-1 rounded-full font-medium border border-primary-100/50">{tag}</span>
                ))}
              </div>
            </div>
            <div className="bg-parchment rounded-2xl p-8 border border-crimson-200/50 hover:border-crimson-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
              <div className="w-14 h-14 bg-crimson-600 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary-600 group-hover:scale-110 transition-all duration-300">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-primary-600 mb-3">Alumni Guidance</h3>
              <p className="text-primary-500 text-sm leading-relaxed">
                Talk to verified graduates of that exact program. Ask questions, book calls, read honest reviews. Real humans who've walked the path — not anonymous Reddit threads.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Q&A", "Book Calls", "Reviews", "AI Chat"].map(tag => (
                  <span key={tag} className="text-[11px] bg-white text-primary-500 px-2.5 py-1 rounded-full font-medium border border-primary-100/50">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar with animated counters */}
      <section className="py-14 bg-gradient-to-r from-primary-600 via-primary-700 to-crimson-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Programs Listed', value: programs.length, suffix: '+', icon: BookOpen },
              { label: 'Verified Alumni', value: alumni.length, suffix: '+', icon: Users },
              { label: 'Countries', value: countries.length, suffix: '', icon: Globe },
              { label: 'Avg. Placement', value: 94, suffix: '%', icon: BarChart3 },
            ].map(({ label, value, suffix, icon: Icon }) => (
              <div key={label} className="group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-3 group-hover:bg-gold-400/20 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-gold-400" />
                </div>
                <div className="font-display text-3xl md:text-4xl font-bold">
                  <AnimatedCounter end={value} suffix={suffix} />
                </div>
                <div className="text-sm text-primary-200 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-600">Featured Programs</h2>
              <p className="text-primary-400 text-sm mt-1">Hand-picked programs with verified alumni across the globe</p>
            </div>
            <Link to="/programs" className="hidden sm:inline-flex items-center gap-1 text-crimson-600 text-sm font-semibold hover:text-crimson-700 transition-colors group">
              View all {programs.length} programs <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.slice(0, 6).map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
          <Link to="/programs" className="sm:hidden mt-8 flex items-center justify-center gap-1 text-crimson-600 text-sm font-semibold">
            View all {programs.length} programs <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-600 mb-8">What students are saying</h2>
          <div className="relative min-h-[180px]">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-500 ${
                  i === testimonialIdx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                <div className="bg-parchment rounded-2xl p-8 border border-gold-200/50 shadow-sm">
                  <div className="flex justify-center mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-gold-400 fill-gold-400" />
                    ))}
                  </div>
                  <p className="text-primary-600 text-base leading-relaxed italic mb-4">"{t.text}"</p>
                  <p className="text-sm font-semibold text-primary-700">{t.name}</p>
                  <p className="text-xs text-primary-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIdx(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === testimonialIdx ? 'bg-crimson-600 w-8' : 'bg-primary-200 hover:bg-primary-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* AI Chatbot CTA */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-crimson-700 rounded-3xl p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-crimson-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold-400/20 rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs mb-4">
                <Sparkles className="w-3 h-3 text-gold-400" />
                <span>AI-Powered Assistant</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">Got questions? Ask our AI.</h2>
              <p className="text-primary-200 max-w-md mx-auto mb-6 text-sm">
                Our chatbot is trained on alumni reviews, placement data, and program facts from 6 countries. It answers honestly — no marketing spin, no ads.
              </p>
              <p className="text-gold-400 text-sm font-medium animate-pulse">Click the chat button in the bottom-right corner →</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Comparison Teaser — Side-by-side Table */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-600 mb-2">At a glance: How do they compare?</h2>
            <p className="text-primary-400 text-sm">A sneak peek — use our full compare tool for detailed analysis</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-primary-100/50 shadow-sm">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="bg-primary-600 text-white">
                  <th className="text-left py-4 px-5 font-display text-sm font-semibold sticky left-0 bg-primary-600 z-10">Metric</th>
                  <th className="py-4 px-5 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xl">🇮🇳</span>
                      <span className="font-display font-bold text-xs">IIT Delhi CSE</span>
                    </div>
                  </th>
                  <th className="py-4 px-5 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xl">🇺🇸</span>
                      <span className="font-display font-bold text-xs">MIT EECS</span>
                    </div>
                  </th>
                  <th className="py-4 px-5 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xl">🇨🇭</span>
                      <span className="font-display font-bold text-xs">ETH Zurich CS</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-primary-50 bg-parchment">
                  <td className="py-4 px-5 font-semibold text-primary-600 sticky left-0 bg-parchment z-10">💰 Tuition Fees</td>
                  <td className="py-4 px-5 text-center">
                    <span className="font-bold text-primary-700">~$10.8K</span>
                    <p className="text-[10px] text-primary-400 mt-0.5">₹9,00,000 total</p>
                  </td>
                  <td className="py-4 px-5 text-center">
                    <span className="font-bold text-primary-700">~$232K</span>
                    <p className="text-[10px] text-primary-400 mt-0.5">$57,986/year</p>
                  </td>
                  <td className="py-4 px-5 text-center">
                    <span className="font-bold text-primary-700">~$2.5K</span>
                    <p className="text-[10px] text-primary-400 mt-0.5">CHF 2,190 total</p>
                  </td>
                </tr>
                <tr className="border-b border-primary-50">
                  <td className="py-4 px-5 font-semibold text-primary-600 sticky left-0 bg-white z-10">📈 Avg. Package</td>
                  <td className="py-4 px-5 text-center">
                    <span className="font-bold text-crimson-600">22 LPA</span>
                    <p className="text-[10px] text-primary-400 mt-0.5">~$26.4K USD</p>
                  </td>
                  <td className="py-4 px-5 text-center">
                    <span className="font-bold text-crimson-600">$150K</span>
                    <p className="text-[10px] text-primary-400 mt-0.5">Top tier globally</p>
                  </td>
                  <td className="py-4 px-5 text-center">
                    <span className="font-bold text-crimson-600">CHF 105K</span>
                    <p className="text-[10px] text-primary-400 mt-0.5">~$120K USD</p>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-semibold text-primary-600 sticky left-0 bg-parchment z-10">🎯 Acceptance Rate</td>
                  <td className="py-4 px-5 text-center">
                    <span className="font-bold text-primary-700">&lt;2%</span>
                    <p className="text-[10px] text-primary-400 mt-0.5">via JEE Advanced</p>
                  </td>
                  <td className="py-4 px-5 text-center">
                    <span className="font-bold text-primary-700">~4%</span>
                    <p className="text-[10px] text-primary-400 mt-0.5">Holistic review</p>
                  </td>
                  <td className="py-4 px-5 text-center">
                    <span className="font-bold text-primary-700">~27%</span>
                    <p className="text-[10px] text-primary-400 mt-0.5">Academic focus</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-center mt-8">
            <Link to="/compare" className="inline-flex items-center gap-2 bg-primary-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-crimson-600 transition-all duration-300 shadow-sm hover:shadow-md">
              Compare All Programs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-cream to-parchment">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-600 mb-4">Ready to find your program?</h2>
          <p className="text-primary-400 mb-8 max-w-lg mx-auto">
            Browse programs from {countries.length} countries, compare them side by side, chat with our AI, and talk to real alumni who've been there.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 bg-crimson-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-crimson-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              Start Exploring
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/compare"
              className="inline-flex items-center gap-2 bg-white text-primary-600 font-bold px-8 py-4 rounded-xl border border-primary-200 hover:border-crimson-300 hover:text-crimson-600 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Compare Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
