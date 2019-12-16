import React from 'react';
import {
  Dimensions,
  Image,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  Navigator,
  Button,
  View,
} from 'react-native';
import { Asset } from 'expo-asset';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { SyntheticPlatformEmitter } from '@unimodules/core';
import app from "./feathers-client.js"

class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

const ICON_RECORD_BUTTON = new Icon(require('./assets/images/record_button.png'), 70, 119);
const ICON_RECORDING = new Icon(require('./assets/images/record_icon.png'), 20, 14);

const ICON_PLAY_BUTTON = new Icon(require('./assets/images/play_button.png'), 34, 51);
const ICON_STOP_BUTTON = new Icon(require('./assets/images/stop_button.png'), 22, 22);

const ICON_MUTED_BUTTON = new Icon(require('./assets/images/muted_button.png'), 67, 58);

const ICON_THUMB_1 = new Icon(require('./assets/images/thumb_1.png'), 18, 19);

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFFFFF';
const LIVE_COLOR = '#FF0000';
const DISABLED_OPACITY = 0.5;
const RATE_SCALE = 3.0;

const RecordOption = {
  android: {
    extension: '.wav',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: '.wav',
    outputFormat:Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};
export default class RecordPage extends React.Component {
  constructor(props) {
    super(props);
    this.recording = null;
    this.sound = null;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.state = {
      uri: null,
      haveRecordingPermissions: false,
      isLoading: false,
      isPlaybackAllowed: false,
      muted: false,
      soundPosition: null,
      soundDuration: null,
      recordingDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isRecording: false,
      fontLoaded: false,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
    };
    //this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));
    // // UNCOMMENT THIS TO TEST maxFileSize:
    // this.recordingSettings.android['maxFileSize'] = 12000;
    this.recordingSettings = JSON.parse(JSON.stringify(RecordOption));
  }

  componentDidMount() {
    (async () => {
      await Font.loadAsync({
        'cutive-mono-regular': require('./assets/fonts/CutiveMono-Regular.ttf'),
      });
      this.setState({ fontLoaded: true });
    })();
    this._askForPermissions();
  }

  _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      haveRecordingPermissions: response.status === 'granted',
    });
  };

  _updateScreenForSoundStatus = status => {
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis,
        soundPosition: status.positionMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        shouldCorrectPitch: status.shouldCorrectPitch,
        isPlaybackAllowed: true,
      });
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null,
        isPlaybackAllowed: false,
      });
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _updateScreenForRecordingStatus = status => {
    if(status.durationMillis > 60000){
      this._stopRecordingAndEnablePlayback();
    }
    else if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
      if (!this.state.isLoading) {
        this._stopRecordingAndEnablePlayback();
      }
    }
  };

  async _stopPlaybackAndBeginRecording() {
    this.setState({
      isLoading: true,
    });
    if (this.sound !== null) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

    this.recording = recording;
    await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
    this.setState({
      isLoading: false,
    });
  }

  async _stopRecordingAndEnablePlayback() {
    this.setState({
      isLoading: true,
    });
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
    const info = await FileSystem.getInfoAsync(this.recording.getURI());

    const contentURI = await FileSystem.readAsStringAsync(info.uri,
      { encoding: FileSystem.EncodingType.Base64 });

    this.setState({uri: info.uri})
    // console.log(`FILE INFO: ${JSON.stringify(info)}`);
    this.props.navigation.navigate('Result', {
      uri_info: info.uri,
      contentURI
    })

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    const { sound, status } = await this.recording.createNewLoadedSoundAsync(
      {
        isLooping: false,
        isMuted: this.state.muted,
        volume: this.state.volume,
        rate: this.state.rate,
        shouldCorrectPitch: this.state.shouldCorrectPitch,
      },
      this._updateScreenForSoundStatus
    );
    this.sound = sound;
    this.setState({
      isLoading: false,
    });
  }

  _onRecordPressed = () => {
    if (this.state.isRecording) {
      this._stopRecordingAndEnablePlayback();
    } else {
      this._stopPlaybackAndBeginRecording();
    }
  };

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  }

  _getRecordingTimestamp() {
    if (this.state.recordingDuration != null) {
      return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
    }
    return `${this._getMMSSFromMillis(0)}`;
  }

  render() {
    if(!this.state.fontLoaded) {
        return (
            <View style={styles.emptyContainer} />
        )
    }

    if (!this.state.haveRecordingPermissions){
        return (
            <View style={styles.container}>
                <View />
                <Text style={[styles.noPermissionsText, { fontFamily: 'cutive-mono-regular' }]}>
                  You must enable audio recording permissions in order to use this app.
                </Text>
                <View />
            </View>
        )
    }

    return (
      <View style={styles.container}>
          <View style={styles.recordButtonContainer}>
            <TouchableHighlight
              underlayColor={BACKGROUND_COLOR}
              onPress={this._onRecordPressed}
              disabled={this.state.isLoading}>
              <Ionicons name="ios-microphone" size={90} style={[styles.image, { opacity: this.state.isRecording ? 0.7 : 1.0 }]}/>
            </TouchableHighlight>
          </View>
          <View style={styles.infoContainer}>
            <Text style={{ fontFamily: 'cutive-mono-regular'}}>
                { this.state.isRecording ? "Press to end recording" : "Press to begin recording" }
            </Text>
          </View>
          { this.state.isRecording ?
            <View style={styles.recordingDataContainer}>
              <Text style={[styles.liveText, { fontFamily: 'cutive-mono-regular' }]}>Live</Text>
              <View style={{flexDirection: "row"}}>
                <Image
                    style={[styles.image, {marginRight: 5}]}
                    source={ICON_RECORDING.module}
                  />
                <Text style={{ fontFamily: 'cutive-mono-regular' }}>
                  {this._getRecordingTimestamp()}
                </Text>
              </View>
            </View> :
            <View style={styles.recordingDataContainer}>
              <Text style={{ fontFamily: 'cutive-mono-regular' }}>
                {this._getRecordingTimestamp()}
              </Text>
            </View> }
        </View>
    );
  }
}
RecordPage.navigationOptions = {
  title: "Record"
};

const styles = StyleSheet.create({
  emptyContainer: {
    alignSelf: 'stretch',
    backgroundColor: BACKGROUND_COLOR,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
    minWidth: DEVICE_WIDTH,
    maxWidth: DEVICE_WIDTH,
    minHeight: DEVICE_HEIGHT,
    maxHeight: DEVICE_HEIGHT,
  },
  noPermissionsText: {
    textAlign: 'center',
  },
  recordButtonContainer: {
    top: '30%',
    backgroundColor: BACKGROUND_COLOR
  },
  recordingDataContainer: {
    top: '40%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  infoContainer: {
    top: '10%'
  },
  liveText: {
    color: LIVE_COLOR,
  },
  image: {
    backgroundColor: BACKGROUND_COLOR
  },
});
