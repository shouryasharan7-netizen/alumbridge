import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'
import CustomCursor from './components/CustomCursor'
import LandingPage from './pages/LandingPage'
import ProgramCatalog from './pages/ProgramCatalog'
import ProgramProfile from './pages/ProgramProfile'
import ComparePrograms from './pages/ComparePrograms'
import AlumniConnect from './pages/AlumniConnect'
import AlumniListing from './pages/AlumniListing'

function App() {
  return (
    <ThemeProvider>
      <CustomCursor />
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/programs" element={<ProgramCatalog />} />
            <Route path="/programs/:id" element={<ProgramProfile />} />
            <Route path="/compare" element={<ComparePrograms />} />
            <Route path="/alumni" element={<AlumniListing />} />
            <Route path="/alumni/:id" element={<AlumniConnect />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </ThemeProvider>
  )
}

export default App
