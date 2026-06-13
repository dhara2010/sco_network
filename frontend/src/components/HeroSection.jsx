import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion } from 'framer-motion';

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
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* 10-column grid for 7:3 ratio */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-stretch">

          {/* Left Side: Scrollable Image Carousel (7 parts) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 relative h-[400px] md:h-[450px] w-full overflow-hidden rounded-3xl shadow-2xl group bg-gray-200"
          >
            {/* Image Slider Container */}
            <div
              className="flex h-full w-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((img, index) => (
                <div key={index} className="h-full w-full flex-shrink-0">
                  <img
                    src={img}
                    alt={`Slide ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Overlay Gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none z-10" />

            {/* Text Content */}
            <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white z-20 w-full">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold drop-shadow-md">
                Empowering Global Trade Excellence
              </h2>
            </div>

            {/* Navigation Arrows (visible on hover) */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>

          {/* Right Side: Map Image (3 parts) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-3 flex flex-col items-center justify-start rounded-3xl bg-white shadow-xl p-4 relative overflow-hidden border border-gray-100 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
            onClick={() => setIsModalOpen(true)}
            title="Click to enlarge map"
          >
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 mt-1">SCO Network Zones</h3>

            <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden">
              {/* Using an error handler to show a placeholder if map.jpg doesn't exist yet */}
              <img
                src="/map.jpg"
                alt="India Map with Regions"
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            </div>

            {/* Click icon overlay */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none rounded-2xl">
              <div className="bg-white/80 backdrop-blur-sm text-gray-800 text-xs font-bold py-2 px-4 rounded-full shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 mt-8">
                Click to Enlarge
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Fullscreen Map Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 md:p-6" onClick={() => setIsModalOpen(false)}>
          {/* Floating Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Close modal"
          >
            <X className="h-8 w-8 md:h-10 md:w-10" strokeWidth={1.5} />
          </button>

          {/* Modal Image */}
          <img
            src="/map.jpg"
            alt="Enlarged India Map"
            className="w-full h-full max-w-[98vw] max-h-[98vh] object-contain cursor-default select-none"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default HeroSection;
