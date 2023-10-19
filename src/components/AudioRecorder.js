import React, {useEffect, useReducer, useRef} from 'react';
import {View, PermissionsAndroid, Platform} from 'react-native';
import {Recorder} from '@react-native-community/audio-toolkit';
import Toast, { DURATION } from 'react-native-easy-toast';

import AudioRecordButton from './AudioRecordButton';
import RecordedAudio from './RecordedAudio';

const AudioRecorder = (props) => {
  const recorder = useRef(null);
  const recorderInterval = useRef(null);
  const recordDuration = useRef(0);
  const recordBtnRef = useRef(null);
  const filename = useRef(`${props.filename}.mp3`);
  const hasPermission = useRef(false)
  const toastRef = useRef()
  const [state, setState] = useReducer((prev, next) => {
    return {...prev, ...next}
  }, {
    isRecordButtonVisible: true,
    isPlaying: false,
    playSeconds: 0,
    recordedFile: null,
  });

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = () => {
    const rationale = {
      'title': 'Microphone Permission',
      'message': 'This mobile app require your microphone permission in order to be able to record the voice.'
    };

    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      .then((result) => {hasPermission.current = (result === true || result === PermissionsAndroid.RESULTS.GRANTED)});
  }

  const startRecording = () => {
    if (!hasPermission.current) {
      requestPermission();
      return;
    }

    recorder.current = new Recorder(filename.current, {format: 'mp3'});
    recorder.current.prepare(() => {
      recorder.current.record(() => {
        recordBtnRef.current?.updateIsRecording(true);
        recorderInterval.current = setInterval(() => {
          recordBtnRef.current?.updateRecordDuration(recordDuration.current += 1);
        }, 1000);
      });
    });
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
      hasPermission: false,
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
              uuid={props.filename}
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