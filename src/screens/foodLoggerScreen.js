import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Button,
} from 'react-native';
import ProgressCircle from '../components/progressCirle';

import globalStyles from '../global/styles';

function FoodLoggerScreen() {
  function onReach100() {
    console.log('Reached 100% !!!');
  }
  const [progress, setProgress] = useState(46);
  return (
    <View style={globalStyles.container}>
      <View style={{alignSelf: 'center'}}>
        <ProgressCircle progress={progress} />
      </View>

      <Button
        title="add %"
        onPress={() =>
          setProgress(val => {
            val = val + 15 <= 100 ? val + 15 : 100;
            if (val === 100) {
              // might want to call it in onEnd of animations but idc
              onReach100();
            }
            return val;
          })
        }
        color="red"
      />
      <Button title="RESET" onPress={() => setProgress(0)} color="red" />
    </View>
  );
}

export default FoodLoggerScreen;
