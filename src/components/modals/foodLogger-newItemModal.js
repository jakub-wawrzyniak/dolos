import React, {useState} from 'react';
import {
  Modal,
  View,
  Keyboard,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import Colors from '../../global/colors';
import globalStyles from '../../global/styles';
import OnOffSwitch from '../onOffSwitch';
import AcceptCancelButtons from '../acceptCancelButtons';

export function FoodLoggerAddModal({onAccept, onCancel, onRequestClose, item}) {
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
            placeholder="name"
            defaultValue={newItem.name}
            onChangeText={text => {
              newItem.name = text;
            }}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Kcal"
            defaultValue={newItem.kcal !== 0 ? newItem.kcal.toString() : ''}
            keyboardType="numeric"
            onChangeText={text => {
              newItem.kcal = Number(text);
              // TODO implement validation
            }}
          />

          {/* implement this as a checkbox whether to add to database or not */}
          {/* <View style={{flexDirection: 'row'}}>
            <OnOffSwitch
              onTitle="Do"
              offTitle="Don't"
              isOn={isNotificationOn}
              setIsOn={setIsNotificationOn}
            />
            <P style={{paddingVertical: 12}}>add to a the database</P>
          </View> */}

          <AcceptCancelButtons
            onCancel={() => onCancel()}
            onAccept={() => {
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
    borderBottomWidth: 1,
    borderColor: Colors.borderDefault,
    marginVertical: 12,
    color: Colors.textDefault,
  },
  modalContainer: {
    backgroundColor: Colors.backgroundDefault,
    width: '88%',
    paddingVertical: 25,
    paddingHorizontal: 35,
    borderRadius: 20,
  },
});
