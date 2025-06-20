const api = import.meta.env.VITE_APP_DB_SERVER;

// Get authentication token from localStorage
const getAuthToken = () => {
    const token = localStorage.getItem("token");
    return token ? JSON.parse(token) : null;
};

// Helper function to handle fetch responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

// Get user cart from backend
const getUserCart = async () => {
    const token = getAuthToken();
    
    try {
        const response = await fetch(`${api}/cart/getCart`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        });
        return await handleResponse(response);
    } catch (error) {
        const errorMessage = error.message || 'Failed to get cart';
        throw new Error(errorMessage);
    }
};

// Add item to cart
const addToCartAPI = async (productId) => {
    const token = getAuthToken();
    
    try {
        const response = await fetch(`${api}/cart/addtocart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify({ id: productId })
        });
        return await handleResponse(response);
    } catch (error) {
        const errorMessage = error.message || 'Failed to add to cart';
        throw new Error(errorMessage);
    }
};

// Remove item from cart
const removeFromCartAPI = async (productId) => {
    const token = getAuthToken();
    
    try {
        const response = await fetch(`${api}/cart/removeCart`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify({ id: productId })
        });
        return await handleResponse(response);
    } catch (error) {
        const errorMessage = error.message || 'Failed to remove from cart';
        throw new Error(errorMessage);
    }
};

// Clear entire cart
const clearCartAPI = async () => {
    const token = getAuthToken();
    
    try {
        const response = await fetch(`${api}/cart/clearCart`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        });
        return await handleResponse(response);
    } catch (error) {
        const errorMessage = error.message || 'Failed to clear cart';
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