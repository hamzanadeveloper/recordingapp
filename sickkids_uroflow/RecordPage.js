import React from "react";
import { Text, View, Button, Alert } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from "@expo/vector-icons";

const startRecording = () => {
    return Alert.alert("started")
}

const getAlert = () => {
    return Alert.alert(
        'Record Audio',
        'Do you wish to start recording?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => startRecording()},
        ],
        {cancelable: false},
      );
}

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
            <Ionicons name="ios-microphone" size={75}/>
            <Button title="record" size={55} color='red' onPress={() => getAlert()}></Button>
            </View>
        );
    }
}

export default RecordPage;

{//                <Text>Record Page</Text>
//                 <Button icon={
//                     <Icon name="md-checkmark-circle" size={125} color="white"/>
//                 }
//   title="Button with icon component"
//   onPress = {() => {console.log(1)}}
// />
}
