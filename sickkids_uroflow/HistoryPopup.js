import React from "react";
import {
    View,
    Text,
    Modal,
    Button,
    StyleSheet,
    Alert,
    TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
    popup: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttons: {
        width: "75%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 40
    },
    backButton: {
        marginVertical: 10
    },
    title: {
        fontSize: 16,
        color: "white"
    },
    info: {
        fontSize: 16,
        color: "steelblue",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: "center"
    },
});

export default function HistoryPopup(prop) {
    const deleteAlert = () => {
        Alert.alert(
            "Delete Recording",
            "Are you sure you want to delete this audio recording? ",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        console.log("Delete: Cancel Pressed");
                    },
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => {
                        prop.deleteRecording(prop.id);
                        console.log("Delete: OK Pressed");
                    }
                }
            ],
            { cancelable: false }
        );

        // Stop play if is playing
        setIsPlaying(false);
    };

    const sendToAlert = () => {
        Alert.alert(
            "Send Recording",
            "Send the recording to your doctor now? ",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        console.log("Send to: Cancel Pressed");
                    },
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => {
                        console.log("Send to: OK Pressed");
                    }
                }
            ],
            { cancelable: false }
        );

        // Stop play if is playing
        setIsPlaying(false);
    };

    const [isPlaying, setIsPlaying] = React.useState(false);

    const pressedPlay = () => {
        // TODO add audio file replay here
        setIsPlaying(!isPlaying);
    };

    return (
        <Modal visible={prop.visible}>
            <View style={styles.popup}>
                <Text style = {styles.description}>Created At: {prop.id}</Text>
                <Text style = {styles.description}> Record ID: {prop.createTime}</Text>
                <Text style = {styles.description}>Comment provided: {prop.comment}</Text>
                <View style={styles.buttons}>
                    <Button color="red" title="Delete" onPress={deleteAlert} />
                    <Button
                        color="green"
                        title="Send to Doctor"
                        onPress={sendToAlert}
                    />
                </View>
                <View style={styles.backButton}>
                    <Button
                        title="Back to Homepage"
                        onPress={() => {
                            // Stop play if is playing
                            setIsPlaying(false);
                            prop.backToHomepage();
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
}
