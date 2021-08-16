import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from './src/screens/homeScreen';
import FoodLoggerScreen from './src/screens/foodLoggerScreen';
import FinanceTrackerScreen from './src/screens/financeTrackerScreen';
import TodoListScreen from './src/screens/todoList-mainScreen';

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
        <Drawer.Screen name="Food Logger" component={FoodLoggerScreen} />
        <Drawer.Screen
          name="Finance Tracker"
          component={FinanceTrackerScreen}
        />
        <Drawer.Screen name="ToDo List" component={TodoListScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
