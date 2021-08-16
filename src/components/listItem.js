import React, {useState} from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {useEffect} from 'react/cjs/react.development';

import Colors from '../global/colors';
import icons from '../global/icons';
import {turnNotifOff, turnNotifOn} from '../utils/notificationHandler';
import {todoListStorageHandler as listStorage} from '../utils/storageHandler';

export default function ListItem(props) {
  const item = listStorage.items.find(item => item.key === props.itemKey);
  const [icon, setIcon] = useState(
    item.notificationActive ? icons.notfificationOn : icons.notfificationOff,
  );
  useEffect(() => {
    setIcon(
      item.notificationActive ? icons.notfificationOn : icons.notfificationOff,
    );
  }, [item.notificationActive]);

  //? Extract this as a notification toggle component?
  const toggleNotifications = () => {
    if (item.notificationData.id !== '') {
      if (item.notificationActive) {
        const success = turnNotifOff(item);
        if (success) {
          setIcon(icons.notfificationOff);
        }
      } else {
        const success = turnNotifOn(item);
        if (success) {
          setIcon(icons.notfificationOn);
        }
      }
      listStorage.storeData();
    } else {
      console.log("Can't toggle, there is no notification");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={styles.content}>{props.children}</View>
      </TouchableWithoutFeedback>

      {/* serves as the border line, but regular border had wrong padding */}
      <View style={styles.line}></View>

      <TouchableWithoutFeedback onPress={toggleNotifications}>
        <View style={styles.icon}>{icon}</View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    elevation: 3,
    backgroundColor: Colors.backgroundDefault,
    marginVertical: 8,
    marginHorizontal: 3,
  },
  content: {
    padding: 12,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    flex: 1,
    justifyContent: 'center', //? this doesn't seem to work for some reason?
  },
  icon: {
    padding: 12,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  line: {
    backgroundColor: Colors.borderDefault,
    width: 1,
    marginVertical: 12,
  },
});
