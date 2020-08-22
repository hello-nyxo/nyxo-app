import { View, Text, ScrollView } from 'react-native'

export const measure = async (
  ref: View | Text | ScrollView
): Promise<Position> =>
  new Promise((resolve) =>
    ref.measureInWindow((x: number, y: number, width: number, height: number) =>
      resolve({
        x,
        y,
        width,
        height
      })
    )
  )
