import React, {useEffect, useState} from 'react';
import {View, Text, SectionList} from 'react-native';

import globalStyles from '../global/styles';
import Colors from '../global/colors';
import RoundButton from '../components/roundButton';
import ListItem from '../components/habitListItem';
import {habitTrackerStorageHandler as listData} from '../utils/storageHandler';

export default function HabitTrackerScreen() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    listData.onStorageUpdated.push(onStorageUpdated);
    listData.getData().then(data => setItems(data));
    return () => {
      listData.onStorageUpdated.splice(
        listData.onStorageUpdated.indexOf(onStorageUpdated),
        1,
      );
    };
  }, []);

  function onStorageUpdated() {
    listData.getData().then(newData => setItems(newData));
  }

  function getSectionedData(items) {
    const sections = [
      {title: 'overdue', data: items},
      {title: 'today', data: items},
    ];
    return sections;
  }
  //   const template = [
  //     {
  //       title: 'overdue',
  //       data: [
  //         {content: 'Habit #1', key: 1},
  //         {content: 'Habit #2', key: 2},
  //       ],
  //     },
  //     {
  //       title: 'today',
  //       data: [
  //         {content: 'Habit #1', key: 1},
  //         {content: 'Habit #2', key: 2},
  //         {content: 'Habit #3', key: 3},
  //       ],
  //     },
  //   ];

  return (
    <View style={globalStyles.container}>
      <SectionList
        sections={getSectionedData(items)}
        renderItem={({item}) => {
          return (
            <View>
              <Text>{item.content + '   item'}</Text>
            </View>
          );
        }}
        renderSectionHeader={({section}) => {
          return (
            <View>
              <Text>{section.title}</Text>
            </View>
          );
        }}
      />
      <RoundButton
        title="Add Item"
        color={Colors.acceptGreen}
        onPress={() => {
          listData.addItem(new listData.item());
        }}
      />
      <RoundButton
        title="log storage"
        color={Colors.cancelGrey}
        onPress={() => {
          console.log('STORAGE CONTENT:');
          listData.items.forEach(item => console.log(item));
        }}
      />
      <RoundButton
        title="clear storage"
        color={Colors.removeRed}
        onPress={() => {
          listData.clear();
        }}
      />
      <RoundButton
        title="log line"
        color={'dodgerblue'}
        onPress={() => {
          console.log();
        }}
      />
    </View>
  );
}
