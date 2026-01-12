import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, MapPin, Calendar, User, CheckCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TreeDetailProps {
  isOpen: boolean;
  onClose: () => void;
  tree: {
    name: string;
    species: string;
    status: 'healthy' | 'needs-attention' | 'critical';
    lastVerified: string;
    location: string;
  } | null;
}

const TreeDetail: React.FC<TreeDetailProps> = ({ isOpen, onClose, tree }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerified(true);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm animate-fade-rise"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-3xl shadow-soft max-w-lg w-full max-h-[90vh] overflow-y-auto animate-gentle-scale">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Status indicator */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-3 h-3 rounded-full bg-healthy animate-pulse" />
            <span className="text-sm font-medium text-healthy">Thriving</span>
          </div>

          {/* Tree identity */}
          <h2 className="font-display text-3xl font-medium text-foreground mb-2">
            {tree?.name ?? 'Elder Oak'}
          </h2>
          <p className="text-muted-foreground italic mb-8">
            {tree?.species ?? 'Quercus robur'}
          </p>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <MapPin className="w-4 h-4" />
                <span className="text-xs">Location</span>
              </div>
              <p className="font-medium text-foreground">
                {tree?.location ?? 'North Grove'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-xs">Planted</span>
              </div>
              <p className="font-medium text-foreground">March 2023</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <User className="w-4 h-4" />
                <span className="text-xs">Guardian</span>
              </div>
              <p className="font-medium text-foreground">Sarah M.</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs">Verifications</span>
              </div>
              <p className="font-medium text-foreground">
                {tree?.lastVerified ?? '47 times'}
              </p>
            </div>
          </div>

          {/* AI Insight - subtle, like a whisper */}
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-8">
            <div className="flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-foreground leading-relaxed">
                  This oak is showing strong growth patterns. Consider scheduling 
                  the next verification within the week to maintain its healthy record.
                </p>
              </div>
            </div>
          </div>

          {/* Verification CTA */}
          <div className={cn(
            "transition-all duration-700",
            isVerifying && "scale-95 opacity-80",
            verified && "scale-100"
          )}>
            {!verified ? (
              <Button
                variant="verify"
                className="w-full"
                onClick={handleVerify}
                disabled={isVerifying}
              >
                {isVerifying ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-healthy-foreground/30 border-t-healthy-foreground rounded-full animate-spin" />
                    Confirming life...
                  </span>
                ) : (
                  'Verify this tree is alive'
                )}
              </Button>
            ) : (
              <div className="text-center py-6 animate-fade-rise">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-healthy/20 mb-4 animate-pulse-glow">
                  <CheckCircle className="w-8 h-8 text-healthy" />
                </div>
                <p className="font-display text-xl text-foreground mb-2">
                  You helped something stay alive
                </p>
                <p className="text-sm text-muted-foreground">
                  Last verified: just now
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeDetail;
