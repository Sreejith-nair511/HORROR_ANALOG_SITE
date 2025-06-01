"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Volume2, VolumeX, FileText, AlertTriangle } from "lucide-react"

interface ChernobylFilesProps {
  playerName: string
  onComplete: (subplotId: string, clue: string) => void
  onBack: () => void
  audioEnabled: boolean
  onToggleAudio: () => void
}

export default function ChernobylFiles({
  playerName,
  onComplete,
  onBack,
  audioEnabled,
  onToggleAudio,
}: ChernobylFilesProps) {
  const [currentScene, setCurrentScene] = useState("loading")
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showChoices, setShowChoices] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const typewriterRef = useRef<NodeJS.Timeout>()

  const scenes = {
    loading: {
      title: "☢️ ACCESSING CHERNOBYL ARCHIVES",
      text: "Decrypting classified reactor files...",
      choices: [],
    },
    intro: {
      title: "☢️ CHERNOBYL NUCLEAR FACILITY - CLASSIFIED FILES",
      text: `Agent ${playerName}, you've accessed the restricted Chernobyl database. Official records state reactor failure at 01:23:40 on April 26, 1986. However, classified documents reveal anomalous readings 72 hours before the incident. Radiation signatures don't match known nuclear decay patterns. Surveillance footage shows unidentified personnel in the reactor core area using equipment not in any Soviet inventory. Most disturbing: seismic sensors detected rhythmic pulses beneath the facility, as if something was... breathing. The explosion wasn't an accident. It was a containment breach.`,
      choices: [
        { text: "Examine pre-incident anomalous readings", scene: "readings" },
        { text: "Review surveillance footage", scene: "footage" },
        { text: "Investigate seismic data", scene: "seismic" },
      ],
    },
    readings: {
      title: "ANOMALOUS RADIATION SIGNATURES",
      text: `Agent ${playerName}, the radiation readings are impossible. Three days before the explosion, sensors detected organized patterns in the radioactive emissions - geometric shapes, mathematical sequences, almost like... communication. The patterns match no known nuclear physics. Dr. Legasov's hidden notes mention "intelligent radiation" and "conscious decay." His final entry, written hours before his death: "It's not just energy. It's alive. And it's been waiting." The readings suggest something was using the reactor as a transmission device, broadcasting signals into space... or receiving them.`,
      choices: [
        { text: "Decode the geometric patterns", scene: "patterns" },
        { text: "Investigate Dr. Legasov's death", scene: "legasov" },
        { text: "Trace the signal destination", scene: "signals" },
      ],
    },
    footage: {
      title: "CLASSIFIED SURVEILLANCE ANALYSIS",
      text: `Agent ${playerName}, the footage reveals personnel in advanced radiation suits moving through the reactor core 48 hours before the explosion. Their equipment emits a strange blue light that doesn't appear on any Soviet technical manual. Frame-by-frame analysis shows they're installing devices around the reactor core. When enhanced, one figure removes their helmet. The face is human, but the eyes... the eyes are completely black, reflecting light like mirrors. The timestamp shows they worked for exactly 3 hours and 33 minutes before vanishing. No record of their entry or exit exists.`,
      choices: [
        { text: "Analyze the unknown equipment", scene: "equipment" },
        { text: "Investigate the black-eyed personnel", scene: "personnel" },
        { text: "Track their entry/exit routes", scene: "routes" },
      ],
    },
    seismic: {
      title: "UNDERGROUND SEISMIC ANOMALIES",
      text: `Agent ${playerName}, seismic data reveals a massive hollow chamber 2 kilometers beneath the reactor. The rhythmic pulses originated from this void, following a pattern: 3 beats, pause, 7 beats, pause, 11 beats. Prime numbers. The chamber predates the facility by centuries, possibly millennia. Ground-penetrating radar shows geometric structures inside - too perfect to be natural. Soviet geological surveys from 1970 mention "architectural anomalies" but all researchers on that team died in "accidents" within six months. The reactor wasn't built here by chance. It was built as a lid.`,
      choices: [
        { text: "Investigate the geometric structures", scene: "structures" },
        { text: "Research the dead geological team", scene: "team" },
        { text: "Decode the prime number sequence", scene: "sequence" },
      ],
    },
    patterns: {
      title: "GEOMETRIC PATTERN ANALYSIS",
      text: `Agent ${playerName}, the radiation patterns form complex mathematical sequences - fractals, golden ratios, and symbols that match no known human language. When overlaid on a star map, they point to a specific region of space: the Vega system. Radio telescopes detected similar patterns from that direction in 1977 - the famous "Wow! Signal." The patterns aren't random. They're coordinates, instructions, and most terrifyingly... a countdown. The sequence ends on December 21, 2024. Something is coming, and Chernobyl was just the beacon to guide it here.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    complete: {
      title: "INVESTIGATION COMPLETE",
      text: `Agent ${playerName}, you've uncovered the truth about Chernobyl. The facility was built over an ancient structure, possibly of extraterrestrial origin. The 1986 incident wasn't an accident but a deliberate activation of a cosmic beacon. The radiation patterns were a signal broadcast into space, and something has been responding. You've discovered the first piece of a larger conspiracy spanning decades and multiple locations. The countdown has begun.`,
      choices: [{ text: "Return to main archives", scene: "return" }],
    },
    equipment: {
      title: "UNKNOWN EQUIPMENT ANALYSIS",
      text: `Agent ${playerName}, the equipment emits electromagnetic frequencies that match no known Soviet technology. The devices appear to be designed for consciousness manipulation, creating localized fields that can override human free will. Similar equipment has been found at other nuclear facilities worldwide, suggesting a coordinated global operation. The technology predates human scientific understanding by decades, indicating possible extraterrestrial origin.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    personnel: {
      title: "BLACK-EYED PERSONNEL INVESTIGATION",
      text: `Agent ${playerName}, facial recognition analysis reveals the black-eyed figures don't exist in any human database. Their physiological structure suggests genetic modification or possible hybrid origin. The black eyes reflect electromagnetic radiation in patterns that hypnotize observers. These beings have been spotted at every major nuclear incident since 1945, always installing similar equipment before disasters occur.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    routes: {
      title: "ENTRY/EXIT ROUTE ANALYSIS",
      text: `Agent ${playerName}, the personnel appeared and vanished without using any conventional entry points. Electromagnetic readings suggest they used some form of teleportation or dimensional shifting technology. The facility's security systems show no record of their presence, as if they exist outside normal spacetime. This technology explains how they can access any secure location worldwide.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    structures: {
      title: "UNDERGROUND GEOMETRIC STRUCTURES",
      text: `Agent ${playerName}, the structures beneath Chernobyl are impossibly ancient and geometrically perfect. They appear to be some form of cosmic antenna, designed to receive and transmit signals across vast distances. The reactor was built directly above the transmission focal point, using nuclear energy to amplify the signal. The 1986 explosion was the successful activation of this cosmic communication device.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    team: {
      title: "GEOLOGICAL TEAM INVESTIGATION",
      text: `Agent ${playerName}, the geological team that discovered the underground structures all died in "accidents" within six months. Car crashes, heart attacks, and suicides - but medical records show they all had identical brain lesions consistent with electromagnetic exposure. They were eliminated to prevent disclosure of the ancient structures. Their research notes were confiscated and classified at the highest levels.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    sequence: {
      title: "PRIME NUMBER SEQUENCE ANALYSIS",
      text: `Agent ${playerName}, the prime number sequence (3, 7, 11) is a mathematical signature found at every major unexplained phenomenon of the last century. It appears to be a form of cosmic identification code, marking locations where advanced technology interfaces with human civilization. The sequence continues beyond what was detected, forming a countdown to a specific date: December 21, 2024.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    legasov: {
      title: "DR. LEGASOV'S DEATH INVESTIGATION",
      text: `Agent ${playerName}, Dr. Legasov's death was officially ruled suicide, but evidence suggests assassination. His final recordings describe contact with "non-human intelligence" and warnings about humanity's future. He discovered that the radiation patterns were actually a form of communication, and someone killed him to prevent disclosure. His hidden notes contain coordinates to other cosmic beacon sites worldwide.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    signals: {
      title: "SIGNAL DESTINATION ANALYSIS",
      text: `Agent ${playerName}, the signals from Chernobyl were directed toward the Vega star system, 25 light-years away. Radio telescopes have detected response signals from that direction, suggesting successful contact with extraterrestrial intelligence. The communication appears to be coordinating a systematic study of human civilization, with Chernobyl serving as one of many data collection points.`,
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
    // Simulate loading
    if (currentScene === "loading") {
      const loadingInterval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(loadingInterval)
            setTimeout(() => setCurrentScene("intro"), 500)
            return 100
          }
          return prev + Math.random() * 15
        })
      }, 200)

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
      onComplete("chernobyl", "cosmic_beacon_signal")
    } else if (scenes[choice.scene as keyof typeof scenes]) {
      setCurrentScene(choice.scene)
    } else {
      console.error("Scene not found:", choice.scene)
      setCurrentScene("intro") // Fallback to intro
    }
  }

  const scene = scenes[currentScene as keyof typeof scenes]

  // Add fallback for missing scenes
  if (!scene) {
    return (
      <div className="min-h-screen bg-black text-red-500 font-mono flex items-center justify-center p-4">
        <Card className="bg-black/90 border-red-500 border-2 p-6 max-w-md w-full shadow-2xl shadow-red-500/20">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-bold text-red-500">⚠️ DATA CORRUPTION DETECTED</h2>
            <p className="text-red-400">File access error. Returning to main terminal...</p>
            <Button onClick={onBack} className="w-full bg-red-600 hover:bg-red-700 text-white min-h-[44px]">
              Return to Archives
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // Loading screen
  if (currentScene === "loading") {
    return (
      <div className="min-h-screen bg-black text-red-500 font-mono flex items-center justify-center p-4">
        <Card className="bg-black/90 border-red-500 border-2 p-6 max-w-md w-full shadow-2xl shadow-red-500/20">
          <div className="text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto animate-pulse" />
            <h2 className="text-xl font-bold text-red-500 terminal-glow">☢️ ACCESSING CHERNOBYL FILES</h2>
            <div className="space-y-2">
              <p className="text-red-400 text-sm">Decrypting classified documents...</p>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-300 animate-pulse"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">{Math.round(loadingProgress)}% Complete</p>
            </div>
            <div className="text-xs text-yellow-400 space-y-1">
              <p className="animate-pulse">⚠️ RADIATION LEVELS: EXTREME</p>
              <p className="animate-pulse">🔒 CLEARANCE: MAXIMUM REQUIRED</p>
            </div>
          </div>
        </Card>

        <style jsx>{`
          .terminal-glow {
            text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000;
            animation: glow 2s ease-in-out infinite alternate;
          }
          
          @keyframes glow {
            from { text-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000; }
            to { text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000; }
          }
        `}</style>
      </div>
    )
  }

  // Main content
  return (
    <div className="min-h-screen bg-black text-red-500 font-mono p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-black to-orange-900 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg sm:text-xl font-bold text-red-500 terminal-glow flex items-center">
            <FileText className="w-5 h-5 mr-2" />
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

        {/* Content */}
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

        {/* Status */}
        <div className="text-xs text-gray-500 text-center space-y-1">
          <p className="text-red-400">Location: Chernobyl Nuclear Facility | Status: CLASSIFIED</p>
          <p className="animate-pulse">{">"} Radiation levels: EXTREME | Anomaly detection: ACTIVE</p>
        </div>
      </div>

      <style jsx>{`
        .terminal-glow {
          text-shadow: 0 0 10px #ff0000;
          animation: glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
          from { text-shadow: 0 0 5px #ff0000; }
          to { text-shadow: 0 0 15px #ff0000; }
        }
      `}</style>
    </div>
  )
}
