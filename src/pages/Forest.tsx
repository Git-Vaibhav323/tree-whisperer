import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTrees, UploadedTree } from '@/contexts/TreeContext';

const Forest: React.FC = () => {
  const navigate = useNavigate();
  const locationHook = useLocation();
  const { trees: uploadedTrees } = useTrees();
  const [isEntered, setIsEntered] = useState(false);
  const [selectedTree, setSelectedTree] = useState<UploadedTree | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [newTreeIds, setNewTreeIds] = useState<Set<string>>(new Set());
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });


  // Track newly uploaded trees for enhanced animation
  useEffect(() => {
    // Mark all current trees as "new" if they were uploaded in the last 5 seconds
    const now = Date.now();
    const recentTrees = uploadedTrees.filter(tree => {
      const uploadedTime = new Date(tree.uploadedAt).getTime();
      return (now - uploadedTime) < 5000; // 5 seconds
    });
    setNewTreeIds(new Set(recentTrees.map(t => t.id)));
    
    // After 5 seconds, remove from "new" set
    const timer = setTimeout(() => {
      setNewTreeIds(new Set());
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [uploadedTrees]);

  useEffect(() => {
    // Trigger entrance animation after mount
    const timer = setTimeout(() => setIsEntered(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Update map dimensions on resize and when trees change
  useEffect(() => {
    const updateDimensions = () => {
      if (mapRef.current) {
        const width = mapRef.current.offsetWidth || window.innerWidth;
        const height = mapRef.current.offsetHeight || window.innerHeight;
        setMapDimensions({ width, height });
      }
    };
    
    // Initial update
    updateDimensions();
    
    // Update after a short delay to ensure iframe is loaded
    const timeout = setTimeout(updateDimensions, 100);
    
    window.addEventListener('resize', updateDimensions);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [uploadedTrees.length]); // Re-calculate when trees are added

  const searchParams = new URLSearchParams(locationHook.search);
  const locationQuery = searchParams.get('location') || '';
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const mapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

  // Calculate map center and zoom based on all trees
  const calculateMapView = () => {
    const treesWithCoords = uploadedTrees.filter(t => t.lat !== null && t.lng !== null);
    
    if (treesWithCoords.length === 0) {
      // Default view if no trees with coordinates
      if (lat && lng && !Number.isNaN(Number(lat)) && !Number.isNaN(Number(lng))) {
        return { center: `${lat},${lng}`, zoom: 15 };
      }
      return { center: '12.8385024,80.1540219', zoom: 12 };
    }

    // Calculate bounds to fit all trees
    const lats = treesWithCoords.map(t => t.lat!);
    const lngs = treesWithCoords.map(t => t.lng!);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    
    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;
    
    // Calculate zoom based on bounds
    const latDiff = maxLat - minLat;
    const lngDiff = maxLng - minLng;
    const maxDiff = Math.max(latDiff, lngDiff);
    let zoom = 15;
    if (maxDiff > 0.1) zoom = 11;
    else if (maxDiff > 0.05) zoom = 12;
    else if (maxDiff > 0.02) zoom = 13;
    else if (maxDiff > 0.01) zoom = 14;

    return { center: `${centerLat},${centerLng}`, zoom };
  };

  const mapView = calculateMapView();
  
  // Build map URL with markers for all trees
  const buildMapUrl = () => {
    const treesWithCoords = uploadedTrees.filter(t => t.lat !== null && t.lng !== null);
    
    if (mapsKey && treesWithCoords.length > 0) {
      // Use Google Maps Embed API with markers
      const markers = treesWithCoords.map(t => `color:0x6b8e23|label:T|${t.lat},${t.lng}`).join('&markers=');
      return `https://www.google.com/maps/embed/v1/view?key=${mapsKey}&center=${mapView.center}&zoom=${mapView.zoom}&maptype=roadmap&markers=${markers}`;
    }
    
    if (mapsKey) {
      return `https://www.google.com/maps/embed/v1/view?key=${mapsKey}&center=${mapView.center}&zoom=${mapView.zoom}&maptype=roadmap`;
    }
    
    if (locationQuery) {
      return `https://www.google.com/maps?q=${encodeURIComponent(locationQuery)}&output=embed`;
    }
    
    return "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15560.295518258183!2d80.1540219!3d12.8385024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1768210362227!5m2!1sen!2sin";
  };

  const mapSrc = buildMapUrl();

  const handleTreeClick = (tree: UploadedTree) => {
    setSelectedTree(tree);
    setShowDetails(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-healthy';
      case 'needs-attention':
        return 'bg-warning';
      case 'critical':
        return 'bg-destructive';
      default:
        return 'bg-healthy';
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen relative overflow-hidden transition-all duration-1000 ease-out",
        isEntered ? "opacity-100 scale-100" : "opacity-100 scale-105"
      )}
    >
      {/* Google Maps background */}
      <div ref={mapRef} className="absolute inset-0 z-0">
        <iframe
          key={mapSrc} // Force re-render when URL changes
          title="Forest location map"
          src={mapSrc}
          style={{ border: 0, pointerEvents: 'auto' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
          allowFullScreen
        />
      </div>

      {/* Tree count indicator - positioned below navbar */}
      {uploadedTrees.length > 0 && (
        <div className={cn(
          "fixed top-20 right-6 z-30 flex items-center gap-2 text-sm text-muted-foreground bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 shadow-soft transition-all duration-700 delay-300",
          isEntered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}>
          <span className="w-2 h-2 rounded-full bg-healthy animate-pulse" />
          <span className="font-body">{uploadedTrees.length} {uploadedTrees.length === 1 ? 'tree' : 'trees'} present</span>
        </div>
      )}

      {/* Interactive overlay markers - clickable dots for each tree */}
      {uploadedTrees.length > 0 && (
        <div className="fixed inset-0 z-[100] pointer-events-none" style={{ pointerEvents: 'none' }}>
          {uploadedTrees.map((tree, index) => {
            // Only show trees with valid coordinates
            if (tree.lat === null || tree.lng === null) {
              return null;
            }
            
            // Improved position calculation using Mercator projection
            const centerLat = parseFloat(mapView.center.split(',')[0]);
            const centerLng = parseFloat(mapView.center.split(',')[1]);
            const zoomLevel = mapView.zoom;
            
            // Mercator projection helper
            const TILE_SIZE = 256;
            const scale = Math.pow(2, zoomLevel);
            
            const worldCoordinate = (coord: number, isLat: boolean) => {
              const val = isLat ?
                (1 - Math.log(Math.tan(coord * Math.PI / 180) + 1 / Math.cos(coord * Math.PI / 180)) / Math.PI) / 2 :
                (coord + 180) / 360;
              return val * scale * TILE_SIZE;
            };
            
            const centerWorldX = worldCoordinate(centerLng, false);
            const centerWorldY = worldCoordinate(centerLat, true);
            const treeWorldX = worldCoordinate(tree.lng, false);
            const treeWorldY = worldCoordinate(tree.lat, true);
            
            // Use map dimensions or fallback to window dimensions
            const mapWidth = mapDimensions.width || window.innerWidth;
            const mapHeight = mapDimensions.height || window.innerHeight;
            
            const pixelX = treeWorldX - centerWorldX + mapWidth / 2;
            const pixelY = treeWorldY - centerWorldY + mapHeight / 2;
            
            const isNewTree = newTreeIds.has(tree.id);
            
            return (
              <button
                key={tree.id}
                type="button"
                onClick={() => handleTreeClick(tree)}
                className={cn(
                  "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-125 group",
                  "opacity-100 scale-100"
                )}
                style={{
                  left: `${pixelX}px`,
                  top: `${pixelY}px`,
                  transitionDelay: `${index * 50}ms`,
                  zIndex: 1000,
                  pointerEvents: 'auto',
                }}
                title={tree.name}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full ring-4 shadow-2xl transition-all duration-300",
                  "bg-[#6b8e23]",
                  isNewTree ? "animate-tree-pulse-new animate-pulse-glow" : "animate-tree-pulse",
                  "ring-[#6b8e23]/60 group-hover:ring-[#6b8e23]/80"
                )} />
              </button>
            );
          })}
        </div>
      )}

      {/* Details overlay when marker is clicked */}
      {showDetails && selectedTree && (
        <div 
          className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center bg-background/40 backdrop-blur-sm animate-fade-rise"
          onClick={() => {
            setShowDetails(false);
            setSelectedTree(null);
          }}
        >
          <div 
            className="w-full max-w-md bg-card rounded-2xl shadow-soft border border-border/60 p-6 m-4 animate-gentle-scale"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-display text-xl text-foreground mb-1">
                  {selectedTree.name}
                </h2>
                <p className="text-sm text-muted-foreground italic">
                  {selectedTree.species}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowDetails(false);
                  setSelectedTree(null);
                }}
                className="p-1 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className={cn("w-2 h-2 rounded-full", getStatusColor(selectedTree.status))} />
                <span className="text-sm text-foreground capitalize">
                  Status: <span className="font-medium">{selectedTree.status.replace('-', ' ')}</span>
                </span>
              </div>

              <p className="text-sm text-foreground">
                <span className="font-medium">Location:</span> {selectedTree.location}
              </p>

              <p className="text-sm text-foreground">
                <span className="font-medium">Last verified:</span> {selectedTree.lastVerified}
              </p>

              {selectedTree.uploadedAt && (
                <p className="text-xs text-muted-foreground pt-2 border-t border-border/50">
                  Added {new Date(selectedTree.uploadedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forest;
