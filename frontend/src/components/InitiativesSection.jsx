import React from 'react';
import { TrendingUp, GraduationCap, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const initiatives = [
  {
    title: 'Business Development Initiative',
    description: 'Supporting Sathwara entrepreneurs, networking, and fostering sustainable business growth within our community.',
    icon: TrendingUp,
  },
  {
    title: 'Civil Service Training Center',
    description: 'Helping students prepare for government exams and empowering them to take on leadership roles.',
    icon: GraduationCap,
  },
  {
    title: 'Global Sathwara Business Network',
    description: 'Connecting Sathwara business leaders globally and promoting international collaboration and trade.',
    icon: Globe,
  },
  {
    title: 'Sathwara Youth Organisation',
    description: 'Empowering youth through focused education, leadership training, and active community involvement.',
    icon: Users,
  },
];

const InitiativesSection = () => {
  return (
    <section className="w-full font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A1435] mb-4">
            Our Key Initiatives
          </h2>
          {/* Small yellow underline */}
          <div className="w-16 h-1.5 bg-[#FFC107] rounded-full mb-6"></div>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Empowering the Sathwara community through dedicated support, networking, and educational programs.
          </p>
        </div>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {initiatives.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 flex flex-col items-center text-center hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon Circle */}
                <div className="w-16 h-16 rounded-full bg-[#FFC107] flex items-center justify-center mb-6 shadow-sm">
                  <Icon className="w-7 h-7 text-[#0A1435]" strokeWidth={2.5} />
                </div>

                {/* Card Title */}
                <h3 className="text-lg font-bold text-[#0A1435] mb-4 min-h-[56px] flex items-center justify-center">
                  {item.title}
                </h3>

                {/* Card Description */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Button */}
        <div className="flex justify-center mt-12">
          <Link to="/projects" className="px-8 py-3.5 bg-[#0A1435] text-white font-semibold rounded-lg shadow-lg shadow-blue-900/20 hover:bg-[#112255] hover:shadow-blue-900/30 transition-all duration-300">
            Learn More About Us
          </Link>
        </div>

      </div>
    </section>
  );
};

export default InitiativesSection;
