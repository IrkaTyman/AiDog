import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { typedMemo } from '@shared/lib';

export type AuthContextProps = {
    login: () => void;
    logout: () => void;
    isAuth: boolean;
};

export const AuthProvider = createContext<AuthContextProps | null>(null);

export const useAuthContext = (): AuthContextProps => {
    const context = useContext(AuthProvider);

    if (context == null) {
        throw new Error('Used SelectContext without provider or before it');
    }

    return context;
};

export type AuthContextProviderProps = PropsWithChildren & {};

export const AuthContextProvider = typedMemo(
    function UserContextProvider({
        children,
    }: AuthContextProviderProps) {
        const [isAuth, setIsAuth] = useState(false);

        const login = useCallback(() => setIsAuth(true), []);

        const logout = useCallback(() => setIsAuth(false), []);

        useEffect(() => {
            const accessToken = localStorage.getItem('token');
            if (accessToken) {
                setIsAuth(true);
            }
        }, []);

        return (
            <AuthProvider.Provider
                value={
                    {
                        isAuth,
                        login,
                        logout,
                    }
                }
            >
                {children}
            </AuthProvider.Provider>
        );
    },
);
