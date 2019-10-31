import React from "react";
import { Text, View } from "react-native";

class HistoryPage extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Text>History page</Text>
            </View>
        );
    }
}

export default HistoryPage;