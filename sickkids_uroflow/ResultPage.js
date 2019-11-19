import React from "react";
import { Text, View, Button } from "react-native";
import { Ionicons } from '@expo/vector-icons';

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
                    <View style={{ flexDirection: "row", marginTop: 20, marginBottom: 20, alignItems: "center"}}>
                        <Ionicons name="md-play-circle" size={50} color="red" />
                        <Button title='Play Now' color="blue"
                            onPress={() => alert('Button with adjusted color pressed')}></Button>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 20, marginBottom: 20 ,alignItems: "center"}}>
                        <Ionicons name="md-download" size={50} color="black" />
                        <Button title='Download Now' color="blue"
                            onPress={() => alert('Button with adjusted color pressed')}></Button>
                    </View>
                <View style={{ flexDirection: "row", marginTop: 50, marginBottom: 50 }}>
                    <Button title='Send recording'></Button>
                    <Button title='Re-record' color="red"
                        onPress={() => Alert.alert('Button with adjusted color pressed')}></Button>
                </View>
                <Button title='Cancel'></Button>
            </View>
        );
    }
}

export default ResultPage;