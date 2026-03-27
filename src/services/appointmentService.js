import API from './api';

export const book = (data) => {
    return API.post('/appointment/book', data);
};

export const myAppointments = () => {
    return API.get('/appointment/my');
};

export const doctorAppointments = () => {
    return API.get('/appointment/doctor');
};

export const changeStatus = (id, data) => {
    return API.put('/appointment/status/' + id, data);
};

export const allAppointments = () => {
    return API.get('/appointment/all');
};

export const deleteAppointment = (id) => {
    return API.delete('/appointment/' + id);
};


export const cancelAppointment = (id) => {
    return API.put(`/appointment/cancel/${id}`);
};
