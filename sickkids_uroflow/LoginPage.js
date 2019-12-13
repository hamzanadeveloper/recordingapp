import React from "react"
import { Text, View, Button, StyleSheet, TextInput } from "react-native"

import Constants from "expo-constants"
// const { manifest } = Constants
// import config from "./config.json"
import app from "./feathers-client.js"
// const url = config.url

// import { setJWT } from "./utils/auth"

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            isAuthenticated: false,

            newEmail: '',
            newPass: '',
            passwordConfirmation: ''
        }
    }

    authenticate = (options) => {
        console.log("Authentication Attempt")

        return app.authenticate({ strategy: 'local', ...options })
          .then(result => {
              console.log("Authentication Success")
              this.setState({ isAuthenticated: true })
              this.props.navigation.navigate("Record")
          })
          .catch((err) => {
              console.log("LoginPage: API call failed: ", err)
              this.setState({ isAuthenticated: false })
            }
          )
    }

    handleRegisterUser = () => {
        console.log("Registering new user")
        const { newEmail, newPass, passwordConfirmation } = this.state

        if (newPass !== passwordConfirmation) {
            return console.log('Your passwords do not match')
        }

        app.service('users').create({ email: newEmail, password: newPass })
          .then(() => this.authenticate({ strategy: 'local', email: newEmail, password: newPass }))
          .catch(err => console.log("Registration Failure: ", err))
    }

    // handleFeedback(status, body) {
    //     const token = body.token
    //     if (status == 200) {
    //         setJWT(token).then(res => {
    //             console.log("LoginPage: API call succeed")
    //             if (res) {
    //                 console.log(
    //                     "LoginPage: JWT stored, redirect to history page"
    //                 )
    //                 this.props.navigation.navigate("Record")
    //             } else {
    //                 alert("JWT token storation failed")
    //                 console.log("LoginPage: JWT storation failed")
    //             }
    //         })
    //     } else if (status == 404) {
    //         alert("User not found")
    //         console.log("LoginPage: 404: User not found")
    //     } else if (status == 400) {
    //         alert("Incorrect password")
    //         console.log("LoginPage: 400: Password entered not correct")
    //     }
    // }
    //
    // loginPressed = () => {
    //     let status = null
    //
    //     const data_base_url = url
    //         ? `${url}/login`
    //         : `http://${manifest.debuggerHost
    //               .split(`:`)
    //               .shift()
    //               .concat(`:3001/login`)}`  // Switch to the route you want to use
    //
    //     fetch(data_base_url, {
    //         method: "POST",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             email: this.state.email,
    //             password: this.state.password
    //         })
    //     })
    //         .then(result => {
    //             status = result.status
    //             return result.json()
    //         })
    //         .then(body => this.handleFeedback(status, body))
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }

    render() {
        const { email, password, newEmail, newPass, passwordConfirmation } = this.state
        return (
            <View
              style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  width: '100%',
                  position: 'absolute'
              }}
            >
                <Text style={{
                    fontFamily: 'Roboto',
                    fontSize: 28,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                }}>
                    Uroflow App
                </Text>
                <View>
                    <Text style={{
                        fontFamily: 'Roboto',
                        fontSize: 16,
                        fontWeight: '100',
                    }}>
                        Already have an account?
                    </Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={(email) => this.setState({ email })}
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Password"
                    autoCapitalize="none"
                    onChangeText={(password) => this.setState({ password })}
                    value={password}
                />
                <View style={{width: '30%'}}>
                    <Button style={{width: '100px'}} onPress={() => this.authenticate({ email, password })} title="Login" />
                </View>
                <View style={{
                    fontFamily: 'Roboto',
                    marginTop: 15,
                    marginBottom: 15,
                    fontSize: 22,
                    fontWeight: '100',
                    textAlign: 'center'
                }}>
                    <Text>OR</Text>
                </View>
                <Text style={{
                    fontFamily: 'Roboto',
                    fontSize: 16,
                    fontWeight: '100',
                }}>
                    Register as a new user
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  autoCapitalize="none"
                  onChangeText={(newEmail) => this.setState({ newEmail })}
                  value={newEmail}
                />
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder="Password"
                  autoCapitalize="none"
                  onChangeText={(newPass) => this.setState({ newPass })}
                  value={newPass}
                />
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder="Password"
                  autoCapitalize="none"
                  onChangeText={(passwordConfirmation) => this.setState({ passwordConfirmation })}
                  value={passwordConfirmation}
                />
                <View style={{width: '30%'}}>
                    <Button style={{width: '100px'}} onPress={this.handleRegisterUser} title="Sign Up" />
                </View>
            </View>
        )
    }
}

export default LoginPage

const styles = StyleSheet.create({
    input: {
        margin: 8,
        height: 40,
        width: 230,
        borderColor: "steelblue",
        borderWidth: 1,
        paddingLeft: 15
    },
    submitButton: {
        padding: 10,
        margin: 15,
        height: 40
    },
    submitButtonText: {
        color: "white"
    }
})
