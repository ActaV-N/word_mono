import axios from 'axios';

export const api = axios.create({
    baseURL:"http://localhost:8000",
});

export const refreshRequest = (refreshToken: string) => {
    return api({
        url:'/auth/refresh',
        method:'get',
        headers:{
            "Authorization":`Bearer ${refreshToken}`
        }
    })
}

export default api