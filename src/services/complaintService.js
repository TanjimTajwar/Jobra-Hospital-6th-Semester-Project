import API from './api';

export const sendComplaint = (data) => {
    return API.post('/complaint/add', data);
};

export const myComplaints = () => {
    return API.get('/complaint/my');
};
