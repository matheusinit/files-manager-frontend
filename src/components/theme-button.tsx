import { useEffect } from 'react'
import { BiMoon, BiSun } from 'react-icons/bi'

import { useTheme } from './theme'

export const ThemeButton = () => {
  const { theme, themeType, setCurrentTheme } = useTheme()

  useEffect(() => {
    let definedTheme = localStorage.getItem('@theme')

    if (setCurrentTheme === null || definedTheme === null) return

    definedTheme = JSON.parse(definedTheme)

    if (definedTheme === 'dark' || definedTheme === 'light') {
      setCurrentTheme(definedTheme)
    }
  }, [])

  const toggleTheme = () => {
    if (setCurrentTheme == null) return null

    setCurrentTheme((previous) => {
      const theme = previous === 'dark' ? 'light' : 'dark'

      if (typeof window !== 'undefined') {
        localStorage.setItem('@theme', JSON.stringify(theme))
      }

      return theme
    })
  }

  if (themeType === 'light') {
    return (
      <BiMoon size={20} style={{ color: '#535353' }} onClick={toggleTheme} />
    )
  }

  return (
    <BiSun size={20} style={{ color: `${theme['--text']}` }} onClick={toggleTheme} />
  )
}
