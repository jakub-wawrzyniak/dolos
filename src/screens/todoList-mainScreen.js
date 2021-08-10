import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';

import globalStyles from '../global/styles';
import ListItem from '../components/listItem';
import Colors from '../global/colors';
import InputFieldModal from '../components/modals/inputFieldModal';
import * as storage from '../utils/Storage';

class ItemData {
  key = '';
  content = '';
  reminder = undefined;
}

export default function TodoListScreen({navigation, route}) {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    storage.getObject('todoList').then(data => setData(data));
  }, []);

  const AddItem = ({content}) => {
    const item = new ItemData();
    item.key = data[0] !== undefined ? data[0].key + 1 : 1;
    item.content = content;
    const newData = [item, ...data];
    setData(newData);
    storage.storeObject('todoList', newData);
  };

  return (
    <View style={globalStyles.container}>
      <InputFieldModal
        title="Input new Item"
        modalVisible={addModalVisible}
        setModalVisible={setAddModalVisible}
        inputFieldProps={[{placeholder: 'content/message'}]}
        onSubmit={values => {
          AddItem({content: values[0]});
        }}
      />
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            // item has to be wrapped in an object (the one in navigate)
            <ListItem
              onPress={() => navigation.navigate('Details', {item})}
              item={item}>
              <Text style={styles.contentText}>{item.content}</Text>
            </ListItem>
          );
        }}
      />
      <Button title="add" onPress={() => setAddModalVisible(true)} />
      <Button
        title="log storage"
        onPress={() =>
          storage.getObject('todoList').then(val => {
            console.log(val);
          })
        }
      />
      <Button
        title="clear"
        onPress={() => {
          storage.storeObject('todoList', []);
          setData([]);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentText: {fontSize: 14, color: Colors.textDefault, marginBottom: 12},
});
