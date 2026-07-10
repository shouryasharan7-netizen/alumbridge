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
    { label: 'COUNTRY', render: (p) => `${p.flag} ${p.country}` },
    { label: 'DEGREE', key: 'degree' },
    { label: 'DURATION', key: 'duration' },
    { label: 'TOTAL FEES', render: (p) => p.fees.usdEquiv, highlight: 'lowest' },
    { label: 'ELIGIBILITY', render: (p) => p.eligibility.minimum },
    { label: 'ENTRANCE TESTS', render: (p) => p.testsRequired.join(', ') },
    { label: 'CUTOFF', key: 'cutoffRank' },
    { label: 'AVG. PACKAGE', render: (p) => p.placementStats.avgPackage, highlight: 'highest' },
    { label: 'HIGHEST PACKAGE', render: (p) => p.placementStats.highestPackage },
    { label: 'PLACEMENT RATE', render: (p) => p.placementStats.placementRate },
    { label: 'TOP RECRUITERS', render: (p) => p.placementStats.topRecruiters.slice(0, 3).join(', ') },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <Link to="/programs" className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider mb-6" style={{ color: 'var(--muted-text)' }}>
        <ArrowLeft className="w-4 h-4" /> BACK TO PROGRAMS
      </Link>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 mb-3 border-2 px-3 py-1.5" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '2px 2px 0px 0px var(--border-color)' }}>
          <Equal className="w-3.5 h-3.5" style={{ color: 'var(--orange)' }} />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--fg)' }}>SIDE-BY-SIDE COMPARISON</span>
        </div>
        <h1 className="font-display text-3xl md:text-5xl tracking-wide mb-2" style={{ color: 'var(--fg)' }}>COMPARE PROGRAMS</h1>
        <p className="font-serif max-w-xl" style={{ color: 'var(--muted-text)' }}>
          Pick up to 3 programs and see exactly how they stack up. No more tab-switching between university websites.
        </p>
      </div>

      {/* Selectors */}
      <div className="flex flex-wrap gap-3 mb-8">
        {selected.map((id, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="relative">
              <span className="absolute -top-2 -left-2 w-5 h-5 font-mono text-[9px] font-bold flex items-center justify-center z-10 border-2" style={{ background: 'var(--fg)', color: 'var(--bg)', borderColor: 'var(--border-color)' }}>{index + 1}</span>
              <select
                value={id}
                onChange={(e) => updateSlot(index, e.target.value)}
                className="brutal-input min-w-[240px] pl-7 cursor-pointer"
              >
                <option value="">-- Select Program --</option>
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>{p.flag} {p.name} — {p.university}</option>
                ))}
              </select>
            </div>
            {selected.length > 1 && (
              <button onClick={() => removeSlot(index)} className="w-9 h-9 flex items-center justify-center border-2 transition-all hover:-translate-y-0.5" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', color: 'var(--fg)', boxShadow: '2px 2px 0px 0px var(--border-color)' }}>
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        {selected.length < 3 && (
          <button onClick={addSlot} className="font-mono text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 border-2 border-dashed transition-all hover:-translate-y-0.5" style={{ borderColor: 'var(--crimson)', color: 'var(--crimson)' }}>
            <Plus className="w-4 h-4 inline mr-1" /> ADD PROGRAM
          </button>
        )}
      </div>

      {/* Comparison Table */}
      {selectedPrograms.length >= 2 ? (
        <div className="border-2 overflow-hidden" style={{ borderColor: 'var(--border-color)', boxShadow: '4px 4px 0px 0px var(--border-color)' }}>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              <thead>
                <tr style={{ background: 'var(--card)', borderBottom: '2px solid var(--border-color)' }}>
                  <th className="text-left px-5 py-4 font-display text-[10px] tracking-wider w-44" style={{ color: 'var(--fg)' }}>METRIC</th>
                  {selectedPrograms.map((p) => (
                    <th key={p.id} className="text-left px-5 py-4">
                      <div className="font-display text-sm tracking-wide flex items-center gap-1.5" style={{ color: 'var(--fg)' }}>
                        <span className="text-lg">{p.flag}</span> {p.name}
                      </div>
                      <div className="text-[10px] mt-0.5" style={{ color: 'var(--subtle-text)' }}>{p.university}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric, rowIdx) => (
                  <tr key={metric.label} style={{ background: rowIdx % 2 === 0 ? 'var(--card-alt)' : 'var(--card)', borderBottom: '1px solid var(--border-muted)' }}>
                    <td className="px-5 py-3.5 text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--muted-text)' }}>{metric.label}</td>
                    {selectedPrograms.map((p) => (
                      <td key={p.id} className="px-5 py-3.5 text-xs font-medium" style={{ color: 'var(--fg)' }}>
                        {metric.render ? metric.render(p) : p[metric.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Insights */}
          <div className="border-t-2 px-5 py-5" style={{ borderColor: 'var(--border-color)', background: 'var(--card-alt)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4" style={{ color: 'var(--orange)' }} />
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--fg)' }}>QUICK INSIGHTS</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {selectedPrograms.map((p) => (
                <Link key={p.id} to={`/programs/${p.id}`} className="btn-brutal text-[10px]" style={{ padding: '8px 12px', background: 'var(--card)', border: '2px solid var(--border-color)', boxShadow: '2px 2px 0px 0px var(--border-color)', color: 'var(--fg)' }}>
                  {p.flag} VIEW {p.university} <ArrowRight className="w-3 h-3" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="brutal-card p-16 text-center" style={{ boxShadow: '4px 4px 0px 0px var(--border-color)' }}>
          <Equal className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--subtle-text)' }} />
          <h3 className="font-display text-xl tracking-wide mb-1" style={{ color: 'var(--fg)' }}>SELECT AT LEAST 2 PROGRAMS</h3>
          <p className="font-serif text-sm max-w-sm mx-auto" style={{ color: 'var(--muted-text)' }}>
            Choose programs from the dropdowns above to see a detailed side-by-side comparison.
          </p>
        </div>
      )}

      {/* Pro tip */}
      <div className="mt-8 brutal-card p-5 flex items-start gap-3" style={{ borderColor: 'var(--orange)', boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
        <Trophy className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--orange)' }} />
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--fg)' }}>PRO TIP</p>
          <p className="font-serif text-xs mt-1" style={{ color: 'var(--muted-text)' }}>
            Compare <strong style={{ color: 'var(--fg)' }}>IIT Delhi CSE</strong> vs <strong style={{ color: 'var(--fg)' }}>ETH Zurich</strong> — India's best vs Europe's top pick with nearly free tuition.
            Or try <strong style={{ color: 'var(--fg)' }}>MIT</strong> vs <strong style={{ color: 'var(--fg)' }}>Oxford</strong> for the ultimate US vs UK showdown.
          </p>
        </div>
      </div>
    </div>
  )
}
