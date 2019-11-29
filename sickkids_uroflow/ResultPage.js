import React from "react";
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Button, Alert } from "react-native";
const RecordOption = {
    android: {
      extension: '.wav',
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: '.wav',
      outputFormat:Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  };
import Constants from 'expo-constants';
const { manifest } = Constants;
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
        // this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));
        this.recordingSettings = JSON.parse(JSON.stringify(RecordOption));
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
        const fileUri = this.state.getted_uri;
        console.log(fileUri);
        const fileInfoList = fileUri.split(".");
        const fileExtension = fileInfoList[fileInfoList.length - 1];
        console.log(fileExtension);
        formData.append("INPUT-FIELD-NAME-HERE", {uri: this.state.getted_uri, name: 'test1.' + fileExtension})
        
        // CHANGE LOCAL IP ADDRESS BEFORE RUN THE CODE HERE FOR NOW!

        const data_base_url = `http://${manifest.debuggerHost
            .split(`:`)
            .shift()
            .concat(`:3001/upload`)}`; // Switch to the route you want to use
            
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

    sendPressed = () => {
        Alert.alert(
            "Send Recording",
            "Are you sure you want to send this audio recording? ",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        console.log("Send: Cancel Pressed");
                    },
                    style: "cancel"
                },
                {
                    text: "Send",
                    onPress: () => {
                        console.log("Send: Send Pressed");
                        this.sendAudio();
                    }
                }
            ],
            { cancelable: false }
        );
    }

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
                        title='Send recording' onPress={this.sendPressed}></Button>
                    <Button title='Re-record' color="red"
                        onPress={() => Alert.alert('Button with adjusted color pressed')}></Button>
                </View>
                <Button title='Cancel'></Button>
            </View>
        );
    }
}

export default ResultPage;