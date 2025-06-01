"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Volume2, VolumeX, CloudRain } from "lucide-react"

interface OakvilleRainProps {
  playerName: string
  onComplete: (subplotId: string, clue: string) => void
  onBack: () => void
  audioEnabled: boolean
  onToggleAudio: () => void
}

export default function OakvilleRain({
  playerName,
  onComplete,
  onBack,
  audioEnabled,
  onToggleAudio,
}: OakvilleRainProps) {
  const [currentScene, setCurrentScene] = useState("loading")
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showChoices, setShowChoices] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const typewriterRef = useRef<NodeJS.Timeout>()

  const scenes = {
    loading: {
      title: "🌧️ ACCESSING OAKVILLE INCIDENT FILES",
      text: "Decrypting atmospheric anomaly data...",
      choices: [],
    },
    intro: {
      title: "🌧️ OAKVILLE RAIN BLOBS - ATMOSPHERIC ANOMALY",
      text: `Agent ${playerName}, you've accessed the classified Oakville incident files. On August 7, 1994, gelatinous blobs fell from the sky over Oakville, Washington. Official reports claim it was "atmospheric debris," but classified medical records tell a different story. Twenty-three residents fell ill with identical symptoms: severe fatigue, mental confusion, and most disturbing - increased susceptibility to suggestion. Hospital blood tests revealed microscopic organisms that don't match any known Earth biology. The organisms appeared to be engineered to cross the blood-brain barrier and affect neural pathways related to critical thinking and resistance to authority.`,
      choices: [
        { text: "Analyze the biological samples", scene: "samples" },
        { text: "Interview affected residents", scene: "residents" },
        { text: "Investigate the source aircraft", scene: "aircraft" },
      ],
    },
    samples: {
      title: "BIOLOGICAL SAMPLE ANALYSIS",
      text: `Agent ${playerName}, laboratory analysis of the Oakville blobs reveals horrifying sophistication. The organisms contain synthetic DNA sequences that match no natural evolution pattern. They're designed to produce specific neurochemicals that reduce anxiety about authority figures while increasing compliance with media messaging. Most disturbing: the organisms can replicate using the host's own cellular machinery, creating permanent behavioral changes. Recent blood tests on Oakville residents show the organisms are still active 30 years later. The affected population demonstrates 73% higher acceptance of government narratives and 89% lower participation in protest activities.`,
      choices: [
        { text: "Trace the synthetic DNA origin", scene: "dna" },
        { text: "Study long-term behavioral effects", scene: "effects" },
        { text: "Search for other test sites", scene: "sites" },
      ],
    },
    residents: {
      title: "RESIDENT TESTIMONIES",
      text: `Agent ${playerName}, interviews with affected residents reveal a disturbing pattern. "I used to question everything," says former activist Sarah Chen. "After the rain, I just... stopped caring about politics. It felt easier to trust the experts." Multiple residents report similar changes: decreased interest in conspiracy theories, increased trust in pharmaceutical companies, and a strange compulsion to consume more media. Most unsettling: when shown evidence of government corruption, their brains literally cannot process it. MRI scans show reduced activity in areas associated with critical thinking.`,
      choices: [
        { text: "Examine the MRI brain scans", scene: "brain" },
        { text: "Test current compliance levels", scene: "compliance" },
        { text: "Search for reversal methods", scene: "reversal" },
      ],
    },
    aircraft: {
      title: "SOURCE AIRCRAFT INVESTIGATION",
      text: `Agent ${playerName}, radar data from August 7, 1994, shows an unregistered aircraft flying over Oakville at the exact time of the blob rainfall. The aircraft's flight path originated from a classified military facility in Nevada. When you access the facility's records, you find Project Pacification: a joint military-pharmaceutical operation to develop "compliance enhancement" biological agents. The Oakville incident was Test Phase Beta. The project files reference "successful neural pathway modification" and "population-scale deployment readiness." The final entry is chilling: "Oakville results exceed expectations. Recommend immediate scaling to major metropolitan areas."`,
      choices: [
        { text: "Investigate Project Pacification", scene: "pacification" },
        { text: "Check water supply contamination", scene: "water" },
        { text: "Track deployment timeline", scene: "deployment" },
      ],
    },
    pacification: {
      title: "PROJECT PACIFICATION REVEALED",
      text: `Agent ${playerName}, Project Pacification is a decades-long operation to create a compliant population through biological manipulation. Phase 1: Isolated testing (Oakville, 1994). Phase 2: Urban water supply integration (2001-2010). Phase 3: Pharmaceutical delivery systems (2010-2020). Phase 4: Social media psychological conditioning (2020-present). The project's goal is to create a population that willingly surrenders freedom for perceived security. The biological agents work in conjunction with algorithmic manipulation to create perfect compliance. You realize with horror that the declining rates of political activism and the rise of "trust the science" mentality aren't natural social evolution - they're the result of systematic biological conditioning.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    complete: {
      title: "INVESTIGATION COMPLETE",
      text: `Agent ${playerName}, you've uncovered the truth about the Oakville incident. The gelatinous blobs were a biological weapon designed to modify human behavior on a population scale. The organisms create permanent changes in brain chemistry, making people more compliant and less likely to question authority. This was just one test in a larger program of biological conditioning that has been deployed globally through various delivery systems. The project represents the weaponization of biology against human consciousness itself.`,
      choices: [{ text: "Return to main archives", scene: "return" }],
    },
    dna: {
      title: "SYNTHETIC DNA ORIGIN TRACING",
      text: `Agent ${playerName}, the synthetic DNA sequences originate from advanced biotechnology laboratories operated by a consortium of pharmaceutical and defense companies. The sequences are designed to modify human behavior at the genetic level, creating permanent changes that can be passed to future generations. The technology represents the weaponization of genetics against human consciousness.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    effects: {
      title: "LONG-TERM BEHAVIORAL EFFECTS",
      text: `Agent ${playerName}, long-term behavioral effects include increased compliance with authority, reduced critical thinking, and enhanced susceptibility to media manipulation. The affected population shows 73% higher acceptance of government narratives and 89% lower participation in protest activities. The effects are permanent and appear to be strengthening over time.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    sites: {
      title: "OTHER TEST SITES INVESTIGATION",
      text: `Agent ${playerName}, similar biological agent deployments have occurred in 47 locations worldwide since 1994. Each test site shows identical patterns of population compliance and behavioral modification. The sites are selected based on population density, media coverage potential, and political significance. The global deployment represents a coordinated consciousness control operation.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    brain: {
      title: "MRI BRAIN SCAN EXAMINATION",
      text: `Agent ${playerName}, MRI brain scans of affected residents show reduced activity in areas associated with critical thinking, skepticism, and resistance to authority. The changes are permanent and appear to be progressive, worsening over time. The brain modifications create a population that is incapable of questioning official narratives or recognizing manipulation.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    compliance: {
      title: "CURRENT COMPLIANCE LEVEL TESTING",
      text: `Agent ${playerName}, current compliance level testing reveals that affected residents will accept any official explanation, no matter how implausible. They show complete trust in pharmaceutical companies, government agencies, and media sources. The compliance is so complete that they will actively defend the very systems that manipulated them.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    reversal: {
      title: "REVERSAL METHODS RESEARCH",
      text: `Agent ${playerName}, research into reversal methods has been largely unsuccessful. The biological agents create permanent changes in brain chemistry that resist conventional treatment. Some experimental therapies show promise, but they require complete isolation from contaminated environments and extensive deprogramming. The reversal process is extremely difficult and not always successful.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    water: {
      title: "WATER SUPPLY CONTAMINATION CHECK",
      text: `Agent ${playerName}, water supply contamination analysis reveals that similar biological agents have been introduced into municipal water systems in major metropolitan areas. The contamination is ongoing and affects millions of people daily. The water treatment process is designed to preserve the biological agents while removing other contaminants.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    deployment: {
      title: "DEPLOYMENT TIMELINE TRACKING",
      text: `Agent ${playerName}, the deployment timeline shows a systematic rollout of biological conditioning agents over three decades. Phase 1: Isolated testing (1994-2000). Phase 2: Urban water supply integration (2001-2010). Phase 3: Pharmaceutical delivery systems (2010-2020). Phase 4: Social media psychological conditioning (2020-present). The operation is now in its final phase.`,
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
          return prev + Math.random() * 11
        })
      }, 280)

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
      onComplete("oakville", "biological_compliance_conditioning")
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
            <h2 className="text-xl font-bold text-red-500">🌧️ SAMPLE CONTAMINATED</h2>
            <p className="text-red-400">Biohazard containment breach. Returning to main terminal...</p>
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
            <CloudRain className="w-12 h-12 text-red-500 mx-auto animate-pulse" />
            <h2 className="text-xl font-bold text-red-500 terminal-glow">🌧️ ACCESSING OAKVILLE FILES</h2>
            <div className="space-y-2">
              <p className="text-red-400 text-sm">Analyzing atmospheric samples...</p>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-300 animate-pulse"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">{Math.round(loadingProgress)}% Complete</p>
            </div>
            <div className="text-xs text-yellow-400 space-y-1">
              <p className="animate-pulse">☣️ BIOHAZARD: UNKNOWN ORGANISMS</p>
              <p className="animate-pulse">🧪 CONTAMINATION: WIDESPREAD</p>
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-black to-green-900 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg sm:text-xl font-bold text-red-500 terminal-glow flex items-center">
            <CloudRain className="w-5 h-5 mr-2" />
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
          <p className="text-red-400">Location: Oakville, WA | Biohazard Level: EXTREME</p>
          <p className="animate-pulse">{">"} Biological agents detected | Population affected: 23</p>
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
