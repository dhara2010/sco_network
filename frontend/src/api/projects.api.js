import { fetchApi } from './apiClient';

export const getProjects = async () => {
  return await fetchApi('/projects/public');
};

export const getProjectById = async (id) => {
  return await fetchApi(`/projects/public/${id}`);
};
