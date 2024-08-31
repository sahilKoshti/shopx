import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:
        "http://localhost:4000",
});
axiosInstance.interceptors.request.use(
    (config) => {
        // Get the token from local storage
        const userData = localStorage.getItem('userInfo');
            
        // If token exists, add it to the Authorization header
        if (userData) {
            const user = JSON.parse(userData);
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        
        return config;
    },
    (error) => {
        // Handle the error
        return Promise.reject(error);
    }
);