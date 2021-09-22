import React, {useEffect, useState} from 'react';
import {View, Text, SectionList, AppState} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';

import globalStyles from '../global/styles';
import Colors from '../global/colors';
import RoundButton from '../components/roundButton';
import {habitTrackerStorageManager as habitData} from '../utils/storageHandler';
import Separator from '../components/separator';
import ListItem from '../components/habitTrackerListItem';
import HabitTrackerAddModal from '../components/modals/habitTracker-newItemModal';

/* ALGORITHM EXPLANATION
  * pseudocode
  app opens (or comes to an active state), checks if there are items in current
    if yes: check their date
      if today: nothing
      if not today: move to overdue, spawn sets
    if no: 
      poll the latest entry in archive, check its date
        if today: nothing
        if not today: spawn sets
  
  * spawning sets: 
  looks how many days passed since last updated, spawns sets into overdue
  for every day that has passed and spawns a single set into current for today.

  * archive: 
  just a list of items in order they were swiped, newest on top. 
  then if we want to construct the table we need a pass over the whole archive?
  and a table looks something like this: 
  day 1: habit1 yes habit2 no  habit3 non-existant-at-time
  day 2: habit1 yes habit2 yes habit3 yes
  day 3: habit1 no  habit2 yes habit3 yes

  * note
  habitData.set stores itemtemplates instead of items, they are strings of
  content that are being put to items. Why not items? cuz pass by ref. issues. 
*/

//#region HELPER FUNCTIONS
const isToday = date => {
  return date.getDate() === new Date().getDate();
};
const daysBetween = (date1, date2) => {
  // return Math.abs(date1.getDate() - date2.getDate());
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);
  return Math.abs(
    Math.ceil((date1.getTime() - date2.getTime()) / (1000 * 3600 * 24)),
  );
};
/** spawn a fresh set for each day between and today */
const spawnSets = then => {
  const now = new Date();
  while (daysBetween(then, now) > 0) {
    then.setDate(then.getDate() + 1);
    habitData.set.items.forEach(itemTemplate => {
      const item = new habitData.item(itemTemplate.content, then.toISOString());
      isToday(then)
        ? habitData.current.addItem(item)
        : habitData.overdue.addItem(item);
    });
  }
};
//#endregion

export default function HabitTrackerScreen() {
  // I have not done much testing with archive but it should work
  function initData() {
    habitData.current.getData().then(data => {
      if (data.length === 0) {
        //check if there are items in archive (if no it's ok - no action)
        if (habitData.archive.items.length !== 0) {
          // check the date of last in archive
          const latestInArchive = new Date(habitData.archive.items[0].dateISO);
          if (!isToday(latestInArchive)) {
            spawnSets(latestInArchive);
            setCurrentItems(habitData.current.items);
          } else {
            // everything is fine, just load
            setCurrentItems(data);
          }
        }
      } else {
        // if first in current is out of date, all are.
        if (!isToday(new Date(data[0].dateISO))) {
          // move all from current to overdue
          habitData.current.items.forEach(item => {
            habitData.overdue.addItem(item);
            habitData.current.removeItem(item.key);
          });
          // spawn a set for each day in between and today
          spawnSets(new Date(data[0].dateISO));
        } else {
          //everything is fine, just load it
          setCurrentItems(data);
        }
      }
      // load overdue only after this logic, as data needs to be moved eariler.
      habitData.overdue.getData().then(data => setOverdueItems(data));
    });
  }

  function AppStateChangeHandler(newState) {
    if (newState === 'active') {
      initData();
    }
  }

  const [currentItems, setCurrentItems] = useState([]);
  const [overdueItems, setOverdueItems] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    // load data & perform data logic
    initData();

    // register events
    habitData.current.onStorageUpdated.push(onStorageUpdated_current);
    habitData.overdue.onStorageUpdated.push(onStorageUpdated_overdue);
    AppState.addEventListener('change', AppStateChangeHandler);

    return () => {
      // unregister events
      habitData.current.onStorageUpdated.splice(
        habitData.current.onStorageUpdated.indexOf(onStorageUpdated_current),
        1,
      );
      habitData.overdue.onStorageUpdated.splice(
        habitData.overdue.onStorageUpdated.indexOf(onStorageUpdated_overdue),
        1,
      );
      // ! when we upgrade from react native 0.64 to 0.65 we have to change this
      // https://reactnative.dev/docs/appstate#removeeventlistener
      // intellisense says its wrong but it's not, we're on react native 0.64
      AppState.removeEventListener('change', AppStateChangeHandler);
      // * intellisense is telling me this func doesn't exist on AppState, but
      // * it does, and the other approach doesn't work so we do this.
    };
  }, []);

  function onStorageUpdated_current() {
    habitData.current.getData().then(newData => setCurrentItems(newData));
  }
  function onStorageUpdated_overdue() {
    habitData.overdue.getData().then(newData => setOverdueItems(newData));
  }

  function getSectionedData() {
    const sections = [
      {title: 'overdue', data: overdueItems},
      {title: 'today', data: currentItems},
    ];
    return sections;
  }

  const onLeftOpen = item => {
    item.completed = true;
    const key = item.key;
    habitData.archive.insertItem(item);
    habitData.overdue.removeItem(key);
    habitData.current.removeItem(key);
  };
  const onRightOpen = item => {
    item.completed = false;
    const key = item.key;
    habitData.archive.insertItem(item);
    habitData.overdue.removeItem(key);
    habitData.current.removeItem(key);
  };
  const onAccept = itemData => {
    const itemTemplate = new habitData.itemTemplate(itemData.content);
    habitData.set.addItem(itemTemplate);
    habitData.current.addItem(new habitData.item(itemTemplate.content));
    setAddModalOpen(false);
  };
  const onCancel = () => {
    setAddModalOpen(false);
  };

  return (
    <View style={globalStyles.container}>
      {addModalOpen && (
        <HabitTrackerAddModal
          onAccept={onAccept}
          onCancel={onCancel}
          onRequestClose={onCancel}
        />
      )}
      <SectionList
        sections={getSectionedData()}
        renderItem={({item, section}) => {
          return (
            <ListItem
              item={item}
              onLeftOpen={() => onLeftOpen(item)}
              onRightOpen={() => onRightOpen(item)}
              showDate={section.title === 'overdue'}
            />
          );
        }}
        renderSectionHeader={({section}) => {
          return <Separator title={section.title} />;
        }}
      />
      <RoundButton
        title="Add Item"
        color={Colors.acceptGreen}
        onPress={() => setAddModalOpen(true)}
      />
      <RoundButton
        title="log storage"
        color={Colors.cancelGrey}
        onPress={() => {
          console.log();
          for (const prop in habitData) {
            if (prop == 'item' || prop === 'itemTemplate') continue;
            console.log(prop);
            console.log(habitData[prop].items);
            console.log();
          }
        }}
      />
      <RoundButton
        title="clear all storage"
        color={Colors.removeRed}
        onPress={() => {
          for (const prop in habitData) {
            if (prop === 'item' || prop === 'itemTemplate') continue;
            habitData[prop].clear();
          }
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
