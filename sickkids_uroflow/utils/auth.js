import { AsyncStorage } from "react-native";

const jwtKey = "jwt";

export const getJWT = async () => {
    try {
        const item = await AsyncStorage.getItem(jwtKey);
        return item;
    } catch (error) {
        return null;
    }
};

export const setJWT = async (token) => {
    try {
        await AsyncStorage.setItem(jwtKey, token);
        return true;
    } catch (error) {
        return false;
    }
};

export const removeJWT = async () => {
    try {
        await AsyncStorage.removeItem(jwtKey);
        return true;
    } catch (error) {
        return false;
    }
};
