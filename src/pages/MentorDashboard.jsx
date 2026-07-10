import { useState } from 'react'
import { Trophy, Star, TrendingUp, Award, Linkedin, ExternalLink, Clock, Users, Briefcase, ChevronDown, Zap, Target, Shield } from 'lucide-react'
import { RANKS, BADGES, POINT_RULES, generateActivities, getTotalPoints, getCurrentRank, getNextRank, getEarnedBadges } from '../data/mentorship'
import { alumni } from '../data/alumni'
import { programs } from '../data/programs'
import { Link } from 'react-router-dom'

const NORWESTER = "'Norwester', Impact, 'Arial Narrow', sans-serif"

export default function MentorDashboard() {
  const [selectedAlumni, setSelectedAlumni] = useState(alumni[0].id)
  const [activeTab, setActiveTab] = useState('overview')

  const alum = alumni.find(a => a.id === selectedAlumni)
  const program = programs.find(p => p.id === alum?.programId)
  const activities = generateActivities(alum?.name)
  const totalPoints = getTotalPoints(activities)
  const currentRank = getCurrentRank(totalPoints)
  const nextRank = getNextRank(totalPoints)
  const earnedBadges = getEarnedBadges(totalPoints, activities)

  const progress = nextRank
    ? Math.min(100, ((totalPoints - currentRank.minPoints) / (nextRank.minPoints - currentRank.minPoints)) * 100)
    : 100

  const tabs = [
    { id: 'overview', label: 'OVERVIEW', icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { id: 'badges', label: 'BADGES', icon: <Award className="w-3.5 h-3.5" /> },
    { id: 'activity', label: 'ACTIVITY', icon: <Clock className="w-3.5 h-3.5" /> },
    { id: 'earn', label: 'EARN POINTS', icon: <Zap className="w-3.5 h-3.5" /> },
  ]

  const stats = [
    { label: 'STUDENTS HELPED', value: new Set(activities.map(a => a.student)).size, icon: <Users className="w-4 h-4" /> },
    { label: 'PROJECTS REVIEWED', value: activities.filter(a => a.type === 'review').length, icon: <Target className="w-4 h-4" /> },
    { label: 'INTERNS HIRED', value: activities.filter(a => a.type === 'hire').length, icon: <Briefcase className="w-4 h-4" /> },
    { label: 'TOTAL POINTS', value: totalPoints, icon: <Star className="w-4 h-4" /> },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 mb-3 border-2 px-3 py-1.5" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '2px 2px 0px 0px var(--border-color)' }}>
          <Trophy className="w-3.5 h-3.5" style={{ color: 'var(--crimson)' }} />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--fg)' }}>
            MENTORSHIP PROGRAM
          </span>
        </div>
        <h1 className="font-display text-3xl md:text-5xl tracking-wide mb-2" style={{ color: 'var(--fg)' }}>
          MENTOR <span style={{ color: 'var(--crimson)' }}>DASHBOARD</span>
        </h1>
        <p className="font-serif max-w-xl" style={{ color: 'var(--muted-text)' }}>
          Help students, earn points, unlock ranks and badges. Share your achievements on LinkedIn.
        </p>
      </div>

      {/* Alumni Selector */}
      <div className="mb-6">
        <label className="font-mono text-[10px] font-bold uppercase tracking-widest block mb-2" style={{ color: 'var(--muted-text)' }}>VIEWING AS:</label>
        <select
          value={selectedAlumni}
          onChange={(e) => setSelectedAlumni(e.target.value)}
          className="brutal-input select-icon w-full sm:w-80"
        >
          {alumni.slice(0, 50).map(a => {
            const p = programs.find(pr => pr.id === a.programId)
            return <option key={a.id} value={a.id}>{a.name} — {a.company}</option>
          })}
        </select>
      </div>

      {/* Rank & Points Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        {/* Current Rank Card */}
        <div className="lg:col-span-1 border-2 p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '4px 4px 0px 0px var(--border-color)' }}>
          <div className="text-center">
            <div className="text-6xl mb-3">{currentRank.icon}</div>
            <h2 className="font-display text-xl tracking-wide mb-1" style={{ color: currentRank.color }}>{currentRank.name.toUpperCase()}</h2>
            <p className="font-serif text-xs mb-4" style={{ color: 'var(--muted-text)' }}>{currentRank.description}</p>
            <div className="font-display text-4xl tracking-wide mb-1" style={{ color: 'var(--fg)' }}>{totalPoints}</div>
            <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color: 'var(--muted-text)' }}>TOTAL POINTS</p>
          </div>
        </div>

        {/* Progress & Stats */}
        <div className="lg:col-span-2 border-2 p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '4px 4px 0px 0px var(--border-color)' }}>
          {/* Alumni Info */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 flex items-center justify-center border-2 text-lg font-bold" style={{ borderColor: 'var(--border-color)', background: 'var(--card-alt)', color: 'var(--fg)' }}>
              {alum?.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="font-display text-lg tracking-wide" style={{ color: 'var(--fg)' }}>{alum?.name}</h3>
              <p className="font-mono text-[10px]" style={{ color: 'var(--muted-text)' }}>{alum?.currentRole} at {alum?.company}</p>
              <p className="font-mono text-[9px]" style={{ color: 'var(--subtle-text)' }}>{program?.name} — {program?.university}</p>
            </div>
          </div>

          {/* Progress Bar */}
          {nextRank ? (
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg)' }}>
                  {currentRank.icon} {currentRank.name}
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--muted-text)' }}>
                  NEXT: {nextRank.icon} {nextRank.name} ({nextRank.minPoints - totalPoints} pts to go)
                </span>
              </div>
              <div className="w-full h-4 border-2 overflow-hidden" style={{ borderColor: 'var(--border-color)', background: 'var(--card-alt)' }}>
                <div className="h-full transition-all duration-700" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${currentRank.color}, ${nextRank.color})` }} />
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-mono text-[9px]" style={{ color: 'var(--subtle-text)' }}>{currentRank.minPoints}</span>
                <span className="font-mono text-[9px]" style={{ color: 'var(--subtle-text)' }}>{nextRank.minPoints}</span>
              </div>
            </div>
          ) : (
            <div className="mb-5 border-2 p-4 text-center" style={{ borderColor: 'var(--orange)', background: 'var(--card-alt)' }}>
              <span className="font-display text-lg" style={{ color: 'var(--orange)' }}>👑 MAX RANK ACHIEVED</span>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map(s => (
              <div key={s.label} className="border-2 p-3 text-center" style={{ borderColor: 'var(--border-muted)', background: 'var(--card-alt)' }}>
                <div className="flex justify-center mb-1" style={{ color: 'var(--orange)' }}>{s.icon}</div>
                <div className="font-display text-xl tracking-wide" style={{ color: 'var(--fg)' }}>{s.value}</div>
                <p className="font-mono text-[8px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--muted-text)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Ranks */}
      <div className="border-2 p-5 mb-8" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
        <h3 className="font-display text-sm tracking-widest uppercase mb-4" style={{ color: 'var(--orange)' }}>RANK PROGRESSION</h3>
        <div className="flex flex-wrap gap-3">
          {RANKS.map((rank) => {
            const achieved = totalPoints >= rank.minPoints
            return (
              <div key={rank.name} className="flex items-center gap-2 px-4 py-2 border-2 transition-all" style={{
                borderColor: achieved ? rank.color : 'var(--border-muted)',
                background: achieved ? 'var(--card-alt)' : 'transparent',
                opacity: achieved ? 1 : 0.4,
              }}>
                <span className="text-2xl">{rank.icon}</span>
                <div>
                  <p className="font-display text-[11px] tracking-wide" style={{ color: achieved ? rank.color : 'var(--muted-text)' }}>{rank.name}</p>
                  <p className="font-mono text-[9px]" style={{ color: 'var(--subtle-text)' }}>{rank.minPoints}+ pts</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2 px-4 py-2.5 border-2 transition-all duration-150 hover:-translate-y-0.5"
            style={{
              fontFamily: NORWESTER, fontSize: '11px', letterSpacing: '0.5px',
              background: activeTab === tab.id ? 'var(--fg)' : 'transparent',
              color: activeTab === tab.id ? 'var(--bg)' : 'var(--fg)',
              borderColor: 'var(--border-color)',
              boxShadow: activeTab === tab.id ? '3px 3px 0px 0px var(--border-color)' : 'none',
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="border-2" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
            <div className="px-5 py-3 border-b-2" style={{ borderColor: 'var(--border-color)', background: 'var(--card-alt)' }}>
              <h3 className="font-display text-sm tracking-widest uppercase" style={{ color: 'var(--fg)' }}>RECENT ACTIVITY</h3>
            </div>
            <div className="divide-y" style={{ borderColor: 'var(--border-muted)' }}>
              {activities.slice(0, 6).map(a => (
                <ActivityRow key={a.id} activity={a} />
              ))}
            </div>
          </div>

          {/* Top Badges */}
          <div className="border-2" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
            <div className="px-5 py-3 border-b-2" style={{ borderColor: 'var(--border-color)', background: 'var(--card-alt)' }}>
              <h3 className="font-display text-sm tracking-widest uppercase" style={{ color: 'var(--fg)' }}>BADGES EARNED ({earnedBadges.length})</h3>
            </div>
            <div className="p-5">
              {earnedBadges.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {earnedBadges.slice(0, 6).map(badge => (
                    <BadgeCard key={badge.id} badge={badge} earned />
                  ))}
                </div>
              ) : (
                <p className="font-serif text-sm text-center py-8" style={{ color: 'var(--muted-text)' }}>Start helping students to earn badges!</p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="border-2 p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-lg tracking-widest uppercase" style={{ color: 'var(--fg)' }}>ALL BADGES</h3>
            <span className="font-mono text-[10px] font-bold" style={{ color: 'var(--orange)' }}>{earnedBadges.length}/{BADGES.length} UNLOCKED</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BADGES.map(badge => {
              const earned = earnedBadges.some(b => b.id === badge.id)
              return <BadgeCard key={badge.id} badge={badge} earned={earned} showLinkedin={earned} />
            })}
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="border-2" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
          <div className="px-5 py-3 border-b-2" style={{ borderColor: 'var(--border-color)', background: 'var(--card-alt)' }}>
            <h3 className="font-display text-sm tracking-widest uppercase" style={{ color: 'var(--fg)' }}>FULL ACTIVITY LOG</h3>
          </div>
          <div className="divide-y" style={{ borderColor: 'var(--border-muted)' }}>
            {activities.map(a => (
              <ActivityRow key={a.id} activity={a} detailed />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'earn' && (
        <div className="border-2 p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
          <h3 className="font-display text-lg tracking-widest uppercase mb-6" style={{ color: 'var(--fg)' }}>HOW TO EARN POINTS</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {POINT_RULES.map(rule => (
              <div key={rule.action} className="flex items-center gap-4 p-4 border-2" style={{ borderColor: 'var(--border-muted)', background: 'var(--card-alt)' }}>
                <span className="text-2xl">{rule.icon}</span>
                <div className="flex-1">
                  <p className="font-display text-sm tracking-wide" style={{ color: 'var(--fg)' }}>{rule.action}</p>
                </div>
                <div className="font-display text-lg tracking-wide px-3 py-1 border-2" style={{ borderColor: 'var(--orange)', color: 'var(--orange)' }}>
                  +{rule.points}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t-2 pt-6" style={{ borderColor: 'var(--border-muted)' }}>
            <h4 className="font-display text-sm tracking-widest uppercase mb-4" style={{ color: 'var(--orange)' }}>QUICK ACTIONS</h4>
            <div className="flex flex-wrap gap-3">
              <Link to="/projects" className="btn-brutal btn-primary text-[10px]" style={{ padding: '10px 20px' }}>
                <Target className="w-3.5 h-3.5" /> BROWSE STUDENT PROJECTS
              </Link>
              <Link to="/alumni" className="btn-brutal btn-secondary text-[10px]" style={{ padding: '10px 20px' }}>
                <Users className="w-3.5 h-3.5" /> FIND STUDENTS TO MENTOR
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ActivityRow({ activity: a, detailed }) {
  const typeConfig = {
    answer: { icon: '💬', color: '#3b82f6' },
    review: { icon: '📝', color: '#8b5cf6' },
    career: { icon: '🗣️', color: '#10b981' },
    interview: { icon: '🎤', color: '#f59e0b' },
    resume: { icon: '📄', color: '#06b6d4' },
    hire: { icon: '🤝', color: '#ef4444' },
    refer: { icon: '📧', color: '#ec4899' },
    resource: { icon: '📎', color: '#6b7280' },
  }
  const config = typeConfig[a.type] || typeConfig.answer

  return (
    <div className="flex items-center gap-3 px-5 py-3.5 hover:brightness-95 transition-all" style={{ background: 'var(--card)' }}>
      <span className="text-lg flex-shrink-0">{config.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="font-display text-[12px] tracking-wide leading-tight truncate" style={{ color: 'var(--fg)' }}>{a.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="font-mono text-[9px]" style={{ color: 'var(--subtle-text)' }}>{a.date}</span>
          {detailed && <span className="font-mono text-[9px]" style={{ color: 'var(--muted-text)' }}>· with {a.student}</span>}
        </div>
      </div>
      <span className="font-display text-sm tracking-wide flex-shrink-0 px-2 py-0.5 border-2" style={{ borderColor: config.color, color: config.color }}>
        +{a.points}
      </span>
    </div>
  )
}

function BadgeCard({ badge, earned, showLinkedin }) {
  const linkedinUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=AlumBridge%20${encodeURIComponent(badge.name)}%20Badge&organizationName=AlumBridge`

  return (
    <div className="border-2 p-4 transition-all" style={{
      borderColor: earned ? 'var(--border-color)' : 'var(--border-muted)',
      background: earned ? 'var(--card-alt)' : 'transparent',
      opacity: earned ? 1 : 0.35,
      boxShadow: earned ? '2px 2px 0px 0px var(--border-color)' : 'none',
    }}>
      <div className="flex items-start gap-3">
        <span className="text-3xl">{badge.icon}</span>
        <div className="flex-1">
          <h4 className="font-display text-[12px] tracking-wide" style={{ color: earned ? 'var(--fg)' : 'var(--muted-text)' }}>{badge.name}</h4>
          <p className="font-serif text-[10px] mt-0.5" style={{ color: 'var(--muted-text)' }}>{badge.description}</p>
          <span className="font-mono text-[9px] font-bold mt-1 inline-block px-1.5 py-0.5 border" style={{ borderColor: 'var(--border-muted)', color: 'var(--subtle-text)' }}>
            {badge.category}
          </span>
        </div>
      </div>
      {showLinkedin && (
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center gap-2 w-full py-2 border-2 transition-all hover:-translate-y-0.5"
          style={{ borderColor: '#0077b5', background: '#0077b5', color: '#fff', fontFamily: NORWESTER, fontSize: '10px', letterSpacing: '0.5px' }}>
          <Linkedin className="w-3.5 h-3.5" /> SHARE ON LINKEDIN
        </a>
      )}
    </div>
  )
}
