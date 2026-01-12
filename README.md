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

### Vercel / Netlify

1. Push your code to GitHub
2. Import the repository in Vercel/Netlify
3. Add environment variables in the dashboard
4. Deploy!

### Manual Deployment

```bash
npm run build
# Upload the dist/ folder to your hosting provider
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Made with ❤️ for trees and the environment
