const api = import.meta.env.VITE_APP_DB_SERVER;

// Get authentication token from localStorage
const getAuthToken = () => {
    const token = localStorage.getItem("token");
    return token ? JSON.parse(token) : null;
};

// Get user cart from backend
const getUserCart = async () => {
    const token = getAuthToken();
    
    const response = await fetch(`${api}/cart/getCart`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get cart');
    }

    const data = await response.json();
    return data;
};

// Add item to cart
const addToCartAPI = async (productId) => {
    const token = getAuthToken();
    
    const response = await fetch(`${api}/cart/addtocart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: productId }),
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add to cart');
    }

    const data = await response.json();
    return data;
};

// Remove item from cart
const removeFromCartAPI = async (productId) => {
    const token = getAuthToken();
    
    const response = await fetch(`${api}/cart/removeCart`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: productId }),
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove from cart');
    }

    const data = await response.json();
    return data;
};

// Clear entire cart
const clearCartAPI = async () => {
    const token = getAuthToken();
    
    const response = await fetch(`${api}/cart/clearCart`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to clear cart');
    }

    const data = await response.json();
    return data;
};

const cartService = {
    getUserCart,
    addToCartAPI,
    removeFromCartAPI,
    clearCartAPI
};

export default cartService; 