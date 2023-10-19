import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Platform} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Toast, { DURATION } from 'react-native-easy-toast';

import colors from '../constants/colors';
import timeUtil from '../utils/time_util';

const {useImperativeHandle} = React;

const AudioRecordButton = (props, ref) => {
  const [recordDuration, setRecordDuration] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const toastRef = useRef()

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
      <Text style={[{fontWeight: 'bold', fontSize: 18}, props.recordDurationLabelStyle]}>
        { timeUtil.getTimeFromDuration(recordDuration) }
      </Text>
    );
  };

  const showToastMessage = () => {
    toastRef.current?.show('សូមចុច និងសង្កត់លើប៊ូតុងដើម្បីថតសម្លេង', DURATION.SHORT);
  }

  const btnColor = props.disabled ? colors.disabled : props.primaryColor || colors.primary;
  return (
    <View>
      <View style={{alignItems: 'center', height: 30}}>
        { !!isRecording && renderRecordTime() }
      </View>

      <TouchableOpacity
        onLongPress={() => props.startRecording()}
        onPressOut={() => props.stopRecording()}
        onPress={() => showToastMessage()}
        style={[styles.voiceRecordButton, {borderColor: btnColor}]}
        disabled={props.disabled}
      >
        <AwesomeIcon name="microphone" size={35} color={btnColor} />
      </TouchableOpacity>

      <Toast ref={toastRef} positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
    </View>
  )
}

const styles = StyleSheet.create({
  voiceRecordButton: {
    backgroundColor: 'white',
    borderWidth: 3,
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