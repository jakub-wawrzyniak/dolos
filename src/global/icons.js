import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from './colors';

const icons = {
  // might want to take color from global color set file
  back: <Icon name="arrow-back" size={25} color={Colors.iconDefault} />,
  notfificationOn: (
    <Icon name="notifications-outline" size={25} color={Colors.iconDefault} />
  ),
  notfificationOff: (
    <Icon
      name="notifications-off-outline"
      size={25}
      color={Colors.iconDefault}
    />
  ),
  close: <Icon name="close" size={25} color={Colors.iconDefault} />,
  accept: <Icon name="checkmark" size={25} color={Colors.iconDefault} />,
  settings: (
    <Icon name="ellipsis-vertical" size={25} color={Colors.iconDefault} />
  ),
  delete: <Icon name="trash-outline" size={25} color={Colors.iconDefault} />,
};
export default icons;
