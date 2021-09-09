// * READ THIS - @wojtek
// async storage is easy to use, but is not suitable for large data.
// also, it stores in plaintext, so any sensitive data - not an option.
// I've tried https://github.com/ammarahm-ed/react-native-mmkv-storage
// since it claims to be super fast, but it didn't work for me.
// If in the future our data loading is to slow, we may need to switch up
// the storage system, that's why it's all in this file, so that we just
// change things here and stuff works. Hopefully.

// I heard that https://nozbe.github.io/WatermelonDB/index.html is pretty cool.

import AsyncStorage from '@react-native-async-storage/async-storage';
import {NotificationData, removeNotification} from './notificationHandler';

/** base storage handler class for interacting with async storage */
export default class StorageHandler {
  constructor(storageKey) {
    this.storageKey = storageKey;
    this.items = [];
    this.onStorageUpdated = []; // list of functions to call. C#-like event sys.
    this.initData();
  }

  /** call this to load data from storage to memory */
  initData() {
    this.getData().then(data => {
      this.items = data;
    });
  }

  /** write to async storage */
  async storeData() {
    try {
      const jsonValue = JSON.stringify(this.items);
      await AsyncStorage.setItem(this.storageKey, jsonValue).then(() => {
        this.#storageUpdated();
      });
    } catch (e) {
      console.log(e);
    }
  }

  /** read from async storage */
  async getData() {
    try {
      const jsonValue = await AsyncStorage.getItem(this.storageKey);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.log(e);
    }
  }

  /** clear mamory data and storage (write empty to storage) */
  clear() {
    this.items = [];
    this.storeData();
  }

  //! MAY NEED TO REWORK THE EVENT SYSTEM. I'D LIKE TO DO IT WHEN NEEDED @wojtek
  /** calls all subscribed listener functions */
  #storageUpdated() {
    // something of an event system - C#-like pattern.
    // ad listener in useEffect (componentdidmount), and remove it later
    // (return value from useEffect or componentwillunmount? or sth like this);
    if (Array.isArray(this.onStorageUpdated)) {
      this.onStorageUpdated.forEach(f => {
        f();
      });
    }
  }
}

class TodoListStorageHandler extends StorageHandler {
  constructor(storageKey) {
    super(storageKey);
    this.item = class Item {
      key = '';
      title = '';
      content = '';
      notificationData = new NotificationData();
      dueDateISO = '';
      notificationActive = false; // stays true after notif. happened
    };
  }

  addItem(newItem) {
    newItem.key = !!this.items[0] ? this.items[0].key + 1 : 1;
    this.items = [newItem, ...this.items];
    this.storeData();
  }

  removeItem(itemKey) {
    this.items = this.items.filter(item => {
      if (item.key !== itemKey) {
        return true;
      } else {
        // remove notification before removing item
        removeNotification(item.notificationData.id);
        return false;
      }
    });
    this.storeData();
  }

  /** replaces item with given key with newItem */
  editItem(newItem) {
    this.items = this.items.map(item => {
      if (item.key === newItem.key) {
        return newItem;
      }
      return item;
    });
    this.storeData();
  }
}

class HabitTrackerStorageHandler extends StorageHandler {
  constructor(storageKey) {
    super(storageKey);
  }

  addItem(newItem) {
    newItem.key = !!this.items[0] ? this.items[0].key + 1 : 1;
    this.items = [newItem, ...this.items];
    this.storeData();
  }

  removeItem(itemKey) {
    this.items = this.items.filter(item => {
      if (item.key !== itemKey) {
        return true;
      } else {
        return false;
      }
    });
    this.storeData();
  }

  /** replaces item with given key with newItem */
  editItem(newItem) {
    this.items = this.items.map(item => {
      if (item.key === newItem.key) {
        return newItem;
      }
      return item;
    });
    this.storeData();
  }
}

// I might actually have an idea for another storage handler redesign, but
// for now it's okay, we'll se in the future. Plus we might need to integrate
// a database anyway so we'll see - @wojtek

export const todoListStorageHandler = new TodoListStorageHandler('todoList');
// I need a way to store 4 separate lists with all functionality.
// and this way I don't need to rewrite the storage handler
// just 4 handlers for habit tracker, each handles it's one list.
export const habitTrackerStorageManager = {
  /** to be used when populating lists other than set */
  item: class Item {
    constructor(content, date = new Date().toISOString()) {
      this.key = '';
      this.content = content;
      /** creation date */
      this.dateISO = date;
    }
  },
  /** to be used when populating list set */
  itemTemplate: class ItemTemplate {
    constructor(content) {
      this.content = content;
    }
  },
  set: new HabitTrackerStorageHandler('habit_set'),
  current: new HabitTrackerStorageHandler('habit_current'),
  overdue: new HabitTrackerStorageHandler('habit_overdue'),
  archive: new HabitTrackerStorageHandler('habit_archive'),
};
