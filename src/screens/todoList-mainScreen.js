import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';

import globalStyles from '../global/styles';
import ListItem from '../components/listItem';
import Colors from '../global/colors';
import {TodoListAddModal} from '../components/modals/todoList-newItemModal';
import {todoListStorageHandler as listData} from '../utils/storageHandler';
import RoundButton from '../components/roundButton';

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
          onAccept={item => {
            if (editMode) {
              listData.editItem(item);
            } else {
              listData.addItem(item);
            }
            modalCleanUp();
          }}
          onCancel={() => modalCleanUp()}
          onRequestClose={() => modalCleanUp()}
          item={itemForModal}
        />
      )}
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <ListItem
              onPress={() => {
                setEditMode(true);
                setItemForModal(item); // give it THE item to edit
                setAddModalVisible(true);
              }}
              // passing item itself didn't work - some pass by ref(?) issue?
              itemKey={item.key}>
              <Text style={styles.contentText}>{item.content}</Text>
            </ListItem>
          );
        }}
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
        color={Colors.removeRed}
        onPress={() => {
          listData.clear();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentText: {fontSize: 14, color: Colors.textDefault, marginBottom: 12},
});
