import React from 'react';
import Colors from '../global/colors';
import {Pressable, View, Text, StyleSheet} from 'react-native';

function Button({title, onPress, highlight = false}) {
  return (
    <Pressable
      onPress={onPress}
      style={[style.button, highlight && style.accept]}>
      <Text style={style.text}>{title}</Text>
    </Pressable>
  );
}

export default function EditButtons({onAccept, onCancel}) {
  return (
    <View style={style.buttonContainer}>
      <Button title="Cancel" onPress={onCancel} />
      <Button title="Accept" onPress={onAccept} highlight={true} />
    </View>
  );
}

const style = StyleSheet.create({
  button: {
    backgroundColor: Colors.cancelGrey,
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 5,
    flex: 1,
  },
  accept: {
    backgroundColor: Colors.acceptGreen,
  },
  text: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});
