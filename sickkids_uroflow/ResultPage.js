import React from "react";
import { Audio } from "expo-av";
import { Text, View, Button, Alert, TextInput, ScrollView } from "react-native";
import app from "./feathers-client.js"

class ResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file_url: this.props.navigation.getParam("uri_info", "nothing sent"),
      content_uri: this.props.navigation.getParam("contentURI"),
      description: "",
    };
  }

  async _stopRecordingAndEnablePlayback() {
    const { file_url } = this.state
    const soundObject = new Audio.Sound()

    console.log(file_url)
    try {
      await soundObject.loadAsync({ uri: file_url});
      await soundObject.playAsync();
    } catch (error) {
      console.warn(error);
    }
  }

  sendAudio = () => {
    const { file_url, description, content_uri } = this.state
    const file_arr = file_url.split(".")
    const file_type = file_arr[file_arr.length - 1]

    app.service("audio").create({ file_url, description, content_uri, file_type })
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
    const { description } = this.state
    const { navigation } = this.props

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
              value={description}
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
                <Button title="Redo" color="#f44336" onPress={() => navigation.goBack()}/>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default ResultPage;
