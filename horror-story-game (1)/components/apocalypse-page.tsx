"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Home, Volume2, VolumeX } from "lucide-react"

interface ApocalypsePageProps {
  playerName: string
  onNavigate: (page: string) => void
  onRestart: () => void
  audioEnabled: boolean
  onToggleAudio: () => void
}

export default function ApocalypsePage({
  playerName,
  onNavigate,
  onRestart,
  audioEnabled,
  onToggleAudio,
}: ApocalypsePageProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showChoices, setShowChoices] = useState(false)
  const typewriterRef = useRef<NodeJS.Timeout>()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const apocalypseText = `${playerName}, you open your eyes. December 15, 2024, 5:47 AM. Your end semester exams begin in 1 hour and 13 minutes. But the visions cling to you like radiation, like frost, like the weight of a thousand trapped souls. You look around your dorm room - textbooks scattered, energy drinks empty, the detritus of a generation that inherited a dying world. Outside your window, you see them: other students in their rooms, faces glowing blue from screens, scrolling endlessly while democracy dies around them. The entity's words echo in your mind: "Your generation had the tools to save the world, but you chose distraction over action." Your phone buzzes with notifications - another climate disaster ignored, another election manipulated, another tragedy that will be forgotten in tomorrow's news cycle. The apocalypse isn't coming, ${playerName}. It's here. It's in every ignored notification, every accepted lie, every chosen comfort over courage. The question isn't whether the world will end. The question is whether you'll help save it or help destroy it. Your exams await. Your choice awaits. Your future awaits.`

  const typewriterEffect = (text: string) => {
    setDisplayedText("")
    setIsTyping(true)
    setShowChoices(false)

    let index = 0
    const speed = 60

    const type = () => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
        typewriterRef.current = setTimeout(type, speed)
      } else {
        setIsTyping(false)
        setShowChoices(true)
      }
    }

    type()
  }

  useEffect(() => {
    typewriterEffect(apocalypseText)
  }, [playerName])

  useEffect(() => {
    return () => {
      if (typewriterRef.current) {
        clearTimeout(typewriterRef.current)
      }
    }
  }, [])

  useEffect(() => {
    // Initialize audio for this page
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/audio/tense-horror-background.mp3")
      audioRef.current.loop = true
      audioRef.current.volume = 0.3
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
      if (audioEnabled) {
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
  }, [audioEnabled])

  return (
    <div className="min-h-screen horror-bg text-green-400 font-mono p-3 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-90"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-3 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-red-500 glitch-text">🌍 THE FINAL AWAKENING</h1>
          <div className="flex gap-2">
            <Button
              onClick={() => onNavigate("")}
              variant="outline"
              size="sm"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black touch-action-manipulation"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button
              onClick={onRestart}
              variant="outline"
              size="sm"
              className="border-red-400 text-red-400 hover:bg-red-400 hover:text-black touch-action-manipulation"
            >
              <Home className="w-4 h-4" />
            </Button>
            <Button
              onClick={onToggleAudio}
              variant="outline"
              size="sm"
              className={`${
                audioEnabled
                  ? "border-green-400 text-green-400 hover:bg-green-400"
                  : "border-gray-500 text-gray-400 hover:bg-gray-500"
              } hover:text-black touch-action-manipulation`}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <Card className="bg-black/90 border-green-400 border-2 p-4 sm:p-6 mb-3 sm:mb-6 min-h-[300px] sm:min-h-[400px] shadow-2xl shadow-green-500/20 screen-flicker backdrop-blur-sm">
          <div className="text-green-300 leading-relaxed text-sm sm:text-base mb-3 sm:mb-6">
            {displayedText}
            {isTyping && <span className="typewriter-cursor text-red-500">█</span>}
          </div>

          {showChoices && (
            <div className="space-y-3 animate-fade-in">
              <Button
                onClick={onRestart}
                className="w-full text-left justify-start bg-gray-900/80 border-red-500 text-red-400 hover:bg-red-900 hover:text-white button-horror p-4 h-auto backdrop-blur-sm touch-action-manipulation"
                variant="outline"
              >
                <span className="text-red-600 mr-2">{">"}</span>
                Choose your path: Begin again with new knowledge
              </Button>

              <Button
                onClick={() => window.close()}
                className="w-full text-left justify-start bg-gray-900/80 border-yellow-500 text-yellow-400 hover:bg-yellow-900 hover:text-white button-horror p-4 h-auto backdrop-blur-sm touch-action-manipulation"
                variant="outline"
              >
                <span className="text-yellow-600 mr-2">{">"}</span>
                Close this window and face reality
              </Button>
            </div>
          )}
        </Card>

        <div className="text-xs text-gray-500 text-center space-y-1">
          <p className="text-glow">Reality Status: AWAKENED | Time: December 15, 2024, 5:47 AM</p>
          <p className="animate-pulse text-red-400">{">"} End semester exams begin in: 1 hour 13 minutes</p>
          <p className="text-yellow-400">The choice is yours, {playerName}. What will you do?</p>
        </div>
      </div>

      <style jsx>{`
        .glitch-text {
          animation: glitch 3s infinite;
          text-shadow: 
            0 0 5px #ff0000,
            0 0 10px #ff0000,
            0 0 15px #ff0000,
            0 0 20px #ff0000;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-in;
        }
        
        .horror-bg {
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 0, 0, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(120, 0, 0, 0.3) 0%, transparent 50%),
            linear-gradient(180deg, #000000 0%, #1a0000 50%, #000000 100%);
          animation: backgroundPulse 4s ease-in-out infinite;
        }
        
        .button-horror {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .button-horror:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 5px 15px rgba(255, 0, 0, 0.4),
            inset 0 0 20px rgba(255, 0, 0, 0.1);
        }
        
        .typewriter-cursor {
          animation: blink 1s infinite;
        }
        
        .screen-flicker {
          animation: flicker 0.15s infinite linear;
        }
        
        .text-glow {
          text-shadow: 
            0 0 5px currentColor,
            0 0 10px currentColor,
            0 0 15px currentColor;
        }
        
        @keyframes glitch {
          0%, 100% { 
            transform: translate(0);
            filter: hue-rotate(0deg);
          }
          10% { 
            transform: translate(-2px, -1px);
            filter: hue-rotate(90deg);
          }
          20% { 
            transform: translate(2px, 1px);
            filter: hue-rotate(180deg);
          }
          30% { 
            transform: translate(-1px, 2px);
            filter: hue-rotate(270deg);
          }
          40% { 
            transform: translate(1px, -1px);
            filter: hue-rotate(360deg);
          }
          50% { 
            transform: translate(-2px, 1px);
            filter: hue-rotate(90deg);
          }
          60% { 
            transform: translate(2px, -2px);
            filter: hue-rotate(180deg);
          }
          70% { 
            transform: translate(-1px, 1px);
            filter: hue-rotate(270deg);
          }
          80% { 
            transform: translate(1px, 2px);
            filter: hue-rotate(360deg);
          }
          90% { 
            transform: translate(-2px, -1px);
            filter: hue-rotate(90deg);
          }
        }
        
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95);
            filter: blur(2px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        
        @keyframes backgroundPulse {
          0%, 100% { filter: brightness(1) contrast(1); }
          50% { filter: brightness(1.1) contrast(1.2); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}
