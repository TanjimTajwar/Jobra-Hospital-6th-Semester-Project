import API from './api';

export const addReport = (data) => {
    return API.post('/report/add', data);
};

export const myReports = () => {
    return API.get('/report/patient');
};
