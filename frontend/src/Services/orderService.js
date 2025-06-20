import axios from 'axios';

const api = import.meta.env.VITE_APP_DB_SERVER;

// Get authentication token from localStorage
const getAuthToken = () => {
    const token = localStorage.getItem("token");
    return token ? JSON.parse(token) : null;
};

// Place an order
const placeOrder = async () => {
    const token = getAuthToken();
    
    try {
        const response = await axios.post(`${api}/order/placeOrder`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to place order';
        throw new Error(errorMessage);
    }
};

// Get user orders
const getUserOrders = async () => {
    const token = getAuthToken();
    
    try {
        const response = await axios.get(`${api}/order/getUserOrders`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to get orders';
        throw new Error(errorMessage);
    }
};

// Get specific order by ID
const getOrderById = async (orderId) => {
    const token = getAuthToken();
    
    try {
        const response = await axios.get(`${api}/order/getOrderById/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to get order';
        throw new Error(errorMessage);
    }
};

const orderService = {
    placeOrder,
    getUserOrders,
    getOrderById
};

export default orderService; 