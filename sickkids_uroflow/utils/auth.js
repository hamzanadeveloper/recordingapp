import { AsyncStorage } from "react-native";

const jwtKey = "jwt";

export const getJWT = () => {
    return AsyncStorage.getItem(jwtKey)
    .then(result => {
        return result;
    })
    .catch(error => {
        return null;
    })
};

export const setJWT = (token) => {
    return AsyncStorage.setItem(jwtKey, token)
    .then(result => {
        return true;
    })
    .catch(error => {
        return false;
    })
};
