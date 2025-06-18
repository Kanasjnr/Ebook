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
        const response = await fetch(`${api}/users/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        });

        if (!response.ok) {
            // Token is invalid, clear localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            return null;
        }

        const userData = await response.json();
        return userData;
    } catch (error) {
        // Network error or server down, fall back to localStorage
        const email = localStorage.getItem("email");
        return email ? { email: JSON.parse(email) } : null;
    }
}

const dataService = {
    getUser
};

export default dataService;