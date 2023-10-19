import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, ToastAndroid, Text} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import color from '../../themes/color';
import timeUtil from '../../utils/time_util';

const {useImperativeHandle} = React;

const AudioRecordButton = (props, ref) => {
  const [recordDuration, setRecordDuration] = useState(0)
  const [isRecording, setIsRecording] = useState(false)

  useImperativeHandle(ref, () => ({
    updateRecordDuration,
    updateIsRecording,
  }));

  const updateRecordDuration = (duration) => {
    setRecordDuration(duration);
  }

  const updateIsRecording = (status) => {
    setIsRecording(status);
  }

  const renderRecordTime = () => {
    return (
      <Text style={{fontWeight: 'bold', fontSize: 18}}>
        { timeUtil.getTimeFromDuration(recordDuration) }
      </Text>
    );
  };

  const showToastMessage = () => {
    ToastAndroid.showWithGravityAndOffset(
      "សូមចុចនិងសង្កត់លើប៊ូតុងដើម្បីថតសម្លេង",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      200
    );
  }

  return (
    <View>
      <View style={{alignItems: 'center', height: 30}}>
        { !!isRecording && renderRecordTime() }
      </View>

      <TouchableOpacity
        onLongPress={() => props.startRecording()}
        onPressOut={() => props.stopRecording()}
        onPress={() => showToastMessage()}
        style={[styles.voiceRecordButton, props.disabled && {backgroundColor: "#e0e0e0"}]}
        disabled={props.disabled}
      >
        <AwesomeIcon name="microphone" size={35} color={color.primaryColor} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  voiceRecordButton: {
    backgroundColor: color.whiteColor,
    borderWidth: 3,
    borderColor: color.primaryColor,
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default React.forwardRef(AudioRecordButton);