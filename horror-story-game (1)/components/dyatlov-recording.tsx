"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Volume2, VolumeX, Radio } from "lucide-react"

interface DyatlovRecordingProps {
  playerName: string
  onComplete: (subplotId: string, clue: string) => void
  onBack: () => void
  audioEnabled: boolean
  onToggleAudio: () => void
}

export default function DyatlovRecording({
  playerName,
  onComplete,
  onBack,
  audioEnabled,
  onToggleAudio,
}: DyatlovRecordingProps) {
  const [currentScene, setCurrentScene] = useState("loading")
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showChoices, setShowChoices] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const typewriterRef = useRef<NodeJS.Timeout>()

  const scenes = {
    loading: {
      title: "🏔️ ACCESSING DYATLOV PASS RECORDINGS",
      text: "Decrypting radio transmissions...",
      choices: [],
    },
    intro: {
      title: "🏔️ DYATLOV PASS - FINAL RADIO TRANSMISSION",
      text: `Agent ${playerName}, you've accessed the classified audio files from the Dyatlov Pass incident. Nine experienced hikers died under impossible circumstances in February 1959. The official cause: "unknown compelling force." However, recovered radio equipment contains a final transmission never released to the public. At 23:47 on February 1st, expedition leader Igor Dyatlov transmitted: "The lights... they're not from aircraft. They're moving in patterns. Mathematical patterns. Something is watching us." The transmission cuts to static, then resumes with a voice that isn't Dyatlov's: "The test subjects are responding as predicted. Initiating Phase 2."`,
      choices: [
        { text: "Analyze the mathematical light patterns", scene: "patterns" },
        { text: "Investigate the unknown voice", scene: "voice" },
        { text: "Examine the tent damage evidence", scene: "tent" },
      ],
    },
    patterns: {
      title: "MATHEMATICAL LIGHT ANALYSIS",
      text: `Agent ${playerName}, spectral analysis of the lights reveals they emit frequencies that directly affect human brain chemistry. The patterns follow the Fibonacci sequence, creating a hypnotic effect that overrides conscious thought. Witnesses describe feeling "compelled" to follow the lights, losing control of their actions. Similar lights have been reported at every major unexplained disappearance of the last century. They're not natural phenomena - they're a form of consciousness manipulation technology, testing human responses to external neural influence.`,
      choices: [
        { text: "Research other light sightings", scene: "sightings" },
        { text: "Study the neural manipulation effects", scene: "neural" },
        { text: "Investigate the technology source", scene: "source" },
      ],
    },
    voice: {
      title: "UNKNOWN VOICE ANALYSIS",
      text: `Agent ${playerName}, voice pattern analysis reveals the unknown speaker isn't human. The vocal cords would need to be 40% longer than anatomically possible, and the speech patterns follow no known linguistic structure. More disturbing: the voice speaks in perfect Russian, but uses future tense constructions that won't be developed until the 1970s. Background audio contains electronic sounds that match no 1959 technology. The voice refers to "test subjects" and "Phase 2," suggesting the hikers were part of an experiment they never knew they were participating in.`,
      choices: [
        { text: "Decode the electronic background sounds", scene: "electronics" },
        { text: "Research the experimental phases", scene: "phases" },
        { text: "Investigate linguistic anomalies", scene: "linguistics" },
      ],
    },
    tent: {
      title: "TENT DAMAGE FORENSICS",
      text: `Agent ${playerName}, the tent was cut from the inside with surgical precision - too perfect for panicked hikers using knives in darkness. The cuts follow geometric patterns, and microscopic analysis reveals the edges were cauterized by extreme heat. No known 1959 tool could create such damage. More puzzling: the hikers' footprints in the snow show they walked calmly away from the tent in single file, despite sub-zero temperatures and inadequate clothing. Their behavior suggests they were under some form of external control.`,
      choices: [
        { text: "Analyze the geometric cut patterns", scene: "geometry" },
        { text: "Investigate the heat cauterization", scene: "heat" },
        { text: "Study the controlled behavior evidence", scene: "control" },
      ],
    },
    sightings: {
      title: "GLOBAL LIGHT PHENOMENON DATABASE",
      text: `Agent ${playerName}, cross-referencing global databases reveals identical light patterns at 47 unexplained disappearances across six decades. Each incident involves groups of 3-9 people, always in remote locations, always followed by official cover-ups. The lights appear in a specific sequence: observation phase (3-7 days), contact phase (direct interaction), and collection phase (disappearance or death). Dyatlov Pass was a collection phase. The pattern suggests a systematic study of human behavior under extreme stress.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    complete: {
      title: "INVESTIGATION COMPLETE",
      text: `Agent ${playerName}, you've uncovered the truth about Dyatlov Pass. The incident was part of a systematic study of human consciousness under extreme conditions. The lights are a form of advanced technology, possibly extraterrestrial, conducting long-term behavioral experiments on humanity. The hikers weren't victims of natural forces - they were test subjects in a cosmic laboratory. This revelation connects to a larger pattern of manipulation spanning decades.`,
      choices: [{ text: "Return to main archives", scene: "return" }],
    },
    neural: {
      title: "NEURAL MANIPULATION EFFECTS",
      text: `Agent ${playerName}, the lights emit specific frequencies that directly interface with human neural pathways. The technology can override conscious decision-making, implant false memories, and modify behavior patterns. Victims become unwilling test subjects in consciousness manipulation experiments. The same frequencies are now being deployed through digital devices worldwide.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    source: {
      title: "TECHNOLOGY SOURCE INVESTIGATION",
      text: `Agent ${playerName}, the consciousness manipulation technology originates from recovered artifacts of unknown origin. The technology has been reverse-engineered and deployed in various forms since the 1940s. The lights at Dyatlov Pass were an early field test of portable consciousness control devices. The technology is now integrated into modern communication systems.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    electronics: {
      title: "ELECTRONIC BACKGROUND ANALYSIS",
      text: `Agent ${playerName}, the electronic sounds in the background match no 1959 technology. The frequencies suggest advanced digital processing capabilities that wouldn't be developed by humans for decades. The sounds appear to be real-time consciousness scanning and data transmission. The technology was recording and analyzing the hikers' mental states during the experiment.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    phases: {
      title: "EXPERIMENTAL PHASES INVESTIGATION",
      text: `Agent ${playerName}, the experimental phases represent a systematic study of human consciousness under extreme conditions. Phase 1: Observation and baseline measurement. Phase 2: Consciousness manipulation and behavioral modification. Phase 3: Data extraction and subject termination. Dyatlov Pass was a Phase 3 operation, designed to test the limits of consciousness control technology.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    linguistics: {
      title: "LINGUISTIC ANOMALY ANALYSIS",
      text: `Agent ${playerName}, the voice uses linguistic structures that won't be developed until decades later, suggesting either time travel or advanced predictive capabilities. The speech patterns indicate non-human origin, possibly artificial intelligence or extraterrestrial communication. The voice demonstrates perfect knowledge of future human language evolution.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    geometry: {
      title: "GEOMETRIC CUT PATTERN ANALYSIS",
      text: `Agent ${playerName}, the tent cuts follow mathematical patterns found in advanced engineering blueprints. The precision suggests the use of energy-based cutting tools that create perfectly straight lines through fabric. The patterns match those found at other unexplained incidents worldwide, indicating the same technology and operators are involved.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    heat: {
      title: "HEAT CAUTERIZATION INVESTIGATION",
      text: `Agent ${playerName}, the heat cauterization was caused by directed energy weapons that instantly seal cut edges. The temperature required would vaporize human tissue, yet the cuts were made with surgical precision. This technology is far beyond 1959 capabilities, suggesting extraterrestrial or time-displaced origin.`,
      choices: [{ text: "Complete the investigation", scene: "complete" }],
    },
    control: {
      title: "CONTROLLED BEHAVIOR EVIDENCE",
      text: `Agent ${playerName}, the hikers' behavior shows clear signs of external consciousness control. Their orderly exit from the tent and calm walk into deadly conditions indicates complete override of survival instincts. Brain scans of similar victims show artificial neural pathways consistent with technological mind control. The hikers were biological puppets controlled by external intelligence.`,
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
          return prev + Math.random() * 12
        })
      }, 250)

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
      onComplete("dyatlov", "consciousness_manipulation_technology")
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
            <h2 className="text-xl font-bold text-red-500">📻 TRANSMISSION CORRUPTED</h2>
            <p className="text-red-400">Signal lost. Returning to main terminal...</p>
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
            <Radio className="w-12 h-12 text-red-500 mx-auto animate-pulse" />
            <h2 className="text-xl font-bold text-red-500 terminal-glow">🏔️ ACCESSING RADIO LOGS</h2>
            <div className="space-y-2">
              <p className="text-red-400 text-sm">Decrypting transmission data...</p>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-300 animate-pulse"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">{Math.round(loadingProgress)}% Complete</p>
            </div>
            <div className="text-xs text-yellow-400 space-y-1">
              <p className="animate-pulse">📻 SIGNAL STRENGTH: WEAK</p>
              <p className="animate-pulse">🌡️ TEMPERATURE: -40°C</p>
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-black to-white animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg sm:text-xl font-bold text-red-500 terminal-glow flex items-center">
            <Radio className="w-5 h-5 mr-2" />
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
          <p className="text-red-400">Location: Dyatlov Pass | Temperature: -40°C</p>
          <p className="animate-pulse">{">"} Radio interference: EXTREME | Signal analysis: ACTIVE</p>
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
