import { useEffect, useRef } from 'react'

function useOnUpdate(onUpdate: any, value: any) {
  // Flag that inditcates whether we are in a mount or update phase
  const isMounted = useRef(false)

  // Create a ref object to store the value
  const valueRef = useRef(undefined)

  useEffect(() => {
    const prevValue = valueRef.current
    // If we are in an update effect invoke the callback with the prev value
    if (!isMounted.current) {
      isMounted.current = true
    } else {
      onUpdate(prevValue)
    }
    // Update the ref object each time the value is updated
    valueRef.current = value
  }, [value]) // Run only when the value updates
}

export default useOnUpdate
