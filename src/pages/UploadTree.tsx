import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useTrees, UploadedTree } from '@/contexts/TreeContext';

type TreeStatus = 'healthy' | 'needs-attention' | 'critical';

const UploadTree: React.FC = () => {
  const navigate = useNavigate();
  const { addTree } = useTrees();
  const autocompleteRef = useRef<HTMLInputElement | null>(null);
  const googleKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const [placesReady, setPlacesReady] = useState(false);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [status, setStatus] = useState<TreeStatus>('healthy');
  const [location, setLocation] = useState('');
  const [lastVerified, setLastVerified] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lazy-load Google Places script if key is present
  useEffect(() => {
    if (!googleKey) return;
    const existing = document.querySelector<HTMLScriptElement>('script[data-places="true"]');
    if (existing) {
      setPlacesReady(true);
      return;
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.dataset.places = 'true';
    script.onload = () => setPlacesReady(true);
    script.onerror = () => setPlacesReady(false);
    document.body.appendChild(script);
  }, [googleKey]);

  // Attach Places autocomplete once script is ready
  useEffect(() => {
    if (!placesReady || !autocompleteRef.current || !(window as any).google) return;
    const google = (window as any).google;
    const autocomplete = new google.maps.places.Autocomplete(autocompleteRef.current, {
      fields: ['formatted_address', 'geometry'],
      types: ['geocode'],
    });
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        setLocation(place.formatted_address);
      }
      if (place.geometry?.location) {
        const loc = place.geometry.location;
        setLat(loc.lat());
        setLng(loc.lng());
      }
    });
  }, [placesReady]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!location.trim()) {
      setError('Please enter a location.');
      return;
    }

    if (!name.trim()) {
      setError('Please enter a tree name.');
      return;
    }

    setIsSaving(true);

    try {
      let finalLat = lat;
      let finalLng = lng;

      // If coordinates are missing, try to geocode the address
      if ((finalLat === null || finalLng === null) && googleKey) {
        // Wait for Google Maps API to be available
        let attempts = 0;
        while (!(window as any).google && attempts < 10) {
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }
        
        if ((window as any).google) {
          try {
            const geocoder = new (window as any).google.maps.Geocoder();
            const result = await new Promise<{ lat: number; lng: number } | null>((resolve) => {
              geocoder.geocode({ address: location.trim() }, (results: any[], status: string) => {
                if (status === 'OK' && results && results[0] && results[0].geometry) {
                  const loc = results[0].geometry.location;
                  resolve({ lat: loc.lat(), lng: loc.lng() });
                } else {
                  console.warn('Geocoding failed:', status, location.trim());
                  resolve(null);
                }
              });
            });

            if (result) {
              finalLat = result.lat;
              finalLng = result.lng;
            }
          } catch (geocodeErr) {
            console.error('Geocoding error:', geocodeErr);
            // Continue without coordinates - tree will still be saved
          }
        }
      }

      // Create tree object with all details
      const newTree: UploadedTree = {
        id: Date.now().toString(),
        name: name.trim(),
        species: species.trim() || 'Unknown',
        location: location.trim(),
        lat: finalLat,
        lng: finalLng,
        status: status,
        lastVerified: lastVerified.trim() || 'Just now',
        uploadedAt: new Date().toISOString(),
      };

      // Add tree to context (immediately updates state)
      addTree(newTree);

      // Navigate to forest with the new tree's location
      const params = new URLSearchParams();
      params.set('location', location.trim());
      if (finalLat !== null && finalLng !== null) {
        params.set('lat', finalLat.toString());
        params.set('lng', finalLng.toString());
      }
      const target = `/forest?${params.toString()}`;
      navigate(target);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Could not save tree. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-xl bg-card/80 backdrop-blur-md border border-border/60 rounded-2xl shadow-soft p-8">

        <h1 className="font-display text-2xl md:text-3xl mb-2 text-foreground">
          Upload a tree
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Share a tree you&apos;ve planted or care for. It will appear as a new light in the living forest.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Tree name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Elder Oak"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="species">Species</Label>
            <Input
              id="species"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              placeholder="Quercus robur"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location description</Label>
            <Input
              id="location"
              inputMode="search"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              ref={autocompleteRef}
              placeholder="Near the north lake, Rajiv Gandhi Nagar"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TreeStatus)}
              className={cn(
                'w-full h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              )}
            >
              <option value="healthy">Healthy</option>
              <option value="needs-attention">Needs attention</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastVerified">Last verified (optional)</Label>
            <Input
              id="lastVerified"
              value={lastVerified}
              onChange={(e) => setLastVerified(e.target.value)}
              placeholder="2 hours ago"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <div className="pt-2 flex justify-end">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save tree to forest'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadTree;

