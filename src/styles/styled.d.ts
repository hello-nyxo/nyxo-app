import 'styled-components'

declare module 'styled-components' {
  export interface ThemeInterface {
    mode?: string
    PRIMARY_BACKGROUND_COLOR?: string
    SECONDARY_BACKGROUND_COLOR?: string
    PRIMARY_TEXT_COLOR?: string
    SECONDARY_TEXT_COLOR?: string
    PRIMARY_BUTTON_COLOR?: string
    SECONDARY_BUTTON_COLOR?: string
    HAIRLINE_COLOR?: string
    GRADIENT: string[]
    SHADOW: string
  }
}
