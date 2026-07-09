import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Briefcase, Calendar, MapPin, MessageSquare, Phone, Send, CheckCircle2, Clock } from 'lucide-react'
import { alumni } from '../data/alumni'
import { programs } from '../data/programs'

const TIME_SLOTS = [
  { day: 'Mon', times: ['10:00 AM', '2:00 PM', '5:00 PM'] },
  { day: 'Tue', times: ['11:00 AM', '3:00 PM'] },
  { day: 'Wed', times: ['10:00 AM', '4:00 PM', '6:00 PM'] },
  { day: 'Thu', times: ['2:00 PM', '5:00 PM'] },
  { day: 'Fri', times: ['10:00 AM', '11:00 AM'] },
]

export default function AlumniConnect() {
  const { id } = useParams()
  const alum = alumni.find((a) => a.id === id)
  const [activeTab, setActiveTab] = useState('question')
  const [submitted, setSubmitted] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', question: '' })

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

  const handleBook = (day, time) => {
    setBookingConfirmed({ day, time })
    setTimeout(() => setBookingConfirmed(null), 4000)
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
              <h1 className="font-display text-2xl font-bold">{alum.name}</h1>
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
          <p className="text-sm text-primary-400 mb-6">Pick a time slot. {alum.name.split(' ')[0]} will call you.</p>

          {bookingConfirmed ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <p className="text-emerald-800 font-semibold">Call booked!</p>
              <p className="text-emerald-600 text-sm mt-1">{alum.name.split(' ')[0]} will call you on <strong>{bookingConfirmed.day} at {bookingConfirmed.time}</strong>.</p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-xs text-primary-400 mb-4">
                <Clock className="w-3.5 h-3.5" /><span>All times in IST</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {TIME_SLOTS.map(({ day, times }) => (
                  <div key={day} className="bg-cream rounded-xl p-3 text-center border border-primary-100/30">
                    <p className="text-xs font-bold text-primary-400 uppercase mb-3">{day}</p>
                    <div className="space-y-2">
                      {times.map((time) => (
                        <button key={time} onClick={() => handleBook(day, time)}
                          className="w-full text-xs font-medium py-2 rounded-lg bg-white border border-primary-100/50 text-primary-600 hover:bg-crimson-50 hover:border-crimson-200 hover:text-crimson-600 transition-all duration-200">
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
