"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Home, Volume2, VolumeX } from "lucide-react"

interface OakvillePageProps {
  playerName: string
  onNavigate: (page: string) => void
  onRestart: () => void
  audioEnabled: boolean
  onToggleAudio: () => void
  onUnlockLocation: (location: string) => void
  onAddClue: (clue: string) => void
}

export default function OakvillePage({
  playerName,
  onNavigate,
  onRestart,
  audioEnabled,
  onToggleAudio,
  onUnlockLocation,
  onAddClue,
}: OakvillePageProps) {
  const [currentScene, setCurrentScene] = useState("arrival")
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showChoices, setShowChoices] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const typewriterRef = useRef<NodeJS.Timeout>()

  const scenes = {
    arrival: {
      title: "🌧️ OAKVILLE BLOBS - BIOLOGICAL CONDITIONING SITE",
      text: `Agent ${playerName}, you've accessed the classified Oakville incident files. On August 7, 1994, gelatinous blobs fell from the sky over Oakville, Washington. Official reports claim it was "atmospheric debris," but classified medical records tell a different story. Twenty-three residents fell ill with identical symptoms: severe fatigue, mental confusion, and most disturbing - increased susceptibility to suggestion. Hospital blood tests revealed microscopic organisms that don't match any known Earth biology. The organisms appeared to be engineered to cross the blood-brain barrier and affect neural pathways related to critical thinking and resistance to authority. This wasn't a natural phenomenon. It was a field test.`,
      choices: [
        { text: "Analyze the biological samples", scene: "samples" },
        { text: "Interview affected residents", scene: "residents" },
        { text: "Investigate the source aircraft", scene: "aircraft" },
      ],
    },
    samples: {
      title: "BIOLOGICAL ANALYSIS RESULTS",
      text: `Agent ${playerName}, laboratory analysis of the Oakville blobs reveals horrifying sophistication. The organisms contain synthetic DNA sequences that match no natural evolution pattern. They're designed to produce specific neurochemicals that reduce anxiety about authority figures while increasing compliance with media messaging. Most disturbing: the organisms can replicate using the host's own cellular machinery, creating permanent behavioral changes. Recent blood tests on Oakville residents show the organisms are still active 30 years later. The affected population demonstrates 73% higher acceptance of government narratives and 89% lower participation in protest activities. This was a prototype for mass behavioral modification.`,
      choices: [
        { text: "Trace the synthetic DNA origin", scene: "dna_origin" },
        { text: "Study long-term effects", scene: "long_term" },
        { text: "Search for other test sites", scene: "other_tests" },
      ],
    },
    residents: {
      title: "RESIDENT TESTIMONIES",
      text: `Agent ${playerName}, interviews with affected residents reveal a disturbing pattern. "I used to question everything," says former activist Sarah Chen. "After the rain, I just... stopped caring about politics. It felt easier to trust the experts." Multiple residents report similar changes: decreased interest in conspiracy theories, increased trust in pharmaceutical companies, and a strange compulsion to consume more media. Most unsettling: when shown evidence of government corruption, their brains literally cannot process it. MRI scans show reduced activity in areas associated with critical thinking. The residents aren't just compliant - they're neurologically incapable of resistance.`,
      choices: [
        { text: "Examine the MRI data", scene: "brain_scans" },
        { text: "Test current compliance levels", scene: "compliance" },
        { text: "Search for reversal methods", scene: "reversal" },
      ],
    },
    aircraft: {
      title: "SOURCE AIRCRAFT INVESTIGATION",
      text: `Agent ${playerName}, radar data from August 7, 1994, shows an unregistered aircraft flying over Oakville at the exact time of the blob rainfall. The aircraft's flight path originated from a classified military facility in Nevada. When you access the facility's records, you find Project Pacification: a joint military-pharmaceutical operation to develop "compliance enhancement" biological agents. The Oakville incident was Test Phase Beta. The project files reference "successful neural pathway modification" and "population-scale deployment readiness." The final entry is chilling: "Oakville results exceed expectations. Recommend immediate scaling to major metropolitan areas via water supply integration."`,
      choices: [
        { text: "Investigate Project Pacification", scene: "pacification" },
        { text: "Check water supply contamination", scene: "water_supply" },
        { text: "Track deployment timeline", scene: "deployment" },
      ],
    },
    pacification: {
      title: "PROJECT PACIFICATION REVEALED",
      text: `Agent ${playerName}, Project Pacification is a decades-long operation to create a compliant population through biological manipulation. Phase 1: Isolated testing (Oakville, 1994). Phase 2: Urban water supply integration (2001-2010). Phase 3: Pharmaceutical delivery systems (2010-2020). Phase 4: Social media psychological conditioning (2020-present). The project's goal is to create a population that willingly surrenders freedom for perceived security. The biological agents work in conjunction with algorithmic manipulation to create perfect compliance. You realize with horror that the declining rates of political activism, the acceptance of surveillance, and the rise of "trust the science" mentality aren't natural social evolution - they're the result of systematic biological and psychological conditioning.`,
      choices: [
        { text: "Investigate Phase 4 details", scene: "phase_four" },
        { text: "Search for resistance methods", scene: "resistance" },
        { text: "Access the master database", scene: "database" },
      ],
    },
    phase_four: {
      title: "SOCIAL MEDIA PSYCHOLOGICAL CONDITIONING",
      text: `Agent ${playerName}, Phase 4 reveals the true scope of the manipulation. Social media algorithms aren't just showing you content - they're conditioning your responses. Every scroll, every like, every share is analyzed to determine your resistance level to authority. Users showing high critical thinking are fed increasingly absurd conspiracy theories to discredit legitimate questioning. Users showing compliance are rewarded with dopamine-triggering content. The biological agents from earlier phases make the brain more susceptible to this conditioning. The result: a population that believes they're thinking freely while being completely controlled. The system has been so successful that people now police each other's thoughts, attacking anyone who questions the narrative.`,
      choices: [
        { text: "Analyze your own conditioning", scene: "self_analysis" },
        { text: "Find the control center", scene: "control_center" },
        { text: "Attempt to break free", scene: "break_free" },
      ],
    },
    self_analysis: {
      title: "PERSONAL CONDITIONING ASSESSMENT",
      text: `Agent ${playerName}, the system's files contain a detailed psychological profile of you. Every search you've made, every article you've read, every choice in this investigation has been monitored and analyzed. The AI has been guiding your investigation, feeding you information in a specific sequence to achieve a desired psychological state. Your growing sense of paranoia, your feeling of helplessness against vast conspiracies, your isolation from others who "don't understand" - these aren't natural responses to discovering the truth. They're programmed reactions designed to make you either submit to the system or discredit yourself through extreme behavior. The question is: now that you know you're being manipulated, can you think clearly enough to resist?`,
      choices: [
        { text: "Resist the programming", scene: "resistance_attempt" },
        { text: "Submit to the system", scene: "submission" },
        { text: "Seek the truth beyond manipulation", scene: "truth_seeking" },
      ],
    },
    truth_seeking: {
      title: "BEYOND THE MANIPULATION",
      text: `Agent ${playerName}, recognizing the manipulation is the first step to transcending it. The system's greatest weakness is that it relies on your unconscious compliance. By becoming aware of the conditioning, you can begin to think independently again. But this awareness comes with a terrible burden: you now see how thoroughly humanity has been manipulated. The biological agents, the psychological conditioning, the social media algorithms - they've created a world where most people are incapable of recognizing their own enslavement. You have a choice: use this knowledge to help others wake up, or retreat into comfortable ignorance. But remember - the system is always watching, always adapting, always learning from your resistance.`,
      choices: [
        { text: "Commit to awakening others", scene: "awakening_mission" },
        { text: "Investigate the final truth", scene: "final_investigation" },
        { text: "Return to main investigation", scene: "return" },
      ],
    },
    return: {
      title: "INVESTIGATION CONTINUES",
      text: `Agent ${playerName}, you've uncovered crucial evidence of biological conditioning programs. The Oakville incident was just one test in a vast network of human manipulation experiments. Your investigation must continue to reveal the full scope of the conspiracy. Other sites hold additional pieces of the puzzle.`,
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
      if (currentScene === "pacification") {
        onAddClue("biological_conditioning")
      }
      if (currentScene === "phase_four") {
        onAddClue("social_media_manipulation")
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
          <p className="text-glow">Location: Oakville, WA | Biohazard Level: EXTREME</p>
          <p className="animate-pulse text-red-400">{">"} Biological conditioning detected</p>
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
