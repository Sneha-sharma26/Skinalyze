import { useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { useDropzone } from 'react-dropzone'
import { analyzeImage } from './lib/api'
import { Link, useNavigate } from 'react-router-dom'

function App() {
  const webcamRef = useRef<Webcam | null>(null)
  const navigate = useNavigate()
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<null | {
    issues: string[]
    confidence: number
    recommendations: Array<{ product: string; skin_tone: string; skin_type: string; why: string }>
  }>(null)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      setPreview(imageSrc)
    }
  }

  const onDrop = (accepted: File[]) => {
    const file = accepted[0]
    if (file) {
      setImageFile(file)
      const url = URL.createObjectURL(file)
      setPreview(url)
    }
  }
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { 'image/*': [] } })

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-blue-100 to-pink-100 flex flex-col scroll-smooth">
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-emerald-200/70 to-pink-200/70 backdrop-blur-md border-b border-emerald-300/40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-pink-500 shadow-md"></div>
            <span className="text-xl font-bold text-emerald-800">Skinalyze</span>
          </Link>
          <div className="hidden sm:flex items-center gap-6 text-sm text-gray-700">
            <a href="#home" className="hover:text-emerald-700">Home</a>
            <a href="#how-it-works" className="hover:text-emerald-700">How it works</a>
            <Link to="/results" className="hover:text-emerald-700">Results</Link>
          </div>
        </div>
      </nav>
      <main className="flex-1">
        <div className="max-w-6xl mx-auto p-8 space-y-8 bg-gradient-to-b from-transparent to-emerald-200/30">
        {/* Header Section */}
        <header id="home" className="text-center space-y-6 py-12 bg-gradient-to-r from-emerald-200/50 to-pink-200/50 rounded-3xl p-8 backdrop-blur-sm border border-emerald-300/30">
          <div className="relative">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-emerald-500 to-pink-400 bg-clip-text text-transparent">
              Skinalyze
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-200/30 to-pink-200/30 blur-lg opacity-75"></div>
          </div>
          <p className="text-gray-700 text-xl font-medium">AI Skin Analysis for Indian Skin Tones</p>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-pink-400 mx-auto rounded-full"></div>
        </header>

        {/* How it works */}
        <section id="how-it-works" className="rounded-3xl p-6 md:p-8 bg-gradient-to-br from-emerald-100/70 to-pink-100/70 border border-emerald-200/50">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 text-center mb-6">How it works</h2>
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            <li className="bg-white/80 rounded-2xl p-5 border border-emerald-200 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white grid place-items-center font-bold">1</div>
                <span className="text-xl">🎥</span>
              </div>
              <div className="font-semibold text-gray-800">Allow camera access / कैमरा एक्सेस दें</div>
              <div className="text-gray-600">Tap Allow when prompted • पूछे जाने पर Allow दबाएँ</div>
            </li>
            <li className="bg-white/80 rounded-2xl p-5 border border-emerald-200 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white grid place-items-center font-bold">2</div>
                <span className="text-xl">📸🖼️</span>
              </div>
              <div className="font-semibold text-gray-800">Take a live photo or upload / लाइव फोटो लें या इमेज अपलोड करें</div>
              <div className="text-gray-600">Use camera or drag & drop • कैमरा इस्तेमाल करें या ड्रैग‑ड्रॉप करें</div>
            </li>
            <li className="bg-white/80 rounded-2xl p-5 border border-emerald-200 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white grid place-items-center font-bold">3</div>
                <span className="text-xl">🔍</span>
              </div>
              <div className="font-semibold text-gray-800">Tap Analyze Skin / Analyze Skin बटन दबाएँ</div>
              <div className="text-gray-600">Start analysis • विश्लेषण शुरू करें</div>
            </li>
            <li className="bg-white/80 rounded-2xl p-5 border border-emerald-200 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white grid place-items-center font-bold">4</div>
                <span className="text-xl">✅</span>
              </div>
              <div className="font-semibold text-gray-800">See your personalized results / अपना पर्सनलाइज़्ड रिज़ल्ट देखें</div>
              <div className="text-gray-600">Insights and recommendations • इनसाइट्स और सुझाव</div>
            </li>
          </ol>
        </section>

        {/* Main Content Grid */}
        <section className="grid lg:grid-cols-3 gap-8 p-6 bg-gradient-to-br from-blue-100/70 to-emerald-100/70 rounded-3xl border border-blue-200/30">
          {/* Live Camera Section */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gradient-to-br from-emerald-100/95 to-emerald-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-emerald-300 hover:shadow-2xl transition-all duration-300">
              <h2 className="font-semibold text-xl text-gray-800 mb-4 flex items-center">
                <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3 shadow-sm"></span>
                Live Camera
              </h2>
              <div className="rounded-xl overflow-hidden border-2 border-emerald-300 shadow-lg">
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ facingMode: 'user' }}
                  className="w-full h-48 object-cover"
                />
              </div>
              <button 
                onClick={capture} 
                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold shadow-lg hover:from-emerald-700 hover:to-emerald-800 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                📸 Capture Photo
              </button>
            </div>
          </div>

          {/* Upload Image Section */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gradient-to-br from-pink-100/95 to-pink-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-pink-300 hover:shadow-2xl transition-all duration-300">
              <h2 className="font-semibold text-xl text-gray-800 mb-4 flex items-center">
                <span className="w-3 h-3 bg-pink-500 rounded-full mr-3 shadow-sm"></span>
                Upload Image
              </h2>
              <div 
                {...getRootProps()} 
                className="border-2 border-dashed border-pink-400 rounded-xl p-6 text-center text-gray-600 cursor-pointer hover:border-pink-500 hover:bg-pink-200/50 transition-all duration-200 hover:scale-105"
              >
                <input {...getInputProps()} />
                <div className="space-y-3">
                  <div className="text-5xl">📁</div>
                  <div className="font-semibold text-lg">Drag & drop or click to upload</div>
                  <div className="text-sm text-gray-500">Supports JPG, PNG, GIF</div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gradient-to-br from-emerald-100/95 to-emerald-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-emerald-300 hover:shadow-2xl transition-all duration-300">
              <h2 className="font-semibold text-xl text-gray-800 mb-4 flex items-center">
                <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3 shadow-sm"></span>
                Preview
              </h2>
              {preview ? (
                <div className="space-y-4">
                  <img src={preview} alt="preview" className="w-full h-48 object-cover rounded-xl border-2 border-emerald-300 shadow-lg" />
                  <button 
                    onClick={() => setPreview(null)} 
                    className="w-full px-4 py-3 text-gray-600 border-2 border-gray-300 rounded-xl hover:bg-emerald-100 hover:border-emerald-400 transition-all duration-200 font-medium"
                  >
                    Clear Preview
                  </button>
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-emerald-200 to-pink-200 rounded-xl border-2 border-dashed border-emerald-400 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🖼️</div>
                    <div className="text-base font-medium">No image selected</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Analyze Button Section */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-emerald-100/95 to-blue-100/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-emerald-300 max-w-lg w-full hover:shadow-2xl transition-all duration-300">
            <button
              disabled={isAnalyzing || (!preview && !imageFile)}
              onClick={async () => {
                if (!preview && !imageFile) return
                try {
                  setIsAnalyzing(true)
                  setResult(null)
                  const payload = imageFile ? imageFile : (preview as string)
                  const data = await analyzeImage(payload)
                  setResult(data)
                  // persist and navigate
                  sessionStorage.setItem('skinalyze:result', JSON.stringify(data))
                  navigate('/results')
                } catch (err) {
                  console.error(err)
                  alert('Failed to analyze image')
                } finally {
                  setIsAnalyzing(false)
                }
              }}
              className="w-full px-8 py-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-pink-500 text-white rounded-xl font-bold text-lg shadow-lg hover:from-emerald-700 hover:via-emerald-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isAnalyzing ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span>Analyzing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-3">
                  <span>🔍</span>
                  <span>Analyze Skin</span>
                </div>
              )}
            </button>
            {!preview && !imageFile && (
              <p className="text-sm text-gray-500 text-center mt-4">
                Capture or upload an image to enable analysis
              </p>
            )}
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <section id="results" className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-100/95 to-blue-100/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-emerald-300">
              <h3 className="font-bold text-2xl text-gray-800 mb-6 flex items-center">
                <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3 shadow-sm"></span>
                Analysis Results
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg text-gray-700">Detected Issues</h4>
                  <div className="bg-gradient-to-br from-pink-200 to-red-200 border-2 border-pink-300 rounded-xl p-6 shadow-lg">
                    <p className="text-pink-800 font-semibold text-lg">{result.issues.join(', ')}</p>
                    <p className="text-sm text-pink-600 mt-3">
                      Confidence: <span className="font-bold">{(result.confidence * 100).toFixed(0)}%</span>
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg text-gray-700">Recommendations</h4>
                  <div className="space-y-4">
                    {result.recommendations.map((rec, idx) => (
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

      {/* Privacy Modal */}
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

      {/* Terms Modal */}
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

export default App
