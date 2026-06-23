import React from 'react';
import HeroSection from '../components/HeroSection';
import CommunitySection from '../components/CommunitySection';
import IdeologySection from '../components/ideologySection';
import AboutSection from '../components/AboutSection';
import KeyInitiativesSection from '../components/KeyInitiativesSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <CommunitySection />
      <AboutSection />
      <IdeologySection />
      <KeyInitiativesSection />
    </>
  );
};

export default HomePage;
