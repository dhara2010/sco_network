import { fetchApi } from './apiClient';

export const getChapters = async () => {
  return await fetchApi('/chapters/public');
};

export const getChapterById = async (id) => {
  return await fetchApi(`/chapters/public/${id}`);
};
