import React, { createContext, useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { View, Text, Button, StyleSheet } from 'react-native';

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

const apiService = new ApiService('https://api.example.com');

const AppContext = createContext<any>(null);

const HomeScreen = ({ navigation }: any) => {
    const { data, fetchData } = useContext(AppContext);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text>Data: {JSON.stringify(data)}</Text>
            <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
        </View>
    );
};

const DetailsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Details Screen</Text>
        </View>
    );
};

const Stack = createStackNavigator();

const AppProvider = ({ children }: any) => {
    const [data, setData] = useState<any>(null);

    const fetchData = async () => {
        try {
            const response = await apiService.get('/data');
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AppContext.Provider value={{ data, fetchData }}>
            {children}
        </AppContext.Provider>
    );
};

const App = () => {
    return (
        <AppProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Details" component={DetailsScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </AppProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;