import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import icons from '../global/icons';
import globalStyles from '../global/styles';
import ListItem from '../components/listItem';
import Colors from '../global/colors';
import InputFieldModal from '../components/modals/inputFieldModal';
import {createReminder, generateID} from '../utils/Reminder';
import * as storage from '../utils/Storage';

const Stack = createStackNavigator();

export default function ToDoListStack() {
  return (
    <Stack.Navigator
      initialRouteName={'List'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="List" component={TodoListScreen} />
      <Stack.Screen name="Details" component={ItemDetailsScreen} />
    </Stack.Navigator>
  );
}

// * Can move these screens below into their own files later (if needed)

export function TodoListScreen({navigation, route}) {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    storage.getObject('todoList').then(data => setData(data));
  }, []);

  const AddItem = ({message, notificationID = ''}) => {
    const key = data[0] !== undefined ? data[0].key + 1 : 1;
    const newData = [{key, message, notificationID}, ...data];
    setData(newData);
    storage.storeObject('todoList', newData);
  };

  return (
    <View style={globalStyles.container}>
      <InputFieldModal
        title="Input new Item"
        modalVisible={addModalVisible}
        setModalVisible={setAddModalVisible}
        inputFieldProps={[{placeholder: 'message'}]}
        onSubmit={values => {
          AddItem({message: values[0]});
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
              <Text style={styles.contentText}>{item.message}</Text>
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

export function ItemDetailsScreen({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <InputFieldModal
        title="After how many seconds?"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        inputFieldProps={[
          {
            placeholder: "Don't make me wait, Sweetie ;)",
            keyboardType: 'numeric',
          },
        ]}
        onSubmit={values => {
          const afterSeconds = parseInt(values[0]);
          const fireDate = new Date(Date.now() + afterSeconds * 1000);
          route.params.item.notificationID = generateID();
          createReminder({
            id: route.params.item.notificationID,
            message: route.params.item.message,
            date: fireDate,
          });
        }}
      />

      <View style={styles.titleBox}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={styles.iconBox}>{icons.back}</View>
        </TouchableWithoutFeedback>
        <Text style={styles.titleText}>Details</Text>
      </View>

      <View style={styles.contentBox}>
        <Text style={styles.contentText}>{route.params.item.message}</Text>
        <Text style={[styles.contentText, {color: '#aaa'}]}>
          I wanted this to say when you will (or won't) be notified about this.
        </Text>
        <Button
          title="log item"
          onPress={() => console.log(route.params.item)}
        />
      </View>

      {/* Im unsure as where to place it */}
      <Button title="remind me" onPress={() => setModalVisible(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 30, flex: 1},
  contentBox: {flex: 1},
  contentText: {fontSize: 14, color: Colors.textDefault, marginBottom: 12},
  iconBox: {paddingRight: 12},
  titleBox: {
    borderColor: Colors.borderDefault,
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingBottom: 12,
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: Colors.textDefault,
  },
});
