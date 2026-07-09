import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Plus, X, Equal } from 'lucide-react'
import { programs } from '../data/programs'

export default function ComparePrograms() {
  const [searchParams] = useSearchParams()
  const preselected = searchParams.get('selected')

  const [selected, setSelected] = useState(() => {
    if (preselected) return [preselected]
    return [programs[0]?.id || '', programs[1]?.id || '']
  })

  useEffect(() => {
    if (preselected && !selected.includes(preselected)) {
      setSelected((prev) => {
        const updated = [...prev]
        if (updated.length < 3) return [...updated, preselected]
        updated[0] = preselected
        return updated
      })
    }
  }, [preselected])

  const addSlot = () => {
    if (selected.length < 3) setSelected([...selected, ''])
  }

  const removeSlot = (index) => {
    setSelected(selected.filter((_, i) => i !== index))
  }

  const updateSlot = (index, value) => {
    const updated = [...selected]
    updated[index] = value
    setSelected(updated)
  }

  const selectedPrograms = selected
    .map((id) => programs.find((p) => p.id === id))
    .filter(Boolean)

  const metrics = [
    { label: 'University', key: 'university' },
    { label: 'Degree', key: 'degree' },
    { label: 'Duration', key: 'duration' },
    { label: 'Annual Fees', render: (p) => `₹${(p.fees.annual / 1000).toFixed(0)}K/year` },
    { label: 'Total Fees', render: (p) => `₹${(p.fees.total / 100000).toFixed(1)}L` },
    { label: 'Eligibility', render: (p) => p.eligibility.minimum },
    { label: 'Entrance Tests', render: (p) => p.testsRequired.join(', ') },
    { label: 'Cutoff', key: 'cutoffRank' },
    { label: 'Avg. Package', render: (p) => p.placementStats.avgPackage },
    { label: 'Highest Package', render: (p) => p.placementStats.highestPackage },
    { label: 'Placement Rate', render: (p) => p.placementStats.placementRate },
    { label: 'Top Recruiters', render: (p) => p.placementStats.topRecruiters.slice(0, 3).join(', ') },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/programs" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-primary-600 mb-6 transition">
        <ArrowLeft className="w-4 h-4" />
        Back to Programs
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Programs</h1>
        <p className="text-gray-600">Select programs to compare side by side on key metrics.</p>
      </div>

      {/* Program selectors */}
      <div className="flex flex-wrap gap-3 mb-8">
        {selected.map((id, index) => (
          <div key={index} className="flex items-center gap-2">
            <select
              value={id}
              onChange={(e) => updateSlot(index, e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 min-w-[200px]"
            >
              <option value="">-- Select Program --</option>
              {programs.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.university}
                </option>
              ))}
            </select>
            {selected.length > 1 && (
              <button
                onClick={() => removeSlot(index)}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        {selected.length < 3 && (
          <button
            onClick={addSlot}
            className="flex items-center gap-1 px-3 py-2 text-sm text-primary-600 hover:bg-primary-50 border border-dashed border-primary-300 rounded-lg transition"
          >
            <Plus className="w-4 h-4" />
            Add Program
          </button>
        )}
      </div>

      {/* Comparison table */}
      {selectedPrograms.length >= 2 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-primary-50 to-indigo-50 border-b border-gray-100">
                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700 w-48">Metric</th>
                  {selectedPrograms.map((p) => (
                    <th key={p.id} className="text-left px-5 py-4">
                      <div className="font-semibold text-gray-900 text-sm">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.university}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric, rowIdx) => (
                  <tr
                    key={metric.label}
                    className={`border-b border-gray-50 ${rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                  >
                    <td className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {metric.label}
                    </td>
                    {selectedPrograms.map((p) => (
                      <td key={p.id} className="px-5 py-3 text-sm text-gray-800">
                        {metric.render
                          ? metric.render(p)
                          : p[metric.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA row */}
          <div className="border-t border-gray-100 px-5 py-4 bg-gray-50 flex flex-wrap gap-3">
            {selectedPrograms.map((p) => (
              <Link
                key={p.id}
                to={`/programs/${p.id}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                View {p.university} Profile <ArrowRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <Equal className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <h3 className="text-gray-700 font-semibold mb-1">Select at least 2 programs</h3>
          <p className="text-gray-500 text-sm">Choose programs from the dropdowns above to see a side-by-side comparison.</p>
        </div>
      )}
    </div>
  )
}
