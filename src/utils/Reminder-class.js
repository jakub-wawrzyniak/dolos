import PushNotification from 'react-native-push-notification';

// Reasoning: Only message and date have custom setters since these will be
// updated most frequently (I imagine), if you want to update the rest, just
// remember to call updateNotification() method.

class Reminder {
  static #instances = [];
  static get instances() {
    return this.#instances;
  }

  #id;
  #date;
  #message;
  #hasNotification;

  constructor(date, message) {
    this.#date = date;
    this.#message = message;
    this.#id = this.generateID(); // is also a notification ID
    this.title = 'Reminder!';
    this.repeatType = ''; // month, week, day, hour, minute, time
    this.repeatTime = 0; // if type = day, repert time = 1 means every day.
    this.userInfo = {};
    this.createNotification(); //? should this be here or we call this manually?
    Reminder.#instances.push({
      id: this.id,
      date: this.date,
      message: this.message,
      hasNotification: this.hasNotification,
    });
  }

  //#region getters & setters
  get id() {
    return this.#id;
  }

  get hasNotification() {
    return this.#hasNotification;
  }

  get date() {
    return this.#date;
  }
  set date(val) {
    if (val instanceof Date) {
      this.#date = val;
      this.updateNotification();
    } else {
      throw 'Invalid Date. Must be a Date object.';
    }
  }

  get message() {
    return this.#message;
  }
  set message(val) {
    if (typeof val === 'string') {
      this.#message = val;
      this.updateNotification();
    } else {
      throw 'Message must be a string';
    }
  }
  //#endregion

  generateID() {
    // Might want to change that in the future.
    return (((Math.random() * 4294967296) / 2 - 1) >>> 0).toString();
  }

  createNotification() {
    PushNotification.localNotificationSchedule({
      id: this.id,
      title: this.title,
      message: this.message,
      date: this.date,
      repeatType: this.repeatType,
      repeatTime: this.repeatTime,
      userInfo: this.userInfo,
      allowWhileIdle: true,
      channelId: 'main',
    });
    this.#hasNotification = true;
  }

  removeNotification() {
    PushNotification.cancelLocalNotifications({id: this.id});
    this.#hasNotification = false;
  }

  updateNotification() {
    PushNotification.getScheduledLocalNotifications(notifications => {
      notifications.every(notification => {
        if (notification.id === this.id) {
          this.removeNotification();
          this.createNotification();
          return false; // break
        }
        return true;
      });
    });
  }

  static cancelAll() {
    console.log('Cancelling all Schduled notifications.');
    PushNotification.cancelAllLocalNotifications();
    Reminder.#instances = [];
  }
}

export default Reminder;
