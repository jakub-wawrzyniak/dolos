import {Pressable, StyleSheet} from 'react-native';
import {P} from '../global/text';
import React from 'react';
import Colors from '../global/colors';

export default function OnOffSwitch({onTitle, offTitle, isOn, setIsOn}) {
  const toggle = () => setIsOn(isOn => !isOn);
  return (
    <Pressable onPress={toggle} style={style.pressable}>
      <P style={[style.text, isOn && style.selected]}>{onTitle}</P>
      <P style={[style.text, !isOn && style.selected]}>{offTitle}</P>
    </Pressable>
  );
}

const style = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    maxHeight: 35,
    backgroundColor: Colors.cancelGrey,
    borderRadius: 50,
    margin: 5,
  },
  text: {
    height: '100%',
    textAlignVertical: 'center',
    borderRadius: 50,
    paddingHorizontal: 18,
    backgroundColor: Colors.cancelGrey,
  },
  selected: {
    backgroundColor: Colors.acceptGreen,
  },
});
