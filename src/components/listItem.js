import React, {useState} from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';

import Colors from '../global/colors';
import icons from '../global/icons';

export default function ListItem(props) {
  const [icon, setIcon] = useState(icons.notfificationOn);

  //? Extract this as a notification toggle component?
  const toggleNotifications = () => {
    // add some events later
    console.log('toggling notifications');
    setIcon(
      icon === icons.notfificationOn
        ? icons.notfificationOff
        : icons.notfificationOn,
    );
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
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 3,
  },
  content: {
    padding: 12,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    padding: 12,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  line: {
    backgroundColor: '#aaa',
    width: 1,
    marginVertical: 12,
  },
});
