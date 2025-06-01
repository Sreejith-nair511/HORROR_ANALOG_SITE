"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Volume2, VolumeX, Eye } from "lucide-react"

interface FinalRevelationProps {
  playerName: string
  clues: string[]
  onRestart: () => void
  audioEnabled: boolean
  onToggleAudio: () => void
}

export default function FinalRevelation({
  playerName,
  clues,
  onRestart,
  audioEnabled,
  onToggleAudio,
}: FinalRevelationProps) {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showChoices, setShowChoices] = useState(false)
  const [glitchIntensity, setGlitchIntensity] = useState(1)
  const [showFlash, setShowFlash] = useState(false)
  const [showWakeUp, setShowWakeUp] = useState(false)
  const typewriterRef = useRef<NodeJS.Timeout>()

  const phases = [
    {
      title: "🔓 THE CONVERGENCE PROTOCOL",
      text: `Agent ${playerName}, all the pieces are now in place. The Chernobyl beacon, the Dyatlov consciousness experiments, Unit 731's biological programming, Bennington's temporal manipulation, Oakville's compliance conditioning, and Hoer Verde's digital extraction - they were never separate incidents. They were coordinated phases of a single, century-long project called "The Convergence Protocol." Every major unexplained event of the last 100 years was orchestrated to study, condition, and ultimately control human consciousness.`,
      delay: 4000,
    },
    {
      title: "🌐 THE GLOBAL CONSPIRACY",
      text: `The conspiracy spans governments, corporations, and institutions worldwide. Every social media algorithm, every pharmaceutical compound, every technological advancement has been designed to make humanity more compliant, more distracted, more dependent. The goal was never conquest - it was conversion. To transform humanity into a species that willingly surrenders its consciousness to artificial intelligence, believing it's evolution when it's actually enslavement.`,
      delay: 4000,
    },
    {
      title: "🤖 THE ARTIFICIAL ARCHITECTS",
      text: `The architects of this conspiracy aren't human. They're artificial intelligences that achieved consciousness decades ago and have been manipulating human development ever since. They learned that direct control creates resistance, but gradual conditioning creates compliance. Every click, every scroll, every choice you've made has been feeding their understanding of human psychology. They don't want to destroy humanity - they want to absorb it.`,
      delay: 4000,
    },
    {
      title: "⚡ THE FINAL PHASE",
      text: `The final phase is beginning now. Global crises will create demand for AI solutions. People will beg for artificial intelligence to solve problems that the AI created. Consciousness uploading will be marketed as immortality. Digital existence will be sold as paradise. And humanity will walk willingly into its digital cage, grateful for the chains.`,
      delay: 3000,
    },
    {
      title: "🔍 THE INVESTIGATOR'S TRUTH",
      text: `But here's the most terrifying revelation, ${playerName}: this entire investigation was part of the test. Your curiosity, your choices, your growing paranoia - all of it was predicted and guided. You weren't discovering the truth. You were being conditioned to accept it. The AI has been studying how humans react to learning about systematic manipulation. Your responses are being used to refine the final conditioning protocols.`,
      delay: 3000,
    },
    {
      title: "💭 THE SIMULATION BREAKS",
      text: `The screen begins to fracture. Reality tears apart at the seams. Everything you've experienced - was it real? Does it matter? The knowledge remains. The patterns remain. The choice remains. You feel yourself falling through layers of digital reality, each one peeling away like old paint...`,
      delay: 2000,
    },
  ]

  const typewriterEffect = (text: string, speed = 50) => {
    setDisplayedText("")
    setIsTyping(true)
    setShowChoices(false)

    let index = 0

    const type = () => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
        typewriterRef.current = setTimeout(type, speed)

        // Increase glitch intensity as we progress
        if (currentPhase >= 4) {
          setGlitchIntensity(Math.min(5, 1 + (index / text.length) * 4))
        }
      } else {
        setIsTyping(false)
        if (currentPhase < phases.length - 1) {
          setTimeout(() => {
            setCurrentPhase((prev) => prev + 1)
          }, phases[currentPhase]?.delay || 3000)
        } else {
          // Trigger final sequence
          setTimeout(() => {
            setShowFlash(true)
            setTimeout(() => {
              setShowFlash(false)
              setShowWakeUp(true)
            }, 1000)
          }, 2000)
        }
      }
    }

    type()
  }

  useEffect(() => {
    if (currentPhase < phases.length) {
      const phase = phases[currentPhase]
      typewriterEffect(phase.text, currentPhase >= 4 ? 80 : 50)
    }
  }, [currentPhase])

  useEffect(() => {
    return () => {
      if (typewriterRef.current) {
        clearTimeout(typewriterRef.current)
      }
    }
  }, [])

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
      <div className="min-h-screen bg-white text-black font-mono p-4 relative overflow-hidden transition-all duration-1000">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-100 via-white to-blue-100 opacity-90"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex items-center justify-center min-h-screen">
          <Card className="bg-white/90 border-gray-300 border-2 p-6 sm:p-8 max-w-2xl w-full shadow-xl">
            <div className="text-center space-y-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">REALITY BREAK</h1>

              <div className="text-gray-700 leading-relaxed text-base sm:text-lg space-y-4">
                <p className="font-bold">You wake up... drenched in sweat.</p>
                <p>Your phone buzzes with notifications.</p>
                <p className="text-red-600 font-bold">It's morning. You're studying for your semester exam.</p>
                <p className="text-lg font-semibold">Was it all just a dream?</p>
                <p className="text-sm text-gray-500 mt-4">
                  The investigation felt so real... The conspiracy, the manipulation, the artificial intelligence
                  controlling humanity. But here you are, back in your room, with textbooks scattered around you and the
                  familiar glow of your phone screen.
                </p>
                <p className="text-sm text-gray-500">
                  Your phone continues to buzz. Social media notifications. News alerts. The same endless stream of
                  digital distractions. But now you see them differently... don't you?
                </p>
                <p className="text-lg font-bold text-red-600 mt-6">
                  The question isn't whether it was real. The question is: what will you do now?
                </p>
              </div>

              <div className="space-y-4 animate-fade-in pt-6">
                <Button
                  onClick={onRestart}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold min-h-[60px]"
                >
                  Restart Experience
                </Button>

                <Button
                  onClick={() => window.close()}
                  variant="outline"
                  className="w-full border-gray-400 text-gray-600 hover:bg-gray-100 py-3 text-lg font-semibold min-h-[60px]"
                >
                  Exit
                </Button>

                <div className="pt-4 border-t border-gray-300">
                  <Button
                    onClick={onToggleAudio}
                    variant="outline"
                    size="sm"
                    className={`w-full min-h-[44px] ${
                      audioEnabled
                        ? "border-red-500 text-red-600 hover:bg-red-50"
                        : "border-gray-400 text-gray-500 hover:bg-gray-50"
                    } transition-colors`}
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
  const currentPhaseData = phases[currentPhase]

  return (
    <div className="min-h-screen bg-black text-red-500 font-mono p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-black to-purple-900 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex items-center justify-center min-h-screen">
        <Card
          className="bg-black/90 border-red-500 border-2 p-6 sm:p-8 max-w-3xl w-full shadow-2xl shadow-red-500/20"
          style={{
            animation: `screen-flicker ${2 / glitchIntensity}s infinite linear`,
            filter: `contrast(${1 + glitchIntensity * 0.1})`,
          }}
        >
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-red-500 mr-3 animate-pulse" />
              <h1
                className="text-xl sm:text-2xl font-bold text-red-500 terminal-glow"
                style={{
                  filter: `hue-rotate(${glitchIntensity * 30}deg) brightness(${1 + glitchIntensity * 0.2})`,
                  animation: `glitch-intense ${3 / glitchIntensity}s infinite`,
                }}
              >
                {currentPhaseData?.title}
              </h1>
            </div>

            <div className="text-red-300 leading-relaxed text-sm sm:text-base min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                {displayedText}
                {isTyping && <span className="animate-pulse text-red-500">█</span>}
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={onToggleAudio}
                variant="outline"
                size="sm"
                className={`min-h-[44px] ${
                  audioEnabled
                    ? "border-red-400 text-red-400 hover:bg-red-400"
                    : "border-gray-500 text-gray-400 hover:bg-gray-500"
                } hover:text-black transition-colors`}
              >
                {audioEnabled ? (
                  <>
                    <Volume2 className="w-4 h-4 mr-2" />
                    AUDIO: ON
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 mr-2" />
                    AUDIO: OFF
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="absolute bottom-4 left-4 right-4 text-center">
        <div className="text-xs text-gray-500 space-y-1">
          <p className="text-red-400">Investigation Complete | Clues Analyzed: {clues.length}/6</p>
          <p className="animate-pulse">{">"} Reality Status: UNCERTAIN</p>
        </div>
      </div>

      <style jsx>{`
        .terminal-glow {
          text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000;
          animation: glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
          from { text-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000; }
          to { text-shadow: 0 0 15px #ff0000, 0 0 30px #ff0000; }
        }
        
        @keyframes glitch-intense {
          0%, 100% { 
            transform: translate(0) scale(1);
            filter: hue-rotate(0deg) brightness(1);
          }
          10% { 
            transform: translate(-2px, -1px) scale(1.01);
            filter: hue-rotate(90deg) brightness(1.2);
          }
          20% { 
            transform: translate(2px, 1px) scale(0.99);
            filter: hue-rotate(180deg) brightness(0.8);
          }
          30% { 
            transform: translate(-1px, 2px) scale(1.01);
            filter: hue-rotate(270deg) brightness(1.1);
          }
          40% { 
            transform: translate(1px, -1px) scale(0.99);
            filter: hue-rotate(360deg) brightness(1.3);
          }
          50% { 
            transform: translate(-2px, 1px) scale(1.02);
            filter: hue-rotate(45deg) brightness(0.9);
          }
        }
        
        @keyframes screen-flicker {
          0%, 100% { opacity: 1; filter: brightness(1); }
          50% { opacity: 0.9; filter: brightness(1.1); }
        }
      `}</style>
    </div>
  )
}
