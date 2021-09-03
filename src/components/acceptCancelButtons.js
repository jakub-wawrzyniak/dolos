import React from 'react';
import Colors from '../global/colors';
import {View, StyleSheet} from 'react-native';
import RoundButton from './roundButton';

export default function AcceptCancelButtons({onAccept, onCancel}) {
  return (
    <View style={style.buttonContainer}>
      <RoundButton
        title="Cancel"
        onPress={onCancel}
        color={Colors.cancelGrey}
        style={{flex: 1, marginHorizontal: 10}}
      />
      <RoundButton
        title="Accept"
        onPress={onAccept}
        color={Colors.acceptGreen}
        style={{flex: 1, marginHorizontal: 10}}
      />
    </View>
  );
}

const style = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
});
