import React from "react";
import { View, Text } from "react-native";

import { getJWT, removeJWT } from "./utils/auth";

class LoadingPage extends React.Component {
    constructor(props) {
        super(props);
        // removeJWT(); // clear jwt field for debugging purpose
        // checks JWT before
        getJWT().then(res => {
            console.log(`Current JWT: ${res}`);
            if (res !== null) {
                this.props.navigation.navigate("History");
            } else {
                this.props.navigation.navigate("Login");
            }
        });
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Text style={{ fontSize: 30, marginBottom: 30 }}>
                    Hang on a second...
                </Text>
            </View>
        );
    }
}

export default LoadingPage;