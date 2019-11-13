import React, { Component } from 'react';
// import profileImg from "./assets/profile.jpg" this dependency is not pushed zyb
import { TextInput, Button, Alert, ScrollView } from 'react-native';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity as TouchableHighlight
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
    constructor(props) {
        super(props)
        this.state = { Name: "Will L.",
                        showName: false,
                        Gender: "Male",
                        Age: 20,
                        Height: "180",
                        showHeight: false,
                        Birthday: "1999/11/14",
                        showBirthday: false }
      }
    
    logOut = () => {
        return Alert.alert(
            'Logging Out',
            'All unsaved information will be lost',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Log Out', onPress: () => this.props.navigation.navigate("Login")},
            ],
            {cancelable: false},
          );
    }

    render() {
        return (
            <View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.header}></View>
                <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
                <Text style={styles.text}>press and hold field to edit</Text> 
                <View style={styles.bodyContent}>
                    <TouchableHighlight style={styles.buttonContainer} onLongPress={()=>{this.setState({showName: !this.state.showName})}}>
                        <Text>Username: {this.state.Name}</Text>
                    </TouchableHighlight>
                    {this.state.showName ? <View style={styles.editinfo}><TextInput style={styles.textInput} 
                                            onChangeText={(text) => this.setState({Name: text})} value={this.state.Name}/>
                                            <Button title="Save" onPress={()=>{this.setState({showName: !this.state.showName})}}/></View>
                    : null}
                    <TouchableHighlight style={styles.buttonContainer} onLongPress={()=>{this.setState({showBirthday: !this.state.showBirthday})}}>
                        <Text>Birthday: {this.state.Birthday}</Text>
                    </TouchableHighlight>
                    {this.state.showBirthday ? <View style={styles.editinfo}><TextInput style={styles.textInput} 
                                            onChangeText={(text) => this.setState({Birthday: text})} value={this.state.Birthday}/>
                                            <Button title="Save" onPress={()=>{this.setState({showBirthday: !this.state.showBirthday})}}/></View>
                    : null}
                    <TouchableHighlight style={styles.buttonContainer} onLongPress={()=>{this.setState({showHeight: !this.state.showHeight})}}>
                        <Text>Height(cm): {this.state.Height}</Text>
                    </TouchableHighlight>
                    {this.state.showHeight ? <View style={styles.editinfo}><TextInput style={styles.textInput} 
                                            onChangeText={(text) => this.setState({Height: text})} value={this.state.Height}/>
                                            <Button title="Save" onPress={()=>{this.setState({showHeight: !this.state.showHeight})}}/></View>
                    : null}
                    <TouchableHighlight style={styles.buttonContainer}>
                        <Text>Gender: {this.state.Gender}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.buttonContainer}>
                        <Text>Age: {this.state.Age}</Text>
                    </TouchableHighlight>
                    <Button title= "Log Out" style={styles.buttonContainer} onPress={this.logOut}/>
                </View>
            </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00BFFF",
        height: 140,
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
        marginTop: 80
    },
    body: {
        marginTop: 50,
    },
    bodyContent: {
        flex: 3,
        alignItems: 'center',
        padding: 30,
        flexDirection: "column"
        
    },
    inputContent: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
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
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 20,
        backgroundColor: "#00BFFF",
    },
    text: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 70,
        fontSize: 15,
        textAlign: 'center'
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'center'
    },
    editinfo: {
        width: 200,
        height: 75,
    },
    scrollView: {
        margin: 5
    }
});
