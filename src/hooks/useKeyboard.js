import { useCallback, useEffect, useRef } from 'react'

export default function useKeyboard() {
  const keysRef = useRef(new Set())
  const pressedRef = useRef(new Set())

  useEffect(() => {
    function handleKeyDown(event) {
      const key = event.key.toLowerCase()

      if ([' ', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        event.preventDefault()
      }

      keysRef.current.add(key)

      if (!event.repeat) {
        pressedRef.current.add(key)
      }
    }

    function handleKeyUp(event) {
      keysRef.current.delete(event.key.toLowerCase())
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  const consumePressed = useCallback(() => {
    const pressed = new Set(pressedRef.current)
    pressedRef.current.clear()
    return pressed
  }, [])

  return { keysRef, consumePressed }
}