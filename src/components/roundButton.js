import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {P} from '../global/text';

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
          <P style={styles.text}>{title}</P>
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
    alignSelf: 'center',
    paddingVertical: 13,
    paddingHorizontal: 20,
  },
});
