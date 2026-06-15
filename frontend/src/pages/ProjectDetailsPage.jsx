import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Calendar, ArrowLeft, Folder, Image as ImageIcon, Sparkles, ChevronRight, Share2 } from 'lucide-react';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Parallax effect for the hero image
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/projects/public/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load project details');
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-12 h-12 border-4 border-[#1056A5] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA]">
        <div className="text-red-500 font-bold mb-4 bg-red-50 px-6 py-3 rounded-xl border border-red-100">Error: {error || 'Project not found'}</div>
        <Link to="/projects" className="text-[#1056A5] font-bold hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] selection:bg-[#fdb813] selection:text-[#0B2B5B] font-sans overflow-hidden">
      
      {/* Dynamic Parallax Hero */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-[#0B2B5B]">
        <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
          {project.featuredImage ? (
            <img src={project.featuredImage} alt={project.title} className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
          ) : (
             <div className="w-full h-full bg-gradient-to-br from-[#1056A5] to-[#0a3d7a] flex items-center justify-center">
               <Folder size={120} className="text-white/10" />
             </div>
          )}
        </motion.div>
        
        {/* Soft bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F8F9FA] to-transparent pointer-events-none"></div>
        
        {/* Navigation & Breadcrumb */}
        <div className="absolute top-8 left-0 w-full z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Link to="/projects" className="group flex items-center gap-2 text-white/90 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-lg">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-semibold tracking-wide">Back to Projects</span>
            </Link>
            
            <button className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/20 transition-colors shadow-lg">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Overlapping Content Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 md:-mt-48 pb-24">
        
        {/* Glassmorphic Title Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/70 backdrop-blur-xl border border-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-14 relative overflow-hidden"
        >
          {/* Decorative blur orb */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-[#fdb813]/20 to-[#1056A5]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-wrap items-center gap-3 mb-6 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#1056A5]/10 text-[#1056A5] font-bold text-xs uppercase tracking-widest rounded-full">
              <Sparkles size={14} /> {project.category}
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-green-50 text-green-600 font-bold text-xs uppercase tracking-widest rounded-full border border-green-100">
              Active Initiative
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B2B5B] leading-[1.15] mb-8 relative z-10 tracking-tight">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-gray-600 relative z-10 border-t border-gray-200/60 pt-8">
            {project.location && (
              <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-xl shadow-sm border border-gray-100">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <MapPin size={16} className="text-[#1056A5]" />
                </div>
                <span className="text-gray-800">{project.location}</span>
              </div>
            )}
            {project.startDate && (
              <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-xl shadow-sm border border-gray-100">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                  <Calendar size={16} className="text-[#fdb813]" />
                </div>
                <span className="text-gray-800">
                  {new Date(project.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} 
                  {project.endDate ? ` — ${new Date(project.endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}` : ' — Present'}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Details & Gallery Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Description */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8 bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 md:p-12 relative overflow-hidden"
          >
            <h2 className="text-2xl font-bold text-[#0B2B5B] mb-6 flex items-center gap-3">
               Project Overview
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 leading-loose">
              <p className="text-[16px] md:text-[18px] whitespace-pre-wrap font-medium opacity-90">{project.description}</p>
            </div>

            <div className="mt-12 p-8 bg-gradient-to-br from-[#fefaf0] to-white rounded-2xl border border-[#fef5d9] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#fdb813]/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
               <h3 className="text-xl font-extrabold text-[#0B2B5B] mb-2 relative z-10">Want to get involved?</h3>
               <p className="text-gray-600 text-[15px] mb-6 relative z-10 font-medium">Join hands with us to make this initiative even more impactful.</p>
               <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0B2B5B] text-white font-bold text-[15px] rounded-xl hover:bg-[#1056A5] transition-colors relative z-10 shadow-lg shadow-blue-900/20">
                 Partner With Us <ChevronRight size={18} />
               </Link>
            </div>
          </motion.div>

          {/* Side Gallery / Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-4 space-y-8"
          >
            {/* Gallery Mini Widget */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8">
                <h2 className="text-lg font-bold text-[#0B2B5B] mb-6 flex items-center gap-2">
                  <ImageIcon size={20} className="text-[#1056A5]" /> Project Gallery
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {project.gallery.slice(0, 4).map((imgUrl, idx) => (
                    <div key={idx} className={`rounded-2xl overflow-hidden shadow-sm cursor-pointer group ${idx === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}>
                      <img 
                        src={imgUrl} 
                        alt={`Gallery ${idx + 1}`} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                    </div>
                  ))}
                </div>
                {project.gallery.length > 4 && (
                  <button className="w-full mt-4 py-3 rounded-xl bg-gray-50 text-[#0B2B5B] font-bold text-sm hover:bg-gray-100 transition-colors border border-gray-200">
                    View All {project.gallery.length} Photos
                  </button>
                )}
              </div>
            )}

            {/* Quick Stats / Highlights block */}
            <div className="bg-[#1056A5] text-white rounded-[32px] shadow-xl shadow-blue-900/10 p-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
               <h3 className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-6">Impact Highlights</h3>
               
               <div className="space-y-6">
                 <div>
                   <div className="text-3xl font-extrabold text-white mb-1">Global</div>
                   <div className="text-blue-100 text-[13px] font-semibold">Reach & Community</div>
                 </div>
                 <div className="w-full h-px bg-white/10"></div>
                 <div>
                   <div className="text-3xl font-extrabold text-[#fdb813] mb-1">100%</div>
                   <div className="text-blue-100 text-[13px] font-semibold">Commitment to Growth</div>
                 </div>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
