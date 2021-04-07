import { useColorScheme } from 'react-native'
import { useAppSelector } from './redux'

export const useTheme = (): 'dark' | 'light' => {
  const { theme, followSystemTheme } = useAppSelector((state) => state.theme)
  const colorScheme = useColorScheme()
  if (followSystemTheme) {
    return colorScheme === 'dark' ? 'dark' : 'light'
  } else {
    return theme === 'dark' ? 'dark' : 'light'
  }
}
