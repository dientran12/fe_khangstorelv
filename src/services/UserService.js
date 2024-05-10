import apiClient from '~/axios';

export const Login = async (data) => {
    const res = await apiClient.post('/user/sign-in', data);
    console.log('response at loginUser', res)

    return res;
};

export const Logout = async () => {
    const res = await apiClient.post('/user/logout');
    return res.data;
}

export const Register = async (data) => {
    try {
        const res = await apiClient.post('/user/sign-up', data);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const UpdateProfile = async (id, data) => {
    const res = await apiClient.put(`/user/update/${id}`, data);
    return res.data;
}

export const getUserInfo = async () => {
    try {
        const response = await apiClient.get('user/info');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const refreshToken = async (token) => {
    try {
        const response = await apiClient.post('user/refresh-token', { token });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// cart api

export const getCart = async () => {
    try {
        const response = await apiClient.get('/user/get-cart');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addToCart = async ({ userId, ...data }) => {
    try {
        const response = await apiClient.post(`user/cart-add/${userId}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const removeCartItem = async (userId, itemId) => {
    try {
        const response = await apiClient.delete(`user/remove-cart-item/${userId}/${itemId}`);
        console.log('response at removeCartItem', response)
        return response.data;
    } catch (error) {
        throw error;
    }
}