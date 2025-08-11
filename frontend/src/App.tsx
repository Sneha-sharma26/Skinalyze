import { useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { useDropzone } from 'react-dropzone'
import { analyzeImage } from './lib/api'

function App() {
  const webcamRef = useRef<Webcam | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<null | {
    issues: string[]
    confidence: number
    recommendations: Array<{ product: string; skin_tone: string; skin_type: string; why: string }>
  }>(null)

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
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Skinalyze</h1>
        <p className="text-gray-600">AI Skin Analysis for Indian Skin Tones</p>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="font-semibold">Live Camera</h2>
          <div className="rounded-lg overflow-hidden border">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: 'user' }}
              className="w-full aspect-video object-cover"
            />
          </div>
          <button onClick={capture} className="px-4 py-2 bg-black text-white rounded-md">Capture</button>
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold">Upload Image</h2>
          <div {...getRootProps()} className="border-2 border-dashed rounded-lg p-8 text-center text-gray-600 cursor-pointer">
            <input {...getInputProps()} />
            Drag & drop or click to upload
          </div>
        </div>
      </section>

      {preview && (
        <section className="space-y-2">
          <h2 className="font-semibold">Preview</h2>
          <img src={preview} alt="preview" className="rounded-lg max-h-96 object-contain border" />
        </section>
      )}

      <div className="flex items-center gap-3">
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
            } catch (err) {
              console.error(err)
              alert('Failed to analyze image')
            } finally {
              setIsAnalyzing(false)
            }
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-60"
        >
          {isAnalyzing ? 'Analyzing…' : 'Analyze'}
        </button>
        {!preview && !imageFile && (
          <span className="text-sm text-gray-500">Capture or upload an image to enable Analyze</span>
        )}
      </div>

      {result && (
        <section className="space-y-3">
          <div>
            <h3 className="font-semibold">Detected issues</h3>
            <p className="text-gray-700">{result.issues.join(', ')}</p>
            <p className="text-sm text-gray-500">Confidence: {(result.confidence * 100).toFixed(0)}%</p>
          </div>
          <div>
            <h3 className="font-semibold">Recommendations</h3>
            <ul className="space-y-2">
              {result.recommendations.map((rec, idx) => (
                <li key={idx} className="border rounded-md p-3">
                  <div className="font-medium">{rec.product}</div>
                  <div className="text-sm text-gray-600">Tone: {rec.skin_tone} • Type: {rec.skin_type}</div>
                  <div className="text-sm mt-1">Why: {rec.why}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  )
}

export default App
