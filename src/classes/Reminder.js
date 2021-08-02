import PushNotification from 'react-native-push-notification';

export const createReminder = ({
  title,
  message,
  date,
  repeatTime,
  userData,
}) => {
  PushNotification.localNotificationSchedule({
    title: 'Reminder!' || title,
    message: message,
    date: date,
    allowWhileIdle: true,
    channelId: 'main',
    repeatTime: 1 || repeatTime,
    userInfo: {} || userData,
  });
};

export const editReminder = (id, {title, message, date, userData}) => {
  PushNotification.getScheduledLocalNotifications(notifications => {
    notifications.every(notification => {
      if (notification.id === id) {
        title = title || notification.title;
        date = date || notification.date;
        message = message || notification.message;
        userData = userData || notification.data;
        return false;
      }
      return true;
    });
  });
  PushNotification.cancelLocalNotifications({id: id});
  createReminder({title, message, date, userData});
};

export const getAllReminders = () =>
  PushNotification.getScheduledLocalNotifications(all => {
    all.forEach(elem => {
      console.log(elem);
    });
  });
