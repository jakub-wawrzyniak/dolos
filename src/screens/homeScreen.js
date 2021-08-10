import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Reminder from '../utils/Reminder-class';

import globalStyles from '../global/styles';

export default function HomeScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={{marginBottom: 15}}>Home Screen</Text>
      <Text style={{marginBottom: 15}}>
        Home Screen could be something like a dashboard where you see snippets
        of all features, like "how much have you spent this month" or "how many
        calories today" (or water drank - anohter feature idea). like a summary,
        with some nice data visualization like graphs, UI animations etc. (like
        these bar charts with bars filling up when you load the page){' '}
      </Text>
      <Text style={{marginBottom: 15}}>
        Clicking on such would naivgate us to respective tabs where you'd find
        many details and options to add, customize edit etc. also, here you'd
        have some general app settings as well as profile (?) maybe idk
      </Text>

      <Button
        title="notify after 5s"
        onPress={() => {
          console.log('Will send notification after 5sec from now');
          const fireDate = new Date(Date.now() + 5000);
          new Reminder(fireDate, 'Message'); // no need for instance reference.
        }}
      />
      <Button
        title="log list"
        onPress={() => {
          Reminder.instances.forEach(i => console.log(i));
        }}
      />
      <Button title="remove all" onPress={Reminder.cancelAll} />
    </View>
  );
}

const styles = StyleSheet.create({});
