'use client'
import React, { useState } from 'react';
import { Info, Error, Warning, Success } from '@/components/Toast';

type IToast = {
    type: string;
    message: string;
    show: boolean;
};

export const ToastContext = React.createContext<(type: string, message: string) => void>(() => {});

export function getToastComponentByType(type: string, message: string) {
    switch(type) {
        case 'info':
            return <Info message={message} />;
        case 'error':
            return <Error message={message} />;
        case 'warning':
            return <Warning message={message} />;
        case 'success':
            return <Success message={message} />;
        default:
            return <Info message={message} />;
    }
}

export default function ToastProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [showAlert, setShowAlert] = useState<IToast>({
        type: 'info',
        message: '',
        show: false
    });

    const toggleAlert = (type: string, message: string) => {
        setShowAlert({
            type,
            message,
            show: true
        });
        setTimeout(() => {
            setShowAlert({
                type: 'info',
                message: '',
                show: false
            });
        }, 3000);
    }

    return (
        <ToastContext.Provider value={toggleAlert}>
            {children}
            {showAlert.show && getToastComponentByType(showAlert.type, showAlert.message)}
        </ToastContext.Provider>
    );
}