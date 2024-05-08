import apiClient from '~/axios';

export const createOrder = async (userId, orderData) => {
    try {
        const response = await apiClient.post(`/order/create-order/${userId}`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating order', error);
        throw error;
    }
}

export const getAllOrdered = async (userId) => {
    try {
        const response = await apiClient.get(`/order/get-all-order-of-user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting orders', error);
        throw error;
    }
}

export const getOrderDetail = async (userId, orderId) => {
    try {
        const response = await apiClient.get(`/order/get-order-detail/${userId}/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting order detail', error);
        throw error;
    }
}

export const cancelOrder = async (userId, orderId) => {
    console.log('cancel order', userId, orderId)
    try {
        const response = await apiClient.put(`/order/cancel-order/${userId}/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error canceling order', error);
        throw error;
    }
}