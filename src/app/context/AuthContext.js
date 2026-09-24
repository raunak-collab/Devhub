"use client";

import { createContext, useContext, useEffect, useState } from "react";
import oAuthUser from "../../action/authAction";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const oAuthuser = await oAuthUser()

                if (oAuthuser) {
                    setUser(oAuthuser)
                    return
                }
                const response = await fetch("/api/user", {
                    cache: "no-store",
                });

                const contentType = response.headers.get("content-type");

                if (!contentType?.includes("application/json")) {
                    console.error(
                        "Expected JSON but received:",
                        contentType
                    );

                    const text = await response.text();
                    console.error(text);

                    setUser(null);
                    return;
                }

                const data = await response.json()
                if (response.ok) {
                    setUser(data);
                } else {
                    setUser(null);
                }

            } catch (error) {
                console.error("Failed to fetch user:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}