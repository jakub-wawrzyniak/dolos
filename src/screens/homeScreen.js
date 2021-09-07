import React from 'react';
import {View, Text} from 'react-native';

import globalStyles from '../global/styles';

export default function HomeScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={{marginBottom: 15}}>Home Screen</Text>
      <Text style={{marginBottom: 15}}>
        I imagine This would be like a dashboard.
      </Text>
    </View>
  );
}
