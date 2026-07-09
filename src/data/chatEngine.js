import { alumni } from '../data/alumni'
import { programs } from '../data/programs'

const knowledgeBase = [
  {
    keywords: ['cse', 'computer science', 'cs', 'coding', 'software'],
    response: () => {
      let msg = "**Computer Science** programs on AlumBridge span 6 countries:\n\n"
      msg += "🇮🇳 **India:**\n"
      msg += "1. **IIT Delhi** — B.Tech, Avg 22 LPA, Top 100 AIR\n"
      msg += "2. **BITS Pilani** — B.E., Avg 16 LPA, BITSAT 350+\n"
      msg += "3. **NIT Trichy** — B.Tech, Avg 12 LPA, JEE Main 98+\n\n"
      msg += "🌍 **International:**\n"
      msg += "4. **MIT** (USA) — B.S., Avg $150K, 4% acceptance\n"
      msg += "5. **Oxford** (UK) — B.A., Avg £65K, MAT + Interview\n"
      msg += "6. **ETH Zurich** (Switzerland) — B.Sc., Avg CHF 105K, ~$730/yr tuition!\n"
      msg += "7. **NUS** (Singapore) — B.Comp., Avg S$72K\n"
      msg += "8. **U of Toronto** (Canada) — B.Sc., Avg C$85K\n\n"
      const reviews = alumni.filter(a => a.review && ['cse-iit-delhi', 'cs-mit', 'cs-oxford', 'cs-eth-zurich', 'cs-nus', 'cs-toronto'].includes(a.programId)).slice(0, 3)
      if (reviews.length) {
        msg += "**What alumni say:**\n"
        reviews.forEach(r => { msg += `> "${r.review.text}" — *${r.name}, ${r.company}*\n\n` })
      }
      msg += "\nWant me to compare these, or tell you more about a specific one?"
      return msg
    }
  },
  {
    keywords: ['ece', 'electrical', 'electronics', 'hardware', 'vlsi', 'circuit'],
    response: () => {
      const eceAlumni = alumni.filter(a => a.programId === 'ece-iit-delhi')
      let msg = "**ECE at IIT Delhi** is a top program for hardware and communications:\n\n"
      msg += "- Avg Package: **18 LPA** | Highest: **1.2 Crore**\n"
      msg += "- Placement Rate: **92%**\n"
      msg += "- Cutoff: JEE Main 99.5+ percentile, JEE Advanced Top 500 AIR\n"
      msg += "- Top recruiters: Qualcomm, Texas Instruments, Intel, Samsung, Nvidia\n\n"
      msg += "**Alumni insights:**\n"
      eceAlumni.filter(a => a.review).forEach(a => { msg += `> "${a.review.text}" — *${a.name}, ${a.company}*\n\n` })
      return msg
    }
  },
  {
    keywords: ['iit delhi', 'iitd', 'iit'],
    response: () => {
      let msg = "**IIT Delhi** is one of India's premier engineering institutes:\n\n"
      msg += "📊 **Programs available:**\n"
      msg += "- **CSE** — Avg 22 LPA, Top 100 AIR needed\n"
      msg += "- **ECE** — Avg 18 LPA, Top 500 AIR needed\n\n"
      msg += "💰 **Fees:** ₹2.25L/year (₹9L total)\n"
      msg += "📝 **Tests:** JEE Main + JEE Advanced\n\n"
      const iitAlumni = alumni.filter(a => a.programId.startsWith('cse-iit') || a.programId.startsWith('ece-iit'))
      msg += "**What IIT Delhi alumni say:**\n"
      iitAlumni.filter(a => a.review).slice(0, 3).forEach(a => { msg += `> "${a.review.text}" — *${a.name}, Class of ${a.graduationYear}*\n\n` })
      return msg
    }
  },
  {
    keywords: ['bits', 'pilani', 'bitsat'],
    response: () => {
      let msg = "**BITS Pilani** is known for its flexible curriculum and industry integration:\n\n"
      msg += "📊 **CS Program:** B.E., 4 years\n"
      msg += "- Avg Package: **16 LPA** | Highest: **60 LPA**\n"
      msg += "- Placement Rate: **90%**\n"
      msg += "- Fees: ₹5.7L/year (₹22.8L total)\n"
      msg += "- **Test:** BITSAT (350+ for CS)\n\n"
      msg += "**Key advantage:** Practice School program gives real industry experience before graduation.\n\n"
      const bitsAlumni = alumni.filter(a => a.programId === 'cse-bits-pilani')
      msg += "**Alumni reviews:**\n"
      bitsAlumni.filter(a => a.review).forEach(a => { msg += `> "${a.review.text}" — *${a.name}, ${a.company}*\n\n` })
      return msg
    }
  },
  {
    keywords: ['nit', 'trichy', 'nitt', 'national institute'],
    response: () => {
      let msg = "**NIT Trichy** offers the best ROI among top engineering colleges:\n\n"
      msg += "📊 **CSE Program:** B.Tech, 4 years\n"
      msg += "- Avg Package: **12 LPA** | Highest: **45 LPA**\n"
      msg += "- Placement Rate: **88%**\n"
      msg += "- Fees: ₹1.5L/year (₹6L total) — **lowest among top programs!**\n"
      msg += "- **Test:** JEE Main (98-99.5 percentile)\n\n"
      const nitAlumni = alumni.filter(a => a.programId === 'cse-nit-trichy')
      msg += "**Alumni reviews:**\n"
      nitAlumni.filter(a => a.review).forEach(a => { msg += `> "${a.review.text}" — *${a.name}, ${a.company}*\n\n` })
      return msg
    }
  },
  // International universities
  {
    keywords: ['mit', 'massachusetts', 'cambridge'],
    response: () => {
      let msg = "**MIT (EECS)** — the world's #1 CS program:\n\n"
      msg += "📊 B.S. in Computer Science, 4 years\n"
      msg += "- Avg Package: **$150K** | Highest: **$500K+**\n"
      msg += "- Placement Rate: **99%**\n"
      msg += "- Fees: ~$58K/year (but financial aid can cover 100%)\n"
      msg += "- Acceptance rate: **~4%** (extremely competitive)\n"
      msg += "- Tests: SAT/ACT (optional), TOEFL/IELTS for intl\n\n"
      msg += "🔬 **Research goldmine:** UROP, CSAIL, MIT Media Lab, Lincoln Laboratory\n\n"
      const mitAlumni = alumni.filter(a => a.programId === 'cs-mit')
      msg += "**What MIT alumni say:**\n"
      mitAlumni.filter(a => a.review).forEach(a => { msg += `> "${a.review.text}" — *${a.name}, ${a.company}*\n\n` })
      return msg
    }
  },
  {
    keywords: ['oxford', 'uk', 'england', 'british'],
    response: () => {
      let msg = "**University of Oxford — Computer Science:**\n\n"
      msg += "📊 B.A. (M.A.) in Computer Science, 3-4 years\n"
      msg += "- Avg Package: **£65K** | Highest: **£200K+**\n"
      msg += "- Placement Rate: **97%**\n"
      msg += "- Fees: ~£35K/year for international students\n"
      msg += "- Acceptance rate: **~8%**\n"
      msg += "- Tests: **MAT (Maths Admissions Test)** + Interview\n\n"
      msg += "✨ **Unique:** Tutorial system — weekly 1-on-1s with world-leading researchers!\n\n"
      const oxAlumni = alumni.filter(a => a.programId === 'cs-oxford')
      msg += "**What Oxford alumni say:**\n"
      oxAlumni.filter(a => a.review).forEach(a => { msg += `> "${a.review.text}" — *${a.name}, ${a.company}*\n\n` })
      return msg
    }
  },
  {
    keywords: ['eth', 'zurich', 'swiss', 'switzerland', 'europe'],
    response: () => {
      let msg = "**ETH Zurich — Computer Science:**\n\n"
      msg += "📊 B.Sc. in Computer Science, 3 years\n"
      msg += "- Avg Package: **CHF 105K** | Highest: **CHF 250K+**\n"
      msg += "- Placement Rate: **96%**\n"
      msg += "- Fees: **~CHF 730/year (~$2,500 total!)** — absurdly cheap!\n"
      msg += "- Entrance exam pass rate: ~30%\n\n"
      msg += "🏔️ **Highlights:** Europe's #1 CS department, Google Zurich next door, stunning city\n\n"
      const ethAlumni = alumni.filter(a => a.programId === 'cs-eth-zurich')
      msg += "**What ETH alumni say:**\n"
      ethAlumni.filter(a => a.review).forEach(a => { msg += `> "${a.review.text}" — *${a.name}, ${a.company}*\n\n` })
      return msg
    }
  },
  {
    keywords: ['nus', 'singapore', 'national university'],
    response: () => {
      let msg = "**NUS (National University of Singapore) — Computer Science:**\n\n"
      msg += "📊 B.Comp. in Computer Science, 4 years\n"
      msg += "- Avg Package: **S$72K** | Highest: **S$200K+**\n"
      msg += "- Placement Rate: **94%**\n"
      msg += "- Fees: ~S$18.6K/year (with MOE tuition grant)\n"
      msg += "- Top recruiters: Google, Sea Group, Grab, Shopee\n\n"
      msg += "🌏 **Gateway to SE Asia:** Singapore work visa pathway, booming tech scene\n\n"
      const nusAlumni = alumni.filter(a => a.programId === 'cs-nus')
      msg += "**What NUS alumni say:**\n"
      nusAlumni.filter(a => a.review).forEach(a => { msg += `> "${a.review.text}" — *${a.name}, ${a.company}*\n\n` })
      return msg
    }
  },
  {
    keywords: ['toronto', 'canada', 'uoft', 'canadian', 'pr'],
    response: () => {
      let msg = "**University of Toronto — Computer Science:**\n\n"
      msg += "📊 B.Sc. in Computer Science, 4 years\n"
      msg += "- Avg Package: **C$85K** | Highest: **C$250K+**\n"
      msg += "- Placement Rate: **93%**\n"
      msg += "- Fees: ~C$61.7K/year (international)\n"
      msg += "- Top recruiters: Google, Shopify, Amazon, Wealthsimple\n\n"
      msg += "🍁 **Key perks:** Birthplace of deep learning (Hinton's home), PGWP pathway to Canadian PR\n\n"
      const uoftAlumni = alumni.filter(a => a.programId === 'cs-toronto')
      msg += "**What UofT alumni say:**\n"
      uoftAlumni.filter(a => a.review).forEach(a => { msg += `> "${a.review.text}" — *${a.name}, ${a.company}*\n\n` })
      return msg
    }
  },
  {
    keywords: ['abroad', 'international', 'foreign', 'overseas', 'outside india', 'study abroad'],
    response: () => {
      let msg = "**International Programs on AlumBridge:**\n\n"
      msg += "🇺🇸 **MIT** (USA) — World #1 CS, $150K avg package, 4% acceptance\n"
      msg += "🇬🇧 **Oxford** (UK) — Tutorial system, £65K avg, MAT required\n"
      msg += "🇨🇭 **ETH Zurich** (Switzerland) — Europe's best, only $730/yr tuition!\n"
      msg += "🇸🇬 **NUS** (Singapore) — SE Asia gateway, S$72K avg, great value\n"
      msg += "🇨🇦 **U of Toronto** (Canada) — AI hub, C$85K avg, PR pathway\n\n"
      msg += "💡 **Key considerations for studying abroad:**\n"
      msg += "- Financial aid available at MIT (need-blind for internationals)\n"
      msg += "- ETH Zurich is incredibly affordable but very rigorous\n"
      msg += "- NUS offers MOE tuition grants cutting fees by 60%\n"
      msg += "- UofT gives PGWP (Post-Graduation Work Permit) → Canadian PR\n\n"
      msg += "Want details on any specific university?"
      return msg
    }
  },
  // Topic-specific knowledge
  {
    keywords: ['placement', 'package', 'salary', 'job', 'recruiter', 'hired', 'hire'],
    response: () => {
      let msg = "**Placement Comparison across ALL programs:**\n\n"
      msg += "🇮🇳 **India:**\n"
      msg += "| Program | Avg Package | Highest | Rate |\n"
      msg += "|---------|------------|---------|------|\n"
      msg += "| IIT Delhi CSE | 22 LPA | 1.5 Cr | 95% |\n"
      msg += "| IIT Delhi ECE | 18 LPA | 1.2 Cr | 92% |\n"
      msg += "| BITS Pilani CS | 16 LPA | 60 LPA | 90% |\n"
      msg += "| NIT Trichy CSE | 12 LPA | 45 LPA | 88% |\n\n"
      msg += "🌍 **International:**\n"
      msg += "| Program | Avg Package | Highest | Rate |\n"
      msg += "|---------|------------|---------|------|\n"
      msg += "| MIT | $150K | $500K+ | 99% |\n"
      msg += "| Oxford | £65K | £200K+ | 97% |\n"
      msg += "| ETH Zurich | CHF 105K | CHF 250K+ | 96% |\n"
      msg += "| NUS | S$72K | S$200K+ | 94% |\n"
      msg += "| U of Toronto | C$85K | C$250K+ | 93% |\n\n"
      const placementAlumni = alumni.filter(a => a.expertise.some(e => e.toLowerCase().includes('placement') || e.toLowerCase().includes('career')))
      if (placementAlumni.length) {
        msg += "**Placement advice from alumni:**\n"
        placementAlumni.slice(0, 2).forEach(a => { if (a.review) msg += `> "${a.review.text}" — *${a.name}, ${a.company}*\n\n` })
      }
      return msg
    }
  },
  {
    keywords: ['fees', 'cost', 'afford', 'money', 'budget', 'expensive', 'cheap', 'roi', 'worth'],
    response: () => {
      let msg = "**Fee Comparison (Total, converted to USD):**\n\n"
      msg += "🇮🇳 **India:**\n"
      msg += "| Program | Total Fees | Avg Package | ROI |\n"
      msg += "|---------|-----------|-------------|-----|\n"
      msg += "| NIT Trichy | ~$7,200 | 12 LPA | **Best!** |\n"
      msg += "| IIT Delhi | ~$10,800 | 22 LPA | Great |\n"
      msg += "| BITS Pilani | ~$27,400 | 16 LPA | Moderate |\n\n"
      msg += "🌍 **International:**\n"
      msg += "| Program | Total Fees | Avg Package | ROI |\n"
      msg += "|---------|-----------|-------------|-----|\n"
      msg += "| ETH Zurich | ~$2,500 | CHF 105K | **INSANE** |\n"
      msg += "| NUS (with grant) | ~$55K | S$72K | Good |\n"
      msg += "| MIT (with aid) | $0-30K | $150K | Amazing |\n"
      msg += "| U of Toronto | ~$135K | C$85K | Moderate |\n"
      msg += "| Oxford | ~$176K | £65K | Moderate |\n\n"
      msg += "🏆 **Best Value Picks:** ETH Zurich (cheapest + top salaries) and NIT Trichy (lowest INR fees)"
      return msg
    }
  },
  {
    keywords: ['jee', 'entrance', 'exam', 'test', 'cutoff', 'rank', 'percentile', 'bitsat', 'sat', 'mat', 'act'],
    response: () => {
      let msg = "**Entrance Exam Requirements & Cutoffs:**\n\n"
      msg += "🇮🇳 **India:**\n"
      msg += "| Program | Tests | Cutoff |\n"
      msg += "|---------|-------|--------|\n"
      msg += "| IIT Delhi CSE | JEE Main + Advanced | 99.9+ percentile, Top 100 AIR |\n"
      msg += "| IIT Delhi ECE | JEE Main + Advanced | 99.5+ percentile, Top 500 AIR |\n"
      msg += "| BITS Pilani CS | BITSAT | 350-380 (out of 450) |\n"
      msg += "| NIT Trichy CSE | JEE Main | 98-99.5 percentile |\n\n"
      msg += "🌍 **International:**\n"
      msg += "| Program | Tests | Cutoff |\n"
      msg += "|---------|-------|--------|\n"
      msg += "| MIT | SAT/ACT (optional) | SAT 1520-1580, ACT 35-36 |\n"
      msg += "| Oxford | MAT + Interview | MAT 70+, A*AA A-levels |\n"
      msg += "| ETH Zurich | Entrance exam | 60%+ in Math & Physics |\n"
      msg += "| NUS | SAT/IELTS | SAT 1450+, AAA-A*A*A* |\n"
      msg += "| U of Toronto | IELTS/TOEFL | Grade 12: 90-95%+ |\n"
      return msg
    }
  },
  {
    keywords: ['research', 'phd', 'paper', 'publication', 'stanford', 'masters', 'higher studies'],
    response: () => {
      let msg = "**Research Opportunities by Program:**\n\n"
      msg += "🏆 **Top for Research:**\n\n"
      msg += "**MIT** — UROP, CSAIL (world's top AI lab), Media Lab, published as undergrad is normal\n"
      msg += "**Oxford** — Tutorial system = 1-on-1 with researchers, Oxford-Man Institute\n"
      msg += "**ETH Zurich** — Robotics & AI Labs, spin-off incubator\n"
      msg += "**IIT Delhi** — URA (Undergraduate Research Award), AI & ML Lab\n\n"
      const karthik = alumni.find(a => a.id === 'a4')
      const jason = alumni.find(a => a.id === 'a15')
      if (karthik || jason) {
        msg += "**Alumni in research:**\n"
        if (jason) msg += `> "${jason.review.text}" — *${jason.name}, ${jason.company}*\n\n`
        if (karthik) msg += `> "${karthik.review.text}" — *${karthik.name}, ${karthik.company}*\n\n`
      }
      return msg
    }
  },
  {
    keywords: ['startup', 'entrepreneur', 'founder', 'build', 'venture', 'yc'],
    response: () => {
      let msg = "**Best programs for aspiring entrepreneurs:**\n\n"
      msg += "1. **IIT Delhi** — Strong alumni network for co-founders & investors\n"
      msg += "2. **BITS Pilani** — Entrepreneurship cell, freedom to experiment\n"
      msg += "3. **MIT** — Media Lab, $100K competition, Silicon Valley pipeline\n"
      msg += "4. **Oxford** — Oxford Entrepreneurs society\n\n"
      const startupAlumni = alumni.filter(a => a.expertise.some(e => e.toLowerCase().includes('startup') || e.toLowerCase().includes('entrepreneur')))
      if (startupAlumni.length) {
        msg += "**From founders themselves:**\n"
        startupAlumni.forEach(a => { if (a.review) msg += `> "${a.review.text}" — *${a.name}, ${a.company}*\n\n` })
      }
      return msg
    }
  },
  {
    keywords: ['campus', 'life', 'hostel', 'culture', 'fest', 'club', 'fun', 'experience'],
    response: () => {
      let msg = "**Campus Life Highlights:**\n\n"
      msg += "🇮🇳 **IIT Delhi** — Heart of Delhi, vibrant tech clubs, hackathons, cultural fests\n"
      msg += "🇮🇳 **BITS Pilani** — Desert campus, zero-attendance, amazing fests (Oasis, APOGEE)\n"
      msg += "🇮🇳 **NIT Trichy** — Beautiful green campus, great hostel life, Pragyan fest\n\n"
      msg += "🌍 **International:**\n"
      msg += "🇺🇸 **MIT** — HackMIT, quirky traditions, intense but fun\n"
      msg += "🇬🇧 **Oxford** — College system, punting on the river, 800 years of history\n"
      msg += "🇨🇭 **ETH Zurich** — Stunning Alps backdrop, Swiss precision, student bars\n"
      msg += "🇸🇬 **NUS** — Modern campus, tropical weather, UTown is amazing\n"
      msg += "🇨🇦 **U of Toronto** — Vibrant city, diverse food scene, Robarts library\n"
      return msg
    }
  },
  {
    keywords: ['compare', 'vs', 'versus', 'better', 'difference', 'which is best', 'choose', 'pick', 'decide'],
    response: () => {
      let msg = "**Quick Comparison Guide:**\n\n"
      msg += "🇮🇳 **India:**\n"
      msg += "🏆 **IIT Delhi CSE** — Highest packages, top peer group, Top 100 AIR needed\n"
      msg += "🏆 **NIT Trichy** — Best ROI, lowest fees, strong placements\n"
      msg += "🏆 **BITS Pilani** — Flexibility, industry exposure, BITSAT based\n\n"
      msg += "🌍 **International:**\n"
      msg += "🏆 **MIT** — World's #1, if you can get in (4%), it's unmatched\n"
      msg += "🏆 **ETH Zurich** — Europe's best, cheapest tuition, rigorous\n"
      msg += "🏆 **Oxford** — Tutorial system, theoretical depth, 800-year prestige\n"
      msg += "🏆 **NUS** — SE Asia gateway, great value with grants\n"
      msg += "🏆 **U of Toronto** — AI capital, Canadian PR pathway\n\n"
      msg += "📊 Try our [Compare Programs](/compare) page for a detailed side-by-side!"
      return msg
    }
  },
  {
    keywords: ['ml', 'machine learning', 'ai', 'artificial intelligence', 'data science', 'deep learning'],
    response: () => {
      const mlAlumni = alumni.filter(a => a.expertise.some(e => e.toLowerCase().includes('ml') || e.toLowerCase().includes('ai') || e.toLowerCase().includes('data science')))
      let msg = "**AI/ML & Data Science — Best Programs:**\n\n"
      msg += "🥇 **MIT** — CSAIL, world's top AI research lab\n"
      msg += "🥈 **U of Toronto** — Vector Institute, Geoffrey Hinton's legacy, birthplace of deep learning\n"
      msg += "🥉 **Oxford** — Oxford-Man Institute, DeepMind connections\n"
      msg += "4️⃣ **ETH Zurich** — Robotics & AI Labs\n"
      msg += "5️⃣ **IIT Delhi** — AI & ML Lab, URA program\n\n"
      if (mlAlumni.length) {
        msg += "**Alumni working in AI/ML:**\n"
        mlAlumni.slice(0, 5).forEach(a => { msg += `- **${a.name}** — ${a.currentRole} at ${a.company}\n` })
        msg += `\n💡 [Talk to ${mlAlumni[0].name}](/alumni/${mlAlumni[0].id}) about AI/ML careers!`
      }
      return msg
    }
  },
  {
    keywords: ['hello', 'hi', 'hey', 'help', 'start', 'what can you'],
    response: () => {
      let msg = "Hey there! 👋 Welcome to **AlumBridge AI**!\n\n"
      msg += "I'm trained on insights from **25+ verified alumni** across **8 programs in 6 countries**. I'll give you honest, data-backed answers — no marketing fluff.\n\n"
      msg += "**I can help with:**\n\n"
      msg += "📊 **Compare programs** — India + international\n"
      msg += "🎓 **Specific universities** — MIT, Oxford, ETH, IITs, BITS, NUS, UofT\n"
      msg += "💼 **Placements & careers** — packages, recruiters, outcomes\n"
      msg += "📝 **Entrance exams** — JEE, SAT, MAT, BITSAT cutoffs\n"
      msg += "💰 **Fees & ROI** — which programs give the best value\n"
      msg += "🏫 **Campus life** — culture, hostels, city vibes\n"
      msg += "🚀 **Research & startups** — labs, publications, founder stories\n\n"
      msg += "Just ask anything! For example:\n"
      msg += '- "Which program has the best placements?"\n'
      msg += '- "Tell me about MIT"\n'
      msg += '- "Compare ETH Zurich vs IIT Delhi"\n'
      msg += '- "Is NUS good for international students?"'
      return msg
    }
  },
]

const defaultResponses = [
  "Interesting question! I might not have specific data on that, but I can help with:\n\n• **Program details** — fees, eligibility, placements across 6 countries\n• **Comparisons** — India + international programs\n• **Alumni insights** — from 25+ verified graduates\n• **Entrance exams** — JEE, SAT, MAT, BITSAT\n• **Career paths** — research, startups, placements\n\nTry asking \"Which international program is best?\" or \"Compare MIT vs IIT Delhi\"",
  "I'm not sure about that specific topic yet, but here's what I know well:\n\n📊 8 programs from 6 countries\n💼 Placement stats & career outcomes\n📝 Entrance exam requirements & cutoffs\n🏫 Campus life across India, US, UK, Europe & Asia\n💰 Fees & ROI analysis\n\nWhat would you like to explore?",
]

export function getChatbotResponse(userMessage) {
  const msg = userMessage.toLowerCase().trim()
  const scored = knowledgeBase.map(entry => {
    let score = 0
    for (const keyword of entry.keywords) {
      if (msg.includes(keyword)) score += keyword.length
    }
    return { entry, score }
  })
  scored.sort((a, b) => b.score - a.score)
  if (scored[0].score > 0) return scored[0].entry.response(scored)
  if (msg.includes('best') || msg.includes('top') || msg.includes('recommend')) return knowledgeBase.find(e => e.keywords.includes('compare')).response()
  if (msg.includes('alumni') || msg.includes('talk') || msg.includes('speak') || msg.includes('call')) {
    const randomAlumni = alumni.sort(() => Math.random() - 0.5).slice(0, 4)
    return `Here are some verified alumni you can connect with:\n\n` +
      randomAlumni.map(a => `**${a.name}** — ${a.currentRole} at ${a.company}\nExpertise: ${a.expertise.join(', ')}\n[View profile →](/alumni/${a.id})`).join('\n\n') +
      `\n\nYou can ask them questions or book a 15-min call!`
  }
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
}

export function getQuickSuggestions() {
  return [
    "Which college has the best placements?",
    "Tell me about MIT",
    "Compare IIT Delhi vs ETH Zurich",
    "Best program for AI/ML?",
    "Which has the lowest fees?",
    "How do I study abroad?",
  ]
}
