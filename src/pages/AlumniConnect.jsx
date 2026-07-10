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
      year: d.getFullYear(),
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
        <h2 className="font-display text-2xl font-bold text-primary-600 mb-4">Alumni not found</h2>
        <Link to="/programs" className="text-crimson-600 hover:text-crimson-700 font-medium">← Back to Programs</Link>
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
      <Link to={`/programs/${alum.programId}`} className="inline-flex items-center gap-1.5 text-sm text-primary-400 hover:text-crimson-600 mb-6 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" />
        Back to {program?.university || 'Program'}
      </Link>

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-primary-100/50 shadow-sm overflow-hidden mb-8">
        <div className="bg-gradient-to-br from-primary-600 via-primary-600 to-crimson-700 px-8 py-8 text-white">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-2xl font-bold border border-white/25">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display text-2xl font-bold">{alum.name}</h1>
                {/* Verified Badge */}
                <div className="relative inline-block"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <span className="inline-flex items-center gap-1 bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full cursor-help">
                    <Check className="w-3 h-3" /> Verified
                  </span>
                  {showTooltip && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-primary-700 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-20">
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-3 h-3 text-gold-400" />
                        Verified via LinkedIn / University Email
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary-700"></div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-primary-200 mt-1">
                <Briefcase className="w-4 h-4" />
                <span>{alum.currentRole} at {alum.company}</span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-primary-200">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Class of {alum.graduationYear}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {program?.flag} {program?.university}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-6">
          <h3 className="text-xs font-bold text-primary-400 uppercase tracking-widest mb-2">About</h3>
          <p className="text-primary-500 text-sm leading-relaxed">{alum.bio}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {alum.expertise.map((tag) => (
              <span key={tag} className="bg-cream text-primary-600 text-xs font-medium px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          {program && (
            <div className="mt-4 pt-4 border-t border-primary-100/50">
              <Link to={`/programs/${program.id}`} className="text-xs text-primary-400 hover:text-crimson-600 font-medium">
                {program.flag} Program: {program.name}, {program.university} →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-cream rounded-xl p-1 border border-primary-100/50">
        <button
          onClick={() => setActiveTab('question')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === 'question' ? 'bg-white text-crimson-600 shadow-sm' : 'text-primary-400 hover:text-primary-600'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Ask a Question
        </button>
        <button
          onClick={() => setActiveTab('call')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === 'call' ? 'bg-white text-crimson-600 shadow-sm' : 'text-primary-400 hover:text-primary-600'
          }`}
        >
          <Phone className="w-4 h-4" />
          Book a Call
        </button>
      </div>

      {activeTab === 'question' && (
        <div className="bg-white rounded-2xl border border-primary-100/50 shadow-sm p-6">
          <h2 className="font-display text-lg font-bold text-primary-600 mb-1">Ask {alum.name.split(' ')[0]} a Question</h2>
          <p className="text-sm text-primary-400 mb-6">Get a personalized answer from someone who's been there.</p>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <p className="text-emerald-800 font-semibold">Question sent!</p>
              <p className="text-emerald-600 text-sm mt-1">{alum.name.split(' ')[0]} will get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-primary-400 uppercase tracking-wide mb-1">Your Name</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Arjun Patel" className="w-full border border-primary-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-crimson-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-primary-400 uppercase tracking-wide mb-1">Your Email</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com" className="w-full border border-primary-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-crimson-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-primary-400 uppercase tracking-wide mb-1">Your Question</label>
                <textarea required rows={4} value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })}
                  placeholder={`What was the campus culture like? How did you prepare for placements?`}
                  className="w-full border border-primary-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-crimson-500 focus:border-transparent resize-none" />
              </div>
              <button type="submit" className="w-full bg-crimson-600 text-white font-semibold py-3 rounded-xl hover:bg-crimson-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                <Send className="w-4 h-4" /> Send Question
              </button>
            </form>
          )}
        </div>
      )}

      {activeTab === 'call' && (
        <div className="bg-white rounded-2xl border border-primary-100/50 shadow-sm p-6">
          <h2 className="font-display text-lg font-bold text-primary-600 mb-1">Book a 15-min Call</h2>
          <p className="text-sm text-primary-400 mb-6">Pick a date and time. {alum.name.split(' ')[0]} will call you.</p>

          {bookingConfirmed ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <p className="text-emerald-800 font-semibold">Call booked!</p>
              <p className="text-emerald-600 text-sm mt-1">{alum.name.split(' ')[0]} will call you on <strong>{bookingConfirmed.day} at {bookingConfirmed.time}</strong>.</p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-xs text-primary-400 mb-4">
                <Clock className="w-3.5 h-3.5" /><span>All times in IST · Select a date, then pick a time slot</span>
              </div>

              {/* Horizontal date picker */}
              <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-thin">
                {days.map((d) => (
                  <button
                    key={d.key}
                    onClick={() => { setSelectedDate(d.key); setSelectedTime(null) }}
                    className={`flex-shrink-0 flex flex-col items-center rounded-xl px-4 py-3 border transition-all duration-200 min-w-[72px] ${
                      selectedDate === d.key
                        ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                        : 'bg-white text-primary-500 border-primary-100 hover:border-crimson-200 hover:text-crimson-600'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wide">{d.day}</span>
                    <span className="text-lg font-bold mt-0.5">{d.date}</span>
                    <span className="text-[10px]">{d.month}</span>
                  </button>
                ))}
              </div>

              {/* Time slots grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`text-xs font-medium py-2.5 rounded-lg border transition-all duration-200 ${
                      selectedTime === time
                        ? 'bg-crimson-600 text-white border-crimson-600 shadow-sm'
                        : 'bg-white text-primary-600 border-primary-100 hover:bg-crimson-50 hover:border-crimson-200 hover:text-crimson-600'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {/* Confirm button */}
              <button
                onClick={handleBook}
                disabled={!selectedTime}
                className={`mt-5 w-full font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-sm ${
                  selectedTime
                    ? 'bg-crimson-600 text-white hover:bg-crimson-700 hover:shadow-md'
                    : 'bg-primary-100 text-primary-300 cursor-not-allowed'
                }`}
              >
                <Phone className="w-4 h-4" />
                {selectedTime ? `Confirm Booking — ${selectedTime}` : 'Select a time slot to book'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
