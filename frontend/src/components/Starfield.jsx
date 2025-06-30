import React, { useRef, useEffect } from 'react'
import './Starfield.css'  // we’ll reuse this for laser styling

export default function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    // create ~120 horizontal “laser beams”
    const beams = Array.from({ length: 120 }, () => ({
      x: Math.random() * W - W,
      y: Math.random() * H,
      length: 150 + Math.random() * 200,
      speed: 1 + Math.random() * 3,
      thickness: 1 + Math.random() * 2,
      alpha: 0.1 + Math.random() * 0.3,
    }))

    let animId
    function draw() {
      ctx.clearRect(0, 0, W, H)

      beams.forEach(b => {
        ctx.strokeStyle = `rgba(80,230,200,${b.alpha})`
        ctx.lineWidth = b.thickness
        ctx.beginPath()
        ctx.moveTo(b.x, b.y)
        ctx.lineTo(b.x + b.length, b.y)
        ctx.stroke()

        b.x += b.speed
        if (b.x > W + b.length) {
          b.x = -b.length
          b.y = Math.random() * H
        }
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="starfield" />
}
