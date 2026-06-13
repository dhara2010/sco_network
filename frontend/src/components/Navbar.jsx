import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, LogIn, ChevronDown, Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAbout = location.pathname === '/about';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  const handleTranslate = (langCode) => {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }
    setCurrentLang(langCode === 'en' ? 'EN' : 'GU');
    setIsLangDropdownOpen(false);
  };

  return (
    <header className="w-full font-sans shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="w-full border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm text-gray-500">
          {/* Left Side: App Links */}
          <div className="hidden sm:flex items-center space-x-6">
            <a href="#" onClick={(e) => { e.preventDefault(); alert('App Store coming soon!'); }} className="flex items-center hover:text-gray-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 384 512" fill="currentColor">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 24 184.8 8.8 238c-30.8 108.4 56.6 252.8 114.8 252.8 28 0 44-14 83-14 39 0 53 14 83 14 55.4 0 136-121.2 136-121.2-39.7-18.1-73.4-56.7-76.9-100.9zM252 83.2C278.4 51.6 280 24 280 24c-28.5 2-50.8 15.2-64 32-12.8 16.5-26 43.5-26 69.5 28.5 1.5 50.8-12 62-42.3z" />
              </svg>
              AppStore
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Google Play coming soon!'); }} className="flex items-center hover:text-gray-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 512 512" fill="currentColor">
                <path d="M325.3 234.3L104.6 13.6C111.8 6.5 122.9 2 136.3 2c19.1 0 37.8 10 52 26.2l230 188.7c-25-10.3-56.3-11.4-93-1.4zM24.8 45.4C14.7 57 8 74.2 8 96v320c0 21.8 6.7 39 16.8 50.6L201.7 289.8 24.8 45.4zM136.3 510c-13.4 0-24.5-4.5-31.7-11.6L325.3 277.7c36.7 10 68 8.9 93-1.4L188.3 483.8c-14.2 16.2-32.9 26.2-52 26.2zm292.8-199c27-14.8 44.9-34.8 44.9-55s-18-40.2-45-55c-15.6-8.6-34-14-53.9-16.1l-61.9 61.3c21.8 13.9 44.6 31 63.8 50.7-19.2 19.7-42 36.8-63.8 50.7l61.9 61.3c20-.2 38.3-5.6 54-14.2z" />
              </svg>
              Google Play
            </a>
          </div>

          {/* Right Side: Auth Buttons & Language */}
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center space-x-1 hover:text-gray-800 transition-colors py-2 px-1"
              >
                <Globe className="w-4 h-4" />
                <span className="font-semibold text-xs uppercase">{currentLang}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50"
                  >
                    <button 
                      onClick={() => handleTranslate('en')}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors ${currentLang === 'EN' ? 'font-bold text-[#115fc6]' : 'text-gray-700'}`}
                    >
                      English (EN)
                    </button>
                    <button 
                      onClick={() => handleTranslate('gu')}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors border-t border-gray-100 ${currentLang === 'GU' ? 'font-bold text-[#115fc6]' : 'text-gray-700'}`}
                    >
                      ગુજરાતી (GU)
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/become-member" className="flex items-center rounded-full bg-[#E2E0D8] px-4 py-2 text-xs font-bold text-[#0B132C] hover:bg-[#d1cfc7] transition-colors">
              <User className="mr-2 h-4 w-4" strokeWidth={2.5} />
              BECOME A MEMBER
            </Link>
            <Link to="/login" className="hidden md:flex items-center rounded-full bg-[#18233b] px-6 py-2 text-xs font-bold text-white hover:bg-[#0f172a] transition-colors">
              <LogIn className="mr-2 h-4 w-4" strokeWidth={2.5} />
              LOGIN
            </Link>
          </div>
        </div>
      </div>

      {/* Middle Bar: Logo & Mobile Toggle */}
      <div className="flex justify-between items-center bg-white py-4 px-4 md:justify-center relative">
        <Link to="/">
          <img src="/logo.png" alt="SCO Network Logo" className="h-[70px] md:h-[90px] w-auto object-contain" />
        </Link>
        
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[#0A1435] p-2 focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Bottom Bar: Desktop Navigation */}
      <div className="hidden md:block w-full bg-[#0A1435] px-4 py-1 relative shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
        <nav className="mx-auto flex max-w-7xl items-center justify-center space-x-1 sm:space-x-4 md:space-x-8 text-xs font-semibold tracking-wider text-white">
          <Link to="/" className={`py-3 relative transition-colors ${isHome ? 'text-[#fdb813]' : 'hover:text-[#fdb813]'} after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#fdb813] after:transition-all after:duration-300`}>
            HOME
          </Link>
          <Link to="/about" className={`py-3 relative transition-colors ${isAbout ? 'text-[#fdb813]' : 'hover:text-[#fdb813]'} after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#fdb813] after:transition-all after:duration-300`}>
            ABOUT US
          </Link>
          <Link to="/projects" className={`py-3 relative transition-colors ${location.pathname === '/projects' ? 'text-[#fdb813]' : 'hover:text-[#fdb813]'} after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#fdb813] after:transition-all after:duration-300`}>
            PROJECTS
          </Link>
          <div onClick={() => alert('Chapters coming soon!')} className="group relative flex cursor-pointer items-center py-3 hover:text-[#fdb813] transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#fdb813] after:transition-all after:duration-300">
            <span>CHAPTERS</span>
          </div>

          <Link to="/committee" className={`py-3 relative flex items-center transition-colors ${location.pathname === '/committee' ? 'text-[#fdb813]' : 'hover:text-[#fdb813]'} after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#fdb813] after:transition-all after:duration-300`}>
            COMMITTEE MEMBERS
          </Link>

          <Link to="/annual-reports" className={`py-3 relative flex items-center transition-colors ${location.pathname === '/annual-reports' ? 'text-[#fdb813]' : 'hover:text-[#fdb813]'} after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#fdb813] after:transition-all after:duration-300`}>
            ANNUAL REPORTS
          </Link>

          <Link to="/contact" className={`py-3 relative transition-colors ${location.pathname === '/contact' ? 'text-[#fdb813]' : 'hover:text-[#fdb813]'} after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#fdb813] after:transition-all after:duration-300`}>
            CONTACT US
          </Link>
          <Link to="/voice-of-sco" className={`py-3 relative transition-colors ${location.pathname === '/voice-of-sco' ? 'text-[#fdb813]' : 'hover:text-[#fdb813]'} after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#fdb813] after:transition-all after:duration-300`}>
            VOICE OF SCO
          </Link>

          <div onClick={() => alert('Downloads coming soon!')} className="group relative flex cursor-pointer items-center py-3 hover:text-[#fdb813] transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#fdb813] after:transition-all after:duration-300">
            <span>DOWNLOAD</span>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A1435] border-t border-[#1a2b4c] overflow-hidden shadow-xl absolute w-full"
          >
            <nav className="flex flex-col text-sm font-semibold tracking-wider text-white px-6 py-4 space-y-4">
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className={`pb-2 border-b border-[#1a2b4c] ${isHome ? 'text-[#fdb813]' : 'hover:text-[#fdb813]'}`}>
                HOME
              </Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/about" className={`pb-2 border-b border-[#1a2b4c] ${isAbout ? 'text-[#fdb813]' : 'hover:text-[#fdb813]'}`}>
                ABOUT US
              </Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/projects" className={`pb-2 border-b border-[#1a2b4c] ${location.pathname === '/projects' ? 'text-[#fdb813]' : 'hover:text-[#fdb813]'}`}>
                PROJECTS
              </Link>
              <div onClick={() => { alert('Chapters coming soon!'); setIsMobileMenuOpen(false); }} className="pb-2 border-b border-[#1a2b4c] cursor-pointer hover:text-[#fdb813]">
                CHAPTERS
              </div>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/committee" className={`pb-2 border-b border-[#1a2b4c] ${location.pathname === '/committee' ? 'text-[#fdb813]' : 'hover:text-[#fdb813]'}`}>
                COMMITTEE MEMBERS
              </Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/annual-reports" className={`pb-2 border-b border-[#1a2b4c] ${location.pathname === '/annual-reports' ? 'text-[#fdb813]' : 'hover:text-[#fdb813]'}`}>
                ANNUAL REPORTS
              </Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/contact" className={`pb-2 border-b border-[#1a2b4c] ${location.pathname === '/contact' ? 'text-[#fdb813]' : 'hover:text-[#fdb813]'}`}>
                CONTACT US
              </Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/voice-of-sco" className={`pb-2 border-b border-[#1a2b4c] ${location.pathname === '/voice-of-sco' ? 'text-[#fdb813]' : 'hover:text-[#fdb813]'}`}>
                VOICE OF SCO
              </Link>
              <div onClick={() => { alert('Downloads coming soon!'); setIsMobileMenuOpen(false); }} className="pb-2 cursor-pointer hover:text-[#fdb813]">
                DOWNLOAD
              </div>
              
              <div className="pt-4 flex justify-center">
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/login" className="flex w-full justify-center items-center rounded-full bg-[#18233b] px-6 py-3 text-xs font-bold text-white hover:bg-[#0f172a] transition-colors">
                  <LogIn className="mr-2 h-4 w-4" strokeWidth={2.5} />
                  LOGIN
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
