import React from "react";
import { View, Text, Modal, Button, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    popup: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default function HistoryPopup(prop) {
    return (
        <Modal visible={prop.visible}>
            <View style={styles.popup}>

                <Text>id: {prop.id}</Text>
                <Button
                    title="Cancel"
                    onPress={() => prop.setIsViewingRecord(false)}
                />

            </View>
        </Modal>
    );
}
