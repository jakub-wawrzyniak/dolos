import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import globalStyles from '../global/styles';
import Colors from '../global/colors';
import * as Text from '../global/text';
import RoundButton from '../components/roundButton';
import {foodLoggerStorageManager as foodData} from '../utils/storageHandler';
import {FoodLoggerAddModal} from '../components/modals/foodLogger-newItemModal';
import {useEffect} from 'react/cjs/react.development';

export default function FoodLoggerScreen() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [pickerOpen, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [pickerItems, setPickerItems] = useState([
    {name: 'Apple', kcal: 150, date: 'something', key: '1'},
    {name: 'Banana', kcal: 150, date: 'something', key: '2'},
  ]);

  const customTheme = require('../utils/customDropDownTheme');
  DropDownPicker.addTheme('CUSTOM', customTheme);
  DropDownPicker.setTheme('CUSTOM');

  function onModalAcceptHandler(item) {
    foodData.base.addItem(item);
    setAddModalVisible(false);
  }

  function onStorageUpdated() {
    foodData.base.getData().then(data => {
      setPickerItems(data);
    });
  }

  useEffect(() => {
    foodData.base.onStorageUpdated.push(onStorageUpdated);
    foodData.base.getData().then(data => {
      setPickerItems(data);
    });
    return () => {
      foodData.base.onStorageUpdated.splice(
        foodData.base.onStorageUpdated.indexOf(onStorageUpdated),
        1,
      );
    };
  }, []);

  return (
    <View style={globalStyles.container}>
      {addModalVisible && (
        <FoodLoggerAddModal
          onAccept={onModalAcceptHandler}
          onCancel={() => setAddModalVisible(false)}
          onRequestClose={() => setAddModalVisible(false)}
          item={new foodData.item()}
        />
      )}
      <View style={{flex: 1}}>
        <DropDownPicker
          open={pickerOpen}
          value={selectedValue}
          items={pickerItems}
          setOpen={setOpen}
          setValue={setSelectedValue}
          setItems={setPickerItems}
          searchable
          schema={{
            label: 'name',
            value: 'key',
          }}
        />
      </View>
      <RoundButton
        title="Add to database"
        style={{backgroundColor: Colors.acceptGreen}}
        onPress={() => {
          setAddModalVisible(true);
        }}
      />
      <RoundButton
        title="Log food database"
        style={{backgroundColor: Colors.cancelGrey}}
        onPress={() => {
          console.log('Food database');
          console.log(foodData.base.items);
        }}
      />
      <RoundButton
        title="clear food database"
        style={{backgroundColor: Colors.cancelGrey}}
        onPress={() => {
          foodData.base.clear();
        }}
      />
    </View>
  );
}
