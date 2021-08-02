import React from 'react';
import {View, StyleSheet, Text, Flatlist} from 'react-native';
import ListItem from './listItem';

export default function ToDoList() {
  return (
    <View>
      <ListItem>
        <Text>ITEM #1</Text>
      </ListItem>
      <ListItem>
        <Text>ITEM #2</Text>
      </ListItem>
      <ListItem>
        <Text>ITEM #3</Text>
      </ListItem>
    </View>
  );
}
