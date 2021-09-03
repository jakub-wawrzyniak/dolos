import React from 'react';
import {View, Pressable} from 'react-native';

export default function IconButton({icon, style, onPress}) {
  return (
    <Pressable onPress={onPress}>
      <View style={style}>{icon}</View>
    </Pressable>
  );
}
