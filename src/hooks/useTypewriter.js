import { useCallback, useRef } from 'react'

/**
 * useTypewriter — streams text into state character by character.
 * Returns a function to start streaming given text, and a cancel ref.
 */
export function useTypewriter(setText, msPerChar = 30) {
  const timerRef = useRef(null)

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const start = useCallback(
    (text, onDone) => {
      cancel()
      setText('')
      let i = 0
      const tick = () => {
        if (i <= text.length) {
          setText(text.slice(0, i))
          i++
          timerRef.current = setTimeout(tick, msPerChar)
        } else {
          onDone?.()
        }
      }
      tick()
    },
    [cancel, setText, msPerChar],
  )

  return { start, cancel }
}
