import React, { useEffect } from 'react'
import './Splash.css'

export default function Splash({ onFinish }) {
  const text = 'SentientAI'
  useEffect(() => {
    // finish after all letters + a bit of buffer
    const total = text.length * 200 + 800
    const timer = setTimeout(onFinish, total)
    return () => clearTimeout(timer)
  }, [onFinish, text.length])

  return (
    <div className="splash">
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="splash-letter"
          style={{ animationDelay: `${i * 0.2}s` }}
        >
          {char}
        </span>
      ))}
    </div>
  )
}
