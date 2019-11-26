import React from "react";
import { Button } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import CheckBox from 'react-native-check-box';
import { Platform, StyleSheet, Text, View,TextInput } from 'react-native';
import DescriptionBox from 'react-description-box';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        left: 10,
        flexDirection: "column",
        marginTop: 10,
        //   justifyContent: 'space-around',   
        //   justifyContent: 'center',
        //   alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    input: {
      margin: 15,
      marginLeft:5,
      textAlign: 'center',
      height: 150,
      borderColor: 'blue',
      borderWidth: 1
   },

})
class ResultPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked:true,
            firstChecked:true,
            secondChecked:true,
            thirdChecked:true,
            forthChecked:true,
            fifthChecked:true,
            email: '',
            password: ''
        }
    }
    handleEmail = (text) => {
        this.setState({ email: text })
     }
     handlePassword = (text) => {
        this.setState({ password: text })
     }
    render() {
        return (
            <View style={{
                flexDirection: "column",
                position: "relative",
                marginTop: 3,
                marginBottom: 1,
                flex: 1,
            }}>
                <View
                    style={{
                        marginTop: 2,
                        marginBottom: 1,
                        top: 10,
                        flex: 1,
                        flexDirection: 'column',
                        // justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text> result will be displayed here.</Text>
                    <View style={{ flexDirection: "row", marginTop: 20, marginBottom: 10, alignItems: "center" }}>
                        <Ionicons name="md-play-circle" size={50} color="red" />
                        <Button title='Play Now' color="blue"
                            onPress={() => alert('Button with adjusted color pressed')}></Button>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 10 }}>
                        <Button title='Send recording' color="blue"></Button>
                        <Button title='Re-record' color="red"
                            onPress={() => Alert.alert('Button with adjusted color pressed')}></Button>
                    </View>
                    <Button title='Cancel' color="blue"></Button>
                </View>

                <View style={styles.container}>
                <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Description:"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               textAlign = "left"
               onChangeText = {this.handleEmail}/>

                </View>
                <View style={styles.container}>
                    <CheckBox
                        style={{flex: 1, marginRight: "5%" }}
                        onClick={() => {
                            this.setState({
                                firstChecked: !this.state.firstChecked
                            })
                        }}
                        isChecked={this.state.firstChecked}
                        leftText={"Pee Red"}
                    />
                    <CheckBox
                        style={{ flex: 1,  marginRight: "5%" }}
                        onClick={() => {
                            this.setState({
                                secondChecked: !this.state.secondChecked
                            })
                        }}
                        isChecked={this.state.secondChecked}
                        leftText={"Pee Blue"}
                    />
                    <CheckBox
                        style={{ flex: 1,  marginRight: "5%" }}
                        onClick={() => {
                            this.setState({
                                thirdChecked: !this.state.thirdChecked
                            })
                        }}
                        isChecked={this.state.thirdChecked}
                        leftText={"Pee orange"}
                    />
                    <CheckBox
                        style={{ flex: 1,  marginRight: "5%" }}
                        onClick={() => {
                            this.setState({
                                forthChecked: !this.state.forthChecked
                            })
                        }}
                        isChecked={this.state.forthChecked}
                        leftText={"Pee purple"}
                    />
                    <CheckBox
                        style={{ flex: 1, marginRight: "5%" }}
                        onClick={() => {
                            this.setState({
                                fifthChecked: !this.state.fifthChecked
                            })
                        }}
                        isChecked={this.state.fifthChecked}
                        leftText={"Pee Black"}
                    />
                </View>
            </View>

        );
    }
}

export default ResultPage;