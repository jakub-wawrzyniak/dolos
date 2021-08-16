//! UNUSED - for reference/just in case

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import TodoListScreen from '../screens/todoList-mainScreen';
import todoListItemDetailsScreen from '../screens/todoList-itemDetails';
const Stack = createStackNavigator();

/** @deprecated */
export default function ToDoListStack() {
  console.warn('[ToDoListStack] is deprecated');
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
