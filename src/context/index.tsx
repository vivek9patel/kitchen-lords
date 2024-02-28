'use client';
import AuthProvider from './AuthProvider';
import ChefsProvider from './ChefsProvider';
import AlertProvider from './ToastProvider';

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
      <AlertProvider>
        <AuthProvider>
          <ChefsProvider>
            {children}
          </ChefsProvider>
        </AuthProvider>
      </AlertProvider>
  );
}