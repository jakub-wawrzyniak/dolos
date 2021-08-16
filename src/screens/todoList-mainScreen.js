import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';

import globalStyles from '../global/styles';
import ListItem from '../components/listItem';
import Colors from '../global/colors';
import TodoListAddModal from '../components/modals/todoList-newItemModal';
import {todoListStorageHandler as listData} from '../utils/storageHandler';
import RoundButton from '../components/roundButton';
import Separator from '../components/separator';

export default function TodoListScreen({navigation}) {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [data, setData] = useState([]);

  function onStorageUpdated() {
    listData.getData().then(data => setData(data));
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
      <TodoListAddModal
        modalVisible={addModalVisible}
        setModalVisible={setAddModalVisible}
        onSubmit={values => {
          listData.addItem(values[0], values[1], 'January 15, 2020 09:45:00');
        }}
      />
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <ListItem
              onPress={() =>
                navigation.navigate('Details', {itemKey: item.key})
              }
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
        onPress={() => setAddModalVisible(true)}
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
