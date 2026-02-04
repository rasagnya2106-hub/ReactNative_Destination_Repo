import { Alert } from 'react-native';

export const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isPasswordStrong = (password: string): boolean => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
};

export const isFieldEmpty = (field: string): boolean => {
    return field.trim().length === 0;
};

export const showAlert = (title: string, message: string): void => {
    Alert.alert(title, message, [{ text: 'OK' }]);
};