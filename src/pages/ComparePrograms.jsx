import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Plus, X, Equal, Sparkles, Trophy } from 'lucide-react'
import { programs } from '../data/programs'

export default function ComparePrograms() {
  const [searchParams] = useSearchParams()
  const preselected = searchParams.get('selected')
  const [selected, setSelected] = useState(() => {
    if (preselected) return [preselected, programs.find(p => p.id !== preselected)?.id || '']
    return [programs[0]?.id || '', programs[1]?.id || '']
  })

  const addSlot = () => { if (selected.length < 3) setSelected([...selected, '']) }
  const removeSlot = (index) => { setSelected(selected.filter((_, i) => i !== index)) }
  const updateSlot = (index, value) => { const u = [...selected]; u[index] = value; setSelected(u) }

  const selectedPrograms = selected.map((id) => programs.find((p) => p.id === id)).filter(Boolean)

  const metrics = [
    { label: 'Country', render: (p) => `${p.flag} ${p.country}` },
    { label: 'Degree', key: 'degree' },
    { label: 'Duration', key: 'duration' },
    { label: 'Total Fees', render: (p) => p.fees.usdEquiv, highlight: 'lowest' },
    { label: 'Eligibility', render: (p) => p.eligibility.minimum },
    { label: 'Entrance Tests', render: (p) => p.testsRequired.join(', ') },
    { label: 'Cutoff', key: 'cutoffRank' },
    { label: 'Avg. Package', render: (p) => p.placementStats.avgPackage, highlight: 'highest' },
    { label: 'Highest Package', render: (p) => p.placementStats.highestPackage },
    { label: 'Placement Rate', render: (p) => p.placementStats.placementRate },
    { label: 'Top Recruiters', render: (p) => p.placementStats.topRecruiters.slice(0, 3).join(', ') },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <Link to="/programs" className="inline-flex items-center gap-1.5 text-sm text-primary-400 hover:text-crimson-600 mb-6 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" />
        Back to Programs
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Equal className="w-5 h-5 text-gold-500" />
          <span className="text-xs font-medium text-gold-600 bg-gold-50 px-2.5 py-1 rounded-full">Side-by-side comparison</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-600 mb-2">Compare Programs</h1>
        <p className="text-primary-400 max-w-xl">
          Pick up to 3 programs and see exactly how they stack up — fees, placements, cutoffs, and more. 
          No more tab-switching between university websites!
        </p>
      </div>

      {/* Selectors */}
      <div className="flex flex-wrap gap-3 mb-8">
        {selected.map((id, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="relative">
              <span className="absolute -top-2 -left-2 w-5 h-5 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{index + 1}</span>
              <select
                value={id}
                onChange={(e) => updateSlot(index, e.target.value)}
                className="border border-primary-100 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-crimson-500 text-primary-600 min-w-[220px] cursor-pointer pl-6"
              >
                <option value="">-- Select Program --</option>
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>{p.flag} {p.name} — {p.university}</option>
                ))}
              </select>
            </div>
            {selected.length > 1 && (
              <button onClick={() => removeSlot(index)} className="p-1.5 text-primary-300 hover:text-crimson-600 hover:bg-crimson-50 rounded-lg transition">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        {selected.length < 3 && (
          <button onClick={addSlot} className="flex items-center gap-1 px-4 py-2.5 text-sm text-crimson-600 hover:bg-crimson-50 border border-dashed border-crimson-300 rounded-xl transition font-medium hover:border-crimson-400">
            <Plus className="w-4 h-4" /> Add Program
          </button>
        )}
      </div>

      {/* Comparison Table */}
      {selectedPrograms.length >= 2 ? (
        <div className="bg-white rounded-2xl border border-primary-100/50 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-primary-50 to-parchment border-b border-primary-100">
                  <th className="text-left px-5 py-4 text-xs font-bold text-primary-400 uppercase tracking-wider w-44">Metric</th>
                  {selectedPrograms.map((p) => (
                    <th key={p.id} className="text-left px-5 py-4">
                      <div className="font-display font-bold text-primary-600 text-sm flex items-center gap-1.5">
                        <span className="text-lg">{p.flag}</span> {p.name}
                      </div>
                      <div className="text-xs text-primary-400 mt-0.5">{p.university}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric, rowIdx) => (
                  <tr key={metric.label} className={`border-b border-primary-50 ${rowIdx % 2 === 0 ? 'bg-white' : 'bg-cream/50'} hover:bg-gold-50/50 transition-colors`}>
                    <td className="px-5 py-3.5 text-xs font-bold text-primary-400 uppercase tracking-wide">{metric.label}</td>
                    {selectedPrograms.map((p) => (
                      <td key={p.id} className="px-5 py-3.5 text-sm text-primary-600">
                        {metric.render ? metric.render(p) : p[metric.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Insights */}
          <div className="border-t border-primary-100 px-5 py-5 bg-gradient-to-r from-parchment to-cream">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-gold-500" />
              <span className="text-xs font-bold text-primary-500 uppercase tracking-wide">Quick Insights</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {selectedPrograms.map((p) => (
                <Link key={p.id} to={`/programs/${p.id}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-crimson-600 hover:text-crimson-700 bg-white px-3 py-1.5 rounded-lg border border-primary-100/50 hover:border-crimson-200 transition-all shadow-sm hover:shadow">
                  {p.flag} View {p.university} <ArrowRight className="w-3 h-3" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-primary-100 p-12 text-center">
          <Equal className="w-10 h-10 text-primary-200 mx-auto mb-3" />
          <h3 className="font-display text-primary-600 font-bold mb-1">Select at least 2 programs</h3>
          <p className="text-primary-400 text-sm max-w-sm mx-auto">
            Choose programs from the dropdowns above to see a detailed side-by-side comparison of fees, placements, cutoffs, and more.
          </p>
        </div>
      )}

      {/* Pro tip */}
      <div className="mt-8 bg-gold-50 rounded-xl border border-gold-200/50 p-5 flex items-start gap-3">
        <Trophy className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-primary-700">Pro tip</p>
          <p className="text-xs text-primary-500 mt-0.5">
            Not sure where to start? Compare <strong>IIT Delhi CSE</strong> vs <strong>ETH Zurich</strong> — one's India's best, the other is Europe's top pick with nearly free tuition! 
            Or try <strong>MIT</strong> vs <strong>Oxford</strong> for the ultimate US vs UK showdown.
          </p>
        </div>
      </div>
    </div>
  )
}
