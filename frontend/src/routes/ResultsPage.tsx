import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface Recommendation { product: string; skin_tone: string; skin_type: string; why: string }
interface ResultData { issues: string[]; confidence: number; recommendations: Recommendation[] }

export default function ResultsPage() {
  const navigate = useNavigate()
  const [data, setData] = useState<ResultData | null>(null)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem('skinalyze:result')
    if (raw) {
      try { setData(JSON.parse(raw)) } catch {}
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-blue-100 to-pink-100 flex flex-col">
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-emerald-200/70 to-pink-200/70 backdrop-blur-md border-b border-emerald-300/40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-pink-500 shadow-md"></div>
            <span className="text-xl font-bold text-emerald-800">Skinalyze</span>
          </Link>
          <div className="hidden sm:flex items-center gap-6 text-sm text-gray-700">
            <Link to="/" className="hover:text-emerald-700">Home</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <div className="max-w-6xl mx-auto p-8 space-y-8">
          <header className="text-center space-y-4 py-8 bg-gradient-to-r from-emerald-200/50 to-pink-200/50 rounded-3xl p-8 backdrop-blur-sm border border-emerald-300/30">
            <h1 className="text-4xl font-bold text-emerald-800">Analysis Results</h1>
            <p className="text-gray-700">Your personalized insights and recommendations</p>
          </header>

          {!data ? (
            <div className="text-center bg-white/70 rounded-2xl p-8 border border-emerald-200">
              <p className="text-gray-700 mb-4">No results found. Please analyze a photo first.</p>
              <Link to="/" className="inline-block px-6 py-3 rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 transition">Go to Home</Link>
            </div>
          ) : (
            <section className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-100/95 to-blue-100/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-emerald-300">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-gray-700">Detected Issues</h4>
                    <div className="bg-gradient-to-br from-pink-200 to-red-200 border-2 border-pink-300 rounded-xl p-6 shadow-lg">
                      <p className="text-pink-800 font-semibold text-lg">{data.issues.join(', ')}</p>
                      <p className="text-sm text-pink-600 mt-3">
                        Confidence: <span className="font-bold">{(data.confidence * 100).toFixed(0)}%</span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-gray-700">Recommendations</h4>
                    <div className="space-y-4">
                      {data.recommendations.map((rec, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-emerald-200 to-blue-200 border-2 border-emerald-300 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
                          <div className="font-bold text-emerald-900 text-lg">{rec.product}</div>
                          <div className="text-sm text-emerald-700 mt-2 font-medium">
                            Tone: {rec.skin_tone} • Type: {rec.skin_type}
                          </div>
                          <div className="text-sm text-emerald-700 mt-3">
                            <span className="font-semibold">Why:</span> {rec.why}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center gap-3">
                  <button onClick={() => navigate(-1)} className="px-6 py-3 rounded-xl text-emerald-800 border border-emerald-300 hover:bg-emerald-100">Back</button>
                  <Link to="/" className="px-6 py-3 rounded-xl text-white bg-emerald-600 hover:bg-emerald-700">Home</Link>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      <footer className="mt-8 border-t border-emerald-300/40 bg-gradient-to-r from-emerald-200/50 to-pink-200/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-700 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Skinalyze. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowPrivacy(true)} className="hover:text-emerald-700">Privacy</button>
            <button onClick={() => setShowTerms(true)} className="hover:text-emerald-700">Terms</button>
            <a href="mailto:hello@skinalyze.app" className="hover:text-emerald-700">Contact</a>
          </div>
        </div>
      </footer>

      {showPrivacy && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowPrivacy(false)}>
          <div className="max-w-xl w-full rounded-2xl bg-gradient-to-br from-white/95 to-emerald-50/90 border border-emerald-200 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-emerald-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-emerald-900">Privacy Policy</h3>
              <button onClick={() => setShowPrivacy(false)} className="text-gray-500 hover:text-emerald-700">✕</button>
            </div>
            <div className="p-6 text-sm text-gray-700 space-y-3">
              <p>We process images only to analyze skin concerns and generate recommendations. Images are not stored on our servers after analysis.</p>
              <p>Your data is not sold or shared with third parties. For any questions, reach out at hello@skinalyze.app.</p>
            </div>
            <div className="p-4 border-t border-emerald-200 flex justify-end">
              <button onClick={() => setShowPrivacy(false)} className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Close</button>
            </div>
          </div>
        </div>
      )}

      {showTerms && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowTerms(false)}>
          <div className="max-w-xl w-full rounded-2xl bg-gradient-to-br from-white/95 to-pink-50/90 border border-pink-200 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-pink-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-emerald-900">Terms of Use</h3>
              <button onClick={() => setShowTerms(false)} className="text-gray-500 hover:text-emerald-700">✕</button>
            </div>
            <div className="p-6 text-sm text-gray-700 space-y-3">
              <p>Skinalyze provides informational insights only and is not a substitute for professional medical advice.</p>
              <p>By using this app, you agree not to upload content you do not have rights to and to use results responsibly.</p>
            </div>
            <div className="p-4 border-t border-pink-200 flex justify-end">
              <button onClick={() => setShowTerms(false)} className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
