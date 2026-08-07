// import api from './api';

// export const searchDonors = async ({ city, bloodGroup }) => {
//   const params = {};
//   if (city) params.city = city;
//   if (bloodGroup) params.bloodGroup = bloodGroup;

//   const response = await api.get('/donors/search', { params });
//   return response.data;
// };

// export const getAllDonors = async () => {
//   const response = await api.get('/donors');
//   return response.data;
// };

// export const updateAvailability = async (available) => {
//   const response = await api.put('/donors/availability', { available });
//   return response.data;
// };

// export const createRequest = async (payload) => {
//   const response = await api.post('/requests', payload);
//   return response.data;
// };

// export const getAllRequests = async () => {
//   const response = await api.get('/requests');
//   return response.data;
// };
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

export const getAllRequests = async (status) => {
  const params = status ? { status } : {};
  const response = await api.get('/requests', { params });
  return response.data;
};

export const updateRequestStatus = async (id, status) => {
  const response = await api.put(`/requests/${id}/status`, { status });
  return response.data;
};

export const deleteRequest = async (id) => {
  const response = await api.delete(`/requests/${id}`);
  return response.data;
};