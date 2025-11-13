'use client'

import { useState } from 'react'

interface VideoIdea {
  title: string
  hook: string
  script: string
  hashtags: string[]
  thumbnail: string
  trending: boolean
  viralScore: number
  optimization: {
    bestTime: string
    duration: string
    tips: string[]
  }
}

export default function Home() {
  const [niche, setNiche] = useState('')
  const [loading, setLoading] = useState(false)
  const [videoIdeas, setVideoIdeas] = useState<VideoIdea[]>([])
  const [error, setError] = useState('')

  const generateIdeas = async () => {
    if (!niche.trim()) {
      setError('Please enter a niche or topic')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ niche }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate ideas')
      }

      const data = await response.json()
      setVideoIdeas(data.ideas)
    } catch (err) {
      setError('Failed to generate ideas. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="gradient-text">Viral YouTube Shorts</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            AI Agent 🚀
          </h2>
          <p className="text-gray-300 text-lg">
            Generate viral content ideas, scripts, and optimization tips powered by AI
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-700 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && generateIdeas()}
              placeholder="Enter your niche or topic (e.g., fitness, cooking, gaming)"
              className="flex-1 px-6 py-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-youtube-red transition"
              disabled={loading}
            />
            <button
              onClick={generateIdeas}
              disabled={loading}
              className="px-8 py-4 bg-youtube-red hover:bg-red-700 disabled:bg-gray-600 rounded-xl font-semibold text-white transition shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating...
                </span>
              ) : (
                'Generate Ideas 🎬'
              )}
            </button>
          </div>
          {error && (
            <p className="mt-4 text-red-400 text-sm">{error}</p>
          )}
        </div>

        {videoIdeas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoIdeas.map((idea, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-gray-700 hover:border-youtube-red transition-all hover:shadow-2xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex-1">{idea.title}</h3>
                  {idea.trending && (
                    <span className="bg-youtube-red px-3 py-1 rounded-full text-xs font-semibold">
                      🔥 TRENDING
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-400 font-semibold">Viral Score:</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-youtube-red h-2 rounded-full"
                        style={{ width: `${idea.viralScore}%` }}
                      />
                    </div>
                    <span className="text-yellow-400 font-bold">{idea.viralScore}%</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">💥 HOOK</h4>
                    <p className="text-white bg-gray-900/50 p-3 rounded-lg italic">
                      "{idea.hook}"
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">📝 SCRIPT</h4>
                    <p className="text-gray-300 text-sm bg-gray-900/50 p-3 rounded-lg whitespace-pre-line">
                      {idea.script}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">🖼️ THUMBNAIL IDEA</h4>
                    <p className="text-gray-300 text-sm bg-gray-900/50 p-3 rounded-lg">
                      {idea.thumbnail}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">⚡ OPTIMIZATION</h4>
                    <div className="bg-gray-900/50 p-3 rounded-lg space-y-2">
                      <p className="text-sm">
                        <span className="text-green-400">⏰ Best time:</span> {idea.optimization.bestTime}
                      </p>
                      <p className="text-sm">
                        <span className="text-blue-400">⏱️ Duration:</span> {idea.optimization.duration}
                      </p>
                      <div className="text-sm">
                        <span className="text-purple-400 font-semibold">💡 Tips:</span>
                        <ul className="mt-1 space-y-1 ml-4">
                          {idea.optimization.tips.map((tip, i) => (
                            <li key={i} className="text-gray-300">• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {idea.hashtags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-600/30 text-blue-300 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {videoIdeas.length === 0 && !loading && (
          <div className="text-center text-gray-400 py-12">
            <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-xl">Enter a niche to generate viral video ideas!</p>
          </div>
        )}
      </div>
    </main>
  )
}
