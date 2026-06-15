import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';
import { MapPin } from 'lucide-react';

const GujaratMap = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredChapter, setHoveredChapter] = useState(null);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/chapters/public');
        if (res.ok) {
          const data = await res.json();
          setChapters(data);
        }
      } catch (err) {
        console.error('Failed to fetch chapters', err);
      } finally {
        setLoading(false);
      }
    };
    fetchChapters();
  }, []);

  const hubChapter = chapters.find(c => c.cityName.toLowerCase() === 'ahmedabad') || chapters[0];

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-[#f4f7f9] via-white to-[#e8f1f8] rounded-3xl border border-gray-100 shadow-inner overflow-hidden flex items-center justify-center">
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20 font-bold text-[#0B2B5B] backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-[#115fc6] border-t-transparent rounded-full animate-spin"></div>
            Loading Map...
          </div>
        </div>
      )}

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #115fc6 0%, transparent 40%), radial-gradient(circle at 80% 70%, #fdb813 0%, transparent 40%)' }}></div>

      <style>{`
        @keyframes flowLine {
          to { stroke-dashoffset: -20; }
        }
        .golden-line {
          stroke-dasharray: 4 4;
          animation: flowLine 1s linear infinite;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        .golden-line:hover {
          opacity: 1;
          stroke-width: 3;
        }
      `}</style>

      <div className="w-full h-full relative z-10 p-2">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 5000,
            center: [71.3, 22.5] // Roughly the center of Gujarat
          }}
          className="w-full h-full outline-none"
        >
          <Geographies geography="/gujarat.json">
            {({ geographies }) => (
              <>
                {/* Custom SVG Filters for Glow */}
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f8fafc" />
                    <stop offset="100%" stopColor="#e2e8f0" />
                  </linearGradient>
                </defs>

                {geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: { fill: "url(#mapGradient)", stroke: "#94a3b8", strokeWidth: 0.6, outline: "none", filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.05))" },
                      hover: { fill: "#cbd5e1", stroke: "#64748b", strokeWidth: 1, outline: "none", filter: "drop-shadow(4px 6px 8px rgba(0,0,0,0.1))", transition: "all 0.3s ease" },
                      pressed: { fill: "#cbd5e1", stroke: "#64748b", strokeWidth: 1, outline: "none" },
                    }}
                  />
                ))}
              </>
            )}
          </Geographies>

          {/* Golden Connection Lines */}
          {hubChapter && chapters.map((chapter) => {
            if (chapter._id === hubChapter._id) return null;
            const isHovered = hoveredChapter === chapter._id || hoveredChapter === hubChapter._id;
            return (
              <Line
                key={`line-${chapter._id}`}
                from={[hubChapter.longitude, hubChapter.latitude]}
                to={[chapter.longitude, chapter.latitude]}
                stroke="#fdb813"
                strokeWidth={isHovered ? 3 : 1.5}
                strokeLinecap="round"
                className={`golden-line cursor-pointer ${isHovered ? 'opacity-100' : 'opacity-50'}`}
              />
            );
          })}

          {chapters.map((chapter) => (
            <Marker key={chapter._id} coordinates={[chapter.longitude, chapter.latitude]}>
              <g
                onMouseEnter={() => setHoveredChapter(chapter._id)}
                onMouseLeave={() => setHoveredChapter(null)}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(chapter.websiteUrl, '_blank');
                }}
              >
                {/* Radar Pulse Effect */}
                <circle cy="-5" r="8" fill="#fdb813" className="animate-ping opacity-75" />
                
                {/* SVG Marker Pin */}
                <path
                  d="M0,-15 C5,-15 10,-10 10,-5 C10,3 0,15 0,15 C0,15 -10,3 -10,-5 C-10,-10 -5,-15 0,-15 Z"
                  fill="#fdb813"
                  stroke="#1056A5"
                  strokeWidth="1.5"
                  className="transition-all duration-300 drop-shadow-md"
                  transform={hoveredChapter === chapter._id ? "scale(1.2)" : "scale(1)"}
                  filter={hoveredChapter === chapter._id ? "url(#glow)" : ""}
                />
                <circle cy="-5" r="3" fill="#1056A5" className="transition-transform duration-300" transform={hoveredChapter === chapter._id ? "scale(1.2)" : "scale(1)"} />

                {/* Tooltip implementation inside SVG */}
                {hoveredChapter === chapter._id && (
                  <g transform="translate(0, -38)" className="animate-in fade-in slide-in-from-bottom-2 duration-200">
                    {/* Background Rect with glassmorphism feel */}
                    <rect
                      x="-55"
                      y="-18"
                      width="110"
                      height="24"
                      fill="rgba(255, 255, 255, 0.95)"
                      rx="6"
                      stroke="#115fc6"
                      strokeWidth="1.5"
                      className="shadow-2xl"
                    />
                    <polygon points="-6,6 6,6 0,13" fill="rgba(255, 255, 255, 0.95)" />
                    <polyline points="-6,6 0,13 6,6" fill="none" stroke="#115fc6" strokeWidth="1.5" />
                    
                    <text
                      textAnchor="middle"
                      y="0"
                      style={{
                        fontFamily: "system-ui, sans-serif",
                        fontSize: "10px",
                        fontWeight: "bold",
                        fill: "#0B2B5B"
                      }}
                    >
                      {chapter.cityName}
                    </text>
                  </g>
                )}
              </g>
            </Marker>
          ))}
        </ComposableMap>
      </div>
      
      {/* Enhanced Legend / Info */}
      <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/40 z-20 pointer-events-none transition-all duration-300 hover:bg-white/95">
        <h4 className="text-sm font-black text-[#0B2B5B] uppercase tracking-widest mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#115fc6] animate-pulse"></span>
          Gujarat Chapters
        </h4>
        <p className="text-xs text-gray-600 flex items-center gap-2 font-medium">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fdb813] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fdb813] border border-[#1056A5]"></span>
          </span>
          {chapters.length} Active Locations
        </p>
      </div>

    </div>
  );
};

export default GujaratMap;
