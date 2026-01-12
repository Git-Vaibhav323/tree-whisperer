import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TreeDetail from '@/components/TreeDetail';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

type TreeStatus = 'healthy' | 'needs-attention' | 'critical';

interface TreeMarker {
  id: string;
  name: string;
  species: string;
  status: TreeStatus;
  lastVerified: string;
  location: string;
  position: { x: number; y: number };
}

const mockTrees: TreeMarker[] = [
  {
    id: '1',
    name: 'Elder Oak',
    species: 'Quercus robur',
    status: 'healthy',
    lastVerified: '2 hours ago',
    location: 'North Grove',
    position: { x: 25, y: 30 },
  },
  {
    id: '2',
    name: 'Morning Pine',
    species: 'Pinus sylvestris',
    status: 'healthy',
    lastVerified: '5 hours ago',
    location: 'East Ridge',
    position: { x: 72, y: 22 },
  },
  {
    id: '3',
    name: 'River Willow',
    species: 'Salix alba',
    status: 'needs-attention',
    lastVerified: '3 days ago',
    location: 'Streamside',
    position: { x: 45, y: 65 },
  },
  {
    id: '4',
    name: 'Guardian Maple',
    species: 'Acer saccharum',
    status: 'healthy',
    lastVerified: '1 day ago',
    location: 'Central Park',
    position: { x: 55, y: 45 },
  },
  {
    id: '5',
    name: 'Sentinel Birch',
    species: 'Betula pendula',
    status: 'critical',
    lastVerified: '7 days ago',
    location: 'West Hollow',
    position: { x: 15, y: 70 },
  },
  {
    id: '6',
    name: 'Whispering Ash',
    species: 'Fraxinus excelsior',
    status: 'healthy',
    lastVerified: '12 hours ago',
    location: 'South Meadow',
    position: { x: 80, y: 55 },
  },
  {
    id: '7',
    name: 'Ancient Yew',
    species: 'Taxus baccata',
    status: 'healthy',
    lastVerified: '4 hours ago',
    location: 'Sacred Grove',
    position: { x: 35, y: 48 },
  },
  {
    id: '8',
    name: 'Lonely Cedar',
    species: 'Cedrus libani',
    status: 'needs-attention',
    lastVerified: '5 days ago',
    location: 'Hilltop',
    position: { x: 62, y: 78 },
  },
];

const statusConfig = {
  healthy: {
    bgClass: 'bg-healthy',
    pulseClass: 'animate-pulse',
    glowClass: 'shadow-[0_0_20px_-2px_hsl(var(--healthy)/0.6)]',
    ringClass: 'ring-healthy/30',
    label: 'Thriving',
  },
  'needs-attention': {
    bgClass: 'bg-warning',
    pulseClass: '',
    glowClass: 'shadow-[0_0_15px_-2px_hsl(var(--warning)/0.5)]',
    ringClass: 'ring-warning/30',
    label: 'Needs care',
  },
  critical: {
    bgClass: 'bg-destructive',
    pulseClass: 'animate-pulse',
    glowClass: 'shadow-[0_0_25px_-2px_hsl(var(--destructive)/0.6)]',
    ringClass: 'ring-destructive/30',
    label: 'Urgent',
  },
};

const Forest: React.FC = () => {
  const navigate = useNavigate();
  const [isEntered, setIsEntered] = useState(false);
  const [selectedTreeId, setSelectedTreeId] = useState<string | null>(null);
  const [hoveredTreeId, setHoveredTreeId] = useState<string | null>(null);

  useEffect(() => {
    // Trigger entrance animation after mount
    const timer = setTimeout(() => setIsEntered(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleTreeClick = (id: string) => {
    setSelectedTreeId(id);
  };

  const handleCloseDetail = () => {
    setSelectedTreeId(null);
  };

  const hoveredTree = hoveredTreeId ? mockTrees.find(t => t.id === hoveredTreeId) : null;

  return (
    <div className={cn(
      "min-h-screen relative overflow-hidden transition-all duration-1000 ease-out",
      isEntered ? "opacity-100 scale-100" : "opacity-0 scale-105"
    )}>
      {/* Living background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-accent/20" />
      
      {/* Organic shapes - subtle terrain hints */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-healthy/5 blur-3xl animate-breathe" />
        <div className="absolute bottom-[10%] right-[15%] w-[35vw] h-[35vw] rounded-full bg-primary/5 blur-3xl animate-breathe" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[60%] left-[50%] w-[25vw] h-[25vw] rounded-full bg-accent/10 blur-2xl animate-breathe" style={{ animationDelay: '4s' }} />
      </div>

      {/* Quiet header */}
      <header className={cn(
        "absolute top-0 left-0 right-0 z-20 p-6 flex items-center justify-between transition-all duration-700 delay-300",
        isEntered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      )}>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="font-body text-sm">Leave the forest</span>
        </button>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-healthy animate-pulse" />
          <span className="font-body">{mockTrees.length} trees present</span>
        </div>
      </header>

      {/* Forest title - appears gently */}
      <div className={cn(
        "absolute top-24 left-1/2 -translate-x-1/2 text-center z-10 transition-all duration-1000 delay-500",
        isEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        <h1 className="font-display text-2xl md:text-3xl text-foreground/80 mb-2">
          The living forest
        </h1>
        <p className="font-body text-sm text-muted-foreground max-w-xs mx-auto">
          Each light is a life. Observe before you act.
        </p>
      </div>

      {/* Tree markers - spatial view */}
      <div className="absolute inset-0 z-10">
        {mockTrees.map((tree, index) => {
          const config = statusConfig[tree.status];
          const isHovered = hoveredTreeId === tree.id;
          
          return (
            <button
              key={tree.id}
              onClick={() => handleTreeClick(tree.id)}
              onMouseEnter={() => setHoveredTreeId(tree.id)}
              onMouseLeave={() => setHoveredTreeId(null)}
              className={cn(
                "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out group",
                isEntered ? "opacity-100 scale-100" : "opacity-0 scale-0"
              )}
              style={{ 
                left: `${tree.position.x}%`, 
                top: `${tree.position.y}%`,
                transitionDelay: `${600 + index * 150}ms`
              }}
            >
              {/* Outer glow ring */}
              <div className={cn(
                "absolute inset-0 rounded-full transition-all duration-500",
                isHovered ? "scale-[3] opacity-100" : "scale-[2] opacity-50",
                config.glowClass
              )} />
              
              {/* Main marker */}
              <div className={cn(
                "relative w-4 h-4 rounded-full ring-4 transition-all duration-300",
                config.bgClass,
                config.pulseClass,
                config.ringClass,
                isHovered && "scale-150"
              )} />

              {/* Tree name tooltip - appears on hover */}
              <div className={cn(
                "absolute left-1/2 -translate-x-1/2 top-8 whitespace-nowrap px-3 py-2 bg-card/95 backdrop-blur-sm rounded-lg shadow-soft border border-border/50 transition-all duration-300",
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
              )}>
                <p className="font-display text-sm font-medium text-foreground">{tree.name}</p>
                <p className="font-body text-xs text-muted-foreground">{config.label}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Floating info panel for hovered tree */}
      <div className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ease-out",
        hoveredTree ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        {hoveredTree && (
          <div className="bg-card/95 backdrop-blur-md rounded-2xl shadow-soft border border-border/50 px-6 py-4 min-w-[280px]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-medium text-foreground">{hoveredTree.name}</h3>
                <p className="font-body text-sm text-muted-foreground italic">{hoveredTree.species}</p>
              </div>
              <span className={cn(
                "inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full",
                hoveredTree.status === 'healthy' && "bg-healthy/10 text-healthy",
                hoveredTree.status === 'needs-attention' && "bg-warning/10 text-warning",
                hoveredTree.status === 'critical' && "bg-destructive/10 text-destructive",
              )}>
                <span className={cn("w-1.5 h-1.5 rounded-full", statusConfig[hoveredTree.status].bgClass)} />
                {statusConfig[hoveredTree.status].label}
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
              <span className="font-body text-xs text-muted-foreground">{hoveredTree.location}</span>
              <span className="font-body text-xs text-muted-foreground">
                Last seen: <span className="text-foreground">{hoveredTree.lastVerified}</span>
              </span>
            </div>
            <p className="mt-3 font-body text-xs text-primary/80 text-center">
              Click to witness
            </p>
          </div>
        )}
      </div>

      {/* Gentle prompt - appears after trees are visible */}
      <div className={cn(
        "fixed bottom-8 right-8 z-10 transition-all duration-1000",
        isEntered ? "opacity-100 translate-y-0 delay-[2000ms]" : "opacity-0 translate-y-4",
        hoveredTree && "opacity-0"
      )}>
        <p className="font-body text-sm text-muted-foreground/70 max-w-[180px] text-right leading-relaxed">
          Hover over a light to learn about the life behind it
        </p>
      </div>

      {/* Tree Detail Modal */}
      <TreeDetail
        isOpen={selectedTreeId !== null}
        onClose={handleCloseDetail}
      />
    </div>
  );
};

export default Forest;
