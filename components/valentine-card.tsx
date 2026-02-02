"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Fireworks } from "./fireworks"

const JOKES = [
  "Nice try! But my love can't be escaped! 💕",
  "Are you a magician? Because every time you hover near 'No', it disappears! ✨",
  "That button has commitment issues, just like you avoiding this question! 😄",
  "The 'No' button is playing hard to get... unlike me! 💝",
  "Error 404: 'No' button not found in your destiny! 🎯",
  "That button is more slippery than my pickup lines! 😂",
  "You can run, but you can't hide... from my love! 💘",
  "The button is doing the cha-cha slide! 💃",
  "Physics says: Two hearts attract, 'No' buttons repel! 🔬",
  "That button is training for the Olympics! 🏃‍♂️",
  "My love is like WiFi - the 'No' button has no signal! 📶",
  "The button went on vacation! Destination: Far Away! ✈️",
  "Plot twist: The 'No' button is actually shy! 😊",
  "Finally you're understanding how this works! 🎓",
  "See? Even the button knows the right answer! 🧠",
  "The universe is clearly telling you something! 🌌",
  "Your persistence is adorable, but futile! 😏",
  "That button has better reflexes than a cat! 🐱",
  "You're getting warmer... wait, no you're not! 🔥",
  "Is this a workout? Because you're chasing the impossible! 💪",
  "Breaking news: 'No' button declared endangered species! 📰",
  "The button whispered: 'Just say yes already!' 🤫",
  "Fun fact: This button has never been clicked! 📊",
  "Your finger: Fast. This button: Faster! ⚡",
  "Legend says the button is still running to this day! 🏃",
  "The button joined witness protection program! 🕵️",
  "Cupid approves this button's escape skills! 🏹",
  "At this point, just accept your fate! 💫",
  "The button is allergic to rejection! 🤧",
  "You've tried everything except clicking Yes! 💡",
]

const AFFIRMATION_JOKES = [
  "Now you're getting it! 🎉",
  "Smart choice incoming! 🧠",
  "I see you eyeing the right button! 👀",
  "Yes is calling your name! 📞",
  "The best decision of your life awaits! ✨",
  "You're so close to happiness! 💖",
  "That's my girl! Keep going! 🌟",
  "Your heart knows the answer! 💝",
]

const GIFS = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHZ4ZnBxbXpqMnV5Z3RiMXBkMWx4dmd4a3FiNWNyYnl6YjZ4OWh4biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0MYt5jPR6QX5pnqM/giphy.gif",
]

export function ValentineCard() {
  const [accepted, setAccepted] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [moveCount, setMoveCount] = useState(0)
  const [currentJoke, setCurrentJoke] = useState("")
  const [showJoke, setShowJoke] = useState(false)
  const [jokeColorIndex, setJokeColorIndex] = useState(0)
  const [affirmationJoke, setAffirmationJoke] = useState("")
  const [showAffirmation, setShowAffirmation] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [nextFibTarget, setNextFibTarget] = useState(1)
  const fibSequenceRef = useRef({ prev: 1, current: 1 })

  // Background colors for jokes - cycles through these
  const jokeColors = [
    "bg-pink-100 border-pink-300",
    "bg-rose-100 border-rose-300",
    "bg-red-100 border-red-300",
    "bg-orange-100 border-orange-300",
    "bg-amber-100 border-amber-300",
    "bg-fuchsia-100 border-fuchsia-300",
    "bg-purple-100 border-purple-300",
  ]

  // Show joke at Fibonacci intervals
  useEffect(() => {
    if (moveCount > 0 && moveCount === nextFibTarget) {
      const randomJoke = JOKES[Math.floor(Math.random() * JOKES.length)]
      setCurrentJoke(randomJoke)
      setShowJoke(true)
      setJokeColorIndex((prev) => (prev + 1) % jokeColors.length)
      
      // Calculate next Fibonacci number
      const { prev, current } = fibSequenceRef.current
      const nextFib = prev + current
      fibSequenceRef.current = { prev: current, current: nextFib }
      setNextFibTarget(nextFib)
    }
  }, [moveCount, nextFibTarget, jokeColors.length])

  const moveNoButton = useCallback(() => {
    if (!containerRef.current) return
    
    const container = containerRef.current.getBoundingClientRect()
    const buttonWidth = 100
    const buttonHeight = 44
    
    // Calculate random position within bounds
    const maxX = Math.min(container.width - buttonWidth, 200)
    const maxY = Math.min(container.height - buttonHeight, 150)
    
    const newX = (Math.random() - 0.5) * maxX * 2
    const newY = (Math.random() - 0.5) * maxY * 2
    
    setNoButtonPosition({ x: newX, y: newY })
    setMoveCount((prev) => prev + 1)
  }, [])

  const handleYes = () => {
    setAccepted(true)
  }

  const handleYesHover = () => {
    const randomAffirmation = AFFIRMATION_JOKES[Math.floor(Math.random() * AFFIRMATION_JOKES.length)]
    setAffirmationJoke(randomAffirmation)
    setShowAffirmation(true)
  }

  const handleYesLeave = () => {
    setShowAffirmation(false)
  }

  if (accepted) {
    return (
      <>
        <Fireworks />
        <Card className="w-full max-w-lg mx-auto bg-card/90 backdrop-blur-sm border-2 border-primary/30 shadow-2xl">
          <CardContent className="pt-8 pb-10 px-8 text-center">
            <div className="text-6xl mb-6 animate-bounce">🎉</div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-balance">
              Great Choice!
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              I knew you had great taste! 💕
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              {GIFS.map((gif, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden border-2 border-primary/20 shadow-lg"
                >
                  <img
                    src={gif || "/placeholder.svg"}
                    alt={`Celebration gif ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-2xl animate-pulse">
              💖 Happy Valentine&apos;s Day! 💖
            </div>
          </CardContent>
        </Card>
      </>
    )
  }

  return (
    <Card className="w-full max-w-lg mx-auto bg-card/90 backdrop-blur-sm border-2 border-primary/30 shadow-2xl">
      <CardContent className="pt-8 pb-10 px-8" ref={containerRef}>
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-pulse">💝</div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2 text-balance">
            Will you be my Valentine?
          </h1>
          <p className="text-muted-foreground">
            I promise to make it worth your while! 💕
          </p>
        </div>

        {showJoke && (
          <div 
            key={jokeColorIndex}
            className={`mb-6 p-4 rounded-xl border-2 animate-in fade-in slide-in-from-top-2 duration-300 ${jokeColors[jokeColorIndex]}`}
          >
            <p className="text-center text-foreground font-medium">
              {currentJoke}
            </p>
          </div>
        )}

        <div className="flex justify-center items-center gap-6 min-h-[120px] relative">
          <div className="flex flex-col items-center gap-2">
            {showAffirmation && (
              <div className="absolute -top-12 bg-green-100 border-2 border-green-300 px-4 py-2 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-200 whitespace-nowrap">
                <p className="text-sm font-medium text-green-800">{affirmationJoke}</p>
              </div>
            )}
            <Button
              onClick={handleYes}
              onMouseEnter={handleYesHover}
              onMouseLeave={handleYesLeave}
              size="lg"
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 hover:scale-150 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              Yes! 💖
            </Button>
          </div>

          <div
            className="transition-all duration-300 ease-out"
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
            }}
          >
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-2 hover:bg-secondary transition-all duration-300 bg-transparent"
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              onTouchStart={moveNoButton}
            >
              No 😢
            </Button>
          </div>
        </div>

        {/* {moveCount > 0 && (
          <p className="text-center text-sm text-muted-foreground mt-6 animate-in fade-in">
            Button escaped {moveCount} time{moveCount !== 1 ? "s" : ""}! 🏃
          </p>
        )} */}
      </CardContent>
    </Card>
  )
}
