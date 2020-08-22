import { useEffect } from 'react'
import { Keyboard, KeyboardEventListener, Platform } from 'react-native'

interface Params {
  handleKeyboardWillShow?: KeyboardEventListener
  handleKeyboardDidShow?: KeyboardEventListener
  handleKeyboardDidHide?: KeyboardEventListener
  handleKeyboardWillHide?: KeyboardEventListener
}

const useKeyboardEvents = (params: Params) => {
  const {
    handleKeyboardWillShow,
    handleKeyboardDidShow,
    handleKeyboardDidHide,
    handleKeyboardWillHide
  } = params

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
  }, [])
}

export default useKeyboardEvents
