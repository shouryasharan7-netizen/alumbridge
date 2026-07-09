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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Alumni not found</h2>
        <Link to="/programs" className="text-primary-600 hover:text-primary-700 font-medium">
          ← Back to Programs
        </Link>
      </div>
    )
  }

  const program = programs.find((p) => p.id === alum.programId)
  const initials = alum.name.split(' ').map((n) => n[0]).join('').toUpperCase()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.name && form.email && form.question) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setForm({ name: '', email: '', question: '' })
      }, 3000)
    }
  }

  const handleBook = (day, time) => {
    setBookingConfirmed({ day, time })
    setTimeout(() => setBookingConfirmed(null), 4000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to={`/programs/${alum.programId}`} className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-primary-600 mb-6 transition">
        <ArrowLeft className="w-4 h-4" />
        Back to {program?.university || 'Program'}
      </Link>

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-primary-600 to-indigo-600 px-8 py-8 text-white">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold border border-white/30">
              {initials}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{alum.name}</h1>
              <div className="flex items-center gap-1 text-primary-100 mt-1">
                <Briefcase className="w-4 h-4" />
                <span>{alum.currentRole} at {alum.company}</span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-primary-100">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Class of {alum.graduationYear}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {program?.university}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-6">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">About</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{alum.bio}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {alum.expertise.map((tag) => (
              <span key={tag} className="bg-primary-50 text-primary-700 text-xs font-medium px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          {program && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link to={`/programs/${program.id}`} className="text-xs text-gray-500 hover:text-primary-600">
                Program: {program.name}, {program.university} →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-xl p-1">
        <button
          onClick={() => setActiveTab('question')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition ${
            activeTab === 'question'
              ? 'bg-white text-primary-700 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Ask a Question
        </button>
        <button
          onClick={() => setActiveTab('call')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition ${
            activeTab === 'call'
              ? 'bg-white text-primary-700 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Phone className="w-4 h-4" />
          Book a Call
        </button>
      </div>

      {/* Question Form */}
      {activeTab === 'question' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Ask {alum.name.split(' ')[0]} a Question</h2>
          <p className="text-sm text-gray-500 mb-6">Get a personalized answer from someone who's been there.</p>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-2" />
              <p className="text-green-800 font-semibold">Question sent!</p>
              <p className="text-green-600 text-sm mt-1">
                {alum.name.split(' ')[0]} will get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Arjun Patel"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Your Question</label>
                <textarea
                  required
                  rows={4}
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  placeholder={`What was the campus culture like? How did you prepare for placements? Any advice for someone considering this program?`}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 text-white font-medium py-3 rounded-lg hover:bg-primary-700 transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Question
              </button>
            </form>
          )}
        </div>
      )}

      {/* Book a Call */}
      {activeTab === 'call' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Book a 15-min Call</h2>
          <p className="text-sm text-gray-500 mb-6">Pick a time slot that works for you. {alum.name.split(' ')[0]} will call you.</p>

          {bookingConfirmed ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-2" />
              <p className="text-green-800 font-semibold">Call booked!</p>
              <p className="text-green-600 text-sm mt-1">
                {alum.name.split(' ')[0]} will call you on <strong>{bookingConfirmed.day} at {bookingConfirmed.time}</strong>.
              </p>
              <p className="text-xs text-gray-500 mt-2">A confirmation will be sent to your email.</p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <Clock className="w-3.5 h-3.5" />
                <span>All times in IST (Indian Standard Time)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {TIME_SLOTS.map(({ day, times }) => (
                  <div key={day} className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-3">{day}</p>
                    <div className="space-y-2">
                      {times.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleBook(day, time)}
                          className="w-full text-xs font-medium py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 transition"
                        >
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
