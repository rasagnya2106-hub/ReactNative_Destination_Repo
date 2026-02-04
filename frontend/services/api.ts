import axios, { AxiosInstance, AxiosResponse } from 'axios';

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

    public async get<T>(endpoint: string): Promise<AxiosResponse<T>> {
        return this.apiClient.get<T>(endpoint);
    }

    public async post<T, U>(endpoint: string, data: U): Promise<AxiosResponse<T>> {
        return this.apiClient.post<T>(endpoint, data);
    }

    public async put<T, U>(endpoint: string, data: U): Promise<AxiosResponse<T>> {
        return this.apiClient.put<T>(endpoint, data);
    }

    public async delete<T>(endpoint: string): Promise<AxiosResponse<T>> {
        return this.apiClient.delete<T>(endpoint);
    }
}

export default new ApiService('https://your-api-base-url.com');