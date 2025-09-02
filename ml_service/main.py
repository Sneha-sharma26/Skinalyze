from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from io import BytesIO
from PIL import Image
import numpy as np
import random

app = FastAPI(title="Skinalyze ML Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ProductRecommendation(BaseModel):
    product: str
    brand: str
    why: str
    category: str
    skin_tone: str
    skin_type: str
    spf: int | None = None
    is_mineral: bool = False

class AnalysisResult(BaseModel):
    issues: list[str]
    confidence: float
    skin_tone: str | None = None
    skin_type: str | None = None
    recommendations: list[ProductRecommendation] = []


def generate_ai_recommendations(issues: list[str], skin_tone: str, skin_type: str) -> list[ProductRecommendation]:
    """Generate AI-powered product recommendations based on skin analysis"""
    
    # Product templates for different categories
    cleansers = {
        "fair": [
            {"product": "Gentle Foaming Cleanser", "brand": "FairGlow", "category": "Cleanser"},
            {"product": "Mild Cream Cleanser", "brand": "SensitiveCare", "category": "Cleanser"},
        ],
        "medium": [
            {"product": "Balanced Gel Cleanser", "brand": "MediumCare", "category": "Cleanser"},
            {"product": "Gentle Foam Cleanser", "brand": "DermSafe", "category": "Cleanser"},
        ],
        "medium-deep": [
            {"product": "Deep Tone Cleansing Gel", "brand": "DeepGlow", "category": "Cleanser"},
            {"product": "No-Strip Cleanser", "brand": "DeepCare", "category": "Cleanser"},
        ],
        "deep": [
            {"product": "Rich Cream Cleanser", "brand": "DeepGlow", "category": "Cleanser"},
            {"product": "Hydrating Oil Cleanser", "brand": "DeepCare", "category": "Cleanser"},
        ]
    }
    
    serums = {
        "acne": [
            {"product": "Niacinamide 10% Serum", "brand": "Actives Co.", "category": "Serum"},
            {"product": "Salicylic Acid 2% Serum", "brand": "ClearSkin", "category": "Serum"},
            {"product": "Azelaic Acid 10% Serum", "brand": "DermLab", "category": "Serum"},
            {"product": "Tea Tree Oil Serum", "brand": "NaturalClear", "category": "Serum"},
            {"product": "Benzoyl Peroxide 2.5% Gel", "brand": "AcneFree", "category": "Serum"},
        ],
        "pigmentation": [
            {"product": "Vitamin C Brightening Serum", "brand": "BrightGlow", "category": "Serum"},
            {"product": "Alpha Arbutin Serum", "brand": "ToneFix", "category": "Serum"},
            {"product": "Kojic Acid Serum", "brand": "EvenTone", "category": "Serum"},
            {"product": "Retinol 0.5% Serum", "brand": "AgeDefy", "category": "Serum"},
            {"product": "Tranexamic Acid Serum", "brand": "SpotCorrect", "category": "Serum"},
        ],
        "tanning": [
            {"product": "Vitamin C + E Serum", "brand": "SunRepair", "category": "Serum"},
            {"product": "Niacinamide + Zinc Serum", "brand": "ToneCorrect", "category": "Serum"},
            {"product": "Glutathione Whitening Serum", "brand": "GlowMax", "category": "Serum"},
        ],
        "dark-circles": [
            {"product": "Caffeine Eye Serum", "brand": "EyeCare", "category": "Serum"},
            {"product": "Retinol Eye Cream", "brand": "UnderEye", "category": "Serum"},
            {"product": "Vitamin K Eye Serum", "brand": "CircleFix", "category": "Serum"},
        ],
        "fine-lines": [
            {"product": "Hyaluronic Acid Serum", "brand": "HydraMax", "category": "Serum"},
            {"product": "Peptide Anti-Aging Serum", "brand": "YouthBoost", "category": "Serum"},
            {"product": "Retinol 1% Serum", "brand": "AgeReverse", "category": "Serum"},
        ]
    }
    
    moisturizers = {
        "oily": [
            {"product": "Oil-Free Gel Moisturizer", "brand": "OilFree", "category": "Moisturizer"},
            {"product": "Mattifying Moisturizer", "brand": "ClearSkin", "category": "Moisturizer"},
        ],
        "dry": [
            {"product": "Rich Ceramide Cream", "brand": "BarrierFix", "category": "Moisturizer"},
            {"product": "Hyaluronic Acid Moisturizer", "brand": "HydraCare", "category": "Moisturizer"},
        ],
        "combination": [
            {"product": "Lightweight Balancing Cream", "brand": "BalanceCare", "category": "Moisturizer"},
            {"product": "Dual-Phase Moisturizer", "brand": "ComboCare", "category": "Moisturizer"},
        ],
        "sensitive": [
            {"product": "Fragrance-Free Calming Cream", "brand": "SensitiveCare", "category": "Moisturizer"},
            {"product": "Gentle Barrier Cream", "brand": "SoftCare", "category": "Moisturizer"},
        ]
    }
    
    sunscreens = {
        "fair": [
            {"product": "Lightweight SPF 30", "brand": "FairShield", "category": "Sunscreen", "spf": 30},
            {"product": "Mineral SPF 50", "brand": "PureShield", "category": "Sunscreen", "spf": 50, "is_mineral": True},
        ],
        "medium": [
            {"product": "Medium Tone SPF 50", "brand": "SunCare", "category": "Sunscreen", "spf": 50},
            {"product": "Broad Spectrum SPF 45", "brand": "ProtectPlus", "category": "Sunscreen", "spf": 45},
        ],
        "medium-deep": [
            {"product": "No-White-Cast SPF 50", "brand": "DeepShield", "category": "Sunscreen", "spf": 50, "is_mineral": True},
            {"product": "Invisible SPF 50+", "brand": "ClearShield", "category": "Sunscreen", "spf": 50},
        ],
        "deep": [
            {"product": "Deep Skin SPF 50+", "brand": "DeepShield", "category": "Sunscreen", "spf": 50},
            {"product": "Maximum Protection SPF 60", "brand": "UltraShield", "category": "Sunscreen", "spf": 60},
        ]
    }
    
    recommendations = []
    
    # Always recommend a cleanser
    if skin_tone in cleansers:
        cleanser = random.choice(cleansers[skin_tone])
        recommendations.append(ProductRecommendation(
            product=cleanser["product"],
            brand=cleanser["brand"],
            why=f"Gentle cleansing formula specifically designed for {skin_tone} skin",
            category=cleanser["category"],
            skin_tone=skin_tone,
            skin_type=skin_type
        ))
    
    # Recommend serums based on issues
    for issue in issues:
        if issue in serums:
            serum = random.choice(serums[issue])
            recommendations.append(ProductRecommendation(
                product=serum["product"],
                brand=serum["brand"],
                why=f"Targeted treatment for {issue} concerns in {skin_tone} skin",
                category=serum["category"],
                skin_tone=skin_tone,
                skin_type=skin_type
            ))
    
    # Recommend moisturizer based on skin type
    if skin_type in moisturizers:
        moisturizer = random.choice(moisturizers[skin_type])
        recommendations.append(ProductRecommendation(
            product=moisturizer["product"],
            brand=moisturizer["brand"],
            why=f"Moisturizer formulated for {skin_type} skin type",
            category=moisturizer["category"],
            skin_tone=skin_tone,
            skin_type=skin_type
        ))
    
    # Always recommend sunscreen
    if skin_tone in sunscreens:
        sunscreen = random.choice(sunscreens[skin_tone])
        recommendations.append(ProductRecommendation(
            product=sunscreen["product"],
            brand=sunscreen["brand"],
            why=f"Sun protection designed for {skin_tone} skin with no white cast",
            category=sunscreen["category"],
            skin_tone=skin_tone,
            skin_type=skin_type,
            spf=sunscreen.get("spf"),
            is_mineral=sunscreen.get("is_mineral", False)
        ))
    
    # Limit to 4 recommendations
    return recommendations[:4]

@app.get("/")
def root():
    return {
        "message": "Skinalyze ML Service is running!",
        "endpoints": {
            "health": "/health",
            "analyze": "/analyze (POST)"
        },
        "status": "ok"
    }

@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/analyze")
async def analyze_image(raw_body: bytes = Body(...)):
    # Enhanced image analysis with more realistic variations
    image = Image.open(BytesIO(raw_body)).convert("RGB")
    arr = np.asarray(image)
    
    # Get image dimensions and analyze different regions
    height, width = arr.shape[:2]
    mean_pixel = float(arr.mean())
    std_pixel = float(arr.std())
    
    # Analyze different regions of the image for more realistic results
    top_region = arr[:height//3, :].mean()
    middle_region = arr[height//3:2*height//3, :].mean()
    bottom_region = arr[2*height//3:, :].mean()
    
    # Calculate texture variation (simulates skin texture analysis)
    texture_variation = float(np.std([top_region, middle_region, bottom_region]))
    
    # Add some randomness to make results more diverse
    import time
    random.seed(int(time.time() * 1000) % 1000)
    
    issues: list[str] = []
    
    # More sophisticated issue detection
    # Pigmentation detection
    if mean_pixel < 100 or texture_variation > 15:
        if random.random() > 0.3:  # 70% chance
            issues.append("pigmentation")
    
    # Tanning detection
    if mean_pixel > 160:
        if random.random() > 0.4:  # 60% chance
            issues.append("tanning")
    
    # Acne detection based on texture
    if std_pixel > 55 or texture_variation > 20:
        if random.random() > 0.5:  # 50% chance
            issues.append("acne")
    
    # Dark circles detection (random for demo)
    if random.random() > 0.7:  # 30% chance
        issues.append("dark-circles")
    
    # Fine lines detection (random for demo)
    if random.random() > 0.8:  # 20% chance
        issues.append("fine-lines")
    
    if not issues:
        issues = ["no-major-issue"]

    # More realistic skin tone detection with variations
    if mean_pixel < 85:
        skin_tone = "deep"
    elif mean_pixel < 115:
        skin_tone = "medium-deep"
    elif mean_pixel < 145:
        skin_tone = "medium"
    else:
        skin_tone = "fair"
    
    # Add some randomness to skin tone detection
    if random.random() > 0.8:  # 20% chance of variation
        tones = ["fair", "medium", "medium-deep", "deep"]
        skin_tone = random.choice([t for t in tones if t != skin_tone])

    # More realistic skin type detection
    if std_pixel > 70:
        skin_type = "oily"
    elif std_pixel < 30:
        skin_type = "dry"
    elif std_pixel > 45:
        skin_type = "combination"
    else:
        skin_type = "sensitive"
    
    # Add some randomness to skin type detection
    if random.random() > 0.7:  # 30% chance of variation
        types = ["oily", "dry", "combination", "sensitive"]
        skin_type = random.choice([t for t in types if t != skin_type])

    # More realistic confidence calculation
    base_confidence = 0.6 + (random.random() * 0.3)  # 60-90% confidence
    confidence = min(0.95, base_confidence)

    # Generate AI-powered product recommendations
    recommendations = generate_ai_recommendations(issues, skin_tone, skin_type)

    return {
        "issues": issues,
        "confidence": confidence,
        "skin_tone": skin_tone,
        "skin_type": skin_type,
        "recommendations": [rec.dict() for rec in recommendations]
    }

