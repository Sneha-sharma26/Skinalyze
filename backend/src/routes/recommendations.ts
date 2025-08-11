import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({
    tags: [
      { id: 'acne-safe', label: 'Acne Safe' },
      { id: 'pigmentation', label: 'Pigmentation' },
      { id: 'dark-circles', label: 'Dark Circles' },
      { id: 'tanning', label: 'Tanning' },
    ],
  })
})

export default router

