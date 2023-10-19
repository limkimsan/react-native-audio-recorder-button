import React, {useEffect, useReducer, useRef} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';

import colors from '../constants/colors';
import timeUtil from '../utils/time_util';
import audioPlayerService from '../services/audio_player_service';

const RecordedAudio = (props) => {
  const currentAudioPlayer = useRef(null);
  const playInterval = useRef(null);
  const isComponentUnmount = useRef(false);
  const [state, setState] = useReducer((prev, next) => {
    return {...prev, ...next}
  }, {
    isPlaying: false,
    playSeconds: props.audioDuration,
  });

  useEffect(() => {
    return () => isComponentUnmount.current = true;
  }, []);

  const togglePlayAudio = () => {
    if (!currentAudioPlayer.current) {
      setState({isPlaying: true})
      audioPlayerService.play(props.recordedFile, props.filename, null, (audioPlayer, playSeconds, duration, countInterval) => {
        currentAudioPlayer.current = audioPlayer;
        playInterval.current = countInterval;
        setState({playSeconds: playSeconds});

        if (playSeconds >= duration)
          resetPlay();
      });
    }
    else {
      audioPlayerService.stop(currentAudioPlayer.current, playInterval.current);
      resetPlay();
    }
  }

  const resetPlay = () => {
    setState({
      isPlaying: false,
      playSeconds: props.audioDuration,
    });
    currentAudioPlayer.current = null;
    playInterval.current = null;
  }

  const deleteRecord = () => {
    !!currentAudioPlayer.current && currentAudioPlayer.current?.release()
    audioPlayerService.clearAllAudio();
    resetPlay();
    props.resetRecorder();
  }

  const btnColor = props.primaryColor || colors.primary;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => togglePlayAudio()} style={[styles.btnPlay, {borderColor: btnColor}]}>
        { state.isPlaying ? <IonIcon name="pause" style={[{fontSize: 28, color: btnColor, marginLeft: 1}, props.pauseIconStyle]} />
          : <IonIcon name="play" style={[{fontSize: 28, color: btnColor, marginLeft: 3}, props.playIconStyle]} />
        }
      </TouchableOpacity>

      <View style={{flex: 1, paddingHorizontal: 16}}>
        <Text style={[{fontSize: 18, fontWeight: 'bold', color: colors.lightBlack}, props.playDurationLabelStyle]}>
          {timeUtil.getTimeFromDuration(state.playSeconds)}
        </Text>
      </View>

      <TouchableOpacity onPress={ () => deleteRecord() } style={styles.btnDelete}>
        <AwesomeIcon name="trash-o" size={30} color={colors.lightRed} style={{marginRight: 6}} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 4,
    paddingVertical: 14,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  btnPlay: {
    alignItems: 'center',
    borderRadius: 48,
    borderWidth: 3,
    justifyContent: 'center',
    height: 48,
    width: 48,
  },
  btnDelete: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 48,
  }
});

export default RecordedAudio;