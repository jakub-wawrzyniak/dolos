import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet, Text} from 'react-native';

import Colors from '../global/colors';
import icons from '../global/icons';
import {turnNotifOff, turnNotifOn} from '../utils/notificationHandler';
import {todoListStorageHandler as listStorage} from '../utils/storageHandler';

export default function ListItem(props) {
  const item = listStorage.items.find(item => item.key === props.itemKey);
  const dueDate = new Date(item.dueDateISO);

  //* MOVE LATER
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

  // customs since Date obj doesn't satisfy me here ;(
  const formatDate = date => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };
  const formatTime = date => {
    return `${date.getHours()}:${date.getMinutes()} ${
      date.getHours() < 12 ? 'AM' : 'PM' // ! CHANGE dep. on time picker
    }`;
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={styles.content}>
          <Text style={styles.textTitle}>{item.title}</Text>
          <Text style={styles.textDescription}>{item.content}</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => console.log('edit date')}>
        <View style={styles.dateBox}>
          <Text style={styles.textDate}>{formatDate(dueDate)}</Text>
          <Text style={[styles.textDate, {fontSize: 12}]}>
            {formatTime(dueDate)}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: Colors.foregroundGrey,
    marginVertical: 8,
    marginHorizontal: 3,
  },
  content: {
    padding: 16,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    flex: 1,
  },
  dateBox: {padding: 15, alignItems: 'center'},
  textTitle: {color: Colors.textDefault, fontSize: 14, fontWeight: 'bold'},
  textDescription: {color: Colors.textDefault, fontSize: 12},
  textDate: {color: Colors.textDefault, fontSize: 14},
});
