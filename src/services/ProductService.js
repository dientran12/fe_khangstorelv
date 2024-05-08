import apiClient from '~/axios';

export const getAllProduct = async ({ search = '', limit = 8, page = 1, categoryName, sort }) => {
    try {
        const res = await apiClient.get(`/product/get/?page=${page}&limit=${limit}&search=${search}&categoryName=${categoryName}&sort=${sort} `);
        return res;
    } catch (error) {
        console.error('Error fetching products', error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const res = await apiClient.get(`/product/get-detail/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching product by id', error);
        throw error;
    }
}