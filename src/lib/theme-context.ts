import { createContext, useContext } from 'react'

export type ThemeContextValue = {
  dark: boolean
  setDark: (dark: boolean) => void
}

export const ThemeContext = createContext<ThemeContextValue>({
  dark: true,
  setDark: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}
