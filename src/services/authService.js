import API from './api';

export const loginUser = async (email, password) => {
  return API.post('/auth/login', { email, password });
};

// Registration helpers accept full payload objects so we can send all fields
export const registerPatient = async (data) => {
  return API.post('/auth/register/patient', data);
};

export const registerDoctor = async (data) => {
  return API.post('/auth/register/doctor', data);
};

export const registerAdmin = async (data) => {
  return API.post('/auth/register/admin', data);
};
