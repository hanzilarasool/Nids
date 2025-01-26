import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

// Create a context for the login state
const LoginContext = createContext();

// Create a provider component
export const LoginProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Get the user from localStorage if it exists
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        // Save the user to localStorage whenever it changes
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            setUser(data.user);
            localStorage.setItem('token', data.token);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <LoginContext.Provider value={{ user, login, logout }}>
            {children}
        </LoginContext.Provider>
    );
};

// Custom hook to use the login context
export const useLogin = () => {
    return useContext(LoginContext);
};

LoginProvider.propTypes = {
    children: PropTypes.node.isRequired,
};