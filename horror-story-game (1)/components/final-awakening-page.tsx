"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Volume2, VolumeX } from "lucide-react"

interface FinalAwakeningPageProps {
  playerName: string
  onRestart: () => void
  audioEnabled: boolean
  onToggleAudio: () => void
}

export default function FinalAwakeningPage({
  playerName,
  onRestart,
  audioEnabled,
  onToggleAudio,
}: FinalAwakeningPageProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showChoices, setShowChoices] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [showFlash, setShowFlash] = useState(false)
  const [showWakeUp, setShowWakeUp] = useState(false)
  const typewriterRef = useRef<NodeJS.Timeout>()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const phases = [
    {
      text: `This was never fiction...`,
      delay: 3000,
      speed: 150,
    },
    {
      text: `You were part of the test.`,
      delay: 3000,
      speed: 150,
    },
    {
      text: `And now, it's time to wake up.`,
      delay: 2000,
      speed: 150,
    },
  ]

  const typewriterEffect = (text: string, speed = 80, callback?: () => void) => {
    setDisplayedText("")
    setIsTyping(true)

    let index = 0

    const type = () => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
        typewriterRef.current = setTimeout(type, speed)
      } else {
        setIsTyping(false)
        if (callback) {
          setTimeout(callback, phases[currentPhase]?.delay || 2000)
        }
      }
    }

    type()
  }

  useEffect(() => {
    if (currentPhase < phases.length) {
      const phase = phases[currentPhase]
      typewriterEffect(phase.text, phase.speed, () => {
        if (currentPhase < phases.length - 1) {
          setCurrentPhase((prev) => prev + 1)
        } else {
          // Trigger hard screen flash
          setShowFlash(true)
          setTimeout(() => {
            setShowFlash(false)
            setShowWakeUp(true)
          }, 500)
        }
      })
    }
  }, [currentPhase])

  useEffect(() => {
    return () => {
      if (typewriterRef.current) {
        clearTimeout(typewriterRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/audio/tense-horror-background.mp3")
      audioRef.current.loop = true
      audioRef.current.volume = 0.1
      audioRef.current.preload = "auto"

      if (audioEnabled) {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch((e) => {
            console.log("Audio autoplay failed:", e)
          })
        }
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      if (audioEnabled && !showWakeUp) {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch((e) => {
            console.log("Audio play failed:", e)
          })
        }
      } else {
        audioRef.current.pause()
      }
    }
  }, [audioEnabled, showWakeUp])

  // Hard screen flash
  if (showFlash) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-black text-4xl font-bold animate-pulse">WAKE UP</div>
      </div>
    )
  }

  // Wake up sequence
  if (showWakeUp) {
    return (
      <div className="min-h-screen bg-white text-black font-mono p-3 relative overflow-hidden transition-all duration-1000">
        {/* Bright daylight effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-100 via-white to-blue-100 opacity-90"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex items-center justify-center min-h-screen">
          <Card className="bg-white/90 border-gray-300 border-2 p-6 sm:p-8 max-w-2xl w-full shadow-xl">
            <div className="text-center space-y-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">TERMINAL AWAKENING</h1>

              <div className="text-gray-700 leading-relaxed text-base sm:text-lg space-y-4">
                <p className="font-bold">You wake up... drenched in sweat.</p>
                <p>Your phone buzzes.</p>
                <p className="text-red-600 font-bold">It's 7:54 AM.</p>
                <p>Your final semester exam starts at 9.</p>
                <p className="text-sm text-gray-500 mt-4">
                  Was it all just a dream? The investigation felt so real... But here you are, back in your dorm room,
                  with the familiar chaos of student life around you.
                </p>
                <p className="text-sm text-gray-500">
                  Your phone continues to buzz with notifications. The same endless stream of distractions that keep
                  humanity docile. But now you see them differently...
                </p>
              </div>

              <div className="space-y-4 animate-fade-in pt-6">
                <Button
                  onClick={onRestart}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold touch-action-manipulation"
                >
                  Restart Story
                </Button>

                <Button
                  onClick={() => window.close()}
                  variant="outline"
                  className="w-full border-gray-400 text-gray-600 hover:bg-gray-100 py-3 text-lg font-semibold touch-action-manipulation"
                >
                  Exit Terminal
                </Button>

                <div className="pt-4 border-t border-gray-300">
                  <Button
                    onClick={onToggleAudio}
                    variant="outline"
                    size="sm"
                    className={`w-full ${
                      audioEnabled
                        ? "border-green-500 text-green-600 hover:bg-green-50"
                        : "border-gray-400 text-gray-500 hover:bg-gray-50"
                    } transition-colors touch-action-manipulation`}
                  >
                    {audioEnabled ? (
                      <>
                        <Volume2 className="w-4 h-4 mr-2" />
                        Audio: ON
                      </>
                    ) : (
                      <>
                        <VolumeX className="w-4 h-4 mr-2" />
                        Audio: OFF
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <style jsx>{`
          .animate-fade-in {
            animation: fadeIn 2s ease-in;
          }
          
          @keyframes fadeIn {
            from { 
              opacity: 0; 
              transform: translateY(20px);
            }
            to { 
              opacity: 1; 
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    )
  }

  // Main revelation sequence
  return (
    <div className="min-h-screen bg-black text-white font-mono p-3 relative overflow-hidden transition-all duration-1000">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-90"></div>

      <div className="relative z-10 max-w-4xl mx-auto flex items-center justify-center min-h-screen">
        <Card className="bg-black/90 border-red-500 border-2 p-6 sm:p-8 max-w-2xl w-full shadow-xl">
          <div className="text-center space-y-6">
            <div className="text-red-400 leading-relaxed text-xl sm:text-2xl min-h-[200px] flex items-center justify-center">
              <div className="text-center">
                {displayedText}
                {isTyping && <span className="typewriter-cursor text-red-500">█</span>}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <style jsx>{`
        .typewriter-cursor {
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
