"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUCT_CATALOG = void 0;
exports.getRecommendations = getRecommendations;
exports.PRODUCT_CATALOG = [
    {
        product: 'Dermsafe Gentle Cleanser',
        brand: 'Dermsafe',
        issues: ['acne', 'pigmentation'],
        skin_tones: ['medium', 'medium-deep', 'deep'],
        skin_types: ['oily', 'combination', 'sensitive'],
        why: 'Non-comedogenic, fragrance-free; suitable for acne-prone skin',
        comedogenic_safe: true,
    },
    {
        product: 'Mineral Sunscreen SPF50 PA++++',
        brand: 'SunCare',
        issues: ['tanning', 'pigmentation'],
        skin_tones: ['medium', 'medium-deep', 'deep'],
        skin_types: ['oily', 'combination', 'sensitive'],
        why: 'No white cast on deeper tones; broad spectrum protection',
        comedogenic_safe: true,
        spf: 50,
        is_mineral: true,
    },
    {
        product: 'Niacinamide 10% Serum',
        brand: 'Actives Co.',
        issues: ['acne', 'pigmentation'],
        skin_tones: ['fair', 'medium', 'medium-deep', 'deep'],
        skin_types: ['oily', 'combination', 'sensitive'],
        why: 'Helps regulate sebum and even out tone',
        comedogenic_safe: true,
    },
    {
        product: 'Azelaic Acid 10% Cream',
        brand: 'DermLab',
        issues: ['acne', 'pigmentation'],
        skin_tones: ['fair', 'medium', 'medium-deep', 'deep'],
        skin_types: ['oily', 'combination', 'sensitive'],
        why: 'Anti-inflammatory, supports acne and PIH',
        comedogenic_safe: true,
    },
    {
        product: 'Caffeine + Peptide Eye Gel',
        brand: 'UnderGlow',
        issues: ['dark-circles'],
        skin_tones: ['fair', 'medium', 'medium-deep', 'deep'],
        skin_types: ['oily', 'combination', 'dry', 'sensitive'],
        why: 'Reduces puffiness and appearance of dark circles',
        comedogenic_safe: true,
    },
    {
        product: 'Ceramide Moisturizer',
        brand: 'BarrierFix',
        issues: ['pigmentation', 'tanning'],
        skin_tones: ['fair', 'medium', 'medium-deep', 'deep'],
        skin_types: ['dry', 'sensitive', 'combination'],
        why: 'Strengthens skin barrier; supports tone evenness',
        comedogenic_safe: true,
    },
];
function getRecommendations(detectedIssues, options) {
    const tone = options?.skinTone;
    const type = options?.skinType;
    const scored = exports.PRODUCT_CATALOG.map((p) => {
        const issueMatches = p.issues.filter((i) => detectedIssues.includes(i)).length;
        const toneMatch = tone ? p.skin_tones.includes(tone) : 0;
        const typeMatch = type ? p.skin_types.includes(type) : 0;
        const safety = p.comedogenic_safe ? 1 : 0;
        const score = issueMatches * 10 + Number(!!toneMatch) * 2 + Number(!!typeMatch) * 2 + safety;
        return { product: p, score };
    });
    return scored
        .filter((s) => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 4)
        .map(({ product }) => ({
        product: product.product,
        skin_tone: tone || 'any',
        skin_type: type || 'any',
        why: product.why,
    }));
}
