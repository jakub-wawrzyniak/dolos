import React, {useState} from 'react';
import {
  Modal,
  View,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
} from 'react-native';
import Colors from '../../global/colors';
import globalStyles from '../../global/styles';
import OnOffSwitch from '../onOffSwitch';
import AcceptCancelButtons from '../acceptCancelButtons';
import DatePicker from '../datePicker';
import {
  generateID,
  turnNotifOff,
  turnNotifOn,
} from '../../utils/notificationHandler';

export function TodoListAddModal({onAccept, onCancel, onRequestClose, item}) {
  const [isNotificationOn, setIsNotificationOn] = useState(
    item.notificationActive,
  );
  const [date, setDate] = useState(new Date(item.dueDateISO || Date.now()));
  // I will be using newItem directly. It is a state since I need it to persist
  // between rerenders (opening date picker causes rerender)
  // this persistance is overwritten on modal open by passing correct item.
  // ! DO NOT USE setNewItem unless you know what you're doing
  const [newItem, setNewItem] = useState({...item});

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={onRequestClose}>
      <Pressable
        style={globalStyles.modalBackgroundTransparent}
        onPress={() => Keyboard.dismiss()}>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.inputBox}
            placeholder="Title"
            defaultValue={newItem.title}
            onChangeText={text => {
              newItem.title = text;
            }}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Description"
            defaultValue={newItem.content}
            onChangeText={text => {
              newItem.content = text;
            }}
          />

          <DatePicker date={date} setDate={setDate} />

          <View style={{flexDirection: 'row'}}>
            <OnOffSwitch
              onTitle="Do"
              offTitle="Don't"
              isOn={isNotificationOn}
              setIsOn={setIsNotificationOn}
            />
            <Text style={styles.text}>send me a notification</Text>
          </View>

          <AcceptCancelButtons
            onCancel={() => onCancel()}
            onAccept={() => {
              //  pack and send data
              //? there might be a better way to do it
              newItem.dueDateISO = date.toISOString();
              newItem.notificationData.dateISO = newItem.dueDateISO;
              if (newItem.notificationData.id === '')
                newItem.notificationData.id = generateID();
              newItem.notificationData.message = newItem.content;
              newItem.notificationData.title = newItem.title;
              newItem.notificationData.origin = 'todoList';
              if (isNotificationOn) {
                turnNotifOn(newItem);
              } else {
                turnNotifOff(newItem);
              }
              onAccept(newItem);
            }}
          />
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonBar: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 15,
  },
  inputBox: {
    padding: 0, // reset default padding
    // paddingHorizontal: 8, A suggestion, looks better to me
    borderBottomWidth: 1,
    borderColor: Colors.textDefault,
    marginVertical: 12,
  },
  modalContainer: {
    backgroundColor: Colors.backgroundDefault,
    width: '88%',
    paddingVertical: 25,
    paddingHorizontal: 35,
    borderRadius: 20,
  },
  text: {
    color: Colors.textDefault,
    alignSelf: 'center',
    paddingVertical: 12,
  },
});
