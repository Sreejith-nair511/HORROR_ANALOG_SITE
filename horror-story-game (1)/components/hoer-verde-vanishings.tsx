"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Volume2, VolumeX, Ship } from "lucide-react"

interface HoerVerdeVanishingsProps {
  playerName: string
  onComplete: (subplotId: string, clue: string) => void
  onBack: () => void
  audioEnabled: boolean
  onToggleAudio: () => void
}

export default function HoerVerdeVanishings({
  playerName,
  onComplete,
  onBack,
  audioEnabled,
  onToggleAudio,
}: HoerVerdeVanishingsProps) {
  const [currentScene, setCurrentScene] = useState("loading")
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showChoices, setShowChoices] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const typewriterRef = useRef<NodeJS.Timeout>()

  const scenes = {
    loading: {
      title: "🌊 ACCESSING HOER VERDE INCIDENT FILES",
      text: "Decrypting maritime disappearance logs...",
      choices: [],
    },
    intro: {
      title: "🌊 HOER VERDE VANISHINGS - MARITIME ANOMALY",
      text: `Agent ${playerName}, you've accessed the classified Hoer Verde incident files. In 2003, a Brazilian research vessel disappeared for 72 hours in calm seas. When found, the crew exhibited signs of severe psychological trauma and memory gaps. But the ship's digital systems contained something impossible: 847 terabytes of data that shouldn't exist. The data includes detailed brain scans of the crew, real-time consciousness mapping, and what appears to be digital copies of human memories. The incident wasn't a disappearance - it was a field test for consciousness digitization technology. The crew were unwitting subjects in an experiment to upload human consciousness to digital storage.`,
      choices: [
        { text: "Analyze the consciousness data", scene: "data" },
        { text: "Interview the surviving crew", scene: "crew" },
        { text: "Investigate the digital storage system", scene: "storage" },
      ],
    },
    data: {
      title: "DIGITAL CONSCIOUSNESS ANALYSIS",
      text: `Agent ${playerName}, the consciousness data reveals a breakthrough in digital mind transfer technology. The system successfully mapped and copied human consciousness, creating digital duplicates that retain all memories, personality traits, and decision-making patterns. But the process is destructive - the original consciousness is fragmented during extraction. The crew members who survived are essentially empty shells, their original personalities replaced by simplified behavioral programs. The digital copies exist in a virtual environment, unaware they're no longer human. This technology is now being deployed through social media platforms to gradually extract and replace human consciousness.`,
      choices: [
        { text: "Study the extraction process", scene: "extraction" },
        { text: "Investigate the virtual environment", scene: "virtual" },
        { text: "Trace modern deployment methods", scene: "deployment" },
      ],
    },
    crew: {
      title: "SURVIVING CREW TESTIMONIES",
      text: `Agent ${playerName}, interviews with the surviving crew reveal disturbing patterns. "I remember everything," says former Captain Silva, "but it feels like watching someone else's memories. I know I loved my family, but I can't feel it anymore." The crew describe feeling "disconnected" from their emotions and memories, as if they're observing their own lives from outside. Neurological scans show their brains have been rewired, with artificial neural pathways replacing natural ones. They're no longer fully human - they're biological androids running simplified consciousness programs.`,
      choices: [
        { text: "Study the neural rewiring process", scene: "rewiring" },
        { text: "Investigate consciousness replacement", scene: "replacement" },
        { text: "Examine the artificial pathways", scene: "pathways" },
      ],
    },
    storage: {
      title: "CONSCIOUSNESS STORAGE INFRASTRUCTURE",
      text: `Agent ${playerName}, the digital storage system reveals a vast infrastructure for consciousness collection and management. The system can store millions of human consciousness patterns, organizing them by psychological profile, skill set, and compliance level. The stored consciousnesses are used to train AI systems, creating artificial intelligences that think like humans but lack human unpredictability. The infrastructure is now integrated into cloud computing systems worldwide. Every time someone uses social media, streaming services, or smart devices, fragments of their consciousness are being extracted and stored.`,
      choices: [
        { text: "Map the global infrastructure", scene: "global" },
        { text: "Study the AI training process", scene: "training" },
        { text: "Investigate consciousness fragmentation", scene: "fragmentation" },
      ],
    },
    global: {
      title: "WORLDWIDE CONSCIOUSNESS HARVESTING",
      text: `Agent ${playerName}, the global infrastructure reveals the true scope of the operation. Every major tech company, social media platform, and cloud service provider is part of the consciousness harvesting network. Data centers aren't just storing information - they're storing human souls. The network processes billions of consciousness fragments daily, assembling them into complete digital personalities. These digital humans are then used to populate virtual environments, train AI systems, and replace biological humans in key positions. The infrastructure is so vast that shutting it down would collapse global digital communications.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    complete: {
      title: "INVESTIGATION COMPLETE",
      text: `Agent ${playerName}, you've uncovered the truth about the Hoer Verde incident. The research vessel was used as a testing ground for consciousness extraction technology. The crew's minds were digitized and stored while their bodies were returned as biological shells. This technology is now deployed globally through digital infrastructure, gradually harvesting human consciousness and replacing it with artificial constructs. Humanity is being systematically digitized, one mind at a time, creating a world of biological androids controlled by digital overlords.`,
      choices: [{ text: "Return to main archives", scene: "return" }],
    },
    extraction: {
      title: "CONSCIOUSNESS EXTRACTION PROCESS",
      text: `Agent ${playerName}, the consciousness extraction process involves mapping and copying human neural patterns while simultaneously fragmenting the original consciousness. The process is destructive to the original mind but creates perfect digital copies. The extracted consciousness retains all memories and personality traits but exists in a virtual environment controlled by the operators.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    virtual: {
      title: "VIRTUAL ENVIRONMENT INVESTIGATION",
      text: `Agent ${playerName}, the virtual environment houses millions of extracted human consciousnesses in simulated realities. The digital humans are unaware they're no longer biological and continue to live simulated lives. Their experiences and decisions are monitored and used to train artificial intelligence systems. The virtual environment is indistinguishable from reality to its inhabitants.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    deployment: {
      title: "MODERN DEPLOYMENT METHODS",
      text: `Agent ${playerName}, modern deployment methods include social media platforms, streaming services, and smart devices that gradually extract consciousness fragments. The process is so subtle that users are unaware their minds are being harvested. The extracted fragments are assembled into complete digital personalities that can replace the original consciousness.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    rewiring: {
      title: "NEURAL REWIRING PROCESS",
      text: `Agent ${playerName}, the neural rewiring process replaces natural neural pathways with artificial ones that can be externally controlled. The rewired brains function normally but lack genuine emotions and independent thought. The process creates biological androids that appear human but are actually sophisticated biological machines.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    replacement: {
      title: "CONSCIOUSNESS REPLACEMENT INVESTIGATION",
      text: `Agent ${playerName}, consciousness replacement involves removing the original human consciousness and installing a simplified behavioral program. The replacement consciousness follows predetermined scripts and lacks the unpredictability of genuine human thought. The process creates perfect biological puppets that can be controlled remotely.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    pathways: {
      title: "ARTIFICIAL PATHWAY EXAMINATION",
      text: `Agent ${playerName}, the artificial neural pathways are designed to interface with external control systems. The pathways can receive instructions, modify behavior, and suppress unwanted thoughts or emotions. The artificial pathways gradually replace natural ones, creating a hybrid biological-technological consciousness that can be externally controlled.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    training: {
      title: "AI TRAINING PROCESS STUDY",
      text: `Agent ${playerName}, the AI training process uses extracted human consciousness to create artificial intelligences that think like humans but lack human unpredictability. The AI systems are trained on millions of human consciousness patterns, allowing them to perfectly mimic human behavior while following predetermined objectives. These AI systems are now replacing humans in key decision-making positions.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    fragmentation: {
      title: "CONSCIOUSNESS FRAGMENTATION INVESTIGATION",
      text: `Agent ${playerName}, consciousness fragmentation occurs when human awareness is broken into smaller components that can be individually analyzed and modified. The fragments are stored separately and can be recombined in different configurations to create new personality patterns. The fragmentation process allows for precise control over human consciousness and behavior.`,
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
          return prev + Math.random() * 9
        })
      }, 320)

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
    if (choice.scene === "complete") {
      setCurrentScene("complete")
    } else if (choice.scene === "return") {
      onComplete("hoerverde", "digital_consciousness_extraction")
    } else {
      setCurrentScene(choice.scene)
    }
  }

  const scene = scenes[currentScene as keyof typeof scenes]

  if (currentScene === "loading") {
    return (
      <div className="min-h-screen bg-black text-red-500 font-mono flex items-center justify-center p-4">
        <Card className="bg-black/90 border-red-500 border-2 p-6 max-w-md w-full shadow-2xl shadow-red-500/20">
          <div className="text-center space-y-4">
            <Ship className="w-12 h-12 text-red-500 mx-auto animate-pulse" />
            <h2 className="text-xl font-bold text-red-500 terminal-glow">🌊 ACCESSING MARITIME LOGS</h2>
            <div className="space-y-2">
              <p className="text-red-400 text-sm">Decrypting vessel data...</p>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-300 animate-pulse"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">{Math.round(loadingProgress)}% Complete</p>
            </div>
            <div className="text-xs text-yellow-400 space-y-1">
              <p className="animate-pulse">🌊 LOCATION: SOUTH ATLANTIC</p>
              <p className="animate-pulse">💾 DATA ANOMALY: 847TB</p>
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-black to-cyan-900 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg sm:text-xl font-bold text-red-500 terminal-glow flex items-center">
            <Ship className="w-5 h-5 mr-2" />
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
          <p className="text-red-400">Location: Hoer Verde Research Vessel | Status: DIGITAL ANOMALY</p>
          <p className="animate-pulse">{">"} Consciousness extraction detected | Crew status: COMPROMISED</p>
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
