"use client"

import React from "react"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  color: string
  size: number
  angle: number
  speed: number
}

interface Firework {
  id: number
  x: number
  y: number
  particles: Particle[]
}

export function Fireworks() {
  const [fireworks, setFireworks] = useState<Firework[]>([])

  useEffect(() => {
    const colors = ["#ff6b8a", "#ff8fa3", "#ffb3c1", "#ff4d6d", "#ffd700", "#ff69b4"]
    
    const createFirework = () => {
      const id = Date.now() + Math.random()
      const x = Math.random() * 80 + 10
      const y = Math.random() * 40 + 10
      
      const particles: Particle[] = []
      for (let i = 0; i < 20; i++) {
        particles.push({
          id: i,
          x: 0,
          y: 0,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 6 + 4,
          angle: (i / 20) * 360,
          speed: Math.random() * 100 + 50,
        })
      }
      
      setFireworks((prev) => [...prev, { id, x, y, particles }])
      
      setTimeout(() => {
        setFireworks((prev) => prev.filter((f) => f.id !== id))
      }, 1500)
    }

    createFirework()
    const interval = setInterval(createFirework, 800)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {fireworks.map((fw) => (
        <div
          key={fw.id}
          className="absolute"
          style={{ left: `${fw.x}%`, top: `${fw.y}%` }}
        >
          {fw.particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full animate-explode"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                "--angle": `${p.angle}deg`,
                "--speed": `${p.speed}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      ))}
      
      <style jsx>{`
        @keyframes explode {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(
              calc(cos(var(--angle)) * var(--speed)),
              calc(sin(var(--angle)) * var(--speed))
            ) scale(0);
            opacity: 0;
          }
        }
        .animate-explode {
          animation: explode 1.2s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
