import React from 'react';
import HomeHero from '../components/home/HomeHero';
import AboutIntro from '../components/home/AboutIntro';
import StatsGrid from '../components/home/StatsGrid';
import InitiativesGrid from '../components/home/InitiativesGrid';
import LatestNews from '../components/home/LatestNews';

const HomePage = () => {
  return (
    <div className="bg-white">
      <HomeHero />
      <AboutIntro />
      <StatsGrid />
      <InitiativesGrid />
      <LatestNews />
    </div>
  );
};

export default HomePage;
