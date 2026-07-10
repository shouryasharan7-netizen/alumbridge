import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({ dark: true, toggle: () => {} })

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return true
    return document.documentElement.classList.contains('dark')
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
    localStorage.setItem('alumbridge_theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const saved = localStorage.getItem('alumbridge_theme')
    if (saved === 'light') setDark(false)
    else if (saved === 'dark') setDark(true)
  }, [])

  const toggle = () => setDark((prev) => !prev)

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
