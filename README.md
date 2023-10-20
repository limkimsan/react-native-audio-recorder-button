# react-native-audio-recorder

React Native Audio Recorder is a component for recording the audio and can play the recorded audio.

## Installation

```sh
npm install react-native-audio-recorder
```

## Installing dependencies

```sh
npm install react-native-vector-icons react-native-sound @react-native-community/audio-toolkit react-native-easy-toast
```
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
- [react-native-sound](https://github.com/zmxv/react-native-sound)
- [@react-native-community/audio-toolkit](https://github.com/react-native-audio-toolkit/react-native-audio-toolkit)
- [react-native-easy-toast](https://github.com/crazycodeboy/react-native-easy-toast)

## Usage

```js
import AudioRecorder from 'react-native-audio-recorder';

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
| filename                    |      ''       |  `string`  |   `false`  | Filename of the recorded audio               |
| disabled                    |     false     |  `boolean` |   `true`   | Status to disable the record button               |
| primaryColor                |   '#1b91f7'   |  `string`  |   `true`   | Primary color of the buttons               |
| instructionToastMessage     |      ''       |  `string`  |   `true`   | Toast message that will show when pressed on the record button (not long press)       |
| androidPermissionTitle      |      ''       |  `string`  |   `true`   | The title of the request microphone permission on Android        |
| androidPermissionDescription|      ''       |  `string`  |   `true`   | The description of the request microphone permission on Android       |
| iOSPermissionTitle          |      ''       |  `string`  |   `true`   | The title of the request microphone permission on iOS        |
| iOSPermissionDescription    |      ''       |  `string`  |   `true`   | The description of the request microphone permission on iOS       |
| onFinishRecord              |      {}       | `function` |   `true`   | The function that will called when stop recording. It returns with the recorded audio file path |


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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
