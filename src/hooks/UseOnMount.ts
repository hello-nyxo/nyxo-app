import { useEffect } from 'react'

function useOnMount(onMount: () => void): void {
  useEffect(onMount, [])
}

export default useOnMount
