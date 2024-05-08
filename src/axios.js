import axios from 'axios';
import { refreshAccessToken } from './redux/slides/userSlide';
import { store } from './redux/store';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
});

apiClient.interceptors.response.use(
    response => {
        if (response.data) {
            return response.data;
        }
        return response;
    },
    async error => {
        const originalRequest = error.config;
        // Kiểm tra nếu đây là request làm mới token và đã thử làm mới
        if (error.response.status === 401 && !originalRequest._isRetryRequest) {
            originalRequest._isRetryRequest = true;  // Đánh dấu là đã thử làm mới
            try {
                const newAccessToken = await store.dispatch(refreshAccessToken()).then(response => response.payload);
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest);  // Thử lại request gốc với token mới
            } catch (refreshError) {
                return Promise.reject(refreshError); // Trả về lỗi nếu không thể làm mới token
            }
        }
        // Nếu đã là request làm mới token hoặc không phải lỗi 401, trả về lỗi
        return Promise.reject(error);
    }
);



export default apiClient;
