import axios from 'axios';

const API = axios.create({
    baseURL:
        process.env.REACT_APP_API_URL?.replace(/\/$/, '') ||
        'http://localhost:5000/api',
});

// attach token automatically
API.interceptors.request.use(req => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.token) {
        req.headers.Authorization = user.token;
    }

    return req;
});

export default API;
