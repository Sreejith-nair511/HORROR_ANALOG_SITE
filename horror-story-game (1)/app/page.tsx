"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Volume2, VolumeX, Terminal } from "lucide-react"
import ChernobylFiles from "../components/chernobyl-files"
import DyatlovRecording from "../components/dyatlov-recording"
import Unit731Experiments from "../components/unit731-experiments"
import BenningtonTriangle from "../components/bennington-triangle"
import OakvilleRain from "../components/oakville-rain"
import HoerVerdeVanishings from "../components/hoer-verde-vanishings"
import FinalRevelation from "../components/final-revelation"

export default function EchoesOfTheUnknown() {
  const [playerName, setPlayerName] = useState("")
  const [gameStarted, setGameStarted] = useState(false)
  const [currentSubplot, setCurrentSubplot] = useState<string>("")
  const [completedSubplots, setCompletedSubplots] = useState<string[]>([])
  const [discoveredClues, setDiscoveredClues] = useState<string[]>([])
  const [showFinalRevelation, setShowFinalRevelation] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [isAudioLoaded, setIsAudioLoaded] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)

  const [terminalText, setTerminalText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  const subplots = [
    {
      id: "chernobyl",
      title: "☢️ Chernobyl Files",
      description: "Classified reactor incident reports",
      status: "CLASSIFIED",
    },
    {
      id: "dyatlov",
      title: "🏔️ Dyatlov Pass Recording",
      description: "Final radio transmission analysis",
      status: "ENCRYPTED",
    },
    {
      id: "unit731",
      title: "🧪 Unit 731 Experiments",
      description: "Biological warfare documentation",
      status: "REDACTED",
    },
    {
      id: "bennington",
      title: "🌲 Bennington Triangle",
      description: "Missing persons investigation",
      status: "UNSOLVED",
    },
    {
      id: "oakville",
      title: "🌧️ Oakville Rain Blobs",
      description: "Atmospheric anomaly samples",
      status: "QUARANTINED",
    },
    {
      id: "hoerverde",
      title: "🌊 Hoer Verde Vanishings",
      description: "Maritime disappearance logs",
      status: "RESTRICTED",
    },
  ]

  const startGame = () => {
    if (playerName.trim()) {
      setGameStarted(true)
      setUserInteracted(true)
      typeTerminalText("WELCOME TO THE CLASSIFIED ARCHIVES, AGENT " + playerName.toUpperCase())
    }
  }

  const typeTerminalText = (text: string) => {
    setTerminalText("")
    let index = 0
    const interval = setInterval(() => {
      if (index < text.length) {
        setTerminalText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 50)
  }

  const restartGame = () => {
    setGameStarted(false)
    setCurrentSubplot("")
    setCompletedSubplots([])
    setDiscoveredClues([])
    setShowFinalRevelation(false)
    setPlayerName("")
    setTerminalText("")
  }

  const navigateToSubplot = (subplotId: string) => {
    setCurrentSubplot(subplotId)
    setUserInteracted(true)
  }

  const completeSubplot = (subplotId: string, clue: string) => {
    if (!completedSubplots.includes(subplotId)) {
      setCompletedSubplots((prev) => [...prev, subplotId])
    }
    if (!discoveredClues.includes(clue)) {
      setDiscoveredClues((prev) => [...prev, clue])
    }
    setCurrentSubplot("")
  }

  const backToMain = () => {
    setCurrentSubplot("")
    setShowFinalRevelation(false)
  }

  useEffect(() => {
    // Check if all subplots are completed
    if (completedSubplots.length === subplots.length && !showFinalRevelation) {
      setShowFinalRevelation(true)
    }
  }, [completedSubplots, showFinalRevelation, subplots.length])

  useEffect(() => {
    // Cursor blinking animation
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/audio/tense-horror-background.mp3")
      audioRef.current.loop = true
      audioRef.current.volume = 0.3
      audioRef.current.preload = "auto"

      audioRef.current.addEventListener("canplaythrough", () => {
        setIsAudioLoaded(true)
      })

      audioRef.current.addEventListener("error", (e) => {
        console.log("Audio failed to load:", e)
      })

      audioRef.current.load()
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current && audioEnabled && isAudioLoaded && userInteracted) {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch((e) => {
          console.log("Audio play failed:", e)
        })
      }
    } else if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [audioEnabled, isAudioLoaded, userInteracted])

  const toggleAudio = () => {
    setUserInteracted(true)
    setAudioEnabled(!audioEnabled)
  }

  const handleUserInteraction = () => {
    setUserInteracted(true)
  }

  // Render current subplot
  if (currentSubplot === "chernobyl") {
    return (
      <ChernobylFiles
        playerName={playerName}
        onComplete={completeSubplot}
        onBack={backToMain}
        audioEnabled={audioEnabled}
        onToggleAudio={toggleAudio}
      />
    )
  }
  if (currentSubplot === "dyatlov") {
    return (
      <DyatlovRecording
        playerName={playerName}
        onComplete={completeSubplot}
        onBack={backToMain}
        audioEnabled={audioEnabled}
        onToggleAudio={toggleAudio}
      />
    )
  }
  if (currentSubplot === "unit731") {
    return (
      <Unit731Experiments
        playerName={playerName}
        onComplete={completeSubplot}
        onBack={backToMain}
        audioEnabled={audioEnabled}
        onToggleAudio={toggleAudio}
      />
    )
  }
  if (currentSubplot === "bennington") {
    return (
      <BenningtonTriangle
        playerName={playerName}
        onComplete={completeSubplot}
        onBack={backToMain}
        audioEnabled={audioEnabled}
        onToggleAudio={toggleAudio}
      />
    )
  }
  if (currentSubplot === "oakville") {
    return (
      <OakvilleRain
        playerName={playerName}
        onComplete={completeSubplot}
        onBack={backToMain}
        audioEnabled={audioEnabled}
        onToggleAudio={toggleAudio}
      />
    )
  }
  if (currentSubplot === "hoerverde") {
    return (
      <HoerVerdeVanishings
        playerName={playerName}
        onComplete={completeSubplot}
        onBack={backToMain}
        audioEnabled={audioEnabled}
        onToggleAudio={toggleAudio}
      />
    )
  }

  // Render final revelation
  if (showFinalRevelation) {
    return (
      <FinalRevelation
        playerName={playerName}
        clues={discoveredClues}
        onRestart={restartGame}
        audioEnabled={audioEnabled}
        onToggleAudio={toggleAudio}
      />
    )
  }

  // Start screen
  if (!gameStarted) {
    return (
      <div
        className="min-h-screen bg-black text-red-500 font-mono flex items-center justify-center p-4 relative overflow-hidden"
        onClick={handleUserInteraction}
        onTouchStart={handleUserInteraction}
      >
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-black to-red-900 animate-pulse"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255, 0, 0, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(255, 0, 0, 0.1) 0%, transparent 50%)`,
              animation: "float 6s ease-in-out infinite",
            }}
          ></div>
        </div>

        <Card className="bg-black/90 border-red-500 border-2 p-6 max-w-md w-full relative z-10 shadow-2xl shadow-red-500/20">
          <div className="text-center space-y-6">
            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <Terminal className="w-8 h-8 text-red-500 mr-2 animate-pulse" />
                <h1 className="text-2xl font-bold text-red-500 terminal-glow">ECHOES</h1>
              </div>
              <h2 className="text-lg text-red-400 mb-2">OF THE UNKNOWN</h2>
              <div className="text-xs text-gray-500 space-y-1">
                <p>⚠️ CLASSIFIED ACCESS TERMINAL</p>
                <p>🔒 AUTHORIZED PERSONNEL ONLY</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-left">
                <p className="text-red-400 text-sm mb-2">ENTER AGENT DESIGNATION:</p>
                <Input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Your name..."
                  className="bg-black border-red-500 text-red-400 placeholder-red-600/50 focus:border-red-400 transition-colors"
                  onKeyPress={(e) => e.key === "Enter" && startGame()}
                  onClick={handleUserInteraction}
                  onTouchStart={handleUserInteraction}
                  autoComplete="off"
                />
              </div>

              <Button
                onClick={startGame}
                disabled={!playerName.trim()}
                className="w-full bg-red-600 hover:bg-red-700 text-white border-red-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 min-h-[44px] font-semibold"
              >
                INITIALIZE ACCESS
              </Button>
            </div>

            <div className="pt-4 border-t border-red-800">
              <Button
                onClick={toggleAudio}
                variant="outline"
                size="sm"
                className={`w-full min-h-[44px] ${
                  audioEnabled
                    ? "border-red-400 text-red-400 hover:bg-red-400"
                    : "border-gray-600 text-gray-400 hover:bg-gray-600"
                } hover:text-black transition-colors`}
              >
                {audioEnabled ? (
                  <>
                    <Volume2 className="w-4 h-4 mr-2" />
                    AUDIO: ENABLED
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 mr-2" />
                    AUDIO: DISABLED
                  </>
                )}
              </Button>
              {!userInteracted && (
                <p className="text-xs text-yellow-400 mt-2 animate-pulse">📱 Tap anywhere to enable audio</p>
              )}
            </div>
          </div>
        </Card>

        <style jsx>{`
          .terminal-glow {
            text-shadow: 
              0 0 5px #ff0000,
              0 0 10px #ff0000,
              0 0 15px #ff0000,
              0 0 20px #ff0000;
            animation: glow 2s ease-in-out infinite alternate;
          }
          
          @keyframes glow {
            from { text-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000, 0 0 15px #ff0000; }
            to { text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(1deg); }
          }
        `}</style>
      </div>
    )
  }

  // Main menu
  return (
    <div
      className="min-h-screen bg-black text-red-500 font-mono p-4 relative overflow-hidden"
      onClick={handleUserInteraction}
      onTouchStart={handleUserInteraction}
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-black to-red-900 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Terminal header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-2">
            <Terminal className="w-6 h-6 text-red-500 mr-2 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-bold text-red-500 terminal-glow">CLASSIFIED ARCHIVES</h1>
          </div>
          <div className="text-sm text-red-400 mb-4">
            {terminalText}
            <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>█</span>
          </div>
          <p className="text-xs text-gray-500">Agent {playerName} | Clearance Level: MAXIMUM</p>
        </div>

        {/* Progress indicator */}
        <Card className="bg-black/90 border-red-500 border p-4 mb-6 shadow-xl shadow-red-500/10">
          <div className="text-center">
            <p className="text-red-400 text-sm mb-2">INVESTIGATION PROGRESS</p>
            <div className="flex justify-center space-x-2 mb-2">
              {subplots.map((subplot) => (
                <div
                  key={subplot.id}
                  className={`w-3 h-3 rounded-full ${
                    completedSubplots.includes(subplot.id) ? "bg-green-500 animate-pulse" : "bg-gray-700"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-400">
              {completedSubplots.length}/{subplots.length} FILES ANALYZED
            </p>
            {completedSubplots.length === subplots.length && (
              <p className="text-yellow-400 text-sm mt-2 animate-pulse">🔓 FINAL REVELATION UNLOCKED</p>
            )}
          </div>
        </Card>

        {/* Subplot grid */}
        <div className="grid gap-4 mb-6">
          {subplots.map((subplot) => {
            const isCompleted = completedSubplots.includes(subplot.id)
            return (
              <Button
                key={subplot.id}
                onClick={() => navigateToSubplot(subplot.id)}
                className={`w-full p-4 h-auto text-left justify-start transition-all duration-300 min-h-[60px] ${
                  isCompleted
                    ? "bg-green-900/20 border-green-500 text-green-400 hover:bg-green-900/40"
                    : "bg-red-900/20 border-red-500 text-red-400 hover:bg-red-900/40"
                } border-2 hover:shadow-lg hover:shadow-red-500/20`}
                variant="outline"
              >
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm sm:text-base">{subplot.title}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        isCompleted ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {isCompleted ? "ANALYZED" : subplot.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{subplot.description}</p>
                </div>
              </Button>
            )
          })}
        </div>

        {/* Final revelation button */}
        {completedSubplots.length === subplots.length && (
          <Card className="bg-red-900/20 border-yellow-500 border-2 p-4 mb-6 animate-pulse">
            <Button
              onClick={() => setShowFinalRevelation(true)}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold min-h-[60px] text-lg"
            >
              🔓 ACCESS FINAL REVELATION
            </Button>
          </Card>
        )}

        {/* Control buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button
            onClick={restartGame}
            variant="outline"
            className="border-gray-500 text-gray-400 hover:bg-gray-500 hover:text-black min-h-[44px] px-6"
          >
            RESET TERMINAL
          </Button>

          <Button
            onClick={toggleAudio}
            variant="outline"
            className={`min-h-[44px] px-6 ${
              audioEnabled
                ? "border-red-400 text-red-400 hover:bg-red-400"
                : "border-gray-500 text-gray-400 hover:bg-gray-500"
            } hover:text-black transition-colors`}
          >
            {audioEnabled ? (
              <>
                <Volume2 className="w-4 h-4 mr-2" />
                AUDIO: ON
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 mr-2" />
                AUDIO: OFF
              </>
            )}
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-600 space-y-1">
          <p>⚠️ CLASSIFIED MATERIAL - UNAUTHORIZED ACCESS PROHIBITED</p>
          <p>📱 Optimized for mobile investigation</p>
          {!userInteracted && <p className="text-yellow-400 animate-pulse">📱 Tap anywhere to enable audio</p>}
        </div>
      </div>

      <style jsx>{`
        .terminal-glow {
          text-shadow: 
            0 0 5px #ff0000,
            0 0 10px #ff0000,
            0 0 15px #ff0000;
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
