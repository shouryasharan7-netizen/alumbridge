import { Link } from 'react-router-dom'
import { Clock, TrendingUp, BookOpen, MapPin, DollarSign } from 'lucide-react'

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
      className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl border border-primary-100/50 hover:border-gold-300 transition-all duration-300 overflow-hidden"
    >
      {/* Header with country flag */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-600 to-primary-700 px-5 py-5">
        <div className="absolute top-3 right-3 text-2xl opacity-80">{program.flag}</div>
        <div className="relative">
          <h3 className="font-display text-white font-semibold text-base leading-tight mb-1">{program.name}</h3>
          <p className="text-primary-200 text-sm flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {program.university} &middot; {program.degree}
          </p>
        </div>
        {onShortlist && (
          <button
            onClick={handleShortlist}
            className={`absolute bottom-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-200 ${
              isShortlisted
                ? 'bg-gold-400 text-primary-800 shadow-sm'
                : 'bg-white/15 text-white hover:bg-gold-400 hover:text-primary-800'
            }`}
          >
            {isShortlisted ? '★ Shortlisted' : '+ Shortlist'}
          </button>
        )}
      </div>

      {/* Stats with bold metrics */}
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-primary-400 uppercase tracking-wide">{program.country}</span>
          <div className="text-right">
            <span className="text-xs font-semibold text-gold-600">{program.fees.localTotal}</span>
            {isForeignCurrency && (
              <p className="text-[10px] text-primary-400 mt-0.5">{program.fees.usdEquiv}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-primary-600/80">
          <TrendingUp className="w-4 h-4 text-crimson-500 flex-shrink-0" />
          <span>Avg. Package: <strong className="text-primary-700 font-semibold">{program.placementStats.avgPackage}</strong></span>
        </div>
        <div className="flex items-center gap-2 text-sm text-primary-600/80">
          <Clock className="w-4 h-4 text-gold-500 flex-shrink-0" />
          <span>Duration: <strong className="text-primary-700 font-semibold">{program.duration}</strong> &middot; <strong className="text-primary-700 font-semibold">{program.placementStats.placementRate}</strong> placed</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-primary-600/80">
          <BookOpen className="w-4 h-4 text-primary-400 flex-shrink-0" />
          <span className="truncate">{program.testsRequired.join(', ')}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-primary-50 bg-parchment flex justify-between items-center">
        <span className="text-[11px] text-primary-400 font-medium">Cutoff: {program.cutoffRank.split(' ')[0]}</span>
        <span className="text-xs text-crimson-600 font-semibold group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-1">
          View Details <span className="text-sm">→</span>
        </span>
      </div>
    </Link>
  )
}
