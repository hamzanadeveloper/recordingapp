import React from "react";
import {
    StyleSheet,
    SafeAreaView,
    FlatList,
    Text,
    View,
    TouchableOpacity,
    Alert
} from "react-native";
import { getJWT, removeJWT } from "./utils/auth";
import Constants from "expo-constants";
const { manifest } = Constants;
import config from "./config.json"
const url = config.url;


import HistoryPopup from "./HistoryPopup";

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

class Item extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onClick(this.props.title, this.props.comment, this.props.id)}>
                <View style={styles.item}>
                    <Text style={styles.title}>Recorded on: {this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

class NoRecording extends React.Component {
    render() {
        console.log(this.props);
        return (
            <View>
                {this.props.DATA.length === 0 && (
                    <View style={{ position: "absolute", padding: 20 }}>
                        <Text style={{ fontSize: 20 }}>
                            It seems like you don't have any recording, start
                            one by clicking "Record" button below!
                        </Text>
                    </View>
                )}
            </View>
        );
    }
}

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

function getHistory() {
    const data_base_url = url
            ? `${url}/recordHistory`
            : `http://${manifest.debuggerHost
                  .split(`:`)
                  .shift()
                  .concat(`:3001/recordHistory`)}`;
    
    let res = [];
    getJWT().then(token => {
        return fetch(data_base_url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })
            .then(result => result.json())
            .then(json => {
                if (json.flag) {
                    console.log("Found recordings: " + json.recordings)
                    console.log("Type: " + (typeof json.recordings));
                    res = json.recordings
                } else {
                    Alert.alert("You have no recordings");
                    res = []
                }
            })
            .catch(error => {
                alert("update failed due to network issues");
                console.log(error);
            });
    });
    return res;
}

function HistoryPage(props) {
    props.navigation.addListener("willFocus", payload => {
        console.log("History will focus, fetch data");
        const data_base_url = url
        ? `${url}/recordHistory`
        : `http://${manifest.debuggerHost
              .split(`:`)
              .shift()
              .concat(`:3001/recordHistory`)}`;

        getJWT().then(token => {
            return fetch(data_base_url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
            .then(result => result.json())
            .then(json => {
                if (json.flag) {

                    console.log("Found recordings: " + json.recordings)
                    setDATA(json.recordings)
                    console.log("Time" + json.recordings[0].time)
                } else {
                    Alert.alert("You have no recordings");
                }
            })
            .catch(error => {
                alert("update failed due to network issues");
                console.log(error);
            });
        });
    });

    // Mock data, should be replaced by HTTP calls
    const [DATA, setDATA] = React.useState([]);


    const [refreshing, setRefreshing] = React.useState(false);

    // boolean value, true iff user clicked a record and the modal pops up
    const [isViewingRecord, setIsViewingRecord] = React.useState(false);

    // id for which record the user is viewing
    const [viewingRecordId, setViewingRecordId] = React.useState("invalid id");

    const [recordTime, setRecordTime] = React.useState("NO GOOD!!!!");

    const [comment, setComment] = React.useState("NO COMMENT PROVIDED!!!!");

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        alert("refreshing");
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    // define what action to do when a record is clicked
    const clickedRecordAction = (time, commentP, recordId) => {
        setRecordTime(time)
        setComment(commentP)
        setViewingRecordId(recordId);
        setIsViewingRecord(true);
    };

    // action when user goes back to home page
    const backToHomepage = () => {
        setRecordTime("RESET BACK!!!!")
        setComment("NA")
        setIsViewingRecord(false);
        setViewingRecordId("invalid id");
    };

    return (
        <SafeAreaView style={styles.container}>
            <NoRecording DATA={DATA} />

            <FlatList
                data={DATA}
                renderItem={({ item }) => (
                    <Item
                        title={item.time}
                        id={item.id}
                        comment={item.comment}
                        onClick={clickedRecordAction.bind(item.time, item.id, item.comment)}
                    />
                )}
                keyExtractor={item => item.id.toString()}
                onRefresh={onRefresh}
                refreshing={refreshing}
            />

            <HistoryPopup
                style={styles.popup}
                visible={isViewingRecord}
                id={viewingRecordId}
                createTime={recordTime}
                comment={comment}
                backToHomepage={backToHomepage}
            />
        </SafeAreaView>
    );
}
HistoryPage.navigationOptions = {
    title: "History"
};

export default HistoryPage;
