import { createContext, useContext, useState, useEffect } from 'react'

const AUTH_KEY = 'alumbridge_auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(currentUser))
    } else {
      localStorage.removeItem(AUTH_KEY)
    }
  }, [currentUser])

  const login = (role, name, email) => {
    const user = { role, name, email, loggedIn: true, loginDate: new Date().toISOString() }
    setCurrentUser(user)
    return user
  }

  const logout = () => {
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
