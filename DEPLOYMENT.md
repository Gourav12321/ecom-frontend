# Vercel Deployment Guide for E-Commerce Frontend

## Prerequisites

1. A Vercel account (sign up at vercel.com)
2. Your backend API deployed and accessible (currently using: https://ecommerce-webapp-1.onrender.com)
3. Firebase project set up with credentials
4. Stripe account for payments (if applicable)

## Step 1: Prepare Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_actual_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=e-com-ff1ce.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=e-com-ff1ce
VITE_FIREBASE_STORAGE_BUCKET=e-com-ff1ce.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=363045410605
VITE_FIREBASE_APP_ID=1:363045410605:web:2157e3140698b484e1e5a4

# Backend API URL
VITE_API_BASE_URL=https://ecommerce-webapp-1.onrender.com

# Stripe Configuration (replace with your actual keys)
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Step 2: Update Import Statements

You'll need to update your components to use the new axios configuration. Replace:

```javascript
import axios from "axios";
```

With:

```javascript
import axios from "../config/axios";
```

## Step 3: Deploy to Vercel

### Option A: Using Vercel CLI

1. Install Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Navigate to your project directory:

   ```bash
   cd "/Users/gourav/ecom/ecom frontend/client"
   ```

3. Login to Vercel:

   ```bash
   vercel login
   ```

4. Deploy:
   ```bash
   vercel
   ```

### Option B: Using GitHub + Vercel Dashboard

1. Push your code to GitHub
2. Go to vercel.com and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Configure build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add environment variables in Vercel dashboard

## Step 4: Configure Environment Variables in Vercel

In your Vercel project dashboard:

1. Go to Settings > Environment Variables
2. Add all the variables from your `.env.local` file
3. Make sure to set them for Production, Preview, and Development environments

## Step 5: Custom Domain (Optional)

1. In Vercel dashboard, go to Settings > Domains
2. Add your custom domain
3. Configure DNS settings as instructed

## Important Notes:

- Make sure your backend API supports CORS for your Vercel domain
- Test all functionality after deployment
- Monitor the deployment logs for any errors
- The hardcoded URL in PaymentPage.jsx will need to be updated to your actual backend URL

## Troubleshooting:

- If API calls fail, check that VITE_API_BASE_URL is correctly set
- Ensure your backend API is accessible and supports CORS
- Check browser console for any JavaScript errors
- Verify all environment variables are properly set in Vercel dashboard
