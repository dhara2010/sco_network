import * as Icons from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Building, Users, Calendar, MapPin, Factory } from 'lucide-react';
import { getProjects } from '../../api/projects.api';

const generateSlug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data); // The backend /public endpoint already returns only Approved projects
      } catch (err) {
        setError(err.message || 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-white pb-16 mt-14">
      {/* Hero Section */}
      <div className="bg-[#1056A5] text-white py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#0a3d7a] opacity-50 transform -skew-x-12 scale-150 origin-bottom-right pointer-events-none"></div>

        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-[46px] font-extrabold mb-5 tracking-tight"
          >
            Our Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-[16px] md:text-[18px] opacity-90 mb-10 leading-relaxed font-light"
          >
            Discover the impactful initiatives and community-driven projects led by SCO across the globe.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">

        <div className="mb-10">
          <h2 className="text-[26px] font-extrabold text-[#0B2B5B]">Project Showcase</h2>
          <p className="text-gray-500 text-sm mt-1">Explore our latest successful and ongoing projects.</p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {loading ? (
            <div className="col-span-full text-center py-20 text-[#0B2B5B] font-bold">Loading projects...</div>
          ) : error ? (
            <div className="col-span-full text-center py-20 text-red-600 font-bold">Error: {error}</div>
          ) : projects.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-500 font-medium bg-gray-50 rounded-2xl border border-gray-100">No projects currently available to display.</div>
          ) : (
            projects.map((project) => {
              const IconComponent = Icons[project.icon] || Icons.Folder;
              return (
                <div key={project._id} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full cursor-pointer">
                  <Link to={`/projects/${generateSlug(project.title)}`} className="flex flex-col h-full">
                    <div className="bg-[#E8E6E2] h-40 flex items-center justify-center p-6 relative">
                      <div className="w-16 h-16 bg-white rounded-full border-2 border-[#1056A5] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-md">
                        <IconComponent size={24} className="text-[#1056A5]" />
                      </div>
                    </div>
                    
                    <div className="bg-white p-5 flex flex-col flex-grow text-left">
                      <h3 className="text-[15px] font-bold text-[#0B2B5B] leading-tight mb-1 line-clamp-2">
                        {project.title}
                      </h3>
                      
                      {project.subtitle && (
                        <p className="text-[12px] text-gray-500 mb-6">
                          {project.subtitle}
                        </p>
                      )}
                      
                      <div className="mt-auto pt-4 flex items-center text-[#E65100] text-[13px] font-bold gap-1 group-hover:gap-2 transition-all">
                        Learn More <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          )}

        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
