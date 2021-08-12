import PushNotification from 'react-native-push-notification';

//! JSON SERIALIZES ONLY INITIALIZED FIELDS. EVEN INITIALIZED WITH null

// Object template. such objects are passed to create notification.
export class NotificationData {
  title = 'Notification';
  message = 'Default Message';
  dateISO = '';
  id = '';
  origin = 'default';
  // feel free to initialize more fields when you need them on the fly.
  // but mind that they have to be valid notification props. if you want custom
  // data, pass it in the userInfo: {} prop.
}

export function createNotification(notificationData) {
  // I'm not passing the object itself, since the notificationData object
  // is just a template that allows to create a notification using this
  // function, while also being slim enough to be stored.
  // (I don''t want to store the whole notification data, just essentials)
  PushNotification.localNotificationSchedule({
    id: notificationData.id,
    title: notificationData.title,
    message: notificationData.message,
    date: new Date(notificationData.dateISO),
    repeatType: notificationData.repeatType,
    repeatTime: notificationData.repeatTime,
    userInfo: notificationData.userInfo,
    allowWhileIdle: notificationData.allowWhileIdle || true,
    channelId: notificationData.channelId || 'main',
  });
}

export function removeNotification(id) {
  PushNotification.cancelLocalNotifications({id: id});
}

export function editNotification(id, newNotificationData) {
  removeNotification(id);
  createNotification(newNotificationData);
}

// this isin't called in any sort of contructor so that we have control and
// possibility to remove a notification and set a new one with the same ID
// don't know if we need that possibility, but still, what the hell, we'll see.
export function generateID() {
  return (((Math.random() * 4294967296) / 2 - 1) >>> 0).toString();
}
