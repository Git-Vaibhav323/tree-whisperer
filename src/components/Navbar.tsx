import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, TreePine } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'AI Mode', path: '/ai-mode' },
    { label: 'Upload Tree', path: '/upload-tree' },
    { label: 'Guide', path: '/guide' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
          isScrolled
            ? 'py-3 bg-background/80 backdrop-blur-sm border-b border-border/50 shadow-soft'
            : 'py-5 bg-transparent'
        )}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <button
              onClick={() => handleNavClick('/')}
              className="flex items-center gap-2 font-display text-lg font-medium text-foreground hover:text-primary transition-colors duration-300"
            >
              <TreePine className="w-6 h-6 text-primary" />
              <span>Tree Whisperer</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={cn(
                    'relative font-body text-sm text-foreground/80 hover:text-foreground transition-all duration-300 group',
                    isActive(item.path) && 'text-foreground'
                  )}
                >
                  {item.label}
                  {/* Active indicator */}
                  {isActive(item.path) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                  {/* Hover indicator */}
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/30 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              ))}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-foreground/80 hover:text-foreground transition-colors duration-300"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed top-[73px] left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 transition-all duration-500 ease-out md:hidden',
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <div className="container mx-auto px-6 py-6 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={cn(
                'block w-full text-left font-body text-base text-foreground/80 hover:text-foreground transition-colors duration-300 py-2',
                isActive(item.path) && 'text-foreground font-medium'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Spacer to prevent content from going under navbar */}
      <div className={cn('transition-all duration-500', isScrolled ? 'h-[65px]' : 'h-[81px]')} />
    </>
  );
};

export default Navbar;
