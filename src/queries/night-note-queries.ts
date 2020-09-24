import { useQuery } from 'react-query'

export const useFetchNightNotes = (userId: string | null) => {
  const { isLoading, isSuccess, isError } = useQuery(
    ['fetchNightNotes', userId],
    (key, userId) => {
      console.log('key', userId)
    }
  )
}
