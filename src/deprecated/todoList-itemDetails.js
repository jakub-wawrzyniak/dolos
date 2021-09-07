//! UNUSED - for reference/just in case

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';

import icons from '../global/icons';
import Colors from '../global/colors';
import InputFieldModal from './inputFieldModal';
import {todoListStorageHandler as listData} from '../utils/storageHandler';
import {
  NotificationData,
  generateID,
  createNotification,
  turnNotifOn,
  turnNotifOff,
} from '../utils/notificationHandler';

/** @deprecated */
export default function todoListItemDetailsScreen({navigation, route}) {
  console.warn('[todoListItemDetailsScreen] is deprecated.');
  // we shouldn't pass whole obejcts through route.params so i pass the key.
  // for this I assume that listData.items is initalized before i open this scr.
  // check if this will work when we navigate to this screen directly on start.

  const item = listData.items.find(item => item.key === route.params.itemKey);
  const [modalVisible, setModalVisible] = useState(false);
  const [notifInfoString, setNotifInfoString] = useState(
    'You will not be reminded about this.',
  );

  // like componentDidMount();
  useEffect(() => {
    // ? I'm unsure if this will work properly for repeating notifications.
    if (item.notificationData.dateISO) {
      const then = new Date(item.notificationData.dateISO);
      if (then.getTime() < Date.now()) {
        setNotifInfoString('You will not be reminded about this.');
      } else {
        setNotifInfoString(`You will be reminded on ${then.toLocaleString()}.`);
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      <InputFieldModal
        title="After how many seconds?"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        inputFieldProps={[
          {
            placeholder: "Don't make me wait, Sweetie ;)",
            keyboardType: 'numeric',
          },
        ]}
        onSubmit={values => {
          const afterSeconds = parseInt(values[0]);
          const fireDate = new Date(Date.now() + afterSeconds * 1000);
          const nData = new NotificationData();
          nData.title = 'Reminder!';
          nData.message = item.content;
          nData.origin = 'todoList';
          nData.dateISO = fireDate.toISOString();
          nData.id = generateID();
          item.notificationData = nData;
          item.notificationActive = true; // although true might be out of date.
          createNotification(nData);
          listData.storeData();
          setNotifInfoString(
            `You will be reminded on ${fireDate.toLocaleString()}.`,
          );
        }}
      />

      <View style={styles.titleBox}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={styles.iconBox}>{icons.back}</View>
        </TouchableWithoutFeedback>
        <Text style={styles.titleText}>Details</Text>
      </View>

      <View style={styles.contentBox}>
        <Text style={styles.contentText}>{item.content}</Text>
        <Text style={[styles.contentText, {color: '#aaa'}]}>
          {notifInfoString}
        </Text>
        <Button title="log item" onPress={() => console.log(item)} />
      </View>

      {/* Im unsure as where to place it */}
      <Button title="remind me" onPress={() => setModalVisible(true)} />
      <Button
        title="turn on"
        onPress={() => {
          if (turnNotifOn(item)) {
            listData.storeData();
          }
        }}
      />
      <Button
        title="turn off"
        onPress={() => {
          if (turnNotifOff(item)) {
            listData.storeData();
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 30, flex: 1},
  contentBox: {flex: 1},
  contentText: {fontSize: 14, color: Colors.textDefault, marginBottom: 12},
  iconBox: {paddingRight: 12},
  titleBox: {
    borderColor: Colors.borderDefault,
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingBottom: 12,
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: Colors.textDefault,
  },
});
