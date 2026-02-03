import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios, { AxiosInstance } from 'axios';

class ApiService {
    private apiClient: AxiosInstance;

    constructor(baseURL: string) {
        this.apiClient = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public async get<T>(endpoint: string): Promise<T> {
        const response = await this.apiClient.get<T>(endpoint);
        return response.data;
    }

    public async post<T>(endpoint: string, data: any): Promise<T> {
        const response = await this.apiClient.post<T>(endpoint, data);
        return response.data;
    }

    public async put<T>(endpoint: string, data: any): Promise<T> {
        const response = await this.apiClient.put<T>(endpoint, data);
        return response.data;
    }

    public async delete<T>(endpoint: string): Promise<T> {
        const response = await this.apiClient.delete<T>(endpoint);
        return response.data;
    }
}

const ApiContext = createContext<ApiService | undefined>(undefined);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const apiService = new ApiService('https://api.example.com');
    return <ApiContext.Provider value={apiService}>{children}</ApiContext.Provider>;
};

export const useApi = (): ApiService => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error('useApi must be used within an ApiProvider');
    }
    return context;
};