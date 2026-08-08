import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Clock } from 'lucide-react';
import { getActivities } from '../../api/activities.api';

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await getActivities();
        // Sort by date (assuming activityDate exists) and take top 4
        setEvents(data.slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch events', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading || events.length === 0) return null; // Gracefully hide if no events

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return { day: '00', month: 'Mth', year: '0000', full: 'TBD' };
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString('en-US', { day: '2-digit' }),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      year: date.toLocaleDateString('en-US', { year: 'numeric' }),
      full: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
  };

  const featuredEvent = events[0];
  const supportingEvents = events.slice(1);

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4f7f9] text-[#1056A5] text-xs font-bold tracking-widest mb-4">
              <Calendar size={14} />
              UPCOMING AT SCO NETWORK
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1056A5] to-[#1a73e8]">Events</span>
            </h2>
          </div>
          <button onClick={() => alert('View all events coming soon!')} className="inline-flex items-center gap-2 text-[#1056A5] font-bold hover:text-[#FFC107] transition-colors group">
            VIEW ALL EVENTS <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Featured Event (Left/Top) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 group cursor-pointer"
          >
            <div className="relative rounded-[2rem] overflow-hidden bg-[#E8E6E2] h-[450px] lg:h-full min-h-[500px]">
              {featuredEvent.images && featuredEvent.images[0] ? (
                <img 
                  src={featuredEvent.images[0]} 
                  alt={featuredEvent.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter group-hover:brightness-110"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#071B4D] to-[#1056A5] flex items-center justify-center opacity-90 group-hover:scale-105 transition-transform duration-700">
                  <Calendar size={100} className="text-white/20" strokeWidth={1} />
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1435] via-[#0A1435]/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity"></div>

              {/* Date Badge */}
              <div className="absolute top-6 left-6 bg-white rounded-2xl p-3 text-center shadow-lg min-w-[80px]">
                <div className="text-[#FFC107] font-black text-3xl leading-none">{formatDate(featuredEvent.activityDate).day}</div>
                <div className="font-bold text-xs uppercase tracking-widest mt-1">{formatDate(featuredEvent.activityDate).month}</div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-4 mb-4 text-white/80 text-sm font-medium">
                  {featuredEvent.location && (
                    <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                      <MapPin size={16} className="text-[#FFC107]" /> {featuredEvent.location}
                    </div>
                  )}
                  {featuredEvent.time && (
                    <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                      <Clock size={16} className="text-[#FFC107]" /> {featuredEvent.time}
                    </div>
                  )}
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4 group-hover:text-[#FFC107] transition-colors">
                  {featuredEvent.title}
                </h3>
                
                {featuredEvent.description && (
                  <p className="line-clamp-2 max-w-xl mb-6 font-light text-lg">
                    {featuredEvent.description}
                  </p>
                )}

                <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFC107] rounded-full font-bold text-sm hover:bg-white transition-colors group-hover:shadow-[0_0_20px_rgba(255,193,7,0.3)]">
                  VIEW EVENT DETAILS <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Supporting Events (Right/Bottom) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {supportingEvents.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group flex flex-col sm:flex-row gap-5 p-5 bg-[#F8F9FA] rounded-3xl border border-gray-100 hover:border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
              >
                {/* Small Date Box */}
                <div className="bg-white border border-gray-100 rounded-2xl p-3 text-center min-w-[70px] shrink-0 h-max shadow-sm group-hover:border-[#FFC107] transition-colors">
                  <div className="font-black text-2xl leading-none">{formatDate(event.activityDate).day}</div>
                  <div className="font-bold text-[10px] uppercase tracking-widest mt-1">{formatDate(event.activityDate).month}</div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-2 text-xs font-bold uppercase tracking-wider">
                    {event.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-[#1056A5]" /> {event.location}
                      </span>
                    )}
                  </div>
                  
                  <h4 className="text-lg font-bold leading-snug mb-2 group-hover:text-[#1056A5] transition-colors line-clamp-2">
                    {event.title}
                  </h4>
                  
                  <div className="mt-auto pt-2 flex items-center gap-1 text-[#1056A5] font-bold text-xs uppercase tracking-widest opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                    Event Details <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}

            {supportingEvents.length === 0 && (
              <div className="h-full bg-[#F8F9FA] rounded-3xl border border-gray-100 border-dashed flex flex-col items-center justify-center p-8 text-center">
                <Calendar size={40} className="mb-3 opacity-20" />
                <p className="font-medium text-sm">More upcoming events will be listed here.</p>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
