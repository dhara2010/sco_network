import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MotionWrapper from '../../components/common/MotionWrapper';
import SectionHeader from '../../components/common/SectionHeader';
import { Calendar, MapPin, Users, Target, ArrowRight, ArrowLeft, Share2, CheckCircle2, Factory } from 'lucide-react';
import { getProjectById } from '../../api/projects.api';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await getProjectById(id);
        setProject(data);
      } catch (err) {
        setError(err.message || 'Project not found');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen mt-14 flex items-center justify-center bg-gray-50 text-[#0B2B5B] font-bold">
        Loading...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen mt-14 flex flex-col items-center justify-center bg-gray-50">
        <div className="text-red-500 font-bold mb-4">Error: {error || 'Project not found'}</div>
        <Link to="/projects" className="text-[#1056A5] font-bold hover:underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  // Helper to ensure paths resolve correctly from root
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (typeof imagePath !== 'string') return '';
    if (imagePath.startsWith('http')) return imagePath;
    // Strip leading '.' or '/' and then prepend '/'
    const cleanPath = imagePath.replace(/^[\.\/]+/, '');
    return `/${cleanPath}`;
  };

  const descriptionParagraphs = project.description ? project.description.split('\n\n') : [];
  const topParagraphs = descriptionParagraphs.slice(0, 2);
  const remainingParagraphs = descriptionParagraphs.slice(2);

  return (
    <div className="bg-gray-50 font-sans min-h-screen mt-14 mx-5 lg:mx-20 pb-10">
      <Link to="/projects" className="mt-auto pt-4 flex items-center text-[#E65100] text-[13px] font-bold gap-1 group-hover:gap-2 transition-all hover:text-[#CC3D00]">
        <ArrowLeft size={14} /> Back to Projects
      </Link>
      <MotionWrapper className='flex flex-col items-center text-center pt-10'>
        <SectionHeader
          title={
            <>
              {project.title.split(' ')[0]}{' '}
              <span className="text-[#FFC107]">
                {project.title.substring(project.title.indexOf(' ') + 1)}
              </span>
            </>
          }
          subtitle={<>{project.subtitle}</>}
          className="mb-8 flex flex-col items-center"
        />
      </MotionWrapper>

      {topParagraphs.length > 0 && (
        <section className='bg-white my-10 rounded-md p-10 text-lg leading-relaxed text-gray-600 shadow-xl'>
          {topParagraphs.map((paragraph, index) => (
            <p key={index} className={index > 0 ? "mt-6" : ""}>
              {paragraph}
            </p>
          ))}
        </section>
      )}

      {(project.featuredImage || (project.gallery && project.gallery.length > 0)) && (
        <div className="mt-10 mb-10 w-full h-[50vh] md:h-[75vh] rounded-[32px] overflow-hidden shadow-2xl">
          <img
            src={getImageUrl(project.featuredImage || project.gallery[0])}
            alt={project.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      )}

      {remainingParagraphs.length > 0 && (
        <section className='bg-white my-10 rounded-md p-10 text-lg leading-relaxed text-gray-600 shadow-xl'>
          {remainingParagraphs.map((paragraph, index) => (
            <p key={index} className={index > 0 ? "mt-6" : ""}>
              {paragraph}
            </p>
          ))}
        </section>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <div className="my-16 pb-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-800">Project Gallery</h2>
            <div className="w-16 h-1 bg-[#FFC107] mx-auto mt-3 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {project.gallery.map((imgSrc, index) => (
              <div key={index} className="h-64 rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative group cursor-pointer">
                <img
                  src={getImageUrl(imgSrc)}
                  alt={`${project.title} gallery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectDetailsPage;
