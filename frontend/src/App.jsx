import React, { useState } from 'react'
import OpeningScreen from './components/OpeningScreen'
import Starfield from './components/Starfield'
import MemoryLogger from './components/MemoryLogger'
import MemoryRecaller from './components/MemoryRecaller'

import './App.css'

export default function App() {
  const [showIntro, setShowIntro] = useState(true)

  if (showIntro) {
    return <OpeningScreen onFinish={() => setShowIntro(false)} />
  }

  return (
    <div className="app">
      <Starfield />
      <div className="app-content">
        <h1 className="neon-header">
          Sentient<span className="ai">AI</span>
        </h1>
        <div className="card">
          <MemoryLogger />
          <hr className="divider" />
          <MemoryRecaller />
        </div>
      </div>
    </div>
  )
}
