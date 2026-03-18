import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
});

export const register = async (userData) => {
    const response = await api.post(`/register`, userData);
    return response.data;
}

export const login = async (userData) => {
    const response = await api.post(`/login`, userData);
    return response.data;
}
    
export const logout = async () => {
    const response = await api.post(`/logout`);
    return response.data;
}

export const getCurrentUser = async () => {
    const response = await api.get(`/get-me`);
    return response.data;
}