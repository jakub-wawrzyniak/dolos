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
  const [progress, setProgress] = useState(46);
  return (
    <View style={globalStyles.container}>
      <View style={{alignSelf: 'center'}}>
        <ProgressCircle progress={progress} />
      </View>
      <Button
        title="add %"
        // cap at 100 setPercent((percent)=>{ logic - returns value })
        onPress={() =>
          setProgress(val => {
            return val + 15 <= 100 ? val + 15 : 100;
          })
        }
        color="red"
      />
      <Button title="RESET" onPress={() => setProgress(0)} color="red" />
    </View>
  );
}

export default FoodLoggerScreen;
