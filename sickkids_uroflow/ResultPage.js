import React from "react";
import { Text, View, Button } from "react-native";

class ResultPage extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Text>Your result will be displayed here.</Text>
                <View style={{flexDirection: "row", marginTop: 50, marginBottom: 50}}>
                    <Button title='Send recording'></Button>
                    <Button title='Re-record'></Button>
                </View>
                <Button title='Cancel'></Button> 
            </View>
        );
    }
}

export default ResultPage;