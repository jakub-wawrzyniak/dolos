import React from 'react';
import {View, Pressable, StyleSheet, Text} from 'react-native';

import Colors from '../global/colors';
import globalStyles from '../global/styles';
import {todoListStorageHandler as listStorage} from '../utils/storageHandler';

export default function ListItem(props) {
  const item = listStorage.items.find(item => item.key === props.itemKey);
  const dueDate = new Date(item.dueDateISO);

  return (
    <Pressable onPress={props.onPress} style={styles.container}>
      <View style={styles.content}>
        <Text style={globalStyles.textTitle}>{item.title}</Text>
        {item.content !== '' && (
          <Text style={globalStyles.textDefault}>{item.content}</Text>
        )}
      </View>
      <View style={styles.dateBox}>
        <Text style={styles.dateText}>{formatDate(dueDate)}</Text>
        <Text style={[styles.dateText, {fontSize: 12}]}>
          {formatTime(dueDate)}
        </Text>
      </View>
    </Pressable>
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
  dateText: {color: Colors.textDefault, fontSize: 14},
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
});
