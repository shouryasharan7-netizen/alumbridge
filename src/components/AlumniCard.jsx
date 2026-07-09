import { Link } from 'react-router-dom'
import { Briefcase, Calendar, ChevronRight } from 'lucide-react'

export default function AlumniCard({ alum }) {
  const initials = alum.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  const colors = [
    'from-primary-500 to-primary-700',
    'from-crimson-500 to-crimson-700',
    'from-primary-600 to-crimson-600',
    'from-gold-500 to-gold-700',
    'from-crimson-400 to-primary-600',
  ]
  const colorIndex = alum.id.charCodeAt(1) % colors.length

  return (
    <Link
      to={`/alumni/${alum.id}`}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg border border-primary-100/50 hover:border-gold-300 transition-all duration-300 p-4 group"
    >
      <div className="flex items-start gap-3.5">
        <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ring-2 ring-white shadow-sm`}>
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-primary-700 text-sm">{alum.name}</h4>
            {alum.available && (
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold ring-1 ring-emerald-200">
                Available
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-primary-500 text-xs mt-0.5">
            <Briefcase className="w-3 h-3 text-crimson-400" />
            <span className="truncate">{alum.currentRole} at <strong>{alum.company}</strong></span>
          </div>
          <div className="flex items-center gap-1 text-primary-400 text-xs mt-0.5">
            <Calendar className="w-3 h-3 text-gold-500" />
            <span>Class of {alum.graduationYear}</span>
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {alum.expertise.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] bg-cream text-primary-600 px-2 py-0.5 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <ChevronRight className="w-4 h-4 text-primary-200 group-hover:text-crimson-500 transition-all duration-200 flex-shrink-0 mt-1 group-hover:translate-x-0.5" />
      </div>
    </Link>
  )
}
