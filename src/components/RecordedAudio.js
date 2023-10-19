import React, {useEffect, useReducer, useRef} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';

import color from '../../themes/color';
import timeUtil from '../../utils/time_util';
import audioPlayerService from '../../services/audio_player_service';

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
      audioPlayerService.play(props.recordedFile, props.uuid, null, (audioPlayer, playSeconds, duration, countInterval) => {
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
    if (currentAudioPlayer.current != null)
      currentAudioPlayer.release();

    resetPlay();
    props.resetRecorder();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => togglePlayAudio()} style={styles.btnPlay}>
        { state.isPlaying ? <IonIcon name="pause" size={28} color={color.primaryColor} style={{marginLeft: 1}} />
          : <IonIcon name="play" size={28} color={color.primaryColor} style={{marginLeft: 3}} />
        }
      </TouchableOpacity>

      <View style={{flex: 1, paddingHorizontal: 16}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: color.lightBlackColor}}>{timeUtil.getTimeFromDuration(state.playSeconds)}</Text>
      </View>

      <TouchableOpacity onPress={ () => deleteRecord() } style={styles.btnDelete}>
        <AwesomeIcon name="trash-o" size={30} color='rgb(228, 74, 74)' style={{marginRight: 6}} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,

    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 4,
    paddingVertical: 14
  },
  btnPlay: {
    height: 48,
    width: 48,
    borderWidth: 3,
    borderColor: color.primaryColor,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnDelete: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 48,
  }
});

export default RecordedAudio;