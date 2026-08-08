import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProjects } from '../../api/projects.api';

const generateSlug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data.slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch projects', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section
      className="relative py-24"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10,20,53,.85), rgba(10,20,53,.85)), url('./bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">SCO Projects</h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-300 mt-5 max-w-2xl mx-auto">
            We proudly contribute to meaningful community initiatives through
            quality construction, infrastructure development, and social impact
            projects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((project) => (
            <Link key={project._id} to={`/projects/${generateSlug(project.title)}`}>
              <div className="group bg-white border-4 border-transparent hover:border-[#FFC107] rounded-3xl p-5 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer h-full flex flex-col">
                <div className="border border-gray-200 rounded-2xl overflow-hidden flex flex-col h-full">
                  <div className="bg-[#E8E6E2] flex justify-center items-center p-6 h-48 overflow-hidden relative">
                    <img
                      src={project.featuredImage || (project.gallery && project.gallery[0]) || "./project.jpg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="bg-white py-4 px-3 text-center flex-grow flex flex-col">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                      {project.title}
                    </h3>

                    {project.subtitle && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {project.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
