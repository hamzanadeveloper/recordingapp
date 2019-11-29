import { AsyncStorage } from "react-native";

getJWT = async () => {
    try {
        const result = await AsyncStorage.getItem("jwt");
        return result;
    } catch (error) {
        return null;
    }
};

setJWT = async token => {
    try {
        await AsyncStorage.setItem("jwt", token);
        return true;
    } catch (error) {
        return false;
    }
};

checkJWT = () => {
    if (this.getJWT() !== null) {
        this.props.navigation.navigate("History");
    }
};

export default {
    getJWT,
    setJWT,
    checkJWT
};