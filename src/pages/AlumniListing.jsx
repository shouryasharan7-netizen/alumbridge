import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, Search, Check, ArrowRight, Briefcase, Globe, ChevronDown } from 'lucide-react'
import { alumni } from '../data/alumni'
import { programs } from '../data/programs'
import AlumniCard from '../components/AlumniCard'

const PAGE_SIZE = 24

export default function AlumniListing() {
  const [search, setSearch] = useState('')
  const [programFilter, setProgramFilter] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const programNames = [...new Map(programs.map(p => [p.id, p.name])).entries()]

  const filtered = alumni.filter((a) => {
    const matchSearch = !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.company.toLowerCase().includes(search.toLowerCase()) ||
      a.currentRole.toLowerCase().includes(search.toLowerCase()) ||
      a.expertise.some(e => e.toLowerCase().includes(search.toLowerCase()))
    const matchProgram = !programFilter || a.programId === programFilter
    return matchSearch && matchProgram
  })

  const visible = filtered.slice(0, visibleCount)
  const hasMore = filtered.length > visibleCount

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 animate-fade-in">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-3 border-2 px-3 py-1.5" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '2px 2px 0px 0px var(--border-color)' }}>
          <Users className="w-3.5 h-3.5" style={{ color: 'var(--crimson)' }} />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--fg)' }}>
            {alumni.length} VERIFIED ALUMNI · {programNames.length} PROGRAMS
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-wide mb-3" style={{ color: 'var(--fg)' }}>
          TALK TO <span style={{ color: 'var(--crimson)' }}>REAL</span> GRADUATES
        </h1>
        <p className="font-serif text-base max-w-xl" style={{ color: 'var(--muted-text)' }}>
          Ask questions, book calls, read honest reviews. No anonymous Reddit threads — just verified alumni from top programs worldwide.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="flex-1 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, company, expertise..."
            className="brutal-input w-full pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--subtle-text)' }} />
        </div>
        <select
          value={programFilter}
          onChange={(e) => setProgramFilter(e.target.value)}
          className="brutal-input sm:w-[260px]"
        >
          <option value="">All Programs ({alumni.length})</option>
          {programNames.map(([id, name]) => (
            <option key={id} value={id}>{name} ({alumni.filter(a => a.programId === id).length})</option>
          ))}
        </select>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-5">
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--subtle-text)' }}>
          SHOWING {visible.length} OF {filtered.length}
        </p>
        <div className="hidden sm:flex items-center gap-1 font-mono text-[9px]" style={{ color: 'var(--subtle-text)' }}>
          <Globe className="w-3 h-3" /> {new Set(alumni.map(a => programs.find(p => p.id === a.programId)?.country).filter(Boolean)).size} COUNTRIES
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="brutal-card p-12 text-center" style={{ boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
          <Users className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--subtle-text)' }} />
          <p className="font-display text-lg tracking-wide" style={{ color: 'var(--fg)' }}>NO ALUMNI FOUND</p>
          <p className="font-serif text-sm mt-1" style={{ color: 'var(--muted-text)' }}>Try a different search or filter.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map((alum) => (
              <AlumniCard key={alum.id} alum={alum} />
            ))}
          </div>
          {hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
                className="btn-brutal btn-secondary text-[11px]"
                style={{ padding: '12px 32px' }}
              >
                <ChevronDown className="w-4 h-4" /> LOAD MORE ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
