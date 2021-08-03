import PushNotification from 'react-native-push-notification';

export const createReminder = ({
  id, // we have to give custom ID so that we can track it.
  title,
  message,
  date,
  repeatTime,
  userData,
}) => {
  PushNotification.localNotificationSchedule({
    id: id,
    title: 'Reminder!' || title,
    message: message,
    date: date,
    repeatTime: 1 || repeatTime,
    userInfo: {} || userData,
    allowWhileIdle: true,
    channelId: 'main',
  });
};

export const generateID = () => {
  // Might want to change that in the future.
  return ((Math.random() * 4294967296) / 2 - 1) >>> 0;
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
export const cancelAllNotifications = () => {
  console.log('Cancelling...');
  PushNotification.cancelAllLocalNotifications();
};
export const getAllReminders = () =>
  PushNotification.getScheduledLocalNotifications(all => {
    all.forEach(elem => {
      console.log(elem);
    });
  });

// this seemed async (when doing multiple logs) and thus this horror was born.
export const getNotificationDateFormat = async function (id) {
  let string = 'dupa';
  await new Promise((resolve, reject) => {
    PushNotification.getScheduledLocalNotifications(notifications => {
      notifications.every(notification => {
        if (notification.id == id) {
          const d = notification.date;
          string = `0${d.getDay() + 1}-${
            d.getMonth() < 10 ? 0 : ''
          }${d.getMonth()}-${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
          return false;
        }
        return true;
      });
      resolve(string);
    });
  }).then(returnval => {
    string = returnval;
  });
  return string;
};
