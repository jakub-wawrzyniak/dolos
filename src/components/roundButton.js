import React from 'react';
import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';

export default function RoundButton({title, onPress, color, style}) {
  return (
    <View
      style={[
        styles.container,
        {overflow: 'hidden', backgroundColor: color},
        style,
      ]}>
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,0.1)', true)}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableNativeFeedback>
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
    paddingHorizontal: 20
  },
});
