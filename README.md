# react-native-audio-recorder-button

React Native Audio Recorder Button is a component for recording the audio and can play the recorded audio.

<span>
  <img src="https://github.com/limkimsan/react-native-audio-recorder-button/assets/18114944/68f7aaae-3a08-4c1d-b36f-7ad007ca19a6" width="270" height="550" />
</span>
<span>
  <img src="https://github.com/limkimsan/react-native-audio-recorder-button/assets/18114944/bf284b27-dad7-43c3-8c92-60d752c22a06" width="270" height="550" />
</span>


## Installation

```sh
npm install react-native-audio-recorder-button
```

## Installing dependencies

```sh
npm install react-native-permissions react-native-vector-icons react-native-sound @react-native-community/audio-toolkit react-native-easy-toast
```
- [react-native-permissions](https://github.com/zoontek/react-native-permissions) (follow the instruction in the doc to enable the permission)
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
- [react-native-sound](https://github.com/zmxv/react-native-sound)
- [@react-native-community/audio-toolkit](https://github.com/react-native-audio-toolkit/react-native-audio-toolkit)
- [react-native-easy-toast](https://github.com/crazycodeboy/react-native-easy-toast)

## Usage

```js
import AudioRecorder from 'react-native-audio-recorder-button';

// ...

<AudioRecorder
  filename='AUDIO_FILENAME'
  onFinishRecord={(filePath) => {}}
  containerStyle={{padding: 20}}
  ...
/>
```

## Properties
#### Basic

| Prop                        |    Default    |    Type    |  Optional  | Description                                                                |
| :-------------------------- | :-----------: | :--------: | :--------: | :------------------------------------------------------------------------- |
| filename                    |      ''       |  `string`  |   `false`  | Filename of the recorded audio  (ex: test-audio.mp4)        |
| disabled                    |     false     |  `boolean` |   `true`   | Status to disable the record button               |
| primaryColor                |   '#1b91f7'   |  `string`  |   `true`   | Primary color of the buttons               |
| instructionToastMessage     |      ''       |  `string`  |   `true`   | Toast message that will show when pressed on the record button (not long press)       |
| androidPermissionTitle      |      ''       |  `string`  |   `true`   | The title of the request microphone permission on Android        |
| androidPermissionDescription|      ''       |  `string`  |   `true`   | The description of the request microphone permission on Android       |
| iOSPermissionTitle          |      ''       |  `string`  |   `true`   | The title of the request microphone permission on iOS        |
| iOSPermissionDescription    |      ''       |  `string`  |   `true`   | The description of the request microphone permission on iOS       |
| iOSAlertCancelLabel         |     'បិទ'      |  `string`  |   `true`   | The left button label of the iOS permission alert          |
| iOSAlertSettingsLabel       |    'ការកំណត់'   |  `string`  |   `true`   | The right button label of the iOS permission alert         |
| onFinishRecord              |      {}       | `function` |   `true`   | The function that will called when stop recording. It returns with the recorded audio file path and recorded audio duration |
| onDeleteAudio               |      {}       | `function` |   `true`   | The function that will called deleteing the recorded audio   |


#### Custom styles

| Prop                        |   Default   |   Type    |  Optional  | Description                                                |
| :-------------------------- | :---------: | :-------: | :--------: | :--------------------------------------------------------- |
| containerStyle              |    {...}    |  `style`  |   `true`   | Style of the recorder container                            |
| recordDurationLabelStyle    |    {...}    |  `style`  |   `true`   | Style of the record duration label                         |
| recordButtonStyle           |    {...}    |  `style`  |   `true`   | Style of the record button                        |
| micIconStyle                |    {...}    |  `style`  |   `true`   | Style of the record button microphone icon             |
| playDurationLabelStyle      |    {...}    |  `style`  |   `true`   | Style of the playing audio duration label          |
| playIconStyle               |    {...}    |  `style`  |   `true`   | Style of the play icon style             |
| pauseIconStyle              |    {...}    |  `style`  |   `true`   | Style of the pause icon style            |

#### Ref method
| Prop                    |   Type    |  Optional  | Description                                                |
| :---------------------- | :-------: | :--------: | :--------------------------------------------------------- |
| setRecordButtonVisible  | `fuction` |  Optional  | A reference fuction to set the visibility of the record button (ex: audioRef.current?.setRecordButtonVisible(true)) |
| setRecordedFile         | `fuction` |  Optional  | A reference fuction to set audio file path and its duration (ex: audioRef.current?.setRecoredFile(FILE_PATH, 10)) |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
