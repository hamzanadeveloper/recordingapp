import React from "react";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, Button, Alert } from "react-native";
import app from "./feathers-client.js"

import {
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";

import config from "./config.json";
const url = config.url;

import { getJWT } from "./utils/auth";

const RecordOption = {
  android: {
    extension: ".wav",
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000
  },
  ios: {
    extension: ".wav",
    outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false
  }
};
import Constants from "expo-constants";
const { manifest } = Constants;
class ResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.sound = null;
    this.state = {
      getted_uri: this.props.navigation.getParam(
        "uri_info",
        "nothing sent"
      ),
      content_uri: this.props.navigation.getParam("contentURI"),
      description: "",
    };
    this.recordingSettings = JSON.parse(JSON.stringify(RecordOption));
  }

  async _stopRecordingAndEnablePlayback() {
    asset_path = this.props.navigation.getParam("uri_info", "nothing sent");
    const playbackObject = await Audio.Sound.createAsync(
      { uri: asset_path },
      { shouldPlay: true }
    );
    this.sound = playbackObject;
  }

  sendAudio = () => {
    const file_arr = this.state.getted_uri.split(".")
    const file_type = file_arr[file_arr.length - 1]

    app.service("audio").create({ file_url: this.state.getted_uri, description: this.state.description, content_uri: this.state.content_uri, file_type })
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
  };

  _onRecordPressed = () => {
    this._stopRecordingAndEnablePlayback();
  };

  render() {
    return (
      <ScrollView>
        <View
          style={{
            flexDirection: "column",
            position: "relative",
            marginTop: 3,
            marginBottom: 1,
            flex: 1
          }}
        >
          <View
            style={{
              marginTop: 2,
              marginBottom: 1,
              top: 10,
              flex: 1,
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Text>Audio Playback</Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                marginBottom: 10,
                alignItems: "center"
              }}
            >
              <Button
                title="Play Now"
                color="blue"
                onPress={this._onRecordPressed}
              />
            </View>
          </View>

          <View>
            <TextInput
              style={{
                margin: "10%",
                height: 40,
                borderColor: "black",
                borderBottomWidth: 1,
                borderTopWidth: 1,
                justifyContent: "flex-end"
              }}
              underlineColorAndroid="transparent"
              placeholder="Description:"
              placeholderTextColor="#9a73ef"
              textAlign="left"
              multiline
              numberOfLines={5}
              onChangeText={(description) => this.setState({ description })}
              value={this.state.description}
            />
          </View>

          <View
            style={{
              marginTop: 15,
              marginBottom: 40,
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <View style={{width: '30%'}}>
                <Button title="Send" color="#3f51b5" onPress={this.sendPressed}/>
              </View>
              <View style={{width: '30%', marginTop: 15}}>
                <Button title="Redo" color="#f44336" onPress={() => this.props.navigation.goBack()}/>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default ResultPage;
