import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Calendar } from "lucide-react";
import { getProjects } from '../../api/projects.api';

const generateSlug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data.slice(0, 4)); // Get up to 4 projects
      } catch (err) {
        console.error('Failed to fetch projects', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4f7f9] text-[#1056A5] text-xs font-bold tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FFC107]"></span>
              IMPACT & INITIATIVES
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1056A5] to-[#1a73e8]">Projects</span>
            </h2>
            <p className="mt-4 max-w-xl">
              Contributing to meaningful community initiatives through quality construction, infrastructure development, and social impact projects.
            </p>
          </div>
          <Link to="/projects" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A1435] text-white rounded-full font-bold hover:bg-[#1056A5] transition-colors shadow-lg hover:shadow-xl group shrink-0">
            View All Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1056A5]"></div>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Featured Project (Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <Link to={`/projects/${generateSlug(projects[0].title)}`} className="block group h-full">
                <div className="relative h-[400px] lg:h-full min-h-[500px] rounded-[2rem] overflow-hidden">
                  <img
                    src={projects[0].featuredImage || (projects[0].gallery && projects[0].gallery[0]) || "./project.jpg"}
                    alt={projects[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle vignette for typography */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1435]/90 via-[#0A1435]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 -translate-y-4 translate-x-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500">
                    <ArrowUpRight size={20} strokeWidth={2.5} />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFC107] text-xs font-bold tracking-widest uppercase rounded-sm mb-4">
                      Featured Project
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3 group-hover:text-[#FFC107] transition-colors">
                      {projects[0].title}
                    </h3>
                    {projects[0].subtitle && (
                      <p className="text-base md:text-lg line-clamp-2 max-w-2xl font-light">
                        {projects[0].subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Supporting Projects (Right) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {projects.slice(1).map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link 
                    to={`/projects/${generateSlug(project.title)}`}
                    className="flex flex-row items-center gap-6 group bg-[#f8f9fa] rounded-2xl p-4 border border-gray-100 hover:border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shrink-0 relative">
                      <img
                        src={project.featuredImage || (project.gallery && project.gallery[0]) || "./project.jpg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-[#0A1435]/0 group-hover:bg-[#0A1435]/20 transition-colors duration-300"></div>
                    </div>
                    
                    <div className="flex-1 py-2 pr-2">
                      <h3 className="text-lg md:text-xl font-bold leading-snug mb-2 group-hover:text-[#1056A5] transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      {project.subtitle && (
                        <p className="text-sm line-clamp-2 mb-3">
                          {project.subtitle}
                        </p>
                      )}
                      
                      <div className="flex items-center text-xs font-bold text-[#1056A5] uppercase tracking-wider group-hover:text-[#FFC107] transition-colors">
                        Read Story <ArrowRight size={14} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
              
              {projects.length === 1 && (
                <div className="h-full flex flex-col items-center justify-center bg-[#f8f9fa] rounded-2xl border border-gray-100 border-dashed p-8 text-center">
                  <p className="font-medium">More projects coming soon.</p>
                </div>
              )}
            </div>
            
          </div>
        ) : (
          <div className="text-center py-20 bg-[#f8f9fa] rounded-[2rem]">
            <p className="text-lg">No projects available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
