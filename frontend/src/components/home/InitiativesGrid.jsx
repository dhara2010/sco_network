import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const initiatives = [
  { id: 1, title: 'Business Network', description: 'Fostering B2B connections and economic growth within the community.', icon: '🏢' },
  { id: 2, title: 'Youth Empowerment', description: 'Providing scholarships, mentoring, and skill development for youth.', icon: '🎓' },
  { id: 3, title: 'Women Wing', description: 'Empowering women entrepreneurs and leaders across sectors.', icon: '👩‍💼' },
  { id: 4, title: 'Global Chapters', description: 'Connecting members worldwide through local regional chapters.', icon: '🌍' },
];

const InitiativesGrid = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-sco-navy)] uppercase mb-4">Our Key <span className="text-[var(--color-sco-gold)]">Initiatives</span></h2>
          <div className="w-24 h-1 bg-[var(--color-sco-navy)] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {initiatives.map((init, index) => (
            <motion.div
              key={init.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border-b-4 border-transparent hover:border-[var(--color-sco-gold)] group"
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {init.icon}
              </div>
              <h3 className="text-xl font-bold text-[var(--color-sco-navy)] mb-4">{init.title}</h3>
              <p className="text-gray-600 mb-6 line-clamp-3">
                {init.description}
              </p>
              <Link to="/projects" className="text-[var(--color-sco-gold)] font-bold hover:text-[var(--color-sco-navy)] flex items-center transition-colors">
                Learn More 
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InitiativesGrid;
