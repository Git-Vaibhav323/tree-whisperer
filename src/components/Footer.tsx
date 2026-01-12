import React from 'react';
import { TreePine, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-16 px-6 border-t border-border/50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-6">
          <TreePine className="w-5 h-5 text-primary" />
        </div>
        
        <p className="font-display text-xl text-foreground mb-2">
          Trees grow slowly
        </p>
        <p className="text-muted-foreground mb-8">
          So does trust. We're building both.
        </p>

        <p className="text-sm text-muted-foreground inline-flex items-center gap-1">
          Made with <Heart className="w-3 h-3 text-destructive" /> for the planet
        </p>
      </div>
    </footer>
  );
};

export default Footer;
