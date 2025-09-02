export type DermatologyProduct = {
  product: string
  brand?: string
  issues: string[]
  skin_tones: Array<'fair' | 'medium' | 'medium-deep' | 'deep'>
  skin_types: Array<'oily' | 'dry' | 'combination' | 'sensitive'>
  why: string
  comedogenic_safe: boolean
  spf?: number
  is_mineral?: boolean
}

export const PRODUCT_CATALOG: DermatologyProduct[] = [
  // Fair Skin Products
  {
    product: 'Gentle Foaming Cleanser',
    brand: 'FairGlow',
    issues: ['acne', 'pigmentation'],
    skin_tones: ['fair'],
    skin_types: ['oily', 'combination'],
    why: 'Mild formula designed for fair skin sensitivity',
    comedogenic_safe: true,
  },
  {
    product: 'Vitamin C Brightening Serum',
    brand: 'FairGlow',
    issues: ['pigmentation', 'tanning'],
    skin_tones: ['fair'],
    skin_types: ['dry', 'combination'],
    why: 'Gentle vitamin C formulation for fair skin',
    comedogenic_safe: true,
  },
  {
    product: 'Lightweight SPF 30 Sunscreen',
    brand: 'FairShield',
    issues: ['tanning', 'pigmentation'],
    skin_tones: ['fair'],
    skin_types: ['oily', 'combination', 'sensitive'],
    why: 'Non-greasy formula perfect for fair skin',
    comedogenic_safe: true,
    spf: 30,
  },

  // Medium Skin Products
  {
    product: 'Dermsafe Gentle Cleanser',
    brand: 'Dermsafe',
    issues: ['acne', 'pigmentation'],
    skin_tones: ['medium'],
    skin_types: ['oily', 'combination', 'sensitive'],
    why: 'Non-comedogenic, fragrance-free; suitable for medium skin tones',
    comedogenic_safe: true,
  },
  {
    product: 'Niacinamide 10% Serum',
    brand: 'Actives Co.',
    issues: ['acne', 'pigmentation'],
    skin_tones: ['medium'],
    skin_types: ['oily', 'combination'],
    why: 'Helps regulate sebum and even out medium skin tone',
    comedogenic_safe: true,
  },
  {
    product: 'Medium Tone Sunscreen SPF 50',
    brand: 'SunCare',
    issues: ['tanning', 'pigmentation'],
    skin_tones: ['medium'],
    skin_types: ['oily', 'combination', 'sensitive'],
    why: 'Formulated specifically for medium skin tones',
    comedogenic_safe: true,
    spf: 50,
  },

  // Medium-Deep Skin Products
  {
    product: 'Deep Tone Brightening Cream',
    brand: 'DeepGlow',
    issues: ['pigmentation', 'tanning'],
    skin_tones: ['medium-deep'],
    skin_types: ['dry', 'combination'],
    why: 'Specialized for medium-deep skin pigmentation issues',
    comedogenic_safe: true,
  },
  {
    product: 'No-White-Cast Sunscreen SPF 50',
    brand: 'DeepShield',
    issues: ['tanning', 'pigmentation'],
    skin_tones: ['medium-deep'],
    skin_types: ['oily', 'combination', 'sensitive'],
    why: 'Invisible on medium-deep skin; no white cast',
    comedogenic_safe: true,
    spf: 50,
    is_mineral: true,
  },
  {
    product: 'Medium-Deep Acne Treatment',
    brand: 'DeepClear',
    issues: ['acne'],
    skin_tones: ['medium-deep'],
    skin_types: ['oily', 'combination'],
    why: 'Gentle acne treatment for medium-deep skin',
    comedogenic_safe: true,
  },

  // Deep Skin Products
  {
    product: 'Deep Tone Hyperpigmentation Serum',
    brand: 'DeepGlow',
    issues: ['pigmentation'],
    skin_tones: ['deep'],
    skin_types: ['dry', 'combination', 'sensitive'],
    why: 'Advanced formula for deep skin hyperpigmentation',
    comedogenic_safe: true,
  },
  {
    product: 'Deep Skin SPF 50+ Sunscreen',
    brand: 'DeepShield',
    issues: ['tanning', 'pigmentation'],
    skin_tones: ['deep'],
    skin_types: ['oily', 'combination', 'sensitive'],
    why: 'Maximum protection with no white cast for deep skin',
    comedogenic_safe: true,
    spf: 50,
  },
  {
    product: 'Deep Tone Moisturizer',
    brand: 'DeepCare',
    issues: ['pigmentation', 'tanning'],
    skin_tones: ['deep'],
    skin_types: ['dry', 'sensitive'],
    why: 'Rich moisturizer formulated for deep skin needs',
    comedogenic_safe: true,
  },

  // Oily Skin Specific Products
  {
    product: 'Oil-Control Gel Cleanser',
    brand: 'OilFree',
    issues: ['acne'],
    skin_tones: ['fair', 'medium', 'medium-deep', 'deep'],
    skin_types: ['oily'],
    why: 'Strong oil control for oily skin types',
    comedogenic_safe: true,
  },
  {
    product: 'Mattifying Moisturizer',
    brand: 'OilFree',
    issues: ['acne'],
    skin_tones: ['fair', 'medium', 'medium-deep', 'deep'],
    skin_types: ['oily'],
    why: 'Lightweight, non-greasy formula for oily skin',
    comedogenic_safe: true,
  },

  // Dry Skin Specific Products
  {
    product: 'Ceramide Moisturizer',
    brand: 'BarrierFix',
    issues: ['pigmentation', 'tanning'],
    skin_tones: ['fair', 'medium', 'medium-deep', 'deep'],
    skin_types: ['dry', 'sensitive'],
    why: 'Rich moisturizer for dry skin barrier repair',
    comedogenic_safe: true,
  },
  {
    product: 'Hydrating Cleansing Oil',
    brand: 'DryCare',
    issues: ['pigmentation'],
    skin_tones: ['fair', 'medium', 'medium-deep', 'deep'],
    skin_types: ['dry'],
    why: 'Gentle cleansing oil that doesn\'t strip moisture',
    comedogenic_safe: true,
  },

  // Sensitive Skin Products
  {
    product: 'Fragrance-Free Gentle Cleanser',
    brand: 'SensitiveCare',
    issues: ['acne', 'pigmentation'],
    skin_tones: ['fair', 'medium', 'medium-deep', 'deep'],
    skin_types: ['sensitive'],
    why: 'Ultra-gentle formula for sensitive skin',
    comedogenic_safe: true,
  },
  {
    product: 'Soothing Calming Serum',
    brand: 'SensitiveCare',
    issues: ['pigmentation'],
    skin_tones: ['fair', 'medium', 'medium-deep', 'deep'],
    skin_types: ['sensitive'],
    why: 'Anti-inflammatory serum for sensitive skin',
    comedogenic_safe: true,
  },

  // Universal Products
  {
    product: 'Azelaic Acid 10% Cream',
    brand: 'DermLab',
    issues: ['acne', 'pigmentation'],
    skin_tones: ['fair', 'medium', 'medium-deep', 'deep'],
    skin_types: ['oily', 'combination', 'sensitive'],
    why: 'Universal anti-inflammatory for acne and PIH',
    comedogenic_safe: true,
  },
  {
    product: 'Caffeine + Peptide Eye Gel',
    brand: 'UnderGlow',
    issues: ['dark-circles'],
    skin_tones: ['fair', 'medium', 'medium-deep', 'deep'],
    skin_types: ['oily', 'combination', 'dry', 'sensitive'],
    why: 'Reduces puffiness and dark circles for all skin types',
    comedogenic_safe: true,
  },
]

export function getRecommendations(
  detectedIssues: string[],
  options?: { skinTone?: DermatologyProduct['skin_tones'][number]; skinType?: DermatologyProduct['skin_types'][number] }
) {
  const tone = options?.skinTone
  const type = options?.skinType

  const scored = PRODUCT_CATALOG.map((p) => {
    const issueMatches = p.issues.filter((i) => detectedIssues.includes(i)).length
    const toneMatch = tone ? p.skin_tones.includes(tone) : 0
    const typeMatch = type ? p.skin_types.includes(type) : 0
    const safety = p.comedogenic_safe ? 1 : 0
    
    // Give much higher priority to skin tone and type matches
    // Issue matches: 10 points each
    // Skin tone match: 15 points (very important)
    // Skin type match: 15 points (very important)
    // Safety: 5 points
    const score = issueMatches * 10 + Number(!!toneMatch) * 15 + Number(!!typeMatch) * 15 + safety * 5
    
    return { product: p, score }
  })

  // Filter and sort by score, prioritizing skin tone and type matches
  const filtered = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)

  // Try to get at least one product that matches both skin tone and type
  const perfectMatches = filtered.filter(s => 
    tone && s.product.skin_tones.includes(tone) && 
    type && s.product.skin_types.includes(type)
  )

  // If we have perfect matches, prioritize them
  const finalProducts = perfectMatches.length > 0 
    ? [...perfectMatches.slice(0, 2), ...filtered.filter(s => !perfectMatches.includes(s)).slice(0, 2)]
    : filtered.slice(0, 4)

  return finalProducts.map(({ product }) => ({
    product: product.product,
    brand: product.brand,
    skin_tone: tone || 'any',
    skin_type: type || 'any',
    why: product.why,
    spf: product.spf,
    is_mineral: product.is_mineral,
  }))
}

