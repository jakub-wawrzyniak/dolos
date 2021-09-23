import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../global/colors';
import * as icons from '../global/icons';
import {P} from '../global/text';
import {formatDate} from '../utils/dateFormatter';

export default function ListItem({
  item,
  onLeftOpen,
  onRightOpen,
  onPress,
  showDate = false,
}) {
  const leftActions = () => {
    return (
      <Pressable onPress={onRightOpen} style={styles.leftActions}>
        <Icon
          name={icons.names.tick}
          size={icons.sizes.default}
          color={Colors.backgroundDefault}
        />
      </Pressable>
    );
  };

  const rightActions = () => {
    return (
      <Pressable onPress={onLeftOpen} style={styles.rightActions}>
        <Icon
          name={icons.names.x}
          size={icons.sizes.default}
          color={Colors.backgroundDefault}
        />
      </Pressable>
    );
  };

  return (
    <Swipeable
      renderLeftActions={leftActions}
      renderRightActions={rightActions}
      onSwipeableLeftOpen={onLeftOpen}
      onSwipeableRightOpen={onRightOpen}>
      <Pressable onPress={onPress} style={styles.container}>
        <View style={styles.content}>
          <P>{item.content}</P>
        </View>
        {showDate && (
          <>
            <View style={styles.line}></View>
            <View style={styles.dateBox}>
              <P>{formatDate(new Date(item.dateISO))}</P>
            </View>
          </>
        )}
      </Pressable>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.foregroundGrey,
    flexDirection: 'row',
    borderRadius: 8,
    marginVertical: 8,
  },
  content: {
    padding: 16,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  leftActions: {
    flex: 1,
    backgroundColor: Colors.acceptGreen,
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 8,
    marginVertical: 8,
  },
  line: {
    width: 1,
    backgroundColor: Colors.borderDefault,
    marginVertical: 8,
  },
  dateBox: {
    padding: 16,
    justifyContent: 'center',
  },
  rightActions: {
    flex: 1,
    backgroundColor: Colors.removeRed,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 8,
    marginVertical: 8,
  },
});