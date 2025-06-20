const api = import.meta.env.VITE_APP_DB_SERVER;

// Helper function to handle fetch responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

// Create a new ebook (Admin only)
const createEbook = async (ebookData) => {
    try {
        const response = await fetch(`${api}/product/createEbook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(ebookData)
        });
        return await handleResponse(response);
    } catch (error) {
        const errorMessage = error.message || 'Failed to create ebook';
        throw new Error(errorMessage);
    }
};

// Update an existing ebook (Admin only)
const updateEbook = async (id, ebookData) => {
    try {
        const response = await fetch(`${api}/product/updateEbook/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(ebookData)
        });
        return await handleResponse(response);
    } catch (error) {
        const errorMessage = error.message || 'Failed to update ebook';
        throw new Error(errorMessage);
    }
};

// Check if user is admin
const checkAdminStatus = async () => {
    try {
        const response = await fetch(`${api}/users/profile`, {
            method: 'GET',
            credentials: 'include'
        });
        const data = await handleResponse(response);
        return data.isAdmin || false;
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