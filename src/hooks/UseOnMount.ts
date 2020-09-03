import { useEffect } from 'react'

function useOnMount(onMount) {
  useEffect(onMount, [])
}

export default useOnMount
