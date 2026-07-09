import { Link } from 'react-router-dom'
import { Clock, IndianRupee, TrendingUp, BookOpen } from 'lucide-react'

export default function ProgramCard({ program, onShortlist, isShortlisted }) {
  const handleShortlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onShortlist) onShortlist(program.id)
  }

  return (
    <Link
      to={`/programs/${program.id}`}
      className="block bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-primary-200 transition-all duration-200 overflow-hidden group"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-5 py-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-white font-semibold text-base leading-tight">{program.name}</h3>
            <p className="text-primary-100 text-sm mt-1">{program.university} &middot; {program.degree}</p>
          </div>
          {onShortlist && (
            <button
              onClick={handleShortlist}
              className={`text-xs font-medium px-2 py-1 rounded-full transition ${
                isShortlisted
                  ? 'bg-white text-primary-700'
                  : 'bg-primary-500 text-primary-100 hover:bg-white hover:text-primary-700'
              }`}
            >
              {isShortlisted ? '★ Shortlisted' : '+ Shortlist'}
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <IndianRupee className="w-4 h-4 text-primary-500 flex-shrink-0" />
          <span>₹{(program.fees.total / 100000).toFixed(1)}L total fees</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <TrendingUp className="w-4 h-4 text-green-500 flex-shrink-0" />
          <span>Avg. Package: {program.placementStats.avgPackage}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
          <span>{program.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <BookOpen className="w-4 h-4 text-purple-500 flex-shrink-0" />
          <span>{program.testsRequired.join(', ')}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
        <span className="text-xs text-gray-500">Placement: {program.placementStats.placementRate}</span>
        <span className="text-xs text-primary-600 font-medium group-hover:translate-x-1 transition-transform">
          View Details →
        </span>
      </div>
    </Link>
  )
}
