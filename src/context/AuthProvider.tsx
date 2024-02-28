'use client'
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from '../firebase/auth';
import { Chef } from '@/firebase/types';
import { fetchChefByEmail } from '@/firebase/server';

type IAuthContext = {
    user: Chef | null;
};

export const AuthContext = React.createContext<IAuthContext>({ user: null});

export default function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [auth, setAuth] = useState<IAuthContext>({ user: null });

    useEffect(() => {
        onAuthStateChanged((user) => {
            if(user?.email){
                fetchChefByEmail(user.email).then((chef) => {
                    setAuth({ user: chef });
                });
            }
            else{
                setAuth({ user: null });
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}