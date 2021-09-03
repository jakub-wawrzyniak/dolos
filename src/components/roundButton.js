import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

import globalStyles from '../global/styles';

export default function RoundButton({title, onPress, color, style}) {
  return (
    <View
      style={[
        styles.container,
        {overflow: 'hidden', backgroundColor: color},
        style,
      ]}>
      <Pressable onPress={onPress} android_ripple={{color: 'rgba(0,0,0,0.1)'}}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    marginVertical: 5,
  },
  text: {
    ...globalStyles.textDefault,
    fontSize: 14,
    alignSelf: 'center',
    paddingVertical: 13,
    paddingHorizontal: 20,
  },
});
