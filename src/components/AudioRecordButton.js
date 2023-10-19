import React, {useEffect, useReducer, useRef} from 'react';
import {View, PermissionsAndroid} from 'react-native';
import {Recorder} from '@react-native-community/audio-toolkit';

import VoiceRecordButtonComponent from './VoiceRecordButtonComponent';
import RecordedAudioComponent from './RecordedAudioComponent';

const AudioRecordButton = (props) => {
  const recorder = useRef(null);
  const recorderInterval = useRef(null);
  const recordDuration = useRef(0);
  const recordBtnRef = useRef(null);
  const filename = useRef(`${props.uuid}.mp3`);
  const hasPermission = useRef(false)
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
      // props.finishRecord(recorder.current.fsPath);
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
    return <VoiceRecordButtonComponent
              ref={recordBtnRef}
              recordDuration={recordDuration.current}
              disabled={props.disabled}
              startRecording={() => startRecording()}
              stopRecording={() => stopRecording()}
           />
  }

  const renderRecordedAudio = () => {
    return <RecordedAudioComponent
              recordedFile={state.recordedFile}
              uuid={props.uuid}
              audioDuration={recordDuration.current}
              resetRecorder={() => resetRecorder()}
           />
  }

  return (
    <View style={{borderWidth: 1, padding: 20}}>
      {state.isRecordButtonVisible && renderRecordButton()}
      {!state.isRecordButtonVisible && renderRecordedAudio()}
    </View>
  )
}

export default AudioRecordButton;