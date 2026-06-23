import React from 'react';

const SectionHeader = ({ title, subtitle, className = '' }) => {
  return (
    <div className={className}>
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1435] uppercase tracking-tight">
        {title}
      </h2>
      <div className={`w-16 h-1 bg-[#FFC107] mt-3 ${subtitle ? 'mb-3' : ''}`}></div>
      {subtitle && (
        <p className="text-gray-500 text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
