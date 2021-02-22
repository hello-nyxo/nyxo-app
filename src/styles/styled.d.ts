import 'styled-components/native'

declare module 'styled-components' {
  export interface DefaultTheme {
    mode?: string
    PRIMARY_BACKGROUND_COLOR?: string
    SECONDARY_BACKGROUND_COLOR?: string

    SECONDARY_BACKGROUND_COLOR_TRANSPARENT?: string

    PRIMARY_TEXT_COLOR?: string
    SECONDARY_TEXT_COLOR?: string
    ICON_COLOR: string
    PRIMARY_BUTTON_COLOR?: string
    SECONDARY_BUTTON_COLOR?: string
    HAIRLINE_COLOR?: string
    GRADIENT: string[]
    SHADOW: string

    FONT_REGULAR: string
    FONT_MEDIUM: string
    FONT_BOLD: string
    accent: string

    primaryBoneColer: string
    SecondaryBoneColor: string
  }
}
