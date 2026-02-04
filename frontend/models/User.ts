import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export interface User {
    id: string;
    name: string;
    email: string;
    profilePictureUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

export const createUser = (id: string, name: string, email: string, profilePictureUrl?: string): User => {
    const now = new Date();
    return {
        id,
        name,
        email,
        profilePictureUrl,
        createdAt: now,
        updatedAt: now,
    };
};

export const updateUser = (user: User, updatedFields: Partial<Omit<User, 'id' | 'createdAt'>>): User => {
    return {
        ...user,
        ...updatedFields,
        updatedAt: new Date(),
    };
};

interface UserContextType {
    user: User | null;
    setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                {/* Add your screens here */}
                {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
                {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({});