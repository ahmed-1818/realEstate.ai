"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Brain, Users, Target, Lightbulb, Heart } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const timeline = [
    {
      year: "2023",
      title: "The Vision",
      description:
        "Founded with the mission to democratize real estate analysis using AI and computer vision technology.",
    },
    {
      year: "2024",
      title: "First AI Model",
      description: "Launched our first computer vision model capable of analyzing property images with 95% accuracy.",
    },
    {
      year: "2024",
      title: "Multilingual Support",
      description: "Added voice AI capabilities supporting 50+ languages for global accessibility.",
    },
    {
      year: "2024",
      title: "Market Expansion",
      description: "Expanded to serve real estate professionals across 25 countries worldwide.",
    },
  ]

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former Google AI researcher with 10+ years in computer vision and real estate technology.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Ex-Tesla engineer specializing in machine learning and scalable AI infrastructure.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Dr. Aisha Patel",
      role: "Head of AI Research",
      bio: "PhD in Computer Vision from MIT, published researcher in property analysis algorithms.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "James Thompson",
      role: "VP of Real Estate",
      bio: "20+ years in commercial real estate with expertise in market analysis and investment.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  const values = [
    {
      icon: Brain,
      title: "Innovation First",
      description: "We push the boundaries of what's possible with AI and computer vision in real estate.",
    },
    {
      icon: Users,
      title: "User-Centric",
      description: "Every feature is designed with our users' needs and feedback at the center.",
    },
    {
      icon: Target,
      title: "Accuracy Matters",
      description: "We maintain the highest standards of precision in our AI models and analysis.",
    },
    {
      icon: Heart,
      title: "Ethical AI",
      description: "We're committed to responsible AI development and transparent algorithms.",
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
              <h1 className="text-2xl font-bold text-slate-900">About Us</h1>
            </div>
            <Link href="/contact">
              <Button variant="primary">Get in Touch</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Reimagining Real Estate with
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              Artificial Intelligence
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We're on a mission to make real estate analysis accessible, accurate, and intelligent for everyone - from
            first-time buyers to seasoned investors.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              To democratize real estate intelligence by providing cutting-edge AI tools that help people make informed
              property decisions. We believe everyone deserves access to professional-grade analysis, regardless of
              their experience level.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
              <Lightbulb className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              A world where every real estate decision is backed by intelligent analysis. We envision a future where
              AI-powered insights eliminate guesswork and empower people to build wealth through smart property
              investments.
            </p>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Our Journey</h3>
            <p className="text-lg text-slate-600">From concept to global platform</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{item.year}</div>
                      <h4 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-slate-600">{item.description}</p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="relative z-10 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Our Values</h3>
            <p className="text-lg text-slate-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">{value.title}</h4>
                  <p className="text-slate-600 text-sm">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Meet Our Team</h3>
            <p className="text-lg text-slate-600">The brilliant minds behind EstateMind</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-slate-900 mb-1">{member.name}</h4>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-slate-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">EstateMind by the Numbers</h3>
            <p className="text-blue-100 text-lg">Our impact in the real estate industry</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Properties Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25</div>
              <div className="text-blue-100">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Happy Users</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Ready to Join Our Mission?</h3>
          <p className="text-lg text-slate-600 mb-8">
            Whether you're looking to use our platform or join our team, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button variant="primary" size="lg" className="text-lg px-8">
                Try EstateMind
              </Button>
            </Link>
            <Link href="/careers">
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                View Careers
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
