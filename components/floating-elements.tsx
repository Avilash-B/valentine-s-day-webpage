"use client"

import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  type: "heart" | "balloon"
  color: string
}

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const colors = ["#ff6b8a", "#ff8fa3", "#ffb3c1", "#ff4d6d", "#c9184a"]
    const balloonColors = ["#ff6b8a", "#ff8fa3", "#c9184a", "#ffb3c1", "#ff4d6d"]
    
    const newElements: FloatingElement[] = []
    
    // Create hearts
    for (let i = 0; i < 15; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 15,
        duration: Math.random() * 8 + 10,
        delay: Math.random() * 5,
        type: "heart",
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }
    
    // Create balloons
    for (let i = 15; i < 25; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 30,
        duration: Math.random() * 10 + 12,
        delay: Math.random() * 5,
        type: "balloon",
        color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
      })
    }
    
    setElements(newElements)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute animate-float"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            animationDuration: `${el.duration}s`,
            animationDelay: `${el.delay}s`,
          }}
        >
          {el.type === "heart" ? (
            <svg
              width={el.size}
              height={el.size}
              viewBox="0 0 24 24"
              fill={el.color}
              className="opacity-60 drop-shadow-sm"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <div className="relative">
              {/* Balloon */}
              <svg
                width={el.size}
                height={el.size * 1.2}
                viewBox="0 0 50 70"
                className="opacity-70"
              >
                <ellipse cx="25" cy="25" rx="20" ry="25" fill={el.color} />
                <polygon points="25,48 20,55 30,55" fill={el.color} />
                <path
                  d="M25 55 Q 27 62 25 70"
                  stroke={el.color}
                  strokeWidth="1.5"
                  fill="none"
                  className="opacity-80"
                />
              </svg>
            </div>
          )}
        </div>
      ))}
      
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-30px) rotate(5deg) scale(1.05);
          }
          50% {
            transform: translateY(-15px) rotate(-3deg) scale(0.98);
          }
          75% {
            transform: translateY(-40px) rotate(2deg) scale(1.02);
          }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
