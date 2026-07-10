import { Link } from 'react-router-dom'
import { Briefcase, Calendar, ArrowRight, Check } from 'lucide-react'

export default function AlumniCard({ alum }) {
  const initials = alum.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <Link
      to={`/alumni/${alum.id}`}
      className="brutal-card block p-4 transition-all duration-200 hover:-translate-y-0.5"
      style={{ boxShadow: '3px 3px 0px 0px var(--border-color)' }}
    >
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 flex items-center justify-center text-sm font-bold flex-shrink-0 border-2"
          style={{ borderColor: 'var(--border-color)', background: 'var(--card)', color: 'var(--fg)', fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif" }}>
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm" style={{ color: 'var(--fg)', fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif" }}>{alum.name}</h4>
              {alum.available && (
                <span className="inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 border"
                  style={{ borderColor: '#059669', color: '#059669' }}>
                  <Check className="w-2.5 h-2.5" /> Available
                </span>
              )}
            </div>
            <ArrowRight className="w-4 h-4 flex-shrink-0 transition-transform" style={{ color: 'var(--subtle-text)' }} />
          </div>
          <div className="flex items-center gap-1 text-xs mt-1" style={{ color: 'var(--muted-text)', fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif" }}>
            <Briefcase className="w-3 h-3" style={{ color: 'var(--crimson)' }} />
            <span className="truncate">{alum.currentRole} @ <strong>{alum.company}</strong></span>
          </div>
          <div className="flex items-center gap-1 text-xs mt-0.5" style={{ color: 'var(--subtle-text)', fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif" }}>
            <Calendar className="w-3 h-3" style={{ color: 'var(--orange)' }} />
            <span>Class of {alum.graduationYear}</span>
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {alum.expertise.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border"
                style={{ borderColor: 'var(--border-muted)', color: 'var(--fg)', fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
