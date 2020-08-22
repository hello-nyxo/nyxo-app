import { rating } from '../../assets/texts/rating'
import colors from '../styles/colors'

export default function getRating(
  ratingValue?: number
): { icon: string; text: string; color?: string } {
  switch (ratingValue) {
    case rating.RATING_BAD_VALUE:
      return {
        icon: rating.RATE_BAD_ICON,
        text: rating.RATE_BAD_TEXT,
        color: colors.red
      }
    case rating.RATING_OK_VALUE:
      return {
        icon: rating.RATE_OK_ICON,
        text: rating.RATE_OK_TEXT,
        color: colors.yellow
      }
    case rating.RATING_GOOD_VALUE:
      return {
        icon: rating.RATE_GOOD_ICON,
        text: rating.RATE_GOOD_TEXT,
        color: colors.green
      }

    case rating.RATING_GREAT_VALUE:
      return {
        icon: rating.RATING_GREAT_ICON,
        text: rating.RATING_GREAT_TEXT,
        color: colors.fallAsleep
      }

    default:
      return {
        icon: rating.RATE_UNRATED_ICON,
        text: rating.RATE_UNRATED_TEXT,
        color: undefined
      }
  }
}
