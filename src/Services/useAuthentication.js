import { useState, useEffect } from 'react';
import { onAuthState } from './auth.service';

export const useAuthentication = () => {
    const [authData, setAuthData] = useState({ isAuthenticated: false, uid: null });

    useEffect(() => {
        onAuthState().then((authState) => {
            setAuthData(authState);
        });
    }, []);

    return authData;
}