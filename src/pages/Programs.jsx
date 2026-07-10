import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, Filter, Globe, BookmarkCheck, ChevronDown, Equal, X, Plus, ArrowRight, Sparkles, Trophy, GraduationCap, MapPin, Building } from 'lucide-react'
import { programs } from '../data/programs'

const STORAGE_KEY = 'alumbridge_shortlist'
const PAGE_SIZE = 18

export default function Programs() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(() => searchParams.get('search') || '')
  const [countryFilter, setCountryFilter] = useState(() => searchParams.get('country') || 'all')
  const [degreeFilter, setDegreeFilter] = useState(() => searchParams.get('degree') || 'all')
  const [subjectFilter, setSubjectFilter] = useState(() => searchParams.get('subject') || '')
  const [shortlisted, setShortlisted] = useState([])
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [showCompare, setShowCompare] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setShortlisted(JSON.parse(saved))
  }, [])

  useEffect(() => {
    const s = searchParams.get('search')
    if (s && s !== search) setSearch(s)
    const c = searchParams.get('country')
    if (c) setCountryFilter(c)
  }, [searchParams])

  const toggleShortlist = (id) => {
    setShortlisted((prev) => {
      const updated = prev.includes(id) ? prev.filter((i) => i !== id) : prev.length < 3 ? [...prev, id] : prev
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  const countries = [...new Set(programs.map(p => p.country))].sort()
  const degrees = [...new Set(programs.map(p => p.degree))].sort()
  const subjects = [...new Set(programs.map(p => p.name))].sort()

  const filtered = programs.filter((p) => {
    const q = search.toLowerCase()
    const matchesSearch = !q ||
      p.name.toLowerCase().includes(q) ||
      p.university.toLowerCase().includes(q) ||
      p.country.toLowerCase().includes(q) ||
      p.degree.toLowerCase().includes(q) ||
      (p.placementStats?.topRecruiters || []).some(r => r.toLowerCase().includes(q))
    const matchesCountry = countryFilter === 'all' || p.country.toLowerCase() === countryFilter
    const matchesDegree = degreeFilter === 'all' || p.degree === degreeFilter
    const matchesSubject = !subjectFilter || p.name.toLowerCase().includes(subjectFilter.toLowerCase())
    return matchesSearch && matchesCountry && matchesDegree && matchesSubject
  })

  const visible = filtered.slice(0, visibleCount)
  const hasMore = filtered.length > visibleCount

  const handleSearch = (val) => {
    setSearch(val)
    setVisibleCount(PAGE_SIZE)
    const params = new URLSearchParams(searchParams)
    if (val) params.set('search', val); else params.delete('search')
    setSearchParams(params)
  }

  const handleCountry = (val) => {
    setCountryFilter(val)
    setVisibleCount(PAGE_SIZE)
    const params = new URLSearchParams(searchParams)
    if (val !== 'all') params.set('country', val); else params.delete('country')
    setSearchParams(params)
  }

  const handleDegree = (val) => {
    setDegreeFilter(val)
    setVisibleCount(PAGE_SIZE)
  }

  const handleSubject = (val) => {
    setSubjectFilter(val)
    setVisibleCount(PAGE_SIZE)
  }

  const clearAll = () => {
    setSearch(''); setCountryFilter('all'); setDegreeFilter('all'); setSubjectFilter('')
    setVisibleCount(PAGE_SIZE); setSearchParams({})
  }

  const selectedPrograms = shortlisted.map(id => programs.find(p => p.id === id)).filter(Boolean)

  const compareMetrics = [
    { label: 'COUNTRY', render: (p) => `${p.flag} ${p.country}` },
    { label: 'DEGREE', key: 'degree' },
    { label: 'DURATION', key: 'duration' },
    { label: 'TOTAL FEES', render: (p) => p.fees.usdEquiv },
    { label: 'ELIGIBILITY', render: (p) => p.eligibility.minimum },
    { label: 'ENTRANCE TESTS', render: (p) => p.testsRequired.join(', ') },
    { label: 'CUTOFF', key: 'cutoffRank' },
    { label: 'AVG. PACKAGE', render: (p) => p.placementStats.avgPackage },
    { label: 'HIGHEST PACKAGE', render: (p) => p.placementStats.highestPackage },
    { label: 'PLACEMENT RATE', render: (p) => p.placementStats.placementRate },
    { label: 'TOP RECRUITERS', render: (p) => p.placementStats.topRecruiters.slice(0, 3).join(', ') },
  ]

  const hasActiveFilters = search || countryFilter !== 'all' || degreeFilter !== 'all' || subjectFilter

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 mb-3 border-2 px-3 py-1.5" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '2px 2px 0px 0px var(--border-color)' }}>
          <Globe className="w-3.5 h-3.5" style={{ color: 'var(--crimson)' }} />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--fg)' }}>{countries.length} COUNTRIES · {programs.length} PROGRAMS</span>
        </div>
        <h1 className="font-display text-3xl md:text-5xl tracking-wide mb-2" style={{ color: 'var(--fg)' }}>BROWSE &amp; COMPARE PROGRAMS</h1>
        <p className="font-serif max-w-xl" style={{ color: 'var(--muted-text)' }}>
          Search by course, university, or country. Shortlist up to 3 programs and compare them side-by-side.
        </p>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search program, university, country, recruiter..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="brutal-input search-icon w-full pr-16"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--subtle-text)' }} />
          <button
            className="absolute right-0 top-0 bottom-0 px-4 flex items-center justify-center border-l-2 transition-all duration-150 hover:brightness-110"
            style={{ background: 'var(--orange)', borderColor: 'var(--border-color)', color: 'var(--fg)' }}
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
        {shortlisted.length > 0 && (
          <button
            onClick={() => setShowCompare(!showCompare)}
            className="btn-brutal text-[11px] flex items-center gap-2"
            style={{ padding: '10px 20px', background: showCompare ? 'var(--crimson)' : 'var(--fg)', color: showCompare ? '#fff' : 'var(--bg)', border: '2px solid var(--border-color)', boxShadow: '3px 3px 0px 0px var(--border-color)' }}
          >
            <Equal className="w-4 h-4" /> COMPARE ({shortlisted.length})
          </button>
        )}
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {/* Country */}
        <div className="relative">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: 'var(--subtle-text)' }} />
          <select value={countryFilter} onChange={(e) => handleCountry(e.target.value)} className="brutal-input select-icon w-full">
            <option value="all">All Countries ({programs.length})</option>
            {countries.map(c => {
              const count = programs.filter(p => p.country === c).length
              const flag = programs.find(p => p.country === c)?.flag
              return <option key={c} value={c.toLowerCase()}>{flag} {c} ({count})</option>
            })}
          </select>
        </div>
        {/* Degree */}
        <div className="relative">
          <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: 'var(--subtle-text)' }} />
          <select value={degreeFilter} onChange={(e) => handleDegree(e.target.value)} className="brutal-input select-icon w-full">
            <option value="all">All Degrees</option>
            {degrees.map(d => <option key={d} value={d}>{d} ({programs.filter(p => p.degree === d).length})</option>)}
          </select>
        </div>
        {/* Subject/Course */}
        <div className="relative">
          <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: 'var(--subtle-text)' }} />
          <select value={subjectFilter} onChange={(e) => handleSubject(e.target.value)} className="brutal-input select-icon w-full">
            <option value="">All Courses / Subjects</option>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Results bar */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--muted-text)' }}>
          SHOWING {visible.length} OF {filtered.length}
        </span>
        {shortlisted.length > 0 && (
          <span className="font-mono text-[10px] font-bold flex items-center gap-1" style={{ color: 'var(--orange)' }}>
            <BookmarkCheck className="w-3.5 h-3.5" /> {shortlisted.length} SHORTLISTED
          </span>
        )}
        {hasActiveFilters && (
          <button onClick={clearAll} className="font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-1 border-2 transition-all hover:-translate-y-0.5" style={{ borderColor: 'var(--crimson)', color: 'var(--crimson)' }}>
            ✕ CLEAR FILTERS
          </button>
        )}
      </div>

      {/* Compare Panel */}
      {showCompare && shortlisted.length >= 2 && (
        <div className="mb-8 border-2 overflow-hidden animate-slide-up" style={{ borderColor: 'var(--border-color)', boxShadow: '4px 4px 0px 0px var(--border-color)', background: 'var(--card)' }}>
          <div className="flex items-center justify-between px-5 py-3 border-b-2" style={{ borderColor: 'var(--border-color)', background: 'var(--card-alt)' }}>
            <div className="flex items-center gap-2">
              <Equal className="w-4 h-4" style={{ color: 'var(--orange)' }} />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--fg)' }}>SIDE-BY-SIDE COMPARISON</span>
            </div>
            <button onClick={() => setShowCompare(false)} className="w-7 h-7 flex items-center justify-center border-2 transition-all hover:-translate-y-0.5" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', color: 'var(--fg)' }}>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif" }}>
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
                {compareMetrics.map((metric, rowIdx) => (
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
          <div className="border-t-2 px-5 py-4 flex flex-wrap gap-3" style={{ borderColor: 'var(--border-color)', background: 'var(--card-alt)' }}>
            {selectedPrograms.map((p) => (
              <Link key={p.id} to={`/programs/${p.id}`} className="btn-brutal text-[10px]" style={{ padding: '8px 12px', background: 'var(--card)', border: '2px solid var(--border-color)', boxShadow: '2px 2px 0px 0px var(--border-color)', color: 'var(--fg)' }}>
                {p.flag} VIEW {p.university} <ArrowRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      {visible.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((program, i) => (
              <div key={program.id} className={i < PAGE_SIZE ? 'animate-slide-up' : ''} style={i < PAGE_SIZE ? { animationDelay: `${i * 60}ms` } : {}}>
                <ProgramCardCompare
                  program={program}
                  onShortlist={toggleShortlist}
                  isShortlisted={shortlisted.includes(program.id)}
                  maxReached={shortlisted.length >= 3 && !shortlisted.includes(program.id)}
                />
              </div>
            ))}
          </div>
          {hasMore && (
            <div className="text-center mt-10">
              <button onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)} className="btn-brutal btn-secondary text-[11px]" style={{ padding: '12px 32px' }}>
                <ChevronDown className="w-4 h-4" /> LOAD MORE ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="brutal-card p-16 text-center" style={{ boxShadow: '4px 4px 0px 0px var(--border-color)' }}>
          <Search className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--subtle-text)' }} />
          <p className="font-display text-xl tracking-wide mb-1" style={{ color: 'var(--fg)' }}>NO PROGRAMS FOUND</p>
          <p className="font-serif text-sm" style={{ color: 'var(--muted-text)' }}>Try different filters or clear them.</p>
          <button onClick={clearAll} className="btn-brutal btn-primary mt-4 text-[10px]">CLEAR ALL FILTERS</button>
        </div>
      )}
    </div>
  )
}

/* Inline card with shortlist checkbox for compare */
function ProgramCardCompare({ program, onShortlist, isShortlisted, maxReached }) {
  return (
    <div className="brutal-card group transition-all duration-200 hover:-translate-y-1" style={{ boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{program.flag}</span>
          <div>
            <h3 className="font-display text-sm tracking-wide leading-tight" style={{ color: 'var(--fg)' }}>{program.name}</h3>
            <p className="font-mono text-[9px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--muted-text)' }}>{program.university}</p>
          </div>
        </div>
        <span className="font-mono text-[9px] font-bold px-2 py-1 border-2 whitespace-nowrap flex-shrink-0" style={{ borderColor: 'var(--border-color)', background: 'var(--card-alt)', color: 'var(--muted-text)' }}>{program.degree}</span>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="p-2 border" style={{ borderColor: 'var(--border-muted)', background: 'var(--card-alt)' }}>
          <p className="font-mono text-[8px] uppercase tracking-wider mb-0.5" style={{ color: 'var(--subtle-text)' }}>AVG PACKAGE</p>
          <p className="font-display text-sm tracking-wide" style={{ color: 'var(--fg)' }}>{program.placementStats.avgPackage}</p>
        </div>
        <div className="p-2 border" style={{ borderColor: 'var(--border-muted)', background: 'var(--card-alt)' }}>
          <p className="font-mono text-[8px] uppercase tracking-wider mb-0.5" style={{ color: 'var(--subtle-text)' }}>TOTAL FEES</p>
          <p className="font-display text-sm tracking-wide" style={{ color: 'var(--fg)' }}>{program.fees.usdEquiv}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-[9px] px-2 py-0.5 border whitespace-nowrap flex-shrink-0" style={{ borderColor: 'var(--border-muted)', color: 'var(--muted-text)' }}>{program.duration}</span>
        <span className="font-mono text-[9px] px-2 py-0.5 border whitespace-nowrap flex-shrink-0" style={{ borderColor: 'var(--border-muted)', color: 'var(--muted-text)' }}>{program.placementStats.placementRate}</span>
      </div>
      {/* Actions */}
      <div className="flex items-center gap-2">
        <Link to={`/programs/${program.id}`} className="btn-brutal btn-primary text-[10px] flex-1 justify-center" style={{ padding: '8px 12px' }}>
          VIEW DETAILS <ArrowRight className="w-3 h-3" />
        </Link>
        <button
          onClick={() => onShortlist(program.id)}
          disabled={maxReached}
          className="w-9 h-9 flex items-center justify-center border-2 transition-all duration-150 hover:-translate-y-0.5 disabled:opacity-40"
          style={{
            background: isShortlisted ? 'var(--orange)' : 'var(--card)',
            borderColor: 'var(--border-color)',
            boxShadow: '2px 2px 0px 0px var(--border-color)',
            color: isShortlisted ? '#fff' : 'var(--fg)',
          }}
          title={maxReached ? 'Max 3 for compare' : isShortlisted ? 'Remove from compare' : 'Add to compare'}
        >
          <BookmarkCheck className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
