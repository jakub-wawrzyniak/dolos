import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },

  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },

  requestPermissions: Platform.OS === 'ios',
});

PushNotification.createChannel({
  channelId: 'main',
  channelName: 'Main Channel',
});

AppRegistry.registerComponent(appName, () => App);
