import readingTime from 'reading-time'
import { Document } from '@contentful/rich-text-types'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

export const getReadingTime = (content: Document | undefined): number => {
  if (!content || typeof content === 'string') return 0

  const toString = documentToPlainTextString(content)
  const readTime = readingTime(toString)
  const time = Math.ceil(readTime.minutes)

  return time
}
