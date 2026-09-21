import { useEffect, useRef } from 'react'

export default function useGameLoop(enabled, callback) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (!enabled) return undefined

    let frameId = 0
    let previousTime = performance.now()

    function frame(currentTime) {
      const delta = Math.min((currentTime - previousTime) / 1000, 0.1)
      previousTime = currentTime
      callbackRef.current(delta, currentTime)
      frameId = requestAnimationFrame(frame)
    }

    frameId = requestAnimationFrame(frame)

    return () => cancelAnimationFrame(frameId)
  }, [enabled])
}