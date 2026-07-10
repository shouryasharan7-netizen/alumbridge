import { useState } from 'react'
import { Search, ChevronDown, Heart, MessageCircle, Eye, Github, ExternalLink, MapPin, GraduationCap, Tag, Users, Briefcase, Filter, Rocket, X } from 'lucide-react'
import { projects } from '../data/projects'

const PAGE_SIZE = 12

const STATUS_COLORS = {
  'Active': { bg: '#16a34a', text: '#fff' },
  'Completed': { bg: 'var(--fg)', text: 'var(--bg)' },
  'Looking for Collaborators': { bg: 'var(--orange)', text: '#fff' },
  'In Progress': { bg: 'var(--crimson)', text: '#fff' },
  'Seeking Funding': { bg: '#7c3aed', text: '#fff' },
}

export default function Projects() {
  const [search, setSearch] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [courseFilter, setCourseFilter] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [expandedId, setExpandedId] = useState(null)

  const allTags = [...new Set(projects.flatMap(p => p.tags))].sort()
  const courses = [...new Set(projects.map(p => p.course))].sort()
  const statuses = [...new Set(projects.map(p => p.status))]

  const filtered = projects.filter((p) => {
    const q = search.toLowerCase()
    const matchSearch = !q ||
      p.title.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      p.university.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    const matchTag = !tagFilter || p.tags.includes(tagFilter)
    const matchStatus = statusFilter === 'all' || p.status === statusFilter
    const matchCourse = !courseFilter || p.course === courseFilter
    return matchSearch && matchTag && matchStatus && matchCourse
  })

  const visible = filtered.slice(0, visibleCount)
  const hasMore = filtered.length > visibleCount

  const clearAll = () => {
    setSearch(''); setTagFilter(''); setStatusFilter('all'); setCourseFilter(''); setVisibleCount(PAGE_SIZE)
  }

  const hasActiveFilters = search || tagFilter || statusFilter !== 'all' || courseFilter

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 mb-3 border-2 px-3 py-1.5" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '2px 2px 0px 0px var(--border-color)' }}>
          <Rocket className="w-3.5 h-3.5" style={{ color: 'var(--crimson)' }} />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--fg)' }}>
            {projects.length} PROJECTS · STUDENT SHOWCASE
          </span>
        </div>
        <h1 className="font-display text-3xl md:text-5xl tracking-wide mb-2" style={{ color: 'var(--fg)' }}>
          STUDENT <span style={{ color: 'var(--crimson)' }}>PROJECTS</span>
        </h1>
        <p className="font-serif max-w-xl" style={{ color: 'var(--muted-text)' }}>
          Explore course-related projects from students worldwide. Alumni can discover talent and connect directly with builders.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setVisibleCount(PAGE_SIZE) }}
          placeholder="Search projects, authors, universities, tags..."
          className="brutal-input w-full pl-10 pr-4"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--subtle-text)' }} />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="relative">
          <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--subtle-text)' }} />
          <select value={courseFilter} onChange={(e) => { setCourseFilter(e.target.value); setVisibleCount(PAGE_SIZE) }} className="brutal-input w-full pl-9 cursor-pointer">
            <option value="">All Courses</option>
            {courses.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="relative">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--subtle-text)' }} />
          <select value={tagFilter} onChange={(e) => { setTagFilter(e.target.value); setVisibleCount(PAGE_SIZE) }} className="brutal-input w-full pl-9 cursor-pointer">
            <option value="">All Technologies</option>
            {allTags.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--subtle-text)' }} />
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setVisibleCount(PAGE_SIZE) }} className="brutal-input w-full pl-9 cursor-pointer">
            <option value="all">All Statuses</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Tag pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['Machine Learning','Web Dev','IoT','Blockchain','Cybersecurity','Robotics','AR/VR','NLP','Data Science'].map(tag => {
          const active = tagFilter === tag
          return (
            <button key={tag} onClick={() => { setTagFilter(active ? '' : tag); setVisibleCount(PAGE_SIZE) }}
              className="font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-2 border-2 transition-all duration-150 hover:-translate-y-0.5"
              style={{
                background: active ? 'var(--crimson)' : 'transparent',
                color: active ? '#fff' : 'var(--fg)',
                borderColor: 'var(--border-color)',
                boxShadow: active ? '2px 2px 0px 0px var(--border-color)' : 'none',
              }}
            >{tag}</button>
          )
        })}
      </div>

      {/* Results bar */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--muted-text)' }}>
          SHOWING {visible.length} OF {filtered.length} PROJECTS
        </span>
        {hasActiveFilters && (
          <button onClick={clearAll} className="font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-1 border-2 transition-all hover:-translate-y-0.5" style={{ borderColor: 'var(--crimson)', color: 'var(--crimson)' }}>
            ✕ CLEAR FILTERS
          </button>
        )}
      </div>

      {/* Grid */}
      {visible.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {visible.map((proj) => (
              <ProjectCard key={proj.id} project={proj} expanded={expandedId === proj.id} onToggle={() => setExpandedId(expandedId === proj.id ? null : proj.id)} />
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
          <p className="font-display text-xl tracking-wide mb-1" style={{ color: 'var(--fg)' }}>NO PROJECTS FOUND</p>
          <p className="font-serif text-sm" style={{ color: 'var(--muted-text)' }}>Try different filters or search terms.</p>
          <button onClick={clearAll} className="btn-brutal btn-primary mt-4 text-[10px]">CLEAR ALL FILTERS</button>
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project: p, expanded, onToggle }) {
  const statusColor = STATUS_COLORS[p.status] || STATUS_COLORS['Active']

  return (
    <div className="brutal-card group transition-all duration-200 hover:-translate-y-0.5 overflow-hidden" style={{ boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] font-bold px-2 py-0.5 border" style={{ borderColor: 'var(--border-muted)', color: 'var(--muted-text)' }}>{p.course}</span>
          <span className="font-mono text-[9px] font-bold px-2 py-0.5 border-2" style={{ background: statusColor.bg, color: statusColor.text, borderColor: 'var(--border-color)' }}>{p.status}</span>
        </div>
        <span className="font-mono text-[9px]" style={{ color: 'var(--subtle-text)' }}>{p.postedDate}</span>
      </div>

      <div className="px-4 py-3">
        {/* Title & Description */}
        <h3 className="font-display text-base tracking-wide leading-tight mb-1.5" style={{ color: 'var(--fg)' }}>{p.title}</h3>
        <p className="font-serif text-xs leading-relaxed mb-3" style={{ color: 'var(--muted-text)' }}>
          {expanded ? p.description : p.description.slice(0, 120) + (p.description.length > 120 ? '...' : '')}
        </p>

        {/* Author */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 flex items-center justify-center border-2 text-[10px] font-bold" style={{ borderColor: 'var(--border-color)', background: 'var(--card-alt)', color: 'var(--fg)' }}>
            {p.author.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="font-bold text-[11px]" style={{ color: 'var(--fg)', fontFamily: "'Norwester', Impact, 'Arial Narrow', sans-serif" }}>{p.author}</p>
            <p className="font-mono text-[9px]" style={{ color: 'var(--subtle-text)' }}>{p.role} · {p.university}</p>
          </div>
          <span className="ml-auto font-mono text-[9px] flex items-center gap-1" style={{ color: 'var(--muted-text)' }}>
            <MapPin className="w-3 h-3" /> {p.country}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {p.tags.map(tag => (
            <span key={tag} className="font-mono text-[9px] font-bold px-2 py-0.5 border" style={{ borderColor: 'var(--border-muted)', color: 'var(--fg)', background: 'var(--card-alt)' }}>{tag}</span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-3 font-mono text-[10px]" style={{ color: 'var(--muted-text)' }}>
          <span className="flex items-center gap-1"><Heart className="w-3 h-3" style={{ color: 'var(--crimson)' }} /> {p.likes}</span>
          <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {p.comments}</span>
          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {p.views}</span>
        </div>

        {/* Interested Companies */}
        {p.interestedCompanies.length > 0 && (
          <div className="mb-3">
            <p className="font-mono text-[8px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--subtle-text)' }}>INTERESTED COMPANIES</p>
            <div className="flex flex-wrap gap-1.5">
              {p.interestedCompanies.map(c => (
                <span key={c} className="font-mono text-[9px] px-2 py-0.5 border-2" style={{ borderColor: 'var(--orange)', color: 'var(--orange)' }}>
                  <Briefcase className="w-2.5 h-2.5 inline mr-0.5" /> {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t" style={{ borderColor: 'var(--border-muted)' }}>
          <button onClick={onToggle} className="font-mono text-[10px] font-bold uppercase tracking-wider transition-colors" style={{ color: 'var(--crimson)' }}>
            {expanded ? 'SHOW LESS' : 'READ MORE'}
          </button>
          <div className="flex items-center gap-2 ml-auto">
            {p.githubUrl && (
              <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border-2 transition-all hover:-translate-y-0.5" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', color: 'var(--fg)' }}>
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {p.demoUrl && (
              <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border-2 transition-all hover:-translate-y-0.5" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', color: 'var(--fg)' }}>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button className="btn-brutal btn-primary text-[9px]" style={{ padding: '6px 14px' }}>
              <Users className="w-3 h-3" /> CONNECT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
