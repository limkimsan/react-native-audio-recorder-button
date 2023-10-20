import {Platform} from 'react-native';
import Sound from 'react-native-sound';

// Notice: The audio file must have the Bit Rate Mode as Constant in order to prevent the library from
// returning invalid audio duration

const audioPlayerService = (() => {
  return {
    play,
    playPause,
    stop,
    clearAllAudio,
  }

  function play(filename, itemId, playingId, callback) {
    if (itemId == playingId) return;    // prevent the player from playing the same audio muliple time overlap each other

    if (Platform.OS === 'ios') { Sound.enable(true); }

    const audioPlayer = new Sound(filename, '', (error) => {
      if (!!error)
        return console.log('failed to play audio = ', error);

      _playAudio(audioPlayer, callback);
    })
  }

  function playPause(audioPlayer, countInterval, callback) {
    if (!!countInterval) {
      clearInterval(countInterval);
      audioPlayer.pause();
      audioPlayer.getCurrentTime((seconds) => {
        callback(audioPlayer, seconds, audioPlayer.getDuration(), null);
      });
      return;
    }

    _playAudio(audioPlayer, callback, countInterval);
  }

  function stop(audioPlayer, countInterval) {
    clearInterval(countInterval);
    if (!audioPlayer)
      return;

    audioPlayer.stop();
  }

  function clearAllAudio() {
    if (!!global.audioPlayer || !!global.countInterval) {
      global.audioPlayer.release();
      clearInterval(global.countInterval)
      global.audioPlayer = null;
      global.countInterval = null;
    }
  }

  // private method
  function _countPlaySeconds(audioPlayer, callback) {
    if (!audioPlayer)
      return null;

    const countInterval = setInterval(() => {
      audioPlayer.getCurrentTime((seconds) => {
        if (seconds == audioPlayer.getDuration())
          return clearInterval(countInterval);

        callback(audioPlayer, seconds, audioPlayer.getDuration(), countInterval);
      });
    }, 150);  // Use 150 ms to make the slider move smoother

    return countInterval;
  }

  function _playAudio(audioPlayer, callback, countInterval = null) {
    // Clear the previous counting and start a new count when start playing the audio
    clearInterval(countInterval);
    const countPlaySeconds = _countPlaySeconds(audioPlayer, callback);
    audioPlayer.play((success) => {
      if (success) {
        clearInterval(countPlaySeconds);
        audioPlayer.release();
        callback(null, 0, 0, null);     // reset the audioPlayer, playSeconds, duration and countInterval
      }
      else
        console.log('playback failed due to audio decoding errors');
    });
  }
})();

export default audioPlayerService;