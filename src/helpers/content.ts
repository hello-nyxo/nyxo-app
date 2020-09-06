import { Entry } from 'contentful'
import { AuthorCard } from 'Types/CoachingContentState'
import { IAuthorFields, ILessonFields } from 'Types/generated/contentful'

export const mapAuthors = (lesson: Entry<ILessonFields>): AuthorCard[] => {
  const authorArray: AuthorCard[] = []

  if (lesson.fields.authorCard) {
    lesson.fields.authorCard.forEach((card: Entry<IAuthorFields>) => {
      const author: AuthorCard = {
        name: 'Pietari Nurmi',
        credentials: 'Head of Coaching',
        avatar: ''
      }

      if (card.fields.name) {
        author.name = card.fields.name
      }

      getFieldValue(card, 'name', author)
      getFieldValue(card, 'credentials', author)

      if (card?.fields?.avatar?.fields?.file?.url) {
        author.avatar = card?.fields?.avatar.fields.file.url
      }
      authorArray.push(author)
    })
  }
  return authorArray
}

export const getFieldValue = (
  entry: Entry<any>,
  fieldToGet: string,
  object: any,
  callback?: (args: any) => void,
  fieldToSet?: string
) => {
  if (entry.fields[fieldToGet]) {
    object[fieldToSet || fieldToGet] = callback
      ? callback(entry.fields[fieldToGet])
      : entry.fields[fieldToGet]
  }
}
