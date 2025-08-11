"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.json({
        tags: [
            { id: 'acne-safe', label: 'Acne Safe' },
            { id: 'pigmentation', label: 'Pigmentation' },
            { id: 'dark-circles', label: 'Dark Circles' },
            { id: 'tanning', label: 'Tanning' },
        ],
    });
});
exports.default = router;
