import React, {useState} from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';

import Colors from '../global/colors';
import icons from '../global/icons';

export default function ListItem(props) {
  const [icon, setIcon] = useState(icons.notfificationOn);

  // *  ******* TOGGLING NOTIFICATIONS ********
  //  @wojtek - I have a problem with this, How are we supposed to do this?
  // Like this button should suggest if the notification is allowed, but what
  // If there's no notification? or when we disable a notification, and there
  // was one scheduled, how do we handle this? do we just write not. data to
  // some persistant storage and remove the notification all together but when
  // the user restores it we read it from storage and create a notification
  // with this read data so that from user's persepctive it's the same message
  // and time? If so, what if user diables notification, and then enables it
  // AFTER the fire date? I mean, all of this is possible to handle, but I feel
  // like these are pretty huge decisions and thus I'm not making them alone.
  // (but the bell icon is cute, gotta admit)

  //? Extract this as a notification toggle component?
  const toggleNotifications = () => {
    // add some events later
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
    backgroundColor: Colors.backgroundDefault,
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
    backgroundColor: Colors.borderDefault,
    width: 1,
    marginVertical: 12,
  },
});
