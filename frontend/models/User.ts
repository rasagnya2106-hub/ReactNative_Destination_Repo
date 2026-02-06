import React, { createContext, useContext, useState } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export interface User {
    id: string;
    name: string;
    email: string;
    profilePictureUrl?: string;
}

export class UserModel {
    private user: User;

    constructor(user: User) {
        this.user = user;
    }

    getId(): string {
        return this.user.id;
    }

    getName(): string {
        return this.user.name;
    }

    getEmail(): string {
        return this.user.email;
    }

    getProfilePictureUrl(): string | undefined {
        return this.user.profilePictureUrl;
    }

    updateProfilePicture(url: string): void {
        this.user.profilePictureUrl = url;
    }
}

const UserContext = createContext<UserModel | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserModel>(new UserModel({ id: '1', name: 'John Doe', email: 'john@example.com' }));

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserModel => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

const UserProfile: React.FC = () => {
    const user = useUser();

    const handleProfilePictureUpdate = () => {
        user.updateProfilePicture('https://example.com/new-profile-pic.jpg');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{user.getName()}</Text>
            <Text style={styles.email}>{user.getEmail()}</Text>
            {user.getProfilePictureUrl() && (
                <Image source={{ uri: user.getProfilePictureUrl() }} style={styles.profilePicture} />
            )}
            <Button title="Update Profile Picture" onPress={handleProfilePictureUpdate} />
        </View>
    );
};

const Stack = createStackNavigator();

const App: React.FC = () => {
    return (
        <UserProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="UserProfile">
                    <Stack.Screen name="UserProfile" component={UserProfile} />
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 16,
        color: 'gray',
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginVertical: 10,
    },
});

export default App;