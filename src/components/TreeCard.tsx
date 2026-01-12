import React from 'react';
import { cn } from '@/lib/utils';

export type TreeStatus = 'healthy' | 'needs-attention' | 'critical';

interface TreeCardProps {
  id: string;
  name: string;
  species: string;
  status: TreeStatus;
  lastVerified: string;
  location: string;
  onClick?: () => void;
}

const statusConfig = {
  healthy: {
    label: 'Thriving',
    dotClass: 'bg-healthy animate-pulse',
    cardClass: 'hover:shadow-glow',
    glowClass: 'bg-healthy/10',
  },
  'needs-attention': {
    label: 'Needs care',
    dotClass: 'bg-warning',
    cardClass: 'hover:shadow-[0_0_30px_-10px_hsl(var(--warning)/0.4)]',
    glowClass: 'bg-warning/10',
  },
  critical: {
    label: 'Urgent',
    dotClass: 'bg-destructive animate-pulse',
    cardClass: 'hover:shadow-[0_0_30px_-10px_hsl(var(--destructive)/0.4)]',
    glowClass: 'bg-destructive/10',
  },
};

const TreeCard: React.FC<TreeCardProps> = ({
  name,
  species,
  status,
  lastVerified,
  location,
  onClick,
}) => {
  const config = statusConfig[status];

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-6 rounded-2xl bg-card border border-border/50 shadow-soft transition-all duration-500 ease-out hover:scale-[1.02] cursor-pointer relative overflow-hidden group",
        config.cardClass
      )}
    >
      {/* Subtle glow on hover */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl",
        config.glowClass
      )} />

      <div className="relative z-10">
        {/* Status indicator */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span className={cn("w-2 h-2 rounded-full", config.dotClass)} />
            {config.label}
          </span>
          <span className="text-xs text-muted-foreground">{location}</span>
        </div>

        {/* Tree identity */}
        <h3 className="font-display text-xl font-medium text-foreground mb-1">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground italic mb-4">{species}</p>

        {/* Last verified */}
        <div className="pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            Last seen alive: <span className="text-foreground font-medium">{lastVerified}</span>
          </p>
        </div>
      </div>
    </button>
  );
};

export default TreeCard;
