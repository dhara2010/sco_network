import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Folder, MapPin, Calendar, ArrowRight } from 'lucide-react';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/projects/public');
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load projects');
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-white pb-16">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {loading ? (
             <div className="col-span-full text-center py-20 text-[#0B2B5B] font-bold">Loading projects...</div>
          ) : error ? (
             <div className="col-span-full text-center py-20 text-red-600 font-bold">Error: {error}</div>
          ) : projects.length === 0 ? (
             <div className="col-span-full text-center py-20 text-gray-500 font-medium bg-gray-50 rounded-2xl border border-gray-100">No projects currently available to display.</div>
          ) : (
            projects.map((project) => (
              <div key={project._id} className="bg-white rounded-[20px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300 group">
                
                {/* Image Placeholder or Actual Image */}
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  {project.featuredImage ? (
                    <img src={project.featuredImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-[#1056A5] to-[#fdb813] opacity-80 flex items-center justify-center">
                       <Folder size={48} className="text-white opacity-50" />
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-[#0B2B5B] leading-snug mb-3 line-clamp-2">{project.title}</h3>
                  <p className="text-[14px] text-gray-600 mb-6 line-clamp-3 flex-grow">{project.description}</p>
                  
                  <div className="space-y-2 mt-auto pt-4 border-t border-gray-100">
                    {project.location && (
                      <div className="flex items-center text-[13px] text-gray-500 font-medium gap-2">
                        <MapPin size={16} className="text-[#1056A5]" />
                        {project.location}
                      </div>
                    )}
                    {project.startDate && (
                      <div className="flex items-center text-[13px] text-gray-500 font-medium gap-2">
                        <Calendar size={16} className="text-[#1056A5]" />
                        {new Date(project.startDate).toLocaleDateString()} 
                        {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString()}`}
                      </div>
                    )}
                  </div>
                  
                  <Link to={`/projects/${project._id}`} className="mt-6 w-full py-2.5 rounded-xl bg-[#F8F9FA] text-[#0B2B5B] font-bold text-[14px] hover:bg-[#1056A5] hover:text-white transition-colors border border-gray-100 flex items-center justify-center gap-2">
                    View Details <ArrowRight size={14} />
                  </Link>
                </div>

              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
