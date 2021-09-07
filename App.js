import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from './src/screens/homeScreen';
import TodoListScreen from './src/screens/todoList-mainScreen';
import HabitTrackerScreen from './src/screens/habitTrackerScreen';

import Colors from './src/global/colors';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: Colors.textDefault,
          headerStyle: {elevation: 0},
          headerTitleAlign: 'center',
        }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="ToDo List" component={TodoListScreen} />
        <Drawer.Screen name="Habit Tracker" component={HabitTrackerScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
