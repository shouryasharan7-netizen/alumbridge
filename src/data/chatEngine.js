import { alumni } from '../data/alumni'
import { programs } from '../data/programs'

// Pre-compute indexes for fast lookup
const countries = [...new Set(programs.map(p => p.country))]
const universities = [...new Set(programs.map(p => p.university))]
const programNames = [...new Set(programs.map(p => p.name))]
const byCountry = {}
const byUniversity = {}
const byBranch = {}
programs.forEach(p => {
  ;(byCountry[p.country] = byCountry[p.country] || []).push(p)
  ;(byUniversity[p.university] = byUniversity[p.university] || []).push(p)
  const key = p.name.toLowerCase()
  ;(byBranch[key] = byBranch[key] || []).push(p)
})

function findPrograms(query) {
  const q = query.toLowerCase()
  return programs.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.university.toLowerCase().includes(q) ||
    p.country.toLowerCase().includes(q) ||
    p.id.includes(q.replace(/\s+/g, '-'))
  )
}

function findAlumni(query) {
  const q = query.toLowerCase()
  return alumni.filter(a =>
    a.name.toLowerCase().includes(q) ||
    a.company.toLowerCase().includes(q) ||
    a.currentRole.toLowerCase().includes(q) ||
    a.expertise.some(e => e.toLowerCase().includes(q))
  )
}

function topPrograms(n = 5, sortBy = 'tier') {
  const tierOrder = { S: 0, A: 1, B: 2 }
  const withTier = programs.map(p => {
    const u = p.university
    const tier = u.startsWith('IIT') || u.startsWith('MIT') || u.startsWith('Stanford') || u.startsWith('Oxford') || u.startsWith('Cambridge') || u.startsWith('ETH') || u.startsWith('EPFL') || u.startsWith('Carnegie') || u.startsWith('Berkeley') || u.startsWith('NUS') || u.startsWith('KAIST') || u.startsWith('Tokyo') || u.startsWith('Tsinghua') || u.startsWith('Technion') || u.startsWith('Imperial') || u.startsWith('Polytechnique') ? 'S' : u.startsWith('NIT') || u.startsWith('BITS') || u.startsWith('IIIT') || u.startsWith('Georgia') || u.startsWith('UIUC') || u.startsWith('UMich') || u.startsWith('Cornell') || u.startsWith('UT Austin') || u.startsWith('Purdue') || u.startsWith('UCL') || u.startsWith('Edinburgh') || u.startsWith('Manchester') || u.startsWith('UBC') || u.startsWith('Waterloo') || u.startsWith('McGill') || u.startsWith('NTU') || u.startsWith('TU ') || u.startsWith('RWTH') || u.startsWith('Melbourne') || u.startsWith('UNSW') || u.startsWith('KTH') || u.startsWith('HKUST') || u.startsWith('Seoul') || u.startsWith('Sorbonne') || u.startsWith('Delft') ? 'A' : 'B'
    return { ...p, tierRank: tierOrder[tier] || 2 }
  })
  return withTier.sort((a, b) => a.tierRank - b.tierRank).slice(0, n)
}

function fmtList(arr, limit = 8) {
  return arr.slice(0, limit).map(p => `• **${p.university}** — ${p.name} (${p.flag} ${p.country})`).join('\n')
}

const knowledgeBase = [
  {
    keywords: ['hello', 'hi', 'hey', 'help', 'start', 'what can you', 'welcome'],
    response: () => {
      return `Hey there! 👋 Welcome to **AlumBridge AI**!\n\n` +
        `I'm trained on insights from **${alumni.length}+ verified alumni** across **${programs.length} programs in ${countries.length} countries**. I'll give you honest, data-backed answers — no marketing fluff.\n\n` +
        `**I can help with:**\n\n` +
        `📊 **Compare programs** — across ${countries.length} countries\n` +
        `🎓 **Specific universities** — from ${universities.length} institutions\n` +
        `💼 **Placements & careers** — packages, recruiters, outcomes\n` +
        `📝 **Entrance exams** — requirements & cutoffs\n` +
        `💰 **Fees & ROI** — which programs give best value\n` +
        `🏫 **Campus life** — culture, city vibes\n` +
        `🚀 **Research & startups** — labs, publications\n\n` +
        `Just ask! For example:\n` +
        `- "Show me CS programs in Germany"\n` +
        `- "Which has the best placements?"\n` +
        `- "Tell me about Stanford"\n` +
        `- "Best program for AI/ML?"`
    }
  },
  {
    keywords: ['cs', 'computer science', 'coding', 'software', 'cse', 'comp sci'],
    response: () => {
      const csPrograms = programs.filter(p => p.name.toLowerCase().includes('computer science'))
      const grouped = {}
      csPrograms.forEach(p => { (grouped[p.country] = grouped[p.country] || []).push(p) })
      let msg = `**Computer Science** programs on AlumBridge (${csPrograms.length} programs across ${Object.keys(grouped).length} countries):\n\n`
      Object.entries(grouped).sort().forEach(([country, progs]) => {
        const uni = progs[0].flag
        msg += `${uni} **${country}** (${progs.length} programs):\n`
        progs.slice(0, 5).forEach(p => {
          msg += `  • **${p.university}** — ${p.degree}, Avg ${p.placementStats.avgPackage}\n`
        })
        if (progs.length > 5) msg += `  _...and ${progs.length - 5} more_\n`
        msg += '\n'
      })
      msg += `\n📊 Browse all CS programs at [/programs](/programs) and filter by country!`
      return msg
    }
  },
  {
    keywords: ['data science', 'ai', 'ml', 'machine learning', 'artificial intelligence', 'deep learning'],
    response: () => {
      const dsPrograms = programs.filter(p => p.name.toLowerCase().includes('data science') || p.name.toLowerCase().includes('ai'))
      let msg = `**Data Science & AI** programs (${dsPrograms.length} found):\n\n`
      dsPrograms.slice(0, 10).forEach(p => {
        msg += `• **${p.university}** (${p.flag}) — ${p.name}, ${p.degree}\n  Avg Package: **${p.placementStats.avgPackage}** | Fees: ${p.fees.usdEquiv}\n\n`
      })
      const mlAlumni = alumni.filter(a => a.expertise.some(e => /ml|ai|machine learning|data science/i.test(e)))
      if (mlAlumni.length > 0) {
        msg += `**Alumni in AI/ML:**\n`
        mlAlumni.slice(0, 5).forEach(a => { msg += `- **${a.name}** — ${a.currentRole} at ${a.company}\n` })
        msg += `\n💡 [Talk to ${mlAlumni[0].name}](/alumni/${mlAlumni[0].id}) about AI/ML careers!`
      }
      return msg
    }
  },
  {
    keywords: ['electrical', 'electronics', 'ece', 'hardware', 'vlsi', 'circuit'],
    response: () => {
      const eePrograms = programs.filter(p => /electrical|electronics/i.test(p.name))
      let msg = `**Electrical & Electronics Engineering** programs (${eePrograms.length} found):\n\n`
      eePrograms.slice(0, 10).forEach(p => {
        msg += `• **${p.university}** (${p.flag}) — ${p.name}, ${p.degree}\n  Avg Package: **${p.placementStats.avgPackage}** | Placement: ${p.placementStats.placementRate}\n\n`
      })
      return msg
    }
  },
  {
    keywords: ['mechanical', 'mech', 'automotive', 'manufacturing'],
    response: () => {
      const mePrograms = programs.filter(p => /mechanical/i.test(p.name))
      let msg = `**Mechanical Engineering** programs (${mePrograms.length} found):\n\n`
      mePrograms.slice(0, 10).forEach(p => {
        msg += `• **${p.university}** (${p.flag}) — ${p.degree}\n  Avg Package: **${p.placementStats.avgPackage}**\n\n`
      })
      return msg
    }
  },
  {
    keywords: ['placement', 'package', 'salary', 'job', 'recruiter', 'hired', 'career'],
    response: () => {
      const top = programs.sort((a, b) => {
        const aNum = parseFloat(a.placementStats.avgPackage.replace(/[^0-9.]/g, ''))
        const bNum = parseFloat(b.placementStats.avgPackage.replace(/[^0-9.]/g, ''))
        return bNum - aNum
      }).slice(0, 10)
      let msg = `**Top 10 Programs by Average Package:**\n\n`
      top.forEach((p, i) => {
        msg += `${i + 1}. **${p.university}** (${p.flag}) — ${p.name}\n   Avg: **${p.placementStats.avgPackage}** | Highest: ${p.placementStats.highestPackage} | Rate: ${p.placementStats.placementRate}\n\n`
      })
      msg += `\n📊 Try our [Compare Programs](/compare) page for detailed side-by-side!`
      return msg
    }
  },
  {
    keywords: ['fees', 'cost', 'afford', 'money', 'budget', 'expensive', 'cheap', 'roi', 'worth', 'tuition'],
    response: () => {
      const cheap = programs.filter(p => p.fees.total < 10000).sort((a, b) => a.fees.total - b.fees.total).slice(0, 5)
      let msg = `**Best Value Programs (Lowest Fees):**\n\n`
      cheap.forEach(p => {
        msg += `• **${p.university}** (${p.flag}) — ${p.name}\n  Fees: **${p.fees.usdEquiv}** | Avg Package: ${p.placementStats.avgPackage}\n\n`
      })
      msg += `\n💡 **Pro tip:** Germany (TU Munich, RWTH, TU Berlin) has near-zero tuition (~$1K/year), and ETH Zurich is ~$730/year!`
      return msg
    }
  },
  {
    keywords: ['compare', 'vs', 'versus', 'better', 'difference', 'which is best', 'choose', 'pick', 'decide', 'top', 'best', 'rank'],
    response: () => {
      const top = topPrograms(8)
      let msg = `**Top Programs on AlumBridge:**\n\n`
      top.forEach((p, i) => {
        msg += `${i + 1}. **${p.university}** (${p.flag}) — ${p.name}, ${p.degree}\n   Avg Package: **${p.placementStats.avgPackage}** | Fees: ${p.fees.usdEquiv}\n\n`
      })
      msg += `\n📊 Use [Compare Programs](/compare) for detailed side-by-side analysis!`
      return msg
    }
  },
  {
    keywords: ['abroad', 'international', 'foreign', 'overseas', 'study abroad', 'outside'],
    response: () => {
      let msg = `**International Programs (${countries.length} countries, ${programs.filter(p => p.country !== 'India').length} programs):**\n\n`
      countries.filter(c => c !== 'India').forEach(c => {
        const progs = byCountry[c]
        if (progs) {
          msg += `${progs[0].flag} **${c}** (${progs.length} programs):\n`
          progs.slice(0, 3).forEach(p => { msg += `  • ${p.university} — ${p.name}, ${p.placementStats.avgPackage}\n` })
          msg += '\n'
        }
      })
      return msg
    }
  },
  {
    keywords: ['research', 'phd', 'paper', 'publication', 'masters', 'higher studies', 'grad school'],
    response: () => {
      const researchPrograms = programs.filter(p => p.researchOpportunities.length >= 3).slice(0, 8)
      let msg = `**Best Programs for Research:**\n\n`
      researchPrograms.forEach(p => {
        msg += `• **${p.university}** (${p.flag}) — ${p.name}\n  Labs: ${p.researchOpportunities.slice(0, 2).join(', ')}\n\n`
      })
      return msg
    }
  },
  {
    keywords: ['campus', 'life', 'hostel', 'culture', 'fest', 'club', 'fun', 'experience'],
    response: () => {
      const picks = topPrograms(6)
      let msg = `**Campus Life Across Top Programs:**\n\n`
      picks.forEach(p => {
        msg += `${p.flag} **${p.university}** — ${p.country}\n`
        msg += `  ${p.researchOpportunities.slice(0, 2).join(', ')}\n\n`
      })
      return msg
    }
  },
  {
    keywords: ['alumni', 'talk', 'speak', 'call', 'mentor', 'connect', 'graduate'],
    response: () => {
      const random = [...alumni].sort(() => Math.random() - 0.5).slice(0, 6)
      let msg = `**Verified Alumni You Can Connect With** (${alumni.length} total):\n\n`
      random.forEach(a => {
        msg += `**${a.name}** — ${a.currentRole} at ${a.company}\nExpertise: ${a.expertise.join(', ')}\n[View profile →](/alumni/${a.id})\n\n`
      })
      msg += `\n📋 Browse all alumni at [/alumni](/alumni)!`
      return msg
    }
  },
  {
    keywords: ['startup', 'entrepreneur', 'founder', 'venture', 'yc', 'build company'],
    response: () => {
      const founders = alumni.filter(a => a.expertise.some(e => /startup|entrepreneur/i.test(e)))
      let msg = `**Alumni Entrepreneurs & Founders** (${founders.length} found):\n\n`
      founders.slice(0, 6).forEach(a => {
        msg += `**${a.name}** — ${a.currentRole} at ${a.company}\n[View profile →](/alumni/${a.id})\n\n`
      })
      return msg
    }
  },
]

// Dynamic university handler — matches any university name
function matchUniversity(msg) {
  const lower = msg.toLowerCase()
  for (const uni of universities) {
    if (lower.includes(uni.toLowerCase()) || lower.includes(uni.toLowerCase().replace(/university of /, ''))) {
      const progs = byUniversity[uni]
      if (!progs || !progs.length) return null
      let response = `**${uni}** (${progs[0].flag} ${progs[0].country}) — ${progs.length} programs on AlumBridge:\n\n`
      progs.forEach(p => {
        response += `📚 **${p.name}** (${p.degree}, ${p.duration})\n`
        response += `   Avg Package: **${p.placementStats.avgPackage}** | Highest: ${p.placementStats.highestPackage}\n`
        response += `   Fees: ${p.fees.usdEquiv} | Placement: ${p.placementStats.placementRate}\n`
        response += `   Tests: ${p.testsRequired.join(', ')}\n\n`
      })
      const uniAlumni = alumni.filter(a => progs.some(p => p.id === a.programId))
      if (uniAlumni.length) {
        response += `**Alumni from ${uni}:**\n`
        uniAlumni.slice(0, 4).forEach(a => {
          response += `• **${a.name}** — ${a.currentRole} at ${a.company} [→](/alumni/${a.id})\n`
        })
      }
      return response
    }
  }
  return null
}

// Dynamic country handler
function matchCountry(msg) {
  const lower = msg.toLowerCase()
  const countryMap = {
    'india': 'India', 'usa': 'United States', 'us': 'United States', 'america': 'United States', 'united states': 'United States',
    'uk': 'United Kingdom', 'england': 'United Kingdom', 'britain': 'United Kingdom', 'united kingdom': 'United Kingdom',
    'switzerland': 'Switzerland', 'swiss': 'Switzerland',
    'singapore': 'Singapore',
    'canada': 'Canada', 'canadian': 'Canada',
    'germany': 'Germany', 'german': 'Germany',
    'netherlands': 'Netherlands', 'dutch': 'Netherlands', 'holland': 'Netherlands',
    'australia': 'Australia', 'aussie': 'Australia',
    'japan': 'Japan', 'japanese': 'Japan',
    'korea': 'South Korea', 'south korea': 'South Korea', 'korean': 'South Korea',
    'france': 'France', 'french': 'France',
    'sweden': 'Sweden', 'swedish': 'Sweden',
    'hong kong': 'Hong Kong',
    'israel': 'Israel',
    'china': 'China', 'chinese': 'China',
  }
  for (const [key, country] of Object.entries(countryMap)) {
    if (lower.includes(key)) {
      const progs = byCountry[country]
      if (!progs || !progs.length) return null
      let response = `**${progs[0].flag} Programs in ${country}** (${progs.length} programs across ${new Set(progs.map(p => p.university)).size} universities):\n\n`
      const byUni = {}
      progs.forEach(p => { (byUni[p.university] = byUni[p.university] || []).push(p) })
      Object.entries(byUni).forEach(([uni, ps]) => {
        response += `**${uni}** (${ps.length} programs):\n`
        ps.slice(0, 4).forEach(p => {
          response += `  • ${p.name} — ${p.degree}, Avg ${p.placementStats.avgPackage}\n`
        })
        response += '\n'
      })
      return response
    }
  }
  return null
}

export function getChatbotResponse(userMessage) {
  const msg = userMessage.toLowerCase().trim()

  // 1. Check static knowledge base
  const scored = knowledgeBase.map(entry => {
    let score = 0
    for (const keyword of entry.keywords) {
      if (msg.includes(keyword)) score += keyword.length
    }
    return { entry, score }
  })
  scored.sort((a, b) => b.score - a.score)
  if (scored[0].score > 0) return scored[0].entry.response()

  // 2. Try matching a university name
  const uniMatch = matchUniversity(msg)
  if (uniMatch) return uniMatch

  // 3. Try matching a country
  const countryMatch = matchCountry(msg)
  if (countryMatch) return countryMatch

  // 4. Try matching alumni
  if (msg.includes('alumni') || msg.includes('talk') || msg.includes('speak') || msg.includes('call')) {
    const random = [...alumni].sort(() => Math.random() - 0.5).slice(0, 4)
    return `Here are some verified alumni:\n\n` +
      random.map(a => `**${a.name}** — ${a.currentRole} at ${a.company}\nExpertise: ${a.expertise.join(', ')}\n[View profile →](/alumni/${a.id})`).join('\n\n')
  }

  // 5. Fallback
  const defaults = [
    `I can help with **${programs.length} programs** from **${countries.length} countries** and **${alumni.length} alumni** insights!\n\nTry asking:\n• "Show me programs in Germany"\n• "Tell me about Stanford"\n• "Which has best placements?"\n• "Cheapest programs?"\n• "AI/ML programs?"`,
    `Not sure about that yet, but I know about:\n📊 ${programs.length} programs across ${universities.length} universities\n💼 Placement stats & career outcomes\n📝 Entrance exam requirements\n💰 Fees & ROI analysis\n\nWhat would you like to explore?`,
  ]
  return defaults[Math.floor(Math.random() * defaults.length)]
}

export function getQuickSuggestions() {
  return [
    "Which college has the best placements?",
    "Show me CS programs in Germany",
    "Tell me about Stanford",
    "Best program for AI/ML?",
    "Cheapest programs?",
    "Programs in Canada",
  ]
}
