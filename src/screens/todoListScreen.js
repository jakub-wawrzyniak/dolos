import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import globalStyles from '../global/styles';

export default function TodoListScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={{marginBottom: 15}}>To-Do List</Text>
      <Text style={{marginBottom: 15}}>
        Self explainatory, just a list with todos, somewhat like the app I made.
        not anything crazy I'd imagine
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
