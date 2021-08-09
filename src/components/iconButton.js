// * I know that vector-icons provide such thing, but I wanted my custom one.

import React from 'react';
import {View, TouchableNativeFeedback} from 'react-native';

export default function IconButton({icon, style, onPress}) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={style}>{icon}</View>
    </TouchableNativeFeedback>
  );
}
