import 'styled-components/native'

declare module 'styled-components' {
  export interface DefaultTheme {
    mode?: string
    bgPrimary?: string
    bgSecondary?: string

    textPrimary?: string
    textSecondary?: string
    buttonPrimary?: string
    buttonSecondary?: string
    hairline?: string
    gradient: string[]
    shadowPrimary: string

    regular: string
    medium: string
    bold: string

    accent: string
    accentSecondary: string

    primaryBoneColer: string
    SecondaryBoneColor: string
  }
}
