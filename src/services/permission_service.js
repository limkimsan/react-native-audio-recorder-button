import {Platform, PermissionsAndroid} from 'react-native';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';

const permissionService = (() => {
  return {
    checkMicrophonePermission
  }

  function checkMicrophonePermission(androidRequestTitle, androidRequestDescription, successCallback, showToastMessage) {
    if (Platform.OS == 'ios')
      checkIOSPermission(successCallback, showToastMessage)
    else
      checkAndroidPermission(androidRequestTitle, androidRequestDescription, successCallback);
  }

  // private method
  function checkIOSPermission(successCallback, showToastMessage) {
    check(PERMISSIONS.IOS.MICROPHONE)
      .then((result) => {
        if (result == RESULTS.DENIED)
          request(PERMISSIONS.IOS.MICROPHONE);
        else if (result != RESULTS.GRANTED)
          !!showToastMessage && showToastMessage();
        else
          !!successCallback && successCallback();
      })
      .catch((error) => {
        console.log('check permission error = ', error)
      });
  }

  async function checkAndroidPermission(requestTitle, requestDescription, successCallback) {
    if (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)) {
      !!successCallback && successCallback();
      return;
    }

    const rationale = {
      'title': requestTitle,
      'message': requestDescription
    };
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale);
  }
})();

export default permissionService;