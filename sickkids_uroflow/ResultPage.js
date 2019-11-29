import React from "react";
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Button, Navigator } from "react-native";

class ResultPage extends React.Component {
    constructor(props) {
        super(props);
        console.log(JSON.stringify((this.props.navigation.getParam('uri_info', 'nothing sent'))))
        this.sound = null;
        this.isSeeking = false;
        this.shouldPlayAtEndOfSeek = false;
        this.state = {
          uri: null,
          getted_uri: this.props.navigation.getParam('uri_info', 'nothing sent'),
          haveRecordingPermissions: false,
          isLoading: false,
          isPlaybackAllowed: false,
          muted: false,
          soundPosition: null,
          soundDuration: null,
          recordingDuration: null,
          shouldPlay: false,
          isPlaying: false,
          isRecording: false,
          fontLoaded: false,
          shouldCorrectPitch: true,
          volume: 1.0,
          rate: 1.0,
        };
        this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));
    }

    async _stopRecordingAndEnablePlayback() {
        asset_path = this.props.navigation.getParam('uri_info', 'nothing sent')
        const playbackObject = await Audio.Sound.createAsync(
            { uri: asset_path },
            { shouldPlay: true }
          );
        this.sound = playbackObject;
    };

    sendAudio = () => {
        const formData = new FormData();
        formData.append("userId", "1");
        formData.append("INPUT-FIELD-NAME-HERE", {uri: this.state.getted_uri, name: 'test1.caf', type: 'audio/caf'})
        
        // CHANGE LOCAL IP ADDRESS BEFORE RUN THE CODE HERE FOR NOW!
        ip_address = '100.64.166.191';
        const data_base_url = 'http://' + ip_address + ':3001/upload'
        fetch(data_base_url, {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then(response => {
            console.log("audio uploaded")
            this.props.navigation.goBack()

        });
    };

    _onRecordPressed = () => {
          this._stopRecordingAndEnablePlayback();
    };

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
                            onPress={this._onRecordPressed}></Button>
                    </View>
                <View style={{ flexDirection: "row", marginTop: 50, marginBottom: 50 }}>
                    <Button 
                        title='Send recording' onPress={this.sendAudio}></Button>
                    <Button title='Re-record' color="red"
                        onPress={() => Alert.alert('Button with adjusted color pressed')}></Button>
                </View>
                <Button title='Cancel'></Button>
            </View>
        );
    }
}

export default ResultPage;