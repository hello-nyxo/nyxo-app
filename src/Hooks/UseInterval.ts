import { useEffect, useRef } from 'react'

function useInterval(callback, interval = 1000) {
  const callbackRef = useRef || null

  useEffect(() => {
    callbackRef.current = callback
  })

  useEffect(() => {
    const tick = () => {
      callbackRef.current && callbackRef.current()
    }

    const id = setInterval(tick, interval)
    return () => clearInterval(id)
  }, [interval])
}

export default useInterval
