import API from './api';

export const myProfile = () => {
    return API.get('/profile/me');
};

export const updateProfile = (data) => {
    return API.put('/profile/update', data);
};
