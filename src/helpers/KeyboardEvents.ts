/* eslint-disable no-unused-expressions */
import { useEffect } from 'react'
import { Keyboard, KeyboardEventListener, Platform } from 'react-native'

interface Params {
  handleKeyboardWillShow?: KeyboardEventListener
  handleKeyboardDidShow?: KeyboardEventListener
  handleKeyboardDidHide?: KeyboardEventListener
  handleKeyboardWillHide?: KeyboardEventListener
}

const useKeyboardEvents = ({
  handleKeyboardWillShow,
  handleKeyboardDidShow,
  handleKeyboardDidHide,
  handleKeyboardWillHide
}: Params): void => {
  const isAndroid = Platform.OS === 'android'
  useEffect(() => {
    if (isAndroid) {
      handleKeyboardDidShow &&
        Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow)
      handleKeyboardDidHide &&
        Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide)
    } else {
      handleKeyboardWillShow &&
        Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow)
      handleKeyboardWillHide &&
        Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide)
    }

    return () => {
      handleKeyboardDidShow &&
        Keyboard.removeListener('keyboardDidShow', handleKeyboardDidShow)
      handleKeyboardDidHide &&
        Keyboard.removeListener('keyboardDidHide', handleKeyboardDidHide)
      handleKeyboardWillShow &&
        Keyboard.removeListener('keyboardWillShow', handleKeyboardWillShow)
      handleKeyboardWillHide &&
        Keyboard.removeListener('keyboardWillHide', handleKeyboardWillHide)
    }
  }, [
    handleKeyboardDidHide,
    handleKeyboardDidShow,
    handleKeyboardWillHide,
    handleKeyboardWillShow,
    isAndroid
  ])
}

export default useKeyboardEvents
