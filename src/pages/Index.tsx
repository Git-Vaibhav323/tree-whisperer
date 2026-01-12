import React from 'react';
import FloatingLeaves from '@/components/FloatingLeaves';
import Hero from '@/components/Hero';
import ImpactStats from '@/components/ImpactStats';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <FloatingLeaves />
      
      <Hero />
      
      <ImpactStats />
      
      <Footer />
    </div>
  );
};

export default Index;
