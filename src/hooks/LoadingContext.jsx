import React, { createContext, useContext, useState } from 'react';

// Tạo Context
const LoadingContext = createContext({
    isLoading: false,
    showLoading: () => { },
    hideLoading: () => { }
});

// Tạo Provider
export const LoadingProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(false);

    const showLoading = () => setLoading(true);
    const hideLoading = () => setLoading(false);

    return (
        <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

// Custom Hook để sử dụng context
export const useLoading = () => useContext(LoadingContext);
