import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AxiosResponse } from 'axios';
import ApiService from './services/api';

const ApiContext = createContext<any>(null);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const apiService = new ApiService('https://api.example.com');

    const get = async <T>(endpoint: string): Promise<AxiosResponse<T>> => {
        setLoading(true);
        try {
            return await apiService.get<T>(endpoint);
        } finally {
            setLoading(false);
        }
    };

    const post = async <T>(endpoint: string, data: any): Promise<AxiosResponse<T>> => {
        setLoading(true);
        try {
            return await apiService.post<T>(endpoint, data);
        } finally {
            setLoading(false);
        }
    };

    const put = async <T>(endpoint: string, data: any): Promise<AxiosResponse<T>> => {
        setLoading(true);
        try {
            return await apiService.put<T>(endpoint, data);
        } finally {
            setLoading(false);
        }
    };

    const deleteRequest = async <T>(endpoint: string): Promise<AxiosResponse<T>> => {
        setLoading(true);
        try {
            return await apiService.delete<T>(endpoint);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ApiContext.Provider value={{ get, post, put, deleteRequest, loading }}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error('useApi must be used within an ApiProvider');
    }
    return context;
};