import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import globalStyles from '../global/styles';

export default function FoodLoggerScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={{marginBottom: 15}}>Food Logger</Text>
      <Text style={{marginBottom: 15}}>
        You add how many calories you ate and have a bar towards set calory goal
        and stuff, maybe also a water-drinking reminder/tracker (if this won't
        become a separate feature).
      </Text>
      <Text style={{marginBottom: 15}}>
        The crazy thing is - noone knows how many calories they eat, so unless
        thay eat packaged food, we'd have to provide some screenOptionsof
        database with how much kcal is in ham slice or something like that. this
        is to be researched and i imagine it's be like a database that user can
        add their own entries, like we would put only the universal stuff (bread
        butter shit etc.) and stuff like yoghurt or chocolate would be added by
        user as a new entry since they have kcal on the packaging. (add
        chocolate, 100g, it has x kcal) and we remember that and next time they
        eat the same chocolate they just choose it from the list
      </Text>
      <Text style={{marginBottom: 15}}>I'm crazy ik</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
