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
import DropDownPicker from 'react-native-dropdown-picker';
import {P} from '../../global/text';

export function FoodLoggerAddModal({
  onAcceptManual, // params: (name, kcal, addToBaseBoolean)
  onAcceptList, //   params: (baseKey)
  onCancel,
  onRequestClose,
  pickerData,
  setPickerData,
}) {
  const [newItemData, setNewItemData] = useState({name: '', kcal: ''});
  const [pickerOpen, setOpen] = useState(false);
  const [selectedKeyValue, setSelectedKeyValue] = useState(null);
  const [addToBase, setAddToBase] = useState(false);
  // ! I think this selection neeeds to be changed, it's temporary
  // ! I'm thinking we need to re-write ONOFF switch.
  const [listMode, setListModee] = useState(true);

  const customTheme = require('../../utils/customDropDownTheme');
  DropDownPicker.addTheme('CUSTOM', customTheme);
  DropDownPicker.setTheme('CUSTOM');

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={onRequestClose}>
      <Pressable
        style={globalStyles.modalBackgroundTransparent}
        onPress={() => {
          Keyboard.dismiss();
          console.log('clicked background');
        }}>
        {/* <View style={globalStyles.modalBackgroundTransparent}> */}
        <View style={[styles.modalContainer, {backgroundColor: 'pink'}]}>
          {/* this switch looks awful, change it */}
          <OnOffSwitch
            onTitle="list"
            offTitle="manual"
            isOn={listMode}
            setIsOn={setListModee}
          />
          {/* true == show list */}
          {listMode && (
            <>
              <DropDownPicker
                open={pickerOpen}
                value={selectedKeyValue}
                items={pickerData}
                setOpen={setOpen}
                setValue={setSelectedKeyValue}
                setItems={setPickerData}
                searchable
                schema={{
                  label: 'name',
                  value: 'key',
                }}
              />
              {/*  If this view isin't here, the dropdown comes out of modal and
                 on the part where it's outside modal you cant press/swipe it.
                 it has height of 200 since this is the max height of dropdown */}
              <View style={{height: 200}}></View>
            </>
          )}
          {/* false == show manual inputs */}
          {!listMode && (
            <>
              <TextInput
                style={styles.inputBox}
                placeholder="name"
                defaultValue={newItemData.name}
                onChangeText={text => {
                  newItemData.name = text;
                }}
              />
              <TextInput
                style={styles.inputBox}
                placeholder="Kcal"
                defaultValue={
                  newItemData.kcal !== 0 ? newItemData.kcal.toString() : ''
                }
                keyboardType="numeric"
                onChangeText={text => {
                  newItemData.kcal = Number(text);
                  // TODO implement validation - for now wrong value makes NaN
                }}
              />

              <View style={{flexDirection: 'row'}}>
                <OnOffSwitch
                  onTitle="Do"
                  offTitle="Don't"
                  isOn={addToBase}
                  setIsOn={setAddToBase}
                />
                <P style={{paddingVertical: 12}}>add to a the database</P>
              </View>
            </>
          )}

          <AcceptCancelButtons
            onCancel={() => onCancel()}
            onAccept={() => {
              if (listMode) {
                onAcceptList(selectedKeyValue);
              } else {
                onAcceptManual(newItemData.name, newItemData.kcal, addToBase);
              }
            }}
          />
        </View>
        {/* </View> */}
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
