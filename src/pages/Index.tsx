import React from 'react';
import FloatingLeaves from '@/components/FloatingLeaves';
import Hero from '@/components/Hero';
import ImpactStats from '@/components/ImpactStats';
import Footer from '@/components/Footer';
import Particles from '@/components/Particles';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
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

      <div className="relative z-10">
        <FloatingLeaves />
        
        <Hero />
        
        <ImpactStats />
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
