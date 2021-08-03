import React from 'react';
import {
  Modal,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import Colors from '../../global/colors';

import icons from '../../global/icons';
import IconButton from '../iconButton';

export default function EditNotificationModal({
  modalVisible,
  setModalVisible,
  onSubmit, //gets the number of seconds as parameter
}) {
  let value = '';
  return (
    <Modal animationType="fade" visible={modalVisible} transparent={true}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.modalBg}>
          <View style={styles.modalContainer}>
            <View style={styles.modalTitleBox}>
              <Text style={styles.modalTitleText}>After how many seconds?</Text>
            </View>

            <View style={styles.inputBox}>
              <TextInput
                placeholder="Don't make me wait, Sweetie ;)"
                keyboardType="numeric"
                onChangeText={text => {
                  value = text.trim();
                }}
              />
            </View>

            <View style={styles.buttonBar}>
              <IconButton
                icon={icons.close}
                style={styles.iconButton}
                onPress={() => setModalVisible(false)}
              />
              <IconButton
                icon={icons.accept}
                style={styles.iconButton}
                onPress={() => {
                  setModalVisible(false);
                  onSubmit
                    ? onSubmit(parseInt(value))
                    : console.log('Clicked Submit, but no onSubmit provided');
                }}
              />
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
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    paddingHorizontal: 6,
  },
  iconButton: {padding: 6},
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
    borderColor: Colors.borderDefault,
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
