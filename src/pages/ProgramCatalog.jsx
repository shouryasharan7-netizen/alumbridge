import { useState, useEffect } from 'react'
import { Search, Filter, Globe, Heart, BookmarkCheck } from 'lucide-react'
import { programs } from '../data/programs'
import ProgramCard from '../components/ProgramCard'

const STORAGE_KEY = 'alumbridge_shortlist'

export default function ProgramCatalog() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [shortlisted, setShortlisted] = useState([])
  const [viewMode, setViewMode] = useState('grid')

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
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-5 h-5 text-crimson-500" />
          <span className="text-xs font-medium text-crimson-600 bg-crimson-50 px-2.5 py-1 rounded-full">{countries.length} countries represented</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-600 mb-2">Browse Programs</h1>
        <p className="text-primary-400 max-w-xl">
          Explore undergraduate programs from top universities across India, USA, UK, Europe, and Asia. 
          Found something you like? <strong className="text-primary-600">Shortlist it!</strong> to come back later.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-300" />
          <input
            type="text"
            placeholder="Search by program, university, or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-primary-100 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-crimson-500 focus:border-transparent text-sm placeholder:text-primary-300 transition-shadow"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-primary-100 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-crimson-500 text-primary-600 cursor-pointer"
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
          className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 ${
            filter === 'all' ? 'bg-primary-600 text-white shadow-sm' : 'bg-white text-primary-500 border border-primary-100 hover:border-primary-300'
          }`}
        >
          🌍 All
        </button>
        {countries.map(country => {
          const flag = programs.find(p => p.country === country)?.flag
          const count = programs.filter(p => p.country === country).length
          return (
            <button
              key={country}
              onClick={() => setFilter(filter === country.toLowerCase() ? 'all' : country.toLowerCase())}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 ${
                filter === country.toLowerCase() ? 'bg-crimson-600 text-white shadow-sm' : 'bg-white text-primary-500 border border-primary-100 hover:border-crimson-200 hover:text-crimson-600'
              }`}
            >
              {flag} {country} ({count})
            </button>
          )
        })}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-primary-400">
          Showing <strong className="text-primary-600">{filtered.length}</strong> of {programs.length} programs
          {shortlisted.length > 0 && (
            <span className="ml-2 text-gold-600 flex items-center gap-1">
              <BookmarkCheck className="w-3.5 h-3.5" /> {shortlisted.length} shortlisted
            </span>
          )}
        </p>
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
        <div className="text-center py-16 bg-white rounded-2xl border border-primary-100">
          <Search className="w-10 h-10 text-primary-200 mx-auto mb-3" />
          <p className="text-primary-400 text-lg">No programs found matching your criteria.</p>
          <p className="text-primary-300 text-sm mt-1">Try a different search term or clear your filters.</p>
          <button
            onClick={() => { setSearch(''); setFilter('all') }}
            className="mt-4 text-crimson-600 font-semibold hover:text-crimson-700 bg-crimson-50 px-4 py-2 rounded-lg transition"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
