import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import globalStyles from '../global/styles';

export default function FinanceTrackerScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={{marginBottom: 15}}>Finance Tracker</Text>
      <Text style={{marginBottom: 15}}>
        now here idk since adding every spending would be tedious and boring, it
        would be best if we could add it somehow when paying with your phone or
        something but that's probly too crazy so we just go with adding entries
        manually first, and then some statistics based on those entries. Idk if
        that's gonna be usefull since banking apps do it, but what the hell
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
