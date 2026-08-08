import React from 'react';
import HeroSection from '../../components/sections/HeroSection';
import ImpactSection from '../../components/sections/ImpactSection';
import AboutSection from '../../components/sections/AboutSection';
import KeyInitiativesSection from '../../components/sections/KeyInitiativesSection';
import ChapterSection from '../../components/sections/ChapterSection';
import MemberSection from '../../components/sections/MemberSection';
import NetworkDirectorySection from '../../components/sections/NetworkDirectorySection';
import ProjectSection from '../../components/sections/ProjectSection';
import EventsSection from '../../components/sections/EventsSection';
import JourneySection from '../../components/sections/JourneySection';
import GallerySection from '../../components/sections/GallerySection';
import TestimonialSection from '../../components/sections/TestimonialSection';
import SponsorSection from '../../components/sections/SponsorSection';
import CTASection from '../../components/sections/CTASection';
import IdeologySection from '../../components/sections/ideologySection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ImpactSection />
      <AboutSection />
      <IdeologySection />
      <KeyInitiativesSection />
      <ChapterSection />
      <MemberSection />
      <NetworkDirectorySection />
      <ProjectSection />
      <EventsSection />
      <JourneySection />
      <GallerySection />
      <TestimonialSection />
      <SponsorSection />
      <CTASection />
    </>
  );
};

export default HomePage;
