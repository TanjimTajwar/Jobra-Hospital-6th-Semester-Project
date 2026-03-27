import API from './api';

export const allUsers = () => {
    return API.get('/admin/users');
};

export const deleteUser = (id) => {
    return API.delete('/admin/users/' + id);
};

export const updateUser = (id, data) => {
    return API.put('/admin/users/' + id, data);
};


export const getUserById = (id) => {
    return API.get(`/admin/user/${id}`);
};
