import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem("user") || "null");
            setUser(saved);
            loadTheme(saved?.role);
        } catch (_) {
            setUser(null);
            loadTheme(null);
        }
    }, []);

    const loadTheme = (role) => {
        if (typeof document !== "undefined") {
            document.body.classList.remove(
                "theme-auth",
                "theme-admin",
                "theme-doctor",
                "theme-patient"
            );
        }

        let file = "auth.css";
        let themeClass = "theme-auth";

        if (role === "admin") {
            file = "admin.css";
            themeClass = "theme-admin";
        } else if (role === "doctor") {
            file = "doctor.css";
            themeClass = "theme-doctor";
        } else if (role === "patient") {
            file = "patient.css";
            themeClass = "theme-patient";
        }

        if (typeof document !== "undefined") {
            document.body.classList.add(themeClass);
        }

        import(`../styles/${file}`);
    };

    const login = (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        loadTheme(data.role);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setUser(null);
        loadTheme(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
