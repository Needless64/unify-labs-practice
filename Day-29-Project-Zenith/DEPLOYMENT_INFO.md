# Deployment Information

## Live Application
**URL**: https://project-zenith-coral.vercel.app

## Database
**Provider**: Neon Postgres (via Vercel)  
**Connection**: Automatic via `DATABASE_URL` environment variable

## Vercel Project
**Dashboard**: https://vercel.com/lingamadityafire1-8924s-projects/project-zenith

## Environment Variables
Set in Vercel dashboard:
- `DATABASE_URL` - Automatically configured by Vercel when you created the Neon database

## Deployment Commands
```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

## Local Development
```bash
# Install dependencies
npm install

# Run local server
npm run dev

# Access at http://localhost:3000
```

## Project Structure
```
project-zenith/
├── api/                    # Serverless API functions
│   ├── posts.js           # Main posts endpoint
│   └── posts/[id].js      # Single post endpoint
├── public/                # Original frontend files
├── index.html             # Main entry point
├── premium-style.css      # Glassmorphic styles
├── script.js              # Frontend logic
├── server.local.js        # Local development server
└── vercel.json            # Vercel configuration
```

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Vercel Serverless Functions
- **Database**: Neon Postgres
- **Deployment**: Vercel

## Notes
- The app uses Neon Postgres instead of MongoDB due to TLS compatibility issues in serverless environments
- All API endpoints are working correctly
- Frontend is fully functional with premium glassmorphic UI
