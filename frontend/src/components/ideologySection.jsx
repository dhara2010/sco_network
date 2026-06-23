import React from 'react'
import MotionWrapper from './common/MotionWrapper';
import SectionHeader from './common/SectionHeader';
import { useState } from 'react';
function IdeologySection() {
  const [showFullText, setShowFullText] = useState(false);
  return (
    <section className="w-full font-sans py-16">
      <MotionWrapper className='flex flex-col items-center text-center'>
        <SectionHeader
          title={<>An <span className="text-[#FFC107]">IDEOLOGY</span></>}
          subtitle="Our ideology defines the principles that guide our actions and inspire our vision."
          className="mb-8 flex flex-col items-center"
        />
      </MotionWrapper>
      <div className="bg-[#0A1435] p-10">
        <div className="bg-[#F5F5F5] rounded-lg shadow-lg p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <div className="flex justify-center">
              <img
                src="./mahadev.png"
                alt="Mahadev"
                className="w-full max-w-sm object-contain"
              />
            </div>

            {/* Right Content */}
            <div className="relative text-justify text-[#4f6f93]">

              <h6 className="font-semibold mb-8 text-xl text-[#3e628a]">
                Our Respected Brothers and Sisters,
              </h6>

              <p>
                We take immense pride in our rich heritage and the values passed
                down by our forefathers. Their dedication, hard work, integrity,
                unity, and commitment to social welfare have laid a strong
                foundation for our community. Today, it is our responsibility to
                carry forward this legacy and build a brighter future for
                generations to come.
              </p>

              <p>
                SCO – Sathwara Community Organization is committed to creating a
                platform that promotes education, skill development, youth
                empowerment, cultural values, and community unity. Our vision is to
                establish a landmark institution that serves as a center for
                learning, growth, and social progress for the entire Sathwara
                community.
              </p>

              <p>
                In the 21st century, knowledge, science, technology, and innovation
                are the driving forces behind success. Our young men and women must
                be equipped to meet global challenges, seize emerging opportunities,
                and become self-reliant leaders of tomorrow. It is our collective
                responsibility to provide them with the guidance, support, and
                resources they need to achieve their full potential.
              </p>

              {/* Hidden Content */}
              <div
                className={`overflow-hidden transition-all duration-700 ease-in-out ${showFullText ? "max-h-[2000px]" : "max-h-0"
                  }`}
              >
                <p>
                  We envision creating a comprehensive community development center
                  that will include:
                </p>

                <ul className="list-disc pl-6">
                  <li>Modern hostel facilities for students pursuing higher education.</li>
                  <li>Skill development and career guidance centers for youth.</li>
                  <li>Facilities to support competitive examination preparation.</li>
                  <li>Spaces for community gatherings, cultural activities, and educational programs.</li>
                  <li>Resources that encourage entrepreneurship, leadership, and professional excellence.</li>
                  <li>A platform that strengthens unity, cooperation, and mutual support within the community.</li>
                </ul>

                <p>
                  Our goal is to bring together more than 51,000 members of the
                  Sathwara community under one shared vision of progress and
                  development. Through collective effort and strong community
                  participation, we can create a lasting institution that will serve
                  present and future generations.
                </p>

                <p>
                  Let us unite with a spirit of service, commitment, and
                  determination. By contributing our time, knowledge, resources, and
                  support, we can build a center of excellence that promotes
                  education, empowerment, self-confidence, social harmony, and
                  sustainable growth.
                </p>

                <p>
                  Together, let us transform our dreams into reality and create a
                  legacy that will inspire generations to come.
                </p>

                <blockquote className="border-l-4 border-[#FFC107] pl-4 italic text-[#0A1435] font-medium mb-6">
                  "Building a Strong Community is the Foundation of Building a Strong
                  Nation."
                </blockquote>

                <p className="font-semibold">
                  Unity • Education • Empowerment • Progress
                </p>

                <p className="font-semibold">
                  SCO – Sathwara Community Organization
                </p>

                <p className="mt-2">
                  Jai Shiddhnath...
                  <br />
                  Har Har Mahadev...
                </p>
              </div>

              {/* Fade Effect */}
              {!showFullText && (
                <div className="absolute bottom-12 left-0 w-full h-24 bg-gradient-to-t from-[#F5F5F5] via-[#F5F5F5]/80 to-transparent pointer-events-none"></div>
              )}

              {/* Read More Button */}
              <button
                onClick={() => setShowFullText(!showFullText)}
                className="mt-5 text-[#0A1435] font-semibold hover:text-[#FFC107] transition duration-300"
              >
                {showFullText ? "See Less ▲" : "Read More ▼"}
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default IdeologySection