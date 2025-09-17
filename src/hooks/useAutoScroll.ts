import { useEffect, useRef } from 'react'

export const useAutoScroll = <T extends HTMLElement>() => {
  const endRef = useRef<T | null>(null)
  const scrollToBottom = () => endRef.current?.scrollIntoView({ behavior: 'smooth' })
  const trigger = () => scrollToBottom()
  useEffect(() => { scrollToBottom() }, [])
  return { endRef, trigger }
}

export default useAutoScroll


