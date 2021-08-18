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
import {NotificationData} from './notificationHandler';

export default class StorageHandler {
  constructor(storageKey) {
    this.storageKey = storageKey;
    this.items = [];
    this.onStorageUpdated = []; // list of functions to call. C#-like event sys.
    this.initData();
  }

  initData() {
    this.getData().then(data => {
      this.items = data;
    });
  }

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

  async getData() {
    try {
      const jsonValue = await AsyncStorage.getItem(this.storageKey);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.log(e);
    }
  }

  clear() {
    this.items = [];
    this.storeData();
  }

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

// I'd imagine we'll have similar classes for all features.
class TodoListStorageHandler extends StorageHandler {
  constructor() {
    super('todoList');
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
    this.items = this.items.filter(item => item.key !== itemKey);
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
export const todoListStorageHandler = new TodoListStorageHandler('todoList');
