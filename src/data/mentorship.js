// Mentorship Points System
// Alumni earn points by helping students, unlock ranks, and earn badges

export const RANKS = [
  { name: 'Bronze Mentor', minPoints: 0, icon: '🥉', color: '#cd7f32', description: 'Just getting started on your mentorship journey' },
  { name: 'Silver Mentor', minPoints: 50, icon: '🥈', color: '#c0c0c0', description: 'Students are noticing your guidance' },
  { name: 'Gold Mentor', minPoints: 150, icon: '🥇', color: '#ffd700', description: 'A trusted voice in the community' },
  { name: 'Platinum Mentor', minPoints: 300, icon: '💎', color: '#e5e4e2', description: 'Elite mentor with deep impact' },
  { name: 'Diamond Mentor', minPoints: 500, icon: '👑', color: '#b9f2ff', description: 'Legendary mentor shaping futures worldwide' },
]

export const BADGES = [
  { id: 'first-help', name: 'First Help', icon: '🤝', description: 'Answered your first student question', points: 5, category: 'Mentorship' },
  { id: 'project-reviewer', name: 'Project Reviewer', icon: '🔍', description: 'Reviewed 5 student projects', points: 50, category: 'Projects' },
  { id: 'career-guide', name: 'Career Guide', icon: '🧭', description: 'Helped 10 students with career advice', points: 50, category: 'Mentorship' },
  { id: 'talent-scout', name: 'Talent Scout', icon: '🎯', description: 'Hired your first intern from the platform', points: 25, category: 'Hiring' },
  { id: 'network-builder', name: 'Network Builder', icon: '🌐', description: 'Connected with 20 students', points: 100, category: 'Mentorship' },
  { id: 'code-reviewer', name: 'Code Reviewer', icon: '💻', description: 'Provided code feedback on 10 projects', points: 100, category: 'Projects' },
  { id: 'interview-prep', name: 'Interview Prep', icon: '🎤', description: 'Conducted 5 mock interviews', points: 75, category: 'Mentorship' },
  { id: 'resume-guru', name: 'Resume Guru', icon: '📄', description: 'Reviewed 10 student resumes', points: 50, category: 'Mentorship' },
  { id: 'serial-hirer', name: 'Serial Hirer', icon: '🏢', description: 'Hired 3 interns through the platform', points: 75, category: 'Hiring' },
  { id: 'top-contributor', name: 'Top Contributor', icon: '⭐', description: 'Reached 200 mentorship points', points: 200, category: 'Special' },
  { id: 'community-pillar', name: 'Community Pillar', icon: '🏛️', description: 'Reached 400 mentorship points', points: 400, category: 'Special' },
  { id: 'legend', name: 'Legend', icon: '👑', description: 'Reached Diamond Mentor rank', points: 500, category: 'Special' },
]

export const POINT_RULES = [
  { action: 'Answer a student question', points: 5, icon: '💬' },
  { action: 'Review a student project', points: 10, icon: '📝' },
  { action: 'Give career advice session', points: 15, icon: '🗣️' },
  { action: 'Conduct mock interview', points: 20, icon: '🎤' },
  { action: 'Review a resume', points: 10, icon: '📄' },
  { action: 'Hire an intern', points: 25, icon: '🤝' },
  { action: 'Refer a student to a job', points: 15, icon: '📧' },
  { action: 'Share industry resource', points: 3, icon: '📎' },
]

// Sample activities for demo purposes
export function generateActivities(alumniName) {
  const activities = [
    { id: 1, type: 'answer', title: 'Answered a question about Data Science career path', points: 5, date: '2026-07-08', student: 'Rahul Sharma' },
    { id: 2, type: 'review', title: 'Reviewed "AI-Powered Crop Monitoring" project', points: 10, date: '2026-07-07', student: 'Priya Mehta' },
    { id: 3, type: 'career', title: 'Career advice session on SRE roles', points: 15, date: '2026-07-05', student: 'Ankit Verma' },
    { id: 4, type: 'answer', title: 'Answered questions about Goldman Sachs interviews', points: 5, date: '2026-07-03', student: 'Sneha Gupta' },
    { id: 5, type: 'interview', title: 'Conducted mock system design interview', points: 20, date: '2026-06-28', student: 'Vikram Singh' },
    { id: 6, type: 'review', title: 'Reviewed "Blockchain Supply Chain Tracker" project', points: 10, date: '2026-06-25', student: 'Meera Nair' },
    { id: 7, type: 'resume', title: 'Reviewed resume for campus placement prep', points: 10, date: '2026-06-22', student: 'Arjun Reddy' },
    { id: 8, type: 'hire', title: 'Hired intern for summer DevOps project', points: 25, date: '2026-06-18', student: 'Kavya Iyer' },
    { id: 9, type: 'answer', title: 'Shared insights on Kubernetes in production', points: 5, date: '2026-06-15', student: 'Rohan Das' },
    { id: 10, type: 'career', title: 'Mentoring session on transitioning to SRE', points: 15, date: '2026-06-10', student: 'Neha Patel' },
    { id: 11, type: 'review', title: 'Reviewed "Smart Campus IoT Dashboard"', points: 10, date: '2026-06-05', student: 'Aditya Joshi' },
    { id: 12, type: 'refer', title: 'Referred student to engineering role at partner company', points: 15, date: '2026-05-28', student: 'Tanvi Sharma' },
    { id: 13, type: 'answer', title: 'Discussed distributed systems design patterns', points: 5, date: '2026-05-20', student: 'Ishaan Kapoor' },
    { id: 14, type: 'interview', title: 'Mock behavioral interview for FAANG prep', points: 20, date: '2026-05-15', student: 'Divya Menon' },
    { id: 15, type: 'review', title: 'Reviewed "NLP-based Chatbot for Campus Queries"', points: 10, date: '2026-05-08', student: 'Siddharth Kumar' },
  ]
  return activities
}

export function getTotalPoints(activities) {
  return activities.reduce((sum, a) => sum + a.points, 0)
}

export function getCurrentRank(totalPoints) {
  let current = RANKS[0]
  for (const rank of RANKS) {
    if (totalPoints >= rank.minPoints) current = rank
  }
  return current
}

export function getNextRank(totalPoints) {
  for (const rank of RANKS) {
    if (totalPoints < rank.minPoints) return rank
  }
  return null
}

export function getEarnedBadges(totalPoints, activities) {
  const hireCount = activities.filter(a => a.type === 'hire').length
  const reviewCount = activities.filter(a => a.type === 'review').length
  const interviewCount = activities.filter(a => a.type === 'interview').length
  const resumeCount = activities.filter(a => a.type === 'resume').length
  const connectCount = activities.filter(a => ['answer', 'career'].includes(a.type)).length

  return BADGES.filter(badge => {
    if (badge.id === 'first-help') return activities.some(a => a.type === 'answer')
    if (badge.id === 'project-reviewer') return reviewCount >= 5
    if (badge.id === 'career-guide') return connectCount >= 10
    if (badge.id === 'talent-scout') return hireCount >= 1
    if (badge.id === 'network-builder') return connectCount >= 20
    if (badge.id === 'code-reviewer') return reviewCount >= 10
    if (badge.id === 'interview-prep') return interviewCount >= 5
    if (badge.id === 'resume-guru') return resumeCount >= 10
    if (badge.id === 'serial-hirer') return hireCount >= 3
    if (badge.id === 'top-contributor') return totalPoints >= 200
    if (badge.id === 'community-pillar') return totalPoints >= 400
    if (badge.id === 'legend') return totalPoints >= 500
    return false
  })
}
