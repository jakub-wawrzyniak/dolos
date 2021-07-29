import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
// https://ionic.io/ionicons - to browse Ionicons (better than github dir)

import HomeScreen from './src/screens/homeScreen';
import FoodLoggerScreen from './src/screens/foodLoggerScreen';
import FinanceTrackerScreen from './src/screens/financeTrackerScreen';
import TodoListScreen from './src/screens/todoListScreen';

const Tab = createBottomTabNavigator();

//? might want to move all colors and icons into a centralized .config file.
// todo - see if that's even possible.

export default function App() {
  const IconSelector = ({route, focused, color, size}) => {
    let iconName = '';
    switch (route.name) {
      case 'Home':
        iconName = focused ? 'home' : 'home-outline';
        break;
      case 'Food Logger':
        iconName = focused ? 'fast-food' : 'fast-food-outline';
        break;
      case 'Finance Tracker':
        iconName = focused ? 'cash' : 'cash-outline';
        break;
      case 'To-Do List':
        iconName = focused ? 'checkbox' : 'checkbox-outline';
        break;
      default:
        iconName = 'help'; // question mark - indicates error for dev
        break;
    }
    return <Icon name={iconName} color={color} size={size} />;
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          tabStyle: {padding: 4},
          keyboardHidesTabBar: true,
        }}
        // options receive navigation and route as props, can use a function
        // that takes them, and returns an object in which you can use them.
        screenOptions={({route}) => {
          return {
            // ? another way to pass route in?
            tabBarIcon: ({focused, color, size}) =>
              IconSelector({route, focused, color, size}),
          };
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Food Logger" component={FoodLoggerScreen} />
        <Tab.Screen name="Finance Tracker" component={FinanceTrackerScreen} />
        <Tab.Screen name="To-Do List" component={TodoListScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
