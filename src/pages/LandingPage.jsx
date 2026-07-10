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

function programIcon(name, degree) {
  const n = name.toLowerCase()
  if (n.includes('computer') || n.includes('software') || n.includes('data science') || n.includes('ai') || n.includes('artificial')) return '💻'
  if (n.includes('mechanical') || n.includes('automobile') || n.includes('aerospace') || n.includes('aero')) return '🔧'
  if (n.includes('electrical') || n.includes('electronics') || n.includes('vlsi') || n.includes('circuit')) return '⚡'
  if (n.includes('civil') || n.includes('architecture') || n.includes('construction') || n.includes('planning')) return '🏗️'
  if (n.includes('chemical') || n.includes('chemistry') || n.includes('material')) return '🧪'
  if (n.includes('bio') || n.includes('medical') || n.includes('pharma') || n.includes('genetic')) return '🧬'
  if (n.includes('math') || n.includes('statistic') || n.includes('physics')) return '📐'
  if (n.includes('business') || n.includes('management') || n.includes('mba') || n.includes('finance') || n.includes('commerce') || n.includes('economics')) return '📊'
  if (n.includes('design') || n.includes('art') || n.includes('visual') || n.includes('media')) return '🎨'
  if (n.includes('law') || n.includes('legal')) return '⚖️'
  if (n.includes('environment') || n.includes('sustainability') || n.includes('climate')) return '🌱'
  if (n.includes('cyber') || n.includes('security') || n.includes('information security')) return '🔒'
  if (n.includes('robotics') || n.includes('automation') || n.includes('mechatronics')) return '🤖'
  if (n.includes('communication') || n.includes('signal') || n.includes('network') || n.includes('telecom')) return '📡'
  if (n.includes('psychology') || n.includes('cognitive')) return '🧠'
  if (n.includes('english') || n.includes('literature') || n.includes('philosophy') || n.includes('history') || n.includes('linguistics')) return '📚'
  if (n.includes('metallurgical') || n.includes('mining') || n.includes('geology') || n.includes('earth')) return '⛏️'
  if (n.includes('textile') || n.includes('fashion')) return '🧵'
  if (n.includes('food') || n.includes('nutrition')) return '🍽️'
  if (n.includes('nuclear') || n.includes('energy')) return '☢️'
  if (n.includes('agriculture') || n.includes('forestry')) return '🌾'
  if (degree && degree.toLowerCase().includes('b.arch')) return '📏'
  return '🎓'
}

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
      <section className="blueprint-bg relative overflow-hidden" style={{ background: 'var(--card-alt)' }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-20 sm:pb-16">
          <div className="max-w-3xl animate-fade-in">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 mb-6 border-2 px-3 py-1.5" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '2px 2px 0px 0px var(--border-color)' }}>
              <span className="w-2 h-2" style={{ background: 'var(--crimson)' }}></span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--fg)' }}>
                {programs.length} PROGRAMS · {countries.length} COUNTRIES · {alumni.length} ALUMNI
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl leading-none tracking-wide mb-6" style={{ color: 'var(--fg)' }}>
              YOUR PERFECT
              <br />
              <span style={{ color: 'var(--crimson)' }}>COLLEGE?</span>
              <br />
              <span className="font-display text-3xl sm:text-4xl md:text-5xl tracking-wide" style={{ color: 'var(--crimson)' }}>CONNECT&nbsp;&nbsp;GUIDE&nbsp;&nbsp;GROW</span>
            </h1>

            <p className="font-serif text-base sm:text-lg leading-relaxed mb-8 max-w-xl" style={{ color: 'var(--muted-text)' }}>
              Stop drowning in scattered brochures. AlumBridge brings you verified facts and real conversations with alumni from <strong style={{ color: 'var(--fg)' }}>IITs, MIT, Oxford, ETH Zurich</strong> and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/programs" className="btn-brutal btn-primary">
                BROWSE PROGRAMS <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/programs" className="btn-brutal btn-secondary">
                BROWSE & COMPARE
              </Link>
            </div>
          </div>

          {/* Reference codes */}
          <div className="hidden lg:block absolute top-8 right-8 text-right">
            <div className="ref-code">SYS_REF: AB_HERO_V2</div>
            <div className="ref-code mt-1">EST. 2025</div>
            <div className="ref-code mt-1">SCALE 1:1</div>
          </div>
        </div>
      </section>

      {/* Program Scroll Strip */}
      <section className="py-6 border-y-2 overflow-hidden" style={{ background: 'var(--bg)', borderColor: 'var(--border-muted)' }}>
        <div className="max-w-7xl mx-auto px-4 mb-3">
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-center" style={{ color: 'var(--subtle-text)' }}>EXPLORE PROGRAMS ACROSS TOP UNIVERSITIES</p>
        </div>
        <div className="relative">
          <div className="marquee-track" style={{ animationDuration: '140s' }}>
            {[...Array(2)].map((_, rep) => (
              <div key={rep} className="flex items-center gap-3 px-3">
                {[...programs].sort(() => 0.5 - Math.random()).slice(0, 50).map((p) => (
                  <Link key={`${p.id}-${rep}`} to={`/programs/${p.id}`}
                    className="flex-shrink-0 border-2 px-4 py-3 transition-all duration-150 hover:-translate-y-1 hover:border-current group flex items-center gap-3"
                    style={{ borderColor: 'var(--border-muted)', background: 'var(--card)', minWidth: '240px' }}
                  >
                    <span className="text-2xl flex-shrink-0">{programIcon(p.name, p.degree)}</span>
                    <div className="min-w-0">
                      <p className="font-display text-[11px] tracking-wide leading-tight group-hover:underline truncate" style={{ color: 'var(--fg)' }}>{p.name}</p>
                      <p className="font-mono text-[9px] uppercase tracking-wider mt-0.5 truncate" style={{ color: 'var(--muted-text)' }}>{p.university} · {p.degree}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two Pillars */}
      <section className="section-shell" style={{ background: 'var(--card)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2" style={{ background: 'var(--crimson)' }}></span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--crimson)' }}>TWO PILLARS</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl tracking-wide" style={{ color: 'var(--fg)' }}>ONE DECISION.</h2>
            <p className="font-serif mt-2" style={{ color: 'var(--muted-text)' }}>We combine hard data with human insight — so you never choose blind.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="brutal-card p-8 min-h-[250px] flex flex-col justify-between hover:-translate-y-1 transition-all duration-200" style={{ boxShadow: '4px 4px 0px 0px var(--border-color)' }}>
              <div>
                <div className="w-12 h-12 flex items-center justify-center border-2 mb-4" style={{ borderColor: 'var(--border-color)', background: 'var(--card)' }}>
                  <BarChart3 className="w-6 h-6" style={{ color: 'var(--crimson)' }} />
                </div>
                <h3 className="font-display text-xl tracking-wide mb-2" style={{ color: 'var(--fg)' }}>PROGRAM INTELLIGENCE</h3>
                <p className="font-serif text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>
                  Standardized profiles for every program — fees, eligibility, entrance tests, placement stats, and research opportunities.
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Fees", "Cutoffs", "Placements", "Research"].map(tag => (
                  <span key={tag} className="font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 border" style={{ borderColor: 'var(--border-muted)', color: 'var(--fg)' }}>{tag}</span>
                ))}
              </div>
            </div>

            <div className="brutal-card p-8 min-h-[250px] flex flex-col justify-between hover:-translate-y-1 transition-all duration-200" style={{ boxShadow: '4px 4px 0px 0px var(--border-color)' }}>
              <div>
                <div className="w-12 h-12 flex items-center justify-center border-2 mb-4" style={{ borderColor: 'var(--border-color)', background: 'var(--card)' }}>
                  <Users className="w-6 h-6" style={{ color: 'var(--orange)' }} />
                </div>
                <h3 className="font-display text-xl tracking-wide mb-2" style={{ color: 'var(--fg)' }}>ALUMNI GUIDANCE</h3>
                <p className="font-serif text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>
                  Talk to verified graduates of that exact program. Ask questions, book calls, read honest reviews. Real humans, not anonymous Reddit threads.
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Q&A", "Book Calls", "Reviews", "AI Chat"].map(tag => (
                  <span key={tag} className="font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 border" style={{ borderColor: 'var(--border-muted)', color: 'var(--fg)' }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-14 border-y-2" style={{ background: 'var(--bg)', borderColor: 'var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Programs Listed', value: programs.length, suffix: '+', ref: 'DATA.PGM' },
              { label: 'Verified Alumni', value: alumni.length, suffix: '+', ref: 'DATA.ALM' },
              { label: 'Countries', value: countries.length, suffix: '', ref: 'DATA.CTY' },
              { label: 'Avg. Placement', value: 94, suffix: '%', ref: 'DATA.PLC' },
            ].map(({ label, value, suffix, ref }) => (
              <div key={label} className="border-t-2 pt-4" style={{ borderColor: 'var(--border-muted)' }}>
                <div className="font-display text-3xl md:text-4xl tracking-wide" style={{ color: 'var(--fg)' }}>
                  <AnimatedCounter end={value} suffix={suffix} />
                </div>
                <div className="font-mono text-[9px] font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--muted-text)' }}>{label}</div>
                <div className="ref-code mt-1">{ref}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="section-shell" style={{ background: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-2 h-2" style={{ background: 'var(--crimson)' }}></span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--crimson)' }}>FEATURED</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl tracking-wide" style={{ color: 'var(--fg)' }}>PROGRAMS</h2>
            </div>
            <Link to="/programs" className="hidden sm:inline-flex btn-brutal text-[10px]" style={{ padding: '8px 16px', color: 'var(--fg)', background: 'var(--card)', border: '2px solid var(--border-color)', boxShadow: '2px 2px 0px 0px var(--border-color)' }}>
              VIEW ALL {programs.length} <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.slice(0, 6).map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
          <Link to="/programs" className="sm:hidden mt-8 btn-brutal w-full text-center text-[10px]" style={{ padding: '10px 16px', color: 'var(--fg)', background: 'var(--card)', border: '2px solid var(--border-color)', boxShadow: '2px 2px 0px 0px var(--border-color)' }}>
            VIEW ALL {programs.length} PROGRAMS <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-shell border-y-2" style={{ background: 'var(--card)', borderColor: 'var(--border-color)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2" style={{ background: 'var(--orange)' }}></span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--orange)' }}>VOICES</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl tracking-wide mb-8" style={{ color: 'var(--fg)' }}>WHAT STUDENTS SAY</h2>

          <div className="relative min-h-[200px]">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-500 ${
                  i === testimonialIdx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                <div className="brutal-card p-8" style={{ boxShadow: '4px 4px 0px 0px var(--border-color)' }}>
                  <p className="font-serif text-lg md:text-xl leading-relaxed italic mb-4" style={{ color: 'var(--fg)' }}>"{t.text}"</p>
                  <p className="font-mono text-xs font-bold" style={{ color: 'var(--fg)' }}>{t.name}</p>
                  <p className="font-mono text-[10px] mt-0.5" style={{ color: 'var(--subtle-text)' }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIdx(i)}
                className="h-2.5 transition-all duration-200 border"
                style={{
                  width: i === testimonialIdx ? '32px' : '10px',
                  background: i === testimonialIdx ? 'var(--crimson)' : 'transparent',
                  borderColor: 'var(--border-color)',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Compare Table */}
      <section className="section-shell" style={{ background: 'var(--bg)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2" style={{ background: 'var(--crimson)' }}></span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--crimson)' }}>AT A GLANCE</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl tracking-wide" style={{ color: 'var(--fg)' }}>HOW DO THEY COMPARE?</h2>
          </div>
          <div className="overflow-x-auto border-2" style={{ borderColor: 'var(--border-color)', boxShadow: '4px 4px 0px 0px var(--border-color)' }}>
            <table className="w-full min-w-[600px] text-sm" style={{ fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif" }}>
              <thead>
                <tr style={{ background: 'var(--card)', borderBottom: '2px solid var(--border-color)' }}>
                  <th className="text-left py-4 px-5 font-display text-xs tracking-wide" style={{ color: 'var(--fg)' }}>METRIC</th>
                  {[
                    { flag: '🇮🇳', name: 'IIT DELHI CSE' },
                    { flag: '🇺🇸', name: 'MIT EECS' },
                    { flag: '🇨🇭', name: 'ETH ZURICH CS' },
                  ].map(u => (
                    <th key={u.name} className="py-4 px-5 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xl">{u.flag}</span>
                        <span className="font-display text-[11px] tracking-wide" style={{ color: 'var(--fg)' }}>{u.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: '💰 TUITION FEES', vals: [['~$10.8K', '₹9,00,000 total'], ['~$232K', '$57,986/year'], ['~$2.5K', 'CHF 2,190 total']] },
                  { metric: '📈 AVG. PACKAGE', vals: [['22 LPA', '~$26.4K USD'], ['$150K', 'Top tier globally'], ['CHF 105K', '~$120K USD']] },
                  { metric: '🎯 ACCEPTANCE RATE', vals: [['<2%', 'via JEE Advanced'], ['~4%', 'Holistic review'], ['~27%', 'Academic focus']] },
                ].map((row, ri) => (
                  <tr key={row.metric} style={{ background: ri % 2 === 0 ? 'var(--card-alt)' : 'var(--card)', borderBottom: ri < 2 ? '1px solid var(--border-muted)' : 'none' }}>
                    <td className="py-4 px-5 font-bold text-[10px] uppercase tracking-wider" style={{ color: 'var(--fg)' }}>{row.metric}</td>
                    {row.vals.map(([val, sub], ci) => (
                      <td key={ci} className="py-4 px-5 text-center">
                        <span className="font-bold text-sm" style={{ color: 'var(--fg)' }}>{val}</span>
                        <p className="text-[9px] mt-0.5" style={{ color: 'var(--subtle-text)' }}>{sub}</p>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-8">
            <Link to="/programs" className="btn-brutal btn-primary">
              BROWSE & COMPARE ALL <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* AI Chatbot CTA */}
      <section className="section-shell border-y-2" style={{ background: 'var(--card)', borderColor: 'var(--border-color)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--orange)' }} />
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--orange)' }}>AI-POWERED ASSISTANT</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl tracking-wide mb-3" style={{ color: 'var(--fg)' }}>GOT QUESTIONS? ASK OUR AI.</h2>
          <p className="font-serif max-w-md mx-auto mb-6 text-sm" style={{ color: 'var(--muted-text)' }}>
            Our chatbot is trained on alumni reviews, placement data, and program facts from 6 countries. No marketing spin, no ads.
          </p>
          <p className="font-mono text-xs font-bold animate-pulse" style={{ color: 'var(--orange)' }}>CLICK THE CHAT BUTTON IN THE BOTTOM-RIGHT CORNER →</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="blueprint-bg section-shell" style={{ background: 'var(--bg)' }}>
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-4" style={{ color: 'var(--fg)' }}>READY TO FIND YOUR PROGRAM?</h2>
          <p className="font-serif mb-8 max-w-lg mx-auto" style={{ color: 'var(--muted-text)' }}>
            Browse programs from {countries.length} countries, compare them side by side, chat with our AI, and talk to real alumni.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/programs" className="btn-brutal btn-primary">
              START EXPLORING <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/projects" className="btn-brutal btn-secondary">
              STUDENT PROJECTS
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
