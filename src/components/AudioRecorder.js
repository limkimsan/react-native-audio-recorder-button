import React, {useReducer, useRef} from 'react';
import {View, Platform} from 'react-native';
import {Recorder} from '@react-native-community/audio-toolkit';
import Toast, { DURATION } from 'react-native-easy-toast';

import AudioRecordButton from './AudioRecordButton';
import RecordedAudio from './RecordedAudio';
import permissionService from '../services/permission_service';

const AudioRecorder = (props) => {
  const recorder = useRef(null);
  const recorderInterval = useRef(null);
  const recordDuration = useRef(0);
  const recordBtnRef = useRef(null);
  const filename = useRef(`${props.filename}.mp4`);
  const toastRef = useRef(null)
  const [state, setState] = useReducer((prev, next) => {
    return {...prev, ...next}
  }, {
    isRecordButtonVisible: true,
    isPlaying: false,
    playSeconds: 0,
    recordedFile: null,
  });

  const startRecording = () => {
    permissionService.checkMicrophonePermission('Microphone Permission', 'This mobile app require your microphone permission in order to be able to record the voice.',
      () => {
        recorder.current = new Recorder(filename.current);
        recorder.current.prepare(() => {
          recorder.current.record(() => {
            recordBtnRef.current?.updateIsRecording(true);
            recorderInterval.current = setInterval(() => {
              recordBtnRef.current?.updateRecordDuration(recordDuration.current += 1);
            }, 1000);
          });
        });
      },
      () => {toastRef.current?.show("Please turn on the permission to use the microhone in the setting", 3000)}
    )
  }

  const stopRecording = () => {
    if (recorder.current === null) return;

    recordBtnRef.current?.updateIsRecording(false);
    clearInterval(recorderInterval.current);
    recorder.current.stop(() => {
      setState({
        isRecordButtonVisible: false,
        recordedFile: recorder.current.fsPath
      });
      !!props.onFinishRecord && props.onFinishRecord(recorder.current.fsPath);
    });
  };

  const resetRecorder = () => {
    if (!recorder.current) return;

    recorder.current.destroy();
    recorder.current = null;
    recorderInterval.current = null;
    recordDuration.current = 0;

    setState({
      isRecordButtonVisible: true,
      isPlaying: false,
      playSeconds: 0,
      recordedFile: null,
    })
  }

  const renderRecordButton = () => {
    const toastMessage = props.toastMessage || 'សូមចុច និងសង្កត់លើប៊ូតុងដើម្បីថតសម្លេង'
    return <AudioRecordButton
              ref={recordBtnRef}
              recordDuration={recordDuration.current}
              disabled={props.disabled}
              startRecording={() => startRecording()}
              stopRecording={() => stopRecording()}
              showToastMessage={() => toastRef.current?.show(toastMessage, DURATION.SHORT)}
              primaryColor={props.primaryColor}
              recordDurationLabelStyle={props.recordDurationLabelStyle}
              recordButtonStyle={props.recordButtonStyle}
              micIconStyle={props.micIconStyle}
           />
  }

  const renderRecordedAudio = () => {
    return <RecordedAudio
              recordedFile={state.recordedFile}
              filename={props.filename}
              audioDuration={recordDuration.current}
              resetRecorder={() => resetRecorder()}
              primaryColor={props.primaryColor}
              playDurationLabelStyle={props.playDurationLabelStyle}
              playIconStyle={props.playIconStyle}
              pauseIconStyle={props.pauseIconStyle}
           />
  }

  return (
    <React.Fragment>
      <View style={props.containerStyle}>
        {state.isRecordButtonVisible && renderRecordButton()}
        {!state.isRecordButtonVisible && renderRecordedAudio()}
      </View>
      <Toast ref={toastRef} positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
    </React.Fragment>
  )
}

export default AudioRecorder;