import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, Globe, CalendarDays } from 'lucide-react';
import { getMembers } from '../../api/members.api';
import { getChapters } from '../../api/chapters.api';
import { getProjects } from '../../api/projects.api';
import { getActivities } from '../../api/activities.api';

// A simple animated counter component
const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value, 10);
    if (start === end) return;

    let totalMilSecDur = 2000;
    let incrementTime = (totalMilSecDur / end) * 3; // Make it scale nicely
    if (incrementTime > 50) incrementTime = 50; // Cap speed

    const timer = setInterval(() => {
      start += Math.ceil(end / 40);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <>{count}</>;
};

const ImpactSection = () => {
  const [stats, setStats] = useState({
    members: 0,
    chapters: 0,
    projects: 0,
    events: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Using existing endpoints to calculate scale
        const [membersData, chaptersData, projectsData, eventsData] = await Promise.all([
          getMembers(),
          getChapters(),
          getProjects(),
          getActivities().catch(() => []) // Catch if endpoint fails
        ]);

        setStats({
          members: membersData.filter(m => m.status === 'Approved').length || 0,
          chapters: chaptersData.filter(c => ['Approved', 'Active', 'approved', 'active'].includes(c.status)).length || 0,
          projects: projectsData.length || 0,
          events: eventsData.length || 0
        });
      } catch (err) {
        console.error('Failed to fetch impact stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statItems = [
    { label: 'Global Members', value: stats.members, icon: Users, suffix: '+' },
    { label: 'Active Chapters', value: stats.chapters, icon: Globe, suffix: '' },
    { label: 'Community Projects', value: stats.projects, icon: Building2, suffix: '+' },
    { label: 'Events Hosted', value: stats.events, icon: CalendarDays, suffix: '+' }
  ];

  if (loading) {
    return (
      <section className="w-full bg-[#071B4D] py-12 border-t border-b border-[#0A1435]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-center">
          <div className="animate-pulse flex gap-12">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-32 h-20 bg-white/10 rounded-xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#071B4D] relative z-20 py-16 md:py-20 overflow-hidden">
      {/* Subtle background overlay to blend seamlessly */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl bg-gradient-to-b from-[#071B4D] via-[#0A1D54]/50 to-[#071B4D] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x md:divide-white/5 text-center">

          {statItems.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center px-4 group hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#0A1435] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] border border-white/5 flex items-center justify-center mb-6 group-hover:bg-[#0A1D54] transition-colors duration-500">
                <stat.icon className="w-8 h-8 text-[#FFC107]" />
              </div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-5xl md:text-6xl font-black text-white tracking-tight drop-shadow-md">
                  <AnimatedCounter value={stat.value} />
                </span>
                <span className="text-3xl font-bold text-[#FFC107]">{stat.suffix}</span>
              </div>
              <p className="text-xs md:text-sm text-[#DCE6F5] font-semibold tracking-widest uppercase opacity-90">{stat.label}</p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
