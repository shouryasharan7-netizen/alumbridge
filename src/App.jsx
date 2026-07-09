import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import ProgramCatalog from './pages/ProgramCatalog'
import ProgramProfile from './pages/ProgramProfile'
import ComparePrograms from './pages/ComparePrograms'
import AlumniConnect from './pages/AlumniConnect'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/programs" element={<ProgramCatalog />} />
          <Route path="/programs/:id" element={<ProgramProfile />} />
          <Route path="/compare" element={<ComparePrograms />} />
          <Route path="/alumni/:id" element={<AlumniConnect />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
