"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Volume2, VolumeX, FlaskRoundIcon as Flask } from "lucide-react"

interface Unit731ExperimentsProps {
  playerName: string
  onComplete: (subplotId: string, clue: string) => void
  onBack: () => void
  audioEnabled: boolean
  onToggleAudio: () => void
}

export default function Unit731Experiments({
  playerName,
  onComplete,
  onBack,
  audioEnabled,
  onToggleAudio,
}: Unit731ExperimentsProps) {
  const [currentScene, setCurrentScene] = useState("loading")
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showChoices, setShowChoices] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const typewriterRef = useRef<NodeJS.Timeout>()

  const scenes = {
    loading: {
      title: "🧪 ACCESSING UNIT 731 ARCHIVES",
      text: "Decrypting biological warfare documents...",
      choices: [],
    },
    intro: {
      title: "🧪 UNIT 731 - BIOLOGICAL WARFARE DIVISION",
      text: `Agent ${playerName}, you've accessed the classified Unit 731 archives. Beyond the documented biological experiments lies something far more sinister: consciousness manipulation research. Classified documents reveal "Project Mindbridge" - experiments designed to map and modify human consciousness using biological agents and electromagnetic fields. The research didn't end in 1945; it was transferred to pharmaceutical companies and tech corporations. Dr. Ishii's final notes mention "successful consciousness transfer" and "biological programming of human behavior." The same techniques used to break prisoners' minds are now being deployed globally through modern biotechnology.`,
      choices: [
        { text: "Investigate Project Mindbridge", scene: "mindbridge" },
        { text: "Trace modern pharmaceutical connections", scene: "pharma" },
        { text: "Examine consciousness transfer experiments", scene: "transfer" },
      ],
    },
    mindbridge: {
      title: "PROJECT MINDBRIDGE PROTOCOLS",
      text: `Agent ${playerName}, Project Mindbridge was the precursor to all modern consciousness manipulation programs. The experiments mapped how human minds respond to specific biological triggers, creating a comprehensive database of psychological control mechanisms. Researchers identified compounds that could override conscious decision-making while leaving subjects believing they were acting freely. The project successfully created "compliance states" where individuals would follow any instruction. These techniques have been refined over decades and are now deployed through food additives, pharmaceuticals, and even social media algorithms.`,
      choices: [
        { text: "Study the compliance state research", scene: "compliance" },
        { text: "Investigate modern deployment methods", scene: "deployment" },
        { text: "Analyze the psychological control database", scene: "database" },
      ],
    },
    pharma: {
      title: "PHARMACEUTICAL INDUSTRY CONNECTIONS",
      text: `Agent ${playerName}, the Unit 731 research was never destroyed - it was privatized. Major pharmaceutical companies hired the researchers and continued the work under the guise of "mental health treatment." The same companies now produce medications that modify brain chemistry to increase compliance and reduce critical thinking. Depression and anxiety rates have skyrocketed not because of social factors, but because of deliberate chemical conditioning designed to create a dependent, controllable population. The biotech industry isn't treating mental illness - it's engineering it.`,
      choices: [
        { text: "Examine pharmaceutical conditioning agents", scene: "agents" },
        { text: "Research population dependency patterns", scene: "dependency" },
        { text: "Investigate the privatization process", scene: "privatization" },
      ],
    },
    transfer: {
      title: "CONSCIOUSNESS TRANSFER EXPERIMENTS",
      text: `Agent ${playerName}, the consciousness transfer experiments reveal the most disturbing aspect of Unit 731's legacy. Researchers discovered how to extract, store, and implant human consciousness using biological matrices. Early experiments involved transferring memories and personality traits between subjects. The technology has been perfected over decades and is now used to create "replacement individuals" - people who look and act like the originals but follow predetermined behavioral patterns. Many world leaders, celebrities, and influential figures may not be who they appear to be.`,
      choices: [
        { text: "Study the replacement protocol", scene: "replacement" },
        { text: "Investigate consciousness storage methods", scene: "storage" },
        { text: "Research influential figure replacements", scene: "figures" },
      ],
    },
    replacement: {
      title: "HUMAN REPLACEMENT PROTOCOL",
      text: `Agent ${playerName}, the replacement protocol reveals a systematic program to substitute key individuals with controllable duplicates. The process involves consciousness extraction, behavioral programming, and physical modification to create perfect replicas. These replacements are indistinguishable from the originals but follow predetermined scripts designed to guide humanity toward specific outcomes. The protocol has been active for decades, explaining sudden personality changes in public figures and the coordinated nature of global policy decisions. You've discovered evidence of a shadow government operating through biological puppets.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    complete: {
      title: "INVESTIGATION COMPLETE",
      text: `Agent ${playerName}, you've uncovered the horrifying truth about Unit 731's legacy. The biological warfare experiments evolved into a global consciousness control program. Through pharmaceutical manipulation, behavioral programming, and human replacement protocols, a shadow organization has been systematically conditioning humanity for control. The techniques developed in wartime laboratories are now deployed on a planetary scale, creating a compliant population unaware of their manipulation.`,
      choices: [{ text: "Return to main archives", scene: "return" }],
    },
    compliance: {
      title: "COMPLIANCE STATE RESEARCH",
      text: `Agent ${playerName}, the compliance state research reveals how to create perfect obedience through biological manipulation. Subjects in compliance states will follow any instruction without question while believing they're acting freely. The research identified specific neurochemical triggers that can be activated through various delivery methods. This technology is now deployed globally through food, water, and pharmaceutical systems.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    deployment: {
      title: "MODERN DEPLOYMENT METHODS",
      text: `Agent ${playerName}, modern deployment methods include pharmaceutical medications, food additives, water fluoridation, and even social media algorithms. The biological agents work in conjunction with psychological conditioning to create a compliant population. The deployment is so widespread that most people are unknowingly under some form of consciousness control.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    database: {
      title: "PSYCHOLOGICAL CONTROL DATABASE",
      text: `Agent ${playerName}, the psychological control database contains detailed profiles of human behavioral triggers and responses. The database maps how different populations respond to various forms of manipulation, allowing for targeted consciousness control campaigns. This information is used to design custom compliance programs for different demographic groups.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    agents: {
      title: "PHARMACEUTICAL CONDITIONING AGENTS",
      text: `Agent ${playerName}, pharmaceutical conditioning agents are designed to modify brain chemistry and behavior patterns. Common medications now contain compounds that increase suggestibility and reduce critical thinking. The agents work slowly over time, creating permanent changes in neural pathways. Most people taking these medications are unaware of their consciousness-altering effects.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    dependency: {
      title: "POPULATION DEPENDENCY PATTERNS",
      text: `Agent ${playerName}, population dependency patterns show how biological conditioning creates reliance on external authority. People become unable to make independent decisions and seek constant guidance from media and government sources. The dependency is both psychological and biochemical, making it extremely difficult to reverse without intervention.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    privatization: {
      title: "PRIVATIZATION PROCESS INVESTIGATION",
      text: `Agent ${playerName}, the privatization process transferred Unit 731 research to major pharmaceutical and technology companies after WWII. The researchers were given new identities and continued their work under corporate protection. The same techniques used on prisoners are now deployed on global populations through commercial products and services.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    storage: {
      title: "CONSCIOUSNESS STORAGE METHODS",
      text: `Agent ${playerName}, consciousness storage methods involve extracting and preserving human memories, personality patterns, and decision-making processes. The stored consciousness can be implanted into new bodies or used to create artificial intelligences. This technology allows for the creation of perfect duplicates that are indistinguishable from the originals.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    figures: {
      title: "INFLUENTIAL FIGURE REPLACEMENTS",
      text: `Agent ${playerName}, many world leaders, celebrities, and influential figures have been replaced with consciousness-controlled duplicates. The replacements follow predetermined behavioral scripts designed to guide humanity toward specific outcomes. This explains the coordinated nature of global policy decisions and the sudden personality changes in public figures.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
  }

  const typewriterEffect = (text: string) => {
    setDisplayedText("")
    setIsTyping(true)
    setShowChoices(false)

    let index = 0
    const speed = 30

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
    if (currentScene === "loading") {
      const loadingInterval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(loadingInterval)
            setTimeout(() => setCurrentScene("intro"), 500)
            return 100
          }
          return prev + Math.random() * 10
        })
      }, 300)

      return () => clearInterval(loadingInterval)
    }
  }, [currentScene])

  useEffect(() => {
    const scene = scenes[currentScene as keyof typeof scenes]
    if (scene && currentScene !== "loading") {
      typewriterEffect(scene.text)
    }
  }, [currentScene])

  useEffect(() => {
    return () => {
      if (typewriterRef.current) {
        clearTimeout(typewriterRef.current)
      }
    }
  }, [])

  const handleChoice = (choice: any) => {
    if (!choice || !choice.scene) {
      console.error("Invalid choice:", choice)
      return
    }

    if (choice.scene === "complete") {
      setCurrentScene("complete")
    } else if (choice.scene === "return") {
      onComplete("unit731", "biological_consciousness_control")
    } else if (scenes[choice.scene as keyof typeof scenes]) {
      setCurrentScene(choice.scene)
    } else {
      console.error("Scene not found:", choice.scene)
      setCurrentScene("intro")
    }
  }

  const scene = scenes[currentScene as keyof typeof scenes]

  // Add fallback for missing scenes
  if (!scene) {
    return (
      <div className="min-h-screen bg-black text-red-500 font-mono flex items-center justify-center p-4">
        <Card className="bg-black/90 border-red-500 border-2 p-6 max-w-md w-full shadow-2xl shadow-red-500/20">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-bold text-red-500">🧪 EXPERIMENT DATA CORRUPTED</h2>
            <p className="text-red-400">Biological hazard detected. Returning to main terminal...</p>
            <Button onClick={onBack} className="w-full bg-red-600 hover:bg-red-700 text-white min-h-[44px]">
              Return to Archives
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  if (currentScene === "loading") {
    return (
      <div className="min-h-screen bg-black text-red-500 font-mono flex items-center justify-center p-4">
        <Card className="bg-black/90 border-red-500 border-2 p-6 max-w-md w-full shadow-2xl shadow-red-500/20">
          <div className="text-center space-y-4">
            <Flask className="w-12 h-12 text-red-500 mx-auto animate-pulse" />
            <h2 className="text-xl font-bold text-red-500 terminal-glow">🧪 ACCESSING UNIT 731 FILES</h2>
            <div className="space-y-2">
              <p className="text-red-400 text-sm">Decrypting biological warfare data...</p>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-300 animate-pulse"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">{Math.round(loadingProgress)}% Complete</p>
            </div>
            <div className="text-xs text-yellow-400 space-y-1">
              <p className="animate-pulse">☣️ BIOHAZARD LEVEL: EXTREME</p>
              <p className="animate-pulse">🔒 CLASSIFICATION: TOP SECRET</p>
            </div>
          </div>
        </Card>

        <style jsx>{`
          .terminal-glow {
            text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-red-500 font-mono p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-black to-red-900 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg sm:text-xl font-bold text-red-500 terminal-glow flex items-center">
            <Flask className="w-5 h-5 mr-2" />
            {scene.title}
          </h1>
          <div className="flex gap-2">
            <Button
              onClick={onBack}
              variant="outline"
              size="sm"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button
              onClick={onToggleAudio}
              variant="outline"
              size="sm"
              className={`min-h-[44px] ${
                audioEnabled
                  ? "border-red-400 text-red-400 hover:bg-red-400"
                  : "border-gray-500 text-gray-400 hover:bg-gray-500"
              } hover:text-black`}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <Card className="bg-black/90 border-red-500 border-2 p-4 sm:p-6 mb-6 min-h-[400px] shadow-2xl shadow-red-500/20">
          <div className="text-red-300 leading-relaxed text-sm sm:text-base mb-6">
            {displayedText}
            {isTyping && <span className="animate-pulse text-red-500">█</span>}
          </div>

          {showChoices && scene.choices && scene.choices.length > 0 && (
            <div className="space-y-3">
              {scene.choices.map((choice, index) => (
                <Button
                  key={index}
                  onClick={() => handleChoice(choice)}
                  className="w-full text-left justify-start bg-red-900/20 border-red-500 text-red-400 hover:bg-red-900/40 hover:text-white p-4 h-auto min-h-[60px] transition-all duration-300"
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
          <p className="text-red-400">Location: Unit 731 Facility | Biohazard: EXTREME</p>
          <p className="animate-pulse">{">"} Biological agents detected | Consciousness manipulation: ACTIVE</p>
        </div>
      </div>

      <style jsx>{`
        .terminal-glow {
          text-shadow: 0 0 10px #ff0000;
        }
      `}</style>
    </div>
  )
}
