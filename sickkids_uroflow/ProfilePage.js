import React from "react";
import { Text, View, Button, Picker,TextInput} from "react-native";

function fake() {

}

class ProfilePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {gender: null,
                        height: null}
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    textAlign: "left"
                }}
            >
                <Text>user email: demo@sickkids.ca</Text>
                <Text>gender:</Text>
                <Picker
                  selectedValue={this.state.gender}
                  style={{ height: 50, width: 300 }}
                  onValueChange={(itemValue, itemIndex)=> this.setState({ gender: itemValue })}>
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                </Picker>
                <Text>height (in cm):</Text>
                <TextInput
                        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 5 }}
                        autoCompleteType='cc-number'
                        keyboardType='number-pad'
                        onChangeText={height => this.setState({ height })}
                        value={this.state.height}
                      />
                <Button
                      onPress={fake}
                      title="submit"
                      color="#841584"
                      accessibilityLabel="submit"
                />
                <Button
                      onPress={fake}
                      title="logoff"
                      color="red"
                      accessibilityLabel="logoff"
                />
            </View>
        );
    }
}

export default ProfilePage;