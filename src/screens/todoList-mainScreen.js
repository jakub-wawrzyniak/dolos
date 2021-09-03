import React, {useEffect, useState} from 'react';
import {View, SectionList} from 'react-native';

import globalStyles from '../global/styles';
import ListItem from '../components/listItem';
import Colors from '../global/colors';
import {TodoListAddModal} from '../components/modals/todoList-newItemModal';
import {todoListStorageHandler as listData} from '../utils/storageHandler';
import RoundButton from '../components/roundButton';
import Separator from '../components/separator';
import * as notif from '../utils/notificationHandler';

//#region - sorting stuff
const sortTodoData = todos => {
  // Sorts Todos by due date in an ascending way
  const out = todos.sort((todo1, todo2) => {
    let t1 = new Date(todo1.dueDateISO);
    let t2 = new Date(todo2.dueDateISO);
    return t1.getTime() - t2.getTime();
  });
  return out;
};

const getNextDay = days => {
  // Returns a timestamp of a day that is {days} away from now
  const date = new Date();
  date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * days);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
};

const getSectionedTodoData = todos => {
  // returns data prepared for the section={} parameter in SectionedList
  const sortedTodos = sortTodoData(todos);
  const sections = [
    {data: [], title: 'Overdue', endsBy: new Date().getTime()},
    {data: [], title: 'Today', endsBy: getNextDay(1)},
    {data: [], title: 'Tomorrow', endsBy: getNextDay(2)},
    {data: [], title: 'This week', endsBy: getNextDay(7)},
    {data: [], title: 'This month', endsBy: getNextDay(30)},
    {data: [], title: 'Later', endsBy: getNextDay(36500)},
    // 100yrs is plenty, 9s scare me
  ];

  sortedTodos.forEach(todo => {
    const todoDueBy = new Date(todo.dueDateISO).getTime();
    for (const section of sections) {
      if (todoDueBy < section.endsBy) {
        section.data.push(todo);
        break;
      }
    }
  });
  return sections;
};
//#endregion

export default function TodoListScreen() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [itemForModal, setItemForModal] = useState(new listData.item());
  const [editMode, setEditMode] = useState(false);

  function onStorageUpdated() {
    listData.getData().then(data => setData(data));
  }

  function modalCleanUp() {
    setAddModalVisible(false);
    setEditMode(false);
  }

  function onAccept(item) {
    notif.updateNotification(item);
    if (editMode) {
      listData.editItem(item);
    } else {
      listData.addItem(item);
    }
    modalCleanUp();
  }

  useEffect(() => {
    listData.onStorageUpdated.push(onStorageUpdated);
    listData.getData().then(data => setData(data));

    return () => {
      listData.onStorageUpdated.splice(
        listData.onStorageUpdated.indexOf(onStorageUpdated),
        1,
      );
    };
  }, []);

  return (
    <View style={globalStyles.container}>
      {addModalVisible && ( // this way modal is only rendered when needed.
        <TodoListAddModal
          onAccept={onAccept}
          onCancel={modalCleanUp}
          onRequestClose={modalCleanUp}
          item={itemForModal}
        />
      )}
      <SectionList
        sections={getSectionedTodoData(data)}
        renderItem={({item}) => (
          <ListItem
            onPress={() => {
              setEditMode(true);
              setItemForModal(item); // give it THE item to edit
              setAddModalVisible(true);
            }}
            itemKey={item.key}
            onDeletePress={() => listData.removeItem(item.key)}></ListItem>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Separator title={title} />
        )}
      />
      <RoundButton
        title="Add Item"
        color={Colors.acceptGreen}
        onPress={() => {
          setAddModalVisible(true);
          setItemForModal(new listData.item()); // give it blank item
        }}
      />
      <RoundButton
        title="Clear Storage"
        color={Colors.cancelGrey}
        onPress={() => {
          listData.clear();
        }}
      />
      <RoundButton
        title="log notifications"
        color={Colors.cancelGrey}
        onPress={() => {
          console.log('Scheduled notifications:');
          notif.logScheduled();
        }}
      />
    </View>
  );
}
