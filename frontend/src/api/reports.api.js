import { fetchApi } from './apiClient';

export const getReports = async () => {
  return await fetchApi('/reports/public');
};

export const getReportById = async (id) => {
  return await fetchApi(`/reports/public/${id}`);
};
