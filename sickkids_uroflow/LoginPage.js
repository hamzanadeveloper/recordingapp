import React from "react";
import { Text, View, Button } from "react-native";

class LoginPage extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Text style={{ fontSize: 30 }}>This is login page</Text>
                <Button
                    onPress={() => this.props.navigation.navigate("History")}
                    title="Login"
                />
            </View>
        );
    }
}

export default LoginPage;