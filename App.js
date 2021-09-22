import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from './src/screens/homeScreen';
import TodoListScreen from './src/screens/todoList-mainScreen';
import HabitTrackerScreen from './src/screens/habitTrackerScreen';
import FoodLoggerScreen from './src/screens/foodLoggerScreen';

import Colors from './src/global/colors';

const Drawer = createDrawerNavigator();
const theme = {
  dark: Colors.isDark,
  colors: {
    primary: Colors.textDefault,
    background: Colors.backgroundDefault,
    card: Colors.backgroundDefault,
    text: Colors.textDefault,
    border: Colors.borderDefault,
    notification: Colors.foregroundGrey,
  },
};

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: Colors.textDefault,
          headerStyle: {
            elevation: 0,
          },
          headerTitleAlign: 'center',
        }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="ToDo List" component={TodoListScreen} />
        <Drawer.Screen name="Habit Tracker" component={HabitTrackerScreen} />
        <Drawer.Screen name="Food Logger" component={FoodLoggerScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
