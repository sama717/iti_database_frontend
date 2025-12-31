import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5183/",
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response, 
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Token expired or unauthorized. Logging out...");
            localStorage.clear();
            window.location.href = "/"; 
        }
        return Promise.reject(error);
    }
);