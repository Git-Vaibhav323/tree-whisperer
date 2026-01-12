import React from 'react';
import { BookOpen, Droplets, Sun, Calendar, Heart, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Particles from '@/components/Particles';
import ScrollReveal from '@/components/ScrollReveal';

const Guide: React.FC = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Particles Background */}
      <div className="fixed inset-0 z-0" style={{ width: '100%', height: '100%' }}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
            containerClassName="mb-4"
            textClassName="font-display text-4xl md:text-5xl font-medium text-foreground"
            as="h1"
          >
            Care Guide
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
            containerClassName="max-w-2xl mx-auto"
            textClassName="font-body text-lg text-muted-foreground"
            as="p"
          >
            A gentle guide to nurturing trees with intention and care. Every tree is a living commitment.
          </ScrollReveal>
        </div>

        {/* Tree Information Card */}
        <div className="bg-card rounded-2xl border border-border/60 shadow-soft p-8 mb-12">
          <div className="mb-6">
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={5}
              blurStrength={10}
              containerClassName="mb-2"
              textClassName="font-display text-3xl font-medium text-foreground"
              as="h2"
            >
              Neem Tree
            </ScrollReveal>
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={5}
              blurStrength={10}
              containerClassName="mb-6"
              textClassName="font-body text-muted-foreground italic"
              as="p"
            >
              Azadirachta indica
            </ScrollReveal>
          </div>

          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
            containerClassName="mb-6"
            textClassName="font-body text-foreground leading-relaxed"
            as="p"
          >
            The neem tree is a resilient, fast-growing evergreen native to the Indian subcontinent. 
            Known as the "village pharmacy" for its medicinal properties, it's a tree that gives back 
            to the community and environment around it.
          </ScrollReveal>

          {/* Quick Facts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
              <Heart className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-body text-xs text-muted-foreground mb-1">Lifespan</p>
                <p className="font-body text-sm font-medium text-foreground">150-200 years</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
              <Sun className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-body text-xs text-muted-foreground mb-1">Sunlight</p>
                <p className="font-body text-sm font-medium text-foreground">Full sun to partial shade</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
              <Droplets className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-body text-xs text-muted-foreground mb-1">Climate</p>
                <p className="font-body text-sm font-medium text-foreground">Tropical to subtropical</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
              <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-body text-xs text-muted-foreground mb-1">Planting Season</p>
                <p className="font-body text-sm font-medium text-foreground">Monsoon or early spring</p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-8">
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={5}
              blurStrength={10}
              containerClassName="mb-4"
              textClassName="font-display text-xl font-medium text-foreground"
              as="h3"
            >
              Why Plant Neem
            </ScrollReveal>
            <ul className="space-y-2">
              {[
                'Natural air purifier and carbon sequester',
                'Provides shade and cooling effect',
                'Medicinal properties in leaves, bark, and seeds',
                'Drought-resistant once established',
                'Supports local biodiversity',
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-healthy mt-2 flex-shrink-0" />
                  <span className="font-body text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Planting Guide */}
        <div className="bg-card rounded-2xl border border-border/60 shadow-soft p-8 mb-12">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
            containerClassName="mb-6"
            textClassName="font-display text-2xl font-medium text-foreground"
            as="h3"
          >
            Planting Guide
          </ScrollReveal>

          <div className="space-y-6">
            <div>
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="mb-3"
                textClassName="font-display text-lg font-medium text-foreground"
                as="h4"
              >
                Location Selection
              </ScrollReveal>
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName=""
                textClassName="font-body text-foreground leading-relaxed"
                as="p"
              >
                Choose a spot with well-draining soil and enough space for the tree to grow to its full size 
                (15-20 meters). Neem trees have extensive root systems, so avoid planting near buildings or 
                underground utilities. They thrive in open spaces where they can receive full sunlight.
              </ScrollReveal>
            </div>

            <div>
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="mb-3"
                textClassName="font-display text-lg font-medium text-foreground"
                as="h4"
              >
                Soil Preparation
              </ScrollReveal>
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="mb-3"
                textClassName="font-body text-foreground leading-relaxed"
                as="p"
              >
                Neem trees are adaptable but prefer:
              </ScrollReveal>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="font-body text-foreground">Well-draining soil (sandy loam is ideal)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="font-body text-foreground">pH between 6.2 and 7.0</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="font-body text-foreground">Dig a hole twice the width of the root ball</span>
                </li>
              </ul>
            </div>

            <div>
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="mb-3"
                textClassName="font-display text-lg font-medium text-foreground"
                as="h4"
              >
                Step-by-Step Planting
              </ScrollReveal>
              <ol className="space-y-3 ml-4">
                {[
                  'Water the sapling thoroughly before removing it from its container',
                  'Gently remove the sapling, being careful not to damage the roots',
                  'Place the sapling in the center of the hole, ensuring the root ball sits level with the ground',
                  'Backfill with native soil mixed with compost (70% soil, 30% compost)',
                  'Create a shallow basin around the tree to help retain water',
                  'Water deeply immediately after planting',
                  'Mulch around the base (but not touching the trunk) to retain moisture',
                ].map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="font-display text-primary font-medium mt-0.5 flex-shrink-0">
                      {idx + 1}.
                    </span>
                    <span className="font-body text-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Care Guide */}
        <div className="bg-card rounded-2xl border border-border/60 shadow-soft p-8 mb-12">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
            containerClassName="mb-6"
            textClassName="font-display text-2xl font-medium text-foreground"
            as="h3"
          >
            Care Guide
          </ScrollReveal>

          <div className="space-y-6">
            <div>
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="mb-3"
                textClassName="font-display text-lg font-medium text-foreground"
                as="h4"
              >
                Early Stage Care (First 2 Years)
              </ScrollReveal>
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="mb-3"
                textClassName="font-body text-foreground leading-relaxed"
                as="p"
              >
                The first two years are critical for establishing a strong root system:
              </ScrollReveal>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="font-body text-foreground">
                    <strong>Watering:</strong> Water deeply 2-3 times per week during dry seasons. 
                    Reduce frequency during monsoon. The soil should be moist but not waterlogged.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="font-body text-foreground">
                    <strong>Protection:</strong> Shield young saplings from strong winds and extreme heat. 
                    Consider using a temporary shade cloth during peak summer.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="font-body text-foreground">
                    <strong>Weeding:</strong> Keep the area around the tree free of competing vegetation 
                    for the first year to reduce competition for nutrients.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="mb-3"
                textClassName="font-display text-lg font-medium text-foreground"
                as="h4"
              >
                Long-Term Care
              </ScrollReveal>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="font-body text-foreground">
                    <strong>Watering:</strong> Once established, neem trees are drought-resistant. 
                    Water deeply once a week during dry periods, or rely on natural rainfall.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="font-body text-foreground">
                    <strong>Pruning:</strong> Minimal pruning needed. Remove dead or damaged branches 
                    annually. Prune in late winter or early spring.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="font-body text-foreground">
                    <strong>Fertilization:</strong> Apply organic compost or well-rotted manure annually 
                    around the drip line (the area under the outermost branches).
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Health Check */}
        <div className="bg-card rounded-2xl border border-border/60 shadow-soft p-8 mb-12">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
            containerClassName="mb-6"
            textClassName="font-display text-2xl font-medium text-foreground"
            as="h3"
          >
            Health Check
          </ScrollReveal>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-healthy" />
                <ScrollReveal
                  baseOpacity={0}
                  enableBlur={true}
                  baseRotation={5}
                  blurStrength={10}
                  containerClassName=""
                  textClassName="font-display text-lg font-medium text-foreground"
                  as="h4"
                >
                  Healthy Signs
                </ScrollReveal>
              </div>
              <ul className="space-y-2 ml-7">
                {[
                  'Vibrant green leaves with no yellowing or browning',
                  'Steady growth of new branches and leaves',
                  'Firm, healthy bark without cracks or lesions',
                  'Active flowering and fruiting during season',
                  'No signs of pest infestation',
                ].map((sign, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-healthy mt-2 flex-shrink-0" />
                    <span className="font-body text-foreground">{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-warning" />
                <ScrollReveal
                  baseOpacity={0}
                  enableBlur={true}
                  baseRotation={5}
                  blurStrength={10}
                  containerClassName=""
                  textClassName="font-display text-lg font-medium text-foreground"
                  as="h4"
                >
                  Common Issues
                </ScrollReveal>
              </div>
              <div className="space-y-4 ml-7">
                <div className="p-4 rounded-xl bg-muted/50 border-l-4 border-warning">
                  <p className="font-body font-medium text-foreground mb-1">
                    Problem: Yellowing leaves
                  </p>
                  <p className="font-body text-sm text-muted-foreground mb-2">
                    Reason: Overwatering or poor drainage
                  </p>
                  <p className="font-body text-sm text-foreground">
                    Solution: Reduce watering frequency and ensure soil drains well. Check for root rot.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-muted/50 border-l-4 border-warning">
                  <p className="font-body font-medium text-foreground mb-1">
                    Problem: Stunted growth
                  </p>
                  <p className="font-body text-sm text-muted-foreground mb-2">
                    Reason: Insufficient sunlight or nutrients
                  </p>
                  <p className="font-body text-sm text-foreground">
                    Solution: Ensure the tree receives at least 6 hours of direct sunlight daily. 
                    Apply organic fertilizer if growth remains slow.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-muted/50 border-l-4 border-warning">
                  <p className="font-body font-medium text-foreground mb-1">
                    Problem: Leaf drop during dry season
                  </p>
                  <p className="font-body text-sm text-muted-foreground mb-2">
                    Reason: Natural response to drought stress
                  </p>
                  <p className="font-body text-sm text-foreground">
                    Solution: Increase watering frequency. This is often normal for neem trees, 
                    but consistent moisture helps maintain foliage.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="mb-2"
                textClassName="font-display text-lg font-medium text-foreground"
                as="h4"
              >
                Establishment Period
              </ScrollReveal>
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName=""
                textClassName="font-body text-foreground leading-relaxed"
                as="p"
              >
                Neem trees typically take 3-5 years to fully establish. During this time, 
                consistent care and monitoring are essential. Once established, they become 
                remarkably resilient and require minimal intervention.
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Closing Note */}
        <div className="text-center bg-card rounded-2xl border border-border/60 shadow-soft p-8">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
            containerClassName="mb-4"
            textClassName="font-display text-xl font-medium text-foreground"
            as="p"
          >
            A Living Commitment
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
            containerClassName="max-w-2xl mx-auto"
            textClassName="font-body text-foreground leading-relaxed"
            as="p"
          >
            Planting a tree is not just an act—it's a promise to care for a living being. 
            Each tree you plant becomes part of a larger story of stewardship and responsibility. 
            Take time to observe, learn, and respond to your tree's needs. This is how we honor 
            the life we've chosen to nurture.
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Guide;
