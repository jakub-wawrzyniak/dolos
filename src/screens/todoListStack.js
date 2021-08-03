import React, {useState} from 'react';
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
import EditNotificationModal from '../components/modals/editNotificationModal';
import {createReminder} from '../classes/Reminder';

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

// temporary, https://pusher.com/tutorials/persisting-data-react-native/
const dataArray = [
  {key: 1, message: 'Hello World!', notificationID: ''},
  {key: 2, message: 'Nice to meet you, World!', notificationID: ''},
  {key: 3, message: 'Goodbye World!', notificationID: ''},
];

// * Can move these screens below into their own files later (if needed)

export function TodoListScreen({navigation, route}) {
  return (
    <View style={globalStyles.container}>
      <FlatList
        data={dataArray}
        renderItem={({item}) => {
          return (
            // item has to be wrapped in an object (not really, just leave it)
            <ListItem
              onPress={() => navigation.navigate('Details', {item})}
              item={item}>
              <Text style={styles.contentText}>{item.message}</Text>
            </ListItem>
          );
        }}
      />
    </View>
  );
}

export function ItemDetailsScreen({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <EditNotificationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onSubmit={afterSeconds => {
          const fireDate = new Date(Date.now() + afterSeconds * 1000);
          createReminder({
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
      </View>

      {/* Im unsure as where to plae it */}
      <Button title="remind me" onPress={() => setModalVisible(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 30, flex: 1},
  contentBox: {flex: 1},
  contentText: {fontSize: 14, color: Colors.textDefault},
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
