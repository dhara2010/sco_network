import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="relative min-h-[calc(100vh-160px)] bg-white flex flex-col items-center justify-center overflow-hidden px-4 py-20">
      
      {/* Subtle Abstract Network/Grid Background Element */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
        <div className="absolute w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] border border-blue-50 rounded-full"></div>
        <div className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] border border-blue-50 rounded-full"></div>
        <div className="absolute w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] border border-blue-50 rounded-full"></div>
        
        {/* Subtle dot grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: 'radial-gradient(#2563eb 1.5px, transparent 1.5px)', 
            backgroundSize: '48px 48px' 
          }}
        />
      </div>

      <div className="relative z-10 text-center flex flex-col items-center">
        {/* 404 Header */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500 leading-none select-none drop-shadow-sm"
          style={{ fontSize: 'clamp(120px, 18vw, 240px)', letterSpacing: '-0.04em' }}
        >
          404
        </motion.h1>
        
        {/* Page Not Found Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-bold mt-2 md:mt-4 tracking-tight"
        >
          PAGE NOT FOUND
        </motion.h2>
        
        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          className="text-lg md:text-xl mt-6 max-w-md mx-auto font-medium"
        >
          Sorry, the page you're looking for doesn't exist or may have been moved.
        </motion.p>
        
        {/* Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
          className="mt-12"
        >
          <Link 
            to="/" 
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 shadow-[0_8px_20px_rgb(37,99,235,0.2)] hover:shadow-[0_12px_25px_rgb(37,99,235,0.35)]"
          >
            <ArrowLeft size={20} className="transition-transform duration-300 group-hover:-translate-x-1" />
            BACK TO HOME
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
