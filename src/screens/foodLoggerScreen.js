import React, {useState} from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import Svg from 'react-native-svg';
import {VictoryPie, VictoryLabel, VictoryAnimation} from 'victory-native';
import styles from '../global/styles';

import globalStyles from '../global/styles';

function FoodLoggerScreen() {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [percent, setPercent] = useState(25);

  const data = [
    {x: 1, y: percent},
    {x: 2, y: 100 - percent},
  ];

  // todo - continue progress circle
  // https://formidable.com/open-source/victory/docs/victory-label#active

  return (
    <View style={globalStyles.container}>
      <Svg
        height={150}
        width={windowWidth - globalStyles.container.padding * 2}
        style={{backgroundColor: 'dodgerblue'}}>
        <VictoryPie
          data={data}
          height={150}
          width={windowWidth - globalStyles.container.padding * 2}
          padding={15}
          innerRadius={50}
          labels={() => null}
        />
        <VictoryLabel
          x={(windowWidth - globalStyles.container.padding * 2) / 2}
          y={75}
          backgroundStyle={{backgroundColor: 'red'}}
          textAnchor="middle"
          verticalAnchor="middle"
          text="5%"
          style={{fontSize: 45}}
        />
      </Svg>
    </View>
  );
}

export default FoodLoggerScreen;
