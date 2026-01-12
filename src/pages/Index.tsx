import React, { useState, useRef } from 'react';
import FloatingLeaves from '@/components/FloatingLeaves';
import Hero from '@/components/Hero';
import LivingForest from '@/components/LivingForest';
import TreeDetail from '@/components/TreeDetail';
import ImpactStats from '@/components/ImpactStats';
import Footer from '@/components/Footer';

const Index = () => {
  const [selectedTreeId, setSelectedTreeId] = useState<string | null>(null);
  const forestRef = useRef<HTMLDivElement>(null);

  const handleExplore = () => {
    forestRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectTree = (id: string) => {
    setSelectedTreeId(id);
  };

  const handleCloseDetail = () => {
    setSelectedTreeId(null);
  };

  return (
    <div className="min-h-screen relative">
      <FloatingLeaves />
      
      <Hero onExplore={handleExplore} />
      
      <div ref={forestRef}>
        <LivingForest onSelectTree={handleSelectTree} />
      </div>
      
      <ImpactStats />
      
      <Footer />

      <TreeDetail
        isOpen={selectedTreeId !== null}
        onClose={handleCloseDetail}
      />
    </div>
  );
};

export default Index;
