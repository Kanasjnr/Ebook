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

// Place an order
const placeOrder = async () => {
    const token = getAuthToken();
    
    try {
        const response = await fetch(`${api}/order/placeOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify({})
        });
        return await handleResponse(response);
    } catch (error) {
        const errorMessage = error.message || 'Failed to place order';
        throw new Error(errorMessage);
    }
};

// Get user orders
const getUserOrders = async () => {
    const token = getAuthToken();
    
    try {
        const response = await fetch(`${api}/order/getUserOrders`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        });
        return await handleResponse(response);
    } catch (error) {
        const errorMessage = error.message || 'Failed to get orders';
        throw new Error(errorMessage);
    }
};

// Get specific order by ID
const getOrderById = async (orderId) => {
    const token = getAuthToken();
    
    try {
        const response = await fetch(`${api}/order/getOrderById/${orderId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        });
        return await handleResponse(response);
    } catch (error) {
        const errorMessage = error.message || 'Failed to get order';
        throw new Error(errorMessage);
    }
};

const orderService = {
    placeOrder,
    getUserOrders,
    getOrderById
};

export default orderService; 