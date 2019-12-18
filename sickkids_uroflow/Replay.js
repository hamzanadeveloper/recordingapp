import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, FlatList, Text, View, TouchableWithoutFeedback } from "react-native";
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system'
import { Ionicons } from '@expo/vector-icons'
import { encode, decode } from 'base64-arraybuffer'


import app from "./feathers-client.js"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 8
    },
    item: {
        backgroundColor: "steelblue",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16
    },
    title: {
        fontSize: 16,
        color: "white"
    }
});


function ReplayPage(props) {
    const [recording, setRecording] = useState([])

    useEffect(() => {
        const recordInfo = props.navigation.getParam("recording")

        app.service("audio").get(recordInfo.id)
          .then(record => setRecording(record))
    })

    const playAudio = async () => {
        let fileURLArr = recording.file_url.split('.')

        fileURLArr[fileURLArr.length - 2] += '_remake'
        let newFileURL = fileURLArr.join('.')

        await FileSystem.writeAsStringAsync(newFileURL, recording.content_uri, {
            encoding: FileSystem.EncodingType.Base64
        })

        const soundObject = new Audio.Sound()

        try {
            await soundObject.loadAsync({ uri: newFileURL })
            await soundObject.playAsync()
        } catch (error) {
            console.warn(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                display: 'flex',
                width: '100%',
                height: '40%',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TouchableWithoutFeedback onPress={() => playAudio()}>
                    <Ionicons name="md-play-circle" size={200} color="#b71c1c" />
                </TouchableWithoutFeedback>
            </View>
            <View style={{width: '100%', textAlign: 'left', paddingBottom: 10}}>
                <Text style={{paddingLeft: 15}}>Audio Information</Text>
            </View>
            <View style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{paddingLeft: 30}}>Description: </Text>
                <Text style={{paddingRight: 30}}>{recording.description}</Text>
            </View>
            <View style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{paddingLeft: 30}}>Created At: </Text>
                <Text style={{paddingRight: 30}}>{recording.createdAt}</Text>
            </View>
            <View style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{paddingLeft: 30}}>File Type: </Text>
                <Text style={{paddingRight: 30}}>.{recording.file_type}</Text>
            </View>
            <View style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{paddingLeft: 30}}>User ID: </Text>
                <Text style={{paddingRight: 30}}>{recording.user_id}</Text>
            </View>
        </SafeAreaView>
    )
}
ReplayPage.navigationOptions = {
    title: "Replay Recording"
};

export default ReplayPage;
