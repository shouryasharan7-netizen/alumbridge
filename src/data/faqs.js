// Structured FAQ database created by alumni
// ChatBot checks these FIRST before falling back to Gemini API or rule-based engine

export const faqs = [
  { id: 1, category: 'Fees', question: 'What is the total fee for Computer Science at IIT Delhi?', answer: 'The total fee for the 4-year B.Tech Computer Science program at IIT Delhi is approximately INR 8-10 lakhs (around $10,000-12,000 USD). This includes tuition, hostel, mess, and other charges. Scholarships are available for economically weaker students.', alumniId: 'a1', keywords: ['fee', 'cost', 'tuition', 'expense', 'price', 'how much', 'afford', 'scholarship'] },
  { id: 2, category: 'Admission', question: 'What is the cutoff rank for Computer Science at IIT Delhi?', answer: 'The JEE Advanced cutoff for CS at IIT Delhi typically ranges from rank 1-100 for the general category. For reserved categories, it can go up to rank 500. The exact cutoff varies each year based on difficulty and seat availability.', alumniId: 'a1', keywords: ['cutoff', 'rank', 'jee', 'admission', 'entry', 'qualify', 'minimum', 'eligibility'] },
  { id: 3, category: 'Placement', question: 'What is the average placement package at IIT Delhi CS?', answer: 'The average placement package for CS graduates at IIT Delhi is around INR 25-30 LPA (approximately $30,000-36,000 USD). Top packages can go up to INR 1.5-2 crores from companies like Google, Microsoft, and Goldman Sachs.', alumniId: 'a2', keywords: ['placement', 'package', 'salary', 'job', 'average', 'highest', 'ctc', 'recruiter'] },
  { id: 4, category: 'Campus Life', question: 'How is the campus life at IIT Delhi?', answer: 'IIT Delhi has a vibrant campus life with over 50 clubs, active cultural and technical fests (Tryst, Rendezvous), sports facilities, and a strong peer group. The campus is in Hauz Khas, South Delhi, giving easy access to the city. Hostel life is a highlight — you build lifelong friendships.', alumniId: 'a1', keywords: ['campus', 'life', 'hostel', 'club', 'fest', 'culture', 'social', 'fun', 'activities'] },
  { id: 5, category: 'Housing', question: 'Is hostel accommodation available at IIT Delhi?', answer: 'Yes, hostel accommodation is available and most students live on campus. IIT Delhi has multiple hostels (Aravali, Girnar, Jwalamukhi, etc.) with single/double rooms. Hostel fees are included in the overall fee structure. WiFi, mess, and laundry facilities are available.', alumniId: 'a1', keywords: ['hostel', 'housing', 'accommodation', 'room', 'stay', 'dormitory', 'living'] },
  { id: 6, category: 'Admission', question: 'What entrance exam is required for IIT Delhi?', answer: 'IIT Delhi requires JEE Advanced qualification. You first need to clear JEE Main (top 2.5 lakh candidates qualify) and then appear for JEE Advanced. The competition is intense — only top rankers get into CS at IIT Delhi.', alumniId: 'a2', keywords: ['exam', 'entrance', 'jee', 'test', 'qualify', 'main', 'advanced', 'require'] },
  { id: 7, category: 'Fees', question: 'Are there scholarships available at MIT?', answer: 'MIT has a need-blind admission policy and meets 100% of demonstrated financial need. About 60% of MIT students receive need-based scholarships. The average financial aid package is around $50,000/year. International students are eligible for the same aid.', alumniId: 'a5', keywords: ['scholarship', 'financial aid', 'mit', 'need-based', 'grant', 'free', 'waiver'] },
  { id: 8, category: 'Placement', question: 'What companies recruit from NUS Singapore?', answer: 'Top recruiters from NUS include Google, Meta, Amazon, Goldman Sachs, Grab, Sea Group, Shopee, DBS Bank, and many Singapore-based tech companies. Singapore PR/Work Pass holders have an advantage in the local job market.', alumniId: 'a3', keywords: ['recruiter', 'company', 'nus', 'singapore', 'employer', 'hire', 'job market', 'work'] },
  { id: 9, category: 'Program', question: 'What is the duration of undergraduate programs at Oxford?', answer: 'Oxford undergraduate programs are typically 3 years for BA/BSc and 4 years for integrated masters (MEng, MChem, etc.). The academic year runs from October to June with three 8-week terms (Michaelmas, Hilary, Trinity).', alumniId: 'a4', keywords: ['duration', 'length', 'years', 'oxford', 'term', 'semester', 'how long'] },
  { id: 10, category: 'Admission', question: 'How do I apply to ETH Zurich?', answer: 'Apply through ETH Zurich\'s online portal. Requirements include: high school diploma equivalent to Swiss Matura, German language proficiency (B2 minimum for German-taught programs), and strong math/science background. Some English-taught masters programs don\'t require German.', alumniId: 'a6', keywords: ['apply', 'application', 'eth', 'zurich', 'swiss', 'german', 'language', 'requirement'] },
  { id: 11, category: 'Campus Life', question: 'What is the student community like at NUS?', answer: 'NUS has a diverse international community with students from 100+ countries. There are over 300 student clubs, active hall life (residential colleges), and strong alumni networking. Singapore\'s safety and cleanliness make it great for international students.', alumniId: 'a3', keywords: ['community', 'diverse', 'international', 'nus', 'club', 'hall', 'network'] },
  { id: 12, category: 'Placement', question: 'What are the internship opportunities at MIT?', answer: 'MIT has extensive internship programs through MISTI (MIT International Science and Technology Initiatives). Students intern at top tech companies, research labs, and startups. The MIT Career Advising office actively helps with placements. Average internship stipend is $5,000-8,000/month.', alumniId: 'a5', keywords: ['internship', 'intern', 'mit', 'misti', 'summer', 'stipend', 'work experience'] },
  { id: 13, category: 'Fees', question: 'What is the total cost of studying at Oxford?', answer: 'Total cost for international students at Oxford is approximately GBP 35,000-45,000 per year (including tuition + living). For a 3-year program, that\'s roughly GBP 105,000-135,000. Rhodes and Clarendon scholarships are available for exceptional students.', alumniId: 'a4', keywords: ['cost', 'fee', 'oxford', 'total', 'pound', 'gbp', 'expensive', 'afford'] },
  { id: 14, category: 'Program', question: 'What specializations are available in CS at IIT Delhi?', answer: 'CS at IIT Delhi offers specializations in AI/ML, Data Science, Cybersecurity, Systems, and Theory. You can choose electives from the 5th semester onwards. Research opportunities are available through the undergraduate research program and final year thesis.', alumniId: 'a1', keywords: ['specialization', 'major', 'elective', 'focus', 'ai', 'ml', 'data science', 'track'] },
  { id: 15, category: 'Admission', question: 'What are the IELTS/TOEFL requirements for NUS?', answer: 'NUS requires IELTS 6.5+ (with minimum 6.0 in each component) or TOEFL iBT 92+ for undergraduate programs. Some programs may require higher scores. The requirement may be waived for students from English-medium schools.', alumniId: 'a3', keywords: ['ielts', 'toefl', 'english', 'language', 'nus', 'score', 'requirement', 'waiver'] },
  { id: 16, category: 'Housing', question: 'How is the hostel at NUS Singapore?', answer: 'NUS offers on-campus housing in halls of residence and residential colleges. Popular options include UTown residences, Prince George\'s Park, and Kent Ridge Hall. Room rates range from SGD 3,000-6,000 per semester. Apply early as spots are limited for international students.', alumniId: 'a3', keywords: ['hostel', 'housing', 'nus', 'room', 'hall', 'residence', 'utown'] },
  { id: 17, category: 'Placement', question: 'What is the placement rate at IIT Delhi CS?', answer: 'The placement rate for CS at IIT Delhi is consistently above 95%. Most students who actively participate in placements get offers. Some students opt for higher studies (MS/PhD abroad) or entrepreneurship, which is not counted in placement stats.', alumniId: 'a2', keywords: ['placement rate', 'percent', 'hired', 'success', 'iit delhi', 'cs', 'computer'] },
  { id: 18, category: 'Campus Life', question: 'What sports facilities does IIT Delhi have?', answer: 'IIT Delhi has excellent sports facilities including a swimming pool, gym, tennis courts, basketball court, football field, cricket ground, and table tennis rooms. The annual sports fest Dogra is very popular. Inter-hostel competitions happen year-round.', alumniId: 'a1', keywords: ['sport', 'gym', 'swimming', 'cricket', 'football', 'fitness', 'exercise'] },
  { id: 19, category: 'Program', question: 'Is there a co-op program at University of Toronto?', answer: 'Yes, UofT offers a Professional Experience Year (PEY) co-op program for engineering students. It\'s a 12-16 month paid internship between 3rd and 4th year. Students earn CAD 40,000-60,000 during the co-op. It\'s highly recommended for industry exposure.', alumniId: 'a7', keywords: ['coop', 'co-op', 'pey', 'toronto', 'internship', 'work term', 'experience'] },
  { id: 20, category: 'Fees', question: 'What is the tuition fee at ETH Zurich?', answer: 'ETH Zurich has very low tuition fees — approximately CHF 730 per semester (about $800 USD) for all students. Living costs in Zurich are high (CHF 1,500-2,000/month). Total cost for a 3-year bachelor\'s is around CHF 60,000-72,000.', alumniId: 'a6', keywords: ['fee', 'tuition', 'eth', 'zurich', 'cheap', 'affordable', 'swiss', 'franc', 'chf'] },
]

export function matchFAQ(query) {
  const q = query.toLowerCase()
  const tokens = q.split(/[\s,?.!]+/).filter(t => t.length > 2)

  let bestMatch = null
  let bestScore = 0

  for (const faq of faqs) {
    let score = 0

    // Check keyword matches
    for (const keyword of faq.keywords) {
      if (q.includes(keyword)) score += 3
    }

    // Check question word overlap
    const questionTokens = faq.question.toLowerCase().split(/[\s,?.!]+/).filter(t => t.length > 2)
    for (const qt of questionTokens) {
      if (tokens.includes(qt)) score += 2
    }

    // Check direct phrase matches
    if (q.includes(faq.question.toLowerCase().slice(0, 30))) score += 5

    // Category match boost
    if (q.includes(faq.category.toLowerCase())) score += 1

    if (score > bestScore) {
      bestScore = score
      bestMatch = faq
    }
  }

  // Only return if score is meaningful (at least 2 keyword matches)
  return bestScore >= 4 ? bestMatch : null
}
