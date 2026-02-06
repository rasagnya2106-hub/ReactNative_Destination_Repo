import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, View, Text } from 'react-native';

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

const Stack = createStackNavigator();

const HomeScreen: React.FC = () => {
    const { logout } = useAuth();
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button title="Logout" onPress={logout} />
        </View>
    );
};

const LoginScreen: React.FC = () => {
    const { login } = useAuth();
    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>
            <Button title="Login" onPress={login} />
        </View>
    );
};

const AppNavigator: React.FC = () => {
    const { isAuthenticated } = useAuth();
    return (
        <Stack.Navigator>
            {isAuthenticated ? (
                <Stack.Screen name="Home" component={HomeScreen} />
            ) : (
                <Stack.Screen name="Login" component={LoginScreen} />
            )}
        </Stack.Navigator>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </AuthProvider>
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