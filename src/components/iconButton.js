// * I know that vector-icons provide such thing, but I wanted my custom one.

import React from 'react';
import {View, Pressable} from 'react-native';

export default function IconButton({icon, style, onPress}) {
  return (
    <Pressable onPress={onPress}>
      <View style={style}>{icon}</View>
    </Pressable>
  );
}
