"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const axios_1 = __importDefault(require("axios"));
const products_1 = require("./data/products");
const dotenv_1 = __importDefault(require("dotenv"));
const recommendations_1 = __importDefault(require("./routes/recommendations"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
app.use('/recommendations', recommendations_1.default);
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.post('/analyze', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Image file is required' });
        }
        const mlServiceUrl = process.env.ML_SERVICE_URL || 'http://127.0.0.1:8000/analyze';
        const response = await axios_1.default.post(mlServiceUrl, req.file.buffer, {
            headers: { 'Content-Type': 'application/octet-stream' },
            timeout: 30000,
        });
        const ml = response.data;
        const skinTone = req.query.tone;
        const skinType = req.query.type;
        const recs = (0, products_1.getRecommendations)(ml.issues, { skinTone, skinType });
        res.json({ ...ml, recommendations: recs });
    }
    catch (error) {
        console.error('Analyze error:', error?.message);
        res.status(500).json({ error: 'Failed to analyze image' });
    }
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
