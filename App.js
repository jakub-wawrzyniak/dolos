import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import TodoListScreen from './src/screens/todoList-mainScreen';
import Colors from './src/global/colors';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="ToDo List"
        screenOptions={{
          headerTintColor: Colors.textDefault,
          headerStyle: {elevation: 0},
          headerTitleAlign: 'center',
        }}>
        <Drawer.Screen name="ToDo List" component={TodoListScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
