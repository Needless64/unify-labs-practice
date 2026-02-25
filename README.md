# Project Zenith - Full-Stack Blogging CMS

A premium, Twitter-inspired blogging platform with a stunning glassmorphic UI and full CRUD functionality.

## 🚀 Live Demo

**Production URL**: https://project-zenith-coral.vercel.app

## ✨ Features

- **Premium Glassmorphic UI** - Dark theme with neon gradients and frosted glass effects
- **Twitter-like Interface** - Familiar three-column layout with composer, feed, and sidebar
- **Full CRUD Operations** - Create, read, update, and delete posts
- **Real-time Character Counter** - 280 character limit for posts
- **Responsive Design** - Works on all devices
- **Serverless Architecture** - Deployed on Vercel with Neon Postgres

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3 (Custom Glassmorphism)
- Vanilla JavaScript

### Backend
- Vercel Serverless Functions
- Neon Postgres Database

### Deployment
- Vercel

## 📁 Project Structure

```
project-zenith/
├── api/
│   ├── posts.js              # GET all posts, POST create post
│   └── posts/
│       └── [id].js           # GET, PUT, DELETE single post
├── public/
│   ├── index.html            # Main HTML file
│   ├── premium-style.css     # Glassmorphic styles
│   ├── script.js             # Frontend logic
│   └── style.css             # Additional styles
├── index.html                # Root redirect
├── premium-style.css         # Root styles
├── script.js                 # Root script
├── server.local.js           # Local development server
├── package.json              # Dependencies
├── vercel.json               # Vercel configuration
└── .env.example              # Environment variables template
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd project-zenith
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your database connection string.

4. **Run local server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🌐 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Create Neon Database**
   - Go to your Vercel project dashboard
   - Navigate to Storage tab
   - Create a new Postgres database (powered by Neon)
   - Vercel will automatically add `DATABASE_URL` environment variable

3. **Deploy**
   ```bash
   vercel --prod
   ```

## 📡 API Endpoints

### Posts

- **GET** `/api/posts` - Get all posts
  - Query params: `?published=true` (optional)
  
- **POST** `/api/posts` - Create new post
  - Body: `{ title, content, author, tags[], published }`
  
- **GET** `/api/posts/:id` - Get single post
  
- **PUT** `/api/posts/:id` - Update post
  - Body: `{ title, content, author, tags[], published }`
  
- **DELETE** `/api/posts/:id` - Delete post

## 🎨 Design Features

- **Glassmorphism Effects** - Frosted glass cards with backdrop blur
- **Animated Gradient Background** - Dynamic color transitions
- **Neon Glow Effects** - Interactive hover states
- **Floating Particles** - Ambient background animation
- **Smooth Transitions** - Polished user experience
- **Character Counter** - Real-time feedback for post length

## 🗄️ Database Schema

### Posts Table

```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🔧 Configuration

### Environment Variables

- `DATABASE_URL` - Neon Postgres connection string (automatically set by Vercel)

### Vercel Configuration

The `vercel.json` file configures:
- Static file serving from root directory
- API routes for serverless functions
- Build settings

## 📝 License

MIT

## 🙏 Acknowledgments

- Design inspired by Twitter/X
- Built with Vercel and Neon
- Glassmorphism design trend

---

**Built with ❤️ for UnifyLabs Day 29 - Project Zenith**
