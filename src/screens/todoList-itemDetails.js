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
import InputFieldModal from '../components/modals/inputFieldModal';
import Reminder from '../utils/Reminder-class';

export default function todoListItemDetailsScreen({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [notifInfoString, setNotifInfoString] = useState(
    'You will not be reminded about this.',
  );
  // like componentDidMount();
  useEffect(() => {
    if (typeof route.params.item.reminder !== 'undefined') {
      if (route.params.item.reminder.date.getTime() - Date.now() < 0) {
        route.params.item.reminder.removeNotification();
        setNotifInfoString('You will not be reminded about this.');
      } else {
        setNotifInfoString(
          'You will be reminded on ' + route.params.item.reminder.formattedDate,
        );
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
          const rem = new Reminder(
            fireDate,
            route.params.item.content,
            'todoList',
          );
          route.params.item.reminder = rem;
          setNotifInfoString(
            'You will be reminded on ' +
              route.params.item.reminder.formattedDate,
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
        <Text style={styles.contentText}>{route.params.item.content}</Text>
        <Text style={[styles.contentText, {color: '#aaa'}]}>
          {notifInfoString}
        </Text>
        <Button
          title="log item"
          onPress={() => console.log(route.params.item)}
        />
      </View>

      {/* Im unsure as where to place it */}
      <Button title="remind me" onPress={() => setModalVisible(true)} />
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
