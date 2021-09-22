import {View, Pressable, StyleSheet} from 'react-native';
import {P} from '../global/text';
import React from 'react';
import Colors from '../global/colors';

export default function OnOffSwitch({
  onTitle,
  offTitle,
  isOn,
  setIsOn,
  containerStyle,
}) {
  const toggle = () => setIsOn(isOn => !isOn);
  return (
    <View style={[{height: 30, width: 100}, containerStyle]}>
      <Pressable onPress={toggle} style={style.pressable}>
        <P style={[style.text, isOn && style.selected]}>{onTitle}</P>
        <P style={[style.text, !isOn && style.selected]}>{offTitle}</P>
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Colors.cancelGrey,
    borderRadius: 50,
    flex: 1,
    overflow: 'hidden',
  },
  text: {
    flex: 1,
    height: '100%',
    borderRadius: 50,
    textAlign: 'center',
  },
  selected: {
    backgroundColor: Colors.acceptGreen,
  },
});
