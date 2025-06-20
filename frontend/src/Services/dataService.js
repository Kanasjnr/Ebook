const api = import.meta.env.VITE_APP_DB_SERVER;

const getSession = () => {
    const token = localStorage.getItem("token");
    return token ? JSON.parse(token) : null;
}

// Helper function to handle fetch responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

const getUser = async () => {
    const token = getSession();
    
    if (!token) {
        return null;
    }

    try {
        const response = await fetch(`${api}/users/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        });

        return await handleResponse(response);
    } catch (error) {
        if (error.message.includes('401')) {
            // Token is invalid, clear localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            return null;
        }
        
        // Network error or server down, fall back to localStorage
        const email = localStorage.getItem("email");
        return email ? { email: JSON.parse(email) } : null;
    }
}

const dataService = {
    getUser
};

export default dataService;