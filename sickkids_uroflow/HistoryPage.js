import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, FlatList, Text, View, TouchableHighlight } from "react-native";
import HistoryPopup from "./HistoryPopup";
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


function HistoryPage(props) {
    const [history, setHistory] = useState([])

    useEffect(() => {
        app.service("audio").find()
          .then(audio => setHistory(audio.data))
    })

    const playAudio = async (recording) => {
        const soundObject = new Audio.Sound()

        try {
            await soundObject.loadAsync({ uri: recording.file_url})
            await soundObject.playAsync()
        } catch (error) {
            console.warn(error);
        }

        // let base64 = encode(recording.content_uri)
        // const uriString = "data:audio/wav;base64," + base64
        //
        // console.log("Base64: ", uriString)
        //
        // // await FileSystem.writeAsStringAsync(recording.file_url, uriString, {
        // //     encoding: FileSystem.EncodingType.Base64
        // // })
        //
        // console.log("File URL: ", recording.file_url)
        //
        // const soundObject = new Audio.Sound()
        //
        // try {
        //     await soundObject.loadAsync({ uri: recording.file_url});
        //     await soundObject.playAsync();
        // } catch (error) {
        //     console.warn(error);
        // }

        // try {
        //     console.log("Begin playing")
        //     await sound.loadAsync({ uri: uriString })
        //     await sound.playAsync();
        //     console.log("End playing")
        // } catch(error) {
        //     console.log(error)
        // }

    }

    return (
        <SafeAreaView style={styles.container}>
            {history.map(recording => (
              <TouchableHighlight onPress={() => playAudio(recording)}>
                  <View
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        borderBottomColor: '#787878',
                        borderBottomWidth: 1,
                        paddingBottom: 5,
                        paddingTop: 5
                    }}>
                      <Ionicons name="ios-play" size={45} style={{paddingLeft: 15}}/>
                      <View style={{flexDirection: 'column', marginLeft: 15}}>
                          <Text style={{fontSize: 18}}>{recording.description}</Text>
                          <Text style={{fontSize: 12, color: '#787878'}}>{recording.createdAt}</Text>
                      </View>
                      <Ionicons name="ios-trash" size={45} style={{position: 'relative', marginLeft: 'auto', right: 15}}/>
                  </View>
              </TouchableHighlight>
            ))}
        </SafeAreaView>
    )
}
HistoryPage.navigationOptions = {
    title: "History"
};

export default HistoryPage;
