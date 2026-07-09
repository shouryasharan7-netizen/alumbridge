import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, TrendingUp, Building2, FlaskConical, Users, Award, Star, Target, MapPin, DollarSign } from 'lucide-react'
import { programs } from '../data/programs'
import { alumni } from '../data/alumni'
import AlumniCard from '../components/AlumniCard'

export default function ProgramProfile() {
  const { id } = useParams()
  const program = programs.find((p) => p.id === id)

  if (!program) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-display text-2xl font-bold text-primary-600 mb-4">Program not found</h2>
        <Link to="/programs" className="text-crimson-600 hover:text-crimson-700 font-medium">← Back to Programs</Link>
      </div>
    )
  }

  const programAlumni = alumni.filter((a) => program.alumni.includes(a.id))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <Link to="/programs" className="inline-flex items-center gap-1.5 text-sm text-primary-400 hover:text-crimson-600 mb-6 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" />
        Back to all programs
      </Link>

      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-600 to-primary-700 rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 text-8xl opacity-10 mr-4 mt-2">{program.flag}</div>
        <div className="relative">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs mb-3">
                <MapPin className="w-3 h-3 text-gold-400" />
                <span>{program.country}</span>
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">{program.name}</h1>
              <p className="text-primary-200 text-lg">{program.university} &middot; {program.degree} &middot; {program.duration}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3">
              <div className="text-xs text-gold-400 mb-1 font-medium">Cutoff</div>
              <div className="font-semibold text-sm">{program.cutoffRank}</div>
            </div>
          </div>
          <p className="text-primary-200 mt-5 max-w-3xl text-sm leading-relaxed">{program.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Fees & Eligibility */}
          <div className="bg-white rounded-2xl border border-primary-100/50 p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold text-primary-600 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-gold-500" />
              Fees & Eligibility
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-primary-400 uppercase tracking-wide mb-1 font-medium">Fees</p>
                <p className="text-xl font-bold text-primary-600">{program.fees.usdEquiv}</p>
                <p className="text-xs text-primary-400 mt-0.5">
                  {program.fees.currency === 'INR'
                    ? `₹${(program.fees.annual / 1000).toFixed(0)}K/year · ₹${(program.fees.total / 100000).toFixed(1)}L total`
                    : `${program.fees.currency} ${(program.fees.annual).toLocaleString()}/year`}
                </p>
              </div>
              <div>
                <p className="text-xs text-primary-400 uppercase tracking-wide mb-1 font-medium">Eligibility</p>
                <p className="text-sm font-medium text-primary-600">{program.eligibility.minimum}</p>
                <p className="text-xs text-primary-400 mt-0.5">{program.eligibility.board}</p>
              </div>
              <div>
                <p className="text-xs text-primary-400 uppercase tracking-wide mb-1 font-medium">Entrance Tests</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {program.testsRequired.map((test) => (
                    <span key={test} className="bg-crimson-50 text-crimson-700 text-xs font-medium px-3 py-1 rounded-full">
                      {test}
                    </span>
                  ))}
                </div>
                {program.cutoffScoreRange && (
                  <p className="text-xs text-gold-600 mt-2 flex items-center gap-1 font-medium">
                    <Target className="w-3 h-3" />
                    {program.cutoffScoreRange}
                  </p>
                )}
              </div>
              <div>
                <p className="text-xs text-primary-400 uppercase tracking-wide mb-1 font-medium">Duration</p>
                <p className="text-sm font-medium text-primary-600 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gold-500" />
                  {program.duration}
                </p>
              </div>
            </div>
          </div>

          {/* Placement Stats */}
          <div className="bg-white rounded-2xl border border-primary-100/50 p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold text-primary-600 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-crimson-500" />
              Placement Outcomes
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-5">
              <div className="bg-crimson-50 rounded-xl p-4 text-center border border-crimson-100/50">
                <p className="text-xs text-primary-400 mb-1">Avg. Package</p>
                <p className="text-lg font-bold text-crimson-700">{program.placementStats.avgPackage}</p>
              </div>
              <div className="bg-primary-50 rounded-xl p-4 text-center border border-primary-100/50">
                <p className="text-xs text-primary-400 mb-1">Highest Package</p>
                <p className="text-lg font-bold text-primary-700">{program.placementStats.highestPackage}</p>
              </div>
              <div className="bg-gold-50 rounded-xl p-4 text-center border border-gold-200/50">
                <p className="text-xs text-primary-400 mb-1">Placement Rate</p>
                <p className="text-lg font-bold text-gold-700">{program.placementStats.placementRate}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-primary-400 uppercase tracking-wide mb-2 flex items-center gap-1 font-medium">
                <Building2 className="w-3 h-3" /> Top Recruiters
              </p>
              <div className="flex flex-wrap gap-2">
                {program.placementStats.topRecruiters.map((rec) => (
                  <span key={rec} className="bg-cream text-primary-600 text-xs font-medium px-3 py-1 rounded-full">
                    {rec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Research */}
          <div className="bg-white rounded-2xl border border-primary-100/50 p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold text-primary-600 mb-4 flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-primary-500" />
              Research Opportunities
            </h2>
            <ul className="space-y-3">
              {program.researchOpportunities.map((opp) => (
                <li key={opp} className="flex items-start gap-3 text-sm text-primary-600/80">
                  <span className="w-2 h-2 rounded-full bg-gold-400 mt-1.5 flex-shrink-0"></span>
                  {opp}
                </li>
              ))}
            </ul>
          </div>

          {/* Alumni Reviews */}
          <div className="bg-white rounded-2xl border border-primary-100/50 p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold text-primary-600 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-gold-400" />
              Alumni Reviews
            </h2>
            <div className="space-y-4">
              {programAlumni.filter(a => a.review).slice(0, 3).map((alum) => {
                const initials = alum.name.split(' ').map(n => n[0]).join('')
                return (
                  <div key={alum.id} className="border border-primary-100/50 rounded-xl p-4 bg-parchment/50">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-crimson-600 flex items-center justify-center text-white text-xs font-bold">
                        {initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary-700">{alum.name}</p>
                        <p className="text-xs text-primary-400">{alum.currentRole} at {alum.company} &middot; Class of {alum.graduationYear}</p>
                      </div>
                      <div className="ml-auto flex">
                        {Array.from({ length: alum.review.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-primary-500 leading-relaxed italic">"{alum.review.text}"</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-primary-100/50 p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold text-primary-600 mb-1 flex items-center gap-2">
              <Users className="w-5 h-5 text-crimson-500" />
              Verified Alumni
            </h2>
            <p className="text-xs text-primary-400 mb-4">Graduates of this program. Ask them anything.</p>
            <div className="space-y-3">
              {programAlumni.map((alum) => (
                <AlumniCard key={alum.id} alum={alum} />
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gold-50 to-parchment rounded-2xl border border-gold-200/50 p-6">
            <Award className="w-8 h-8 text-gold-500 mb-3" />
            <h3 className="font-display font-bold text-primary-600 mb-2">Not sure which to pick?</h3>
            <p className="text-sm text-primary-400 mb-4">Compare this program side-by-side with others on fees, placements, and more.</p>
            <Link
              to={`/compare?selected=${program.id}`}
              className="inline-flex items-center gap-1 text-sm font-semibold text-crimson-600 hover:text-crimson-700"
            >
              Compare Programs →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
