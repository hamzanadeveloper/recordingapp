import React from "react";
import { StyleSheet, SafeAreaView, FlatList, Text, View } from "react-native";

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
            <View style={styles.item}>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
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
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        alert("refreshing");
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={item => item.id}
                onRefresh={onRefresh}
                refreshing={refreshing}
            />
        </SafeAreaView>
    );
}
HistoryPage.navigationOptions = {
    title: "History"
};

export default HistoryPage;
