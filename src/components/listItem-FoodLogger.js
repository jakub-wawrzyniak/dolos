import React from 'react';
import {View, StyleSheet} from 'react-native';

import Colors from '../global/colors';
import {P} from '../global/text';

export default function ListItem({item}) {
  return (
    <View style={styles.container}>
      <P>{item.name}</P>
      <View style={styles.line}></View>
      <P>{item.kcal}</P>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 12,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: Colors.borderDefault,
    marginHorizontal: 25,
  },
});
