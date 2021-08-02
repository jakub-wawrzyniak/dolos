import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../global/colors';

export default function ListItem(props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundDefault,
    padding: 12,
    borderRadius: 8,
    elevation: 3,
    marginVertical: 6,
  },
});
