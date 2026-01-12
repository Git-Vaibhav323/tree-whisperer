# Tree Whisperer 🌳

A living record of trees planted, cared for, and verified. Every tree deserves a witness.

## 🌟 Features

- **Explore Forest**: Interactive map showing all uploaded trees with blinking markers
- **Upload Tree**: Add trees with location, species, status, and care details
- **AI Mode**: Get AI-powered advice about tree care using Groq API
- **Care Guide**: Comprehensive guide for tree planting and maintenance
- **Dark Mode**: Full dark mode support throughout the application
- **Real-time Updates**: Trees appear instantly across all tabs and windows

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google Maps API key (for map features)
- Groq API key (for AI Mode - optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/Git-Vaibhav323/tree-whisperer.git

# Navigate to project directory
cd tree-whisperer

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Google Maps API Key (required for map features)
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Groq API Key (required for AI Mode)
GROQ_API_KEY=your_groq_api_key_here
```

**Get your API keys:**
- Google Maps: https://console.cloud.google.com/
- Groq: https://console.groq.com/

### Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router
- **Animations**: GSAP, Framer Motion, OGL
- **Maps**: Google Maps Embed API
- **State Management**: React Context
- **Theme**: next-themes

## 📁 Project Structure

```
tree-whisperer/
├── src/
│   ├── components/      # Reusable components
│   │   ├── ui/        # shadcn/ui components
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── Particles.tsx
│   │   └── ScrollReveal.tsx
│   ├── contexts/       # React Context providers
│   │   └── TreeContext.tsx
│   ├── pages/          # Page components
│   │   ├── Index.tsx
│   │   ├── Forest.tsx
│   │   ├── UploadTree.tsx
│   │   ├── AIMode.tsx
│   │   └── Guide.tsx
│   ├── lib/           # Utility functions
│   └── App.tsx        # Main app component
├── public/            # Static assets
└── vite.config.ts     # Vite configuration
```

## 🎨 Features in Detail

### Explore Forest
- Interactive Google Maps integration
- Real-time tree markers with pulsing animations
- Click markers to view tree details
- Automatic map centering based on uploaded trees

### Upload Tree
- Google Places autocomplete for location
- Automatic geocoding for manual addresses
- Tree details: name, species, status, location
- Instant appearance on Explore Forest map

### AI Mode
- Powered by Groq API (Llama 3.3 70B)
- Backend API endpoint for secure key handling
- Tree care advice and recommendations

### Care Guide
- Comprehensive tree care information
- Scroll-reveal animations
- Particle background effects
- Detailed planting and maintenance guides

## 🌐 Deployment

### 🚀 Recommended: Vercel (Best for React/Vite apps)

**Why Vercel?**
- ✅ Zero configuration needed
- ✅ Automatic deployments from GitHub
- ✅ Built-in serverless functions (API endpoint works!)
- ✅ Free SSL and custom domains
- ✅ Fast global CDN

**Steps:**
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **"Add New Project"**
3. Import repository: `Git-Vaibhav323/tree-whisperer`
4. Configure:
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
5. Add **Environment Variables**:
   - `VITE_GOOGLE_MAPS_API_KEY` = your Google Maps API key
   - `GROQ_API_KEY` = your Groq API key
6. Click **"Deploy"**

Your site will be live at: `https://tree-whisperer.vercel.app`

**Note:** For the API endpoint (`/api/groq-chat`) to work, you'll need to create a Vercel serverless function. The current setup works in development but needs serverless function configuration for production.

### Alternative: Netlify ✅ (Recommended if using Netlify)

1. Go to [netlify.com](https://netlify.com) and sign up with GitHub
2. Click **"Add new site"** → **"Import an existing project"**
3. Select your GitHub repository: `Git-Vaibhav323/tree-whisperer`
4. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Add **Environment Variables** in **Site settings** → **Environment variables**:
   - `VITE_GOOGLE_MAPS_API_KEY` = your Google Maps API key
   - `GROQ_API_KEY` = your Groq API key
6. Click **"Deploy site"**

**✅ Netlify Function Setup:**
- The `netlify/functions/groq-chat.ts` function is already configured
- The `netlify.toml` file includes the redirect rule
- After deployment, your API endpoint will be available at `/api/groq-chat`

### Alternative: Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Sign up/login with GitHub
3. Connect repository: `Git-Vaibhav323/tree-whisperer`
4. Configure:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Add environment variables
6. Deploy

### ⚠️ Important: API Endpoint Limitation

The `/api/groq-chat` endpoint currently works in development via Vite middleware. For production:

**Option 1: Use Vercel Serverless Functions** (Recommended)
- Create `api/groq-chat.ts` in your project root
- Vercel will automatically deploy it as a serverless function

**Option 2: Use Netlify Functions**
- Create `netlify/functions/groq-chat.ts`
- Netlify will handle it automatically

**Option 3: Use a separate backend service**
- Deploy backend separately (e.g., Railway, Render, Fly.io)
- Update frontend to call the backend URL

### Manual Deployment

```bash
npm run build
# Upload the dist/ folder to your hosting provider
# Note: API endpoint won't work with static hosting
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Made with ❤️ for trees and the environment
