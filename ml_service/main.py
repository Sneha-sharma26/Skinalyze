from fastapi import FastAPI, Body
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
    skin_tone: str | None = None
    skin_type: str | None = None


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/analyze")
async def analyze_image(raw_body: bytes = Body(...)):
    # Minimal placeholder heuristic
    image = Image.open(BytesIO(raw_body)).convert("RGB")
    arr = np.asarray(image)
    mean_pixel = float(arr.mean())  # 0..255
    std_pixel = float(arr.std())

    issues: list[str] = []
    # Brightness heuristic
    if mean_pixel < 95:
        issues.append("pigmentation")
    if mean_pixel > 170:
        issues.append("tanning")
    # Contrast/texture heuristic
    if std_pixel > 60:
        issues.append("acne")
    if not issues:
        issues = ["no-major-issue"]

    # Extremely rough skin tone/type guesses (for demo only)
    if mean_pixel < 110:
        skin_tone = "medium-deep"
    elif mean_pixel < 150:
        skin_tone = "medium"
    else:
        skin_tone = "fair"

    skin_type = "oily" if std_pixel > 55 else "combination"

    # Confidence from how far values are from midrange (demo only)
    distance = abs(mean_pixel - 128) / 128
    confidence = min(0.95, 0.5 + distance * 0.4)

    return {
        "issues": issues,
        "confidence": confidence,
        "skin_tone": skin_tone,
        "skin_type": skin_type,
    }

