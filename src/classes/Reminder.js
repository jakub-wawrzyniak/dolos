import PushNotification from 'react-native-push-notification';

export const createReminder = ({
  title,
  message,
  date,
  repeatTime,
  userData,
}) => {
  PushNotification.localNotificationSchedule({
    title: title,
    message: message,
    date: date,
    allowWhileIdle: true,
    channelId: 'main',
    repeatTime: 1 || repeatTime,
    userInfo: userData,
  });
};

export const getAllReminders = () =>
  PushNotification.getScheduledLocalNotifications(all => {
    all.forEach(elem => {
      console.log(elem);
    });
  });
