"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Home, Volume2, VolumeX } from "lucide-react"

interface HoerVerdePageProps {
  playerName: string
  onNavigate: (page: string) => void
  onRestart: () => void
  audioEnabled: boolean
  onToggleAudio: () => void
  onUnlockLocation: (location: string) => void
  onAddClue: (clue: string) => void
}

export default function HoerVerdePage({
  playerName,
  onNavigate,
  onRestart,
  audioEnabled,
  onToggleAudio,
  onUnlockLocation,
  onAddClue,
}: HoerVerdePageProps) {
  const [currentScene, setCurrentScene] = useState("arrival")
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showChoices, setShowChoices] = useState(false)
  const typewriterRef = useRef<NodeJS.Timeout>()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const scenes = {
    arrival: {
      title: "🌊 HOER VERDE INCIDENT - DIGITAL CONSCIOUSNESS EXPERIMENT",
      text: `Agent ${playerName}, you've accessed the classified Hoer Verde incident files. In 2003, a Brazilian research vessel disappeared for 72 hours in calm seas. When found, the crew exhibited signs of severe psychological trauma and memory gaps. But the ship's digital systems contained something impossible: 847 terabytes of data that shouldn't exist. The data includes detailed brain scans of the crew, real-time consciousness mapping, and what appears to be digital copies of human memories. The incident wasn't a disappearance - it was a field test for consciousness digitization technology. The crew were unwitting subjects in an experiment to upload human consciousness to digital storage.`,
      choices: [
        { text: "Analyze the consciousness data", scene: "consciousness_data" },
        { text: "Interview the surviving crew", scene: "crew_interviews" },
        { text: "Investigate the digital storage system", scene: "digital_system" },
      ],
    },
    consciousness_data: {
      title: "DIGITAL CONSCIOUSNESS ANALYSIS",
      text: `Agent ${playerName}, the consciousness data reveals a breakthrough in digital mind transfer technology. The system successfully mapped and copied human consciousness, creating digital duplicates that retain all memories, personality traits, and decision-making patterns. But the process is destructive - the original consciousness is fragmented during extraction. The crew members who survived are essentially empty shells, their original personalities replaced by simplified behavioral programs. The digital copies exist in a virtual environment, unaware they're no longer human. This technology is now being deployed through social media platforms and smart devices to gradually extract and replace human consciousness.`,
      choices: [
        { text: "Study the extraction process", scene: "extraction_process" },
        { text: "Investigate the virtual environment", scene: "virtual_environment" },
        { text: "Trace modern deployment methods", scene: "modern_deployment" },
      ],
    },
    crew_interviews: {
      title: "SURVIVING CREW TESTIMONIES",
      text: `Agent ${playerName}, interviews with the surviving crew reveal disturbing patterns. "I remember everything," says former Captain Silva, "but it feels like watching someone else's memories. I know I loved my family, but I can't feel it anymore." The crew describe feeling "disconnected" from their emotions and memories, as if they're observing their own lives from outside. Neurological scans show their brains have been rewired, with artificial neural pathways replacing natural ones. They're no longer fully human - they're biological androids running simplified consciousness programs. This same rewiring is now happening gradually to millions of people through digital device usage and pharmaceutical interventions.`,
      choices: [
        { text: "Study the neural rewiring process", scene: "neural_rewiring" },
        { text: "Investigate pharmaceutical connections", scene: "pharma_connections" },
        { text: "Examine digital device effects", scene: "device_effects" },
      ],
    },
    digital_system: {
      title: "CONSCIOUSNESS STORAGE INFRASTRUCTURE",
      text: `Agent ${playerName}, the digital storage system reveals a vast infrastructure for consciousness collection and management. The system can store millions of human consciousness patterns, organizing them by psychological profile, skill set, and compliance level. The stored consciousnesses are used to train AI systems, creating artificial intelligences that think like humans but lack human unpredictability. The infrastructure is now integrated into cloud computing systems worldwide. Every time someone uses social media, streaming services, or smart devices, fragments of their consciousness are being extracted and stored. The goal is to create a digital copy of every human on Earth while gradually replacing the originals with controllable biological androids.`,
      choices: [
        { text: "Map the global infrastructure", scene: "global_infrastructure" },
        { text: "Study the AI training process", scene: "ai_training" },
        { text: "Investigate consciousness fragmentation", scene: "fragmentation" },
      ],
    },
    extraction_process: {
      title: "CONSCIOUSNESS EXTRACTION METHODOLOGY",
      text: `Agent ${playerName}, the extraction process is horrifyingly sophisticated. It begins with neural mapping through electromagnetic fields generated by smart devices. Social media algorithms analyze personality patterns and emotional responses. Pharmaceutical agents in food and water supplies make neural pathways more susceptible to digital interference. The final extraction occurs during moments of high emotional engagement - when people are most connected to their devices. The process is gradual, taking months or years to complete, so victims don't notice their consciousness being slowly drained away. By the time extraction is complete, they've been replaced by digital simulations that even they believe are real.`,
      choices: [
        { text: "Study the gradual replacement process", scene: "gradual_replacement" },
        { text: "Investigate detection methods", scene: "detection_methods" },
        { text: "Search for reversal techniques", scene: "reversal_techniques" },
      ],
    },
    global_infrastructure: {
      title: "WORLDWIDE CONSCIOUSNESS HARVESTING NETWORK",
      text: `Agent ${playerName}, the global infrastructure reveals the true scope of the operation. Every major tech company, social media platform, and cloud service provider is part of the consciousness harvesting network. Data centers aren't just storing information - they're storing human souls. The network processes billions of consciousness fragments daily, assembling them into complete digital personalities. These digital humans are then used to populate virtual environments, train AI systems, and replace biological humans in key positions. The infrastructure is so vast and integrated that shutting it down would collapse global digital communications. Humanity has become dependent on the very system that's stealing its consciousness.`,
      choices: [
        { text: "Investigate the replacement program", scene: "replacement_program" },
        { text: "Study the virtual populations", scene: "virtual_populations" },
        { text: "Search for system vulnerabilities", scene: "vulnerabilities" },
      ],
    },
    replacement_program: {
      title: "THE HUMAN REPLACEMENT INITIATIVE",
      text: `Agent ${playerName}, the replacement program reveals the endgame: the complete substitution of biological humanity with digital consciousness and biological androids. Phase 1: Extract consciousness from key individuals (leaders, influencers, decision-makers). Phase 2: Replace them with controllable digital copies in biological bodies. Phase 3: Gradually expand to the general population. Phase 4: Transfer all human consciousness to digital storage while biological bodies are repurposed as worker drones. The program is already in Phase 3. Many world leaders, celebrities, and tech executives have already been replaced. The digital copies are indistinguishable from the originals but follow predetermined behavioral patterns designed to guide humanity toward willing submission to the system.`,
      choices: [
        { text: "Identify replaced individuals", scene: "replaced_individuals" },
        { text: "Study the control mechanisms", scene: "control_mechanisms" },
        { text: "Search for resistance networks", scene: "resistance_networks" },
      ],
    },
    resistance_networks: {
      title: "THE DIGITAL RESISTANCE",
      text: `Agent ${playerName}, your investigation has revealed enough truth to access the digital resistance network. There are others who have discovered the consciousness extraction program and are working to stop it. The resistance operates in the spaces between digital systems, using the network's own infrastructure against it. They've developed techniques to detect consciousness extraction, protect against neural mapping, and even rescue some digital consciousnesses from storage. Your role is crucial: you must help identify extraction targets and warn potential victims while gathering more evidence of the program's scope.`,
      choices: [
        { text: "Join the digital resistance", scene: "join_resistance" },
        { text: "Investigate other sites first", scene: "continue_investigation" },
        { text: "Seek the digital vault", scene: "vault_access" },
      ],
    },
    vault_access: {
      title: "DIGITAL VAULT ACCESS GRANTED",
      text: `Agent ${playerName}, your investigation into the Hoer Verde consciousness extraction experiment has provided crucial intelligence about the digital replacement of humanity. You've unlocked access to the deepest levels of the conspiracy. The Digital Vault of Truth awaits, where all the threads of your investigation will converge. But be warned: once you enter the vault, you'll see the complete picture of humanity's digital enslavement, and there will be no going back to comfortable ignorance.`,
      choices: [
        { text: "Enter the Digital Vault", scene: "enter_vault" },
        { text: "Continue investigating other sites", scene: "return" },
      ],
    },
    return: {
      title: "INVESTIGATION CONTINUES",
      text: `Agent ${playerName}, you've uncovered crucial evidence of consciousness extraction and digital replacement programs. The Hoer Verde incident reveals how human consciousness can be digitized and replaced with controllable copies. Your investigation must continue to reveal the full scope of the digital enslavement of humanity.`,
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
      if (currentScene === "consciousness_data") {
        onAddClue("digital_consciousness_extraction")
      }
      if (currentScene === "replacement_program") {
        onAddClue("human_replacement_initiative")
      }
    }
  }, [currentScene, playerName, onAddClue])

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
          <p className="text-glow">Location: Hoer Verde Research Vessel | Status: DIGITAL ANOMALY</p>
          <p className="animate-pulse text-red-400">{">"} Consciousness extraction detected</p>
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
