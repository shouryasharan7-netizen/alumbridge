import { Link } from 'react-router-dom'
import { Home, BookOpen, BarChart3, Users, MessageCircle, ArrowRight, Globe, MapPin, ChevronRight, Sparkles, Rocket } from 'lucide-react'
import { programs } from '../data/programs'
import { alumni } from '../data/alumni'
import { projects } from '../data/projects'

export default function Sitemap() {
  const countries = [...new Set(programs.map(p => p.country))].sort()
  const universities = [...new Set(programs.map(p => p.university))].sort()
  const byCountry = {}
  programs.forEach(p => { (byCountry[p.country] = byCountry[p.country] || []).push(p) })

  const byUni = {}
  programs.forEach(p => { (byUni[p.university] = byUni[p.university] || []).push(p) })

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 animate-fade-in">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-3 border-2 px-3 py-1.5" style={{ borderColor: 'var(--border-color)', background: 'var(--card)', boxShadow: '2px 2px 0px 0px var(--border-color)' }}>
          <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--crimson)' }} />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--fg)' }}>
            SITE MAP · {programs.length} PROGRAMS · {universities.length} UNIVERSITIES
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-wide mb-3" style={{ color: 'var(--fg)' }}>
          EXPLORE <span style={{ color: 'var(--crimson)' }}>ALUMBRIDGE</span>
        </h1>
        <p className="font-serif text-base max-w-xl" style={{ color: 'var(--muted-text)' }}>
          Your complete guide to {programs.length} programs across {countries.length} countries and {universities.length} universities. Find your perfect program below.
        </p>
      </div>

      {/* Quick Links */}
      <section className="mb-12">
        <h2 className="font-display text-xl tracking-wide mb-4" style={{ color: 'var(--fg)' }}>QUICK LINKS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { to: '/', icon: Home, label: 'Home', desc: 'Landing page' },
            { to: '/programs', icon: BookOpen, label: 'Programs', desc: `${programs.length} programs + compare` },
            { to: '/alumni', icon: Users, label: 'Alumni', desc: `${alumni.length} verified` },
            { to: '/projects', icon: Rocket, label: 'Projects', desc: `${projects.length} student projects` },
          ].map(link => (
            <Link key={link.to} to={link.to} className="brutal-card p-4 flex items-center gap-3 transition-all hover:-translate-y-0.5" style={{ boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
              <div className="w-10 h-10 flex items-center justify-center border-2 flex-shrink-0" style={{ borderColor: 'var(--border-color)', background: 'var(--card)' }}>
                <link.icon className="w-5 h-5" style={{ color: 'var(--crimson)' }} />
              </div>
              <div>
                <h3 className="font-bold text-sm" style={{ color: 'var(--fg)', fontFamily: 'system-ui' }}>{link.label}</h3>
                <p className="font-mono text-[9px]" style={{ color: 'var(--subtle-text)' }}>{link.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 ml-auto flex-shrink-0" style={{ color: 'var(--subtle-text)' }} />
            </Link>
          ))}
        </div>
      </section>

      {/* By Country */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5" style={{ color: 'var(--orange)' }} />
          <h2 className="font-display text-xl tracking-wide" style={{ color: 'var(--fg)' }}>BY COUNTRY ({countries.length})</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {countries.map(country => {
            const progs = byCountry[country]
            const unis = [...new Set(progs.map(p => p.university))]
            return (
              <div key={country} className="brutal-card p-5" style={{ boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-base tracking-wide flex items-center gap-2" style={{ color: 'var(--fg)' }}>
                    {progs[0].flag} {country.toUpperCase()}
                  </h3>
                  <span className="font-mono text-[9px] font-bold px-2 py-0.5 border" style={{ borderColor: 'var(--border-muted)', color: 'var(--muted-text)' }}>
                    {progs.length} PROGRAMS · {unis.length} UNIS
                  </span>
                </div>
                <div className="space-y-1">
                  {unis.map(uni => (
                    <Link key={uni} to={`/programs?search=${encodeURIComponent(uni)}`} className="flex items-center gap-1.5 text-xs py-1 transition-colors group" style={{ color: 'var(--muted-text)' }}>
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--crimson)' }} />
                      <span className="group-hover:underline">{uni}</span>
                      <span className="font-mono text-[8px] ml-auto" style={{ color: 'var(--subtle-text)' }}>
                        {byUni[uni]?.length || 0}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* All Programs */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5" style={{ color: 'var(--crimson)' }} />
          <h2 className="font-display text-xl tracking-wide" style={{ color: 'var(--fg)' }}>ALL PROGRAMS ({programs.length})</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {Object.entries(byUni).sort(([a], [b]) => a.localeCompare(b)).map(([uni, progs]) => (
            <div key={uni} className="p-3 border" style={{ borderColor: 'var(--border-muted)', background: 'var(--card)' }}>
              <h4 className="font-bold text-xs mb-1.5 flex items-center gap-1" style={{ color: 'var(--fg)', fontFamily: 'system-ui' }}>
                {progs[0].flag} {uni}
              </h4>
              <div className="space-y-0.5">
                {progs.map(p => (
                  <Link key={p.id} to={`/programs/${p.id}`} className="block font-mono text-[9px] py-0.5 transition-colors hover:underline" style={{ color: 'var(--muted-text)' }}>
                    → {p.name} <span style={{ color: 'var(--subtle-text)' }}>({p.degree})</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Alumni */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5" style={{ color: 'var(--orange)' }} />
          <h2 className="font-display text-xl tracking-wide" style={{ color: 'var(--fg)' }}>ALUMNI NETWORK ({alumni.length})</h2>
        </div>
        <div className="brutal-card p-5" style={{ boxShadow: '3px 3px 0px 0px var(--border-color)' }}>
          <p className="font-serif text-sm mb-4" style={{ color: 'var(--muted-text)' }}>
            Connect with {alumni.length} verified alumni from {countries.length} countries. Ask questions, book calls, read honest reviews.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link to="/alumni" className="btn-brutal btn-primary text-[10px]" style={{ padding: '8px 20px' }}>
              BROWSE ALL ALUMNI <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/programs" className="btn-brutal btn-secondary text-[10px]" style={{ padding: '8px 20px' }}>
              FIND YOUR PROGRAM
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
