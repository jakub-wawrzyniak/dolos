import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import TodoListScreen from '../screens/todoList-mainScreen';
import todoListItemDetailsScreen from '../screens/todoList-itemDetails';
const Stack = createStackNavigator();

export default function ToDoListStack() {
  return (
    <Stack.Navigator
      initialRouteName={'List'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="List" component={TodoListScreen} />
      <Stack.Screen name="Details" component={todoListItemDetailsScreen} />
    </Stack.Navigator>
  );
}
