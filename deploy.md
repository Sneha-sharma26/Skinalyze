# Skinalyze Deployment Guide

## Quick Deploy to Vercel + Railway

### 1. Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend
vercel --prod
```

### 2. Backend (Railway)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy backend
cd backend
railway login
railway init
railway up
```

### 3. ML Service (Railway)
```bash
# Deploy ML service
cd ml_service
railway init
railway up
```

## Environment Variables

### Frontend (Vercel)
- `VITE_API_URL`: Your backend URL (e.g., https://backend-production-xxxx.up.railway.app)

### Backend (Railway)
- `ML_SERVICE_URL`: Your ML service URL (e.g., https://ml-service-production-xxxx.up.railway.app/analyze)

### ML Service (Railway)
- No additional environment variables needed

## URLs After Deployment
- Frontend: https://your-app.vercel.app
- Backend: https://backend-production-xxxx.up.railway.app
- ML Service: https://ml-service-production-xxxx.up.railway.app

## Testing
1. Upload an image on the frontend
2. Check if analysis works
3. Verify different results for different images
