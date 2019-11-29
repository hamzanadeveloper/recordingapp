import React from "react";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, Button, Alert } from "react-native";

import CheckBox from "react-native-check-box";
import {
    StyleSheet,
    TextInput,
    ScrollView,
    KeyboardAvoidingView
} from "react-native";

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
        console.log(
            JSON.stringify(
                this.props.navigation.getParam("uri_info", "nothing sent")
            )
        );
        this.sound = null;
        this.state = {
            getted_uri: this.props.navigation.getParam(
                "uri_info",
                "nothing sent"
            ),

            description: "",
            firstChecked: false,
            secondChecked: false,
            thirdChecked: false,
            forthChecked: false,
            fifthChecked: false
        };
        // this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));
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
        const formData = new FormData();
        formData.append("userId", "1");
        const fileUri = this.state.getted_uri;
        console.log(fileUri);
        const fileInfoList = fileUri.split(".");
        const fileExtension = fileInfoList[fileInfoList.length - 1];
        console.log(fileExtension);
        formData.append("INPUT-FIELD-NAME-HERE", {
            uri: this.state.getted_uri,
            name: "test1." + fileExtension
        });

        // CHANGE LOCAL IP ADDRESS BEFORE RUN THE CODE HERE FOR NOW!

        const data_base_url = `http://${manifest.debuggerHost
            .split(`:`)
            .shift()
            .concat(`:3001/upload`)}`; // Switch to the route you want to use

        fetch(data_base_url, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: formData
        }).then(response => {
            console.log("audio uploaded");
            this.props.navigation.goBack();
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
    };

    _onRecordPressed = () => {
        this._stopRecordingAndEnablePlayback();
    };

    handleDescription = text => {
        this.setState({ description: text });
    };

    render() {
        return (
            <KeyboardAvoidingView behavior="padding">
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
                                // justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text> result will be displayed here.</Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    marginTop: 20,
                                    marginBottom: 10,
                                    alignItems: "center"
                                }}
                            >
                                <Ionicons
                                    name="md-play-circle"
                                    size={50}
                                    color="red"
                                />
                                <Button
                                    title="Play Now"
                                    color="blue"
                                    onPress={this._onRecordPressed}
                                ></Button>
                            </View>
                        </View>

                        <View style={styles.container}>
                            <CheckBox
                                style={{ flex: 1, marginRight: "5%" }}
                                onClick={() => {
                                    this.setState({
                                        firstChecked: !this.state.firstChecked
                                    });
                                }}
                                isChecked={this.state.firstChecked}
                                leftText={"Pee Red"}
                            />
                            <CheckBox
                                style={{ flex: 1, marginRight: "5%" }}
                                onClick={() => {
                                    this.setState({
                                        secondChecked: !this.state.secondChecked
                                    });
                                }}
                                isChecked={this.state.secondChecked}
                                leftText={"Pee Blue"}
                            />
                            <CheckBox
                                style={{ flex: 1, marginRight: "5%" }}
                                onClick={() => {
                                    this.setState({
                                        thirdChecked: !this.state.thirdChecked
                                    });
                                }}
                                isChecked={this.state.thirdChecked}
                                leftText={"Pee orange"}
                            />
                            <CheckBox
                                style={{ flex: 1, marginRight: "5%" }}
                                onClick={() => {
                                    this.setState({
                                        forthChecked: !this.state.forthChecked
                                    });
                                }}
                                isChecked={this.state.forthChecked}
                                leftText={"Pee purple"}
                            />
                            <CheckBox
                                style={{ flex: 1, marginRight: "5%" }}
                                onClick={() => {
                                    this.setState({
                                        fifthChecked: !this.state.fifthChecked
                                    });
                                }}
                                isChecked={this.state.fifthChecked}
                                leftText={"Pee Black"}
                            />
                        </View>

                        <View style={styles.container}>
                            <TextInput
                                style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder="Description:"
                                placeholderTextColor="#9a73ef"
                                autoCapitalize="none"
                                textAlign="left"
                                multiline
                                numberOfLines={3}
                                onChangeText={this.handleDescription}
                                value={this.state.description}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                marginTop: 50,
                                marginBottom: 50,
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Button
                                title="Send recording"
                                onPress={this.sendPressed}
                            ></Button>
                            <Button
                                title="Re-record"
                                color="red"
                                onPress={() =>
                                    Alert.alert(
                                        "Button with adjusted color pressed"
                                    )
                                }
                            ></Button>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        left: 10,
        flexDirection: "column",
        marginTop: 10,
        //   justifyContent: 'space-around',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        backgroundColor: "#F5FCFF"
    },

    input: {
        // margin: 15,
        // marginLeft: 5,
        // textAlign: "center",
        // height: 150,
        // borderColor: "black",
        // borderWidth: 1
        margin: 15,
        height: 40,
        // width: 230,
        borderColor: "black",
        borderBottomWidth: 1
        // padding: 30
    }
});

export default ResultPage;
