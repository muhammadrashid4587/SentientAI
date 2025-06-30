import React, { useEffect } from 'react'
import './OpeningScreen.css'

const TITLE = 'SENTIENTAI'

export default function OpeningScreen({ onFinish }) {
  // when animation is done (TOTAL = letters * delay + their duration + fadeout)
  useEffect(() => {
    const TOTAL = TITLE.length * 100 + 800 + 500 // adjust if you tweak delays
    const timer = setTimeout(onFinish, TOTAL)
    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <div className="opening-screen">
      {TITLE.split('').map((ch, i) => (
        <span
          key={i}
          className="opening-letter"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          {ch}
        </span>
      ))}
    </div>
  )
}
