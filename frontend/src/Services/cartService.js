import axios from 'axios';

const api = import.meta.env.VITE_APP_DB_SERVER;

// Get authentication token from localStorage
const getAuthToken = () => {
    const token = localStorage.getItem("token");
    return token ? JSON.parse(token) : null;
};

// Get user cart from backend
const getUserCart = async () => {
    const token = getAuthToken();
    
    try {
        const response = await axios.get(`${api}/cart/getCart`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to get cart';
        throw new Error(errorMessage);
    }
};

// Add item to cart
const addToCartAPI = async (productId) => {
    const token = getAuthToken();
    
    try {
        const response = await axios.post(`${api}/cart/addtocart`, 
            { id: productId },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to add to cart';
        throw new Error(errorMessage);
    }
};

// Remove item from cart
const removeFromCartAPI = async (productId) => {
    const token = getAuthToken();
    
    try {
        const response = await axios.delete(`${api}/cart/removeCart`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: { id: productId }
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to remove from cart';
        throw new Error(errorMessage);
    }
};

// Clear entire cart
const clearCartAPI = async () => {
    const token = getAuthToken();
    
    try {
        const response = await axios.delete(`${api}/cart/clearCart`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to clear cart';
        throw new Error(errorMessage);
    }
};

const cartService = {
    getUserCart,
    addToCartAPI,
    removeFromCartAPI,
    clearCartAPI
};

export default cartService; 