import API from './api';

export const getDoctors = () => {
    return API.get('/doctor/list');
};

// NEW → for doctor to see patient list
export const patientList = () => {
    return API.get('/doctor/patients');
};
