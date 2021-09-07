import React from 'react';
import colors from '../global/colors';
import {StyleSheet, View} from 'react-native';
import {H3, H4} from '../global/text';

function Line({flex}) {
  return <View style={[style.line, {flex: flex}]} />;
}

export default function Separator({title}) {
  return (
    <View style={style.view}>
      <Line flex={1} />
      <H3 style={style.text}>{title}</H3>
      <Line flex={5} />
    </View>
  );
}

const style = StyleSheet.create({
  text: {
    marginHorizontal: 15,
  },
  line: {
    height: 1,
    minWidth: 10,
    borderBottomWidth: 2,
    borderColor: colors.borderDefault,
  },
  view: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
