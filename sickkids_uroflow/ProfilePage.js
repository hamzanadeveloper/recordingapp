import React, { Component } from "react";
// import profileImg from "./assets/profile.jpg" this dependency is not pushed zyb
import { TextInput, Button, Alert, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity as TouchableHighlight
} from "react-native";
import PasswordInputText from "react-native-hide-show-password-input";

import { getJWT, removeJWT } from "./utils/auth";

import Constants from "expo-constants";
const { manifest } = Constants;

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Gender: "male",
            Birthday: "1999-11-14",
            showBirthday: false,
            Password: "Test password",
            Email:"",
            showPassword: false,
            showGender: false,
            inputPassword: "",
            inputBirthday: "",
            inputGender: ""
        };
        // set up information refreshing mechanism
        this.props.navigation.addListener("willFocus", payload => {
            console.log("Profile will focus, update information");
            this.updateInfo();
        })
    }

    updateInfo = () => {
        console.log("Enter Did Mount");
        this.setState({isLoading: true});
        const data_base_url = `http://${manifest.debuggerHost
            .split(`:`)
            .shift()
            .concat(`:3001/update`)}`;
            getJWT().then(token => {
                return fetch(data_base_url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                    .then(result => result.json())
                    .then(json => {
                        console.log(json);
                        if (json.flag) {
                            const user = json.user;
                            this.setState({Email:user.email});
                            this.setState({Gender: user.gender});
                            if(user.birthday){
                                const birthdayInfo = user.birthday.split("T");
                                this.setState({Birthday:birthdayInfo[0]})
                            }
                        } else {
                            alert("Cannot get data");
                        }
                    })
                    .catch(error => {
                        alert("update failed due to network issues");
                        console.log(error);
                    });
            })
    };


    logOut = () => {
        this.setState({isLoading:false});
        return Alert.alert(
            "Logging Out",
            "All unsaved information will be lost",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Log Out",
                    onPress: () => {
                        removeJWT().then(res =>
                            console.log(`JWT removed: ${res}`)
                        );
                        this.props.navigation.navigate("Login");
                    }
                }
            ],
            { cancelable: false }
        );
    };

    patchPassword = () => {
        const data_base_url = `http://${manifest.debuggerHost
            .split(`:`)
            .shift()
            .concat(`:3001/update/password`)}`; // Switch to the route you want to use

        getJWT().then(token => {
            return fetch(data_base_url, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password: this.state.Password
                })
            })
                .then(result => result.json())
                .then(json => {
                    if (json.flag) {
                        alert("update success");
                    } else {
                        alert("update failed: bad request");
                    }
                })
                .catch(error => {
                    alert("update failed due to network issues");
                    console.log(error);
                });
        });
    };

    patchBirthday = () => {
        const data_base_url = `http://${manifest.debuggerHost
            .split(`:`)
            .shift()
            .concat(`:3001/update/birthday`)}`; // Switch to the route you want to use

        getJWT().then(token => {
            return fetch(data_base_url, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    birthday: this.state.Birthday
                })
            })
                .then(result => result.json())
                .then(json => {
                    if (json.flag) {
                        alert("update success");
                    } else {
                        alert("update failed: bad request");
                    }
                })
                .catch(error => {
                    alert("update failed due to network issues");
                    console.log(error);
                });
        });
    };

    patchGender = () => {
        const data_base_url = `http://${manifest.debuggerHost
            .split(`:`)
            .shift()
            .concat(`:3001/update/gender`)}`; // Switch to the route you want to use

        getJWT().then(token => {
            return fetch(data_base_url, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    gender: this.state.Gender
                })
            })
                .then(result => result.json())
                .then(json => {
                    if (json.flag) {
                        alert("update success");
                    } else {
                        alert("update failed: bad request");
                    }
                })
                .catch(error => {
                    alert("update failed due to network issues");
                    console.log(error);
                });
        });
    };

    render() {
        return (
            <KeyboardAwareScrollView>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.header}></View>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri:
                                "https://bootdey.com/img/Content/avatar/avatar6.png"
                        }}
                    />
                    <Text style={styles.text}>
                        {this.state.Email}
                    </Text>
                    <View style={styles.bodyContent}>
                        <TouchableHighlight
                            style={styles.buttonContainer}
                            onLongPress={() => {
                                this.setState({
                                    showPassword: !this.state.showPassword
                                });
                            }}
                        >
                            <Text style={{ color: "white" }}>password</Text>
                        </TouchableHighlight>
                        {this.state.showPassword ? (
                            <View>
                                <PasswordInputText
                                    style={styles.changepassword}
                                    getRef={input => (this.input = input)}
                                    value={this.state.Password}
                                    onChangeText={text =>
                                        this.setState({ inputPassword: text })
                                    }
                                    value={this.state.inputPassword}
                                />
                                <Button
                                    title="Save"
                                    onPress={() => {
                                        Alert.alert(
                                            "Confirm Change",
                                            "Press Yes to finish changing password or No to withdraw  ",
                                            [
                                                {
                                                    text: "Cancel",
                                                    onPress: () => {
                                                        console.log(
                                                            "Send: Cancel change password"
                                                        );
                                                        this.setState({
                                                            showPassword: !this
                                                                .state
                                                                .showPassword
                                                        });
                                                    },
                                                    style: "cancel"
                                                },
                                                {
                                                    text: "Yes",
                                                    onPress: () => {
                                                        this.setState({
                                                            Password: this.state
                                                                .inputPassword
                                                        });
                                                        this.setState({
                                                            showPassword: !this
                                                                .state
                                                                .showPassword
                                                        });
                                                        this.patchPassword();
                                                    }
                                                }
                                            ],
                                            { cancelable: false }
                                        );
                                    }}
                                />
                            </View>
                        ) : null}
                        <TouchableHighlight
                            style={styles.buttonContainer}
                            onLongPress={() => {
                                this.setState({
                                    showBirthday: !this.state.showBirthday
                                });
                            }}
                        >
                            <Text style={{ color: "white" }}>
                                Birthday: {this.state.Birthday}
                            </Text>
                        </TouchableHighlight>
                        {this.state.showBirthday ? (
                            <View style={styles.editinfo}>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={text =>
                                        this.setState({ inputBirthday: text })
                                    }
                                    value={this.state.inputBirthday}
                                    placeholder="year-month-day"
                                />
                                <Button
                                    title="Save"
                                    onPress={() => {
                                        Alert.alert(
                                            "Confirm Change",
                                            "Press Yes to finish changing Birthday or No to withdraw  ",
                                            [
                                                {
                                                    text: "Cancel",
                                                    onPress: () => {
                                                        console.log(
                                                            "Send: Cancel change birthday"
                                                        );
                                                        this.setState({
                                                            showBirthday: !this
                                                                .state
                                                                .showBirthday
                                                        });
                                                    },
                                                    style: "cancel"
                                                },
                                                {
                                                    text: "Yes",
                                                    onPress: () => {
                                                        console.log(
                                                            "Changed birthday"
                                                        );
                                                        this.setState({
                                                            Birthday: this.state
                                                                .inputBirthday
                                                        });
                                                        this.setState({
                                                            showBirthday: !this
                                                                .state
                                                                .showBirthday
                                                        });
                                                        this.patchBirthday();
                                                    }
                                                }
                                            ],
                                            { cancelable: false }
                                        );
                                    }}
                                />
                            </View>
                        ) : null}
                        <TouchableHighlight
                            style={styles.buttonContainer}
                            onLongPress={() => {
                                this.setState({
                                    showGender: !this.state.showGender
                                });
                            }}
                        >
                            <Text style={{ color: "white" }}>
                                Gender: {this.state.Gender}
                            </Text>
                        </TouchableHighlight>
                        {this.state.showGender ? (
                            <View style={styles.editinfo}>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={text =>
                                        this.setState({ inputGender: text })
                                    }
                                    value={this.state.inputGender}
                                    placeholder="male/female/unknown"
                                />
                                <Button
                                    title="Save"
                                    onPress={() => {
                                        Alert.alert(
                                            "Confirm Change",
                                            "Press Yes to finish changing Gender or No to withdraw  ",
                                            [
                                                {
                                                    text: "Cancel",
                                                    onPress: () => {
                                                        console.log(
                                                            "Send: Cancel change gender"
                                                        );
                                                        this.setState({
                                                            showGender: !this
                                                                .state
                                                                .showGender
                                                        });
                                                    },
                                                    style: "cancel"
                                                },
                                                {
                                                    text: "Yes",
                                                    onPress: () => {
                                                        console.log(
                                                            "Changed Gender"
                                                        );
                                                        const validGenders = [
                                                            "MALE",
                                                            "FEMALE",
                                                            "UNKNOWN"
                                                        ];
                                                        if (
                                                            validGenders.includes(
                                                                this.state.inputGender.toUpperCase()
                                                            )
                                                        ) {
                                                            this.setState({
                                                                Gender: this
                                                                    .state
                                                                    .inputGender.toLowerCase()
                                                            });
                                                        } else {
                                                            Alert.alert(
                                                                "Unexpected Gender",
                                                                "Gender can only be in Male, Female or Unknown"
                                                            );
                                                        }
                                                        this.setState({
                                                            showGender: !this
                                                                .state
                                                                .showGender
                                                        });
                                                        this.patchGender();
                                                    }
                                                }
                                            ],
                                            { cancelable: false }
                                        );
                                    }}
                                />
                            </View>
                        ) : null}
                        <Button
                            title="Log Out"
                            style={styles.buttonContainer}
                            onPress={this.logOut}
                        />
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
        );
    }
}
Profile.navigationOptions = {
    title: "Profile"
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "steelblue",
        height: 140
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: "center",
        position: "absolute",
        marginTop: 80
    },
    body: {
        marginTop: 50
    },
    bodyContent: {
        flex: 3,
        alignItems: "center",
        padding: 30,
        flexDirection: "column"
    },
    inputContent: {
        flex: 2,
        flexDirection: "row",
        alignItems: "center"
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
    buttonContainer: {
        height: 45,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: 250,
        borderRadius: 20,
        backgroundColor: "steelblue"
    },
    text: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 70,
        fontSize: 17,
        textAlign: "center"
    },
    textInput: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        textAlign: "center"
    },
    editinfo: {
        width: 200,
        height: 75
    },
    scrollView: {
        margin: 5
    },
    changepassword: {
        width: 200,
        height: 45,
        marginBottom: 20
    }
});
