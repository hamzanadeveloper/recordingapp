import React from "react";
import {
    StyleSheet,
    SafeAreaView,
    FlatList,
    Text,
    View,
    TouchableOpacity
} from "react-native";

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
    },
});

const DATA = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Record"
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Second Record"
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Third Record"
    }
];

class Item extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onClick(this.props.id)}>
                <View style={styles.item}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

function HistoryPage() {
    const [refreshing, setRefreshing] = React.useState(false);

    // boolean value, true iff user clicked a record and the modal pops up
    const [isViewingRecord, setIsViewingRecord] = React.useState(false);

    // id for which record the user is viewing
    const [viewingRecordId, setViewingRecordId] = React.useState("invalid id");

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        alert("refreshing");
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    // define what action to do when a record is clicked
    const clickedRecordAction = (recordId) => {
        console.log(`clicked record of id ${recordId}`);
        setViewingRecordId(recordId);
        setIsViewingRecord(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({ item }) => (
                    <Item
                        title={item.title}
                        id={item.id}
                        onClick={clickedRecordAction}
                    />
                )}
                keyExtractor={item => item.id}
                onRefresh={onRefresh}
                refreshing={refreshing}
            />

            <HistoryPopup
                style={styles.popup}
                visible={isViewingRecord}
                id={viewingRecordId}
                setIsViewingRecord={setIsViewingRecord}
            />
        </SafeAreaView>
    );
}
HistoryPage.navigationOptions = {
    title: "History"
};

export default HistoryPage;
