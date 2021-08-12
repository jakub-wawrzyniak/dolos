import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';

import globalStyles from '../global/styles';
import ListItem from '../components/listItem';
import Colors from '../global/colors';
import InputFieldModal from '../components/modals/inputFieldModal';

import {todoListStorageHandler as listData} from '../utils/storageHandler';

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
      <InputFieldModal
        title="Input new Item"
        modalVisible={addModalVisible}
        setModalVisible={setAddModalVisible}
        inputFieldProps={[{placeholder: 'content/message'}]}
        onSubmit={values => {
          listData.addItem(values[0]);
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
              item={item}>
              <Text style={styles.contentText}>{item.content}</Text>
            </ListItem>
          );
        }}
      />
      <Button title="add" onPress={() => setAddModalVisible(true)} />
      <Button
        title="log storage"
        onPress={() => {
          console.log('storage content:');
          listData.getData().then(arr => {
            arr.forEach(val => {
              console.log(val);
            });
          });
        }}
      />
      <Button
        title="log data"
        onPress={() => {
          console.log('data content:');
          listData.items.forEach(item => {
            console.log(item);
          });
        }}
      />
      <Button
        title="clear"
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
