const api = import.meta.env.VITE_APP_DB_SERVER;

// Get authentication token from localStorage
const getAuthToken = () => {
    const token = localStorage.getItem("token");
    return token ? JSON.parse(token) : null;
};

// Place an order
const placeOrder = async () => {
    const token = getAuthToken();
    
    const response = await fetch(`${api}/order/placeOrder`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to place order');
    }

    const data = await response.json();
    return data;
};

// Get user orders
const getUserOrders = async () => {
    const token = getAuthToken();
    
    const response = await fetch(`${api}/order/getUserOrders`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get orders');
    }

    const data = await response.json();
    return data;
};

// Get specific order by ID
const getOrderById = async (orderId) => {
    const token = getAuthToken();
    
    const response = await fetch(`${api}/order/getOrderById/${orderId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get order');
    }

    const data = await response.json();
    return data;
};

const orderService = {
    placeOrder,
    getUserOrders,
    getOrderById
};

export default orderService; 