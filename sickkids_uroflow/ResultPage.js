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
        // this.sound = new Audio.Sound.createAsync(
        //     require(this.props.getParam('uri_info')),
        //     { shouldPlay: true }
        //   );
        console.log(JSON.stringify((this.props.navigation.getParam('uri_info', 'nothing sent').uri)))
        this.sound = null;
        this.isSeeking = false;
        this.shouldPlayAtEndOfSeek = false;
        this.state = {
          uri: null,
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
        asset_path = this.props.navigation.getParam('uri_info', 'nothing sent').uri
        const playbackObject = await Audio.Sound.createAsync(
            { uri: asset_path },
            { shouldPlay: true }
          );
        this.sound = playbackObject;
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