const api = import.meta.env.VITE_APP_DB_SERVER;

// Helper function to handle fetch responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

const getProductList = async (searchTerm) => {
    try {
        const response = await fetch(`${api}/product${searchTerm ? `?search=${searchTerm}` : ""}`, {
            method: 'GET',
            credentials: 'include'
        });
        return await handleResponse(response);
    } catch (error) {
        throw {
            message: error.message,
            status: error.message.includes('404') ? 404 : 500
        };
    }
}

const getProduct = async (id) => {
    try {
        const response = await fetch(`${api}/product/${id}`, {
            method: 'GET',
            credentials: 'include'
        });
        return await handleResponse(response);
    } catch (error) {
        throw {
            message: error.message,
            status: error.message.includes('404') ? 404 : 500
        };
    }
}

const getFeaturedList = async () => {
    try {
        const response = await fetch(`${api}/product/featured`, {
            method: 'GET',
            credentials: 'include'
        });
        return await handleResponse(response);
    } catch (error) {
        throw {
            message: error.message,
            status: error.message.includes('404') ? 404 : 500
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