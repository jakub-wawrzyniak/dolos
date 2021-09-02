import React from 'react';
import {View, Pressable, StyleSheet, Text} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Colors from '../global/colors';
import icons from '../global/icons';
import {todoListStorageHandler as listStorage} from '../utils/storageHandler';

export default function ListItem(props) {
  const item = listStorage.items.find(item => item.key === props.itemKey);
  const dueDate = new Date(item.dueDateISO);

  //#region Date formatting
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
  //#endregion

  const leftActions = () => {
    return (
      <Pressable onPress={props.onDeletePress}>
        <View style={styles.leftActions}>{icons.delete}</View>
      </Pressable>
    );
  };

  return (
    <Swipeable renderLeftActions={leftActions}>
      <Pressable onPress={props.onPress} style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.textTitle}>{item.title}</Text>
          {item.content !== '' && (
            <Text style={styles.textDescription}>{item.content}</Text>
          )}
        </View>
        <View style={styles.dateBox}>
          <Text style={styles.textDate}>{formatDate(dueDate)}</Text>
          <Text style={[styles.textDate, {fontSize: 12}]}>
            {formatTime(dueDate)}
          </Text>
        </View>
      </Pressable>
    </Swipeable>
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
    justifyContent: 'center',
  },
  dateBox: {padding: 15, alignItems: 'center', justifyContent: 'center'},
  // leftActions is closely related to cointainer to look consistent
  // maybe could implement it as an override, but I suppose this will change
  leftActions: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: Colors.removeRed,
    marginVertical: 8,
    marginHorizontal: 3,
  },
  textTitle: {color: Colors.textDefault, fontSize: 14, fontWeight: 'bold'},
  textDescription: {color: Colors.textDefault, fontSize: 12},
  textDate: {color: Colors.textDefault, fontSize: 14},
});
