import React from 'react';
import { Share2, Users, Globe, ChevronUp, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[#071B4D] font-sans pt-20 pb-8 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">

          {/* Brand Column */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white p-2 rounded-xl">
                <img src="/logo.png" alt="SCO Logo" className="w-12 h-12 object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white leading-tight">SCO</span>
                <span className="text-[10px] tracking-widest text-[#FFC107] font-bold">NETWORK</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Dedicated to the growth and prosperity of the Sathwara community worldwide. Building excellence through unity, leadership, and professional networking.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#FFC107] hover:text-[#071B4D] transition-all duration-300 hover:-translate-y-1">
                <Share2 className="w-4 h-4" />
              </a>
              <Link to="/committee" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#FFC107] hover:text-[#071B4D] transition-all duration-300 hover:-translate-y-1">
                <Users className="w-4 h-4" />
              </Link>
              <Link to="/projects" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#FFC107] hover:text-[#071B4D] transition-all duration-300 hover:-translate-y-1">
                <Globe className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col">
            <h3 className="text-white font-extrabold text-sm uppercase tracking-widest mb-6">QUICK LINKS</h3>
            <ul className="flex flex-col gap-4">
              <li><Link to="/about" className="text-gray-400 text-sm hover:text-[#FFC107] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FFC107]/50"></span> About SCO</Link></li>
              <li><Link to="/projects" className="text-gray-400 text-sm hover:text-[#FFC107] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FFC107]/50"></span> Our Initiatives</Link></li>
              <li><Link to="/annual-reports" className="text-gray-400 text-sm hover:text-[#FFC107] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FFC107]/50"></span> Success Stories</Link></li>
              <li><Link to="/become-member" className="text-gray-400 text-sm hover:text-[#FFC107] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FFC107]/50"></span> Become a Member</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="flex flex-col">
            <h3 className="text-white font-extrabold text-sm uppercase tracking-widest mb-6">RESOURCES</h3>
            <ul className="flex flex-col gap-4">
              <li><Link to="/projects" className="text-gray-400 text-sm hover:text-[#FFC107] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FFC107]/50"></span> Educational Grants</Link></li>
              <li><Link to="/projects" className="text-gray-400 text-sm hover:text-[#FFC107] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FFC107]/50"></span> Business Directory</Link></li>
              <li><Link to="/projects" className="text-gray-400 text-sm hover:text-[#FFC107] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FFC107]/50"></span> Youth Leadership</Link></li>
              <li><Link to="/voice-of-sco" className="text-gray-400 text-sm hover:text-[#FFC107] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FFC107]/50"></span> Global Network</Link></li>
            </ul>
          </div>

          {/* Contact / Newsletter Column */}
          <div className="flex flex-col">
            <h3 className="text-white font-extrabold text-sm uppercase tracking-widest mb-6">STAY CONNECTED</h3>
            <ul className="flex flex-col gap-4 mb-6">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 text-[#FFC107] shrink-0" />
                <span>SCO Headquarters, Gujarat, India</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-[#FFC107]" />
                <a href="mailto:info@sconetwork.org" className="hover:text-white transition-colors">info@sconetwork.org</a>
              </li>
            </ul>

            <form className="flex flex-col gap-3 w-full">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFC107] focus:border-transparent outline-none transition-all"
                />
                <button
                  type="button"
                  className="absolute right-1 top-1 bottom-1 px-4 rounded-md bg-[#FFC107] text-[#071B4D] font-bold text-xs hover:bg-white transition-colors"
                >
                  JOIN
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 relative">
          <p className="text-gray-400 text-xs tracking-wide">
            © {new Date().getFullYear()} Sathwara Community Organisation. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:mr-14">
            <Link to="/about" className="text-gray-400 text-xs hover:text-white transition-colors">Privacy Policy</Link>
            <span className="w-1 h-1 rounded-full bg-gray-600 hidden md:block"></span>
            <Link to="/about" className="text-gray-400 text-xs hover:text-white transition-colors">Terms of Service</Link>
          </div>

          {/* Back to top button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="md:absolute right-0 top-1/2 md:-translate-y-1/2 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#FFC107] hover:text-[#071B4D] transition-colors"
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
