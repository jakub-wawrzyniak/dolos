import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import Svg from 'react-native-svg';
import {VictoryPie, VictoryLabel, VictoryAnimation} from 'victory-native';

function ProgressCircle({
  progress = 0, // use useState for this
  size = 150, // of square svg box
  animateDuration = 1000, // in ms
  fontSize = 30,
  thickness = 10, // of ring
  padding = 15, // around the circle
  otherProps = {}, // passed to <View> wrapping the whole component
}) {
  const data = [
    {x: 1, y: progress},
    {x: 2, y: 100 - progress},
  ];

  return (
    <View style={styles.container} {...otherProps}>
      <Svg height={size} width={size}>
        <VictoryPie
          animate={{duration: animateDuration}}
          data={data}
          height={size}
          width={size}
          padding={padding}
          innerRadius={size / 2 - padding - thickness}
          labels={() => null}
          cornerRadius={25}
          style={{
            data: {
              // datum for using the data objects ? idk
              fill: ({datum}) => {
                // console.log(datum);
                const color = datum.y > 50 ? 'green' : 'red';
                return datum.x === 1 ? color : 'transparent';
              },
            },
          }}
        />
        <VictoryAnimation duration={animateDuration} data={data[0]}>
          {objToTweenIDK => {
            // I have no idea how this works, it like gets what I pass as data
            // to VictoryAnimation, I have no clue man Docs are sketchy fml
            // --- try logging this stuff and see whats up. (fuck unclear docs)
            // console.log(objToTweenIDK);
            return (
              <VictoryLabel
                animate={{duration: animateDuration}}
                x={size / 2}
                y={size / 2}
                textAnchor="middle"
                verticalAnchor="middle"
                text={`${objToTweenIDK.y.toFixed(0)}%`}
                style={{fontSize: fontSize}}
              />
            );
          }}
        </VictoryAnimation>
      </Svg>
    </View>
  );
}

export default ProgressCircle;

const styles = StyleSheet.create({
  container: {},
});

/*  FOR LATER REFERENCE WHEN WE IMPLEMENT THIS COMPONENT SOMEWHERE.
function FoodLoggerScreen() {
  function onReach100() {
    console.log('Reached 100% !!!');
  }
  const [progress, setProgress] = useState(46);
  return (
    <View style={globalStyles.container}>
      <Text style={{alignSelf: 'center'}}>component showcase</Text>
      <View style={{alignSelf: 'center', borderWidth: 1}}>
        <ProgressCircle progress={progress} />
      </View>

      <View
        style={{
          justifyContent: 'space-evenly',
          flexDirection: 'row',
        }}>
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
    </View>
  );
}

*/
