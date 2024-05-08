import apiClient from '~/axios';

export const createPaymentIntent = async (id) => {
    console.log('ai di ef', id)
    const res = await apiClient.post(`/payment/create-payment-intent`, { orderId: id });
    return res;
}

export const createPaymentIntentWithStripe = async (id) => {
    console.log('ai di ef', id)
    const res = await apiClient.post(`/payment/create-payment-intent-with-stripe`, { orderId: id });
    return res;
}

export const notifyPayment = async (orderId, data) => {
    try {
        const res = await apiClient.post(`/payment/notify-payment/?orderId=${orderId}`, data);
        return res;
    }
    catch (error) {
        console.error('Error notify payment', error);
        throw error;
    }
}