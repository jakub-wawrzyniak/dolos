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
  const [val, setval] = useState(46);
  return (
    <View style={globalStyles.container}>
      <View style={{alignSelf: 'center'}}>
        <ProgressCircle
          progress={val}
          size={150}
          fontSize={28}
          padding={15}
          animateDuration={800}
          thickness={10}
        />
      </View>
      <Button
        title="add %"
        // cap at 100 setPercent((percent)=>{ logic - returns value })
        onPress={() =>
          setval(val => {
            return val + 15 <= 100 ? val + 15 : 100;
          })
        }
        color="red"
      />
      <Button title="RESET" onPress={() => setval(0)} color="red" />
    </View>
  );
}

export default FoodLoggerScreen;
