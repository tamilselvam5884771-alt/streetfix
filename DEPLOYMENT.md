# StreetFix - Deployment Guide

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Push your code to GitHub** (already done ✓)

2. **Import project to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Configure Build Settings:**
   - **Root Directory**: Leave as `.` (root) - the `vercel.json` handles the path
   - **Build Command**: `cd client/vite-project && npm run build`
   - **Output Directory**: `client/vite-project/dist`
   - **Install Command**: `cd client/vite-project && npm install`

4. **Deploy!**

### Option 2: Render

1. **Create New Static Site:**
   - Go to [render.com](https://render.com)
   - Click "New" → "Static Site"
   - Connect your GitHub repository

2. **Configure Build Settings:**
   - **Root Directory**: `client/vite-project`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

3. **Deploy!**

## Alternative: Deploy ONLY the Frontend Folder

If the above doesn't work, you can deploy just the `client/vite-project` folder:

### Create a separate repository for frontend:

\`\`\`bash
cd client/vite-project
git init
git add .
git commit -m "Initial commit - Frontend only"
git branch -M main
git remote add origin YOUR_NEW_FRONTEND_REPO_URL
git push -u origin main
\`\`\`

Then deploy this new repo directly to Vercel/Render without any special configuration.

## Backend Configuration

Your frontend is already configured to use the deployed backend:
- Backend URL: `https://streetfix-oml7.onrender.com`
- This is set in `vite.config.js`

## Important Notes

1. Make sure your backend CORS settings allow your deployed frontend domain
2. Upload folder `/uploads` won't work on static hosting - consider using Cloudinary or AWS S3 for production
