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
          name="Food Logger"
          component={FoodLoggerScreen}
          options={{
            tabBarIcon: () => (
              <Icon name="fast-food-outline" color="#777" size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Finance Tracker"
          component={FinanceTrackerScreen}
          options={{
            tabBarIcon: () => (
              <Icon name="cash-outline" color="#777" size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="To-Do List"
          component={TodoListScreen}
          options={{
            tabBarIcon: () => (
              <Icon name="checkbox-outline" color="#777" size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
