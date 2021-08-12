import PushNotification from 'react-native-push-notification';

// Reasoning: Only message and date have custom setters since these will be
// updated most frequently (I imagine), if you want to update the rest, just
// remember to call updateNotification() method.

/**
 * @deprecated Use notificationHandler.js's functions. This class will
 * be removed in the future.
 */
class Reminder {
  //! Instances are not stored properly due to private fields, have to revive.
  static #instances = [];
  static get instances() {
    return this.#instances;
  }

  #id;
  #date;
  #message;
  #hasNotification;

  constructor(date, message, origin = 'default') {
    console.warn(
      `DEPRECATED - Use notificationHandler.js's functions.
      This class will  be removed in the future`,
    );
    this.#date = date;
    this.#message = message;
    this.#id = this.generateID(); // is also a notification ID
    this.origin = origin; // like: this was created from todo list
    this.title = 'Reminder!';
    this.repeatType = ''; // month, week, day, hour, minute, time
    this.repeatTime = 0; // if type = day, repert time = 1 means every day.
    this.userInfo = {};
    this.createNotification(); //? should this be here or we call this manually?
    // @wojtek I think it should be here cuz theres no point to have such
    // constructor if it's not here. also, why would we create a reminder with
    // no notification? but anyway, it's a possiblity

    Reminder.#instances.push(this);
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
    if (!this.hasNotification) {
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
    } else {
      console.log(`Reminder with ID ${this.id} already has a notification set`);
    }
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
