import React, { Component } from 'react';
// import profileImg from "./assets/profile.jpg" this dependency is not pushed zyb
import { TextInput } from 'react-native';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

function UselessTextInput() {
    const [value, onChangeText] = React.useState('Name');
    return (
        <TextInput
            style={{ height: 40, borderColor: 'black' }}
            onChangeText={text => onChangeText(text)}
            value={value}
            autoFocus={true}
            placeholder="name"
            container={true}
            clearTextOnFocus={true}
        />
    );
}


export default class Profile extends Component {
    render() {
        return (
            <View>
                <View style={styles.header}></View>
                <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
                <View style={styles.bodyContent}>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text>Opcion 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text>Opcion 2</Text>
                        </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        // backgroundImage:`url(${profileImg})`,
        // backgroundColor:"red",
        backgroundColor: "#00BFFF",
        height: 200,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
        flexDirection: "column"
        
    },
    inputContent: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
});



// import React from "react";
// import { Text, View, Button, Picker, TextInput } from "react-native";

// function fake() {

// }

// class ProfilePage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             gender: null,
//             height: null
//         }
//     }
//     render() {
//         return (
//             <View
//                 style={{
//                     flex: 1,
//                     justifyContent: "center",
//                     textAlign: "left"
//                 }}
//             >
//                 <Text>user email: demo@sickkids.ca</Text>
//                 <Text>gender:</Text>
//                 <Picker
//                     selectedValue={this.state.gender}
//                     style={{ height: 50, width: 300 }}
//                     onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })}>
//                     <Picker.Item label="Male" value="Male" />
//                     <Picker.Item label="Female" value="Female" />
//                 </Picker>
//                 <Text>height (in cm):</Text>
//                 <TextInput
//                     style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 5 }}
//                     autoCompleteType='cc-number'
//                     keyboardType='number-pad'
//                     onChangeText={height => this.setState({ height })}
//                     value={this.state.height}
//                 />
//                 <Button
//                     onPress={fake}
//                     title="submit"
//                     color="#green"
//                     accessibilityLabel="submit"
//                 />
//                 <Button
//                     onPress={fake}
//                     title="logoff"
//                     color="red"
//                     accessibilityLabel="logoff"
//                 />
//             </View>
//         );
//     }
// }

// export default ProfilePage;