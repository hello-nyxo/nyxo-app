import { useEffect } from 'react'

function useOnMount(onMount: () => void): void {
  useEffect(onMount, [onMount])
}

export default useOnMount
