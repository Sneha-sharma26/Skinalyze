from fastapi import FastAPI, Response, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from io import BytesIO
from PIL import Image
import numpy as np

app = FastAPI(title="Skinalyze ML Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalysisResult(BaseModel):
    issues: list[str]
    confidence: float
    recommendations: list[dict]


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/analyze")
async def analyze_image(raw_body: bytes = Body(...)):
    # Minimal placeholder: load image and compute simple stats
    image = Image.open(BytesIO(raw_body)).convert("RGB")
    arr = np.asarray(image)
    mean_pixel = float(arr.mean())

    # Dummy heuristic for demo purposes only
    issues: list[str] = []
    if mean_pixel < 90:
        issues.append("pigmentation")
    if mean_pixel > 160:
        issues.append("tanning")
    if not issues:
        issues = ["no-major-issue"]

    recommendations = [
        {
            "product": "Dermsafe Gentle Cleanser",
            "skin_tone": "medium-deep",
            "skin_type": "combination",
            "why": "Non-comedogenic, fragrance-free; safe for acne-prone skin",
        },
        {
            "product": "Mineral Sunscreen SPF50 PA++++",
            "skin_tone": "deep",
            "skin_type": "oily",
            "why": "No white cast on deeper tones; broad spectrum protection",
        },
    ]

    return AnalysisResult(issues=issues, confidence=0.6, recommendations=recommendations)

