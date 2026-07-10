import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Briefcase, Calendar, MapPin, MessageSquare, Phone, Send, CheckCircle2, Clock, Check, Shield } from 'lucide-react'
import { alumni } from '../data/alumni'
import { programs } from '../data/programs'

const TIME_SLOTS = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM']

function getNext7Days() {
  const days = []
  const today = new Date()
  for (let i = 1; i <= 7; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push({
      key: d.toISOString().split('T')[0],
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
      date: d.getDate(),
    })
  }
  return days
}

export default function AlumniConnect() {
  const { id } = useParams()
  const alum = alumni.find((a) => a.id === id)
  const [activeTab, setActiveTab] = useState('question')
  const [submitted, setSubmitted] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', question: '' })
  const [showTooltip, setShowTooltip] = useState(false)

  const days = getNext7Days()
  const [selectedDate, setSelectedDate] = useState(days[0]?.key || '')
  const [selectedTime, setSelectedTime] = useState(null)

  if (!alum) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-display text-2xl tracking-wide mb-4" style={{ color: 'var(--fg)' }}>ALUMNI NOT FOUND</h2>
        <Link to="/programs" className="font-mono text-sm font-bold" style={{ color: 'var(--crimson)' }}>← BACK TO PROGRAMS</Link>
      </div>
    )
  }

  const program = programs.find((p) => p.id === alum.programId)
  const initials = alum.name.split(' ').map((n) => n[0]).join('').toUpperCase()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.name && form.email && form.question) {
      setSubmitted(true)
      setTimeout(() => { setSubmitted(false); setForm({ name: '', email: '', question: '' }) }, 3000)
    }
  }

  const handleBook = () => {
    if (selectedDate && selectedTime) {
      const dayObj = days.find(d => d.key === selectedDate)
      setBookingConfirmed({ day: dayObj ? `${dayObj.day}, ${dayObj.month} ${dayObj.date}` : selectedDate, time: selectedTime })
      setTimeout(() => setBookingConfirmed(null), 4000)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <Link to={`/programs/${alum.programId}`} className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider mb-6" style={{ color: 'var(--muted-text)' }}>
        <ArrowLeft className="w-4 h-4" /> BACK TO {program?.university?.toUpperCase() || 'PROGRAM'}
      </Link>

      {/* Profile card */}
      <div className="brutal-card overflow-hidden mb-8" style={{ boxShadow: '4px 4px 0px 0px var(--border-color)' }}>
        <div className="px-8 py-8 border-b-2" style={{ borderColor: 'var(--border-muted)', background: 'var(--card-alt)' }}>
          <div className="ref-code mb-3">[ALUM_{alum.id.toUpperCase()}]</div>
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 flex items-center justify-center text-2xl font-bold border-2" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', color: 'var(--fg)', fontFamily: 'Anton, sans-serif' }}>
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display text-2xl tracking-wide" style={{ color: 'var(--fg)' }}>{alum.name}</h1>
                {/* Verified Badge */}
                <div className="relative inline-block" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border-2" style={{ borderColor: '#059669', color: '#059669', background: 'transparent' }}>
                    <Check className="w-3 h-3" /> VERIFIED
                  </span>
                  {showTooltip && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs whitespace-nowrap z-20 border-2" style={{ background: 'var(--fg)', color: 'var(--bg)', borderColor: 'var(--border-color)' }}>
                      <div className="flex items-center gap-1.5 font-mono font-bold">
                        <Shield className="w-3 h-3" /> Verified via LinkedIn / University Email
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-xs mt-1" style={{ color: 'var(--muted-text)' }}>
                <Briefcase className="w-4 h-4" /> {alum.currentRole} @ {alum.company}
              </div>
              <div className="flex items-center gap-4 mt-2 font-mono text-xs" style={{ color: 'var(--subtle-text)' }}>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Class of {alum.graduationYear}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {program?.flag} {program?.university}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-6">
          <h3 className="font-mono text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--subtle-text)' }}>ABOUT</h3>
          <p className="font-serif text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>{alum.bio}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {alum.expertise.map((tag) => (
              <span key={tag} className="font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 border" style={{ borderColor: 'var(--border-muted)', color: 'var(--fg)' }}>
                {tag}
              </span>
            ))}
          </div>
          {program && (
            <div className="mt-4 pt-4 border-t-2" style={{ borderColor: 'var(--border-muted)' }}>
              <Link to={`/programs/${program.id}`} className="font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--crimson)' }}>
                {program.flag} PROGRAM: {program.name} →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mb-6 border-2" style={{ borderColor: 'var(--border-color)' }}>
        <button
          onClick={() => setActiveTab('question')}
          className="flex-1 flex items-center justify-center gap-2 py-3 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150"
          style={{
            background: activeTab === 'question' ? 'var(--fg)' : 'var(--card)',
            color: activeTab === 'question' ? 'var(--bg)' : 'var(--fg)',
            borderRight: '2px solid var(--border-color)',
          }}
        >
          <MessageSquare className="w-4 h-4" /> ASK A QUESTION
        </button>
        <button
          onClick={() => setActiveTab('call')}
          className="flex-1 flex items-center justify-center gap-2 py-3 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150"
          style={{
            background: activeTab === 'call' ? 'var(--fg)' : 'var(--card)',
            color: activeTab === 'call' ? 'var(--bg)' : 'var(--fg)',
          }}
        >
          <Phone className="w-4 h-4" /> BOOK A CALL
        </button>
      </div>

      {activeTab === 'question' && (
        <div className="brutal-card p-6" style={{ boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
          <h2 className="font-display text-lg tracking-wide mb-1" style={{ color: 'var(--fg)' }}>ASK {alum.name.split(' ')[0].toUpperCase()}</h2>
          <p className="font-serif text-sm mb-6" style={{ color: 'var(--muted-text)' }}>Get a personalized answer from someone who's been there.</p>

          {submitted ? (
            <div className="border-2 p-8 text-center" style={{ borderColor: '#059669', background: 'var(--card)' }}>
              <CheckCircle2 className="w-10 h-10 mx-auto mb-2" style={{ color: '#059669' }} />
              <p className="font-display text-lg tracking-wide" style={{ color: '#059669' }}>QUESTION SENT!</p>
              <p className="font-serif text-sm mt-1" style={{ color: 'var(--muted-text)' }}>{alum.name.split(' ')[0]} will get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--subtle-text)' }}>YOUR NAME</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Arjun Patel" className="brutal-input w-full" />
                </div>
                <div>
                  <label className="block font-mono text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--subtle-text)' }}>YOUR EMAIL</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com" className="brutal-input w-full" />
                </div>
              </div>
              <div>
                <label className="block font-mono text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--subtle-text)' }}>YOUR QUESTION</label>
                <textarea required rows={4} value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })}
                  placeholder={`What was the campus culture like?`}
                  className="brutal-input w-full resize-none" />
              </div>
              <button type="submit" className="btn-brutal btn-primary w-full">
                <Send className="w-4 h-4" /> SEND QUESTION
              </button>
            </form>
          )}
        </div>
      )}

      {activeTab === 'call' && (
        <div className="brutal-card p-6" style={{ boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
          <h2 className="font-display text-lg tracking-wide mb-1" style={{ color: 'var(--fg)' }}>BOOK A 15-MIN CALL</h2>
          <p className="font-serif text-sm mb-6" style={{ color: 'var(--muted-text)' }}>Pick a date and time. {alum.name.split(' ')[0]} will call you.</p>

          {bookingConfirmed ? (
            <div className="border-2 p-8 text-center" style={{ borderColor: '#059669', background: 'var(--card)' }}>
              <CheckCircle2 className="w-10 h-10 mx-auto mb-2" style={{ color: '#059669' }} />
              <p className="font-display text-lg tracking-wide" style={{ color: '#059669' }}>CALL BOOKED!</p>
              <p className="font-serif text-sm mt-1" style={{ color: 'var(--muted-text)' }}>{alum.name.split(' ')[0]} will call you on <strong style={{ color: 'var(--fg)' }}>{bookingConfirmed.day} at {bookingConfirmed.time}</strong>.</p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--subtle-text)' }}>
                <Clock className="w-3.5 h-3.5" /> ALL TIMES IST · SELECT DATE THEN TIME
              </div>

              {/* Horizontal date picker */}
              <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
                {days.map((d) => (
                  <button
                    key={d.key}
                    onClick={() => { setSelectedDate(d.key); setSelectedTime(null) }}
                    className="flex-shrink-0 flex flex-col items-center px-4 py-3 border-2 transition-all duration-150 min-w-[72px] hover:-translate-y-0.5"
                    style={{
                      background: selectedDate === d.key ? 'var(--fg)' : 'var(--card)',
                      color: selectedDate === d.key ? 'var(--bg)' : 'var(--fg)',
                      borderColor: 'var(--border-color)',
                      boxShadow: selectedDate === d.key ? '2px 2px 0px 0px var(--border-color)' : 'none',
                    }}
                  >
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wide">{d.day}</span>
                    <span className="font-display text-xl">{d.date}</span>
                    <span className="font-mono text-[9px]">{d.month}</span>
                  </button>
                ))}
              </div>

              {/* Time slots grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className="font-mono text-[10px] font-bold py-2.5 border-2 transition-all duration-150 hover:-translate-y-0.5"
                    style={{
                      background: selectedTime === time ? 'var(--crimson)' : 'var(--card)',
                      color: selectedTime === time ? '#fff' : 'var(--fg)',
                      borderColor: 'var(--border-color)',
                      boxShadow: selectedTime === time ? '2px 2px 0px 0px var(--border-color)' : 'none',
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {/* Confirm button */}
              <button
                onClick={handleBook}
                disabled={!selectedTime}
                className={`btn-brutal w-full mt-5 ${selectedTime ? 'btn-primary' : ''}`}
                style={selectedTime ? {} : { background: 'var(--card-alt)', color: 'var(--subtle-text)', border: '2px solid var(--border-muted)', boxShadow: 'none', cursor: 'not-allowed' }}
              >
                <Phone className="w-4 h-4" />
                {selectedTime ? `CONFIRM BOOKING — ${selectedTime}` : 'SELECT A TIME SLOT'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
