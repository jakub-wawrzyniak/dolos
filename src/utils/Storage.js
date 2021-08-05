// * READ THIS - @wojtek
// async storage is easy to use, but is not suitable for alrge data.
// also, it stores in plaintext, so any sensitive data - not an option.
// I've tried https://github.com/ammarahm-ed/react-native-mmkv-storage
// since it claims to be super fast, but it didn't work for me.
// If in the future our data loading is to slow, we may need to switch up
// the storage system, that's why it's all in this file, so that we just
// change things here and stuff works. Hopefully.

// I heard that https://nozbe.github.io/WatermelonDB/index.html is pretty cool.

import AsyncStorage from '@react-native-async-storage/async-storage';

// In case you need to use AsyncStorage directly in other files,
// it's here when You [ import * as Storage from "...storage.js" ]
export const AS = AsyncStorage;

export async function storeObject(key, object) {
  try {
    const jsonValue = JSON.stringify(object);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
}

export async function getObject(key) {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
}

export async function removeByKey(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
}

export async function clear() {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }
}
