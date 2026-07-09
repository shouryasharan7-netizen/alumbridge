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
    'from-purple-500 to-purple-700',
    'from-pink-500 to-pink-700',
    'from-indigo-500 to-indigo-700',
    'from-teal-500 to-teal-700',
  ]
  const colorIndex = alum.id.charCodeAt(1) % colors.length

  return (
    <Link
      to={`/alumni/${alum.id}`}
      className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-primary-200 transition-all duration-200 p-5 group"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
          {initials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900 text-sm">{alum.name}</h4>
            {alum.available && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                Available
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-gray-600 text-xs mt-1">
            <Briefcase className="w-3 h-3" />
            <span className="truncate">{alum.currentRole} at {alum.company}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5">
            <Calendar className="w-3 h-3" />
            <span>Class of {alum.graduationYear}</span>
          </div>

          {/* Expertise tags */}
          <div className="flex flex-wrap gap-1 mt-2">
            {alum.expertise.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary-500 transition flex-shrink-0 mt-1" />
      </div>
    </Link>
  )
}
