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
import AcceptCancelButtons from '../acceptCancelButtons';

export default function HabitTrackerAddModal({
  onAccept,
  onCancel,
  onRequestClose,
}) {
  const [newItemData, setNewItemData] = useState({content: ''});
  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={onRequestClose}>
      <Pressable
        style={globalStyles.modalBackgroundTransparent}
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={[styles.modalContainer, {borderWidth: 1}]}>
          <TextInput
            style={styles.inputBox}
            placeholder="Input a Habit to track ..."
            onChangeText={text => {
              newItemData.content = text;
            }}
          />
          <AcceptCancelButtons
            onCancel={() => onCancel()}
            onAccept={() => onAccept(newItemData)}
          />
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
