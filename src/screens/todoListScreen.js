import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import globalStyles from '../global/styles';
import ToDoList from '../components/todoList';

export default function TodoListScreen() {
  return (
    <View style={globalStyles.container}>
      <ToDoList />
    </View>
  );
}

const styles = StyleSheet.create({});
