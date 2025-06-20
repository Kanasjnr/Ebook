import axios from 'axios';

const api = import.meta.env.VITE_APP_DB_SERVER;

// Create a new ebook (Admin only)
const createEbook = async (ebookData) => {
    try {
        const response = await axios.post(`${api}/product/createEbook`, ebookData);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to create ebook';
        throw new Error(errorMessage);
    }
};

// Update an existing ebook (Admin only)
const updateEbook = async (id, ebookData) => {
    try {
        const response = await axios.patch(`${api}/product/updateEbook/${id}`, ebookData);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to update ebook';
        throw new Error(errorMessage);
    }
};

// Check if user is admin
const checkAdminStatus = async () => {
    try {
        const response = await axios.get(`${api}/users/profile`);
        return response.data.isAdmin || false;
    } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
};

const adminService = {
    createEbook,
    updateEbook,
    checkAdminStatus
};

export default adminService; 