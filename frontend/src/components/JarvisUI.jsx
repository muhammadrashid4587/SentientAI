// import React, { useState, useEffect, useRef } from 'react';
// import './JarvisUI.css';

// export default function JarvisUI() {
//   const [open, setOpen] = useState(false);
//   const panelRef = useRef();

//   // click outside to close
//   useEffect(() => {
//     function handleClick(e) {
//       if (open && panelRef.current && !panelRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     }
//     window.addEventListener('mousedown', handleClick);
//     return () => window.removeEventListener('mousedown', handleClick);
//   }, [open]);

//   return (
//     <>
//       {/* floating orb/button */}
//       <div
//         className={`jarvis-button ${open ? 'open' : ''}`}
//         onClick={() => setOpen((v) => !v)}
//       >
//         🤖
//       </div>

//       {/* slide-up panel */}
//       <div
//         ref={panelRef}
//         className={`jarvis-panel ${open ? 'open' : ''}`}
//       >
//         <h3>Jarvis</h3>
//         <p>Your AI assistant is standing by…</p>
//         <textarea placeholder="Ask me anything…" />
//         <button>Send</button>
//       </div>
//     </>
//   );
// }


// src/components/JarvisUI.jsx
import React, { useState } from 'react';
import './JarvisUI.css';
import botIcon from '../assets/bot.png';

export default function JarvisUI() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={`jarvis-window ${open ? 'open' : ''}`}>
        <div className="jarvis-header">Jarvis AI</div>
        <div className="jarvis-body">“How may I serve you today?”</div>
      </div>
      <button
        className="jarvis-button"
        onClick={() => setOpen(o => !o)}
        title="Toggle Jarvis"
      >
        <img src={botIcon} alt="Jarvis" />
      </button>
    </>
  );
}
