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

export default function InputFieldModal({
  title,
  modalVisible,
  setModalVisible,
  onSubmit, // gets an array of strings with inputs in order (top to bottom)
  inputFieldProps, // [{}, {}, ...] as many as you want input fields
}) {
  let values = [];
  return (
    <Modal animationType="fade" visible={modalVisible} transparent={true}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.modalBg}>
          <View style={styles.modalContainer}>
            <View style={styles.modalTitleBox}>
              <Text style={styles.modalTitleText}>{title}</Text>
            </View>

            {inputFieldProps.map((props, index) => {
              return (
                <View key={index} style={styles.inputBox}>
                  <TextInput
                    {...props}
                    onChangeText={text => {
                      values[index] = text;
                    }}
                  />
                </View>
              );
            })}

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
                    ? onSubmit(values)
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
    marginTop: 8,
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
