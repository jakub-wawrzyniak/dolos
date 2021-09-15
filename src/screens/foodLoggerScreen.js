import React, {useState} from 'react';
import {View, StyleSheet, FlatList, AppState} from 'react-native';

import globalStyles from '../global/styles';
import Colors from '../global/colors';
import * as Text from '../global/text';
import RoundButton from '../components/roundButton';
import {foodLoggerStorageManager as foodData} from '../utils/storageHandler';
import {FoodLoggerAddModal} from '../components/modals/foodLogger-newItemModal';
import {useEffect} from 'react/cjs/react.development';

export default function FoodLoggerScreen() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [pickerData, setPickerData] = useState([]);
  const [todaysData, setTodaysData] = useState([]);

  function onAcceptManual(itemName, itemKcal, addToBase) {
    if (addToBase) {
      foodData.base.addItem(new foodData.item(itemName, itemKcal));
    }
    foodData.today.addItem(new foodData.item(itemName, itemKcal));
    setAddModalVisible(false);
  }

  function onAcceptList(baseKey) {
    const item = foodData.base.getItemByKey(baseKey);
    foodData.today.addItem(new foodData.item(item.name, item.kcal));
    setAddModalVisible(false);
  }

  function onStorageUpdated() {
    foodData.base.getData().then(data => {
      setPickerData(data);
    });
    foodData.today.getData().then(data => {
      setTodaysData(data);
    });
  }

  function AppStateChangeHandler(newState) {
    if (newState === 'active') {
      HandleArchiveTransition();
    }
  }

  function HandleArchiveTransition() {
    if (foodData.today.items.length > 0) {
      const newest = new Date(foodData.today.items[0].dateISO);
      if (newest.getDate() !== new Date().getDate()) {
        foodData.archive.items = [
          ...foodData.today.items,
          ...foodData.archive.items,
        ];
        foodData.today.clear();
        foodData.archive.storeData();
      }
    }
  }

  useEffect(() => {
    HandleArchiveTransition();

    // load data
    foodData.base.getData().then(data => {
      setPickerData(data);
    });
    foodData.today.getData().then(data => {
      setTodaysData(data);
    });

    // handle event subscriptions
    AppState.addEventListener('change', AppStateChangeHandler);
    foodData.base.onStorageUpdated.push(onStorageUpdated);
    foodData.today.onStorageUpdated.push(onStorageUpdated);
    return () => {
      foodData.base.onStorageUpdated.splice(
        foodData.base.onStorageUpdated.indexOf(onStorageUpdated),
        1,
      );
      foodData.today.onStorageUpdated.splice(
        foodData.today.onStorageUpdated.indexOf(onStorageUpdated),
        1,
      );
      AppState.removeEventListener('change', AppStateChangeHandler);
    };
  }, []);

  return (
    <View style={globalStyles.container}>
      {addModalVisible && (
        <FoodLoggerAddModal
          onAcceptManual={onAcceptManual}
          onAcceptList={onAcceptList}
          onCancel={() => setAddModalVisible(false)}
          onRequestClose={() => setAddModalVisible(false)}
          pickerData={pickerData}
          setPickerData={setPickerData}
        />
      )}
      <Text.H1>Today's log:</Text.H1>
      <FlatList
        data={todaysData}
        renderItem={({item}) => (
          <Text.P>
            {item.name} - {item.kcal} Kcal
          </Text.P>
        )}
      />
      <RoundButton
        title="Add to database"
        style={{backgroundColor: Colors.acceptGreen}}
        onPress={() => {
          setAddModalVisible(true);
        }}
      />
      <RoundButton
        title="log storage"
        color={Colors.cancelGrey}
        onPress={() => {
          console.log();
          for (const prop in foodData) {
            if (prop == 'item') continue;
            console.log(prop);
            foodData[prop].items.forEach(item => console.log(item));
            console.log();
          }
        }}
      />
      <RoundButton
        title="clear all data"
        style={{backgroundColor: Colors.cancelGrey}}
        onPress={() => {
          foodData.base.clear();
          foodData.today.clear();
          foodData.archive.clear();
        }}
      />
    </View>
  );
}
