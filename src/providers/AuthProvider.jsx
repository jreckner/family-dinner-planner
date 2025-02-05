import { createContext, useContext, useState } from 'react';

import { googleLogout } from '@react-oauth/google';

import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

/* eslint react/prop-types: 0 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);

    const login = (response) => {
        const decodedUser = jwtDecode(response.credential);
        console.log(decodedUser);
        if (decodedUser.email.includes("reckner")) roles.push("admin");
        setUser(decodedUser);
    };

    const logout = () => {
        setUser(null);
        setRoles([]);
        googleLogout();
    };

    return (
        <AuthContext.Provider value={{ user, roles, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);