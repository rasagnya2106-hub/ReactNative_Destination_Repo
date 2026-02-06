import React, { createContext, useContext, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { StyleSheet, View, Text, Button } from 'react-native';

const Stack = createStackNavigator();

const initialState = {
    user: null,
    settings: {},
};

const AppContext = createContext(initialState);

const appReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'UPDATE_SETTINGS':
            return { ...state, settings: { ...state.settings, ...action.payload } };
        default:
            return state;
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{ title: 'Home' }} 
                />
                <Stack.Screen 
                    name="Details" 
                    component={DetailsScreen} 
                    options={{ title: 'Details' }} 
                />
                <Stack.Screen 
                    name="Settings" 
                    component={SettingsScreen} 
                    options={{ title: 'Settings' }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const DetailsScreen: React.FC = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Details Screen</Text>
            <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
        </View>
    );
};

const SettingsScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Settings Screen</Text>
        </View>
    );
};

export default AppNavigator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});