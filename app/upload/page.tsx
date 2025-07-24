"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, ArrowLeft, FileImage, FileVideo, Loader2, CheckCircle, Brain, Camera, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()
  const uploadType = searchParams.get("type") || "image"

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)

    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target?.result as string)
      reader.readAsDataURL(file)
    } else if (file.type.startsWith("video/")) {
      const url = URL.createObjectURL(file)
      setPreview(url)
    }
  }

  const handleSubmit = async () => {
    if (!selectedFile) return

    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = generateMockAnalysis(uploadType)
      setAnalysis(mockAnalysis)
      setIsAnalyzing(false)
    }, 4000)
  }

  const generateMockAnalysis = (type: string) => {
    if (type === "video") {
      return {
        title: "Property Video Analysis Complete",
        insights: [
          "Road accessibility: Excellent - Wide paved road with proper drainage",
          "Neighborhood quality: Premium residential area with mature landscaping",
          "Infrastructure: Complete utilities visible (power, water, telecommunications)",
          "Traffic patterns: Low to moderate residential traffic, family-friendly",
          "Property potential: High appreciation expected due to location",
          "Investment score: 8.5/10 - Strong long-term investment opportunity",
        ],
        suggestions: [
          "Consider properties on the quieter side streets for better privacy",
          "The area shows signs of ongoing development - good for appreciation",
          "Proximity to main road provides excellent connectivity",
          "Well-maintained infrastructure suggests active community management",
        ],
      }
    } else {
      return {
        title: "Property Image Analysis Complete",
        insights: [
          "Property type: Single-family residential home, approximately 2,500 sq ft",
          "Architectural style: Contemporary with traditional elements",
          "Condition assessment: Well-maintained exterior, recent updates visible",
          "Landscaping: Mature trees and professional landscaping add value",
          "Estimated value range: $450,000 - $550,000 based on visible features",
          "Market appeal: High - desirable style for current market trends",
        ],
        suggestions: [
          "Consider updating the front entrance for enhanced curb appeal",
          "The large windows suggest good natural light - highlight this feature",
          "Driveway and walkway are in excellent condition",
          "Roof appears to be in good condition with modern materials",
          "Consider adding outdoor lighting for evening appeal",
        ],
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">Upload {uploadType === "video" ? "Video" : "Image"}</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Upload className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-900">File Upload</h2>
              </div>

              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                  dragActive ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                {uploadType === "video" ? (
                  <FileVideo className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                ) : (
                  <FileImage className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                )}

                <h3 className="text-lg font-medium text-slate-900 mb-2">Drop your {uploadType} here</h3>
                <p className="text-slate-600 mb-4">or click to browse from your computer</p>
                <p className="text-sm text-slate-500">
                  {uploadType === "video" ? "Supports MP4, MOV, AVI up to 100MB" : "Supports PNG, JPG, JPEG up to 25MB"}
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept={uploadType === "video" ? "video/*" : "image/*"}
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
              />

              {selectedFile && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium text-blue-900">{selectedFile.name}</p>
                      <p className="text-sm text-blue-700">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleSubmit}
                disabled={!selectedFile || isAnalyzing}
                variant="primary"
                className="w-full mt-6 py-3"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Analyze with AI
                  </>
                )}
              </Button>
            </div>

            {/* Preview Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Camera className="h-5 w-5 text-green-600" />
                <h2 className="text-xl font-semibold text-slate-900">Preview</h2>
              </div>

              {preview ? (
                <div className="space-y-4">
                  {selectedFile?.type.startsWith("image/") ? (
                    <img
                      src={preview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg border"
                    />
                  ) : selectedFile?.type.startsWith("video/") ? (
                    <video src={preview} controls className="w-full h-64 rounded-lg border" />
                  ) : null}

                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="font-medium text-slate-900 mb-2">File Details</h3>
                    <div className="space-y-1 text-sm text-slate-600">
                      <p>Name: {selectedFile?.name}</p>
                      <p>Size: {selectedFile ? (selectedFile.size / 1024 / 1024).toFixed(2) : 0} MB</p>
                      <p>Type: {selectedFile?.type}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                  <div className="text-center">
                    <FileImage className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-500">No file selected</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Analysis Results */}
          {(isAnalyzing || analysis) && (
            <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-slate-900">AI Analysis Results</h2>
                </div>
              </div>

              <div className="p-6">
                {isAnalyzing ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="h-8 w-8 text-blue-600 animate-pulse" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">Analyzing your {uploadType}...</h3>
                    <p className="text-slate-600 mb-4">
                      Our AI is examining every detail to provide comprehensive insights
                    </p>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                ) : analysis ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{analysis.title}</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-slate-900 flex items-center">
                          <Brain className="h-5 w-5 text-blue-600 mr-2" />
                          Key Insights
                        </h4>
                        <div className="space-y-3">
                          {analysis.insights.map((insight: string, index: number) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-slate-700">{insight}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-slate-900 flex items-center">
                          <Sparkles className="h-5 w-5 text-green-600 mr-2" />
                          AI Suggestions
                        </h4>
                        <div className="space-y-3">
                          {analysis.suggestions.map((suggestion: string, index: number) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-slate-700">{suggestion}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                      <Button variant="primary" className="flex-1">
                        Download Full Report
                      </Button>
                      <Link href="/chat" className="flex-1">
                        <Button variant="outline" className="w-full bg-transparent">
                          Discuss with AI Architect
                        </Button>
                      </Link>
                      <Button variant="ghost" onClick={() => window.print()}>
                        Print Results
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
