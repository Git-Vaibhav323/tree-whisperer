import React from 'react';
import { TrendingUp, Heart, Eye } from 'lucide-react';

const ImpactStats = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: '94%',
      label: 'Survival rate',
      sublabel: 'Not trees planted — trees living',
    },
    {
      icon: Heart,
      value: '2,847',
      label: 'Trees cared for',
      sublabel: 'Each one verified by humans',
    },
    {
      icon: Eye,
      value: '12,394',
      label: 'Verifications',
      sublabel: 'Proof of ongoing care',
    },
  ];

  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-4 opacity-0 animate-fade-rise">
            Real impact, not greenwashing
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto opacity-0 animate-fade-rise stagger-1">
            Survival matters more than planting. Here's what's actually alive.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center opacity-0 animate-gentle-scale"
              style={{ animationDelay: `${0.2 + index * 0.15}s`, animationFillMode: 'forwards' }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="font-display text-4xl md:text-5xl font-medium text-foreground mb-2">
                {stat.value}
              </p>
              <p className="font-medium text-foreground mb-1">{stat.label}</p>
              <p className="text-sm text-muted-foreground">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
