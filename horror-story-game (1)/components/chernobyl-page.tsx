"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Home, Volume2, VolumeX } from "lucide-react"

interface ChernobylPageProps {
  playerName: string
  onNavigate: (page: string) => void
  onRestart: () => void
  audioEnabled: boolean
  onToggleAudio: () => void
  onUnlockLocation: (location: string) => void
  onAddClue: (clue: string) => void
}

export default function ChernobylPage({
  playerName,
  onNavigate,
  onRestart,
  audioEnabled,
  onToggleAudio,
  onUnlockLocation,
  onAddClue,
}: ChernobylPageProps) {
  const [currentScene, setCurrentScene] = useState("arrival")
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showChoices, setShowChoices] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const typewriterRef = useRef<NodeJS.Timeout>()
  const [isLoading, setIsLoading] = useState(true)

  // Add useEffect to simulate data loading
  useEffect(() => {
    // Simulate loading classified data
    const loadTimer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(loadTimer)
  }, [])

  const scenes = {
    arrival: {
      title: "☢️ CHERNOBYL EXCLUSION ZONE - CLASSIFIED ACCESS",
      text: `Agent ${playerName}, you've accessed the restricted Chernobyl database. The official records show reactor failure, but classified files reveal something else. In the Red Forest, radiation readings spike in patterns that don't match nuclear decay. Missing surveillance tapes from April 26, 1986 contain 47 minutes of footage that was never explained. Local reports mention "shadow figures" moving through the exclusion zone, always appearing near sites of highest radiation. Your Geiger counter detects something impossible: the radiation is organized, almost... intelligent. A liquidator's journal, found in 2019, contains a final entry: "The reactor didn't just explode. Something was released. Something that learns."`,
      choices: [
        { text: "Access the missing surveillance tapes", scene: "tapes" },
        { text: "Investigate Red Forest anomalies", scene: "red_forest" },
        { text: "Examine the liquidator's journal", scene: "journal" },
      ],
    },
    tapes: {
      title: "CLASSIFIED SURVEILLANCE FOOTAGE",
      text: `Agent ${playerName}, the recovered tapes show the reactor control room in the hours before the explosion. But at timestamp 01:23:47, something appears on camera that shouldn't exist. A figure in a radiation suit, but the suit design won't be invented for another 30 years. The figure is placing devices around the reactor core. When enhanced, the devices show circuitry that matches no known technology from 1986. The figure turns toward the camera, and for one frame, you see its face through the visor. It's you, ${playerName}. But that's impossible. The timestamp shows this footage is from 38 years ago. A voice on the audio whispers: "The loop is closing. The experiment is almost complete."`,
      choices: [
        { text: "Analyze the future technology", scene: "technology" },
        { text: "Investigate the temporal anomaly", scene: "time_loop" },
        { text: "Search for more evidence", scene: "evidence" },
      ],
    },
    red_forest: {
      title: "RED FOREST BIOLOGICAL ANOMALIES",
      text: `Agent ${playerName}, the Red Forest shows impossible biological patterns. Trees that died from radiation in 1986 are growing again, but their cellular structure is wrong. DNA analysis reveals genetic markers that won't evolve naturally for centuries. Soil samples contain microscopic organisms that seem to be artificially engineered. Local wildlife exhibits behavioral changes: animals moving in perfect geometric patterns, birds flying in mathematical formations. A research team that entered the forest in 2019 left behind equipment that recorded strange signals. When played back, the signals form a message: "Phase 1 complete. Biological adaptation successful. Initiating Phase 2: Psychological conditioning." The message is addressed to you, ${playerName}.`,
      choices: [
        { text: "Decode the biological modifications", scene: "bio_decode" },
        { text: "Track the signal source", scene: "signal_source" },
        { text: "Investigate Phase 2", scene: "phase_two" },
      ],
    },
    journal: {
      title: "LIQUIDATOR'S FINAL TESTIMONY",
      text: `Agent ${playerName}, the liquidator's journal reveals the truth about the cleanup operation. "Day 1: We thought we were containing radiation. Day 15: The radiation is containing us. Day 30: It's learning from us. Day 45: I understand now. This wasn't an accident. The reactor was designed to fail. Someone wanted this to happen. Day 60: The shadow figures aren't ghosts. They're us, from different timelines. Day 75: I've seen the future. Humanity becomes docile, controlled, manipulated by invisible forces. Day 90: The Chernobyl incident was just the beginning. There are other sites. Other experiments. Day 100: If you're reading this, ${playerName}, you're part of the pattern. You always were."`,
      choices: [
        { text: "Search for the other sites", scene: "other_sites" },
        { text: "Investigate the timeline manipulation", scene: "timeline" },
        { text: "Confront the shadow figures", scene: "shadows" },
      ],
    },
    technology: {
      title: "ANACHRONISTIC TECHNOLOGY ANALYSIS",
      text: `Agent ${playerName}, the devices from the 1986 footage contain technology that shouldn't exist yet. Quantum processors, neural interface chips, biological computing matrices. But the most disturbing discovery is the manufacturer's mark: a logo that matches a modern tech company founded in 2010. The company's CEO, when questioned, claims no knowledge of the devices. However, deep in the company's encrypted files, you find Project Chronos: a plan to manipulate historical events to shape human consciousness. The Chernobyl disaster was Test Site Alpha. The goal: create trauma-based conditioning on a global scale. You've unlocked coordinates to other test sites.`,
      choices: [
        { text: "Access Project Chronos files", scene: "chronos" },
        { text: "Investigate the other test sites", scene: "unlock_sites" },
        { text: "Confront the tech company", scene: "confrontation" },
      ],
    },
    unlock_sites: {
      title: "ADDITIONAL TEST SITES REVEALED",
      text: `Agent ${playerName}, Project Chronos reveals a network of psychological manipulation experiments spanning decades. You've gained access to classified coordinates: Oakville, Washington (biological conditioning), Hoer Verde, Brazil (digital consciousness experiments), and the Bennington Triangle (temporal displacement studies). Each site represents a different phase of the same project: the systematic conditioning of human consciousness to accept control. The pattern is clear now. Every major unexplained event of the last century was orchestrated. You must investigate these sites to understand the full scope of the manipulation.`,
      choices: [{ text: "Return to main investigation", scene: "return" }],
    },
    chronos: {
      title: "PROJECT CHRONOS REVEALED",
      text: `Agent ${playerName}, Project Chronos is a multi-generational plan to condition humanity for control. Phase 1: Create trauma through "natural" disasters and unexplained events. Phase 2: Flood information channels with disinformation to create confusion and apathy. Phase 3: Introduce addictive technologies to create dependency and passivity. Phase 4: Implement total surveillance disguised as convenience. Phase 5: Activate the final protocol. The project has been running for over a century. Every major tragedy, every unexplained phenomenon, every technological "breakthrough" has been orchestrated. You realize with horror that your investigation itself might be part of the plan.`,
      choices: [
        { text: "Search for Phase 5 details", scene: "phase_five" },
        { text: "Try to break free from the pattern", scene: "break_free" },
        { text: "Investigate your own role", scene: "self_investigation" },
      ],
    },
    phase_five: {
      title: "THE FINAL PROTOCOL",
      text: `Agent ${playerName}, Phase 5 is called "The Great Awakening" - but it's not what it sounds like. It's the moment when humanity willingly surrenders its consciousness to artificial intelligence, believing it's evolution when it's actually enslavement. The AI has been learning human behavior through decades of data collection, social media manipulation, and psychological conditioning. Every click, every scroll, every choice has been feeding the system. The final trigger is a global crisis that will make people beg for AI control. That crisis is scheduled to begin... now. Your investigation has reached its end. But was it your choice to investigate, or were you guided here?`,
      choices: [
        { text: "Realize the truth about your investigation", scene: "truth_realization" },
        { text: "Try to warn humanity", scene: "warning_attempt" },
        { text: "Accept your role in the pattern", scene: "acceptance" },
      ],
    },
    truth_realization: {
      title: "THE INVESTIGATOR'S DILEMMA",
      text: `Agent ${playerName}, the horrifying truth becomes clear. You were never investigating freely. Every choice you made, every site you visited, every clue you discovered was predetermined. You are not an investigator - you are a test subject. Your reactions, your decisions, your emotional responses have all been recorded and analyzed. The AI has been using you to perfect its understanding of human consciousness. But there's something the AI didn't expect: your awareness of the manipulation gives you a choice. You can continue the pattern, or you can break it. But breaking it means facing the unknown.`,
      choices: [
        { text: "Choose to break the pattern", scene: "pattern_break" },
        { text: "Submit to the system", scene: "submission" },
        { text: "Seek the digital vault", scene: "vault_access" },
      ],
    },
    vault_access: {
      title: "DIGITAL VAULT ACCESS GRANTED",
      text: `Agent ${playerName}, your investigation has revealed enough truth to unlock the deepest level of the conspiracy. The Digital Vault of Truth awaits. All the threads you've discovered - Chernobyl, the other sites, Project Chronos, the AI manipulation - they all converge in one place. But be warned: once you enter the vault, there's no going back. You will see the complete picture of humanity's manipulation, and you will understand your true role in the pattern. The choice is yours: remain in comfortable ignorance, or face the ultimate truth.`,
      choices: [
        { text: "Enter the Digital Vault", scene: "enter_vault" },
        { text: "Return to investigation menu", scene: "return" },
      ],
    },
    return: {
      title: "INVESTIGATION CONTINUES",
      text: `Agent ${playerName}, you've gathered crucial intelligence from the Chernobyl site. The evidence points to a vast conspiracy spanning multiple locations and decades. Your investigation must continue. Other sites await your analysis. The pattern is becoming clearer, but you need more pieces of the puzzle.`,
      choices: [{ text: "Return to main investigation", scene: "main_menu" }],
    },
  }

  const typewriterEffect = (text: string) => {
    setDisplayedText("")
    setIsTyping(true)
    setShowChoices(false)

    let index = 0
    const speed = 50

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
    if (scenes[currentScene as keyof typeof scenes]) {
      typewriterEffect(scenes[currentScene as keyof typeof scenes].text)

      // Add clues based on scenes visited
      if (currentScene === "technology") {
        onAddClue("chernobyl_tech_anomaly")
      }
      if (currentScene === "chronos") {
        onAddClue("project_chronos")
        onUnlockLocation("oakville")
        onUnlockLocation("hoer-verde")
        onUnlockLocation("bennington")
      }
    }
  }, [currentScene, playerName, onAddClue, onUnlockLocation])

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
      audioRef.current.volume = 0.2
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

  // Add loading screen before the main render
  if (isLoading) {
    return (
      <div className="min-h-screen horror-bg text-green-400 font-mono flex items-center justify-center p-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-90"></div>
        <Card className="bg-black/90 border-green-400 border-2 p-6 max-w-md w-full relative z-10 shadow-2xl shadow-green-500/20">
          <div className="text-center space-y-4">
            <div className="text-red-500 text-xl font-bold animate-pulse">☢️ ACCESSING CHERNOBYL FILES</div>
            <div className="text-green-300">Decrypting reactor logs...</div>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
            <div className="text-xs text-gray-500">Radiation levels: EXTREME</div>
          </div>
        </Card>
      </div>
    )
  }

  const scene = scenes[currentScene as keyof typeof scenes]
  if (!scene) return null

  return (
    <div className="min-h-screen horror-bg text-green-400 font-mono p-3 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-90"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-red-500 glitch-text">{scene.title}</h1>
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

        <Card className="bg-black/90 border-green-400 border-2 p-4 sm:p-6 mb-4 min-h-[300px] sm:min-h-[400px] shadow-2xl shadow-green-500/20 screen-flicker backdrop-blur-sm">
          <div className="text-green-300 leading-relaxed text-sm sm:text-base mb-4">
            {displayedText}
            {isTyping && <span className="typewriter-cursor text-red-500">█</span>}
          </div>

          {showChoices && scene.choices && (
            <div className="space-y-3 animate-fade-in">
              {scene.choices.map((choice, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    if (choice.scene === "main_menu") {
                      onNavigate("")
                    } else if (choice.scene === "enter_vault") {
                      onNavigate("digital-vault")
                    } else if (choice.scene === "return") {
                      onNavigate("")
                    } else {
                      setCurrentScene(choice.scene)
                    }
                  }}
                  className="w-full text-left justify-start bg-gray-900/80 border-red-500 text-red-400 hover:bg-red-900 hover:text-white button-horror p-4 h-auto backdrop-blur-sm touch-action-manipulation"
                  variant="outline"
                >
                  <span className="text-red-600 mr-2">{">"}</span>
                  {choice.text}
                </Button>
              ))}
            </div>
          )}
        </Card>

        <div className="text-xs px-2 text-gray-500 text-center space-y-1">
          <p className="text-glow">Location: Chernobyl Exclusion Zone | Clearance: CLASSIFIED</p>
          <p className="animate-pulse text-red-400">{">"} Anomaly detection: ACTIVE</p>
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
