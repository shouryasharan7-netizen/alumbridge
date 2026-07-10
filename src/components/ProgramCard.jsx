import { Link } from 'react-router-dom'
import { Clock, TrendingUp, BookOpen, MapPin, ArrowRight } from 'lucide-react'

export default function ProgramCard({ program, onShortlist, isShortlisted }) {
  const handleShortlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onShortlist) onShortlist(program.id)
  }

  const isForeignCurrency = !['INR', 'USD'].includes(program.fees.currency)

  return (
    <Link
      to={`/programs/${program.id}`}
      className="brutal-card block p-0 overflow-hidden transition-all duration-200 hover:-translate-y-1"
      style={{ boxShadow: '4px 4px 0px 0px var(--border-color)' }}
    >
      {/* Header */}
      <div className="relative px-5 py-5 border-b-2" style={{ borderColor: 'var(--border-muted)', background: 'var(--card-alt)' }}>
        <div className="absolute top-3 right-3 text-2xl opacity-80">{program.flag}</div>
        <div className="ref-code mb-2">[REF_{program.id.toUpperCase()}]</div>
        <h3 className="font-display text-base leading-tight tracking-wide" style={{ color: 'var(--fg)' }}>{program.name}</h3>
        <p className="font-mono text-xs mt-1 flex items-center gap-1" style={{ color: 'var(--muted-text)' }}>
          <MapPin className="w-3 h-3" />
          {program.university} · {program.degree}
        </p>
        {onShortlist && (
          <button
            onClick={handleShortlist}
            className="mt-3 font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 border-2 transition-all duration-150 hover:-translate-y-0.5"
            style={{
              background: isShortlisted ? 'var(--orange)' : 'transparent',
              borderColor: 'var(--border-color)',
              color: 'var(--fg)',
              boxShadow: '2px 2px 0px 0px var(--border-color)',
            }}
          >
            {isShortlisted ? '★ SHORTLISTED' : '+ SHORTLIST'}
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="p-5 space-y-3" style={{ fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif" }}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--subtle-text)' }}>{program.country}</span>
          <div className="text-right">
            <span className="text-xs font-bold" style={{ color: 'var(--orange)' }}>{program.fees.localTotal}</span>
            {isForeignCurrency && (
              <p className="text-[9px] mt-0.5" style={{ color: 'var(--subtle-text)' }}>{program.fees.usdEquiv}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--fg)' }}>
          <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--crimson)' }} />
          <span>AVG PKG: <strong className="font-bold">{program.placementStats.avgPackage}</strong></span>
        </div>
        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--fg)' }}>
          <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--orange)' }} />
          <span>{program.duration} · <strong className="font-bold">{program.placementStats.placementRate}</strong> placed</span>
        </div>
        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted-text)' }}>
          <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{program.testsRequired.join(', ')}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t-2 flex justify-between items-center" style={{ borderColor: 'var(--border-muted)', background: 'var(--card-alt)' }}>
        <span className="ref-code">CUTOFF: {program.cutoffRank.split(' ')[0]}</span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1" style={{ color: 'var(--crimson)' }}>
          VIEW <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  )
}
