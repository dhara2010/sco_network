import React from 'react';
import HeroSection from '../components/HeroSection';
import CommunitySection from '../components/CommunitySection';
import InitiativesSection from '../components/InitiativesSection';
import AboutSection from '../components/AboutSection';
import KeyInitiativesSection from '../components/KeyInitiativesSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <CommunitySection />
      <InitiativesSection />
      <AboutSection />
      <KeyInitiativesSection />
    </>
  );
};

export default HomePage;
