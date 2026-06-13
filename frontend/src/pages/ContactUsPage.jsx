import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaRegClock, FaGlobe, FaShareAlt, FaCopy } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi'; // For send icon in button

const ContactUsPage = () => {
  return (
    <div className="w-full bg-gray-50 font-sans min-h-screen">
      
      {/* 1. Header Section */}
      <section className="w-full bg-[#115fc6] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-sm">
            Contact Us
          </h1>
          <p className="text-blue-100 text-sm md:text-base max-w-2xl font-medium">
            We're here to help and answer any questions you might have. We look forward to hearing from you.
          </p>
        </div>
      </section>

      {/* 2. Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Form */}
          <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <FaEnvelope className="text-[#115fc6] w-5 h-5" />
              <h2 className="text-xl font-extrabold text-[#0A1435]">Send us a Message</h2>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#0A1435]">Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your full name" 
                    className="w-full bg-gray-50 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#115fc6] outline-none transition-shadow"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#0A1435]">Email</label>
                  <input 
                    type="email" 
                    placeholder="example@domain.com" 
                    className="w-full bg-gray-50 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#115fc6] outline-none transition-shadow"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#0A1435]">Subject</label>
                <input 
                  type="text" 
                  placeholder="What is this regarding?" 
                  className="w-full bg-gray-50 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#115fc6] outline-none transition-shadow"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#0A1435]">Message</label>
                <textarea 
                  placeholder="How can we help you?" 
                  rows={5}
                  className="w-full bg-gray-50 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#115fc6] outline-none transition-shadow resize-none"
                ></textarea>
              </div>

              <button 
                type="button" 
                className="w-full bg-[#115fc6] hover:bg-[#0e4da3] text-white font-semibold py-3.5 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 text-sm mt-2"
              >
                <FiSend className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Right Column: Contact Details */}
          <div className="py-2">
            <h2 className="text-xl font-extrabold text-[#0A1435] mb-8">Direct Contact Details</h2>
            
            <div className="space-y-8 mb-10">
              {/* Head Office */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-[#fff6e5] flex items-center justify-center">
                  <FaMapMarkerAlt className="w-5 h-5 text-[#f2b528]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0A1435] mb-1">Head Office</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    SCO Global Head Office, Nariman Point, Mumbai, Maharashtra 400021
                  </p>
                </div>
              </div>

              {/* Helpdesk Email */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-[#eef5ff] flex items-center justify-center">
                  <FaEnvelope className="w-5 h-5 text-[#115fc6]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0A1435] mb-1">Helpdesk Email</h3>
                  <a href="mailto:support@sco.org" className="text-sm font-semibold text-[#115fc6] hover:underline">
                    support@sco.org
                  </a>
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-[#fff6e5] flex items-center justify-center">
                  <FaPhoneAlt className="w-5 h-5 text-[#f2b528]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0A1435] mb-1">Phone Number</h3>
                  <a href="tel:+912222843210" className="text-sm text-gray-500 hover:text-[#0A1435] transition-colors">
                    +91 22 2284 3210
                  </a>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-[#fffdf5] border border-[#ffecbc] rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <FaRegClock className="text-[#0A1435] w-4 h-4" />
                <h3 className="font-bold text-[#0A1435] text-sm">Office Hours</h3>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center text-gray-600">
                  <span>Monday - Friday:</span>
                  <span className="font-bold text-[#0A1435]">09:00 AM - 06:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-gray-600 border-t border-[#ffecbc]/50 pt-3">
                  <span>Saturday:</span>
                  <span className="font-bold text-[#0A1435]">10:00 AM - 02:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-gray-600 border-t border-[#ffecbc]/50 pt-3">
                  <span>Sunday:</span>
                  <span className="font-bold text-[#0A1435]">Closed</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-[#0A1435] mr-2">Follow us:</span>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Social links coming soon!'); }} className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#115fc6] hover:text-white transition-colors">
                <FaGlobe className="w-4 h-4" />
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Social links coming soon!'); }} className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#115fc6] hover:text-white transition-colors">
                <FaShareAlt className="w-4 h-4" />
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Social links coming soon!'); }} className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#115fc6] hover:text-white transition-colors">
                <FaCopy className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-[#ea5d24]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <h2 className="text-lg font-bold text-[#0A1435]">Find us on the Map</h2>
            </div>
          </div>
          <div className="w-full h-[400px] bg-gray-100 relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15093.076939987015!2d72.81308359737965!3d18.928420177726484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1c73a0d5cad%3A0xc70a25a7209c733c!2sNariman%20Point%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{border: 0}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            {/* Overlay Map Pin as shown in design */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#115fc6] border-4 border-white shadow-lg flex items-center justify-center">
                <FaMapMarkerAlt className="text-white w-5 h-5" />
              </div>
              <div className="mt-2 bg-white text-[#0A1435] text-[10px] font-bold px-4 py-1.5 rounded shadow border border-gray-100 uppercase tracking-widest">
                JITO Head Office
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactUsPage;
