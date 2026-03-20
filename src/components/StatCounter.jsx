import { useEffect, useState } from 'react'

export function StatCounter({ value, label }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let frameId = 0
    let start = 0
    const duration = 1400

    const tick = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      setCount(Math.floor(progress * value))
      if (progress < 1) frameId = window.requestAnimationFrame(tick)
    }

    frameId = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frameId)
  }, [value])

  return (
    <article className="stat-card">
      <strong>{count}</strong>
      <span>{label}</span>
    </article>
  )
}
