import React, {Component} from "react";
import { Text, View } from "react-native";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

class RecordPage extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Text>Record Page</Text>
                <Button icon={
                    <Icon name="md-checkmark-circle" size={125} color="white"/>
                }
  title="Button with icon component"
  onPress = {() => {console.log(1)}}
/>

            </View>
        );
    }
}

export default RecordPage;