import React from 'react';
import {
  Modal,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import icons from '../../global/icons';

export default function EditNotificationModal({
  elementName,
  modalVisible,
  setModalVisible,
  onSubmit, // takes the new title as parameter
  inputBoxHeight,
  populateField,
  textAlignVertical,
  isMultiline = true,
}) {
  let newValue = '';
  return (
    <Modal animationType="fade" visible={modalVisible} transparent={true}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.modalBg}>
          <View style={styles.modalContainer}>
            <View style={styles.modalTitleBox}>
              <Text style={styles.modalTitleText}>TITLE</Text>
            </View>

            <View style={styles.inputBox}>
              <TextInput
                style={{
                  height: inputBoxHeight,
                }}
                textAlignVertical={textAlignVertical}
                multiline={isMultiline}
                placeholder="Input the new value..."
                onChangeText={text => {
                  newValue = text.trim();
                }}
                defaultValue={populateField}
              />
            </View>

            <View style={styles.buttonBar}>
              <TouchableWithoutFeedback>{icons.close}</TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                {icons.accept}
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    marginHorizontal: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 6,
  },
  modalBg: {
    // opacity is inherited so this is how we make it independent
    backgroundColor: 'rgba(255,255,255,0.5)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '90%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
  },
  modalTitleBox: {
    paddingBottom: 5,
    marginBottom: 5,
  },
  modalExitButton: {
    alignItems: 'flex-end',
  },
  modalTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#777',
    alignSelf: 'center',
  },
});
