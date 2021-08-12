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

  // This might be changed to house a generic itemdefinition to be reusable
  addItem(content) {
    const newItem = new TodoItemDefinition();
    newItem.key = this.items[0] !== undefined ? this.items[0].key + 1 : 1;
    newItem.content = content;
    this.items = [newItem, ...this.items];
    this.storeData();
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
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  }

  async removeByKey(key) {
    try {
      await AsyncStorage.removeItem(key);
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

class TodoItemDefinition {
  key = '';
  content = '';
  notificationData = new NotificationData();
}
export const todoListStorageHandler = new StorageHandler('todoList');
