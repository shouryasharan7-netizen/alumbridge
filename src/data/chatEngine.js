import { alumni } from '../data/alumni'
import { programs } from '../data/programs'

// Knowledge base built from alumni data
const knowledgeBase = [
  // Program-specific knowledge
  {
    keywords: ['cse', 'computer science', 'cs', 'coding', 'software'],
    programFilter: ['cse-iit-delhi', 'cse-bits-pilani', 'cse-nit-trichy'],
    response: (matches) => {
      const alumniMatches = alumni.filter(a => 
        ['cse-iit-delhi', 'cse-bits-pilani', 'cse-nit-trichy'].includes(a.programId)
      )
      const reviews = alumniMatches.filter(a => a.review).slice(0, 3)
      let msg = "**Computer Science** is offered at 3 institutes on AlumBridge:\n\n"
      msg += "1. **IIT Delhi** - B.Tech, Avg package 22 LPA, Cutoff: Top 100 AIR\n"
      msg += "2. **BITS Pilani** - B.E., Avg package 16 LPA, BITSAT 350+\n"
      msg += "3. **NIT Trichy** - B.Tech, Avg package 12 LPA, JEE Main 98-99.5 percentile\n\n"
      if (reviews.length) {
        msg += "**What alumni say:**\n"
        reviews.forEach(r => {
          msg += `> "${r.review.text}" — *${r.name}, ${r.company}*\n\n`
        })
      }
      msg += "\nWant me to compare these programs, or tell you more about a specific one?"
      return msg
    }
  },
  {
    keywords: ['ece', 'electrical', 'electronics', 'hardware', 'vlsi', 'circuit'],
    programFilter: ['ece-iit-delhi'],
    response: () => {
      const eceAlumni = alumni.filter(a => a.programId === 'ece-iit-delhi')
      let msg = "**ECE at IIT Delhi** is a top program for hardware and communications:\n\n"
      msg += "- Avg Package: **18 LPA** | Highest: **1.2 Crore**\n"
      msg += "- Placement Rate: **92%**\n"
      msg += "- Cutoff: JEE Main 99.5+ percentile, JEE Advanced Top 500 AIR\n"
      msg += "- Top recruiters: Qualcomm, Texas Instruments, Intel, Samsung, Nvidia\n\n"
      msg += "**Alumni insights:**\n"
      eceAlumni.filter(a => a.review).forEach(a => {
        msg += `> "${a.review.text}" — *${a.name}, ${a.company}*\n\n`
      })
      return msg
    }
  },
  {
    keywords: ['iit delhi', 'iitd', 'iit'],
    programFilter: ['cse-iit-delhi', 'ece-iit-delhi'],
    response: () => {
      let msg = "**IIT Delhi** is one of India's premier engineering institutes:\n\n"
      msg += "📊 **Programs available:**\n"
      msg += "- **CSE** — Avg 22 LPA, Top 100 AIR needed\n"
      msg += "- **ECE** — Avg 18 LPA, Top 500 AIR needed\n\n"
      msg += "💰 **Fees:** ₹2.25L/year (₹9L total)\n"
      msg += "📝 **Tests:** JEE Main + JEE Advanced\n\n"
      const iitAlumni = alumni.filter(a => a.programId.startsWith('cse-iit') || a.programId.startsWith('ece-iit'))
      msg += "**What IIT Delhi alumni say:**\n"
      iitAlumni.filter(a => a.review).slice(0, 3).forEach(a => {
        msg += `> "${a.review.text}" — *${a.name}, Class of ${a.graduationYear}*\n\n`
      })
      return msg
    }
  },
  {
    keywords: ['bits', 'pilani', 'bitsat'],
    programFilter: ['cse-bits-pilani'],
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
      bitsAlumni.filter(a => a.review).forEach(a => {
        msg += `> "${a.review.text}" — *${a.name}, ${a.company}*\n\n`
      })
      return msg
    }
  },
  {
    keywords: ['nit', 'trichy', 'nitt', 'national institute'],
    programFilter: ['cse-nit-trichy'],
    response: () => {
      let msg = "**NIT Trichy** offers the best ROI among top engineering colleges:\n\n"
      msg += "📊 **CSE Program:** B.Tech, 4 years\n"
      msg += "- Avg Package: **12 LPA** | Highest: **45 LPA**\n"
      msg += "- Placement Rate: **88%**\n"
      msg += "- Fees: ₹1.5L/year (₹6L total) — **lowest among top programs!**\n"
      msg += "- **Test:** JEE Main (98-99.5 percentile)\n\n"
      const nitAlumni = alumni.filter(a => a.programId === 'cse-nit-trichy')
      msg += "**Alumni reviews:**\n"
      nitAlumni.filter(a => a.review).forEach(a => {
        msg += `> "${a.review.text}" — *${a.name}, ${a.company}*\n\n`
      })
      return msg
    }
  },
  // Topic-specific knowledge
  {
    keywords: ['placement', 'package', 'salary', 'job', 'recruiter', 'hired', 'hire'],
    response: () => {
      let msg = "**Placement Comparison across programs:**\n\n"
      msg += "| Program | Avg Package | Highest | Rate |\n"
      msg += "|---------|------------|---------|------|\n"
      msg += "| IIT Delhi CSE | 22 LPA | 1.5 Cr | 95% |\n"
      msg += "| IIT Delhi ECE | 18 LPA | 1.2 Cr | 92% |\n"
      msg += "| BITS Pilani CS | 16 LPA | 60 LPA | 90% |\n"
      msg += "| NIT Trichy CSE | 12 LPA | 45 LPA | 88% |\n\n"
      const placementAlumni = alumni.filter(a => 
        a.expertise.some(e => e.toLowerCase().includes('placement') || e.toLowerCase().includes('career'))
      )
      if (placementAlumni.length) {
        msg += "**Placement advice from alumni:**\n"
        placementAlumni.slice(0, 2).forEach(a => {
          if (a.review) msg += `> "${a.review.text}" — *${a.name}, ${a.company}*\n\n`
        })
        msg += `\n💡 **Tip:** You can [book a call](/alumni/${placementAlumni[0].id}) with ${placementAlumni[0].name} to discuss placements in detail!`
      }
      return msg
    }
  },
  {
    keywords: ['fees', 'cost', 'afford', 'money', 'budget', 'expensive', 'cheap', 'roi', 'worth'],
    response: () => {
      let msg = "**Fee Comparison (Total for 4 years):**\n\n"
      msg += "| Program | Total Fees | Avg Package | ROI Ratio |\n"
      msg += "|---------|-----------|-------------|----------|\n"
      msg += "| NIT Trichy CSE | ₹6L | 12 LPA | **2x** (Best ROI) |\n"
      msg += "| IIT Delhi CSE | ₹9L | 22 LPA | 2.4x |\n"
      msg += "| IIT Delhi ECE | ₹9L | 18 LPA | 2x |\n"
      msg += "| BITS Pilani CS | ₹22.8L | 16 LPA | 0.7x |\n\n"
      msg += "🏆 **Best Value:** NIT Trichy — lowest fees with strong placements\n"
      msg += "🏆 **Highest Earning:** IIT Delhi CSE — highest avg package\n\n"
      msg += "BITS is expensive but the Practice School program and zero-attendance policy offer unique advantages."
      return msg
    }
  },
  {
    keywords: ['jee', 'entrance', 'exam', 'test', 'cutoff', 'rank', 'percentile', 'bitsat', 'main', 'advanced'],
    response: () => {
      let msg = "**Entrance Exam Requirements & Cutoffs:**\n\n"
      msg += "| Program | Tests | Cutoff |\n"
      msg += "|---------|-------|--------|\n"
      msg += "| IIT Delhi CSE | JEE Main + Advanced | 99.9+ percentile, Top 100 AIR |\n"
      msg += "| IIT Delhi ECE | JEE Main + Advanced | 99.5+ percentile, Top 500 AIR |\n"
      msg += "| BITS Pilani CS | BITSAT | 350-380 (out of 450) |\n"
      msg += "| NIT Trichy CSE | JEE Main | 98-99.5 percentile |\n\n"
      msg += "**Tips from alumni who cracked these exams:**\n\n"
      const sneha = alumni.find(a => a.id === 'a5')
      const aditya = alumni.find(a => a.id === 'a9')
      if (sneha) msg += `> "${sneha.review.text}" — *${sneha.name}*\n\n`
      if (aditya) msg += `> "${aditya.review.text}" — *${aditya.name}*\n\n`
      return msg
    }
  },
  {
    keywords: ['research', 'phd', 'paper', 'publication', 'stanford', 'masters', 'higher studies'],
    response: () => {
      let msg = "**Research Opportunities by Program:**\n\n"
      msg += "**IIT Delhi CSE:**\n"
      msg += "- Undergraduate Research Award (URA)\n"
      msg += "- AI & Machine Learning Lab\n"
      msg += "- Cybersecurity Research Center\n\n"
      msg += "**IIT Delhi ECE:**\n"
      msg += "- VLSI Design Lab\n"
      msg += "- Signal Processing Research\n"
      msg += "- 5G & Wireless Communications\n\n"
      msg += "**BITS Pilani:**\n"
      msg += "- Industry-sponsored projects\n"
      msg += "- Data Science & Analytics Lab\n\n"
      const karthik = alumni.find(a => a.id === 'a4')
      if (karthik) {
        msg += `\n**Alumni who went into research:**\n`
        msg += `> "${karthik.review.text}" — *${karthik.name}, ${karthik.company}*\n\n`
        msg += `💡 [Book a call with ${karthik.name}](/alumni/${karthik.id}) to discuss research careers!`
      }
      return msg
    }
  },
  {
    keywords: ['startup', 'entrepreneur', 'founder', 'build', 'venture', 'yc'],
    response: () => {
      let msg = "**Best programs for aspiring entrepreneurs:**\n\n"
      msg += "1. **IIT Delhi** — Strong alumni network for co-founders & investors, hackathon culture\n"
      msg += "2. **BITS Pilani** — Entrepreneurship cell, freedom to experiment, zero-attendance policy\n\n"
      const startupAlumni = alumni.filter(a => 
        a.expertise.some(e => e.toLowerCase().includes('startup') || e.toLowerCase().includes('entrepreneur'))
      )
      if (startupAlumni.length) {
        msg += "**From founders themselves:**\n"
        startupAlumni.forEach(a => {
          if (a.review) msg += `> "${a.review.text}" — *${a.name}, ${a.company}*\n\n`
        })
        msg += `\n💡 [Talk to ${startupAlumni[0].name}](/alumni/${startupAlumni[0].id}) about building a startup!`
      }
      return msg
    }
  },
  {
    keywords: ['campus', 'life', 'hostel', 'culture', 'fest', 'club', 'fun', 'experience'],
    response: () => {
      let msg = "**Campus Life Highlights:**\n\n"
      msg += "**IIT Delhi** 🏛️\n"
      msg += "- Located in the heart of Delhi (Hauz Khas)\n"
      msg += "- Vibrant tech clubs, hackathons, and cultural fests\n"
      msg += "- Strong peer group that pushes you to grow\n\n"
      msg += "**BITS Pilani** 🌵\n"
      msg += "- Desert campus with a unique vibe\n"
      msg += "- Zero-attendance policy = more freedom\n"
      msg += "- Amazing fests (Oasis, APOGEE, BOSM)\n\n"
      msg += "**NIT Trichy** 🌴\n"
      msg += "- Beautiful green campus in Tamil Nadu\n"
      msg += "- Great hostel life and peer learning culture\n"
      msg += "- Pragyan (tech fest) and NITTFEST (cultural)\n\n"
      const campusAlumni = alumni.filter(a => 
        a.expertise.some(e => e.toLowerCase().includes('campus') || e.toLowerCase().includes('culture'))
      )
      if (campusAlumni.length) {
        msg += "**What alumni say:**\n"
        campusAlumni.slice(0, 2).forEach(a => {
          if (a.review) msg += `> "${a.review.text}" — *${a.name}*\n\n`
        })
      }
      return msg
    }
  },
  {
    keywords: ['compare', 'vs', 'versus', 'better', 'difference', 'which is best', 'choose', 'pick', 'decide'],
    response: () => {
      let msg = "**Quick Comparison Guide:**\n\n"
      msg += "🏆 **Choose IIT Delhi CSE if:** You want the highest packages, top peer group, and research opportunities. Need Top 100 AIR.\n\n"
      msg += "🏆 **Choose IIT Delhi ECE if:** You love hardware, want to work at chip companies, and are okay with slightly lower but still great packages.\n\n"
      msg += "🏆 **Choose BITS Pilani if:** You value flexibility, industry exposure (Practice School), and don't mind higher fees. BITSAT based.\n\n"
      msg += "🏆 **Choose NIT Trichy if:** You want the **best ROI** — lowest fees with strong placements. Great for students who want value for money.\n\n"
      msg += "📊 Want a detailed comparison? Check our [Compare Programs](/compare) page for a full side-by-side table!"
      return msg
    }
  },
  {
    keywords: ['ml', 'machine learning', 'ai', 'artificial intelligence', 'data science', 'deep learning'],
    response: () => {
      const mlAlumni = alumni.filter(a => 
        a.expertise.some(e => e.toLowerCase().includes('ml') || e.toLowerCase().includes('ai') || e.toLowerCase().includes('data science'))
      )
      let msg = "**AI/ML & Data Science Opportunities:**\n\n"
      msg += "**IIT Delhi CSE** has a dedicated AI & Machine Learning Lab and Undergraduate Research Award.\n\n"
      msg += "**IIT Delhi ECE** offers cross-disciplinary ML for edge devices.\n\n"
      msg += "**BITS Pilani** has a Data Science & Analytics Lab.\n\n"
      if (mlAlumni.length) {
        msg += "**Alumni working in AI/ML:**\n"
        mlAlumni.forEach(a => {
          msg += `- **${a.name}** — ${a.currentRole} at ${a.company}\n`
        })
        msg += `\n💡 [Talk to ${mlAlumni[0].name}](/alumni/${mlAlumni[0].id}) about AI/ML careers!`
      }
      return msg
    }
  },
  {
    keywords: ['hello', 'hi', 'hey', 'help', 'start', 'what can you'],
    response: () => {
      let msg = "Hi there! 👋 I'm the **AlumBridge AI Assistant**, trained on insights from 14+ verified alumni across top engineering programs.\n\n"
      msg += "**I can help you with:**\n\n"
      msg += "📊 **Program comparison** — Compare fees, placements, cutoffs\n"
      msg += "🎓 **Specific programs** — IIT Delhi, BITS Pilani, NIT Trichy\n"
      msg += "💼 **Placements & careers** — Packages, recruiters, career paths\n"
      msg += "📝 **Entrance exams** — JEE, BITSAT cutoffs and prep tips\n"
      msg += "🏫 **Campus life** — Culture, hostels, fests\n"
      msg += "🚀 **Research & startups** — Opportunities and alumni stories\n"
      msg += "💰 **Fees & ROI** — Which program gives the best value\n\n"
      msg += "Just ask me anything! For example:\n"
      msg += '- "Which college has the best placements?"\n'
      msg += '- "Tell me about IIT Delhi CSE"\n'
      msg += '- "Is BITS Pilani worth the fees?"\n'
      msg += '- "What cutoff do I need for IIT Delhi?"'
      return msg
    }
  },
]

// Default responses when no match found
const defaultResponses = [
  "That's an interesting question! While I don't have specific data on that, I can help you with:\n\n• **Program details** (fees, eligibility, placements)\n• **Comparisons** between IIT Delhi, BITS, and NIT Trichy\n• **Alumni insights** from verified graduates\n• **Entrance exam** cutoffs and tips\n• **Career paths** (research, startups, placements)\n\nTry asking something like \"Which program has the best placements?\" or \"Tell me about BITS Pilani\"",
  "I'm not sure about that specific topic yet, but I know a lot about these areas:\n\n📊 Program comparison & rankings\n💼 Placement statistics & career outcomes\n📝 Entrance exam requirements\n🏫 Campus life & culture\n💰 Fees & ROI analysis\n\nWhat would you like to know more about?",
]

export function getChatbotResponse(userMessage) {
  const msg = userMessage.toLowerCase().trim()
  
  // Score each knowledge entry based on keyword matches
  const scored = knowledgeBase.map(entry => {
    let score = 0
    for (const keyword of entry.keywords) {
      if (msg.includes(keyword)) {
        // Longer keyword matches are worth more
        score += keyword.length
      }
    }
    return { entry, score }
  })
  
  // Sort by score descending
  scored.sort((a, b) => b.score - a.score)
  
  // If we have a good match (score > 0), use it
  if (scored[0].score > 0) {
    return scored[0].entry.response(scored)
  }
  
  // Fuzzy matching for common intents
  if (msg.includes('best') || msg.includes('top') || msg.includes('recommend')) {
    return knowledgeBase.find(e => e.keywords.includes('compare')).response()
  }
  
  if (msg.includes('alumni') || msg.includes('talk') || msg.includes('speak') || msg.includes('call')) {
    const randomAlum = alumni[Math.floor(Math.random() * alumni.length)]
    return `Here are some verified alumni you can connect with:\n\n` +
      alumni.slice(0, 4).map(a => 
        `**${a.name}** — ${a.currentRole} at ${a.company}\nExpertise: ${a.expertise.join(', ')}\n[View profile →](/alumni/${a.id})`
      ).join('\n\n') +
      `\n\nYou can ask them questions or book a 15-min call!`
  }
  
  // Default response
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
}

export function getQuickSuggestions() {
  return [
    "Which college has the best placements?",
    "Compare IIT Delhi vs BITS Pilani",
    "What are the entrance exam cutoffs?",
    "Tell me about campus life",
    "Is NIT Trichy good ROI?",
    "How do I get into AI/ML research?",
  ]
}
