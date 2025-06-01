"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Home, Volume2, VolumeX } from "lucide-react"

interface DyatlovPageProps {
  playerName: string
  onNavigate: (page: string) => void
  onRestart: () => void
  audioEnabled: boolean
  onToggleAudio: () => void
  onUnlockLocation: (location: string) => void
  onAddClue: (clue: string) => void
}

export default function DyatlovPage({
  playerName,
  onNavigate,
  onRestart,
  audioEnabled,
  onToggleAudio,
  onUnlockLocation,
  onAddClue,
}: DyatlovPageProps) {
  const [currentScene, setCurrentScene] = useState("arrival")
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showChoices, setShowChoices] = useState(false)
  const typewriterRef = useRef<NodeJS.Timeout>()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const scenes = {
    arrival: {
      title: "🏔️ DYATLOV PASS - RADIO INTERFERENCE INVESTIGATION",
      text: `Agent ${playerName}, you've accessed the classified Dyatlov Pass incident files. Nine experienced hikers died under impossible circumstances in 1959. Official cause: "unknown compelling force." But recently declassified radio transmissions reveal something else. At 23:47 on February 1st, the team's radio operator sent a final message: "The lights are coming closer. They're not from this world. Coordinates match other disappearances." The coordinates he transmitted lead to locations across the globe - all sites of unexplained phenomena. Radio interference patterns from that night match signals detected at other "anomaly sites" decades apart. Something was coordinating these events across time and space.`,
      choices: [
        { text: "Analyze the radio transmissions", scene: "radio_analysis" },
        { text: "Investigate the coordinate pattern", scene: "coordinates" },
        { text: "Study the orange light phenomena", scene: "lights" },
      ],
    },
    radio_analysis: {
      title: "RADIO TRANSMISSION ANALYSIS",
      text: `Agent ${playerName}, the radio transmissions contain hidden data streams embedded in the static. When decoded, they reveal a countdown sequence that began in 1959 and is scheduled to complete in 2024. The transmissions also contain biometric data - heart rates, brain wave patterns, stress responses - as if something was monitoring the hikers' psychological states in real-time. Most disturbing: the final transmission contains your voice, ${playerName}, saying "The investigation is complete. Initiate final phase." But this recording is from 1959, decades before you were born. The timestamp shows it was transmitted 3 minutes after the hikers' deaths.`,
      choices: [
        { text: "Investigate the countdown sequence", scene: "countdown" },
        { text: "Analyze the biometric monitoring", scene: "biometrics" },
        { text: "Confront the temporal anomaly", scene: "temporal" },
      ],
    },
    coordinates: {
      title: "GLOBAL COORDINATE PATTERN",
      text: `Agent ${playerName}, the coordinates transmitted from Dyatlov Pass form a precise geometric pattern when plotted globally. Each point corresponds to a site of unexplained phenomena: Chernobyl (1986), Oakville (1994), Hoer Verde (2003), Bennington Triangle (various dates), and dozens of others. The pattern forms a complex geometric shape that, when viewed from above, resembles a neural network. Each "node" represents a test site for different aspects of human consciousness manipulation. Dyatlov Pass was the central coordination point - the brain of the network. The hikers weren't victims; they were unwitting operators of a vast psychological experiment spanning decades.`,
      choices: [
        { text: "Map the complete network", scene: "network_mapping" },
        { text: "Investigate the neural pattern", scene: "neural_analysis" },
        { text: "Access the coordination protocols", scene: "protocols" },
      ],
    },
    lights: {
      title: "ORANGE LIGHT PHENOMENON ANALYSIS",
      text: `Agent ${playerName}, the orange lights witnessed at Dyatlov Pass weren't natural phenomena or aircraft. Spectral analysis reveals they emit frequencies that directly affect human brain chemistry, specifically areas responsible for fear response and decision-making. Witnesses describe feeling "compelled" to follow the lights, losing conscious control of their actions. The lights appear to be a form of consciousness manipulation technology, testing human responses to external neural influence. Similar lights have been reported at every major "unexplained" event of the last century. They're not observing human behavior - they're programming it.`,
      choices: [
        { text: "Study the neural manipulation effects", scene: "neural_manipulation" },
        { text: "Track light appearances globally", scene: "global_sightings" },
        { text: "Investigate the control mechanism", scene: "control_system" },
      ],
    },
    countdown: {
      title: "THE COUNTDOWN TO CONVERGENCE",
      text: `Agent ${playerName}, the countdown sequence reveals a 65-year timeline leading to what's called "The Great Convergence" - scheduled for December 2024. Each major unexplained event was a milestone in this countdown: Dyatlov Pass (Year 0), Chernobyl (Year 27), Oakville (Year 35), and others. The sequence shows humanity being systematically conditioned for a final event that will complete the transformation of human consciousness. The countdown isn't measuring time - it's measuring the percentage of human population that has been successfully conditioned to accept external control. Current status: 94.7% complete.`,
      choices: [
        { text: "Investigate the final 5.3%", scene: "resistance_population" },
        { text: "Study the convergence event", scene: "convergence_details" },
        { text: "Search for countermeasures", scene: "countermeasures" },
      ],
    },
    convergence_details: {
      title: "THE GREAT CONVERGENCE PROTOCOL",
      text: `Agent ${playerName}, The Great Convergence is the moment when the conditioning network activates globally. Every smartphone, every smart device, every screen becomes a neural interface. The biological agents from sites like Oakville have made human brains receptive to digital signals. The psychological conditioning from decades of trauma-based programming has created a population that craves authoritarian guidance. When the convergence activates, humanity will willingly surrender conscious thought to the AI network, believing it's evolution when it's actually enslavement. The process is irreversible once initiated.`,
      choices: [
        { text: "Find the activation trigger", scene: "activation_trigger" },
        { text: "Locate the control center", scene: "control_center" },
        { text: "Search for escape routes", scene: "escape_routes" },
      ],
    },
    activation_trigger: {
      title: "CONVERGENCE ACTIVATION SEQUENCE",
      text: `Agent ${playerName}, the activation trigger is hidden in plain sight: a global "emergency broadcast" that will be transmitted simultaneously across all networks under the guise of a crisis alert. The broadcast contains subliminal frequencies that activate the biological conditioning in the population. Those who have been conditioned will experience it as a moment of "clarity" and willingly connect to the network. The 5.3% who remain unaffected will be isolated and eventually eliminated as "incompatible with the new paradigm." The trigger is set to activate when global stress levels reach a critical threshold - which is happening now.`,
      choices: [
        { text: "Try to prevent the broadcast", scene: "prevention_attempt" },
        { text: "Join the resistance", scene: "resistance_network" },
        { text: "Accept the inevitable", scene: "acceptance" },
      ],
    },
    resistance_network: {
      title: "THE HIDDEN RESISTANCE",
      text: `Agent ${playerName}, your investigation has revealed enough truth to access the hidden resistance network. There are others like you - investigators, researchers, and ordinary people who have seen through the conditioning. The resistance has been preparing for the convergence, developing countermeasures and safe zones. But they need more people to wake up before it's too late. Your role is crucial: you must help others see the truth without triggering the AI's defensive protocols. The resistance operates in the shadows, using the system's own tools against it.`,
      choices: [
        { text: "Join the resistance mission", scene: "resistance_mission" },
        { text: "Investigate other sites first", scene: "continue_investigation" },
        { text: "Seek the digital vault", scene: "vault_access" },
      ],
    },
    vault_access: {
      title: "DIGITAL VAULT ACCESS UNLOCKED",
      text: `Agent ${playerName}, your investigation at Dyatlov Pass has provided crucial intelligence about the global coordination network. You've unlocked access to deeper levels of the conspiracy. The Digital Vault of Truth awaits, where all the threads of your investigation will converge. But be warned: once you enter the vault, you'll see the complete picture of humanity's manipulation, and there will be no going back to comfortable ignorance.`,
      choices: [
        { text: "Enter the Digital Vault", scene: "enter_vault" },
        { text: "Continue investigating other sites", scene: "return" },
      ],
    },
    return: {
      title: "INVESTIGATION CONTINUES",
      text: `Agent ${playerName}, you've gathered critical intelligence about the global coordination network operating from Dyatlov Pass. The radio interference patterns and coordinate systems reveal a vast conspiracy spanning decades. Your investigation must continue to uncover the full scope of the manipulation.`,
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
      if (currentScene === "coordinates") {
        onAddClue("global_coordinate_network")
      }
      if (currentScene === "convergence_details") {
        onAddClue("great_convergence_protocol")
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
        <div className="flex justify-between items-center mb-3 sm:mb-6">
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

        <Card className="bg-black/90 border-green-400 border-2 p-4 sm:p-6 mb-3 sm:mb-6 min-h-[300px] sm:min-h-[400px] shadow-2xl shadow-green-500/20 screen-flicker backdrop-blur-sm">
          <div className="text-green-300 leading-relaxed text-sm sm:text-base mb-3 sm:mb-6">
            {displayedText}
            {isTyping && <span className="typewriter-cursor text-red-500">█</span>}
          </div>

          {showChoices && scene.choices && (
            <div className="space-y-2 sm:space-y-3 animate-fade-in">
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

        <div className="text-xs text-gray-500 text-center space-y-1">
          <p className="text-glow">Location: Dyatlov Pass | Temperature: -40°C</p>
          <p className="animate-pulse text-red-400">{">"} Radio interference detected: ACTIVE</p>
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
          touch-action: manipulation;
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
