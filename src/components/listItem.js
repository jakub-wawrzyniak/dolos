import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Colors from '../global/colors';

export default function ListItem(props) {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.container}>
        <View style={styles.content}>{props.children}</View>
      </View>
    </TouchableWithoutFeedback>
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
