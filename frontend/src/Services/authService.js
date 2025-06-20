const api = import.meta.env.VITE_APP_DB_SERVER;

// Helper function to handle fetch responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

const login = async (authDetail) => {
    try {
        const response = await fetch(`${api}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(authDetail)
        });
        
        const data = await handleResponse(response);
        
        if (data.token) {
            localStorage.setItem("token", JSON.stringify(data.token));
            localStorage.setItem("email", JSON.stringify(authDetail.email));
        }

        return data;
    } catch (error) {
        const errorMessage = error.message || 'Login failed';
        throw new Error(errorMessage);
    }
}

const register = async (authDetail) => {
    try {
        console.log('Registration data being sent:', authDetail);
        const response = await fetch(`${api}/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(authDetail)
        });
        
        const data = await handleResponse(response);
        
        if (data.token) {
            localStorage.setItem("token", JSON.stringify(data.token));
            localStorage.setItem("email", JSON.stringify(authDetail.email));
        }

        return data;
    } catch (error) {
        const errorMessage = error.message || 'Registration failed';
        throw new Error(errorMessage);
    }
}

const logout = async() => {
    try {
        await fetch(`${api}/users/logout`, {
            method: 'GET',
            credentials: 'include'
        });
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
    }
}

const authService = {
    login,
    register,
    logout
};

export default authService;