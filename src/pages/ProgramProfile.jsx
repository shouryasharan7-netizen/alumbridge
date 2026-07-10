import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, TrendingUp, Building2, FlaskConical, Users, Award, Star, Target, MapPin, DollarSign, ArrowRight } from 'lucide-react'
import { programs } from '../data/programs'
import { alumni } from '../data/alumni'
import AlumniCard from '../components/AlumniCard'

export default function ProgramProfile() {
  const { id } = useParams()
  const program = programs.find((p) => p.id === id)

  if (!program) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-display text-2xl tracking-wide mb-4" style={{ color: 'var(--fg)' }}>PROGRAM NOT FOUND</h2>
        <Link to="/programs" className="font-mono text-sm font-bold" style={{ color: 'var(--crimson)' }}>← BACK TO PROGRAMS</Link>
      </div>
    )
  }

  const programAlumni = alumni.filter((a) => program.alumni.includes(a.id))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <Link to="/programs" className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider mb-6" style={{ color: 'var(--muted-text)' }}>
        <ArrowLeft className="w-4 h-4" /> BACK TO ALL PROGRAMS
      </Link>

      {/* Hero */}
      <div className="brutal-card p-8 mb-8 relative overflow-hidden" style={{ boxShadow: '4px 4px 0px 0px var(--border-color)' }}>
        <div className="absolute top-4 right-4 text-6xl opacity-10">{program.flag}</div>
        <div className="ref-code mb-3">[REF_{program.id.toUpperCase()}] // {program.country.toUpperCase()}</div>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-2xl md:text-4xl tracking-wide mb-2" style={{ color: 'var(--fg)' }}>{program.name}</h1>
            <p className="font-mono text-sm" style={{ color: 'var(--muted-text)' }}>{program.university} · {program.degree} · {program.duration}</p>
          </div>
          <div className="border-2 p-4" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '2px 2px 0px 0px var(--border-color)' }}>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--orange)' }}>CUTOFF</div>
            <div className="font-mono text-sm font-bold" style={{ color: 'var(--fg)' }}>{program.cutoffRank}</div>
          </div>
        </div>
        <p className="font-serif text-sm leading-relaxed mt-5 max-w-3xl" style={{ color: 'var(--muted-text)' }}>{program.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Fees & Eligibility */}
          <div className="brutal-card p-6" style={{ boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
            <h2 className="font-display text-lg tracking-wide mb-4 flex items-center gap-2" style={{ color: 'var(--fg)' }}>
              <DollarSign className="w-5 h-5" style={{ color: 'var(--orange)' }} /> FEES & ELIGIBILITY
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="font-mono text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--subtle-text)' }}>FEES</p>
                <p className="font-mono text-lg font-bold" style={{ color: 'var(--fg)' }}>{program.fees.usdEquiv}</p>
                <p className="font-mono text-[10px] mt-0.5" style={{ color: 'var(--muted-text)' }}>
                  {program.fees.currency === 'INR'
                    ? `₹${(program.fees.annual / 1000).toFixed(0)}K/year · ${program.fees.localTotal} total`
                    : `${program.fees.currency} ${(program.fees.annual).toLocaleString()}/year`}
                </p>
              </div>
              <div>
                <p className="font-mono text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--subtle-text)' }}>ELIGIBILITY</p>
                <p className="font-mono text-sm font-bold" style={{ color: 'var(--fg)' }}>{program.eligibility.minimum}</p>
                <p className="font-mono text-[10px] mt-0.5" style={{ color: 'var(--muted-text)' }}>{program.eligibility.board}</p>
              </div>
              <div>
                <p className="font-mono text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--subtle-text)' }}>ENTRANCE TESTS</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {program.testsRequired.map((test) => (
                    <span key={test} className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 border-2" style={{ borderColor: 'var(--crimson)', color: 'var(--crimson)' }}>
                      {test}
                    </span>
                  ))}
                </div>
                {program.cutoffScoreRange && (
                  <p className="font-mono text-[10px] font-bold mt-2 flex items-center gap-1" style={{ color: 'var(--orange)' }}>
                    <Target className="w-3 h-3" /> {program.cutoffScoreRange}
                  </p>
                )}
              </div>
              <div>
                <p className="font-mono text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--subtle-text)' }}>DURATION</p>
                <p className="font-mono text-sm font-bold flex items-center gap-1" style={{ color: 'var(--fg)' }}>
                  <Clock className="w-4 h-4" style={{ color: 'var(--orange)' }} /> {program.duration}
                </p>
              </div>
            </div>
          </div>

          {/* Placement Stats */}
          <div className="brutal-card p-6" style={{ boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
            <h2 className="font-display text-lg tracking-wide mb-4 flex items-center gap-2" style={{ color: 'var(--fg)' }}>
              <TrendingUp className="w-5 h-5" style={{ color: 'var(--crimson)' }} /> PLACEMENT OUTCOMES
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-5">
              {[
                { label: 'AVG. PACKAGE', value: program.placementStats.avgPackage, color: 'var(--crimson)' },
                { label: 'HIGHEST', value: program.placementStats.highestPackage, color: 'var(--fg)' },
                { label: 'PLACEMENT', value: program.placementStats.placementRate, color: 'var(--orange)' },
              ].map(s => (
                <div key={s.label} className="border-2 p-4 text-center" style={{ borderColor: 'var(--border-color)', background: 'var(--card)' }}>
                  <p className="font-mono text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--subtle-text)' }}>{s.label}</p>
                  <p className="font-mono text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1" style={{ color: 'var(--subtle-text)' }}>
                <Building2 className="w-3 h-3" /> TOP RECRUITERS
              </p>
              <div className="flex flex-wrap gap-2">
                {program.placementStats.topRecruiters.map((rec) => (
                  <span key={rec} className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 border" style={{ borderColor: 'var(--border-muted)', color: 'var(--fg)' }}>
                    {rec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Research */}
          <div className="brutal-card p-6" style={{ boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
            <h2 className="font-display text-lg tracking-wide mb-4 flex items-center gap-2" style={{ color: 'var(--fg)' }}>
              <FlaskConical className="w-5 h-5" style={{ color: 'var(--fg)' }} /> RESEARCH OPPORTUNITIES
            </h2>
            <ul className="space-y-3">
              {program.researchOpportunities.map((opp) => (
                <li key={opp} className="flex items-start gap-3 font-serif text-sm" style={{ color: 'var(--muted-text)' }}>
                  <span className="w-2 h-2 mt-1.5 flex-shrink-0" style={{ background: 'var(--orange)' }}></span>
                  {opp}
                </li>
              ))}
            </ul>
          </div>

          {/* Alumni Reviews */}
          <div className="brutal-card p-6" style={{ boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
            <h2 className="font-display text-lg tracking-wide mb-4 flex items-center gap-2" style={{ color: 'var(--fg)' }}>
              <Star className="w-5 h-5" style={{ color: 'var(--orange)' }} /> ALUMNI REVIEWS
            </h2>
            <div className="space-y-4">
              {programAlumni.filter(a => a.review).slice(0, 3).map((alum) => {
                const initials = alum.name.split(' ').map(n => n[0]).join('')
                return (
                  <div key={alum.id} className="border-2 p-4" style={{ borderColor: 'var(--border-muted)', background: 'var(--card-alt)' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 flex items-center justify-center text-xs font-bold border-2" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', color: 'var(--fg)', fontFamily: 'JetBrains Mono, monospace' }}>
                        {initials}
                      </div>
                      <div>
                        <p className="font-mono text-sm font-bold" style={{ color: 'var(--fg)' }}>{alum.name}</p>
                        <p className="font-mono text-[10px]" style={{ color: 'var(--subtle-text)' }}>{alum.currentRole} @ {alum.company} · Class of {alum.graduationYear}</p>
                      </div>
                      <div className="ml-auto flex">
                        {Array.from({ length: alum.review.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: 'var(--orange)' }} />
                        ))}
                      </div>
                    </div>
                    <p className="font-serif text-sm leading-relaxed italic" style={{ color: 'var(--muted-text)' }}>"{alum.review.text}"</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="brutal-card p-6" style={{ boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
            <h2 className="font-display text-lg tracking-wide mb-1 flex items-center gap-2" style={{ color: 'var(--fg)' }}>
              <Users className="w-5 h-5" style={{ color: 'var(--crimson)' }} /> VERIFIED ALUMNI
            </h2>
            <p className="font-mono text-[10px] mb-4" style={{ color: 'var(--subtle-text)' }}>Graduates of this program. Ask them anything.</p>
            <div className="space-y-3">
              {programAlumni.map((alum) => (
                <AlumniCard key={alum.id} alum={alum} />
              ))}
            </div>
          </div>

          <div className="brutal-card p-6" style={{ boxShadow: '3px 3px 0px 0px var(--border-color)', borderColor: 'var(--orange)' }}>
            <Award className="w-8 h-8 mb-3" style={{ color: 'var(--orange)' }} />
            <h3 className="font-display text-base tracking-wide mb-2" style={{ color: 'var(--fg)' }}>NOT SURE WHICH TO PICK?</h3>
            <p className="font-serif text-sm mb-4" style={{ color: 'var(--muted-text)' }}>Compare this program side-by-side with others.</p>
            <Link
              to={`/compare?selected=${program.id}`}
              className="inline-flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--crimson)' }}
            >
              COMPARE PROGRAMS <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
