"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Mic,
  MicOff,
  ArrowLeft,
  Volume2,
  VolumeX,
  Languages,
  Play,
  Pause,
  RotateCcw,
  Download,
  Settings,
} from "lucide-react"
import Link from "next/link"

interface VoiceMessage {
  id: string
  type: "user" | "assistant"
  text: string
  audioUrl?: string
  language: string
  timestamp: Date
  duration?: number
}

export default function VoiceAIPage() {
  const [isListening, setIsListening] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [messages, setMessages] = useState<VoiceMessage[]>([])
  const [currentTranscript, setCurrentTranscript] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸", voice: "en-US" },
    { code: "ur", name: "Urdu", flag: "🇵🇰", voice: "ur-PK" },
    { code: "ar", name: "Arabic", flag: "🇸🇦", voice: "ar-SA" },
    { code: "hi", name: "Hindi", flag: "🇮🇳", voice: "hi-IN" },
    { code: "es", name: "Spanish", flag: "🇪🇸", voice: "es-ES" },
  ]

  const startListening = () => {
    setIsListening(true)
    setCurrentTranscript("")

    // Simulate voice recognition
    setTimeout(() => {
      const sampleTexts = {
        en: "I want to know about property investment opportunities in downtown area",
        ur: "میں شہر کے مرکز میں پراپرٹی کی سرمایہ کاری کے مواقع کے بارے میں جاننا چاہتا ہوں",
        ar: "أريد أن أعرف عن فرص الاستثمار العقاري في منطقة وسط المدينة",
        hi: "मैं शहर के केंद्र में संपत्ति निवेश के अवसरों के बारे में जानना चाहता हूं",
        es: "Quiero saber sobre oportunidades de inversión inmobiliaria en el centro de la ciudad",
      }

      setCurrentTranscript(sampleTexts[selectedLanguage as keyof typeof sampleTexts] || sampleTexts.en)
      setIsListening(false)
      setIsProcessing(true)

      // Process the message
      setTimeout(() => {
        processVoiceMessage(sampleTexts[selectedLanguage as keyof typeof sampleTexts] || sampleTexts.en)
      }, 1000)
    }, 3000)
  }

  const stopListening = () => {
    setIsListening(false)
  }

  const processVoiceMessage = (transcript: string) => {
    const userMessage: VoiceMessage = {
      id: Date.now().toString(),
      type: "user",
      text: transcript,
      language: selectedLanguage,
      timestamp: new Date(),
      duration: 3,
    }

    setMessages((prev) => [...prev, userMessage])
    setCurrentTranscript("")

    // Generate AI response
    setTimeout(() => {
      const aiResponse = generateVoiceResponse(transcript, selectedLanguage)
      const assistantMessage: VoiceMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        text: aiResponse,
        language: selectedLanguage,
        timestamp: new Date(),
        duration: 5,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsProcessing(false)

      // Auto-play AI response if voice is enabled
      if (voiceEnabled) {
        playMessage(assistantMessage)
      }
    }, 2000)
  }

  const generateVoiceResponse = (input: string, language: string): string => {
    const responses = {
      en: "Based on your interest in downtown property investment, I can tell you that the area shows strong potential. Current market trends indicate a 15% appreciation rate over the past year. The downtown district has excellent infrastructure, public transportation access, and ongoing development projects that should drive future growth. I recommend focusing on properties near the new business district expansion. Would you like me to analyze specific properties or provide more detailed market data?",
      ur: "آپ کی شہر کے مرکز میں پراپرٹی کی سرمایہ کاری میں دلچسپی کی بنیاد پر، میں آپ کو بتا سکتا ہوں کہ اس علاقے میں مضبوط صلاحیت ہے۔ موجودہ مارکیٹ کے رجحانات پچھلے سال میں 15% کی تعریف کی شرح ظاہر کرتے ہیں۔",
      ar: "بناءً على اهتمامك بالاستثمار العقاري في وسط المدينة، يمكنني أن أخبرك أن المنطقة تظهر إمكانات قوية. تشير اتجاهات السوق الحالية إلى معدل تقدير بنسبة 15% خلال العام الماضي.",
      hi: "शहर के केंद्र में संपत्ति निवेश में आपकी रुचि के आधार पर, मैं आपको बता सकता हूं कि इस क्षेत्र में मजबूत संभावनाएं हैं। वर्तमान बाजार के रुझान पिछले वर्ष में 15% की वृद्धि दर दिखाते हैं।",
      es: "Basándome en tu interés en la inversión inmobiliaria del centro, puedo decirte que el área muestra un fuerte potencial. Las tendencias actuales del mercado indican una tasa de apreciación del 15% durante el año pasado.",
    }

    return responses[language as keyof typeof responses] || responses.en
  }

  const playMessage = (message: VoiceMessage) => {
    setIsPlaying(true)
    // Simulate audio playback
    setTimeout(
      () => {
        setIsPlaying(false)
      },
      (message.duration || 3) * 1000,
    )
  }

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">Voice AI Assistant</h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <Languages className="h-4 w-4 text-slate-600" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Voice Toggle */}
            <button
              onClick={toggleVoice}
              className={`p-2 rounded-lg transition-all ${
                voiceEnabled ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-600"
              }`}
            >
              {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>

            {/* Settings */}
            <button className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Voice Interface */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Speak with MediWamp AI</h2>
              <p className="text-lg text-slate-600 mb-8">
                Talk to our AI in {languages.find((l) => l.code === selectedLanguage)?.name} and get instant responses
              </p>

              {/* Main Voice Button */}
              <div className="relative mb-8">
                <button
                  onClick={isListening ? stopListening : startListening}
                  disabled={isProcessing}
                  className={`w-32 h-32 rounded-full flex items-center justify-center text-white text-2xl font-bold transition-all duration-300 ${
                    isListening
                      ? "bg-red-500 hover:bg-red-600 voice-recording scale-110"
                      : isProcessing
                        ? "bg-yellow-500 animate-pulse"
                        : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105"
                  }`}
                >
                  {isProcessing ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  ) : isListening ? (
                    <MicOff className="h-12 w-12" />
                  ) : (
                    <Mic className="h-12 w-12" />
                  )}
                </button>

                {/* Pulse rings for listening state */}
                {isListening && (
                  <>
                    <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
                    <div
                      className="absolute inset-0 rounded-full border-4 border-red-200 animate-ping"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                  </>
                )}
              </div>

              {/* Status Text */}
              <div className="mb-6">
                {isListening && <p className="text-red-600 font-medium animate-pulse">🎤 Listening... Speak now</p>}
                {isProcessing && <p className="text-yellow-600 font-medium">🧠 Processing your message...</p>}
                {!isListening && !isProcessing && (
                  <p className="text-slate-600">Click the microphone to start speaking</p>
                )}
              </div>

              {/* Current Transcript */}
              {currentTranscript && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-900 font-medium">You said:</p>
                  <p className="text-blue-800 mt-1">"{currentTranscript}"</p>
                </div>
              )}

              {/* Quick Voice Commands */}
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => processVoiceMessage("What are the current property prices in this area?")}
                  className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors text-left"
                >
                  <p className="font-medium text-blue-900">Ask about property prices</p>
                  <p className="text-sm text-blue-700 mt-1">Get current market valuations</p>
                </button>

                <button
                  onClick={() => processVoiceMessage("Help me analyze this investment opportunity")}
                  className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:border-green-300 transition-colors text-left"
                >
                  <p className="font-medium text-green-900">Investment analysis</p>
                  <p className="text-sm text-green-700 mt-1">Evaluate investment potential</p>
                </button>
              </div>
            </div>
          </div>

          {/* Conversation History */}
          {messages.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 border-b bg-gradient-to-r from-slate-50 to-gray-50">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-slate-900">Voice Conversation</h3>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] ${message.type === "user" ? "text-right" : "text-left"}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-slate-600">
                          {message.type === "user" ? "You" : "MediWamp AI"}
                        </span>
                        <span className="text-xs text-slate-400">
                          {languages.find((l) => l.code === message.language)?.flag}
                        </span>
                        <span className="text-xs text-slate-400">{message.timestamp.toLocaleTimeString()}</span>
                      </div>

                      <div
                        className={`p-4 rounded-2xl ${
                          message.type === "user" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-900"
                        }`}
                      >
                        <p className="whitespace-pre-line">{message.text}</p>

                        {message.type === "assistant" && (
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200">
                            <span className="text-xs text-slate-500">Duration: {message.duration}s</span>
                            <button
                              onClick={() => playMessage(message)}
                              className="flex items-center space-x-1 text-xs text-slate-600 hover:text-slate-900 transition-colors"
                            >
                              {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                              <span>Play</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
