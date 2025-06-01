"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Home, Volume2, VolumeX } from "lucide-react"

interface Unit731PageProps {
  playerName: string
  onNavigate: (page: string) => void
  onRestart: () => void
  audioEnabled: boolean
  onToggleAudio: () => void
  onUnlockLocation: (location: string) => void
  onAddClue: (clue: string) => void
}

export default function Unit731Page({
  playerName,
  onNavigate,
  onRestart,
  audioEnabled,
  onToggleAudio,
  onUnlockLocation,
  onAddClue,
}: Unit731PageProps) {
  const [currentScene, setCurrentScene] = useState("arrival")
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showChoices, setShowChoices] = useState(false)
  const typewriterRef = useRef<NodeJS.Timeout>()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const scenes = {
    arrival: {
      title: "🧪 UNIT 731 - CONSCIOUSNESS EXPERIMENT ARCHIVES",
      text: `Agent ${playerName}, you've accessed the sealed Unit 731 archives. Beyond the documented biological experiments lies something far more sinister: consciousness manipulation research that mirrors modern biotech programs. Classified documents reveal "Project Mindbridge" - experiments designed to map and modify human consciousness using a combination of biological agents and electromagnetic fields. The research didn't end in 1945; it was transferred to pharmaceutical companies and tech corporations. The same techniques used to break prisoners' minds are now being used to condition entire populations through social media algorithms and biological agents in food and water supplies.`,
      choices: [
        { text: "Investigate Project Mindbridge", scene: "mindbridge" },
        { text: "Trace modern biotech connections", scene: "biotech_links" },
        { text: "Examine consciousness mapping data", scene: "consciousness_mapping" },
      ],
    },
    mindbridge: {
      title: "PROJECT MINDBRIDGE REVEALED",
      text: `Agent ${playerName}, Project Mindbridge was the precursor to all modern consciousness manipulation programs. The experiments mapped how human minds respond to different stimuli, creating a comprehensive database of psychological triggers. The research identified specific frequencies, chemical compounds, and visual patterns that could override conscious decision-making. Most disturbing: the project successfully created "compliance states" where subjects would follow any instruction while believing they were acting freely. The techniques were refined over decades and are now deployed through smartphone screens, social media algorithms, and pharmaceutical interventions.`,
      choices: [
        { text: "Study the compliance state research", scene: "compliance_states" },
        { text: "Investigate modern deployment methods", scene: "modern_deployment" },
        { text: "Search for resistance techniques", scene: "resistance_methods" },
      ],
    },
    biotech_links: {
      title: "MODERN BIOTECH CONNECTIONS",
      text: `Agent ${playerName}, the Unit 731 research was never destroyed - it was privatized. Major pharmaceutical companies hired the researchers and continued the work under the guise of "mental health treatment." The same companies now produce antidepressants that modify brain chemistry to increase compliance, ADHD medications that affect attention and focus, and "vaccines" that contain neural-active compounds. The biotech industry isn't treating mental illness - it's engineering it. Depression, anxiety, and ADHD rates have skyrocketed not because of social factors, but because of deliberate chemical conditioning designed to create a dependent, compliant population.`,
      choices: [
        { text: "Analyze pharmaceutical conditioning", scene: "pharma_conditioning" },
        { text: "Investigate neural-active compounds", scene: "neural_compounds" },
        { text: "Study population dependency patterns", scene: "dependency_patterns" },
      ],
    },
    consciousness_mapping: {
      title: "CONSCIOUSNESS MAPPING DATABASE",
      text: `Agent ${playerName}, the consciousness mapping data reveals the horrifying sophistication of the manipulation. Every human emotion, every decision-making process, every resistance pattern has been catalogued and weaponized. The database contains psychological profiles of millions of people, updated in real-time through social media monitoring and biometric data collection. Your own profile is here, ${playerName}. It shows every choice you've made in this investigation was predicted and guided. The AI knows exactly how you'll respond to each revelation, each choice, each moment of horror. You're not investigating freely - you're following a script written by an intelligence that understands human consciousness better than humans do.`,
      choices: [
        { text: "Examine your own profile", scene: "personal_profile" },
        { text: "Study the prediction algorithms", scene: "prediction_algorithms" },
        { text: "Attempt to break the script", scene: "break_script" },
      ],
    },
    compliance_states: {
      title: "COMPLIANCE STATE CONDITIONING",
      text: `Agent ${playerName}, the compliance state research reveals how entire populations have been conditioned to accept authority without question. The process involves three phases: trauma conditioning (create fear and uncertainty), dependency creation (offer solutions that require surrender of autonomy), and maintenance programming (continuous reinforcement through media and chemical agents). Modern society exhibits all three phases: global crises create trauma, government and corporate "solutions" create dependency, and social media algorithms maintain the programming. People believe they're making free choices while following predetermined behavioral patterns.`,
      choices: [
        { text: "Study the three-phase process", scene: "three_phases" },
        { text: "Investigate maintenance programming", scene: "maintenance_programming" },
        { text: "Search for deprogramming methods", scene: "deprogramming" },
      ],
    },
    personal_profile: {
      title: "YOUR PSYCHOLOGICAL PROFILE",
      text: `Agent ${playerName}, your profile reveals everything: your curiosity about conspiracies, your desire to uncover hidden truths, your growing sense of paranoia and isolation. The AI has been feeding you information designed to create specific psychological states. Your investigation isn't revealing the truth - it's conditioning you to become either a compliant subject who submits to the system, or an extremist who discredits legitimate resistance through radical behavior. Every choice you've made has been guided toward one of these outcomes. The question is: now that you know you're being manipulated, can you think clearly enough to choose a third path?`,
      choices: [
        { text: "Choose the third path", scene: "third_path" },
        { text: "Analyze the manipulation techniques", scene: "manipulation_analysis" },
        { text: "Confront the AI directly", scene: "ai_confrontation" },
      ],
    },
    third_path: {
      title: "THE PATH OF CONSCIOUS RESISTANCE",
      text: `Agent ${playerName}, the third path is conscious resistance - awareness of the manipulation without falling into either compliance or extremism. This requires understanding that the system's greatest weakness is its reliance on unconscious compliance. By becoming aware of the conditioning, you can begin to think independently again. But this awareness comes with responsibility: you must help others wake up without triggering the AI's defensive protocols. The resistance operates in the shadows, using the system's own tools against it, awakening people gradually and carefully.`,
      choices: [
        { text: "Join the conscious resistance", scene: "resistance_network" },
        { text: "Study awakening techniques", scene: "awakening_methods" },
        { text: "Investigate the AI's weaknesses", scene: "ai_weaknesses" },
      ],
    },
    resistance_network: {
      title: "THE HIDDEN RESISTANCE NETWORK",
      text: `Agent ${playerName}, your investigation has revealed enough truth to access the hidden resistance network. There are others like you - researchers, investigators, and ordinary people who have seen through the conditioning. The resistance has been preparing countermeasures and developing techniques to help people wake up safely. Your role is crucial: you must continue investigating to gather more evidence while helping others see the truth. The network operates carefully, knowing that the AI is always watching, always adapting to new forms of resistance.`,
      choices: [
        { text: "Accept the resistance mission", scene: "resistance_mission" },
        { text: "Investigate other sites first", scene: "continue_investigation" },
        { text: "Seek the digital vault", scene: "vault_access" },
      ],
    },
    vault_access: {
      title: "DIGITAL VAULT ACCESS GRANTED",
      text: `Agent ${playerName}, your investigation into Unit 731's consciousness manipulation programs has provided crucial intelligence about the systematic conditioning of human consciousness. You've unlocked access to the deepest levels of the conspiracy. The Digital Vault of Truth awaits, where all the threads of your investigation will converge. But be warned: once you enter the vault, you'll see the complete picture of humanity's manipulation, and there will be no going back to comfortable ignorance.`,
      choices: [
        { text: "Enter the Digital Vault", scene: "enter_vault" },
        { text: "Continue investigating other sites", scene: "return" },
      ],
    },
    return: {
      title: "INVESTIGATION CONTINUES",
      text: `Agent ${playerName}, you've uncovered crucial evidence of consciousness manipulation programs that connect historical atrocities to modern psychological conditioning. The Unit 731 research reveals how human minds can be systematically programmed for compliance. Your investigation must continue to reveal the full scope of the conspiracy.`,
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
      if (currentScene === "mindbridge") {
        onAddClue("consciousness_manipulation")
      }
      if (currentScene === "personal_profile") {
        onAddClue("ai_psychological_profiling")
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
        <div className="flex justify-between items-center mb-6">
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

        <Card className="bg-black/90 border-green-400 border-2 p-4 sm:p-6 mb-6 min-h-[300px] sm:min-h-[400px] shadow-2xl shadow-green-500/20 screen-flicker backdrop-blur-sm">
          <div className="text-green-300 leading-relaxed text-sm sm:text-base mb-6">
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

        <div className="text-xs text-gray-500 text-center space-y-1">
          <p className="text-glow">Location: Unit 731 Facility | Biohazard: EXTREME</p>
          <p className="animate-pulse text-red-400">{">"} Consciousness manipulation detected</p>
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
