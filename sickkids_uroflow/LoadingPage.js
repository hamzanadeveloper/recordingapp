import React from "react";
import { View, Text } from "react-native";
import Constants from "expo-constants";
const { manifest } = Constants;

import { getJWT, removeJWT } from "./utils/auth";

class LoadingPage extends React.Component {
    constructor(props) {
        super(props);
        // removeJWT(); // clear jwt field for debugging purpose
        // checks JWT before
        getJWT()
            .then(token => {
                console.log("LoadingPage: checking JWT");
                return this.checkJWT(token);
            })
            .then(res => {
                if (res.status === 200) {
                    console.log(
                        "LoadingPage: valid JWT, redirect to history page"
                    );
                    this.props.navigation.navigate("History");
                } else {
                    console.log(
                        "LoadingPage: invalid JWT, redirect to login page"
                    );
                    this.props.navigation.navigate("Login");
                }
            });
    }

    checkJWT(token) {
        const data_base_url = `http://${manifest.debuggerHost
            .split(`:`)
            .shift()
            .concat(`:3001/verify`)}`; // Switch to the route you want to use
        return fetch(data_base_url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
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
