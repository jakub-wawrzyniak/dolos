import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/homeScreen';

// ! TEMPORARY
function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

//? might want to move all colors and icons into a centralized .config file.
// todo - see if that's even possible.
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          // options can receive navigation and route props
          // a function that takes these and returns an object
          options={({route, navigation}) => {
            return {
              tabBarIcon: () => (
                <Icon name="home-outline" color="#777" size={24} />
              ),
            };
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: () => (
              <Icon name="settings-outline" color="#777" size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
