import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, Search, Check, ArrowRight, Briefcase, Globe, ChevronDown, MapPin, Building, GraduationCap } from 'lucide-react'
import { alumni } from '../data/alumni'
import { programs } from '../data/programs'
import AlumniCard from '../components/AlumniCard'

const PAGE_SIZE = 24

export default function AlumniListing() {
  const [search, setSearch] = useState('')
  const [countryFilter, setCountryFilter] = useState('all')
  const [courseFilter, setCourseFilter] = useState('')
  const [companyFilter, setCompanyFilter] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const programMap = new Map(programs.map(p => [p.id, p]))
  const countries = [...new Set(programs.map(p => p.country))].sort()
  const courses = [...new Set(programs.map(p => p.name))].sort()
  const companies = [...new Set(alumni.map(a => a.company))].sort()

  const filtered = alumni.filter((a) => {
    const prog = programMap.get(a.programId)
    const matchSearch = !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.company.toLowerCase().includes(search.toLowerCase()) ||
      a.currentRole.toLowerCase().includes(search.toLowerCase()) ||
      a.expertise.some(e => e.toLowerCase().includes(search.toLowerCase())) ||
      (prog && prog.university.toLowerCase().includes(search.toLowerCase()))
    const matchCountry = countryFilter === 'all' || (prog && prog.country.toLowerCase() === countryFilter)
    const matchCourse = !courseFilter || (prog && prog.name.toLowerCase().includes(courseFilter.toLowerCase()))
    const matchCompany = !companyFilter || a.company.toLowerCase().includes(companyFilter.toLowerCase())
    return matchSearch && matchCountry && matchCourse && matchCompany
  })

  const visible = filtered.slice(0, visibleCount)
  const hasMore = filtered.length > visibleCount

  const clearAll = () => {
    setSearch(''); setCountryFilter('all'); setCourseFilter(''); setCompanyFilter(''); setVisibleCount(PAGE_SIZE)
  }

  const hasActiveFilters = search || countryFilter !== 'all' || courseFilter || companyFilter

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 animate-fade-in">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-3 border-2 px-3 py-1.5" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '2px 2px 0px 0px var(--border-color)' }}>
          <Users className="w-3.5 h-3.5" style={{ color: 'var(--crimson)' }} />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--fg)' }}>
            {alumni.length} VERIFIED ALUMNI · {countries.length} COUNTRIES
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-wide mb-3" style={{ color: 'var(--fg)' }}>
          TALK TO <span style={{ color: 'var(--crimson)' }}>REAL</span> GRADUATES
        </h1>
        <p className="font-serif text-base max-w-xl" style={{ color: 'var(--muted-text)' }}>
          Filter by course, location, or company. Find alumni who studied what you're interested in, or who work where you want to be.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setVisibleCount(PAGE_SIZE) }}
          placeholder="Search name, company, expertise, university..."
          className="brutal-input w-full pl-10 pr-4"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--subtle-text)' }} />
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {/* Location / Country */}
        <div className="relative">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: 'var(--subtle-text)' }} />
          <select value={countryFilter} onChange={(e) => { setCountryFilter(e.target.value); setVisibleCount(PAGE_SIZE) }} className="brutal-input select-icon w-full">
            <option value="all">All Locations</option>
            {countries.map(c => {
              const count = alumni.filter(a => programMap.get(a.programId)?.country === c).length
              const flag = programs.find(p => p.country === c)?.flag
              return <option key={c} value={c.toLowerCase()}>{flag} {c} ({count})</option>
            })}
          </select>
        </div>
        {/* Course / Subject */}
        <div className="relative">
          <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: 'var(--subtle-text)' }} />
          <select value={courseFilter} onChange={(e) => { setCourseFilter(e.target.value); setVisibleCount(PAGE_SIZE) }} className="brutal-input select-icon w-full">
            <option value="">All Courses / Subjects</option>
            {courses.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        {/* Company */}
        <div className="relative">
          <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: 'var(--subtle-text)' }} />
          <select value={companyFilter} onChange={(e) => { setCompanyFilter(e.target.value); setVisibleCount(PAGE_SIZE) }} className="brutal-input select-icon w-full">
            <option value="">All Companies</option>
            {companies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Results bar */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--subtle-text)' }}>
            SHOWING {visible.length} OF {filtered.length}
          </p>
          {hasActiveFilters && (
            <button onClick={clearAll} className="font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-1 border-2 transition-all hover:-translate-y-0.5" style={{ borderColor: 'var(--crimson)', color: 'var(--crimson)' }}>
              ✕ CLEAR FILTERS
            </button>
          )}
        </div>
        <div className="hidden sm:flex items-center gap-1 font-mono text-[9px]" style={{ color: 'var(--subtle-text)' }}>
          <Globe className="w-3 h-3" /> {new Set(alumni.map(a => programMap.get(a.programId)?.country).filter(Boolean)).size} COUNTRIES
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="brutal-card p-12 text-center" style={{ boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
          <Users className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--subtle-text)' }} />
          <p className="font-display text-lg tracking-wide" style={{ color: 'var(--fg)' }}>NO ALUMNI FOUND</p>
          <p className="font-serif text-sm mt-1" style={{ color: 'var(--muted-text)' }}>Try a different search or filter.</p>
          <button onClick={clearAll} className="btn-brutal btn-primary mt-4 text-[10px]">CLEAR ALL FILTERS</button>
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
