import { useState, useEffect } from 'react'
import { Search, Filter } from 'lucide-react'
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
      const updated = prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  const filtered = programs.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.university.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === 'all' ||
      (filter === 'shortlisted' && shortlisted.includes(p.id)) ||
      (filter === 'iit' && p.university.includes('IIT')) ||
      (filter === 'bits' && p.university.includes('BITS')) ||
      (filter === 'nit' && p.university.includes('NIT'))
    return matchesSearch && matchesFilter
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Programs</h1>
        <p className="text-gray-600">Explore undergraduate programs with verified data and alumni insights.</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by program name or university..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Programs</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="iit">IITs</option>
            <option value="bits">BITS</option>
            <option value="nit">NITs</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        Showing {filtered.length} of {programs.length} programs
        {shortlisted.length > 0 && (
          <span className="ml-2 text-primary-600">
            &middot; {shortlisted.length} shortlisted
          </span>
        )}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              onShortlist={toggleShortlist}
              isShortlisted={shortlisted.includes(program.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500 text-lg">No programs found matching your criteria.</p>
          <button
            onClick={() => { setSearch(''); setFilter('all') }}
            className="mt-3 text-primary-600 font-medium hover:text-primary-700"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
