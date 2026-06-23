import React from "react";

const projects = [
  {
    title: "Sco Project",
    image: "./project.jpg",
    text: "(Hostel/ Institute)"
  },
  {
    title: "Civil Service Training Center",
    image: "./civil-service.jpg",
    text: "(GPSC / UPSC / Defence /Judicilary)"
  },
  {
    title: "Global Sathwara Bussiness Organisation(GSBO)",
    image: "./gsbo.jpg",
  },
  {
    title: "Sathwara Youth Organisation",
    image: "./sco-yo.jpg",
  },
];

const CommunitySection = () => {
  return (
    <section className="relative py-24" style={{ backgroundImage: `linear-gradient(rgba(10,20,53,.85), rgba(10,20,53,.85)), url('./bg.jpg') `, backgroundSize: "cover", backgroundPosition: "center", }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white"> SCO Projects </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-300 mt-5 max-w-2xl mx-auto"> We proudly contribute to meaningful community initiatives through quality construction, infrastructure development, and social impact projects.</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white border-4 border-transparent hover:border-[#FFC107] rounded-3xl p-5 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
            >
              <div className="border border-gray-200 rounded-2xl overflow-hidden">

                {/* Image */}
                <div className="bg-[#E8E6E2] flex justify-center items-center p-6 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-32 h-25 object-contain transition-all duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Text */}
                <div className="bg-white py-4 px-1 text-center">
                  <h3 className="text-lg font-bold text-gray-800">
                    {project.title}
                  </h3>

                  {project.text && (
                    <p className="text-sm text-gray-600 mt-1">
                      {project.text}
                    </p>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;