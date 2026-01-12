import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TreePine } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/forest');
  };

  const handleUploadTree = () => {
    navigate('/upload-tree');
  };

  const handleAIMode = () => {
    navigate('/ai-mode');
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      {/* Subtle gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-healthy/10 blur-3xl animate-breathe" />
      
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Icon with pulse */}
        <div className="mb-8 opacity-0 animate-fade-rise">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 animate-pulse-glow">
            <TreePine className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Main headline */}
        <h1 className="font-display text-5xl md:text-7xl font-medium text-foreground mb-6 opacity-0 animate-fade-rise stagger-1">
          Every tree
          <span className="block text-primary mt-2">deserves a witness</span>
        </h1>

        {/* Subtext */}
        <p className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed opacity-0 animate-fade-rise stagger-2">
          A living record of trees planted, cared for, and verified. 
          Not data points — lives we're responsible for.
        </p>

        {/* CTAs */}
        <div className="opacity-0 animate-fade-rise stagger-3 flex flex-col items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button variant="hero" size="xl" onClick={handleExplore}>
              Explore the forest
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-healthy/60 text-healthy hover:bg-healthy/10"
              onClick={handleUploadTree}
            >
              Upload tree
            </Button>
          </div>

          <button
            type="button"
            onClick={handleAIMode}
            className="group inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-5 py-2 text-sm font-medium text-primary shadow-sm hover:bg-primary/10 hover:border-primary transition-colors duration-200"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>AI mode • ask Tree Whisperer</span>
          </button>
        </div>

        {/* Trust indicator */}
        <p className="mt-16 text-sm text-muted-foreground opacity-0 animate-fade-rise stagger-4">
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-healthy animate-pulse" />
            2,847 trees breathing right now
          </span>
        </p>
      </div>
    </section>
  );
};

export default Hero;
