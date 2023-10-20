import * as React from 'react';

import { View } from 'react-native';
import AudioRecorder from 'react-native-audio-recorder-button';

export default function App() {

  return (
    <View>
      <AudioRecorder
        filename='testing-voice-record.mp4'
        onFinishRecord={(filePath) => {console.log('==== recorded file path = ', filePath)}}
        containerStyle={{padding: 20}}
        primaryColor={'green'}
      />
    </View>
  );
}