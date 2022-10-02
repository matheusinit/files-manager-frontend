import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from 'react'

type ThemeType = 'light' | 'dark'

interface Theme {
  '--primary': Color
  '--secondary': Color
  '--background': Color
  '--secondary-background'?: Color
  '--ternary-background'?: Color
  '--text': Color
}

enum Color {
  LIGHT_BACKGROUND = '#FAFAFA',
  DARK_BACKGROUND = '#2c2c2c',
  LIGHT_PURPLE = '#C5A2DE',
  DARK_PURPLE = '#665B6F',
  LIGHTEST_GREY = '#222222',
  DARKEST_GREY = '#1D1D1D',
  WHITE = '#FFFFFF'
}

const THEMES: Record<ThemeType, Theme> = {
  light: {
    '--primary': Color.LIGHT_PURPLE,
    '--secondary': Color.LIGHT_PURPLE,
    '--background': Color.LIGHT_BACKGROUND,
    '--text': Color.LIGHTEST_GREY
  },
  dark: {
    '--primary': Color.LIGHT_PURPLE,
    '--secondary': Color.DARK_PURPLE,
    '--background': Color.DARK_BACKGROUND,
    '--secondary-background': Color.DARKEST_GREY,
    '--ternary-background': Color.LIGHTEST_GREY,
    '--text': Color.WHITE
  }
}

interface ThemeContextProps {
  themeType: ThemeType
  theme: Theme
  setCurrentTheme: Dispatch<SetStateAction<ThemeType>> | null
}

export const ThemeContext = createContext<ThemeContextProps>({
  themeType: 'light',
  theme: THEMES.light,
  setCurrentTheme: null
})

interface Props {
  children: React.ReactNode
}

export const ThemeProvider: FC<Props> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('light')

  return (
    <ThemeContext.Provider value={{
      themeType: currentTheme,
      theme: THEMES[currentTheme],
      setCurrentTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
