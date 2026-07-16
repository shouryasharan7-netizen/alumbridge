import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Briefcase, Trophy, MessageCircle, Users, ArrowRight, Plus, User, Clock, Check, ExternalLink, GraduationCap } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const NORWESTER = "'Norwester', Impact, 'Arial Narrow', sans-serif"
const OPPORTUNITIES_KEY = 'alumbridge_opportunities'

export default function AlumniDashboard() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [opportunities, setOpportunities] = useState([])
  const [form, setForm] = useState({ title: '', company: '', description: '', type: 'Internship' })

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'alumni') {
      navigate('/login')
      return
    }
    try {
      const saved = localStorage.getItem(OPPORTUNITIES_KEY)
      if (saved) setOpportunities(JSON.parse(saved))
    } catch {}
  }, [currentUser, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.company.trim()) return
    const opp = { ...form, id: Date.now(), postedBy: currentUser.name, postedDate: new Date().toISOString().split('T')[0], applicants: 0 }
    const updated = [opp, ...opportunities]
    setOpportunities(updated)
    localStorage.setItem(OPPORTUNITIES_KEY, JSON.stringify(updated))
    setForm({ title: '', company: '', description: '', type: 'Internship' })
    setShowForm(false)
  }

  const mockRequests = [
    { id: 1, student: 'Rahul Sharma', question: 'What is the placement scenario like for CS at IIT Delhi?', program: 'Computer Science, IIT Delhi', time: '2 hours ago', unread: true },
    { id: 2, student: 'Priya Mehta', question: 'Can you share tips for the Goldman Sachs SRE interview?', program: 'Computer Science, IIT Delhi', time: '5 hours ago', unread: true },
    { id: 3, student: 'Ankit Verma', question: 'How is the campus life at IIT Delhi?', program: 'Computer Science, IIT Delhi', time: '1 day ago', unread: false },
    { id: 4, student: 'Sneha Gupta', question: 'What electives would you recommend for ML/AI?', program: 'Computer Science, IIT Delhi', time: '2 days ago', unread: false },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 mb-3 border-2 px-3 py-1.5" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '2px 2px 0px 0px var(--border-color)' }}>
          <GraduationCap className="w-3.5 h-3.5" style={{ color: 'var(--crimson)' }} />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--fg)' }}>ALUMNI DASHBOARD</span>
        </div>
        <h1 className="font-display text-3xl md:text-5xl tracking-wide mb-2" style={{ color: 'var(--fg)' }}>
          WELCOME, <span style={{ color: 'var(--crimson)' }}>{currentUser?.name?.split(' ')[0]?.toUpperCase() || 'ALUMNI'}</span>
        </h1>
        <p className="font-serif max-w-xl" style={{ color: 'var(--muted-text)' }}>Mentor students, post opportunities, and build your reputation in the AlumBridge community.</p>
      </div>

      {/* PROMINENT INTERNSHIP / REFERRAL CARD */}
      <div className="mb-8 border-3 p-6 transition-all hover:-translate-y-0.5" style={{
        borderColor: 'var(--border-color)', borderWidth: '3px',
        background: 'var(--orange)',
        boxShadow: '5px 5px 0px 0px var(--border-color)',
      }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-14 h-14 flex items-center justify-center border-3 flex-shrink-0" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
            <Briefcase className="w-7 h-7" style={{ color: 'var(--fg)' }} />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl tracking-wide" style={{ color: 'var(--fg)' }}>POST INTERNSHIP / REFERRAL</h2>
            <p className="font-serif text-sm mt-1" style={{ color: 'var(--fg)', opacity: 0.85 }}>
              Help students land opportunities! Post unpaid internships at your company or refer students to open roles. Earn +25 mentorship points per hire.
            </p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-brutal text-[11px] flex-shrink-0" style={{
            padding: '12px 24px', background: 'var(--fg)', color: 'var(--bg)',
            border: '2px solid var(--border-color)', boxShadow: '3px 3px 0px 0px var(--border-color)',
            fontFamily: NORWESTER,
          }}>
            {showForm ? 'CLOSE' : <><Plus className="w-4 h-4" /> POST NEW</>}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mt-5 border-t-2 pt-5" style={{ borderColor: 'rgba(0,0,0,0.2)' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="font-mono text-[10px] font-bold uppercase tracking-widest block mb-1" style={{ color: 'var(--fg)' }}>OPPORTUNITY TITLE</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Summer DevOps Intern" className="brutal-input w-full" />
              </div>
              <div>
                <label className="font-mono text-[10px] font-bold uppercase tracking-widest block mb-1" style={{ color: 'var(--fg)' }}>COMPANY</label>
                <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="e.g. Goldman Sachs" className="brutal-input w-full" />
              </div>
            </div>
            <div className="mb-3">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest block mb-1" style={{ color: 'var(--fg)' }}>TYPE</label>
              <div className="flex gap-2">
                {['Internship', 'Referral'].map(t => (
                  <button key={t} type="button" onClick={() => setForm({ ...form, type: t })}
                    className="px-4 py-2 border-2 transition-all"
                    style={{
                      fontFamily: NORWESTER, fontSize: '11px', letterSpacing: '0.5px', textTransform: 'uppercase',
                      background: form.type === t ? 'var(--fg)' : 'var(--card)',
                      color: form.type === t ? 'var(--bg)' : 'var(--fg)',
                      borderColor: 'var(--border-color)',
                    }}>{t}</button>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest block mb-1" style={{ color: 'var(--fg)' }}>DESCRIPTION</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the opportunity, requirements, duration..." className="brutal-input w-full resize-none" rows={3} />
            </div>
            <button type="submit" className="btn-brutal text-[11px]" style={{
              padding: '12px 24px', background: 'var(--card)', color: 'var(--fg)',
              border: '2px solid var(--border-color)', boxShadow: '3px 3px 0px 0px var(--border-color)',
              fontFamily: NORWESTER,
            }}>
              <Check className="w-4 h-4" /> PUBLISH OPPORTUNITY
            </button>
          </form>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link to="/mentor" className="btn-brutal btn-primary text-[10px]" style={{ padding: '10px 20px' }}>
          <Trophy className="w-3.5 h-3.5" /> MENTOR DASHBOARD
        </Link>
        <Link to="/projects" className="btn-brutal btn-secondary text-[10px]" style={{ padding: '10px 20px' }}>
          <Users className="w-3.5 h-3.5" /> BROWSE STUDENT PROJECTS
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Requests */}
        <div className="border-2" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
          <div className="px-5 py-3 border-b-2 flex items-center justify-between" style={{ borderColor: 'var(--border-color)', background: 'var(--card-alt)' }}>
            <h3 className="font-display text-sm tracking-widest uppercase" style={{ color: 'var(--fg)' }}><MessageCircle className="w-4 h-4 inline mr-2" />STUDENT REQUESTS</h3>
            <span className="font-mono text-[9px] font-bold px-2 py-0.5 border-2" style={{ borderColor: 'var(--crimson)', color: 'var(--crimson)' }}>
              {mockRequests.filter(r => r.unread).length} NEW
            </span>
          </div>
          <div className="divide-y" style={{ borderColor: 'var(--border-muted)' }}>
            {mockRequests.map(req => (
              <div key={req.id} className="flex items-start gap-3 px-5 py-3.5" style={{ background: req.unread ? 'var(--card-alt)' : 'var(--card)' }}>
                <div className="w-8 h-8 flex items-center justify-center border-2 text-[10px] font-bold flex-shrink-0" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', color: 'var(--fg)' }}>
                  {req.student.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-display text-[11px] tracking-wide" style={{ color: 'var(--fg)' }}>{req.student}</p>
                    {req.unread && <span className="w-2 h-2 rounded-full" style={{ background: 'var(--crimson)' }} />}
                  </div>
                  <p className="font-serif text-[10px] mt-0.5 line-clamp-2" style={{ color: 'var(--muted-text)' }}>{req.question}</p>
                  <p className="font-mono text-[9px] mt-1 flex items-center gap-1" style={{ color: 'var(--subtle-text)' }}>
                    <Clock className="w-3 h-3" /> {req.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Posted Opportunities */}
        <div className="border-2" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
          <div className="px-5 py-3 border-b-2" style={{ borderColor: 'var(--border-color)', background: 'var(--card-alt)' }}>
            <h3 className="font-display text-sm tracking-widest uppercase" style={{ color: 'var(--fg)' }}><Briefcase className="w-4 h-4 inline mr-2" />POSTED OPPORTUNITIES</h3>
          </div>
          <div className="p-4">
            {opportunities.length > 0 ? (
              <div className="space-y-3">
                {opportunities.map(opp => (
                  <div key={opp.id} className="p-3 border-2" style={{ borderColor: 'var(--border-muted)', background: 'var(--card-alt)' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[9px] font-bold px-2 py-0.5 border-2" style={{
                        borderColor: opp.type === 'Internship' ? 'var(--orange)' : 'var(--crimson)',
                        color: opp.type === 'Internship' ? 'var(--orange)' : 'var(--crimson)',
                      }}>{opp.type.toUpperCase()}</span>
                      <span className="font-mono text-[9px]" style={{ color: 'var(--subtle-text)' }}>{opp.postedDate}</span>
                    </div>
                    <p className="font-display text-[12px] tracking-wide" style={{ color: 'var(--fg)' }}>{opp.title}</p>
                    <p className="font-mono text-[9px]" style={{ color: 'var(--muted-text)' }}>{opp.company}</p>
                    {opp.description && <p className="font-serif text-[10px] mt-1 line-clamp-2" style={{ color: 'var(--muted-text)' }}>{opp.description}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-serif text-xs text-center py-8" style={{ color: 'var(--muted-text)' }}>No opportunities posted yet. Use the orange card above to post your first internship or referral!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
