import { Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'
import LandingPage from './pages/LandingPage'
import Programs from './pages/Programs'
import ProgramProfile from './pages/ProgramProfile'
import AlumniConnect from './pages/AlumniConnect'
import AlumniListing from './pages/AlumniListing'
import Projects from './pages/Projects'
import MentorDashboard from './pages/MentorDashboard'
import Login from './pages/Login'
import StudentDashboard from './pages/StudentDashboard'
import AlumniDashboard from './pages/AlumniDashboard'
import Sitemap from './pages/Sitemap'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/programs/:id" element={<ProgramProfile />} />
              <Route path="/alumni" element={<AlumniListing />} />
              <Route path="/alumni/:id" element={<AlumniConnect />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/mentor" element={<MentorDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<StudentDashboard />} />
              <Route path="/alumni-dashboard" element={<AlumniDashboard />} />
              <Route path="/sitemap" element={<Sitemap />} />
            </Routes>
          </main>
          <Footer />
          <ChatBot />
          <Analytics />
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
