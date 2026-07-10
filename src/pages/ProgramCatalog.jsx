import { useState, useEffect } from 'react'
import { Search, Filter, Globe, BookmarkCheck } from 'lucide-react'
import { programs } from '../data/programs'
import ProgramCard from '../components/ProgramCard'

const STORAGE_KEY = 'alumbridge_shortlist'

export default function ProgramCatalog() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [shortlisted, setShortlisted] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setShortlisted(JSON.parse(saved))
  }, [])

  const toggleShortlist = (id) => {
    setShortlisted((prev) => {
      const updated = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  const countries = [...new Set(programs.map(p => p.country))]
  const indiaCount = programs.filter(p => p.country === 'India').length
  const intlCount = programs.length - indiaCount

  const filtered = programs.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.university.toLowerCase().includes(search.toLowerCase()) ||
      p.country.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === 'all' ||
      (filter === 'shortlisted' && shortlisted.includes(p.id)) ||
      (filter === 'india' && p.country === 'India') ||
      (filter === 'international' && p.country !== 'India') ||
      (filter === p.country.toLowerCase())
    return matchesSearch && matchesFilter
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 mb-3 border-2 px-3 py-1.5" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '2px 2px 0px 0px var(--border-color)' }}>
          <Globe className="w-3.5 h-3.5" style={{ color: 'var(--crimson)' }} />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--fg)' }}>{countries.length} COUNTRIES REPRESENTED</span>
        </div>
        <h1 className="font-display text-3xl md:text-5xl tracking-wide mb-2" style={{ color: 'var(--fg)' }}>BROWSE PROGRAMS</h1>
        <p className="font-serif max-w-xl" style={{ color: 'var(--muted-text)' }}>
          Explore undergraduate programs from top universities. Found something you like? <strong style={{ color: 'var(--fg)' }}>Shortlist it!</strong>
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by program, university, or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="brutal-input w-full pr-16"
          />
          <button
            className="absolute right-0 top-0 bottom-0 px-4 flex items-center justify-center border-l-2 transition-all duration-150 hover:brightness-110"
            style={{ background: 'var(--orange)', borderColor: 'var(--border-color)', color: 'var(--fg)' }}
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" style={{ color: 'var(--muted-text)' }} />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="brutal-input cursor-pointer"
          >
            <option value="all">All Programs ({programs.length})</option>
            <option value="shortlisted">Shortlisted ({shortlisted.length})</option>
            <option value="india">India ({indiaCount})</option>
            <option value="international">International ({intlCount})</option>
          </select>
        </div>
      </div>

      {/* Country Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className="font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-2 border-2 transition-all duration-150 hover:-translate-y-0.5"
          style={{
            background: filter === 'all' ? 'var(--fg)' : 'transparent',
            color: filter === 'all' ? 'var(--bg)' : 'var(--fg)',
            borderColor: 'var(--border-color)',
            boxShadow: filter === 'all' ? '2px 2px 0px 0px var(--border-color)' : 'none',
          }}
        >
          🌍 ALL
        </button>
        {countries.map(country => {
          const flag = programs.find(p => p.country === country)?.flag
          const count = programs.filter(p => p.country === country).length
          const active = filter === country.toLowerCase()
          return (
            <button
              key={country}
              onClick={() => setFilter(active ? 'all' : country.toLowerCase())}
              className="font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-2 border-2 transition-all duration-150 hover:-translate-y-0.5"
              style={{
                background: active ? 'var(--crimson)' : 'transparent',
                color: active ? '#fff' : 'var(--fg)',
                borderColor: 'var(--border-color)',
                boxShadow: active ? '2px 2px 0px 0px var(--border-color)' : 'none',
              }}
            >
              {flag} {country} ({count})
            </button>
          )
        })}
      </div>

      {/* Results count */}
      <div className="flex items-center gap-3 mb-5">
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--muted-text)' }}>
          SHOWING {filtered.length} OF {programs.length}
        </span>
        {shortlisted.length > 0 && (
          <span className="font-mono text-[10px] font-bold flex items-center gap-1" style={{ color: 'var(--orange)' }}>
            <BookmarkCheck className="w-3.5 h-3.5" /> {shortlisted.length} SHORTLISTED
          </span>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((program, i) => (
            <div key={program.id} className="animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
              <ProgramCard
                program={program}
                onShortlist={toggleShortlist}
                isShortlisted={shortlisted.includes(program.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="brutal-card p-16 text-center" style={{ boxShadow: '4px 4px 0px 0px var(--border-color)' }}>
          <Search className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--subtle-text)' }} />
          <p className="font-display text-xl tracking-wide mb-1" style={{ color: 'var(--fg)' }}>NO PROGRAMS FOUND</p>
          <p className="font-serif text-sm" style={{ color: 'var(--muted-text)' }}>Try a different search term or clear your filters.</p>
          <button
            onClick={() => { setSearch(''); setFilter('all') }}
            className="btn-brutal btn-primary mt-4 text-[10px]"
          >
            CLEAR ALL FILTERS
          </button>
        </div>
      )}
    </div>
  )
}
