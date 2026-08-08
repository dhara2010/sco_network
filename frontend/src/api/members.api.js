import { fetchApi } from './apiClient';

export const getMembers = async () => {
  return await fetchApi('/members/public');
};

export const getMemberById = async (id) => {
  return await fetchApi(`/members/public/${id}`);
};
