const api = import.meta.env.VITE_APP_DB_SERVER;

const login = async (authDetail) => {
    const response = await fetch(`${api}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authDetail),
        credentials: 'include' // Include cookies for authentication
    });

    if (!response.ok) {
        let errorMessage = 'Login failed';
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch {
            // If response is not JSON, use status text or generic message
            errorMessage = response.statusText || `Login failed with status ${response.status}`;
        }
        throw new Error(errorMessage);
    }

    const data = await response.json();
    
    if (data.token) {
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("email", JSON.stringify(authDetail.email));
    }

    return data;
}

const register = async (authDetail) => {
    const response = await fetch(`${api}/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authDetail),
        credentials: 'include'
    });

    if (!response.ok) {
        let errorMessage = 'Registration failed';
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch {
            // If response is not JSON, use status text or generic message
            errorMessage = response.statusText || `Registration failed with status ${response.status}`;
        }
        throw new Error(errorMessage);
    }

    const data = await response.json();
    
    if (data.token) {
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("email", JSON.stringify(authDetail.email));
    }

    return data;
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