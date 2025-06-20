import axios from 'axios';

const api = import.meta.env.VITE_APP_DB_SERVER;

const getProductList = async (searchTerm) => {
    try {
        const response = await axios.get(`${api}/product${searchTerm ? `?search=${searchTerm}` : ""}`);
        return response.data;
    } catch (error) {
        throw {
            message: error.response?.data?.message || error.message,
            status: error.response?.status || 500
        };
    }
}

const getProduct = async (id) => {
    try {
        const response = await axios.get(`${api}/product/${id}`);
        return response.data;
    } catch (error) {
        throw {
            message: error.response?.data?.message || error.message,
            status: error.response?.status || 500
        };
    }
}

const getFeaturedList = async () => {
    try {
        const response = await axios.get(`${api}/product/featured`);
        return response.data;
    } catch (error) {
        throw {
            message: error.response?.data?.message || error.message,
            status: error.response?.status || 500
        };
    }
}

const productService = {
    getProductList,
    getProduct,
    getFeaturedList
};

export { getProductList, getProduct, getFeaturedList };
export default productService;