"use client"

import { useState } from "react"
import {
  Brain,
  Upload,
  Video,
  MessageSquare,
  Mic,
  Home,
  BarChart3,
  Settings,
  User,
  Bell,
  Search,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice input logic would go here
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">EstateMind</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        <nav className="p-6 space-y-2">
          <Link href="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 text-blue-600">
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/upload"
            className="flex items-center space-x-3 p-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Upload className="h-5 w-5" />
            <span>Upload Files</span>
          </Link>
          <Link
            href="/chat"
            className="flex items-center space-x-3 p-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <MessageSquare className="h-5 w-5" />
            <span>AI Chat</span>
          </Link>
          <Link
            href="/voice"
            className="flex items-center space-x-3 p-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Mic className="h-5 w-5" />
            <span>Voice AI</span>
          </Link>
          <Link
            href="/analytics"
            className="flex items-center space-x-3 p-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <BarChart3 className="h-5 w-5" />
            <span>Analytics</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center space-x-3 p-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Menu className="h-6 w-6 text-slate-600" />
              </button>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Voice Button */}
              <button
                onClick={handleVoiceInput}
                className={`p-2 rounded-lg transition-all ${isListening ? "bg-red-100 text-red-600 voice-recording" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                <Mic className="h-5 w-5" />
              </button>

              {/* Notifications */}
              <button className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                <Bell className="h-5 w-5" />
              </button>

              {/* Profile */}
              <button className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome back! 👋</h2>
            <p className="text-blue-100 mb-6">Ready to transform your real estate projects with AI?</p>

            {/* Voice Welcome */}
            <div className="flex items-center space-x-4 mb-6">
              <button
                onClick={handleVoiceInput}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                <Mic className="h-4 w-4" />
                <span>Ask me anything (Voice)</span>
              </button>
              <select className="bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white">
                <option value="en">English</option>
                <option value="ur">Urdu</option>
                <option value="ar">Arabic</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link href="/upload?type=image">
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Upload className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Upload Image</h3>
                <p className="text-slate-600">Upload property images for AI analysis and design suggestions</p>
              </div>
            </Link>

            <Link href="/upload?type=video">
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <Video className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Upload Video</h3>
                <p className="text-slate-600">Analyze property videos for layout and design insights</p>
              </div>
            </Link>

            <Link href="/chat">
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Chat with AI Architect</h3>
                <p className="text-slate-600">Get instant advice from our AI real estate expert</p>
              </div>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold text-slate-900">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Upload className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">House image analyzed</p>
                    <p className="text-sm text-slate-600">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">Chat with AI Architect</p>
                    <p className="text-sm text-slate-600">5 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Video className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">Property video processed</p>
                    <p className="text-sm text-slate-600">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
