import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, IndianRupee, Clock, BookOpen, TrendingUp, Building2, FlaskConical, Users, Award, Star, Target } from 'lucide-react'
import { programs } from '../data/programs'
import { alumni } from '../data/alumni'
import AlumniCard from '../components/AlumniCard'

export default function ProgramProfile() {
  const { id } = useParams()
  const program = programs.find((p) => p.id === id)

  if (!program) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Program not found</h2>
        <Link to="/programs" className="text-primary-600 hover:text-primary-700 font-medium">
          ← Back to Programs
        </Link>
      </div>
    )
  }

  const programAlumni = alumni.filter((a) => program.alumni.includes(a.id))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back link */}
      <Link to="/programs" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-primary-600 mb-6 transition">
        <ArrowLeft className="w-4 h-4" />
        Back to Programs
      </Link>

      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{program.name}</h1>
            <p className="text-primary-100 text-lg">{program.university} &middot; {program.degree} &middot; {program.duration}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3">
            <div className="text-xs text-primary-100 mb-1">Cutoff Rank</div>
            <div className="font-semibold">{program.cutoffRank}</div>
          </div>
        </div>
        <p className="text-primary-100 mt-4 max-w-3xl text-sm leading-relaxed">{program.description}</p>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - facts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Fees & Eligibility */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-primary-600" />
              Fees & Eligibility
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Annual Fees</p>
                <p className="text-xl font-bold text-gray-900">₹{(program.fees.annual / 1000).toFixed(0)}K</p>
                <p className="text-xs text-gray-500 mt-0.5">₹{(program.fees.total / 100000).toFixed(1)}L total (4 years)</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Eligibility</p>
                <p className="text-sm font-medium text-gray-900">{program.eligibility.minimum}</p>
                <p className="text-xs text-gray-500 mt-0.5">{program.eligibility.board}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Entrance Tests</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {program.testsRequired.map((test) => (
                    <span key={test} className="bg-primary-50 text-primary-700 text-xs font-medium px-3 py-1 rounded-full">
                      {test}
                    </span>
                  ))}
                </div>
                {program.cutoffScoreRange && (
                  <p className="text-xs text-orange-600 mt-2 flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    {program.cutoffScoreRange}
                  </p>
                )}
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Duration</p>
                <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-orange-500" />
                  {program.duration}
                </p>
              </div>
            </div>
          </div>

          {/* Placement Stats */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Placement Outcomes
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-5">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">Avg. Package</p>
                <p className="text-lg font-bold text-green-700">{program.placementStats.avgPackage}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">Highest Package</p>
                <p className="text-lg font-bold text-blue-700">{program.placementStats.highestPackage}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">Placement Rate</p>
                <p className="text-lg font-bold text-purple-700">{program.placementStats.placementRate}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                Top Recruiters
              </p>
              <div className="flex flex-wrap gap-2">
                {program.placementStats.topRecruiters.map((rec) => (
                  <span key={rec} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                    {rec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Research Opportunities */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-purple-600" />
              Research Opportunities
            </h2>
            <ul className="space-y-3">
              {program.researchOpportunities.map((opp) => (
                <li key={opp} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0"></span>
                  {opp}
                </li>
              ))}
            </ul>
          </div>

          {/* Alumni Reviews */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Alumni Reviews
            </h2>
            <div className="space-y-4">
              {programAlumni.filter(a => a.review).slice(0, 3).map((alum) => {
                const initials = alum.name.split(' ').map(n => n[0]).join('')
                return (
                  <div key={alum.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xs font-bold">
                        {initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{alum.name}</p>
                        <p className="text-xs text-gray-500">{alum.currentRole} at {alum.company} &middot; Class of {alum.graduationYear}</p>
                      </div>
                      <div className="ml-auto flex">
                        {Array.from({ length: alum.review.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">"{alum.review.text}"</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right column - Alumni */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-600" />
              Verified Alumni
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              Graduates of this program. Ask them anything.
            </p>
            <div className="space-y-3">
              {programAlumni.map((alum) => (
                <AlumniCard key={alum.id} alum={alum} />
              ))}
            </div>
          </div>

          {/* Quick action card */}
          <div className="bg-gradient-to-br from-primary-50 to-indigo-50 rounded-xl border border-primary-100 p-6">
            <Award className="w-8 h-8 text-primary-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Not sure which program is right?</h3>
            <p className="text-sm text-gray-600 mb-4">Compare this program side-by-side with others on fees, placements, and more.</p>
            <Link
              to={`/compare?selected=${program.id}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Compare Programs →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
