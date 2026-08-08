import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ArrowRight, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import GujaratMap from './GujaratMap';

const images = [
  '/img1.png',
  '/img2.png',
  '/img3.png',
  '/img4.png',
  '/img5.png',
  '/img6.png',
  '/img7.png',
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // 6 seconds for a slower, more premium transition
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <section className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#0A1435]">
      
      {/* Background Image Slider with Crossfade */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Hero Background ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* Premium Overlay: Darker at bottom, slight vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071B4D]/90 via-[#071B4D]/60 to-[#071B4D]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1435] via-transparent to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        
        {/* Left: Typography & CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-3/5 text-center lg:text-left pt-10 lg:pt-0"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FFC107] text-xs font-bold tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FFC107] animate-pulse"></span>
            GLOBAL SATHWARA NETWORK
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-6 drop-shadow-lg">
            Empowering Global <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC107] to-[#FFA000]">Trade Excellence</span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light">
            Dedicated to the growth and prosperity of the Sathwara community worldwide. Building excellence through unity, leadership, and professional networking.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link to="/become-member" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FFC107] text-[#071B4D] font-bold text-sm hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(255,193,7,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] flex items-center justify-center gap-2 group">
              Become a Member <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2">
              Explore Network
            </Link>
          </div>
        </motion.div>

        {/* Right: Glassmorphism Map Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full lg:w-2/5 max-w-md mx-auto relative group cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-white/20 to-white/0 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
          <div className="relative bg-[#071B4D]/40 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6 shadow-2xl overflow-hidden group-hover:-translate-y-2 transition-transform duration-500">
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <MapPin className="text-[#FFC107]" size={20} />
                Gujarat Chapters
              </h3>
              <div className="text-xs text-gray-300 bg-white/10 px-2 py-1 rounded-full">Interactive</div>
            </div>
            
            <div className="relative w-full h-[280px] flex items-center justify-center rounded-xl bg-white/5 overflow-hidden border border-white/10">
              {/* Scale down the map slightly to fit the premium card */}
              <div className="transform scale-90 w-full h-full flex items-center justify-center pointer-events-none">
                <GujaratMap />
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#071B4D]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <div className="bg-[#FFC107] text-[#071B4D] text-sm font-bold py-2.5 px-6 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                  Enlarge Map <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Slider Controls (Subtle) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-8">
        <button onClick={goToPrevious} className="text-white/50 hover:text-white transition-colors p-2">
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
        <div className="flex gap-2">
          {images.map((_, idx) => (
            <div key={idx} className={`h-1 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-8 bg-[#FFC107]' : 'w-2 bg-white/30'}`} />
          ))}
        </div>
        <button onClick={goToNext} className="text-white/50 hover:text-white transition-colors p-2">
          <ChevronRight size={24} strokeWidth={1.5} />
        </button>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-4 right-8 z-20 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/50 tracking-[0.2em] rotate-90 origin-right translate-y-6">SCROLL</span>
        <div className="w-[1px] h-12 bg-white/20 mt-8 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48] }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-1/2 bg-[#FFC107] absolute top-0"
          />
        </div>
      </motion.div>

      {/* Fullscreen Map Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071B4D]/90 backdrop-blur-xl p-4 md:p-8" 
            onClick={() => setIsModalOpen(false)}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] p-3 rounded-full bg-white/10 hover:bg-[#FFC107] hover:text-[#071B4D] transition-colors text-white"
            >
              <X className="h-6 w-6" strokeWidth={2} />
            </button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full h-full max-w-6xl max-h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl relative flex items-center justify-center p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <GujaratMap />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
