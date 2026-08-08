/**
 * Mock API endpoints for sections that do not yet have backend models.
 * As per STRICT CONTENT RULE, these will return empty arrays 
 * so the frontend components gracefully hide themselves until real data exists.
 */

export const getGallery = async () => {
  // Return empty array to trigger elegant empty state or graceful hiding
  return [];
};

export const getTestimonials = async () => {
  // Return empty array to trigger elegant empty state or graceful hiding
  return [];
};

export const getSponsors = async () => {
  // Return empty array to trigger elegant empty state or graceful hiding
  return [];
};
