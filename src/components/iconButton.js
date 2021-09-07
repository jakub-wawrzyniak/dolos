import React from 'react';
import {View, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function IconButton({
  name,
  size,
  color,
  containerStyle,
  onPress,
}) {
  return (
    <Pressable onPress={onPress}>
      <View style={containerStyle}>
        <Icon name={name} size={size} color={color} />
      </View>
    </Pressable>
  );
}
