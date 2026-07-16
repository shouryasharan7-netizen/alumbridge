import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, GraduationCap, Shield, ArrowRight, LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const NORWESTER = "'Norwester', Impact, 'Arial Narrow', sans-serif"

export default function Login() {
  const [tab, setTab] = useState('student')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const [error, setError] = useState('')
  const { currentUser, login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      navigate(currentUser.role === 'alumni' ? '/alumni-dashboard' : '/dashboard')
    }
  }, [currentUser, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!name.trim() || !email.trim()) {
      setError('Please fill in all required fields')
      return
    }
    if (tab === 'alumni' && verifyCode.trim() !== 'ALUM2026') {
      setError('Invalid verification code. Hint: ALUM2026')
      return
    }
    login(tab, name.trim(), email.trim())
    navigate(tab === 'alumni' ? '/alumni-dashboard' : '/dashboard')
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-3 border-2 px-3 py-1.5" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '2px 2px 0px 0px var(--border-color)' }}>
          <LogIn className="w-3.5 h-3.5" style={{ color: 'var(--crimson)' }} />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--fg)' }}>ALUMBRIDGE ACCESS</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl tracking-wide mb-2" style={{ color: 'var(--fg)' }}>WELCOME BACK</h1>
        <p className="font-serif text-sm" style={{ color: 'var(--muted-text)' }}>Login to access your personalized dashboard</p>
      </div>

      {/* Tabs */}
      <div className="flex mb-6 border-2" style={{ borderColor: 'var(--border-color)', boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
        <button onClick={() => { setTab('student'); setError('') }}
          className="flex-1 flex items-center justify-center gap-2 py-3 transition-all"
          style={{
            fontFamily: NORWESTER, fontSize: '12px', letterSpacing: '0.5px', textTransform: 'uppercase',
            background: tab === 'student' ? 'var(--fg)' : 'var(--card)',
            color: tab === 'student' ? 'var(--bg)' : 'var(--fg)',
          }}>
          <User className="w-4 h-4" /> STUDENT LOGIN
        </button>
        <button onClick={() => { setTab('alumni'); setError('') }}
          className="flex-1 flex items-center justify-center gap-2 py-3 transition-all"
          style={{
            fontFamily: NORWESTER, fontSize: '12px', letterSpacing: '0.5px', textTransform: 'uppercase',
            background: tab === 'alumni' ? 'var(--crimson)' : 'var(--card)',
            color: tab === 'alumni' ? '#fff' : 'var(--fg)',
          }}>
          <GraduationCap className="w-4 h-4" /> ALUMNI LOGIN
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="border-2 p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '4px 4px 0px 0px var(--border-color)' }}>
        <div className="mb-4">
          <label className="font-mono text-[10px] font-bold uppercase tracking-widest block mb-2" style={{ color: 'var(--muted-text)' }}>FULL NAME</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={tab === 'student' ? 'Rahul Sharma' : 'Dr. Priya Mehta'} className="brutal-input w-full" />
        </div>
        <div className="mb-4">
          <label className="font-mono text-[10px] font-bold uppercase tracking-widest block mb-2" style={{ color: 'var(--muted-text)' }}>EMAIL ADDRESS</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={tab === 'student' ? 'rahul@university.edu' : 'priya@company.com'} className="brutal-input w-full" />
        </div>
        {tab === 'alumni' && (
          <div className="mb-4">
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest block mb-2" style={{ color: 'var(--muted-text)' }}>
              <Shield className="w-3 h-3 inline mr-1" /> VERIFICATION CODE
            </label>
            <input type="text" value={verifyCode} onChange={(e) => setVerifyCode(e.target.value)} placeholder="Enter alumni verification code" className="brutal-input w-full" />
            <p className="font-mono text-[9px] mt-1" style={{ color: 'var(--subtle-text)' }}>Provided by your university alumni office</p>
          </div>
        )}
        {error && (
          <div className="mb-4 border-2 px-3 py-2" style={{ borderColor: 'var(--crimson)', background: 'var(--card-alt)' }}>
            <p className="font-mono text-[10px]" style={{ color: 'var(--crimson)' }}>{error}</p>
          </div>
        )}
        <button type="submit" className="btn-brutal btn-primary w-full justify-center text-[12px]" style={{ padding: '14px 24px', fontFamily: NORWESTER }}>
          LOGIN AS {tab === 'student' ? 'STUDENT' : 'ALUMNI'} <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Info */}
      <div className="mt-6 border-2 p-4" style={{ borderColor: 'var(--border-muted)', background: 'var(--card-alt)' }}>
        <p className="font-serif text-xs leading-relaxed" style={{ color: 'var(--muted-text)' }}>
          {tab === 'student'
            ? 'As a student, you can shortlist programs, book calls with alumni, track your chat history, and get personalized recommendations.'
            : 'As an alumni, you can mentor students, earn points and badges, post internship opportunities, and build your professional reputation.'}
        </p>
      </div>
    </div>
  )
}
