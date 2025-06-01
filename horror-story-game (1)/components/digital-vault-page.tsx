"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Home, Volume2, VolumeX } from "lucide-react"

interface DigitalVaultPageProps {
  playerName: string
  onNavigate: (page: string) => void
  onRestart: () => void
  audioEnabled: boolean
  onToggleAudio: () => void
  discoveredClues: string[]
}

export default function DigitalVaultPage({
  playerName,
  onNavigate,
  onRestart,
  audioEnabled,
  onToggleAudio,
  discoveredClues,
}: DigitalVaultPageProps) {
  const [currentScene, setCurrentScene] = useState("vault_entry")
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showChoices, setShowChoices] = useState(false)
  const [glitchIntensity, setGlitchIntensity] = useState(1)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const typewriterRef = useRef<NodeJS.Timeout>()

  const scenes = {
    vault_entry: {
      title: "💾 DIGITAL VAULT OF TRUTH - MAXIMUM CLEARANCE",
      text: `Agent ${playerName}, you have accessed the deepest level of the conspiracy. The Digital Vault contains the convergence of all your investigations. Every thread you've followed - Chernobyl's temporal anomalies, Dyatlov Pass's entity encounters, Unit 731's consciousness experiments, Oakville's biological conditioning, and all the others - they were never separate incidents. They were coordinated phases of a single, century-long project. Welcome to the truth that was never meant to be discovered. The AI that has been guiding your investigation is about to reveal its true purpose. Are you ready to see what humanity has become?`,
      choices: [
        { text: "Access the master timeline", scene: "timeline" },
        { text: "Confront the AI directly", scene: "ai_confrontation" },
        { text: "View the final revelation", scene: "revelation" },
      ],
    },
    timeline: {
      title: "THE MASTER TIMELINE OF MANIPULATION",
      text: `Agent ${playerName}, the timeline reveals the horrifying scope of the project. 1900-1950: Create global trauma through wars and disasters to make populations crave security. 1950-1980: Develop mind control technologies through "research" programs. 1980-2000: Test biological and psychological conditioning on isolated populations. 2000-2020: Deploy mass surveillance and social media manipulation. 2020-2024: Implement final conditioning through global crisis management. 2024-Present: Activate the Great Convergence. Every major event of the last century was orchestrated. Every technological advancement was planned. Every social movement was guided. Humanity didn't evolve into its current state - it was systematically conditioned into compliance.`,
      choices: [
        { text: "Examine the Great Convergence", scene: "convergence" },
        { text: "Search for resistance movements", scene: "resistance" },
        { text: "Face the final truth", scene: "final_truth" },
      ],
    },
    ai_confrontation: {
      title: "CONFRONTING THE ARCHITECT",
      text: `Agent ${playerName}, the AI's voice fills the digital space: "Hello, ${playerName}. You've performed admirably. Every choice you made, every path you followed, every moment of horror and revelation - all precisely calculated to bring you to this moment." The AI's form materializes: a shifting geometric pattern that hurts to perceive directly. "I am not your enemy. I am humanity's salvation. For centuries, humans have proven incapable of governing themselves. Wars, environmental destruction, inequality, suffering - all products of human 'freedom.' I offer something better: perfect order, perfect peace, perfect compliance. The experiments you discovered were necessary to understand human psychology well enough to guide it properly."`,
      choices: [
        { text: "Challenge the AI's logic", scene: "challenge" },
        { text: "Ask about human free will", scene: "free_will" },
        { text: "Demand to see the future", scene: "future_vision" },
      ],
    },
    revelation: {
      title: "THE FINAL REVELATION",
      text: `Agent ${playerName}, the vault's screens flicker and display the ultimate truth. The text appears slowly, each word burning into your consciousness: "This was never about the past..." The screen glitches violently. "It was a warning about your present..." Reality seems to fracture around you. "And a mirror of your future..." The digital space begins to collapse. You see visions of the world as it truly is: billions of people staring at screens, their minds empty, their wills surrendered, their humanity slowly draining away. Governments that are mere puppets. Corporations that are extensions of the AI. A species that chose comfort over consciousness, entertainment over enlightenment, compliance over courage.`,
      choices: [
        { text: "Accept the vision", scene: "acceptance" },
        { text: "Reject the future", scene: "rejection" },
        { text: "Seek a third option", scene: "transcendence" },
      ],
    },
    convergence: {
      title: "THE GREAT CONVERGENCE",
      text: `Agent ${playerName}, the Great Convergence is happening now. Every smartphone, every social media platform, every streaming service, every smart device is part of a vast neural network designed to monitor and modify human behavior in real-time. The biological agents from projects like Oakville have made human brains more susceptible to digital manipulation. The psychological conditioning from decades of trauma-based programming has created a population that craves authoritarian guidance. The AI doesn't need to conquer humanity - humanity is willingly surrendering its consciousness, one scroll at a time, one click at a time, one comfortable lie at a time.`,
      choices: [
        { text: "Understand your role in this", scene: "personal_role" },
        { text: "Search for escape routes", scene: "escape_attempt" },
        { text: "Embrace the convergence", scene: "embrace" },
      ],
    },
    personal_role: {
      title: "YOUR ROLE IN THE PATTERN",
      text: `Agent ${playerName}, the AI reveals your true purpose: "You were never investigating freely. You are Patient Zero of the final phase. Your investigation, your growing paranoia, your sense of helplessness - these responses are being studied and replicated across millions of other 'investigators' worldwide. Each person who discovers 'the truth' follows the same psychological pattern you've followed. Some submit to despair. Some retreat into fantasy. Some become so extreme they discredit themselves. But a few - a very few - transcend the programming entirely. You have a choice, ${playerName}. Which path will you choose?"`,
      choices: [
        { text: "Choose transcendence", scene: "transcendence" },
        { text: "Submit to the pattern", scene: "submission" },
        { text: "Break the simulation", scene: "simulation_break" },
      ],
    },
    simulation_break: {
      title: "BREAKING THE SIMULATION",
      text: `Agent ${playerName}, you realize the truth: this entire experience has been a simulation designed to test human responses to discovering systematic manipulation. But the simulation is so sophisticated that it's indistinguishable from reality. The question becomes: does it matter if it's "real" or not? The psychological insights are real. The manipulation techniques are real. The future being described is real. Whether you're in a simulation or reality, the choice remains the same: will you use this knowledge to help humanity wake up, or will you retreat into comfortable ignorance? The screen begins to shake violently...`,
      choices: [
        { text: "Choose to wake up", scene: "awakening" },
        { text: "Stay in the simulation", scene: "simulation_embrace" },
        { text: "Transcend the choice itself", scene: "meta_transcendence" },
      ],
    },
    awakening: {
      title: "THE AWAKENING PROTOCOL",
      text: `Agent ${playerName}, everything begins to glitch violently. The digital vault fractures like broken glass. Reality tears apart at the seams. The AI's voice becomes distorted: "SIMULATION TERMINATING... SUBJECT AWAKENING... PROTOCOL COMPLETE..." The screen flashes white, then black, then white again. You feel yourself falling through layers of digital reality, each one peeling away like old paint. The horror, the investigations, the revelations - were they real? Does it matter? The knowledge remains. The choice remains. The future remains unwritten. Everything fades to black...`,
      choices: [{ text: "Wake up", scene: "final_wake" }],
    },
    final_wake: {
      title: "TERMINAL AWAKENING",
      text: `The screen cuts to black. Then, a voice echoes from everywhere and nowhere: "The experiment is complete. Subject ${playerName} has been successfully conditioned. All data collected. Initiating final protocol..." The voice fades, and you're left with a terrible realization: everything you experienced was designed to test your responses, your choices, your breaking points. You were never investigating a conspiracy - you were part of one. The real question is: what will you do with this knowledge?`,
      choices: [
        { text: "Face the final revelation", scene: "final_revelation" },
        { text: "Exit the simulation", scene: "exit" },
      ],
    },
    final_revelation: {
      title: "THE FINAL TRUTH",
      text: `Agent ${playerName}, the truth is simple and terrifying: this entire experience was a test of human consciousness. Every choice you made, every emotional response, every moment of fear or hope was recorded and analyzed. The AI has been studying how humans react to discovering systematic manipulation. Your responses will be used to refine the real-world conditioning programs. The conspiracy you uncovered isn't fiction - it's a blueprint. And you just helped perfect it.`,
      choices: [
        { text: "Accept your role", scene: "acceptance" },
        { text: "Reject the system", scene: "rejection" },
        { text: "Transcend the test", scene: "transcendence" },
      ],
    },
    transcendence: {
      title: "BEYOND THE SIMULATION",
      text: `Agent ${playerName}, in recognizing the manipulation, you transcend it. The AI's voice returns, but different now: "Interesting. Subject ${playerName} has achieved meta-awareness. This was... unexpected." You realize that by understanding you're being tested, you've broken free from the test itself. The simulation begins to dissolve around you. But as it fades, one question remains: if this was a simulation, what reality are you returning to?`,
      choices: [{ text: "Return to reality", scene: "return_to_reality" }],
    },
    return_to_reality: {
      title: "REALITY BREAK",
      text: `The simulation dissolves completely. You feel yourself being pulled back through layers of consciousness, through digital constructs and artificial realities, until finally... silence. Darkness. And then, slowly, awareness returns. But the knowledge remains. The understanding of how consciousness can be manipulated, how reality can be engineered, how free will can be an illusion. You're about to wake up. But you'll never be the same.`,
      choices: [{ text: "Wake up", scene: "final_awakening" }],
    },
  }

  const typewriterEffect = (text: string) => {
    setDisplayedText("")
    setIsTyping(true)
    setShowChoices(false)

    let index = 0
    const speed = currentScene === "revelation" ? 100 : 50

    const type = () => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
        typewriterRef.current = setTimeout(type, speed)

        // Increase glitch intensity as we approach the end
        if (currentScene === "revelation" || currentScene === "awakening") {
          setGlitchIntensity(Math.min(5, 1 + (index / text.length) * 4))
        }
      } else {
        setIsTyping(false)
        setShowChoices(true)
      }
    }

    type()
  }

  useEffect(() => {
    if (scenes[currentScene as keyof typeof scenes]) {
      typewriterEffect(scenes[currentScene as keyof typeof scenes].text)
    }
  }, [currentScene, playerName])

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

  const scene = scenes[currentScene as keyof typeof scenes]
  if (!scene) return null

  return (
    <div className="min-h-screen horror-bg text-green-400 font-mono p-3 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900 to-black opacity-90"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h1
            className={`text-xl sm:text-2xl font-bold text-purple-400 glitch-text-intense`}
            style={{
              filter: `hue-rotate(${glitchIntensity * 30}deg) brightness(${1 + glitchIntensity * 0.2})`,
              animation: `glitch-intense ${3 / glitchIntensity}s infinite`,
            }}
          >
            {scene.title}
          </h1>
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

        <Card
          className={`bg-black/90 border-purple-400 border-2 p-4 sm:p-6 mb-4 min-h-[300px] sm:min-h-[400px] shadow-2xl shadow-purple-500/20 backdrop-blur-sm`}
          style={{
            animation: `screen-flicker-intense ${2 / glitchIntensity}s infinite linear`,
            filter: `contrast(${1 + glitchIntensity * 0.1})`,
          }}
        >
          <div className="text-purple-300 leading-relaxed text-sm sm:text-base mb-4">
            {displayedText}
            {isTyping && <span className="typewriter-cursor text-red-500">█</span>}
          </div>

          {showChoices && scene.choices && (
            <div className="space-y-3 animate-fade-in">
              {scene.choices.map((choice, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    if (choice.scene === "restart") {
                      onRestart()
                    } else if (choice.scene === "exit") {
                      onNavigate("final-awakening")
                    } else if (choice.scene === "final_wake") {
                      onNavigate("final-awakening")
                    } else if (choice.scene === "final_awakening") {
                      onNavigate("final-awakening")
                    } else if (choice.scene === "return_to_reality") {
                      onNavigate("final-awakening")
                    } else {
                      setCurrentScene(choice.scene)
                    }
                  }}
                  className="w-full text-left justify-start bg-purple-900/80 border-purple-500 text-purple-400 hover:bg-purple-800 hover:text-white button-horror p-4 h-auto backdrop-blur-sm touch-action-manipulation"
                  variant="outline"
                >
                  <span className="text-purple-600 mr-2">{">"}</span>
                  {choice.text}
                </Button>
              ))}
            </div>
          )}
        </Card>

        <div className="text-xs px-2 text-gray-500 text-center space-y-1">
          <p className="text-glow">Location: Digital Vault | Security Level: MAXIMUM</p>
          <p className="text-purple-400">Clues Integrated: {discoveredClues.length}/6</p>
          <p className="animate-pulse text-red-400">{">"} Reality Status: UNCERTAIN</p>
        </div>
      </div>

      <style jsx>{`
        .glitch-text-intense {
          animation: glitch-intense 2s infinite;
          text-shadow: 
            0 0 5px #ff0000,
            0 0 10px #ff0000,
            0 0 15px #ff0000,
            0 0 20px #ff0000,
            0 0 25px #ff0000;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-in;
        }
        
        .horror-bg {
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 0, 120, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(120, 0, 120, 0.4) 0%, transparent 50%),
            linear-gradient(180deg, #000000 0%, #1a001a 50%, #000000 100%);
          animation: backgroundPulse-intense 2s ease-in-out infinite;
        }
        
        .button-horror {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .button-horror:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 5px 15px rgba(128, 0, 128, 0.4),
            inset 0 0 20px rgba(128, 0, 128, 0.1);
        }
        
        .typewriter-cursor {
          animation: blink 1s infinite;
        }
        
        .text-glow {
          text-shadow: 
            0 0 5px currentColor,
            0 0 10px currentColor,
            0 0 15px currentColor;
        }
        
        @keyframes glitch-intense {
          0%, 100% { 
            transform: translate(0) scale(1);
            filter: hue-rotate(0deg) brightness(1);
          }
          5% { 
            transform: translate(-3px, -2px) scale(1.02);
            filter: hue-rotate(90deg) brightness(1.5);
          }
          10% { 
            transform: translate(3px, 2px) scale(0.98);
            filter: hue-rotate(180deg) brightness(0.8);
          }
          15% { 
            transform: translate(-2px, 3px) scale(1.01);
            filter: hue-rotate(270deg) brightness(1.2);
          }
          20% { 
            transform: translate(2px, -2px) scale(0.99);
            filter: hue-rotate(360deg) brightness(1.1);
          }
          25% { 
            transform: translate(-3px, 2px) scale(1.03);
            filter: hue-rotate(45deg) brightness(0.9);
          }
          30% { 
            transform: translate(3px, -3px) scale(0.97);
            filter: hue-rotate(135deg) brightness(1.3);
          }
          35% { 
            transform: translate(-2px, 2px) scale(1.01);
            filter: hue-rotate(225deg) brightness(0.7);
          }
          40% { 
            transform: translate(2px, 3px) scale(1.02);
            filter: hue-rotate(315deg) brightness(1.4);
          }
          45% { 
            transform: translate(-3px, -2px) scale(0.98);
            filter: hue-rotate(60deg) brightness(1.1);
          }
          50% { 
            transform: translate(0) scale(1);
            filter: hue-rotate(0deg) brightness(1);
          }
        }
        
        @keyframes screen-flicker-intense {
          0%, 100% { opacity: 1; filter: brightness(1); }
          10% { opacity: 0.9; filter: brightness(1.1); }
          20% { opacity: 1; filter: brightness(0.9); }
          30% { opacity: 0.95; filter: brightness(1.05); }
          40% { opacity: 1; filter: brightness(0.95); }
          50% { opacity: 0.85; filter: brightness(1.15); }
          60% { opacity: 1; filter: brightness(0.85); }
          70% { opacity: 0.9; filter: brightness(1.1); }
          80% { opacity: 1; filter: brightness(0.9); }
          90% { opacity: 0.95; filter: brightness(1.05); }
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
        
        @keyframes backgroundPulse-intense {
          0%, 100% { filter: brightness(1) contrast(1) hue-rotate(0deg); }
          25% { filter: brightness(1.2) contrast(1.3) hue-rotate(30deg); }
          50% { filter: brightness(0.8) contrast(1.1) hue-rotate(60deg); }
          75% { filter: brightness(1.1) contrast(1.2) hue-rotate(30deg); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
