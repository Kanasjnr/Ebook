import axios from 'axios';

const api = import.meta.env.VITE_APP_DB_SERVER;

// Configure axios defaults
axios.defaults.withCredentials = true;

const login = async (authDetail) => {
    try {
        const response = await axios.post(`${api}/users/login`, authDetail);
        
        if (response.data.token) {
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("email", JSON.stringify(authDetail.email));
        }

        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Login failed';
        throw new Error(errorMessage);
    }
}

const register = async (authDetail) => {
    try {
        console.log('Registration data being sent:', authDetail);
        const response = await axios.post(`${api}/users/`, authDetail);
        
        if (response.data.token) {
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("email", JSON.stringify(authDetail.email));
        }

        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
        throw new Error(errorMessage);
    }
}

const logout = async() => {
    try {
        await axios.get(`${api}/users/logout`);
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