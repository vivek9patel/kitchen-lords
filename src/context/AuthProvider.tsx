'use client'
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from '../firebase/auth';

type IAuthContext = {
    user: any;
};

export const AuthContext = React.createContext<IAuthContext>({ user: null});

export default function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [auth, setAuth] = useState<IAuthContext>({ user: null });

    useEffect(() => {
        onAuthStateChanged((user) => {
            setAuth({ user: user });
        });
    }, []);

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}