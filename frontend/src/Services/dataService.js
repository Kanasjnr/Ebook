import axios from 'axios';

const api = import.meta.env.VITE_APP_DB_SERVER;

const getSession = () => {
    const token = localStorage.getItem("token");
    return token ? JSON.parse(token) : null;
}

const getUser = async () => {
    const token = getSession();
    
    if (!token) {
        return null;
    }

    try {
        const response = await axios.get(`${api}/users/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
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