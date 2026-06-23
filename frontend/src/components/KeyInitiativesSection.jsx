import React from 'react';
import { TrendingUp, Landmark, Globe, GraduationCap } from 'lucide-react';
import MotionWrapper from './common/MotionWrapper';
import SectionHeader from './common/SectionHeader';

const initiatives = [
  {
    title: 'Business Development',
    description: 'Empowering entrepreneurs and local businesses through mentorship and capital access.',
    icon: TrendingUp,
    image: '/ini1.png'
  },
  {
    title: 'Civil Service',
    description: 'Supporting aspirants in administrative careers and public leadership roles.',
    icon: Landmark,
    image: '/ini2.png'
  },
  {
    title: 'Global Network',
    description: 'Connecting Sathwara members worldwide to share cultural values and opportunities.',
    icon: Globe,
    image: '/ini3.png'
  },
  {
    title: 'Youth Org',
    description: 'Developing future leaders through skill workshops and education grants.',
    icon: GraduationCap,
    image: '/ini4.png'
  }
];

const KeyInitiativesSection = () => {
  return (
    <section className="w-full bg-white font-sans py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
       <MotionWrapper className='flex flex-col items-center text-center'>
          <SectionHeader
            title={<>Key <span className="text-[#FFC107]">Initiatives</span></>}
            subtitle="We focus on the core pillars that drive real progress for our community members worldwide."
            className="mb-8 flex flex-col items-center"
          />
        </MotionWrapper>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {initiatives.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Top Image Part */}
                <div className="relative h-60 w-full overflow-hidden bg-[#001348]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"
                  />
                  {/* Icon at Bottom Left of Image */}
                  <div className="absolute bottom-4 left-4 z-20">
                    <Icon className="w-6 h-6 text-[#FFC107]" strokeWidth={2.5} />
                  </div>
                  {/* Subtle Gradient Overlay for Icon Visibility */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#001348] to-transparent pointer-events-none z-10"></div>
                </div>

                {/* Bottom Text Part */}
                <div className="flex flex-col p-6 bg-white flex-1 relative z-20">
                  <h3 className="text-lg font-extrabold text-[#0A1435] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default KeyInitiativesSection;
