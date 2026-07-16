import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookmarkCheck, Calendar, MessageCircle, BookOpen, Users, Sparkles, ArrowRight, Search, Clock, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { programs } from '../data/programs'

const NORWESTER = "'Norwester', Impact, 'Arial Narrow', sans-serif"
const STORAGE_KEY = 'alumbridge_shortlist'

export default function StudentDashboard() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [shortlisted, setShortlisted] = useState([])

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'student') {
      navigate('/login')
      return
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setShortlisted(JSON.parse(saved))
    } catch {}
  }, [currentUser, navigate])

  const shortlistedPrograms = shortlisted.map(id => programs.find(p => p.id === id)).filter(Boolean)

  const mockCalls = [
    { id: 1, alumni: 'Dr. Priya Mehta', role: 'SRE at Goldman Sachs', program: 'Computer Science, IIT Delhi', date: '2026-07-15', time: '10:00 AM IST', status: 'Confirmed' },
    { id: 2, alumni: 'Arjun Nair', role: 'Data Scientist at Google', program: 'Data Science, NUS', date: '2026-07-18', time: '3:30 PM IST', status: 'Pending' },
    { id: 3, alumni: 'Sneha Kulkarni', role: 'ML Engineer at Tesla', program: 'AI & ML, MIT', date: '2026-07-22', time: '11:00 AM IST', status: 'Confirmed' },
  ]

  const stats = [
    { label: 'SHORTLISTED', value: shortlistedPrograms.length, icon: <BookmarkCheck className="w-4 h-4" /> },
    { label: 'UPCOMING CALLS', value: mockCalls.length, icon: <Calendar className="w-4 h-4" /> },
    { label: 'PROGRAMS VIEWED', value: 12, icon: <Search className="w-4 h-4" /> },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 mb-3 border-2 px-3 py-1.5" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '2px 2px 0px 0px var(--border-color)' }}>
          <User className="w-3.5 h-3.5" style={{ color: 'var(--crimson)' }} />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--fg)' }}>STUDENT DASHBOARD</span>
        </div>
        <h1 className="font-display text-3xl md:text-5xl tracking-wide mb-2" style={{ color: 'var(--fg)' }}>
          WELCOME, <span style={{ color: 'var(--crimson)' }}>{currentUser?.name?.split(' ')[0]?.toUpperCase() || 'STUDENT'}</span>
        </h1>
        <p className="font-serif max-w-xl" style={{ color: 'var(--muted-text)' }}>Track your shortlisted programs, upcoming alumni calls, and explore new opportunities.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {stats.map(s => (
          <div key={s.label} className="border-2 p-4 text-center" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
            <div className="flex justify-center mb-2" style={{ color: 'var(--orange)' }}>{s.icon}</div>
            <div className="font-display text-2xl tracking-wide" style={{ color: 'var(--fg)' }}>{s.value}</div>
            <p className="font-mono text-[9px] uppercase tracking-wider mt-1" style={{ color: 'var(--muted-text)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link to="/programs" className="btn-brutal btn-primary text-[10px]" style={{ padding: '10px 20px' }}>
          <BookOpen className="w-3.5 h-3.5" /> BROWSE PROGRAMS
        </Link>
        <Link to="/alumni" className="btn-brutal btn-secondary text-[10px]" style={{ padding: '10px 20px' }}>
          <Users className="w-3.5 h-3.5" /> FIND ALUMNI
        </Link>
        <Link to="/projects" className="btn-brutal text-[10px]" style={{ padding: '10px 20px', background: 'var(--card-alt)', border: '2px solid var(--border-color)', boxShadow: '2px 2px 0px 0px var(--border-color)', color: 'var(--fg)' }}>
          <Sparkles className="w-3.5 h-3.5" /> STUDENT PROJECTS
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shortlisted Programs */}
        <div className="border-2" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
          <div className="px-5 py-3 border-b-2 flex items-center justify-between" style={{ borderColor: 'var(--border-color)', background: 'var(--card-alt)' }}>
            <h3 className="font-display text-sm tracking-widest uppercase" style={{ color: 'var(--fg)' }}><BookmarkCheck className="w-4 h-4 inline mr-2" />SHORTLISTED PROGRAMS</h3>
            <Link to="/programs" className="font-mono text-[9px] hover:underline" style={{ color: 'var(--orange)' }}>VIEW ALL</Link>
          </div>
          <div className="p-4">
            {shortlistedPrograms.length > 0 ? (
              <div className="space-y-3">
                {shortlistedPrograms.map(p => (
                  <Link key={p.id} to={`/programs/${p.id}`} className="flex items-center gap-3 p-3 border-2 transition-all hover:-translate-y-0.5" style={{ borderColor: 'var(--border-muted)', background: 'var(--card-alt)' }}>
                    <span className="text-2xl">{p.flag}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-[11px] tracking-wide truncate" style={{ color: 'var(--fg)' }}>{p.name}</p>
                      <p className="font-mono text-[9px] truncate" style={{ color: 'var(--muted-text)' }}>{p.university} · {p.degree}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--subtle-text)' }} />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="font-serif text-xs text-center py-8" style={{ color: 'var(--muted-text)' }}>No programs shortlisted yet. Browse programs and bookmark your favorites!</p>
            )}
          </div>
        </div>

        {/* Upcoming Calls */}
        <div className="border-2" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
          <div className="px-5 py-3 border-b-2" style={{ borderColor: 'var(--border-color)', background: 'var(--card-alt)' }}>
            <h3 className="font-display text-sm tracking-widest uppercase" style={{ color: 'var(--fg)' }}><Calendar className="w-4 h-4 inline mr-2" />UPCOMING CALLS</h3>
          </div>
          <div className="divide-y" style={{ borderColor: 'var(--border-muted)' }}>
            {mockCalls.map(call => (
              <div key={call.id} className="flex items-center gap-3 px-5 py-3.5" style={{ background: 'var(--card)' }}>
                <div className="w-9 h-9 flex items-center justify-center border-2 text-[10px] font-bold flex-shrink-0" style={{ borderColor: 'var(--border-color)', background: 'var(--card-alt)', color: 'var(--fg)' }}>
                  {call.alumni.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-[11px] tracking-wide truncate" style={{ color: 'var(--fg)' }}>{call.alumni}</p>
                  <p className="font-mono text-[9px] truncate" style={{ color: 'var(--muted-text)' }}>{call.role} · {call.program}</p>
                  <p className="font-mono text-[9px] mt-0.5 flex items-center gap-1" style={{ color: 'var(--subtle-text)' }}>
                    <Clock className="w-3 h-3" /> {call.date} at {call.time}
                  </p>
                </div>
                <span className="font-mono text-[9px] font-bold px-2 py-0.5 border-2 flex-shrink-0 whitespace-nowrap" style={{
                  borderColor: call.status === 'Confirmed' ? '#16a34a' : 'var(--orange)',
                  color: call.status === 'Confirmed' ? '#16a34a' : 'var(--orange)',
                }}>{call.status.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
