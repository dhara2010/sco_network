import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getChapters } from '../../api/chapters.api';

const ChapterSection = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        setLoading(true);
        const data = await getChapters();
        setChapters(data.filter(c => c.status === 'Approved' || c.status === 'Active' || c.status === 'approved' || c.status === 'active').slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch chapters', err);
      } finally {
        setLoading(false);
      }
    };
    fetchChapters();
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[var(--color-sco-navy)] uppercase">Our Chapters</h2>
          <div className="w-20 h-1 bg-[var(--color-sco-gold)] mx-auto mt-4"></div>
          <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
            Connecting the community across regions. Explore our presence and connect with your local chapter.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10 font-bold text-gray-500">Loading chapters...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {chapters.map((chapter) => (
              <motion.div
                key={chapter._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-[var(--color-sco-navy)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-[var(--color-sco-navy)]">{chapter.cityName}</h3>
                  <div className="p-2 bg-[var(--color-sco-gold)]/20 rounded-full text-[var(--color-sco-navy)]">
                    <MapPin size={20} />
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {chapter.presidentName && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Users size={16} className="mr-2 text-[var(--color-sco-navy)]" />
                      <span className="font-semibold mr-1">President:</span> {chapter.presidentName}
                    </div>
                  )}
                  {chapter.membersCount > 0 && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Building2 size={16} className="mr-2 text-[var(--color-sco-navy)]" />
                      <span className="font-semibold mr-1">Members:</span> {chapter.membersCount}
                    </div>
                  )}
                </div>

                <a
                  href={chapter.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full py-2.5 rounded-xl bg-[#F8F9FA] text-[#0B2B5B] font-bold text-[14px] hover:bg-[#1056A5] hover:text-white transition-colors border border-gray-100 flex items-center justify-center gap-2"
                >
                  Visit Website <ArrowRight size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link to="/chapters" className="inline-flex items-center gap-2 bg-[var(--color-sco-navy)] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#0a1a3a] transition-colors shadow-md hover:shadow-lg">
            View All Chapters <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ChapterSection;
