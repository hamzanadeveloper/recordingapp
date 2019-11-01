import React from "react";
import { Text, View, Button, Alert, TouchableHighlight} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from "@expo/vector-icons";
import { Stopwatch, Timer} from 'react-native-stopwatch-timer'

const handleTimerComplete = () => alert("Custom Completion Function");


class RecordPage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isStopwatchStart:false,
            resetStopwatch:false,
            timerDuration:90000,
        };
        this.startStopStopWatch = this.startStopStopWatch.bind(this);
        this.resetStopwatch = this.resetStopwatch.bind(this);
    }

    startStopStopWatch(){
        this.setState({
            isStopwatchStart: !this.state.isStopwatchStart,
            resetStopwatch:false,
        });
        console.log(this.state.isStopwatchStart)
        if (this.state.isStopwatchStart){
            return Alert.alert("Record Start")
        } else {
            return Alert.alert("Stopped Recording")
        }
    }

    startRecording = () => {
        this.startStopStopWatch
        return Alert.alert("started")
    }

    getAlert = () => {
        if (!this.state.isStopwatchStart){
            return Alert.alert(
                'Record Audio',
                'Do you wish to start recording?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'Yes', onPress: () => this.startStopStopWatch()},
                ],
                {cancelable: false},
              );
        } else {
            return Alert.alert(
                'Record Audio',
                'Finished recording?',
                [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'Yes', onPress: () => this.startStopStopWatch()},
                ],
                {cancelable: false},
            );
        }
    }

    resetStopwatch(){
        this,this.setState({ isStopwatchStart: false, resetStopwatch: true});
        console.log(this,this.state.resetStopwatch)
    }
    getFormattedTime(time) {
        this.currentTime = time;
    }

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
            <Button 
                title={(this.state.isStopwatchStart==true) ? "Stop" : "Start"} size={55} color='red' onPress={() => this.getAlert()}></Button>
            <Stopwatch 
                laps
                secs
                start={this.state.isStopwatchStart}
                reset={this.state.resetStopwatch}
                getTime={this.getFormattedTime}
            />
            <TouchableHighlight onPress={this.resetStopwatch}>
                <Text style={{fontSize: 20}}>
                    RESET TIMER
                </Text>
            </TouchableHighlight>
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
