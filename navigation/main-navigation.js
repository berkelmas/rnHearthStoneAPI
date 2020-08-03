//import liraries
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MechanicsCardsScreen from '../screens/MechanicsCardsScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();

// create a component
const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Mechanics" component={HomeScreen} />
        <Stack.Screen name="MechanicsCards" component={MechanicsCardsScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

//make this component available to the app
export default MainNavigation;
