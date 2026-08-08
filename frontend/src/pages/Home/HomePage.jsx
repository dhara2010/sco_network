import React from 'react';
import HeroSection from '../../components/sections/HeroSection';
import IdeologySection from '../../components/sections/ideologySection';
import AboutSection from '../../components/sections/AboutSection';
import KeyInitiativesSection from '../../components/sections/KeyInitiativesSection';
import ProjectSection from '../../components/sections/ProjectSection';
import ChapterSection from '../../components/sections/ChapterSection';
import MemberSection from '../../components/sections/MemberSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <IdeologySection />
      <ChapterSection />
      <MemberSection />
      <ProjectSection />
      <KeyInitiativesSection />
    </>
  );
};

export default HomePage;
