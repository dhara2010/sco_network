import React from 'react';
import { Share2, Users, Globe, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-white font-sans pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="SCO Logo" className="w-10 h-10 object-contain" />
              <span className="text-2xl font-black text-[#0A1435]">SCO</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Dedicated to the growth and prosperity of the Sathwara community worldwide. Building excellence through unity.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/contact" className="w-10 h-10 rounded-full bg-[#f4f7f9] flex items-center justify-center text-[#0A1435] hover:bg-gray-200 transition-colors">
                <Share2 className="w-4 h-4" />
              </Link>
              <Link to="/committee" className="w-10 h-10 rounded-full bg-[#f4f7f9] flex items-center justify-center text-[#0A1435] hover:bg-gray-200 transition-colors">
                <Users className="w-4 h-4" />
              </Link>
              <Link to="/projects" className="w-10 h-10 rounded-full bg-[#f4f7f9] flex items-center justify-center text-[#0A1435] hover:bg-gray-200 transition-colors">
                <Globe className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col">
            <h3 className="text-[#0A1435] font-extrabold text-sm uppercase tracking-wider mb-6">QUICK LINKS</h3>
            <ul className="flex flex-col gap-4">
              <li><Link to="/about" className="text-[#59667a] text-sm hover:text-[#0A1435] transition-colors">About SCO</Link></li>
              <li><Link to="/projects" className="text-[#59667a] text-sm hover:text-[#0A1435] transition-colors">Our Initiatives</Link></li>
              <li><Link to="/annual-reports" className="text-[#59667a] text-sm hover:text-[#0A1435] transition-colors">Success Stories</Link></li>
              <li><Link to="/become-member" className="text-[#59667a] text-sm hover:text-[#0A1435] transition-colors">Become a Member</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="flex flex-col">
            <h3 className="text-[#0A1435] font-extrabold text-sm uppercase tracking-wider mb-6">RESOURCES</h3>
            <ul className="flex flex-col gap-4">
              <li><Link to="/projects" className="text-[#59667a] text-sm hover:text-[#0A1435] transition-colors">Educational Grants</Link></li>
              <li><Link to="/projects" className="text-[#59667a] text-sm hover:text-[#0A1435] transition-colors">Business Directory</Link></li>
              <li><Link to="/projects" className="text-[#59667a] text-sm hover:text-[#0A1435] transition-colors">Youth Leadership</Link></li>
              <li><Link to="/voice-of-sco" className="text-[#59667a] text-sm hover:text-[#0A1435] transition-colors">Global Network</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="flex flex-col">
            <h3 className="text-[#0A1435] font-extrabold text-sm uppercase tracking-wider mb-6">NEWSLETTER</h3>
            <p className="text-[#59667a] text-sm leading-relaxed mb-4">
              Stay updated with our latest community initiatives and news.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg bg-[#f4f7f9] border-none text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#0A1435] outline-none"
              />
              <Link
                to="/contact"
                className="w-full px-4 py-3 rounded-lg bg-[#FFC107] text-[#0A1435] font-bold text-sm shadow-sm hover:bg-[#f5b700] transition-colors flex justify-center items-center"
              >
                Subscribe
              </Link>
            </form>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 relative">
          <p className="text-[#8c9aae] text-xs">
            © 2024 Sathwara Community Organisation. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 mr-14">
            <Link to="/about" className="text-[#8c9aae] text-xs hover:text-[#0A1435] transition-colors">Privacy Policy</Link>
            <Link to="/about" className="text-[#8c9aae] text-xs hover:text-[#0A1435] transition-colors">Terms of Service</Link>
          </div>

          {/* Back to top button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute right-0 top-2 w-10 h-10 rounded-full bg-[#0A1435] text-white flex items-center justify-center shadow-lg hover:bg-[#112255] transition-colors"
            aria-label="Back to top"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
