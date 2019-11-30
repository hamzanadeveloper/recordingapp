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
        // Get dat file in
        const fileUri = this.state.getted_uri;
        console.log(fileUri);
        const fileInfoList = fileUri.split(".");
        const fileExtension = fileInfoList[fileInfoList.length - 1];
        console.log(fileExtension);
        formData.append("INPUT-FIELD-NAME-HERE", {
            uri: this.state.getted_uri,
            name: "test1." + fileExtension,
        });
        
        // Get other info
        formData.append("userId", "1");
        formData.append("comment", this.state.description);
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
            if (response.status === 200) {
                alert(`Audio uploaded`)
            } else if (response.status === 400) {
                alert(`Bad request, file upload failed`)
            }
            this.props.navigation.goBack();
        }).catch(err => {
            console.error(err);
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

                    <View>
                        <TextInput
                            style={{
                                // width: 230,
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
                            autoCapitalize="none"
                            textAlign="left"
                            multiline
                            numberOfLines={5}
                            onChangeText={this.handleDescription}
                            value={this.state.description}
                        />
                    </View>

                    <View>
                        <CheckBox
                            style={{ flex: 1, paddingRight: "20%" }}
                            onClick={() => {
                                this.setState({
                                    firstChecked: !this.state.firstChecked
                                });
                            }}
                            isChecked={this.state.firstChecked}
                            leftText={"symptom 1"}
                            leftTextStyle={{ paddingLeft: "20%" }}
                        />
                        <CheckBox
                            style={{ flex: 1, paddingRight: "20%" }}
                            onClick={() => {
                                this.setState({
                                    secondChecked: !this.state.secondChecked
                                });
                            }}
                            isChecked={this.state.secondChecked}
                            leftText={"symptom 2"}
                            leftTextStyle={{ paddingLeft: "20%" }}
                        />
                        <CheckBox
                            style={{ flex: 1, paddingRight: "20%" }}
                            onClick={() => {
                                this.setState({
                                    thirdChecked: !this.state.thirdChecked
                                });
                            }}
                            isChecked={this.state.thirdChecked}
                            leftText={"symptom 3"}
                            leftTextStyle={{ paddingLeft: "20%" }}
                        />
                        <CheckBox
                            style={{ flex: 1, paddingRight: "20%" }}
                            onClick={() => {
                                this.setState({
                                    forthChecked: !this.state.forthChecked
                                });
                            }}
                            isChecked={this.state.forthChecked}
                            leftText={"symptom 4"}
                            leftTextStyle={{ paddingLeft: "20%" }}
                        />
                        <CheckBox
                            style={{ flex: 1, paddingRight: "20%" }}
                            onClick={() => {
                                this.setState({
                                    fifthChecked: !this.state.fifthChecked
                                });
                            }}
                            isChecked={this.state.fifthChecked}
                            leftText={"symptom 5"}
                            leftTextStyle={{ paddingLeft: "20%" }}
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 15,
                            marginBottom: 40,
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
        );
    }
}


export default ResultPage;
