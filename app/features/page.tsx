"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Camera,
  Brain,
  MessageSquare,
  Mic,
  BarChart3,
  Zap,
  Shield,
  Globe,
  Sparkles,
  CheckCircle,
  Play,
} from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: Camera,
      title: "Computer Vision Analysis",
      description: "Advanced image processing to understand property layouts, conditions, and potential improvements",
      details: [
        "Automatic room detection and measurement",
        "Structural condition assessment",
        "Layout optimization suggestions",
        "Architectural style recognition",
        "Damage and maintenance identification",
      ],
      color: "blue",
    },
    {
      icon: Brain,
      title: "AI Design Generator",
      description: "Machine learning algorithms that create optimal property designs and renovation plans",
      details: [
        "3D layout generation from 2D images",
        "Interior design recommendations",
        "Space utilization optimization",
        "Cost-effective improvement suggestions",
        "Style matching and trend analysis",
      ],
      color: "green",
    },
    {
      icon: MessageSquare,
      title: "AI Chatbot Architect",
      description: "Intelligent conversational assistant for real estate advice and property analysis",
      details: [
        "24/7 expert real estate consultation",
        "Market trend analysis and insights",
        "Investment opportunity evaluation",
        "Property comparison and recommendations",
        "Personalized advice based on your needs",
      ],
      color: "purple",
    },
    {
      icon: Mic,
      title: "Multilingual Voice AI",
      description: "Voice-powered interactions in multiple languages for global accessibility",
      details: [
        "Support for 50+ languages",
        "Real-time speech-to-text conversion",
        "Natural language understanding",
        "Voice-activated property searches",
        "Audio report generation",
      ],
      color: "orange",
    },
    {
      icon: BarChart3,
      title: "Market Analytics",
      description: "Comprehensive market data analysis and predictive insights for informed decisions",
      details: [
        "Real-time market trend tracking",
        "Price prediction algorithms",
        "Investment ROI calculations",
        "Neighborhood analysis reports",
        "Comparative market analysis (CMA)",
      ],
      color: "indigo",
    },
    {
      icon: Zap,
      title: "Instant Processing",
      description: "Lightning-fast analysis and results delivery for immediate decision making",
      details: [
        "Sub-second image analysis",
        "Real-time chat responses",
        "Instant report generation",
        "Live market data updates",
        "Immediate design suggestions",
      ],
      color: "yellow",
    },
  ]

  const benefits = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and security protocols to protect your data",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Support for international markets and local real estate regulations",
    },
    {
      icon: Sparkles,
      title: "Continuous Learning",
      description: "AI models that improve over time with more data and user feedback",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-slate-900">Features</h1>
            </div>
            <Link href="/dashboard">
              <Button variant="primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Powerful AI Features for
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              Real Estate
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover how our advanced AI and computer vision technology transforms the way you analyze, design, and
            invest in real estate properties.
          </p>
        </div>

        {/* Interactive Features Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Feature List */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              const isActive = activeFeature === index

              return (
                <div
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    isActive
                      ? `bg-${feature.color}-50 border-2 border-${feature.color}-200 shadow-lg`
                      : "bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        isActive ? `bg-${feature.color}-600` : "bg-slate-100"
                      }`}
                    >
                      <IconComponent className={`h-6 w-6 ${isActive ? "text-white" : "text-slate-600"}`} />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-semibold mb-2 ${
                          isActive ? `text-${feature.color}-900` : "text-slate-900"
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <p className={`text-sm ${isActive ? `text-${feature.color}-700` : "text-slate-600"}`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Feature Details */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <div
                className={`w-16 h-16 bg-${features[activeFeature].color}-600 rounded-2xl flex items-center justify-center mb-4`}
              >
                {(() => {
                  const IconComponent = features[activeFeature].icon
                  return <IconComponent className="h-8 w-8 text-white" />
                })()}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{features[activeFeature].title}</h3>
              <p className="text-slate-600">{features[activeFeature].description}</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900">Key Capabilities:</h4>
              {features[activeFeature].details.map((detail, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className={`h-5 w-5 text-${features[activeFeature].color}-600 mt-0.5 flex-shrink-0`} />
                  <p className="text-slate-700">{detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t">
              <Link href="/dashboard">
                <Button variant="primary" className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Try This Feature
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Why Choose EstateMind?</h3>
            <p className="text-lg text-slate-600">Built for professionals, designed for everyone</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-2">{benefit.title}</h4>
                  <p className="text-slate-600">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Real Estate Business?</h3>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals already using EstateMind to make smarter property decisions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button variant="secondary" size="lg" className="text-lg px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
