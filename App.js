import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
// https://ionic.io/ionicons - to browse Ionicons (better than github dir)

import HomeScreen from './src/screens/homeScreen';
import FoodLoggerScreen from './src/screens/foodLoggerScreen';
import FinanceTrackerScreen from './src/screens/financeTrackerScreen';
import TodoListScreen from './src/screens/todoListScreen';

const Drawer = createDrawerNavigator();

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
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
