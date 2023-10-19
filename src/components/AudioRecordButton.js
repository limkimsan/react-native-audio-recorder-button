import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import colors from '../constants/colors';
import timeUtil from '../utils/time_util';

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
      <Text style={[{fontWeight: 'bold', fontSize: 18, color: colors.lightBlack}, props.recordDurationLabelStyle]}>
        { timeUtil.getTimeFromDuration(recordDuration) }
      </Text>
    );
  };

  const btnColor = props.disabled ? colors.disabled : props.primaryColor || colors.primary;
  return (
    <View>
      <View style={{alignItems: 'center', height: 30}}>
        { !!isRecording && renderRecordTime() }
      </View>

      <TouchableOpacity
        onLongPress={() => props.startRecording()}
        onPressOut={() => props.stopRecording()}
        onPress={() => props.showToastMessage()}
        style={[styles.voiceRecordButton, {borderColor: btnColor}, props.recordButtonStyle, isRecording && {opacity: 0.2}]}
        disabled={props.disabled}
      >
        <AwesomeIcon name="microphone" style={[{fontSize: 35, color: btnColor}, props.micIconStyle]} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  voiceRecordButton: {
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