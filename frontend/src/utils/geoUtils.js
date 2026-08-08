export const getCoordinatesForPincode = async (pincode) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=india&format=json&limit=1`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching coordinates for pincode:", error);
    return null;
  }
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance; // returns distance in km
};

export const findNearestChapter = async (pincode, chaptersData) => {
  if (!pincode || pincode.length !== 6) return null;

  // 1. Check for exact match in servedPincodes
  const exactMatch = chaptersData.find(chapter => {
    if (!chapter.servedPincodes) return false;
    const servedList = chapter.servedPincodes.split(',').map(p => p.trim());
    return servedList.includes(pincode);
  });

  if (exactMatch) {
    return { ...exactMatch, distance: 0, isExact: true };
  }

  // 2. If no exact match, fetch coordinates and calculate distance
  const userCoords = await getCoordinatesForPincode(pincode);
  
  if (!userCoords) return null; // Unable to determine location

  const chaptersWithDistance = chaptersData
    .filter(chapter => chapter.latitude && chapter.longitude && chapter.status === 'approved')
    .map(chapter => {
      const distance = calculateDistance(
        userCoords.lat, 
        userCoords.lon, 
        chapter.latitude, 
        chapter.longitude
      );
      return { ...chapter, distance, isExact: false };
    })
    .filter(chapter => chapter.distance !== null);

  // 3. Sort by distance and return the nearest
  if (chaptersWithDistance.length > 0) {
    chaptersWithDistance.sort((a, b) => a.distance - b.distance);
    return chaptersWithDistance[0]; // Returning the closest one
  }

  return null;
};
