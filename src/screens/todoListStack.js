import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import icons from '../global/icons';
import globalStyles from '../global/styles';
import ListItem from '../components/listItem';

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

const dataArray = [
  {key: 1, message: 'Hello World!'},
  {key: 2, message: 'Nice to meet you, World!'},
  {key: 3, message: 'Goodbye World!'},
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
            <ListItem onPress={() => navigation.navigate('Details', {item})}>
              <Text>{item.message}</Text>
            </ListItem>
          );
        }}
      />
    </View>
  );
}

export function ItemDetailsScreen({navigation, route}) {
  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={styles.iconBox}>{icons.back}</View>
        </TouchableWithoutFeedback>
        <Text style={styles.titleText}>Details</Text>
      </View>
      <View style={styles.contentBox}>
        <Text style={styles.contentText}>{route.params.item.message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 30},
  contentBox: {flexDirection: 'row'},
  contentText: {fontSize: 14},
  iconBox: {paddingRight: 12},
  titleBox: {
    borderColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingBottom: 12,
    flexDirection: 'row',
  },
  titleText: {fontSize: 18, fontWeight: 'bold', flex: 1},
});
