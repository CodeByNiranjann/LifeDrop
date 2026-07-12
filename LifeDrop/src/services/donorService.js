import api from './api';

export const searchDonors = async ({ city, bloodGroup }) => {
  const params = {};
  if (city) params.city = city;
  if (bloodGroup) params.bloodGroup = bloodGroup;

  const response = await api.get('/donors/search', { params });
  return response.data;
};

export const getAllDonors = async () => {
  const response = await api.get('/donors');
  return response.data;
};

export const updateAvailability = async (available) => {
  const response = await api.put('/donors/availability', { available });
  return response.data;
};

export const createRequest = async (payload) => {
  const response = await api.post('/requests', payload);
  return response.data;
};

export const getAllRequests = async () => {
  const response = await api.get('/requests');
  return response.data;
};