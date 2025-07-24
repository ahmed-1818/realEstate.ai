"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Send,
  ArrowLeft,
  Bot,
  User,
  Mic,
  Copy,
  RefreshCw,
  Languages,
  MoreVertical,
  Trash2,
  Download,
} from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  language?: string
}

interface ChatSession {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm MediWamp AI, your personal real estate architect assistant. I can help you with property analysis, design suggestions, market insights, and answer any questions about real estate. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [chatSessions] = useState<ChatSession[]>([
    { id: "1", title: "Current Session", lastMessage: "Hello! I'm MediWamp AI...", timestamp: new Date() },
    {
      id: "2",
      title: "Property Analysis",
      lastMessage: "The property shows great potential...",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: "3",
      title: "Investment Advice",
      lastMessage: "Based on market trends...",
      timestamp: new Date(Date.now() - 172800000),
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ur", name: "Urdu", flag: "🇵🇰" },
    { code: "ar", name: "Arabic", flag: "🇸🇦" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
      language: selectedLanguage,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateAIResponse(input, selectedLanguage),
        timestamp: new Date(),
        language: selectedLanguage,
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const generateAIResponse = (userInput: string, language: string): string => {
    const input = userInput.toLowerCase()

    // Language-specific responses
    if (language === "ur") {
      return "میں آپ کی رئیل اسٹیٹ کی ضروریات میں مدد کرنے کے لیے یہاں ہوں۔ آپ کسی بھی پراپرٹی کے بارے میں سوال پوچھ سکتے ہیں۔"
    } else if (language === "ar") {
      return "أنا هنا لمساعدتك في احتياجات العقارات الخاصة بك. يمكنك أن تسأل عن أي عقار."
    } else if (language === "hi") {
      return "मैं आपकी रियल एस्टेट आवश्यकताओं में मदद करने के लिए यहाँ हूँ। आप किसी भी संपत्ति के बारे में पूछ सकते हैं।"
    }

    // English responses based on input
    if (input.includes("price") || input.includes("value") || input.includes("cost")) {
      return "Property valuation is a complex process that considers multiple factors:\n\n• **Location & Neighborhood**: Proximity to amenities, schools, transportation\n• **Property Size & Layout**: Square footage, number of rooms, lot size\n• **Condition & Age**: Structural integrity, recent renovations, maintenance\n• **Market Trends**: Recent sales, supply/demand, economic factors\n• **Unique Features**: Pool, garage, view, architectural style\n\nWould you like me to help you evaluate a specific property? Please share the details!"
    }

    if (input.includes("invest") || input.includes("buy") || input.includes("purchase")) {
      return "Excellent question about real estate investment! Here's my analysis framework:\n\n**Key Investment Metrics:**\n• Cash flow potential and rental yield\n• Appreciation prospects based on area development\n• Cap rate and ROI calculations\n• Market liquidity and exit strategies\n\n**Risk Assessment:**\n• Market volatility and economic factors\n• Property-specific risks (condition, location)\n• Financing and interest rate considerations\n\n**My Recommendation Process:**\n1. Define your investment goals and timeline\n2. Analyze local market conditions\n3. Evaluate specific properties against criteria\n4. Create financial projections\n\nWhat type of investment are you considering? Residential rental, commercial, or fix-and-flip?"
    }

    if (input.includes("design") || input.includes("renovation") || input.includes("improve")) {
      return "I'd love to help with design and renovation ideas! Here's my approach:\n\n**Design Analysis:**\n• Current layout efficiency and flow\n• Natural light optimization\n• Space utilization improvements\n• Modern design trends integration\n\n**Renovation Priorities:**\n• High-impact, cost-effective upgrades\n• Kitchen and bathroom modernization\n• Energy efficiency improvements\n• Curb appeal enhancements\n\n**AI-Powered Suggestions:**\n• 3D visualization of proposed changes\n• Cost-benefit analysis of improvements\n• ROI projections for renovations\n• Timeline and contractor recommendations\n\nDo you have specific areas you'd like to improve, or would you like me to analyze photos of your property?"
    }

    return "I'm here to help with all your real estate needs! I can assist with:\n\n🏠 **Property Analysis** - Detailed evaluations and valuations\n💰 **Investment Advice** - ROI calculations and market insights\n🎨 **Design Suggestions** - Layout improvements and renovations\n📊 **Market Research** - Trends, comparables, and forecasts\n🗣️ **Multilingual Support** - Available in multiple languages\n\nWhat specific aspect of real estate would you like to explore? Feel free to ask detailed questions or upload property images for analysis!"
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice input logic would go here
    if (!isListening) {
      // Start recording
      setTimeout(() => {
        setIsListening(false)
        setInput("This is a voice message converted to text")
      }, 3000)
    }
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const regenerateResponse = () => {
    if (messages.length > 1) {
      const lastUserMessage = messages[messages.length - 2]
      if (lastUserMessage.role === "user") {
        setIsTyping(true)
        setTimeout(() => {
          const newResponse: Message = {
            id: Date.now().toString(),
            role: "assistant",
            content: generateAIResponse(lastUserMessage.content, selectedLanguage),
            timestamp: new Date(),
            language: selectedLanguage,
          }
          setMessages((prev) => [...prev.slice(0, -1), newResponse])
          setIsTyping(false)
        }, 2000)
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Chat History Sidebar */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h2 className="text-xl font-semibold text-slate-900">Chat History</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {chatSessions.map((session) => (
            <div
              key={session.id}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                session.id === "1" ? "bg-blue-50 border border-blue-200" : "hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-slate-900 truncate">{session.title}</h3>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-slate-600 truncate">{session.lastMessage}</p>
              <p className="text-xs text-slate-400 mt-1">{session.timestamp.toLocaleDateString()}</p>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <Button variant="outline" className="w-full bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export Chat History
          </Button>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">MediWamp AI</h1>
                <p className="text-sm text-slate-600">Real Estate Architect Assistant</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="flex items-center space-x-2">
                <Languages className="h-4 w-4 text-slate-600" />
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                onClick={handleVoiceInput}
                className={`p-2 rounded-lg transition-all ${
                  isListening
                    ? "bg-red-100 text-red-600 voice-recording"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Mic className="h-4 w-4" />
              </button>

              {/* Clear Chat */}
              <button className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`flex-shrink-0 ${message.role === "user" ? "ml-3" : "mr-3"}`}>
                  {message.role === "user" ? (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>

                <div className={`group relative ${message.role === "user" ? "mr-3" : "ml-3"}`}>
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-slate-200 text-slate-900 shadow-sm"
                    }`}
                  >
                    <div className="whitespace-pre-line">{message.content}</div>
                    <div className={`text-xs mt-2 ${message.role === "user" ? "text-blue-100" : "text-slate-500"}`}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {message.language && message.language !== "en" && (
                        <span className="ml-2">{languages.find((l) => l.code === message.language)?.flag}</span>
                      )}
                    </div>
                  </div>

                  {/* Message Actions */}
                  {message.role === "assistant" && (
                    <div className="absolute top-0 right-0 transform translate-x-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center space-x-1 ml-2">
                        <button
                          onClick={() => copyMessage(message.content)}
                          className="p-1 rounded bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm"
                          title="Copy message"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                        <button
                          onClick={regenerateResponse}
                          className="p-1 rounded bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm"
                          title="Regenerate response"
                        >
                          <RefreshCw className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex mr-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-sm text-slate-600">MediWamp AI is typing...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-slate-200 p-6">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder={`Ask MediWamp AI anything about real estate... (${languages.find((l) => l.code === selectedLanguage)?.name})`}
                  disabled={isTyping}
                  className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <button
                  onClick={handleVoiceInput}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-all ${
                    isListening ? "text-red-600 voice-recording" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <Mic className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Button onClick={handleSend} disabled={!input.trim() || isTyping} variant="primary" size="lg">
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setInput("Analyze this property for investment potential")}
              className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
            >
              Investment Analysis
            </button>
            <button
              onClick={() => setInput("What are current market trends?")}
              className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
            >
              Market Trends
            </button>
            <button
              onClick={() => setInput("Help me design a better layout")}
              className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
            >
              Design Help
            </button>
            <button
              onClick={() => setInput("Calculate property value")}
              className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
            >
              Property Valuation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
