import { fetchApi } from './apiClient';

export const getActivities = async () => {
  try {
    const data = await fetchApi('/activities/public');
    return data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
};

export const getActivityById = async (id) => {
  try {
    const data = await fetchApi(`/activities/public/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching activity ${id}:`, error);
    throw error;
  }
};
